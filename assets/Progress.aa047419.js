import{_ as d,o as t,c as o,F as i,l,d as n,v as c,S as p,D as u}from"./app.376890f8.js";const _={data(){return{value:"",res:"",progress:40}},methods:{getWidth(r){const s=r*25;return s<this.progress?"50px":(25-(s-this.progress))/25*50+"px"}}},f={class:"progress-round"},g={class:"progress-round__inner"};function h(r,s,v,x,m,a){return t(),o("div",f,[(t(),o(i,null,l(4,e=>n("div",{key:e,style:p({transform:`rotate(${(e-1)*90}deg)`,width:a.getWidth(e)}),class:u(["progress-bar",`progress-bar--${e}`])},null,6)),64)),n("div",g,[c(r.$slots,"default",{},void 0,!0)])])}var y=d(_,[["render",h],["__scopeId","data-v-14618536"],["__file","Progress.vue"]]);export{y as default};