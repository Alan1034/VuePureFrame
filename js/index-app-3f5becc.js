import{r as e,o,c as n,a as t,b as r,d as i}from"./vendor-chunk-4d2ba2f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&o(e)})).observe(document,{childList:!0,subtree:!0})}function o(e){if(e.ep)return;e.ep=!0;const o=function(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?o.credentials="include":"anonymous"===e.crossOrigin?o.credentials="omit":o.credentials="same-origin",o}(e);fetch(e.href,o)}}(),console.log({VITE_APP_NAME:"Base管理系统,",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1});const a=(e,o)=>{const n=e.__vccOpts||e;for(const[t,r]of o)n[t]=r;return n};const s=a({name:"App",components:{}},[["render",function(t,r,i,a,s,c){const d=e("router-view");return o(),n(d)}]]),c={},d=function(e,o,n){if(!o||0===o.length)return e();const t=document.getElementsByTagName("link");return Promise.all(o.map((e=>{if((e=function(e){return"/"+e}(e))in c)return;c[e]=!0;const o=e.endsWith(".css"),r=o?'[rel="stylesheet"]':"";if(!!n)for(let n=t.length-1;n>=0;n--){const r=t[n];if(r.href===e&&(!o||"stylesheet"===r.rel))return}else if(document.querySelector(`link[href="${e}"]${r}`))return;const i=document.createElement("link");return i.rel=o?"stylesheet":"modulepreload",o||(i.as="script",i.crossOrigin=""),i.href=e,document.head.appendChild(i),o?new Promise(((o,n)=>{i.addEventListener("load",o),i.addEventListener("error",(()=>n(new Error(`Unable to preload CSS for ${e}`))))})):void 0}))).then((()=>e())).catch((e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e}))},l=()=>d((()=>import("./Home-chunk-5a7d976.js")),["js/Home-chunk-5a7d976.js","js/MainLayout-chunk-2aaa7ec.js","js/vendor-chunk-4d2ba2f.js"]),m=()=>d((()=>import("./MainLayout-chunk-2aaa7ec.js")),["js/MainLayout-chunk-2aaa7ec.js","js/vendor-chunk-4d2ba2f.js"]),h=Object.assign({"../views/colorlibrary/index.vue":()=>d((()=>import("./index-chunk-24776e1.js")),["js/index-chunk-24776e1.js","js/MainLayout-chunk-2aaa7ec.js","js/vendor-chunk-4d2ba2f.js"]),"../views/fashionslibrary/index.vue":()=>d((()=>import("./index-chunk-c7f0b02.js")),["js/index-chunk-c7f0b02.js","js/vendor-chunk-4d2ba2f.js","css/index-chunk-2c82e0a.css"])});for(const _ in h)console.log(_);const u=[{path:"/home",component:l},{path:"/",component:l},{path:"/:pathMatch(.*)*",name:"NotFound",component:{template:"<p>Page not found</p>"}}],p=((e,o)=>{const n=[];return e.forEach((e=>{const{pathKey:o,name:t,icon:r,children:i,path:a,hidden:s,meta:c}=e,d={path:a,name:a,component:()=>Promise.resolve(h[o]?h[o]():m),meta:{noCache:!0,affix:!1,...c,title:t,icon:r},hidden:!!s};n.push({...d})})),n})([{pathKey:"demo",path:"/demo",name:"样例",icon:"dashboard",meta:{affix:!0},children:[{pathKey:"demo/demo",path:"demo",name:"颜色库子",icon:"dashboard"},{pathKey:"demo/demo",path:"demo",name:"颜色库女",icon:"dashboard"}]},{pathKey:"../views/colorlibrary/index.vue",path:"/colorlibrary",name:"颜色库",icon:"dashboard",hidden:!0},{pathKey:"fashionslibrary",path:"/fashionslibrary",name:"款式库",icon:"dashboard"}]);u.push(...p);const f=t({history:r(),routes:u});if(!document.getElementById("root")){const e=document.createElement("div");e.id="root",document.body.appendChild(e)}const y=i(s);y.use(f),y.mount("#root");export{a as _};
