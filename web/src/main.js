// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import store from './store/';
import router from './router';
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import '@/assets/css/iconfont.css';
// import ECharts from 'vue-echarts/components/ECharts.vue'

// Vue.component('chart', ECharts)
Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(ElementUI);
/* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  });

