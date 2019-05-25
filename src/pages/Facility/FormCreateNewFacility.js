import React, { Component } from 'react'
import { Input, Button, Form, Row, Col } from 'antd'
import { connect } from 'dva'

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(({ facility, loading }) => ({
  facility,
  loading: loading.effects['facility/createFacility'],
}))
class FormCreateNewFacility extends Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props
        let data = { facility: values }
        dispatch({
          type: 'facility/createFacility',
          // payload: JSON.stringify(data)
          payload: data
        })
      }
    })
  }

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form
    const facitilyNameError = isFieldTouched('name') && getFieldError('name');

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
        <Form.Item
          validateStatus={facitilyNameError ? 'error' : ''}
          help={facitilyNameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your facility name!' }],
          })(
            <Input placeholder="Tên tiện ích" />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading || hasErrors(getFieldsError())}
          >
            + Thêm tiện ích
        </Button>
        </Form.Item>
      </Form>
    )
  }
}


const WrappedFormCreateNewFacility = Form.create()(FormCreateNewFacility);


export default WrappedFormCreateNewFacility

