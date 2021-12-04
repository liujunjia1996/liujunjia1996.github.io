var Be=Object.defineProperty,Ee=Object.defineProperties;var Ne=Object.getOwnPropertyDescriptors;var ce=Object.getOwnPropertySymbols;var He=Object.prototype.hasOwnProperty,Ae=Object.prototype.propertyIsEnumerable;var de=(t,e,n)=>e in t?Be(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,U=(t,e)=>{for(var n in e||(e={}))He.call(e,n)&&de(t,n,e[n]);if(ce)for(var n of ce(e))Ae.call(e,n)&&de(t,n,e[n]);return t},q=(t,e)=>Ee(t,Ne(e));import{f as B,i as V,j as he,k as f,l as G,m as Me,n as Pe,r as P,h as a,o as r,p as E,w as N,q as L,e as z,t as S,s as pe,c,v as T,x as De,y as R,z as K,A as ve,B as fe,a as b,F as H,C as I,D as O,d as w,E as Ie,G as Re,T as me,H as j,I as Oe,J,K as Q,L as _e,u as ge,g as M,M as be,N as ke,O as ye,b as ze,P as $e,Q as je,R as X,S as Z,U as Fe,V as F,W as We,X as Ue}from"./app.e9861b75.js";import{_ as ee}from"./plugin-vue_export-helper.21dcd24c.js";const qe=["href","rel","target","aria-label"],Ve=B({inheritAttrs:!1});function Ge(t){const e=t,n=V(),o=De(),{item:s}=he(e),v=f(()=>G(s.value.link)),m=f(()=>Me(s.value.link)||Pe(s.value.link)),h=f(()=>{if(!m.value){if(s.value.target)return s.value.target;if(v.value)return"_blank"}}),l=f(()=>h.value==="_blank"),i=f(()=>!v.value&&!m.value&&!l.value),u=f(()=>{if(!m.value){if(s.value.rel)return s.value.rel;if(l.value)return"noopener noreferrer"}}),p=f(()=>s.value.ariaLabel||s.value.text),d=f(()=>{const y=Object.keys(o.value.locales);return y.length?!y.some(_=>_===s.value.link):s.value.link!=="/"}),k=f(()=>d.value?n.path.startsWith(s.value.link):!1),g=f(()=>i.value?s.value.activeMatch?new RegExp(s.value.activeMatch).test(n.path):k.value:!1);return(y,_)=>{const $=P("RouterLink"),x=P("OutboundLink");return a(i)?(r(),E($,pe({key:0,class:["nav-link",{"router-link-active":a(g)}],to:a(s).link,"aria-label":a(p)},y.$attrs),{default:N(()=>[L(y.$slots,"before"),z(" "+S(a(s).text)+" ",1),L(y.$slots,"after")]),_:3},16,["class","to","aria-label"])):(r(),c("a",pe({key:1,class:"nav-link external",href:a(s).link,rel:a(u),target:a(h),"aria-label":a(p)},y.$attrs),[L(y.$slots,"before"),z(" "+S(a(s).text)+" ",1),a(l)?(r(),E(x,{key:0})):T("",!0),L(y.$slots,"after")],16,qe))}}const D=B(q(U({},Ve),{props:{item:{type:Object,required:!0}},setup:Ge})),Ke=["aria-labelledby"],Xe={class:"hero"},Ye=["src","alt"],Je={key:1,id:"main-title"},Qe={key:2,class:"description"},Ze={key:3,class:"actions"},et={key:0,class:"features"},tt={class:"theme-default-content custom"},nt=["innerHTML"],at=["textContent"],st=B({setup(t){const e=R(),n=K(),o=f(()=>e.value.heroImage?ve(e.value.heroImage):null),s=f(()=>e.value.heroText===null?null:e.value.heroText||n.value.title||"Hello"),v=f(()=>e.value.heroAlt||s.value||"hero"),m=f(()=>e.value.tagline===null?null:e.value.tagline||n.value.description||"Welcome to your VuePress site"),h=f(()=>fe(e.value.actions)?e.value.actions.map(({text:p,link:d,type:k="primary"})=>({text:p,link:d,type:k})):[]),l=f(()=>fe(e.value.features)?e.value.features:[]),i=f(()=>e.value.footer),u=f(()=>e.value.footerHtml);return(p,d)=>{const k=P("Content");return r(),c("main",{class:"home","aria-labelledby":a(s)?"main-title":void 0},[b("header",Xe,[a(o)?(r(),c("img",{key:0,src:a(o),alt:a(v)},null,8,Ye)):T("",!0),a(s)?(r(),c("h1",Je,S(a(s)),1)):T("",!0),a(m)?(r(),c("p",Qe,S(a(m)),1)):T("",!0),a(h).length?(r(),c("p",Ze,[(r(!0),c(H,null,I(a(h),g=>(r(),E(D,{key:g.text,class:O(["action-button",[g.type]]),item:g},null,8,["class","item"]))),128))])):T("",!0)]),a(l).length?(r(),c("div",et,[(r(!0),c(H,null,I(a(l),g=>(r(),c("div",{key:g.title,class:"feature"},[b("h2",null,S(g.title),1),b("p",null,S(g.details),1)]))),128))])):T("",!0),b("div",tt,[w(k)]),a(i)?(r(),c(H,{key:1},[a(u)?(r(),c("div",{key:0,class:"footer",innerHTML:a(i)},null,8,nt)):(r(),c("div",{key:1,class:"footer",textContent:S(a(i))},null,8,at))],64)):T("",!0)],8,Ke)}}}),Le=t=>!G(t)||/github\.com/.test(t)?"GitHub":/bitbucket\.org/.test(t)?"Bitbucket":/gitlab\.com/.test(t)?"GitLab":/gitee\.com/.test(t)?"Gitee":null,ot={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},rt=({docsRepo:t,docsBranch:e,docsDir:n,filePathRelative:o,editLinkPattern:s})=>{const v=Le(t);let m;return s?m=s:v!==null&&(m=ot[v]),m?m.replace(/:repo/,G(t)?t:`https://github.com/${t}`).replace(/:branch/,e).replace(/:path/,Ie(`${Re(n)}/${o}`)):null},lt=B({setup(t){const e=o=>{o.style.height=o.scrollHeight+"px"},n=o=>{o.style.height=""};return(o,s)=>(r(),E(me,{name:"dropdown",onEnter:e,onAfterEnter:n,onBeforeLeave:e},{default:N(()=>[L(o.$slots,"default")]),_:3}))}}),it=["aria-label"],ut={class:"title"},ct=b("span",{class:"arrow down"},null,-1),dt=["aria-label"],ht={class:"title"},pt={class:"nav-dropdown"},vt={class:"dropdown-subtitle"},ft={key:1},mt={class:"dropdown-subitem-wrapper"},_t=B({props:{item:{type:Object,required:!0}},setup(t){const e=t,{item:n}=he(e),o=f(()=>n.value.ariaLabel||n.value.text),s=j(!1),v=V();Oe(()=>v.path,()=>{s.value=!1});const m=l=>{l.detail===0?s.value=!s.value:s.value=!1},h=(l,i)=>i[i.length-1]===l;return(l,i)=>(r(),c("div",{class:O(["dropdown-wrapper",{open:s.value}])},[b("button",{class:"dropdown-title",type:"button","aria-label":a(o),onClick:m},[b("span",ut,S(a(n).text),1),ct],8,it),b("button",{class:"mobile-dropdown-title",type:"button","aria-label":a(o),onClick:i[0]||(i[0]=u=>s.value=!s.value)},[b("span",ht,S(a(n).text),1),b("span",{class:O(["arrow",s.value?"down":"right"])},null,2)],8,dt),w(lt,null,{default:N(()=>[J(b("ul",pt,[(r(!0),c(H,null,I(a(n).children,(u,p)=>(r(),c("li",{key:u.link||p,class:"dropdown-item"},[u.children?(r(),c(H,{key:0},[b("h4",vt,[u.link?(r(),E(D,{key:0,item:u,onFocusout:d=>h(u,a(n).children)&&u.children.length===0&&(s.value=!1)},null,8,["item","onFocusout"])):(r(),c("span",ft,S(u.text),1))]),b("ul",mt,[(r(!0),c(H,null,I(u.children,d=>(r(),c("li",{key:d.link,class:"dropdown-subitem"},[w(D,{item:d,onFocusout:k=>h(d,u.children)&&h(u,a(n).children)&&(s.value=!1)},null,8,["item","onFocusout"])]))),128))])],64)):(r(),E(D,{key:1,item:u,onFocusout:d=>h(u,a(n).children)&&(s.value=!1)},null,8,["item","onFocusout"]))]))),128))],512),[[Q,s.value]])]),_:1})],2))}}),gt={key:0,class:"navbar-links"},Te=B({setup(t){const e=()=>{const i=_e(),u=ge(),p=K(),d=M();return f(()=>{var $,x;const k=Object.keys(p.value.locales);if(k.length<2)return[];const g=i.currentRoute.value.path,y=i.currentRoute.value.fullPath;return[{text:($=d.value.selectLanguageText)!=null?$:"unkown language",ariaLabel:(x=d.value.selectLanguageAriaLabel)!=null?x:"unkown language",children:k.map(C=>{var ae,se,oe,re,le,ie;const A=(se=(ae=p.value.locales)==null?void 0:ae[C])!=null?se:{},te=(re=(oe=d.value.locales)==null?void 0:oe[C])!=null?re:{},ne=`${A.lang}`,Se=(le=te.selectLanguageName)!=null?le:ne;let W;if(ne===p.value.lang)W=y;else{const ue=g.replace(u.value,C);i.getRoutes().some(xe=>xe.path===ue)?W=ue:W=(ie=te.home)!=null?ie:C}return{text:Se,link:W}})}]})},n=()=>{const i=M(),u=f(()=>i.value.repo),p=f(()=>u.value?Le(u.value):null),d=f(()=>u.value&&!G(u.value)?`https://github.com/${u.value}`:u.value),k=f(()=>d.value?i.value.repoLabel?i.value.repoLabel:p.value===null?"Source":p.value:null);return f(()=>!d.value||!k.value?[]:[{text:k.value,link:d.value}])},o=i=>be(i)?ke(i):i.children?q(U({},i),{children:i.children.map(o)}):i,v=(()=>{const i=M();return f(()=>(i.value.navbar||[]).map(o))})(),m=e(),h=n(),l=f(()=>[...v.value,...m.value,...h.value]);return(i,u)=>a(l).length?(r(),c("nav",gt,[(r(!0),c(H,null,I(a(l),p=>(r(),c("div",{key:p.text,class:"navbar-links-item"},[p.children?(r(),E(_t,{key:0,item:p},null,8,["item"])):(r(),E(D,{key:1,item:p},null,8,["item"]))]))),128))])):T("",!0)}}),bt=["title"],kt={class:"icon",focusable:"false",viewBox:"0 0 32 32"},yt=ze('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9),$t=[yt],Lt={class:"icon",focusable:"false",viewBox:"0 0 32 32"},Tt=b("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1),wt=[Tt],Ct=B({setup(t){const e=M(),n=ye(),o=()=>{n.value=!n.value};return(s,v)=>(r(),c("button",{class:"toggle-dark-button",title:a(e).toggleDarkMode,onClick:o},[J((r(),c("svg",kt,$t,512)),[[Q,!a(n)]]),J((r(),c("svg",Lt,wt,512)),[[Q,a(n)]])],8,bt))}}),St=["title"],xt=b("div",{class:"icon","aria-hidden":"true"},[b("span"),b("span"),b("span")],-1),Bt=[xt],Et=B({emits:["toggle"],setup(t){const e=M();return(n,o)=>(r(),c("div",{class:"toggle-sidebar-button",title:a(e).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:o[0]||(o[0]=s=>n.$emit("toggle"))},Bt,8,St))}}),Nt=["src","alt"],Ht=B({emits:["toggle-sidebar"],setup(t){const e=ge(),n=K(),o=M(),s=ye(),v=j(null),m=j(null),h=f(()=>o.value.home||e.value),l=f(()=>s.value&&o.value.logoDark!==void 0?o.value.logoDark:o.value.logo),i=f(()=>n.value.title),u=j(0),p=f(()=>u.value?{maxWidth:u.value+"px"}:{}),d=f(()=>o.value.darkMode);$e(()=>{const g=719,y=k(v.value,"paddingLeft")+k(v.value,"paddingRight"),_=()=>{var $;window.innerWidth<=g?u.value=0:u.value=v.value.offsetWidth-y-((($=m.value)==null?void 0:$.offsetWidth)||0)};_(),window.addEventListener("resize",_,!1),window.addEventListener("orientationchange",_,!1)});function k(g,y){var x,C,A;const _=(A=(C=(x=g==null?void 0:g.ownerDocument)==null?void 0:x.defaultView)==null?void 0:C.getComputedStyle(g,null))==null?void 0:A[y],$=Number.parseInt(_,10);return Number.isNaN($)?0:$}return(g,y)=>{const _=P("ClientOnly"),$=P("RouterLink"),x=P("NavbarSearch");return r(),c("header",{ref:(C,A)=>{A.navbar=C,v.value=C},class:"navbar"},[w(Et,{onToggle:y[0]||(y[0]=C=>g.$emit("toggle-sidebar"))}),b("span",{ref:(C,A)=>{A.siteBrand=C,m.value=C}},[w($,{to:a(h)},{default:N(()=>[w(_,null,{default:N(()=>[a(l)?(r(),c("img",{key:0,class:"logo",src:a(ve)(a(l)),alt:a(i)},null,8,Nt)):T("",!0)]),_:1}),a(i)?(r(),c("span",{key:0,class:O(["site-name",{"can-hide":a(l)}])},S(a(i)),3)):T("",!0)]),_:1},8,["to"])],512),b("div",{class:"navbar-links-wrapper",style:je(a(p))},[L(g.$slots,"before"),w(Te,{class:"can-hide"}),L(g.$slots,"after"),a(d)?(r(),E(Ct,{key:0})):T("",!0),w(x)],4)],512)}}}),At={class:"page-meta"},Mt={key:0,class:"meta-item edit-link"},Pt={key:1,class:"meta-item last-updated"},Dt={class:"meta-item-label"},It={class:"meta-item-info"},Rt={key:2,class:"meta-item contributors"},Ot={class:"meta-item-label"},zt={class:"meta-item-info"},jt=["title"],Ft=z(", "),Wt=B({setup(t){const e=()=>{const l=M(),i=X(),u=R();return f(()=>{var x,C,A;if(!((C=(x=u.value.editLink)!=null?x:l.value.editLink)!=null?C:!0))return null;const{repo:d,docsRepo:k=d,docsBranch:g="main",docsDir:y="",editLinkText:_}=l.value;if(!k)return null;const $=rt({docsRepo:k,docsBranch:g,docsDir:y,filePathRelative:i.value.filePathRelative,editLinkPattern:(A=u.value.editLinkPattern)!=null?A:l.value.editLinkPattern});return $?{text:_!=null?_:"Edit this page",link:$}:null})},n=()=>{const l=K(),i=M(),u=X(),p=R();return f(()=>{var g,y,_,$;return!((y=(g=p.value.lastUpdated)!=null?g:i.value.lastUpdated)!=null?y:!0)||!((_=u.value.git)==null?void 0:_.updatedTime)?null:new Date(($=u.value.git)==null?void 0:$.updatedTime).toLocaleString(l.value.lang)})},o=()=>{const l=M(),i=X(),u=R();return f(()=>{var d,k,g,y;return((k=(d=u.value.contributors)!=null?d:l.value.contributors)!=null?k:!0)&&(y=(g=i.value.git)==null?void 0:g.contributors)!=null?y:null})},s=M(),v=e(),m=n(),h=o();return(l,i)=>(r(),c("footer",At,[a(v)?(r(),c("div",Mt,[w(D,{class:"meta-item-label",item:a(v)},null,8,["item"])])):T("",!0),a(m)?(r(),c("div",Pt,[b("span",Dt,S(a(s).lastUpdatedText)+": ",1),b("span",It,S(a(m)),1)])):T("",!0),a(h)&&a(h).length?(r(),c("div",Rt,[b("span",Ot,S(a(s).contributorsText)+": ",1),b("span",zt,[(r(!0),c(H,null,I(a(h),(u,p)=>(r(),c(H,{key:p},[b("span",{class:"contributor",title:`email: ${u.email}`},S(u.name),9,jt),p!==a(h).length-1?(r(),c(H,{key:0},[Ft],64)):T("",!0)],64))),128))])])):T("",!0)]))}}),Ut={key:0,class:"page-nav"},qt={class:"inner"},Vt={key:0,class:"prev"},Gt=z(" \u2190 "),Kt={key:1,class:"next"},Xt=z(" \u2192 "),Yt=B({setup(t){const e=l=>l===!1?null:be(l)?ke(l):Fe(l)?l:!1,n=(l,i,u)=>{const p=l.findIndex(d=>d.link===i);if(p!==-1){const d=l[p+u];return(d==null?void 0:d.link)?d:null}for(const d of l)if(d.children){const k=n(d.children,i,u);if(k)return k}return null},o=R(),s=Z(),v=V(),m=f(()=>{const l=e(o.value.prev);return l!==!1?l:n(s.value,v.path,-1)}),h=f(()=>{const l=e(o.value.next);return l!==!1?l:n(s.value,v.path,1)});return(l,i)=>a(m)||a(h)?(r(),c("nav",Ut,[b("p",qt,[a(m)?(r(),c("span",Vt,[Gt,w(D,{item:a(m)},null,8,["item"])])):T("",!0),a(h)?(r(),c("span",Kt,[w(D,{item:a(h)},null,8,["item"]),Xt])):T("",!0)])])):T("",!0)}}),Jt={class:"page"},Qt={class:"theme-default-content"},Zt=B({setup(t){return(e,n)=>{const o=P("Content");return r(),c("main",Jt,[L(e.$slots,"top"),b("div",Qt,[w(o)]),w(Wt),w(Yt),L(e.$slots,"bottom")])}}}),we=t=>decodeURI(t).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),en=(t,e)=>{if(e===void 0)return!1;if(t.hash===e)return!0;const n=we(t.path),o=we(e);return n===o},Ce=(t,e)=>en(t,e.link)?!0:e.children?e.children.some(n=>Ce(t,n)):!1,tn=(t,e)=>t.link?F(D,q(U({},e),{item:t})):F("p",e,t.text),nn=(t,e)=>{var n;return((n=t.children)===null||n===void 0?void 0:n.length)?F("ul",{class:{"sidebar-sub-items":e>0}},t.children.map(o=>F("li",F(Y,{item:o,depth:e+1})))):null},Y=({item:t,depth:e=0})=>{const n=V(),o=Ce(n,t);return[tn(t,{class:{"sidebar-heading":e===0,"sidebar-item":!0,active:o}}),nn(t,e)]};Y.displayName="SidebarChild";Y.props={item:{type:Object,required:!0},depth:{type:Number,required:!1}};const an={class:"sidebar"},sn={class:"sidebar-links"},on=B({setup(t){const e=Z();return(n,o)=>(r(),c("aside",an,[w(Te),L(n.$slots,"top"),b("ul",sn,[(r(!0),c(H,null,I(a(e),s=>(r(),E(a(Y),{key:s.link||s.text,item:s},null,8,["item"]))),128))]),L(n.$slots,"bottom")]))}}),rn=B({setup(t){const e=X(),n=R(),o=M(),s=f(()=>n.value.navbar!==!1&&o.value.navbar!==!1),v=Z(),m=j(!1),h=_=>{m.value=typeof _=="boolean"?_:!m.value},l={x:0,y:0},i=_=>{l.x=_.changedTouches[0].clientX,l.y=_.changedTouches[0].clientY},u=_=>{const $=_.changedTouches[0].clientX-l.x,x=_.changedTouches[0].clientY-l.y;Math.abs($)>Math.abs(x)&&Math.abs($)>40&&($>0&&l.x<=80?h(!0):h(!1))},p=f(()=>[{"no-navbar":!s.value,"no-sidebar":!v.value.length,"sidebar-open":m.value},n.value.pageClass]);let d;$e(()=>{d=_e().afterEach(()=>{h(!1)})}),We(()=>{d()});const k=Ue(),g=k.resolve,y=k.pending;return(_,$)=>(r(),c("div",{class:O(["theme-container",a(p)]),onTouchstart:i,onTouchend:u},[L(_.$slots,"navbar",{},()=>[a(s)?(r(),E(Ht,{key:0,onToggleSidebar:h},{before:N(()=>[L(_.$slots,"navbar-before")]),after:N(()=>[L(_.$slots,"navbar-after")]),_:3})):T("",!0)]),b("div",{class:"sidebar-mask",onClick:$[0]||($[0]=x=>h(!1))}),L(_.$slots,"sidebar",{},()=>[w(on,null,{top:N(()=>[L(_.$slots,"sidebar-top")]),bottom:N(()=>[L(_.$slots,"sidebar-bottom")]),_:3})]),L(_.$slots,"page",{},()=>[a(n).home?(r(),E(st,{key:0})):(r(),E(me,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:a(g),onBeforeLeave:a(y)},{default:N(()=>[w(Zt,{key:a(e).path},{top:N(()=>[L(_.$slots,"page-top")]),bottom:N(()=>[L(_.$slots,"page-bottom")]),_:3})]),_:3},8,["onBeforeEnter","onBeforeLeave"]))])],34))}});const ln={props:{source:{default:"theme-default-content",type:String}},data(){return{navTreeArr:[],domHead:[],domHeadArray:[],currentIndex:0,realScroll:null,topPadding:-20}},mounted(){this.init(2)},beforeDestroy(){window.removeEventListener("scroll",this.realScroll)},methods:{initScroll(){this.realScroll=this.debouceAndThrotte(this.handleScroll),window.addEventListener("scroll",this.realScroll)},handleScroll(){this.domHeadArray.some((t,e)=>{if(this.checkInScreen(t))return this.currentIndex=e,!0})},debouceAndThrotte(t,e=200,n=666){let o=0,s=null;return function(){const v=new Date().getTime();o===0&&(o=v),v-o<n?(clearTimeout(s),s=setTimeout(()=>{o=v,t()},e)):(o=v,t())}},checkInScreen(t){const e=t.getBoundingClientRect();return e.top>this.topPadding&&e.bottom<window.innerHeight},destroy(){this.navTreeArr=this.domHead=this.domHeadArray=[]},getTop(t,e=0){let n=t.offsetTop,o=t.offsetParent;for(;o!==null;)n+=o.offsetTop,o=o.offsetParent;return e+n},init(t=3){if(this.destroy(),this.container=document.getElementsByClassName(this.source)[0],console.log("navTree init!"),!this.container)return;const e=this.container.getElementsByTagName("h1"),n=this.container.getElementsByTagName("h2"),o=this.container.getElementsByTagName("h3"),s=this.container.getElementsByTagName("h4"),v=this.container.getElementsByTagName("h5"),m=this.container.getElementsByTagName("h6");let h,l,i;if([e,n,o,s,v,m].forEach((p,d)=>{!p.length||(h==null?h="h"+(d+1):l==null?l="h"+(d+1):i==null&&(i="h"+(d+1)))}),!h)return;this.query=[h,l,i].slice(0,t).filter(p=>!!p).join(","),this.domHead=this.container.querySelectorAll(this.query),this.domHeadArray=Array.from(this.domHead);const u={[h]:1,[l]:2,[i]:3};this.domHeadArray.forEach(p=>{this.navTreeArr.push({text:p.innerText.slice(1),level:u[p.tagName.toLowerCase()]})}),this.realScroll||this.initScroll()},getClass(t){return"navTree_indent"+t},scroll(t){this.animateTo(this.getTop(this.domHead[t],0))},animateTo(t){t=this.checkOverBottom(t),window.removeEventListener("scroll",this.realScroll);let e=document.documentElement.scrollTop||document.body.scrollTop;const n=()=>{const o=t-e;e=e+o/5,Math.abs(o)<2?(window.scrollTo(0,t),window.addEventListener("scroll",this.realScroll)):(window.scrollTo(0,e),requestAnimationFrame(n))};n()},checkOverBottom(t){const e=document.getElementById("app"),o=(e.offsetHeight||e.clientHeight)-window.innerHeight;return t>o?o:t}}},un={key:0,ref:"navTree",class:"navTree"},cn=["onClick"];function dn(t,e,n,o,s,v){return s.navTreeArr.length>1?(r(),c("div",un,[(r(!0),c(H,null,I(s.navTreeArr,(m,h)=>(r(),c("p",{key:h,class:O([v.getClass(m.level),h===s.currentIndex?"active":""]),onClick:l=>v.scroll(h)},S(m.text),11,cn))),128))],512)):T("",!0)}var hn=ee(ln,[["render",dn],["__scopeId","data-v-b5cbb30a"]]);const pn={methods:{handleClick(){const t="https://github.dev/liujunjia1996/liujunjia1996.github.io/blob/main/docs";window.open(t+window.location.pathname.replace(".html",".md"))}}};function vn(t,e,n,o,s,v){return r(),c("a",{class:"navbar-edit",title:"only for myself",onClick:e[0]||(e[0]=(...m)=>v.handleClick&&v.handleClick(...m))},"edit this page")}var fn=ee(pn,[["render",vn]]);const mn={components:{Layout:rn,NavTree:hn,EditThisPage:fn}};function _n(t,e,n,o,s,v){const m=P("EditThisPage"),h=P("NavTree"),l=P("Layout",!0);return r(),E(l,null,{"navbar-before":N(()=>[w(m)]),"page-bottom":N(()=>[w(h,{id:"navTree"})]),_:1})}var yn=ee(mn,[["render",_n]]);export{yn as default};
