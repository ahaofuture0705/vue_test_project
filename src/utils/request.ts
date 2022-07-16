import axios from "axios";
(axios as any).defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
    baseURL: 'http://192.168.123.108:8888',
    timeout: 10
})
// 创建相应拦截器
request.interceptors.response.use((response) => {
    return response.data
})
export default request