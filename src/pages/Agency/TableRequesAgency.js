import { connect } from 'dva'
import React, { Component } from 'react'
import { Table, Icon } from 'antd'

const TwoButtonAcceptRequest = React.lazy(() => import('./TwoButtonAcceptRequest'))
const columns = [{
  title: 'Mã công ty',
  dataIndex: 'id',
  align: 'center'
}, {
  title: 'Logo',
  dataIndex: 'avatar',
}, {
  title: 'Tên công ty',
  dataIndex: 'name',
}, {
  title: 'Số điện thoại',
  dataIndex: 'number_phone',
  key: 'number_phone',
}, {
  title: 'Nút lệnh',
  dataIndex: 'id',
  align: 'center',
  render: (text, record, index) => <TwoButtonAcceptRequest text={text} record={record} index={index} />
}]

@connect(({ agency, loading }) => ({
  agency,
  loading: loading.effects['agency/fetchListRequestAgency'],
}))
class TableListRequestAgency extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agency/fetchListRequestAgency',
    })
  }
  render() {
    const { agency, loading } = this.props
    let data = agency && agency.listRequestAgency || []
    return (
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
      />
    )
  }
}
export default TableListRequestAgency