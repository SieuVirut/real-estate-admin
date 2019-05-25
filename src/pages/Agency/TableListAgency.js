import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Table, Icon, Avatar } from 'antd'

const ModalViewInfos = React.lazy(() => import('@/components/ModalViewInfos'))
const ThreeBtnPreview = React.lazy(() => import('./ThreeBtnPreview'))

const columns = [{
  title: 'Mã công ty',
  dataIndex: 'id',
  align: 'center',
  sorter: (a, b) => a.id - b.id
}, {
  title: 'Logo',
  dataIndex: 'avatar',
  align: 'center',
  render: (text, record, index) => < Avatar 
    shape='circle'
    size='large'
    src={`${record.avatar}`}
  />
}, {
  title: 'Tên công ty',
  dataIndex: 'name',
}, {
  title: 'Số điện thoại',
  dataIndex: 'number_phone',
}, {
  title: 'Dự án được PP',
  dataIndex: 'id',
  align: 'center',
  render: (text, record, index) => <ModalViewInfos
    text={text}
    record={record}
    index={index}
    title={`Xem trước giới thiệu về công ty`}
  />
}, {
  title: 'Xem trước',
  dataIndex: 'id',
  align: 'center',
  render: (text, record, index) => <ThreeBtnPreview text={text} record={record} index={index} />
}]

@connect(({ agency, loading }) => ({
  agency,
  loading: loading.effects['agency/fetchListAgency'],
}))
class TableListAgency extends PureComponent {
  state = {}

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'agency/fetchListAgency',
    })
  }

  render() {
    const { agency, loading } = this.props
    let data = agency && agency.listAgency || []
    return (
      <Table
        showHeader
        dataSource={data}
        columns={columns}
        loading={loading}
      />
    )
  }
}

export default TableListAgency
