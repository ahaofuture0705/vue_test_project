const express = require('express');
const cors = require('cors');
const os = require('os');
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
app.post('/test/login', (req, res) => {
    res.json('接口访问成功0')
    console.log(req);
    // const { username, password } = req.body;
    // console.log(username);
    // console.log(password);
})
app.listen('8888', () => {
    console.log(`服务器启动... 访问地址=${ip}:8888`);
})