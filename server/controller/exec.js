const {
    execFile,
    exec,
    execSync
} = require('child_process');
let envpath = String(process.env.JDIP_HOME);
envpath = envpath + '/bin';
// 开启kafka
const startKfk = (ctx) => {
    try {
        // stdout为脚本执行成功后的输出
        const stdout = execSync(envpath + '/start-client.sh', {
            encoding: 'utf8'
        });
        ctx.body = {
            code: 200,
            msg: '开启成功！',
            data: stdout,
            path: envpath + '/start-client.sh'
        }
    } catch (err) {
        ctx.throw(500, err.message);
    }
};
// 关闭kafka
const stopKfk = (ctx) => {
    try {
        // stdout为脚本执行成功后的输出
        const stdout = execSync(envpath + '/stop-client.sh', {
            encoding: 'utf8'
        });
        ctx.body = {
            code: 200,
            msg: '关闭成功！',
            data: stdout,
            path: envpath + '/stop-client.sh'
        }
    } catch (err) {
        ctx.throw(500, err.message);
    }
};

module.exports = {
    startKfk,
    stopKfk
};