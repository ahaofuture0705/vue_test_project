import axios from "axios";
import { message } from 'ant-design-vue';
(axios as any).defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
    baseURL: 'http://192.168.123.108:8888',
    timeout: 1000
})
request.interceptors.response.use((response) => {
    return response.data
}, error => {
    return Promise.reject(error)
})
request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default request