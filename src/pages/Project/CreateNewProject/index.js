import React, { PureComponent, Suspense } from 'react'
import { Card } from 'antd'
import PageLoading from '@/components/PageLoading';

const TableCreateNewProject = React.lazy(() => import('./TableCreateNewProject'))

export default () => <Card
  title={'Tạo mới dự án'}
>
  <Suspense fallback={<PageLoading />}>
    <TableCreateNewProject />
  </Suspense>
</Card>