import React, { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';
import { REGEX } from './../../common/regex';

@Form.create()
export default class AddModal extends PureComponent {
  // 提交
  onOk = () => {
    this.props.form.validateFields({ force: true }, // 获取表单数据
      (err, values) => {
        if (!err) {
          this.props.onOk(values);
        }
      }
    );
  }

  render() {
    const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 7 } }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 } } };
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        confirmLoading={this.props.confirmLoading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="模型名称">
            { getFieldDecorator('name', { rules: [{ required: true, message: '请输入模型名称' }] })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="模型文件名">
            { getFieldDecorator('file', { rules: [{ required: true, message: '请输入模型文件名' }, { pattern: REGEX.LINUX_FILE_NAME, message: '模型路径格式有误' }] })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
