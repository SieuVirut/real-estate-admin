import { connect } from 'dva'
import React, { Component } from 'react'
import { Table, Icon, Avatar } from 'antd'


const ModalViewInfos = React.lazy(() => import('@/components/ModalViewInfos'))
const TwoButtonAcceptRequest = React.lazy(() => import('./TwoButtonAcceptRequest'))
const columns = [{
  title: 'Mã công ty',
  dataIndex: 'id',
  key: 'id',
  align: 'center',
  sorter: (a, b) => a.id - b.id
}, {
  title: 'Logo',
  dataIndex: 'age',
  key: 'age',
  align: 'center',
  render: (text, record, index) => < Avatar
    shape='circle'
    size='large'
    src={record && record.avatar}
  />
}, {
  title: 'Tên chủ đầu tư',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Số điện thoại',
  dataIndex: 'phonenumber',
  key: 'phonenumber',
}, {
  title: 'Xem trước',
  dataIndex: 'name',
  key: 'address',
  align: 'center',
  render: (text, record, index) => <ModalViewInfos
    text={text}
    record={record}
    index={index}
    title={`Xem trước giới thiệu về chủ đầu tư`}
  />
}, {
  title: 'Nút lệnh',
  dataIndex: 'name',
  key: 'address',
  align: 'center',
  render: (text, record, index) => <TwoButtonAcceptRequest text={text} record={record} index={index} />
},

];

@connect(({ investor, loading }) => ({
  investor,
  loading: loading.effects['investor/fetchListInvestor'],
}))
class TableListInvestor extends Component {
  render() {

    const { loading } = this.props
    let data = this.props.investor && this.props.investor.listInvestor && this.props.investor.listInvestor.data || []
    return (
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
      />
    )
  }
}
export default TableListInvestor