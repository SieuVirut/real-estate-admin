
import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
import {
  Upload, Button, Icon, message,
} from 'antd';
// import reqwest from 'reqwest';
import { getUserToken } from '@/utils/authority'

import request from '@/utils/request'
class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = async () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file[new_image_path][]', file);
    });

    this.setState({
      uploading: true,
    });
    let token = getUserToken()
    let xx = await request('/server/api/v1/files', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token,
      },
    })

    console.log('xx', xx)
    // You can use any AJAX library you like
    // reqwest({
    //   url: '//jsonplaceholder.typicode.com/posts/',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
      multiple: true,
      listType: "picture-card"
    };

    return (
      <div>
        <Upload {...props}
         
        >
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      </div>
    );
  }
}
export default Demo