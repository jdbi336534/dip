var Model = require('../lib/mysql.js');
var tools = require('../utils/tool');
var fs = require('fs');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();

// var xml2js = require('xml2js');
// var builder = new xml2js.Builder();  // JSON->xml
// var parser = new xml2js.Parser();   //xml -> json
// var json =  parser.parseString（xml）;
// var xml =  builder.buildObject（json）;



// 保存kafka loader
const Save = async(ctx) => {
    let socketServerIp = ctx.request.body.socketServerIp;
    let socketServerPort = ctx.request.body.socketServerPort;
    let datahubVersion = ctx.request.body.datahubVersion;
    let srcId = ctx.request.body.srcId;
    let dip_xml_compress = ctx.request.body.dip_xml_compress;
    let dip_xml_group = ctx.request.body.dip_xml_group;
    let dip_xml_queue_name = ctx.request.body.dip_xml_queue_name;
    let loader_class_name = ctx.request.body.loader_class_name;

    let dip_kafka_topic = ctx.request.body.dip_kafka_topic;
    let zk_hosts = ctx.request.body.zk_hosts;
    let kafka_brokers = ctx.request.body.kafka_brokers;
    let kafka_group_id = ctx.request.body.kafka_group_id;
    let json_type = ctx.request.body.json_type;
    let kafka_external_config = ctx.request.body.kafka_external_config;
    // 基础配置文件
    let base = {
        config: {
            socketServerIp,
            socketServerPort,
            datahubVersion,
            srcId,
            dip_xml_compress,
            dip_xml_group,
            dip_xml_queue_name,
            loader_class_name
        }
    };
    // kafka配置文件
    let kafka = {
        config: {
            dip_kafka_topic,
            zk_hosts,
            kafka_brokers,
            kafka_group_id,
            json_type,
            kafka_external_config
        }
    }
    // var xml =  builder.buildObject(ctx.request.body);
    let baseXml = tools.json2xml(base, '\t');
    let kafkaXml = tools.json2xml(kafka, '\t');
    let date = new Date();
    let Y = date.getFullYear() + '';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
    let D = date.getDate() + '';
    let datepath = Y + M + D;
    if (!fs.existsSync('public/xml/' + datepath)) {
        fs.mkdirSync('public/xml/' + datepath);
    }
    // 先将xml写入文件，再保存数据库
    fs.writeFileSync('public/xml/' + datepath + '/config.xml', baseXml);
    fs.writeFileSync('public/xml/' + datepath + '/kfk-config.xml', kafkaXml);
    let doc = await Model.insertLoaderData([socketServerIp, String(socketServerPort), datahubVersion, srcId, String(dip_xml_compress), dip_xml_group, dip_xml_queue_name, loader_class_name, dip_kafka_topic, zk_hosts, kafka_brokers, kafka_group_id, String(json_type), kafka_external_config]);
    if (doc.affectedRows) {
        ctx.body = {
            code: 200,
            data: doc,
            msg: '保存成功！',
        }
    }
};
const AllLoaders = async(ctx) => {
    // let id = ctx.query.id;
    let doc = await Model.findAllLoader();
    if (doc) {
        ctx.body = {
            code: 200,
            data: doc
        }
    }
}
module.exports = {
    Save,
    AllLoaders
};