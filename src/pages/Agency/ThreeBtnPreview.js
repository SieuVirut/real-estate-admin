
import React, { Component } from 'react'
import { Modal, Button, Icon, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Link } from 'react-router-dom'

const ModalViewInfos = React.lazy(() => import('@/components/ModalViewInfos'))
@connect(({ agency, loading }) => ({
  agency,
  loading: loading.effects['agency/deleteAgency']
}))
class ThreeBtnPreview extends Component {
  onConfirm = () => {
    const { dispatch, record } = this.props
    dispatch({
      type: 'agency/deleteAgency',
      payload: record
    })
  }
  render() {
    const { text, record, index, loading } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <ModalViewInfos
          text={text}
          record={record}
          index={index}
          title={`Xem trước giới thiệu về công ty`}
        >
          <Icon type="eye" />
        </ModalViewInfos>
        <Link to={{
          pathname: '/agency/detail',
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

export default ThreeBtnPreview