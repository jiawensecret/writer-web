import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess } from '@umijs/max';
import UpdateForm from '@/pages/menus/components/UpdateForm';
import CreateForm from '@/pages/menus/components/CreateForm';
import {
  updateMenu,
  addMenu,
  queryMenuList,
} from '@/services/menu/MenuController';

const handleAdd = async (fields: Menu.MenuInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addMenu({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: Menu.MenuInfo) => {
  const hide = message.loading('正在更新');
  try {
    await updateMenu({ ...fields });
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

export default () => {
  const actionRef = useRef<ActionType>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const access = useAccess();
  const columns: ProColumns<Menu.MenuInfo>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      search: false,
      ellipsis: true,
    },
    {
      title: '路径',
      dataIndex: 'route',
      search: false,
      ellipsis: true,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'menu_status',
      ellipsis: true,
      valueType: 'select',
      search: false,
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <>
          <Access accessible={access.MenuUpdate}>
            <a
              onClick={() => {
                setUpdateFormValues(record);
                handleUpdateModalVisible(true);
              }}
            >
              编辑
            </a>
          </Access>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '菜单管理',
      }}
    >
      <ProTable<Menu.MenuInfo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async () => {
          const { data } = await queryMenuList();
          const success = !!data;
          return {
            data: data || [],
            success,
          };
        }}
        rowKey="id"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
        }}
        dateFormatter="string"
        headerTitle="菜单列表"
        toolBarRender={() => [
          // eslint-disable-next-line react/jsx-key
          <Access accessible={access.MenuAdd}>
            <Button
              key="button"
              onClick={() => {
                handleModalVisible(true);
              }}
              type="primary"
            >
              新建
            </Button>
          </Access>,
        ]}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        createModalVisible={createModalVisible}
      ></CreateForm>
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
        />
      ) : null}
    </PageContainer>
  );
};
