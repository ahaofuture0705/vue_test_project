const express = require('express');
const cors = require('cors');
const os = require('os');
const { log } = require('console');
const app = express();
app.use(cors())
function getIpAddress() {
    var ifaces = os.networkInterfaces()
    for (var dev in ifaces) {
        let iface = ifaces[dev]
        for (let i = 0; i < iface.length; i++) {
            let { family, address, internal } = iface[i]
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                return address
            }
        }
    }
}
let ip = getIpAddress()
app.post('/api/user/login', (req, res) => {
    let { username, password } = req.query;
    let text = {
        code: username == 'jack' && password == 'redballoon'?200:403,
        msg: username == 'jack' && password == 'redballoon' ? '登录成功' : '用户或密码错误，请重试'
    }
    res.json(text)
})
app.listen('8888', () => {
    console.log(`服务器启动... 访问地址=${ip}:8888`);
})