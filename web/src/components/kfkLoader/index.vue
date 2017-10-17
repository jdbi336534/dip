<template>
  <div class="kfkloader">
    <jd-card :newButton="true" @handleClick="handlePop('create')" btnname="新增kfk配置">
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
          <el-table-column prop="json_type" label="json格式"> </el-table-column>-->
          <el-table-column label="操作" width="200">
            <template scope="scope">
              <el-button type="text" @click="handlePop('lookup', scope.row)">查看</el-button>
              <el-button type="text" @click="handlePop('edit', scope.row)">修改</el-button>
              <el-button type="text" @click="handlePop('start', scope.row)">开启</el-button>
              <el-button type="text" @click="handlePop('stop', scope.row)">关闭</el-button>
            </template>
          </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </jd-card>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[30, 50, 80, 100]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog title="配置详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">dip tserver地址：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.socketServerIp}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">dip tserver端口：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.socketServerPort}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">dip 配置链路 group：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.dip_xml_group}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">dip etl 队列名称：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.dip_xml_queue_name}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">dip loader：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.loader_class_name}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">kafka topic 名称：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.dip_kafka_topic}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">zookeeper 集群地址：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.zk_hosts}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">kafka 集群 borkers 地址：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.kafka_brokers}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">消费者 groupId：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.kafka_group_id}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">kafka 写入json 格式：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.json_type}}</div>
        </el-col>
      </el-row>
      <el-row class="layout">
        <el-col :span="6">
          <div class="layout-right">kafka 附加参数：</div>
        </el-col>
        <el-col :span="18">
          <div>{{modaldata.kafka_external_config}}</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import jdCard from '@/components/common/card'
  import {
    getKafkaconfigList,
    startKfk,
    stopKfk
  } from '@/services/query'
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 30,
        total: 0,
        tableData: [{
          socketServerIp: '172.16.1.216',
          socketServerPort: '7735',
          datahubVersion: '1.0',
          srcId: '=172.16.1.25:1521',
          dip_xml_compress: '1',
          dip_xml_group: 'adsfas',
          dip_xml_queue_name: 'afasd',
          loader_class_name: 'sdfas',
          dip_kafka_topic: 'asdfs',
          zk_hosts: 'sdf',
          kafka_brokers: 'adfsf',
          kafka_group_id: 'asdfas',
          json_type: '0',
          kafka_external_config: 'asfdaaf'
        }],
        dialogFormVisible: false,
        modaldata: {
          socketServerIp: '',
          socketServerPort: '',
          datahubVersion: '1.0',
          srcId: '=172.16.1.25:1521',
          dip_xml_compress: '1',
          dip_xml_group: '',
          dip_xml_queue_name: '',
          loader_class_name: '',
          dip_kafka_topic: '',
          zk_hosts: '',
          kafka_brokers: '',
          kafka_group_id: '',
          json_type: '',
          kafka_external_config: ''
        }
      }
    },
    components: {
      jdCard,
      // jdModal
    },
    created() {
      // this.$store.commit('USER_INFO', res.data);
      console.log(this.$store.state.common.kafkaList)
      getKafkaconfigList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.success) {
          // this.tableData = res.data;
          // this.$store.commit('KAFKA', res.data);
          this.total = res.data.length;
        }
      })
    },
    methods: {
      newClick() {
        this.$router.push({
          path: '/main/kfk/config'
        });
      },
      handlePop(state, row) {
        if (state === 'create') {
          this.$store.commit('KAFKA', {
            socketServerIp: '',
            socketServerPort: '',
            datahubVersion: '1.0',
            srcId: '=172.16.1.25:1521',
            dip_xml_compress: '1',
            dip_xml_group: '',
            dip_xml_queue_name: '',
            loader_class_name: '',
            dip_kafka_topic: '',
            zk_hosts: '',
            kafka_brokers: '',
            kafka_group_id: '',
            json_type: '',
            kafka_external_config: ''
          });
          this.$router.push({
            path: '/main/kfk/config'
          });
        } else if (state === 'edit') {
          this.$store.commit('KAFKA', row);
          this.$router.push({
            path: '/main/kfk/config'
          });
        } else if (state === 'lookup') {
          this.modaldata = row;
          this.dialogFormVisible = true;
        } else if (state === 'start') {
          this.$msgbox({
            title: '消息',
            message: '确定要开启吗？',
            showCancelButton: true,
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '开启中...';
                startKfk().then(res => {
                  instance.confirmButtonLoading = false;
                  instance.confirmButtonText = '确定';
                  if (res.success) {
                    done();
                  }
                });
              } else {
                done();
              }
            }
          }).then(action => {
            this.$message({
              type: 'success',
              message: '开启成功！'
            });
          }).catch(() => {});
        } else if (state === 'stop') {
          this.$msgbox({
            title: '消息',
            message: '确定要关闭吗？',
            showCancelButton: true,
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '关闭中...';
                stopKfk().then(res => {
                  instance.confirmButtonLoading = false;
                  instance.confirmButtonText = '确定';
                  if (res.success) {
                    done();
                  }
                });
              } else {
                done();
              }
            }
          }).then(action => {
            this.$message({
              type: 'success',
              message: '关闭成功！'
            });
          }).catch(() => {});
        }
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
    .layout {
      margin-bottom: 10px;
      .layout-right {
        float: right;
        color: black;
      }
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
