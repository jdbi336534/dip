const router = require('koa-router')()
const LoaderCtroller = require('../controller/loader');
router.prefix('/loader')

router.post('/kafkaloader', LoaderCtroller.Save);

module.exports = router