import{_ as e}from"./index-app-3f5becc.js";import{o as n,f as t,R as a,r as o,g as d,w as l,e as r,h as i,i as s,F as c}from"./vendor-chunk-4d2ba2f.js";const u=e({props:{activeIndex:String},methods:{handleSelect(e,n){this.$emit("update:activeIndex",e)}}},[["render",function(e,a,o,d,l,r){return n(),t("h1",null,"Hello App!")}]]),p={props:{...a.props},methods:{handleOpen(e,n){console.log(e,n)},handleClose(e,n){console.log(e,n)}}},x=i("br",null,null,-1);const v=e({data:()=>({activeIndex:"1",mainHeight:window.innerHeight-61}),name:"MainLayout",components:{HeaderMenu:u,AsideMenu:e(p,[["render",function(e,a,i,s,c,u){const p=o("router-link");return n(),t("p",null,[d(p,{to:"/home"},{default:l((()=>[r("HOME")])),_:1}),x,d(p,{to:"/colorlibrary"},{default:l((()=>[r("colorlibrary")])),_:1})])}]])}},[["render",function(e,a,l,r,i,u){const p=o("aside-menu"),x=o("header-menu");return n(),t(c,null,[d(p,{activeIndex:i.activeIndex,"onUpdate:activeIndex":a[0]||(a[0]=e=>i.activeIndex=e)},null,8,["activeIndex"]),d(x,{activeIndex:i.activeIndex,"onUpdate:activeIndex":a[1]||(a[1]=e=>i.activeIndex=e)},null,8,["activeIndex"]),s(e.$slots,"default")],64)}]]);export{v as default};