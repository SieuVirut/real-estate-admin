
import React, { Component } from 'react'
import { Modal, Button, Icon, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Link } from 'react-router-dom'
@connect(({ project, loading, routing }) => ({
  project,
  location: routing && routing.location ,
  loading: loading.effects['project/deleteProject']
}))
class EditProjectById extends Component {

  onConfirm = () => {
    const { dispatch, record } = this.props
    dispatch({
      type: 'project/deleteProject',
      payload: record
    })
  }

  render() {
    const { text, record, index, loading } = this.props
    return (
      <div>
        <Link to={{
          pathname: `/project/detail-and-form-input/table-general`,
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

export default EditProjectById