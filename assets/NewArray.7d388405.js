import{_ as i,o as d,c as p,K as o,$ as u,d as r}from"./app.376890f8.js";const v={data(){return{value:"",res:""}},methods:{handleCast(){let e=this.value.trim();if(!e.startsWith("[")||!e.endsWith("]"))return this.handleClear();for(var t=0;e[t++]=="[";);t--;var s=e[t]=="'"||e[t]=='"';e=`new ${s?"String":"int"}`+"[]".repeat(t)+e.replaceAll("[","{").replaceAll("]","}").replaceAll("'",'"'),this.renderAndCopy(e)},renderAndCopy(e){this.res=e,navigator.clipboard.writeText(e)},handleClear(){this.value="",this.res=""}}},h=["value"];function x(e,t,s,_,n,l){return d(),p("div",null,[o(r("input",{class:"ipt","onUpdate:modelValue":t[0]||(t[0]=a=>n.value=a),type:"text"},null,512),[[u,n.value]]),r("button",{class:"btn",onClick:t[1]||(t[1]=(...a)=>l.handleClear&&l.handleClear(...a))},"clear"),r("button",{class:"btn",onClick:t[2]||(t[2]=(...a)=>l.handleCast&&l.handleCast(...a))},"cast"),r("input",{class:"ipt ipt2",disabled:"",value:n.res,type:"text"},null,8,h)])}var f=i(v,[["render",x],["__scopeId","data-v-5d9e41f2"],["__file","NewArray.vue"]]);export{f as default};
