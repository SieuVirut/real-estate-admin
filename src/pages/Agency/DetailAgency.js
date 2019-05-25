import React, { Component, Suspense } from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'

const FormEditAgencyInfo = React.lazy(() => import('./FormEditAgencyInfo'))


class DetailAgency extends Component {
  state = {}
  render() {
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
        </Suspense>
        <h3> THÔNG TIN CÔNG TY MÔI GIỚI  </h3>
        <Suspense fallback={null}>
          <FormEditAgencyInfo />
        </Suspense>
      </GridContent>
    )
  }
}

export default DetailAgency 
