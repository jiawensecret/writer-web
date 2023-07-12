import { Button, Form, Input, Modal, Radio, TreeSelect } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { queryMenuList } from '@/services/menu/MenuController';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formValues?: Menu.MenuInfo) => void;
  onSubmit: (values: Menu.MenuInfo) => Promise<void>;
  updateModalVisible: boolean;
  values: Menu.MenuInfo;
}

// @ts-ignore
function filterMenuTreeData(
  data: Array<Menu.MenuInfo> | undefined,
  value: any,
) {
  if (data) {
    return data
      .filter((node) => node.id !== value)
      .map((node) => {
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: filterMenuTreeData(node.children, value),
          };
        }
        return node;
      });
  }

  return data;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formValues, setFormValues] = useState<Menu.MenuInfo>({
    id: props.values.id,
    name: props.values.name,
    menu_status: props.values.menu_status,
    menu_sort: props.values.menu_sort,
    route: props.values.route,
    parent_id: props.values.parent_id,
  });
  const [form] = Form.useForm();
  const { updateModalVisible, onCancel } = props;
  const { onSubmit: handleUpdate, onCancel: handleUpdateModalVisible } = props;
  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormValues({ ...formValues, ...fieldsValue });
    await handleUpdate({ ...formValues, ...fieldsValue });
  };

  const { data: menus } = useRequest(async () => {
    const res = await queryMenuList();
    if (res.data) {
      res.data.unshift({
        name: '/',
        id: 0,
      });
      return res.data;
    }
    return [];
  });

  const updateMenus = filterMenuTreeData(menus, formValues.id);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="parend_id" label="父级菜单">
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            defaultValue={formValues.parent_id}
            treeData={updateMenus}
            placeholder="请选择父级菜单"
            treeDefaultExpandAll
            fieldNames={{
              label: 'name',
              value: 'id',
            }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        <Form.Item
          name="route"
          label="路由"
          rules={[{ required: true, message: '请输入路由！' }]}
        >
          <Input placeholder="请输入路由" allowClear />
        </Form.Item>
        <Form.Item
          name="menu_status"
          label="状态"
          initialValue={1}
          rules={[{ required: true, message: '请选择状态！' }]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="menu_sort" label="排序">
          <Input placeholder="请输入排序" allowClear />
        </Form.Item>
      </>
    );
  };
  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, formValues)}>
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
      destroyOnClose
      title="编辑菜单"
      open={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        initialValues={{
          id: formValues.id,
          name: formValues.name,
          menu_status: formValues.menu_status,
          menu_sort: formValues.menu_sort,
          route: formValues.route,
          parent_id: formValues.parent_id,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
