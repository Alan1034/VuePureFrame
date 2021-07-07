# ReactPureFrame

一个从零搭建的Vue3纯净框架 <br/>
A Vue3 pure frame build up from nothing

目前支持：<br/>
npm run serve<br/>
npm run build

master分支，适合用于桌面页面
master for desktop

vue+vue-router+element分支，一个加入了路由和ele布局的分支,后续继续更新了一些便于开发的配置
vue+vue-router+element a branch with vue-router and element.js layouts, some easy for develop update has come

vue+vue-router+element分支中用.env文件和package.json文件去修改项目环境变量
In vue+vue-router+element branch we use file .env and package.json to modify environment variables

来源：公司的框架是基于Vue2和vue/cli去搭建的，其中vue/cli封装的部分使用者无法接触到。遂在react脚手架的基础上改造了一个Vue3的脚手架。有以下优点：

（1）编译和依赖更新到新版本，使用Vue3

（2）兼容less和scss，兼容字体文件

（3）优化打包的tree-shaking问题

（4）多线程编译打包

（5）纯净极简，可正常开发打包，可配置性强

