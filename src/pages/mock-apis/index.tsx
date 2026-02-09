import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Divider, message } from 'antd';
import React, { useRef, useState } from 'react';
import services from '@/services/mock-api';
import { Access, useAccess } from '@umijs/max';
import UpdateForm from '@/pages/mock-apis/components/UpdateForm';
import CreateForm from '@/pages/mock-apis/components/CreateForm';
import {
  addMockApi,
  updateMockApi,
} from '@/services/mock-api/MockApiController';

const { queryMockList } = services.MockApiController;

const handleAdd = async (fields: MockApi.MockInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addMockApi({ ...fields });
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
const handleUpdate = async (fields: MockApi.MockInfo) => {
  const hide = message.loading('正在更新');
  try {
    await updateMockApi({ ...fields });
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
  useState<boolean>(false);
  const access = useAccess();
  const columns: ProColumns<MockApi.MockInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '编码(路径)',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <>
          <Access accessible={access.MockUpdate}>
            <a
              onClick={() => {
                setUpdateFormValues(record);
                handleUpdateModalVisible(true);
                console.log(record);
              }}
            >
              编辑
            </a>
          </Access>
          <Divider type="vertical" />
        </>
      ),
    },
  ];
  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: 'mocks管理',
      }}
    >
      <ProTable<MockApi.MockInfo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          const { data } = await queryMockList({
            ...params,
            // @ts-ignore
            filter,
          });
          const success = !!data;
          return {
            data: data?.list || [],
            success,
          };
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          collapsed: false,
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        dateFormatter="string"
        headerTitle="mock-api列表"
        toolBarRender={() => [
          // eslint-disable-next-line react/jsx-key
          <Access accessible={access.MockAdd}>
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
              await actionRef.current.reload();
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
                await actionRef.current.reload();
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
