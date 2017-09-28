<template>
  <div class="kfkloader">
    <jd-card :newButton="true" @handleClick="newClick" btnname="新增kfk配置">
      <div slot="title">KFK配置</div>
      <div slot="body">
        <el-table :data="tableData" stripe>
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
    </jd-card>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"> </el-pagination>
    </div>

  </div>
</template>
<script>
  import jdCard from '@/components/common/card'
  // import jdModal from '@/components/common/modal/index'
  export default {
    data() {
      return {
        
        currentPage: 1,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }]
      }
    },
    components: {
      jdCard,
      // jdModal
    },
    methods: {
      newClick() {
        console.log('new click')
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
