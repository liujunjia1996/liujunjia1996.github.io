import{_ as l,o as t,c as a,e as o,t as i,d as u,F as _,l as d,D as h}from"./app.234f468b.js";const p={props:{title:String,count:Number},data(){return{cur:""}},created(){this.title==="\u4ECA\u5E74\u8FDB\u5EA6"?this.cur=this.getDay():this.cur=new Date().getFullYear()-1996,console.log(this.cur)},methods:{getDay(){const s=new Date().getFullYear().toString(),r=new Date-new Date(s);return Math.ceil(r/864e5)}}},f={class:"wrap"};function g(s,r,e,m,c,v){return t(),a("div",null,[o(i(e.title)+" ",1),u("div",f,[(t(!0),a(_,null,d(e.count,n=>(t(),a("div",{class:h(["box",n<=c.cur?"active":null]),key:n},null,2))),128))])])}var y=l(p,[["render",g],["__scopeId","data-v-03ae9487"],["__file","LifeCount.vue"]]);export{y as default};
