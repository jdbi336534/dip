<template>
  <div class="aside">
    <el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <div class="collapse" @click="handleClick"> <i class="iconfont icon-shouqi" v-show="!isCollapse"></i><i v-show="isCollapse" class="iconfont icon-shouqi-copy"></i>        </div>
      <el-submenu index="1">
        <template slot="title"> <i class="el-icon-message"></i> <span slot="title">配置</span> </template>
        <el-menu-item index="1-1">kafka配置</el-menu-item>
       <!-- <el-menu-item index="1-2">选项2</el-menu-item>-->
        <!--   <el-menu-item-group> <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group> -->
        <!--   <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group> 
        <el-submenu index="1-4"> <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>--></el-submenu>
      <!-- <el-menu-item index="2"> <i class="el-icon-menu"></i> <span slot="title">导航二</span> </el-menu-item>
      <el-menu-item index="3"> <i class="el-icon-setting"></i> <span slot="title">导航三</span> </el-menu-item>--></el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleClick() {
        this.isCollapse = !this.isCollapse;
        this.$emit('collapse', this.isCollapse);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>
<style lang="scss" scoped>
  .aside {
    height: calc(100vh - 47px);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 224px;
    }
    .collapse {
      width: 100%;
      height: 30px;
      font-weight: 600;
      background: #e4e8f1;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      color: #48576a;
      cursor: pointer;
      -webkit-transition: all 5s ease-out;
      -o-transition: all 5s ease-out;
      transition: all 5s ease-out;
      -webkit-transition: all 5s ease-in;
      -o-transition: all 5s ease-in;
      transition: all 5s ease-in;
      &:hover {
        color: #000;
      }
    }
     :global {
      .el-menu {
        height: 100%;
      }
    }
  }

</style>
