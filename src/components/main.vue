<template>
  <div class="director-layout">
    <div class="header">
      <jd-header /> </div>
    <div class="body" :class="{bodycon:collapse}">
      <div class="menu">
        <jd-aside @collapse="handCollapse" /> </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import jdAside from './common/aside/index';
  import jdHeader from './common/header/index';
  export default {
    data() {
      return {
        collapse: false
      }
    },
    components: {
      jdAside,
      jdHeader
    },
    created() {},
    mounted() {},
    methods: {
      handCollapse(val) {
        this.collapse = val;
      },
    }
  }

</script>
<style lang="scss" scoped>
  .director-layout {
    height: 100vh;
    .header {
      width: 100vw;
      height: 47px;
    }
    .body {
      height: calc(100vh - 47px);
      position: relative;
      .menu {
        // height: 100vh;
        // width: 224px;
        overflow: visible;
        position: absolute;
      }
      .content {
        margin-left: 224px;
        height: calc(100vh - 47px);
        -webkit-transition: all .3s ease-out;
        -o-transition: all .3s ease-out;
        transition: all .3s ease-out;
      }
    }
    .bodycon {
      .content {
        height: calc(100vh - 47px);
        margin-left: 64px;
        -webkit-transition: all .3s ease-out;
        -o-transition: all .3s ease-out;
        transition: all .3s ease-out;
      }
    }
  }

</style>
