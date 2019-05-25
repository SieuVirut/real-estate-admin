
import React, { Component } from 'react'
import { Tabs, Button, Card } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import styles from './Investor.less'

const TabPane = Tabs.TabPane
const TableListInvestor = React.lazy(() => import('./TableListInvestor'))
const TableRequesInvestor = React.lazy(() => import('./TableRequesInvestor'))

@connect(({ investor, loading }) => ({
  investor,
  loading: loading.effects['investor/fetchListInvestor'],
}))
class TabsListInvestor extends Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    this.state = {
      activeKey: 0,
    }
  }

  onChange = (activeKey) => {
    this.setState({ activeKey })
  }
  addInvestor = () => <div className='btn-creates'>
    <Link to='/investor/create' >
      <Button>+ Thêm chủ đầu tư </Button>
    </Link>
  </div>

  render() {
    return (
      <Card
        extra={this.addInvestor()}
        title={<h3> QUẢN LÝ DANH SÁCH CHỦ ĐẦU TƯ </h3>}
      >
        <Tabs
          // hideAdd
          onChange={this.onChange}
          defaultActiveKey={this.state.activeKey}
          type="card"
        >
          <TabPane
            tab={'Danh sách chủ đầu tư'}
            children={<TableListInvestor />}
            key={0}
          />
          <TabPane
            tab={'Danh sách yêu cầu'}
            children={<TableRequesInvestor />}
            key={1}
          />

        </Tabs>
      </Card>
    )
  }
}

export default TabsListInvestor