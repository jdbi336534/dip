<template>
  <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" :close-on-press-escape="false">
    <slot name="body"></slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        visible: true
      }
    },
    props: {
      title: {
        type: String,
        default: 'title'
      }
    },
    methods: {
      confirm() {
        this.$emit('handleConfirm');
      }
    }
  }

</script>
