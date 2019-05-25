import { connect } from 'dva'
import React, { Component, PureComponent } from 'react'
import { Table, Icon, Avatar, Input, Button } from 'antd'
import Highlighter from 'react-highlight-words'

const ModalViewInfos = React.lazy(() => import('@/components/ModalViewInfos'))
const EditInvestorInfo = React.lazy(() => import('./EditInvestorInfo'))


@connect(({ investor, loading }) => ({
  investor,
  loading: loading.effects['investor/fetchListInvestor'],
}))
class TableListInvestor extends PureComponent {
  state = {
    searchText: '',
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {

    const { loading } = this.props
    let data = this.props.investor && this.props.investor.listInvestor && this.props.investor.listInvestor.data || []
    const columns = [{
      title: 'Mã công ty',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      key: 'name',
      align: 'center'
    }, {
      title: 'Logo',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      render: (text, record, index) => < Avatar
        shape='circle'
        size='large'
        src={`${record.avatar}`}
      />
    }, {
      title: 'Tên chủ đầu tư',
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name')
    }, {
      title: 'Số điện thoại',
      dataIndex: 'number_phone',
      key: 'number_phone',
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
      render: (text, record, index) => <EditInvestorInfo text={text} record={record} index={index} />
    }]
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
export default TableListInvestor
