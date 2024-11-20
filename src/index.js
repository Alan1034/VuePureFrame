import { createApp } from 'vue'
import App from "./App.vue";
import routers from '@/routers/index';
import { registerServiceWorker } from '@/utils/serviceWorker'

registerServiceWorker()
if (!document.getElementById("root")) {
    const div = document.createElement('div');
    div.id = "root";
    document.body.appendChild(div);
}
const app = createApp(App)
app.use(routers)
app.mount('#root')