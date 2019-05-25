import { Form, Input, Button, Checkbox, Upload, Icon, InputNumber, message, Row, Col } from 'antd'
import { connect } from 'dva'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import router from 'umi/router'
import styles from './Investor.less'

var randomize = require('randomatic')

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}

const CustomAvatar = React.lazy(() => import('@/components/Avatar'))
const ModalViewInfos = React.lazy(() => import('@/components/ModalViewInfos'))

@connect(({ investor, loading, files }) => ({
  investor,
  loading: loading.effects['investor/createInvestor'],
  files
}))

class DynamicRule extends React.Component {
  state = {
    data: ''
  }

  handleSubmit = (e) => {
    const { dispatch, files } = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let avataPath = files && files.investor && files.investor.data && files.investor.data && files.investor.data.files && files.investor.data.files[0] && files.investor.data.files[0].imageUrl || null
        let fixValue = { ...values }
        fixValue.company.type = 'investor'
        if (avataPath) {
          fixValue.company.avatar_path = avataPath
        }
        dispatch({
          type: 'investor/createInvestor',
          payload: fixValue
        })
      }
    })
  }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form

    // let str = randomize('Aa0', 20)
    // let randomName = `Mr `.concat(str)
    // let randomName = 'sss'
    // let randomDescription = randomName.concat( randomize('Aa0', 1000))
    return (
      <Form onSubmit={this.handleSubmit} className="create-investor">
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Logô công ty">
              <CustomAvatar
                folder='investor'
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Tên công ty (Tên thương hiệu)">
              {getFieldDecorator('company[name]', {
                rules: [{
                  required: true,
                  // message: 'Please input your nickname',
                }],
                // initialValue: randomName
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col sm={24} md={16}>
            <FormItem {...formItemLayout} label="Địa chỉ">
              {getFieldDecorator('company[address]', {
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
                  // message: 'Please input your nickname',
                }],
              })(
                <TextArea />
              )}
              {/* <CKEditor
            editor={ClassicEditor}
            data={this.state.data}
            // onInit={ editor => {
            //     // You can store the "editor" and use when it is needed.
            //     console.log( 'Editor is ready to use!', editor )
            // } }
            onChange={(event, editor) => {
              const data = editor.getData()
              console.log({ event, editor, data })
              this.setState({ data })
            }}
          // onBlur={ editor => {
          //     console.log( 'Blur.', editor )
          // } }
          // onFocus={ editor => {
          //     console.log( 'Focus.', editor )
          // } }
          /> */}
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
            <Button type="primary" htmlType="submit">Hoàn thành</Button>
          </div>
        </Row>
      </Form>
    )
  }
}

const WrappedDynamicRule = Form.create()(DynamicRule)

export default WrappedDynamicRule