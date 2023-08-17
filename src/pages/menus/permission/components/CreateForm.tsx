import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

interface CreateFormProps {
  onCancel: (flag?: boolean, formValues?: Permission.PermissionInfo) => void;
  onSubmit: (values: Permission.PermissionInfo) => void;
  createModalVisible: boolean;
  menuId: number;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, onCancel } = props;
  const [form] = Form.useForm();
  const [formValues] = useState<Permission.PermissionInfo>({
    menu_id: props.menuId,
  });

  const { onSubmit: handleCreate, onCancel: handleCreateModalVisible } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    form.resetFields();
    handleCreate({ ...formValues, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入名称" allowClear />
        </Form.Item>
        <Form.Item
          name="code"
          label="编码"
          rules={[{ required: true, message: '请输入编码！' }]}
        >
          <Input placeholder="请输入编码" allowClear />
        </Form.Item>
        <Form.Item name="description" label="详情描述">
          <Input placeholder="请输入详情描述" />
        </Form.Item>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false, formValues)}>
          取消
        </Button>
        <Button type="primary" onClick={() => handleNext()}>
          提交
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose={true}
      title="新增权限"
      open={createModalVisible}
      footer={renderFooter()}
      onCancel={() => onCancel()}
    >
      <Form form={form} initialValues={{}}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
