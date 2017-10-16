const router = require('koa-router')()
const LoaderCtroller = require('../controller/loader');
router.prefix('/loader')

// 保存loaders
router.post('/kafkaloader', LoaderCtroller.Save);
// 查询loader
router.post('/allLoaders', LoaderCtroller.AllLoaders);
// 通过id查找
router.post('/GetLoaderById', LoaderCtroller.GetLoaderById);
module.exports = router