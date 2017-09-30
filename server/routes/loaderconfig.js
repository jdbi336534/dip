const router = require('koa-router')()
const LoaderCtroller = require('../controller/loader');
router.prefix('/loader')

// 保存loaders
router.post('/kafkaloader', LoaderCtroller.Save);
// 查询loader
router.post('/allLoaders', LoaderCtroller.AllLoaders);
module.exports = router