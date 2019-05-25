
import React, { Component } from 'react'
import { Modal, Button, Icon, Popconfirm } from 'antd'
import { connect } from 'dva'

@connect(({ facility, loading  }) => ({
  facility,
  loading: loading.effects['facility/deleteFacility']
}))
class TwoBtnFacility extends Component {
  
  onConfirm = () => {
    const { dispatch, record } = this.props
    dispatch({
      type: 'facility/deleteFacility',
      payload: record
    })
  }
  
  render() {
    const { text, record, index } = this.props
    return (
      <div>
        <Icon type="edit" />
        <Popconfirm
          title={`Bạn muốn xóa ${record && record.name} ra khỏi danh sách?`}
          okText={`Xóa`}
          cancelText={`Hủy`}
          onConfirm={this.onConfirm}
        >
          <Icon type="delete" />
        </Popconfirm>
      </div>
    )
  }
}

export default TwoBtnFacility