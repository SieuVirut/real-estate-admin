
import React, { Component } from 'react'
import { Tabs, Button } from 'antd'
import Link from 'umi/link'
import styles from './Agency.less'

const TabPane = Tabs.TabPane
const TableListAgency = React.lazy(() => import('./TableListAgency'))
const TableRequesAgency = React.lazy(() => import('./TableRequesAgency'))

class TabsListAgency extends Component {
  state = {
    activeKey: '1',
  }

  render() {
    return (
      <div>
        <div className={'btn-create'}>
          <Link to='/agency/create' >
            <Button>+ Thêm Công ty môi giới </Button>
          </Link>
        </div>
        <Tabs
          type="card"
          defaultActiveKey={this.state.activeKey}
        >
          <TabPane
            tab="Danh sách công ty môi giới"
            children={<TableListAgency />}
            key='1'
          />
          <TabPane
            tab="Danh sách yêu cầu" key="1"
            children={<TableRequesAgency />}
            key='2'
          />
        </Tabs>
      </div>
    )
  }
}

export default TabsListAgency