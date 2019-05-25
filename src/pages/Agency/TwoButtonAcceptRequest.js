
import React, { Component } from 'react'
import { Modal, Button, Icon } from 'antd'

class TwoBtnAcceptRequest extends Component {

  render() {
    const { text, record, index } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Button type='primary'> Đồng ý </Button>
        <Button type='danger'> Từ chối </Button>
      </div>
    )
  }
}

export default TwoBtnAcceptRequest