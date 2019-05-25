import React, { PureComponent, Suspense } from 'react'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi/locale'
import GoogleMaps from '@/components/GoogleMaps'
import SearchLocation from '@/components/SearchLocation'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'
import moment, { now } from 'moment'
import { fetchListFacilities } from '@/services/facility'
import { fetchListInvestorByKeyword } from '@/services/investor'
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col
} from 'antd'
import { getNewImagePath } from '../Common/function'
const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const RadioGroup = Radio.Group
const dateFormat = 'YYYY/MM/DD'
const UploadMutilImages = React.lazy(() => import('@/components/UploadMultipleImages'))

@connect(({ loading, maps, files }) => ({
  maps,
  files,
  loading: loading.effects['project/createProject', 'project/fetchProjectInfoById']
}))
@Form.create()
class TableGeneral extends PureComponent {

  state = {
    listFacilities: [],
    listInvestors: [],
    center: {}
  }

  componentDidMount = async () => {
    let listFacilities = await fetchListFacilities()
    this.setState({
      listFacilities: listFacilities && listFacilities.data,
    })
  }

  componentWillReceiveProps = nextProps => {
    let newCenter = nextProps && nextProps.maps && nextProps.maps.center
    let oldCenter = this.props && this.props.maps && this.props.maps.center
    if (newCenter !== oldCenter) {
      this.setState({ center: newCenter })
    }
  }

  handleSubmit = async e => {
    const { dispatch, form, files } = this.props
    const { center } = this.state
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fixValue = { ...values }
        const { time } = values
        let listImages = files && files.createNewProject
        let new_image_path = getNewImagePath(listImages)

        fixValue['project']['latitude'] = center && center.lat
        fixValue['project']['longtitude'] = center && center.lng
        fixValue['project']['listed_on'] = time && time[0]
        fixValue['project']['completed_at'] = time && time[1]
        fixValue['project']['ward_id'] = 113
        fixValue['project']['tenure'] = ''
        fixValue['project']['new_image_path'] = new_image_path
        delete fixValue['time']
        dispatch({
          type: 'project/createProject',
          payload: fixValue
        })
      }
    })
  }

  onSearchInvestor = async key => {
    let listInvestors = await fetchListInvestorByKeyword(key)
    this.setState({
      listInvestors: listInvestors && listInvestors.data
    })
  }

  render() {
    const { loading } = this.props
    const { listFacilities, listInvestors } = this.state
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
        md: { span: 17 },
      },
    }

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }

    const childrenSelectFacilities = listFacilities && listFacilities.length && listFacilities.map(
      i => <Option key={i.id}>{i.name}</Option>
    )

    const childrenSelectInvestors = listInvestors && listInvestors.length && listInvestors.map(
      i => <Option key={i.id}>{i.name}</Option>
    )

    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Row gutter={8}>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'Tên dự án'}>
                  {getFieldDecorator('project[name]', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập tên dự án',
                      }],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={12} />
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'Địa chỉ'}>
                  {getFieldDecorator('project[address]', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ',
                      }],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={12} >
                <FormItem {...formItemLayout} label={'Khu vực'}>
                  {getFieldDecorator('address1', {
                    rules: [
                      {
                        required: false,
                        // message: formatMessage({ id: 'validation.title.required' }),
                      },
                    ],
                  })(<SearchLocation />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={'Chủ đầu tư'}>
                      {getFieldDecorator('project[company_id]', {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng chọn chủ đầu tư',
                          }],
                      })(
                        <Select
                          showSearch
                          style={{ width: '100%' }}
                          placeholder="Chọn 1 chủ đầu tư"
                          optionFilterProp="children"
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          children={childrenSelectInvestors}
                          onSearch={this.onSearchInvestor}
                          notFoundContent={<span> Thử với từ khóa khác </span>}
                          allowClear={true}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={'Thời gian'}>
                      {getFieldDecorator('time', {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng điền thời gian khởi công và thời gian cất nóc',
                          }],
                        // initialValue: projectInfo && [moment(now, dateFormat), moment(projectInfo.completed_at, dateFormat)]
                      })(<RangePicker />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={'Tiện ich'}>
                      {getFieldDecorator('project[facilities]', {
                        rules: [
                          {
                            required: false,
                            // message: formatMessage({ id: 'validation.title.required' }),
                          }],
                      })(<Select
                        mode="tags"
                        size={'default'}
                        placeholder="Please select"
                        // onChange={handleChange}
                        style={{ width: '100%' }}
                        children={childrenSelectFacilities}
                      />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={'Số căn hộ'}>
                      {getFieldDecorator('project[number_condo]', {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng điền số căn hộ',
                          }],
                      })(<InputNumber />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={12} >
                <GoogleMaps />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Card
                  title='Mặt bằng tổng thể dự án:'
                >
                  <Suspense fallback={null}>
                    <UploadMutilImages
                      folder={'createNewProject'}
                    />
                  </Suspense>
                </Card>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <FormItem {...formItemLayout} label={'Giới thiệu về dự án'}>
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: false,
                        message: formatMessage({ id: 'validation.goal.required' }),
                      },
                    ],
                  })(
                    <TextArea
                      style={{ minHeight: 32 }}
                      placeholder={formatMessage({ id: 'form.goal.placeholder' })}
                      rows={4}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                  label={'Trạng thái của dự án'}
                >
                  {getFieldDecorator('project[status]', {
                    initialValue: 'new'
                  })(
                    <RadioGroup name="radiogroup" >
                      <Radio value={'new'}> Dự án mới</Radio>
                      <Radio value={'assigned'}>Dự án đã bàn giao</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type='danger'> Hủy</Button>
              <Button type='ghost'> Xem trước</Button>
              <Button type="primary" htmlType="submit" loading={loading}> Tạo dự án </Button>
            </FormItem>
          </Form>
        </Suspense>
      </GridContent>
    )
  }
}

export default TableGeneral
