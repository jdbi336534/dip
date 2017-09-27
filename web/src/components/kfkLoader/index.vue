<template>
  <div class="page"> 
      <jd-card>
            <div slot="title">新增KFK配置</div>
      </jd-card>
  </div>
</template>
<script>
  import jdCard from '@/components/common/card'
  export default {
    data() {
      return {}
    },
    components: {
      jdCard
    },
    methods: {}
  }

</script>
<style lang="scss" scoped>
  .page {
    width: calc(100% - 28px);
    height: calc(100% - 28px);
    padding: 14px;
    /* background: #f0f; */
  }

</style>
