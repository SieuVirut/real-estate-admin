import React, { PureComponent, Suspense } from 'react'
import { formatMessage, FormattedMessage } from 'umi/locale'
import GoogleMaps from '@/components/GoogleMaps'
import SearchLocation from '@/components/SearchLocation'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'
import moment from 'moment'
import { fetchListFacilities } from '@/services/facility'
import { fetchListInvestorByKeyword } from '@/services/investor'
import { getNewImagePath, getListDeleteImageId } from '../Common/function'
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
import { connect } from 'dva'

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const RadioGroup = Radio.Group
const dateFormat = 'YYYY/MM/DD'
const UploadMutilImages = React.lazy(() => import('@/components/UploadMultipleImages'))

@connect(({ loading, project, files, maps }) => ({
  projectInfo: project && project.projectDetail && project.projectDetail.data || {},
  files,
  maps,
  loading: loading.effects['project/createProject', 'project/fetchProjectInfoById']
}))
@Form.create()
class TableGeneral extends PureComponent {

  state = {
    listFacilities: null,
    haveChangeInvestor: false,
    center: {}
  }

  componentDidMount = async () => {
    let listFacilities = await fetchListFacilities()
    this.setState({
      listFacilities: listFacilities && listFacilities.data
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectInfo !== this.props.projectInfo) {
      this.props.form.resetFields()
      this.setState({ haveChangeInvestor: false })
    }
    let newCenter = nextProps && nextProps.maps && nextProps.maps.center
    let oldCenter = this.props && this.props.maps && this.props.maps.center
    if (newCenter !== oldCenter) {
      this.setState({ center: newCenter })
    }
  }

  onChangeInvestor = () => {
    this.setState({
      haveChangeInvestor: true
    })
  }

  onSearchInvestor = async key => {
    let listInvestors = await fetchListInvestorByKeyword(key)
    this.setState({
      listInvestors: listInvestors && listInvestors.data
    })
  }

  handleSubmit = e => {
    const { dispatch, form, files, projectInfo } = this.props
    const { haveChangeInvestor, center } = this.state
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fixValue = { ...values }
        const { time } = values
        let listImagesDefault = projectInfo && projectInfo.images || []
        let listImagesAfterChange = files && files.projectDetail || []
        let new_image_path = getNewImagePath(listImagesAfterChange)
        let listIdImagesDelete = getListDeleteImageId(listImagesDefault, listImagesAfterChange)
        fixValue['project']['id'] = projectInfo && projectInfo.id
        fixValue['project']['latitude'] = center && center.lat
        fixValue['project']['longtitude'] = center && center.lng
        fixValue['project']['listed_on'] = time && time[0]
        fixValue['project']['completed_at'] = time && time[1]
        // fixValue['project']['ward_id'] = 113
        // fixValue['project']['tenure'] = ''
        fixValue['project']['new_image_path'] = new_image_path
        fixValue['project']['delete_images'] = {}
        listIdImagesDelete.forEach(imageId => {
          fixValue['project']['delete_images'][`${imageId}`] = 'true'
        })

        delete fixValue['time']
        if (!haveChangeInvestor) {
          delete fixValue['project']['company_id']
        }

        dispatch({
          type: 'project/updateProjectInfoById',
          payload: fixValue,
        })
      } else {
        console.log('err', err)
      }
    })
  }

  render() {
    const { loading, projectInfo } = this.props
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

    let childrenSelectFacilities = listFacilities && listFacilities.length && listFacilities.map(
      i => <Option key={i.id}>{i.name}</Option>
    )

    let childrenSelectInvestors
    if (listInvestors && listInvestors.length) {
      childrenSelectInvestors = listInvestors.map(
        i => <Option key={i.id}>{i.name}</Option>
      )
    }

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
                    initialValue: projectInfo && projectInfo.name || null
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
                        required: false,
                        message: 'Vui lòng nhập địa chỉ',
                      }],
                    initialValue: projectInfo && projectInfo.address || null
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
                            required: false,
                            message: 'Vui lòng chọn chủ đầu tư'
                          }],
                        initialValue: projectInfo && projectInfo.investor && projectInfo.investor.name || null
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
                          onChange={this.onChangeInvestor}
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
                            required: false,
                            // message: formatMessage({ id: 'validation.title.reqed' }),
                          }],
                        initialValue: projectInfo && [moment(projectInfo.listed_on, dateFormat), moment(projectInfo.completed_at, dateFormat)]
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
                        initialValue: projectInfo && projectInfo.facilities || []
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
              </Col>
              <Col span={12} >
                <GoogleMaps />
              </Col>
            </Row>
            <Row gutter={8}>
              <Row >
                <Col span={24}>
                  <Card
                    title='Mặt bằng tổng thể dự án:'
                  >
                    <Suspense fallback={null}>
                      <UploadMutilImages
                        folder={'projectDetail'}
                      />
                    </Suspense>
                  </Card>
                </Col>
              </Row>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <FormItem {...formItemLayout} label={'Giới thiệu về dự án'}>
                  {getFieldDecorator('goal', {
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
                    initialValue: projectInfo && projectInfo.status
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
              <Button type="primary" htmlType="submit" loading={loading}> Hoàn thành </Button>
            </FormItem>
          </Form>
        </Suspense>
      </GridContent>
    )
  }
}

export default TableGeneral
