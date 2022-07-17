import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue"
import './assets/main.css'
import "ant-design-vue/dist/antd.css"
import request from "./utils/request"
const app = createApp(App)
app.config.globalProperties.$request=request
app.use(router)
app.use(Antd)
app.mount('#app')
