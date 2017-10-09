<template>
  <div class="kfkloader">
    <jd-card :newButton="true" @handleClick="newClick" btnname="新增kfk配置">
      <div slot="title">KFK配置</div>
      <div slot="body">
        <el-table :data="tableData" stripe>
          <el-table-column prop="socketServerIp" label="tserver地址" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="socketServerPort" label="tserver端口" show-overflow-tooltip> </el-table-column>
          <!--  <el-table-column prop="datahubVersion" label="地址"> </el-table-column>
          <el-table-column prop="srcId" label="姓名" > </el-table-column>
          <el-table-column prop="dip_xml_compress" label="地址"> </el-table-column>
          <el-table-column prop="dip_xml_group" label="姓名" > </el-table-column>
          <el-table-column prop="dip_xml_queue_name" label="地址"> </el-table-column>-->
          <el-table-column prop="loader_class_name" label="装载类名" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="dip_kafka_topic" label="kafka topic" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="zk_hosts" label="zookeeper集群地址" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="kafka_brokers" label="brokers地址" show-overflow-tooltip> </el-table-column>
          <!--    <el-table-column prop="kafka_group_id" label="姓名" > </el-table-column>
          <el-table-column prop="json_type" label="json格式"> </el-table-column>
         <el-table-column prop="kafka_external_config" label="附加参数" > </el-table-column> --></el-table>
      </div>
    </jd-card>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
  import jdCard from '@/components/common/card'
  import {
    getKafkaconfigList
  } from '@/services/query'
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 14,
        total: 0,
        tableData: []
      }
    },
    components: {
      jdCard,
      // jdModal
    },
    created() {
      getKafkaconfigList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.data;
          console.log(res.data.data);
        }
      })
    },
    methods: {
      newClick() {
        this.$router.push({
          path: '/main/kfk/config'
        });
      },
      handleConfirm() {},
      handleSizeChange(val) {},
      handleCurrentChange(val) {}
    }
  }

</script>
<style lang="scss" scoped>
  .kfkloader {
    width: calc(100% - 28px);
    height: calc(100% - 28px);
    padding: 14px;
    .el-table {
      height: calc(100vh - 182px);
      border: 0px;
      &::after {
        width: 0;
      }
      &::before {
        height: 0;
      }
    }
    .pagination {
      text-align: center;
      margin-top: 14px;
    }
  }

</style>
<style lang="scss">
  .kfkloader {
    .el-table__body-wrapper {
      height: calc(100% - 30px);
    }
  }

</style>
