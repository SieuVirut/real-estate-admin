import { connect } from 'dva'
import React, { Component } from 'react'
import { Table, Icon, Input, Button } from 'antd'

const TwoBtnFacility = React.lazy(() => import('./TwoBtnFacility'))
const FormCreateNewFacility = React.lazy(() => import('./FormCreateNewFacility'))

const columns = [{
  title: 'TT',
  dataIndex: 'id',
  align: 'center',
  sorter: (a, b) => a.id - b.id
}, {
  title: 'Tiện ích',
  dataIndex: 'name',
  align: 'center',
  // sorter: true
}, {
  title: 'Chỉnh sửa',
  align: 'center',
  render: (text, record, index) => <TwoBtnFacility text={text} record={record} index={index} />
}]

@connect(({ facility, loading }) => ({
  facility,
  loading: loading.effects['facility/fetchListFacilities'],
}))
class TableListFacilities extends Component {

  state = {}

  render() {
    const { facility, loading } = this.props
    // let data = [{ tt: 1, name: 'Bể bơi' }, { tt: 2, name: 'Siêu thị' }]
    let data = facility && facility.listFacilities && facility.listFacilities.data
    return (
      <Table
        showHeader
        dataSource={data}
        columns={columns}
        loading={loading}
        // pagination={false}
        bordered
        footer={() => <FormCreateNewFacility />}
      />
    )
  }
}
export default TableListFacilities