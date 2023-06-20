import { request } from '@umijs/max';

export async function queryUserList(params: {
  username?: string;
  name?: string;
  tel?: string;
  permission_str?: string;
  page?: number;
  page_size?: number;
}) {
  return request<User.UserList>('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
