import React, { Component, Suspense } from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'

import GridContent from '@/components/PageHeaderWrapper/GridContent'
import PageLoading from '@/components/PageLoading'

const FormCreateAgency = React.lazy(() => import('./FormCreateAgency'))


class CreateCompany extends Component {
  state = {}
  render() {
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
        </Suspense>
        <h3> THÊM CÔNG TY MÔI GIỚI  </h3>
        <Suspense fallback={null}>
          <FormCreateAgency />
        </Suspense>
      </GridContent>
    )
  }
}

export default CreateCompany 
