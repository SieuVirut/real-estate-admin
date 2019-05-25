import React, { Component, Suspense } from 'react'
import { connect } from 'dva'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'

import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'

const TableListFacilities = React.lazy(() => import('./TableLisFacilities'))


@connect(({ facility, loading }) => ({
  facility,
  loading: loading.effects['facility/fetchListFacilities'],
}))
class ListFacilities extends Component {
  state = {}

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'facility/fetchListFacilities',
    })
  }

  render() {
    const { facility, loading } = this.props
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
        </Suspense>
        <h3> QUẢN LÝ DANH SÁCH TIỆN ÍCH KHU ĐÔ THỊ </h3>
        <Suspense fallback={null}>
          <Row type="flex" justify="center" align="top">
            <Col lg={10} md={12} sm={24}>
              <TableListFacilities />
            </Col>
          </Row>
        </Suspense>
      </GridContent>
    )
  }
}

export default ListFacilities

