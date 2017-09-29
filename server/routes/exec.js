const router = require('koa-router')()
const ExecCtroller = require('../controller/exec');
router.prefix('/exec')

// 保存loaders
// router.post('/kafkaloader', LoaderCtroller.Save);
// 查询loader
router.get('/execShell', ExecCtroller.startKfk);
module.exports = router