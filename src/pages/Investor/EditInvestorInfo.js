
import React, { Component } from 'react'
import { Modal, Button, Icon, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Link } from 'react-router-dom'
@connect(({ investor, loading }) => ({
  investor,
  loading: loading.effects['investor/deleteInvestor']
}))
class EditInvestorInfo extends Component {

  onConfirm = () => {
    const { dispatch, record } = this.props
    dispatch({
      type: 'investor/deleteInvestor',
      payload: record
    })
  }

  render() {
    const { text, record, index, loading } = this.props
    return (
      <div>
        <Link to={{
          pathname: `/investor/detail`,
          search: `?id=${record && record.id}`
        }}>
          <Icon type="edit" />
        </Link>
        <Popconfirm
          title={`Bạn muốn xóa ${record && record.name} ra khỏi danh sách?`}
          okText={`Xóa`}
          cancelText={`Hủy`}
          onConfirm={this.onConfirm}
        >
          <Icon type="delete" spin={loading} />
        </Popconfirm>
      </div>
    )
  }
}

export default EditInvestorInfo