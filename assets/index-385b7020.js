import{r as l,j as k,o as c,f,k as z,c as y,w as o,F as S,l as L,i as v,v as N,g as a,m as T,n as B,p as I,e as d,t as q,q as A,s as D,u as E,h as F}from"./vendor-d55e15f5.js";import{_ as C}from"./index-a007447e.js";const x=e=>{const{column:s,scope:t}=e;return s.render(t)};x.props={column:{type:Object,default:{}},scope:{type:Object,default:{}}};const P={name:"GeneralBasicTable",components:{TableColumn:x,TabArchive:e=>{const{column:s,scope:t}=e;return s.render(t)}},data(){return{pageNum:Number(this.$route.query.page)||1,pageSize:Number(this.$route.query.limit)||10}},props:{tableList:{type:Array,default:[]},tableColumn:{type:Array,default:[]},total:{type:Number,default:0},size:{type:String,default:"medium"}},methods:{handleSearch(e={}){console.log(e);const{page:s=this.pageNum,limit:t=this.pageSize}=e;console.log(this.$router),this.$router.push({query:{page:s,limit:t}}),this.getList(e)},currentTabComponent(e,s){return"tab-archive"}}};function j(e,s,t,w,n,u){const _=l("TableColumn"),i=l("el-table-column"),b=l("el-table"),g=l("pagination"),p=k("loading");return c(),f(S,null,[z((c(),y(b,{data:t.tableList,size:t.size},{default:o(()=>[(c(!0),f(S,null,L(t.tableColumn,r=>(c(),y(i,T({key:r.key},r),B({_:2},[r.render?{name:"default",fn:o(h=>[(c(),y(I(u.currentTabComponent(r,h)),{column:r,scope:h},null,8,["column","scope"])),a(_,{column:r,scope:h},null,8,["column","scope"])]),key:"0"}:void 0]),1040))),128)),v(e.$slots,"default")]),_:3},8,["data","size"])),[[p,e.loading]]),z(a(g,{total:t.total,"current-page":n.pageNum,"page-size":n.pageSize,onPagination:u.handleSearch},null,8,["total","current-page","page-size","onPagination"]),[[N,t.total>0]])],64)}const H=C(P,[["render",j]]),O={name:"GeneralBasicTable",data(){return{pageNum:Number(this.$route.query.page)||1,pageSize:Number(this.$route.query.limit)||10}},props:{tableList:{type:Array,default:[]},tableColumn:{type:Array,default:[]},total:{type:Number,default:0},size:{type:String,default:"medium"}},methods:{getList(e={}){console.log(e);const{page:s=this.pageNum,limit:t=this.pageSize}=e;this.$router.push({query:{page:s,limit:t}})}}};function V(e,s,t,w,n,u){const _=l("el-table-column"),i=l("el-table"),b=l("pagination"),g=k("loading");return c(),f(S,null,[z((c(),y(i,{data:t.tableList,size:t.size},{default:o(()=>[(c(!0),f(S,null,L(t.tableColumn,p=>(c(),y(_,T({key:p.key},p),B({_:2},[p.template?{name:"default",fn:o(r=>[d(q(p.template(r)),1)]),key:"0"}:void 0]),1040))),128)),v(e.$slots,"default")]),_:3},8,["data","size"])),[[g,e.loading]]),z(a(b,{total:t.total,"current-page":n.pageNum,"page-size":n.pageSize,onPagination:u.getList},null,8,["total","current-page","page-size","onPagination"]),[[N,t.total>0]])],64)}const Q=C(O,[["render",V]]);const U={name:"fashionslibrary",components:{GeneralBasicForm:H,GeneralBasicTable:Q},data(){return{showSearch:!0,loading:!1,size:"small",screenHeight:window.innerHeight-84,formItem:[{label:"款式名称",prop:"bsName",type:"select",option:[]},{label:"款式来源",prop:"bsSource",type:"input"},{label:"版型编码",prop:"silSn",type:"input"},{label:"外部款式",prop:"relatedStyle",type:"input"},{label:"面种/材质",prop:"fabricType",type:"input"},{label:"二次工艺",prop:"secordary",type:"select",option:[]},{label:"设计师",prop:"designer",type:"input"},{label:"创建人",prop:"createBy",type:"input"},{label:"品类",prop:"categoryCode",type:"input"}],tableColumn:[{key:1,type:"selection",width:"55"},{key:2,prop:"name",label:"款式序号"},{key:3,prop:"name",label:"款式图片"},{key:99,label:"操作",template:e=>`${e.row.name}`}],tableList:[{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-08",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-06",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-07",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}],total:7}},created(){this.getList()},methods:{getList(){console.log("ajax go")}}},J=e=>(D("data-v-85dbb8fa"),e=e(),E(),e),K=J(()=>F("div",{style:{height:"15px"}},null,-1));function M(e,s,t,w,n,u){const _=l("GeneralBasicForm"),i=l("el-button"),b=l("el-col"),g=l("right-toolbar"),p=l("el-row"),r=l("el-table-column"),h=l("GeneralBasicTable");return c(),f("div",{class:"fashions-library-container",style:A({height:n.screenHeight+"px"})},[a(_,{showSearch:n.showSearch,getList:u.getList,formItem:n.formItem,size:n.size},null,8,["showSearch","getList","formItem","size"]),K,a(p,{gutter:10,class:"handle"},{default:o(()=>[a(b,{span:1.5},{default:o(()=>[a(i,{type:"primary",icon:"el-icon-plus",size:n.size,onClick:e.handleAdd},{default:o(()=>[d("新增")]),_:1},8,["size","onClick"]),a(i,{type:"info",icon:"el-icon-download",size:n.size,onClick:e.exportOrderExcel},{default:o(()=>[d("批量删除")]),_:1},8,["size","onClick"]),a(i,{type:"warning",icon:"el-icon-download",size:n.size,onClick:e.exportGoodsExcel},{default:o(()=>[d("导入")]),_:1},8,["size","onClick"]),a(i,{type:"warning",icon:"el-icon-download",size:n.size,onClick:e.exportGoodsExcel},{default:o(()=>[d("导出")]),_:1},8,["size","onClick"])]),_:1}),a(g,{showSearch:n.showSearch,"onUpdate:showSearch":s[0]||(s[0]=m=>n.showSearch=m),onQueryTable:u.getList},null,8,["showSearch","onQueryTable"])]),_:1}),a(h,{getList:u.getList,tableList:n.tableList,total:n.total,tableColumn:n.tableColumn,size:n.size},{default:o(()=>[a(r,{label:"操作"},{default:o(m=>[a(i,{size:"mini",onClick:G=>e.handleEdit(m.$index,m.row)},{default:o(()=>[d("编辑")]),_:2},1032,["onClick"]),a(i,{size:"mini",type:"danger",onClick:G=>e.handleDelete(m.$index,m.row)},{default:o(()=>[d("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["getList","tableList","total","tableColumn","size"])],4)}const X=C(U,[["render",M],["__scopeId","data-v-85dbb8fa"]]);export{X as default};
