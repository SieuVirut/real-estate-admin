import React, { Component, Suspense } from 'react'
import { Row, Col, Icon, Menu, Dropdown, Card } from 'antd'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'

const FormUpdateInvestor = React.lazy(() => import('./FormUpdateInvestor'))

class ListInvestor extends Component {

  render() {
    const { investor, loading } = this.props
    return (
      <Card
        title={<h3> THÔNG TIN CHỦ ĐẦU TƯ </h3>}
      >
        <GridContent>
          <Suspense fallback={<PageLoading />} />
          <Suspense fallback={null}>
            <FormUpdateInvestor />
          </Suspense>
        </GridContent>
      </Card>
    )
  }
}

export default ListInvestor
