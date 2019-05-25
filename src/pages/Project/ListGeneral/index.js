import React, { Component } from 'react'
import { Card, Button } from 'antd'
import AddProject from '../Common/AddProject'
class ListGeneral extends Component {

  render() {
    const { children } = this.props
    return (
      <Card
        extra={<AddProject /> }
        title={<h3> QUẢN LÝ DỰ ÁN, KHU ĐÔ THỊ</h3>}
      >
        {children}
      </Card>
    )
  }
}

export default ListGeneral
