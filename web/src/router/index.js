import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const blackRouter = r => require.ensure([], () => r(require('@/components/common/blackrouter')), 'blackRouter');
// const main = r => require.ensure([], () => r(require('@/components/main')), 'main');
// const list = r => require.ensure([], () => r(require('@/components/kfkLoader/index')), 'list');
// const config = r => require.ensure([], () => r(require('@/components/kfkLoader/config')), 'config');
import blackRouter from '@/components/common/blackrouter'
import main from '@/components/main'
import list from '@/components/kfkLoader/index'
import config from '@/components/kfkLoader/config'

export default new Router({
  routes: [{
    path: '/',
    redirect: 'main/kfk/list'
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
