import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';

const TabsListInvestor = React.lazy(() => import('./TabsListInvestor'));


@connect(({ investor, loading }) => ({
  investor,
  loading: loading.effects['investor/fetchListInvestor'],
}))
class ListInvestor extends Component {
  state = {}

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'investor/fetchListInvestor',
    })
  }

  render() {
    const { investor, loading } = this.props;
    console.log('this.props', this.props)
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
        </Suspense>
        {/* <h3> QUẢN LÝ DANH SÁCH CHỦ ĐẦU TƯ </h3> */}
        <Suspense fallback={null}>
        <TabsListInvestor />
        </Suspense>
      </GridContent>
    );
  }
}

export default ListInvestor;

