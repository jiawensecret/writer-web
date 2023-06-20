import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    configProvider: {},
    dark: false,
    import: false,
    style: 'less',
    theme: {},
  },
  proxy: {
    '/api': {
      target: 'http://192.168.31.164:8002/',
      changeOrigin: true,
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: 'data',
  },
  layout: {
    title: '@umijs/max',
  },
  npmClient: 'yarn',
});
