import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
// const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
// const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')
const blackRouter = r => require.ensure([], () => r(require('@/components/common/blackrouter')), 'blackRouter');
const main = r => require.ensure([], () => r(require('@/components/main')), 'main');
const list = r => require.ensure([], () => r(require('@/components/kfkLoader/index')), 'list');
const config = r => require.ensure([], () => r(require('@/components/kfkLoader/config')), 'config');

export default new Router({
  routes: [{
    path: '/',
    redirect: 'main'
  }, {
    path: '/main',
    name: 'main',
    component: main,
    children: [{
      path: 'kfk',
      name: 'kfk',
      component: blackRouter,
      children: [{
        path: 'list',
        name: 'list',
        component: list
      }, {
        path: 'config',
        name: 'config',
        component: config
      }]
    }]
  }]
});
