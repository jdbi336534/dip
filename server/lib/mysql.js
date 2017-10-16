var mysql = require('mysql');
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

loader =
    `create table if not exists loader(
    id INT NOT NULL AUTO_INCREMENT,
    socketServerIp VARCHAR(100) NOT NULL,
    socketServerPort VARCHAR(40) NOT NULL,
    datahubVersion VARCHAR(40) NOT NULL,
    srcId VARCHAR(100) NOT NULL,
    dip_xml_compress VARCHAR(40) NOT NULL,
    dip_xml_group VARCHAR(100) NOT NULL,
    dip_xml_queue_name VARCHAR(100) NOT NULL,
    loader_class_name VARCHAR(100) NOT NULL,
    dip_kafka_topic VARCHAR(100) NOT NULL,
    zk_hosts VARCHAR(100) NOT NULL,
    kafka_brokers VARCHAR(100) NOT NULL,
    kafka_group_id VARCHAR(100) NOT NULL,
    json_type VARCHAR(40) NOT NULL,
    kafka_external_config VARCHAR(600) NOT NULL,
    PRIMARY KEY ( id )
   );`

let createTable = function (sql) {
    return query(sql, [])
}

// 建表
createTable(loader)

// 保存kafka loader 配置
let insertLoaderData = function (value) {
    let _sql = "insert into loader(socketServerIp,socketServerPort,datahubVersion,srcId,dip_xml_compress,dip_xml_group,dip_xml_queue_name,loader_class_name,dip_kafka_topic,zk_hosts,kafka_brokers,kafka_group_id,json_type,kafka_external_config) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    return query(_sql, value)
}
// 查询所有配置
let findAllLoader = function () {
    let _sql = `
    SELECT * FROM loader
      `
    return query(_sql)
}
// 通过id查找
let findDataById = function (id) {
    let _sql = `
    SELECT * from loader
      where id="${id}"
      `
    return query(_sql)
}
module.exports = {
    insertLoaderData,
    findAllLoader,
    findDataById
}