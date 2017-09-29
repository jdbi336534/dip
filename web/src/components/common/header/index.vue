<template>
  <div class="header">
    <div class="compony"><img src="http://www.r7data.com/picture/logo_color.png" alt="翱旗科技"></div>
    <div class="user">
      <div class="message"> <i class="iconfont icon-xinxiang"></i> </div>
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
        <el-submenu index="2">
          <template slot="title">dip用户</template>
          <el-menu-item index="2-1">设置</el-menu-item>
          <el-menu-item index="2-2">修改密码</el-menu-item>
          <!-- <el-menu-item index="2-3">选项3</el-menu-item> --></el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .header {
    height: 47px;
    display: flex;
    background-color: #262626;
    box-sizing: border-box;
    justify-content: space-between;
    .compony {
      height: 31px;
      width: 143px;
      margin-top: 8px;
      margin-left: 20px;
      >img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    .user {
      .message {
        cursor: pointer;
        display: inline-block;
        height: 47px;
        width: 47px;
        float: left;
        line-height: 47px;
        text-align: center;
        font-size: 18px;
        color: #bbb;
        transition: all .2s;
        &:hover {
          color: #108ee9;
        }
      }
      .el-menu-demo {
        margin-left: 10px;
        margin-right: 50px;
        display: inline-block;
      }
       :global {
        .el-menu--dark {
          background: #262626;
        }
      }
    }
  }

</style>
<style lang="scss">
  .header {
    .user {
      .el-submenu .el-menu-item {
        min-width: 0;
      }
      .el-menu--horizontal .el-submenu .el-submenu__title {
        height: 47px;
        line-height: 47px;
        &:hover {
          color: #108ee9;
          background-color: transparent;
        }
      }
    }
  }

</style>
