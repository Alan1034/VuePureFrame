import { createApp } from 'vue'
import App from "./App.vue";
import routers from './routers/index.js';

// Vue.use(Public);

// Vue.config.productionTip = false; //阻止启动生产消息，常用作指令。



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
app.mount('#root')