import { request } from '@umijs/max';

export async function getCurrentUser() {
  return request<Common.MeApi>('/api/me', {
    method: 'GET',
  });
}
