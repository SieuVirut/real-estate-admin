import React, { Component } from 'react'
import { Select, Input } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'


@connect(({ project, loading, routing }) => ({
  location: routing.location,
  listProject: project && project.listProject,
  loading: loading.effects['project/fetchListProject']
}))
class ChooseProject extends Component {


  state = {
    id: undefined,
    data: []
  }

  handleOnChangeSelected = (e) => {
    router.replace(`?id=${e}`)
  }

  getProjectId = () => {
    return this.props.location
      && this.props.location.query
      && this.props.location.query.id
  }

  componentWillMount = () => {
    const { location, listProject } = this.props
    let id = location && location.query && location.query.id
    let data = listProject && listProject.data
    this.setState({
      id: id,
      data: data
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { listProject, location } = nextProps
    let id = location && location.query && location.query.id
    let data = listProject && listProject.data
    this.setState({
      id: id,
      data: data
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.id && this.fetchProjectInfoById(this.state.id)
  }

  fetchProjectInfoById = (id) => {
    const { dispatch, location } = this.props
    let query = location && location.query
    dispatch({
      type: 'project/fetchProjectInfoById',
      id
    })
  }

  render() {
    const { loading } = this.props
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Select
          showArrow
          // showSearch
          placeholder="Chọn dự án cần nhập liệu"
          style={{ width: '200px' }}
          // optionFilterProp="children"
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={this.handleOnChangeSelected}
          children={this.state.data && this.state.data.map(e => <Option value={e.id}> {e.name}</Option>)}
          disabled={this.state.data && !this.state.data.length}
          defaultValue={this.state.data && this.state.id}
          loading={loading}
        />
      </div>
    )
  }
}

export default ChooseProject
