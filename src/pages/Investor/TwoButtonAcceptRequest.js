
import React, { Component } from 'react';
import { Modal, Button, Icon } from 'antd';

class EditInvestorInfo extends Component {

  render() {
    const { text, record, index } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Button style={{ margin: '0 2px' }} type='primary'> Đồng ý </Button>
        <Button style={{ margin: '0 2px' }} type='danger'> Từ chối </Button>
      </div>
    )
  }
}

export default EditInvestorInfo