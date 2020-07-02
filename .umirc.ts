import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title: 'hanoi',
    logo: null,
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/repo',
      component: '@/layouts/index',
      title: 'repo',
      menu: {
        name: '项目', // 兼容此写法
      },
      routes: [
        {
          component: '@/pages/repo/index'
        }
      ]
    },
  ],
});
