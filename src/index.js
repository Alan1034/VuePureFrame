import Vue from 'vue';
import { h, createApp } from 'vue'
import App from './App.vue';
// import router from './router';
// import store from './store';
import './global.css';

// Vue.use(Public);

// Vue.config.productionTip = false; //阻止启动生产消息，常用作指令。



// new Vue({
//     // router,
//     // store,
//     render: () => h(App),
// }).$mount('#root');
createApp(App).mount('#root')