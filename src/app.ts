// 运行时配置
import { RuntimeAntdConfig, RequestConfig } from 'umi';
import { theme } from 'antd';
import services from '@/services/global';

export const antd: RuntimeAntdConfig = (memo) => {
  memo.theme ||= {};
  memo.theme.algorithm = theme.darkAlgorithm;
  return memo;
};

export const request: RequestConfig = {
  timeout: 5000,
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    [
      (url, options) => {
        //options.headers['x-token'] = localStorage.getItem('token');
        options.headers['user-id'] = 1;
        return { url, options };
      },
      (error: any) => {
        return Promise.reject(error);
      },
    ],
  ],
  responseInterceptors: [
    [
      (response) => {
        return response;
      },
      (error: any) => {
        const { status } = error.response;
        if (status === 403) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    ],
  ],
};
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<Common.Me> {
  const res = await services.GlobalController.getCurrentUser();

  if (!res.data) return {};

  if (res.data.permissions) {
    let k: any[] = [];
    res.data.permissions.forEach((v) => {
      k.push(v.code);
    });
    res.data.permission = k;
  }
  console.log(res.data);
  return res.data;
}

export const layout = () => {
  return {
    menu: {
      locale: false,
    },
  };
};
