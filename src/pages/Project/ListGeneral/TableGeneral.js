
import React, { Component } from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import TwoBtnEditProject from './TwoBtnEditProject'

const columns = [{
  title: 'Mã',
  dataIndex: 'id',
  align: 'center',
  sorter: (a, b) => a.id - b.id
}, {
  title: 'Tên dự án',
  dataIndex: 'name',
}, {
  title: 'Chủ đầu tư',
  dataIndex: 'investor',
  render: (text, record, index) => <span> {record && record.investor && record.investor.name || ''}</span>
}, {
  title: 'Địa điểm',
  dataIndex: 'address',
}, {
  title: 'Năm hoàn thành',
  dataIndex: 'completed_at'
},
{
  title: 'Số căn hộ',
  dataIndex: 'number_condo',
  align: 'center'
}, {
  title: 'Trạng thái',
  dataIndex: 'status',
  align: 'center'
}, {
  title: 'Sửa dự án',
  dataIndex: 'year',
  align: 'center',
  render: (text, record, index) => <TwoBtnEditProject text={text} record={record} index={index} />
}]

@connect(({ project, loading }) => ({
  listProject: project && project.listProject,
  loading: loading.effects['project/fetchListProject']
}))
export default class TableGeneral extends Component {

  componentWillMount = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'project/fetchListProject'
    })
  }

  render() {
    const { listProject, loading } = this.props
    let data = listProject && listProject.data
    return (
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    )
  }
}
