import { request } from '@umijs/max';

export async function getMenuPermission(
  menuId: number,
  params: {
    name?: string;
    code?: string;
  },
) {
  return request<Permission.MenuPermissionApi>(`/api/${menuId}/permissions`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function addPermission(params: Permission.PermissionInfo) {
  return request<Common.Result>('/api/permission', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePermission(params: Permission.PermissionInfo) {
  return request<Common.Result>(`/api/permission/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
