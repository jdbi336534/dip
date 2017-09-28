<template>
  <div class="kfkform">
    <jd-card>
      <div slot="title">kafka详细配置</div>
      <div slot="body" style="padding:10px;width:60vw;margin: 0 auto;">
        <el-form :model="form">
          <el-form-item label="tserver地址" :label-width="formLabelWidth">
            <el-input v-model="form.socketServerIp" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="tserver地址" :label-width="formLabelWidth">
            <el-input v-model="form.socketServerPort" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="数据集版本" :label-width="formLabelWidth">
            <el-input v-model="form.datahubVersion" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="srcid" :label-width="formLabelWidth">
            <el-input v-model="form.srcId" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="是否压缩" :label-width="formLabelWidth">
            <el-input v-model="form.dip_xml_compress" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="链路组" :label-width="formLabelWidth">
            <el-input v-model="form.dip_xml_group" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="队列名称" :label-width="formLabelWidth">
            <el-input v-model="form.dip_xml_queue_name" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="装载类名称" :label-width="formLabelWidth">
            <el-input v-model="form.loader_class_name" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="kafka topic" :label-width="formLabelWidth">
            <el-input v-model="form.dip_kafka_topic" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="zookeeper集群地址" :label-width="formLabelWidth">
            <el-input v-model="form.zk_hosts" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="kafka borkers地址" :label-width="formLabelWidth">
            <el-input v-model="form.kafka_brokers" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="testGroup" :label-width="formLabelWidth">
            <el-input v-model="form.kafka_group_id" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="写入json格式" :label-width="formLabelWidth">
            <el-input v-model="form.json_type" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="附加参数" :label-width="formLabelWidth">
            <el-input v-model="form.kafka_external_config" type="textarea" autosize placeholder="请输入内容" size="small" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </jd-card>
  </div>
</template>
<script>
  import jdCard from '@/components/common/card'
  export default {
    data() {
      return {
        form: {
          socketServerIp: '',
          socketServerPort: '',
          datahubVersion: '',
          srcId: '',
          dip_xml_compress: '',
          dip_xml_group: '',
          dip_xml_queue_name: '',
          loader_class_name: '',
          dip_kafka_topic: '',
          zk_hosts: '',
          kafka_brokers: '',
          kafka_group_id: '',
          json_type: '',
          kafka_external_config: ''
        },
        formLabelWidth: '150px',
      }
    },
    components: {
      jdCard,
    },
  }

</script>
<style lang="scss" scoped>
  .kfkform {
    width: calc(100% - 28px);
    padding: 14px;
  }

</style>
