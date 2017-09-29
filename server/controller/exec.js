const {
    execFile,
    exec,
    execSync
} = require('child_process');
const path = require('path');
const filepath = path.resolve(__dirname, '../sh');

// 之前做的测试
// const child = execFile('./haha.sh', {
//     shell: '/bin/bash'
// }, (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log("jdb test:", stdout);
// });

// const shild1 = exec('./haha.sh', (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log("jdb test1:", stdout);
// });

// const stdout = execSync('./haha.sh', {
//     encoding: 'utf8'
// });
// console.log('这是蒋东兵的execSync测试：', stdout);
// var filepath = path.resolve(__dirname, '..');
// const stdout1 = execSync(filepath + '/haha.sh', {
//     encoding: 'utf8'
// });
// console.log('这是蒋东兵的execSync测试2：', stdout1);

// 执行脚本
const startKfk = (ctx) => {
    // let state = ctx.query.state;
    console.log(666);
    try {
        // stdout为脚本执行成功后的输出
        const stdout = execSync(filepath + '/haha.sh', {
            encoding: 'utf8'
        });
        console.log(filepath + '/haha.sh');
        ctx.body = {
            code: 200,
            msg: '开启成功！',
            data: stdout,
            path:filepath + '/haha.sh'
        }
    } catch (err) {
        ctx.throw(500, err.message);
    }
}

module.exports = {
    startKfk
};