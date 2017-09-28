<template>
  <div>
    <div style="border:1px solid rgb(221, 222, 225);width:100%;height:100%;">
      <div style="border-bottom:1px solid rgb(221, 222, 225);padding:5px 0 5px 10px;font-size:14px;background: #f5f5f5;">
        <slot name="title"></slot>
      </div>
      <div v-if="newButton" style="border-bottom:1px solid rgb(221, 222, 225);padding:4px 0 4px 10px;"> <a href="javascript:;" class="addbtn" @click="handleClick"><i style="font-size:14px;" class="el-icon-plus">{{btnname}}</i></a></div>
      <div style="padding:0;overflow:hidden;">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      newButton: {
        type: Boolean,
        default: false
      },
      btnname: {
        type: String,
        default: '新增'
      },
    },
    methods: {
      handleClick() {
        this.$emit('handleClick');
      }
    }
  }

</script>
<style lang="scss" scoped>
  .addbtn {
    color: #108ee9;
    text-decoration: none;
    &:hover {
      color: #49a9ee;
    }
  }

</style>
