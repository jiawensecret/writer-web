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
      target: 'http://10.100.1.32:8002/',
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
