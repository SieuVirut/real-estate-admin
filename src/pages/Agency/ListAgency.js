import React, { Component, Suspense } from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import { connect } from 'dva'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'

const TabsListAgency = React.lazy(() => import('./TabsListAgency'))

class ListAgency extends Component {
  state = {}

  render() {
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
        </Suspense>
        <h3> QUẢN LÝ DANH SÁCH CÔNG TY MÔI GIỚI </h3>
        <Suspense fallback={null}>
          <TabsListAgency />
        </Suspense>
      </GridContent>
    )
  }
}

export default ListAgency

