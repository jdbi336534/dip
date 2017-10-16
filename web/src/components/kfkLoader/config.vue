<template>
  <div class="kfkform">
    <h1 class="main-title"> <span>新增配置</span> <a href="javascript:void(0)" class="link" style="display:;" @click="goback">
    <span >放弃修改</span>
    </a> </h1>
    <div class="beian-flow">
      <div class="beian-flow-guide">
        <div class="guide-box">
          <el-steps :space="100" direction="vertical" :active="step">
            <el-step title="基础配置类"></el-step>
            <el-step title="loader配置类"></el-step>
          </el-steps>
        </div>
        <div class="wiki-box">
          <p class="wiki-title">参考文档</p>
          <ul class="wiki-content">
            <li>暂无</li>
            <!--  <li>24243234</li>
            <li>23424</li>
            <li>342243</li> -->
          </ul>
        </div>
      </div>
      <div class="tc-panel">
        <div class="form-wrappe"> <span class="num">{{step}}</span>
          <h2 class="form-legend"> <span>{{step===1?'基础配置类':'kafka loader配置'}}</span> </h2>
          <div v-show="step===1">
            <el-form :model="form" :rules="rules" ref="baseForm" label-position="left" style="padding-left:10px;">
              <el-form-item label="tserver地址" :label-width="formLabelWidth" prop="socketServerIp">
                <el-input v-model="form.socketServerIp" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="tserver端口" :label-width="formLabelWidth" prop="socketServerPort">
                <el-input v-model="form.socketServerPort" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="数据集版本" :label-width="formLabelWidth" prop="datahubVersion">
                <el-input v-model="form.datahubVersion" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="srcid" :label-width="formLabelWidth" prop="srcId">
                <el-input v-model="form.srcId" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="是否压缩" :label-width="formLabelWidth" prop="dip_xml_compress">
                <el-select v-model="form.dip_xml_compress" placeholder="请选择" size="small">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"> </el-option>
                </el-select>
              </el-form-item>
              <!--  <el-input v-model="form.dip_xml_compress" auto-complete="off" size="small" style="width:300px;"></el-input>--></el-form-item>
              <el-form-item label="链路组" :label-width="formLabelWidth" prop="dip_xml_group">
                <el-input v-model="form.dip_xml_group" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="队列名称" :label-width="formLabelWidth" prop="dip_xml_queue_name">
                <el-input v-model="form.dip_xml_queue_name" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="装载类名称" :label-width="formLabelWidth" prop="loader_class_name">
                <el-input v-model="form.loader_class_name" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="step===2">
            <el-form :model="form" :rules="rules" ref="loaderForm" label-position="left" style="padding-left:10px;">
              <el-form-item label="kafka topic" :label-width="formLabelWidth" prop="dip_kafka_topic">
                <el-input v-model="form.dip_kafka_topic" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="zookeeper集群地址" :label-width="formLabelWidth" prop="zk_hosts">
                <el-input v-model="form.zk_hosts" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="kafka borkers地址" :label-width="formLabelWidth" prop="kafka_brokers">
                <el-input v-model="form.kafka_brokers" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="testGroup" :label-width="formLabelWidth" prop="kafka_group_id">
                <el-input v-model="form.kafka_group_id" auto-complete="off" size="small" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="写入json格式" :label-width="formLabelWidth" prop="json_type">
                <el-select v-model="form.json_type" placeholder="请选择" size="small">
                  <el-option label="主要数据" value="1"></el-option>
                  <el-option label="全数据" value="0"> </el-option>
                </el-select>
                <!--<el-input v-model="form.json_type" auto-complete="off" size="small" style="width:300px;"></el-input>--></el-form-item>
              <el-form-item label="附加参数" :label-width="formLabelWidth" prop="kafka_external_config">
                <el-input v-model="form.kafka_external_config" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入内容"
                  size="small" auto-complete="off" style="width:300px;"> </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="procedure">
          <div v-show="step===1">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="baseConfig">下一步，loader配置</el-button>
          </div>
          <div v-show="step===2">
            <el-button @click="lastStep">上一步</el-button>
            <el-button type="primary" @click="loaderConfig" :loading="loading">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    saveConfig
  } from '@/services/query';
  export default {
    data() {
      var validateServerIp = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入IP地址'));
        } else {
          let temp = value.replace(/(^\s*)|(\s*$)/g, '');
          if (!temp.length) {
            callback(new Error('请输入正确的IP地址!'));
          } else if (
            /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
            .test(value) !== true) {
            callback(new Error('请输入正确的IP地址!'));
          } else {
            callback();
          }
        }
      };
      var validateport = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入端口号'));
        } else {
          let temp = value.replace(/(^\s*)|(\s*$)/g, '');
          if (!temp.length) {
            callback(new Error('请输入正确的端口号!'));
          } else if (/^\d{2,5}$/.test(value) !== true) {
            callback(new Error('请输入正确的端口号!'));
          } else {
            callback();
          }
        }
      };
      return {
        step: 1,
        loading: false,
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
        rules: {
          socketServerIp: [{
            validator: validateServerIp,
            required: true,
            trigger: 'blur'
          }],
          socketServerPort: [{
            validator: validateport,
            required: true,
            trigger: 'blur'
          }],
          datahubVersion: [{
            required: true,
            trigger: 'blur',
            message: '请填写数据集版本'
          }, {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }],
          srcId: [{
            required: true,
            trigger: 'blur',
            message: '请填写srcid'
          }, {
            min: 1,
            max: 40,
            message: '长度在 1 到 40 个字符',
            trigger: 'blur'
          }],
          dip_xml_compress: [{
            required: true,
            trigger: 'change'
          }],
          dip_xml_group: [{
            required: true,
            trigger: 'blur',
            message: '请填写链路组'
          }, {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }],
          dip_xml_queue_name: [{
            required: true,
            trigger: 'blur',
            message: '请填写队列名称'
          }, {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }],
          loader_class_name: [{
            required: true,
            trigger: 'blur',
            message: '请填写装载类名称'
          }, {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }],
          dip_kafka_topic: [{
            required: true,
            trigger: 'blur',
            message: '请填写kafka topic名称'
          }, {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }],
          zk_hosts: [{
            required: true,
            trigger: 'blur',
            message: '请填写zokeeper集群地址'
          }, {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }],
          kafka_brokers: [{
            required: true,
            trigger: 'blur',
            message: '请填写kafka集群borkers地址'
          }, {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }],
          kafka_group_id: [{
            required: true,
            trigger: 'blur',
            message: '请填写测试用消费者groupid'
          }, {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }],
          json_type: [{
            required: true,
            trigger: 'change'
          }],
          kafka_external_config: [{
            required: true,
            trigger: 'blur',
            message: '请填写kafka附加参数，使用json格式的key:value对'
          }, {
            min: 1,
            max: 600,
            message: '长度在 1 到 600 个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    components: {},
    created() {
      this.form = Object.assign({}, this.$store.state.common.kafkaList);
    },
    methods: {
      baseConfig() {
        this.$refs['baseForm'].validate((valid) => {
          if (valid) {
            this.step = 2;
          } else {
            return false;
          }
        });
      },
      lastStep() {
        this.step = 1;
      },
      loaderConfig() {
        this.loading = true;
        this.$refs['loaderForm'].validate((valid) => {
          if (valid) {
            saveConfig(this.form).then(res => {
              this.loading = false;
              if (res.success) {
                this.$alert('保存成功！', '提示', {
                  confirmButtonText: '确定',
                  showClose: false,
                  type: 'success',
                  callback: () => {
                    this.$router.push({
                      path: '/main/kfk/list'
                    });
                  }
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      goback() {
        this.$router.push({
          path: '/main/kfk/list'
        });
      }
    }
  }

</script>
<style lang="scss" scoped>
  .kfkform {
    width: calc(100% - 28px);
    padding: 14px;
    .main-title {
      font-size: 22px;
      color: #171d25;
      font-weight: 400;
      height: 61px;
      line-height: 61px;
      border-bottom: 1px solid #bec0c3;
      margin: 0 20px 16px;
      .link {
        font-size: 14px;
        float: right;
        text-decoration: none;
        color: #2277da;
      }
    }
    .beian-flow {
      width: 100%;
      position: relative;
      display: table;
      .beian-flow-guide {
        display: table-cell;
        width: 220px;
        border-right: 1px solid #edeef2;
        vertical-align: top;
        .guide-box,
        .wiki-box {
          margin: 0 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #edeef2;
          .wiki-title {
            font-size: 14px;
            color: #333;
            margin-bottom: 10px;
          }
          .wiki-content {
            font-size: 12px;
            color: #2277da;
            line-height: 24px;
          }
        }
      }
      .tc-panel {
        margin-right: auto;
        box-shadow: none;
        padding: 0;
        max-width: inherit;
        margin-left: 0;
        box-sizing: border-box;
        .form-wrappe {
          position: relative;
          border: 1px solid #dce0e8;
          padding: 20px;
          margin: 20px 30px;
          .num {
            display: block;
            width: 28px;
            height: 28px;
            background-image: url(../../assets/img/beian-201708091817.png);
            position: absolute;
            top: 0;
            left: 0;
            line-height: 19px;
            color: #fff;
            font-size: 12px;
            text-indent: 4px;
            background-position: -283px -64px;
          }
          .form-legend {
            font-size: 14px;
            color: #171d25;
            padding-left: 10px;
            line-height: 16px;
          }
        }
        .procedure {
          margin: -1px 20px 100px;
          margin-left: 30px;
          padding-top: 20px;
          border-top: solid 1px #e2e2e3;
        }
      }
    }
  }

</style>
