
import React from 'react'
import { Upload, Icon, message, Button, notification } from 'antd'
import { connect } from 'dva'
import { uploadFile } from '@/services/files'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

@connect(({ files, loading }) => ({
  files,
  loading: loading.effects['files/uploadFiles']
}))
class Avatar extends React.Component {
  state = {
    loading: false,
  }

  componentWillMount = () => {
    const { dispatch, folder } = this.props
    dispatch({
      type: 'files/cleanUrl',
      folder
    })
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    let selectedFile = info && info.file && info.file.originFileObj
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))
    }
  }

  actionUpload = async e => {
    const response = await uploadFile(e)
    const { dispatch, folder } = this.props
    dispatch({
      type: 'files/saveUrl',
      response: response,
      folder
    })
  }

  onError = e => {
    notification.error({
      message: `Upload Avatar Fail`,
      description: e,
    });
  }

  onRemove = () => {
    const { dispatch, folder } = this.props
    dispatch({
      type: 'files/cleanUrl',
      folder
    })
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { initialValue } = this.props
    const imageUrl = this.state.imageUrl || initialValue

    return (
      <Upload
        listType="picture-card"
        showUploadList={false}
        action={this.actionUpload}
        onRemove={this.onRemove}
        onError={this.onError}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain'
          }}
          alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}

export default Avatar