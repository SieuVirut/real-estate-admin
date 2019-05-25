import React, { PureComponent, Component, Suspense } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import router from 'umi/router'
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input, Button, Select } from 'antd'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
// import ChooseProject from '../Common/ChooseProject'
import AddProject from '../Common/AddProject'

const Option = Select.Option
const ChooseProject = React.lazy(() => import('../Common/ChooseProject'))
@connect(({ project, loading, routing }) => ({
  location: routing.location,
  listProject: project && project.listProject,
  loading: loading.effects['project/fetchListProject']
}))
class AllTableGeneral extends PureComponent {

  state = {
    id: null
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'project/fetchListProject'
    })
  }

  componentDidUpdate = () => {
    const { location, dispatch } = this.props
    let id = location && location.query && location.query.id
    id && this.setState({ id })
  }

  onTabChange = key => {
    const { match } = this.props
    let url = this.state.id ? `${match.url}/${key}?id=${this.state.id}` : `${match.url}/${key}`
    router.replace(url)
  }

  propjectAction = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <AddProject /> <span style={{ padding: '0 50px' }}> hoặc </span> <Suspense fallback={null}><ChooseProject /></Suspense>
      </div>
    )
  }

  render() {
    const { children, match, loading } = this.props

    const operationTabList = [
      {
        key: 'table-general',
        tab: <span>(1) Thông tin chung của dự án</span>
        ,
      },
      {
        key: 'update-building',
        tab: <span>(2) Cập nhập thông tin tòa</span>
        ,
      },
      {
        key: 'upload-flat',
        tab: <span>(3) Tải mặt bằng chung</span>
        ,
      },
      {
        key: 'update-floor',
        tab: <span>(4) Điều chỉnh tên tầng</span>
        ,
      },
      {
        key: 'update-condo',
        tab: <span>(5) Chỉnh sửa căn hộ</span>
        ,
      }
    ]

    return (
      <GridContent >
        <Row>
          <Col span={24}>
            <Card
              bordered={false}
              title={<h3>QUẢN LÝ CHI TIẾT DỰ ÁN, CÁC DỮ LIỆU NHẬP</h3>}
              size='small'
              hoverable={true}
              extra={this.state.id ? <Suspense fallback={null}><ChooseProject /></Suspense> : false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={loading}
            >
              {this.state.id ? children : this.propjectAction()}
            </Card>
          </Col>
        </Row>
      </GridContent>
    )
  }
}

export default AllTableGeneral
