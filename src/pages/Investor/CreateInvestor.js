import React, { Component, Suspense } from 'react'
import { connect } from 'dva'
import { Row, Col, Icon, Menu, Dropdown, Card } from 'antd'

import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'

const FormCreateInvestor = React.lazy(() => import('./FormCreateInvestor'))


@connect(({ investor, loading }) => ({
  investor,
  loading: loading.effects['investor/fetchListInvestor'],
}))
class ListInvestor extends Component {
  state = {}

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'investor/fetchListInvestor',
    })
  }

  render() {
    const { investor, loading } = this.props
    return (
      <Card
        title={<h3> THÊM CHỦ ĐẦU TƯ </h3>}
      >
        <GridContent>
          <Suspense fallback={<PageLoading />} />
          <Suspense fallback={null}>
            <FormCreateInvestor />
          </Suspense>
        </GridContent>
      </Card>
    )
  }
}

export default ListInvestor

