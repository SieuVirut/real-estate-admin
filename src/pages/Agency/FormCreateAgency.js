import { Component } from 'react'
import { Form, Input, Button, Checkbox, Upload, Icon, InputNumber, message, Row, Col } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
var randomize = require('randomatic')

const FormItem = Form.Item
const { TextArea } = Input
const CustomAvatar = React.lazy(() => import('@/components/Avatar'))
const ModalViewInfos = React.lazy(() => import('@/components/ModalViewInfos'))

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}

@connect(({ agency, files, loading }) => ({
  agency,
  files,
  loading: loading.effects['agency/createAgency'],
}))
class DynamicRule extends Component {
  state = {
  }

  handleSubmit = e => {
    const { dispatch, files } = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let avataPath = files && files.agency && files.agency.data && files.agency.data && files.agency.data.files && files.agency.data.files[0] && files.agency.data.files[0].imageUrl || null
        let fixValue = { ...values }
        fixValue.company.type = 'agency'
        if (avataPath) {
          fixValue.company.avatar_path = avataPath
        }
        dispatch({
          type: 'agency/createAgency',
          payload: fixValue
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.props
    // let str = randomize('Aa0', 10)
    return (
      <Form onSubmit={this.handleSubmit} className="create-agency">
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem
              {...formItemLayout}
              label="Logo công ty"
            >
              <CustomAvatar
                folder='agency'
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Tên công ty (Tên thương hiệu)">
              {getFieldDecorator('company[name]', {
                rules: [{
                  required: true,
                  // message: 'Please input your nickname',
                }],
                // initialValue: `Công ty `.concat(str)
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Địa chỉ">
              {getFieldDecorator('company[adress]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Khu vực">
              {getFieldDecorator('company[area]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Số điện thoại">
              {getFieldDecorator('company[number_phone]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
                // initialValue: Math.floor(Math.random(10) * 1000000).toString()
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Email">
              {getFieldDecorator('company[email]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
                // initialValue: `${str}@gmail.com`
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="WebSite">
              {getFieldDecorator('company[website]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Có nhân viên môi giới">
              {getFieldDecorator('company[haveEmploy]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
              })(
                <Checkbox />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Giới thiệu về công ti">
              {getFieldDecorator('company[description]', {
                rules: [{
                  required: false,
                  // initialValue: randomize('Aa0!', 50)
                  // message: 'Please input your nickname',
                }],
              })(
                // <Editor editorState={this.state.editorState} onChange={this.onChange} />
                <TextArea />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Tối ưu từ khóa">
              {getFieldDecorator('company[keyword]', {
                rules: [{
                  required: false,
                  // message: 'Please input your nickname',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} justify={'center'} type={'flex'}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Button type='danger' onClick={() => router.goBack()} >Hủy</Button>
            <ModalViewInfos
              // text={text}
              record={this.props.form.getFieldsValue().company}
              // index={index}
              title={`Xem trước giới thiệu về chủ đầu tư`}
            >
              <Button type='ghost'>Xem trước</Button>
            </ModalViewInfos>
            <Button type="primary" htmlType="submit" disabled={loading}>Hoàn thành</Button>
          </div>
        </Row>

      </Form >
    )
  }
}

const WrappedDynamicRule = Form.create()(DynamicRule)

export default WrappedDynamicRule
