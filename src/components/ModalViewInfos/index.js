
import React, { Component } from 'react'
import { Modal, Button, Icon, Avatar } from 'antd'
import styles from './stylesheet.less'

class ModalViewInfos extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  getContent = () => {
    const { record } = this.props
    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Avatar
              shape='square'
              size={150}
              src={`${record && record.avatar}`}
            />
          </div>
          <div className={styles.headerRight}>
            <span className={styles.name}> {record && record.name}</span>
            <span className={styles.location}> <Icon type="environment" /> {record && record.address || 'Chua co dia chi'} </span>
            <div className={styles.infos}>
              <span> <Icon type="phone" /> {record && record.number_phone || '0123456789'}</span>
              <span> <Icon type="google-plus" /> {record && record.email || 'abc@gmail.com'} </span>
              <span> <Icon type="global" /> wwww.abc.com </span>
            </div>
          </div>
        </div>
        <div className={styles.descriptions}>
          <h5 className={styles.introduce}> Giới thiệu </h5>
          <div>
            {record && record.description || 'Chua co mo ta'}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { text, record, index, title, children } = this.props
    return (
      <div>
        <span onClick={this.showModal}>
          {children ? children : <Icon type="eye" />}
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          footer={''}
          className={styles.modal}
        >
          {this.getContent()}
        </Modal>
      </div>
    )
  }
}

export default ModalViewInfos