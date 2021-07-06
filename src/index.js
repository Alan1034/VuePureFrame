import { createApp } from 'vue'
import App from "./App";
import routers from './routers';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// Vue.use(Public);

// Vue.config.productionTip = false; //阻止启动生产消息，常用作指令。

console.log(process.env.VUE_APP_BASE_API)

// new Vue({
//     // router,
//     // store,
//     render: () => h(App),
// }).$mount('#root');
if (!document.getElementById("root")) {
    const div = document.createElement('div');
    div.id = "root";
    document.body.appendChild(div);
}
const app = createApp(App)
app.use(routers)
app.use(ElementPlus)
app.mount('#root')