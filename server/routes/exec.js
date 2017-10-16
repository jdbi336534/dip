const router = require('koa-router')()
const ExecCtroller = require('../controller/exec');
router.prefix('/exec')

// 开启
router.get('/startKfk', ExecCtroller.startKfk);
// 关闭
router.get('/stopKfk', ExecCtroller.stopKfk);
// 查询状态


module.exports = router