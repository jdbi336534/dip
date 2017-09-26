<style lang="scss" scoped>


</style>
<template>
  <div class="director-layout">
    <jd-aside />
    <!--<router-view></router-view> -->
  </div>
</template>
<script>
  import jdAside from './common/aside/index';
  import {
    getSessionStore
  } from '@/assets/js/mUtils';
  export default {
    data() {
      return {
        defaultActive: this.$route.path,
        name: '',
        open: []
      }
    },
    watch: {
      $route(to, from) {
        this.getwhichOpen(to.path);
      }
    },
    components: {
      jdAside
    },
    created() {
      this.getwhichOpen(this.$route.path);
    },
    mounted() {
      this.name = getSessionStore('DisplayName');
    },
    methods: {
      getwhichOpen(path) {
        // 获取当前页面的路由，并是相应菜单展开且高亮
        let arr = [];
        arr.push(path.split('/')[1]);
        this.open = arr;
      },
      handleSelectMenu(path) {
        this.$router.push({
          path: path
        })
      }
    }
  }

</script>
