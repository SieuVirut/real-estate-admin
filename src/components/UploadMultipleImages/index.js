
import React, { Component } from 'react'
import { Upload, Icon, Modal, notification } from 'antd'
import { uploadFile } from '@/services/files'
import { connect } from 'dva'
import styles from './UploadMultipleImages.less'
import { isArray } from 'util'
import { getImagesByProjectId } from '@/services/project'
@connect(({ files, routing }) => ({
  files,
  location: routing && routing.location
}))
class PicturesWall extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    compareFile: [],
    uploading: false
  }

  componentWillMount = async () => {
    const { location } = this.props
    if (location && location.pathname == '/project/detail-and-form-input/table-general') {
      let id = location && location.query && location.query.id
      let images = []
      images = await getImagesByProjectId(id)
      this.pushImageFromServerToState(images)
    }
  }

  componentWillUnmount = async () => {
    const { dispatch, folder } = this.props
    dispatch({
      type: 'files/cleanUrl',
      folder
    })
  }

  componentWillReceiveProps = async (nextProps) => {
    let oldId = this.props.location && this.props.location.query && this.props.location.query.id
    let newId = nextProps.location && nextProps.location.query && nextProps.location.query.id
    if (oldId !== newId) {
      let images = []
      images = await getImagesByProjectId(newId)
      this.pushImageFromServerToState(images)
    }
  }


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = e => {
    const { fileList } = e
    const { dispatch, folder } = this.props
    this.setState({ fileList })
    console.log('fileList', fileList)
    dispatch({
      type: 'files/saveListUrl',
      fileList,
      folder
    })
  }

  actionUpload = async e => {
    const { fileList, compareFile } = this.state
    let tempList = { ...fileList }
    this.setState({ uploading: true })
    const response = await uploadFile(e)
    let data = response && response.data
    if (!data) {
      notification.error({
        message: 'Upload file fail',
        description: 'Please upload again or report error!'
      })
      return
      // history.push('/user/login')
    }
    let fileUploadDone = await data && {
      uid: data && data.files[0] && data.files[0].id,
      name: data && data.files[0] && data.files[0].id,
      status: 'done',
      url: data && data.files[0] && data.files[0].imageUrl && `/server${data.files[0].imageUrl}`.replace('root/real-estate/', ''),
      urlFromServer: data && data.files[0] && data.files[0].imageUrl,
      note: 'newFile'
    }
    await compareFile.push({ fileLocal: e, fileServer: fileUploadDone })
  }

  pushImageFromServerToState = (images) => {
    let fileList = []
    if (!isArray(images)) return
    images.forEach((item, key) => {
      let file = {
        uid: item && item.id,
        name: item && item.id,
        status: 'done',
        url: item && '/server/'.concat(item.imageUrl),
        // urlFromServer: data && data.files[0] && data.files[0].imageUrl,
        note: 'oldFile'
      }
      fileList.push(file)
    })
    this.setState({ fileList: fileList })
    const { dispatch, folder } = this.props
    dispatch({
      type: 'files/saveListUrl',
      fileList,
      folder
    })
  }

  replaceFileLocalByFileServer = () => {
    const { compareFile, fileList } = this.state
    compareFile.forEach((av, ai) => {
      fileList.forEach((bv, bi) => {
        if (av.fileLocal.uid == bv.uid) {
          fileList[bi] = compareFile[ai]['fileServer']
        }
      })
    })
  }

  removeCompareFile = (file) => {
    const { compareFile } = this.state
    compareFile.forEach((v, i) => {
      if (file.uid == v.fileServer.uid) compareFile.splice(i, 1)
    })
  }

  onSuccess = e => {
    this.setState({ uploading: false })
    this.replaceFileLocalByFileServer()
    return <div />
  }

  onRemove = e => {
    this.removeCompareFile(e)
  }

  onError = e => {
    this.setState({ uploading: false })
    notification.error({
      message: 'Upload file fail',
      description: 'Please upload again or report error!'
    })
    console.log('onError', e)
  }


  uploadButton = () => {
    const { uploading } = this.state
    return uploading ? null :
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
  }


  render() {
    const { previewVisible, previewImage, fileList, uploading } = this.state;

    return (
      <div className={styles.view}>
        <Upload
          action={this.actionUpload}
          className={styles.listImages}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          multiple={true}
          onRemove={this.onRemove}
          onSuccess={this.onSuccess}
          onError={this.onError}
          supportServerRender={true}
        >
          {this.uploadButton()}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall
