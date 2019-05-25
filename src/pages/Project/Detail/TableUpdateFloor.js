
import React from 'react';
import {
  Table, Input, Button, Popconfirm, Form, Icon,
} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable1 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Tòa số',
      dataIndex: 'key',
      // width: '30%',
      editable: true,
      align: 'center',
      render: (text, record, index) => `R${index}`
    }, {
      title: 'Từ tầng',
      dataIndex: 'number_floor',
      render: (text, record, index) => `1`,
      align: 'center',
      editable: true,
    }, {
      title: 'Đến tầng',
      dataIndex: 'number_floor',
      editable: true,
      render: () => Math.floor(Math.random(10) * 10),
      align: 'center'
    },
    {
      title: 'Số căn hộ mẫu',
      dataIndex: 'number_space',
      editable: true,
      align: 'center'
    },
    {
      title: 'Mặt bằng',
      render: () => <Icon type="picture" />,
      align: 'center'
    },
    {
      title: 'Lưu thông tin',
      dataIndex: 'number_space',
      render: () => <Button> Lưu</Button>,
      align: 'center'
    },

    {
      // title: '',
      dataIndex: 'operation',
      render: (text, record) => (
        this.state.dataSource.length >= 1
          ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">
                <Icon type="delete" />
              </a>
            </Popconfirm>
          ) : null
      ),
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Ecopark 0',
        number_floor: '32',
        number_space: '2',
      }, {
        key: '1',
        name: 'Ecopark 1',
        number_floor: '20',
        number_space: '2',
      }],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `EcoPark ${count}`,
      number_floor: Math.floor(Math.random(10) * 10),
      number_space: Math.floor(Math.random(10) * 10),
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    })
    const footer = <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button type='danger' style={{ marginRight: '10px' }}> Hủy</Button>
      <Button type='primary'> Hoàn thành</Button>

    </div>
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        {footer}
      </div>
    )
  }
}

export default EditableTable1