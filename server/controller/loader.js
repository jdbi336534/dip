// var Model = require('../lib/mysql.js');
var tools = require('../utils/tool');
var fs = require('fs');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();

// var xml2js = require('xml2js');
// var builder = new xml2js.Builder();  // JSON->xml
var parser = new xml2js.Parser(); //xml -> json
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
    };
    let baseXml = tools.json2xml(base, '\t');
    let kafkaXml = tools.json2xml(kafka, '\t');
    let envpath = String(process.env.JDIP_HOME);
    envpath = envpath + '/config'
    console.log(process.env.JDIP_HOME);
    try {
        if (!fs.existsSync(envpath + '/base')) {
            fs.mkdirSync(envpath + '/base');
        }
        if (!fs.existsSync(envpath + 'kafka')) {
            fs.mkdirSync(envpath + 'kafka');
        }
        // 先将xml写入文件，再保存数据库
        fs.writeFileSync(envpath + '/base/config.xml', baseXml);
        fs.writeFileSync(envpath + '/kafka/kafka-config.xml', kafkaXml);
    } catch (err) {
        ctx.throw(500, err.message);
    };
    ctx.body = {
        code: 200,
        msg: '保存成功！',
    }
    // let doc = await Model.insertLoaderData([socketServerIp, String(socketServerPort), datahubVersion, srcId, String(dip_xml_compress), dip_xml_group, dip_xml_queue_name, loader_class_name, dip_kafka_topic, zk_hosts, kafka_brokers, kafka_group_id, String(json_type), kafka_external_config]);
    // if (doc.affectedRows) {
    //     ctx.body = {
    //         code: 200,
    //         data: doc,
    //         msg: '保存成功！',
    //     }
    // }
};
const AllLoaders = (ctx) => {
    let envpath = String(process.env.JDIP_HOME);
    envpath = envpath + '/config'
    if (fs.existsSync(envpath + '/base/config.xml') && fs.existsSync(envpath + '/kafka/kafka-config.xml')) {
        let config = fs.readFileSync(envpath + '/base/config.xml', "utf-8");
        let kfkConfig = fs.readFileSync(envpath + '/kafka/kafka-config.xml', "utf-8");
        parser.parseString(config, (err, result) => {
            if (err) {
                ctx.throw(500, '读取文件出错');
            }
            let data = Object.assign({}, result);
            for (let key in data.config) {
                data.config[key] = data.config[key][0]
            }
            parser.parseString(kfkConfig, (err, result) => {
                if (err) {
                    ctx.throw(500, '读取文件出错');
                }
                let kfkdata = Object.assign({}, result);
                for (let key in kfkdata.config) {
                    kfkdata.config[key] = kfkdata.config[key][0]
                }
                let combine = Object.assign(data.config, kfkdata.config);
                ctx.body = {
                    code: 200,
                    data: [combine]
                }
            });
        });
    } else {
        ctx.throw(404, '暂无数据，请先新增！');
    }
};

const GetLoaderById = async(ctx) => {
    let id = ctx.query.id;
    // let doc = await Model.findDataById(id);
    if (doc) {
        ctx.body = {
            code: 200,
            data: doc
        }
    }
};
module.exports = {
    Save,
    AllLoaders,
    GetLoaderById
};