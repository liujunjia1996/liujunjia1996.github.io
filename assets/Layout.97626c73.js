import{_ as $,r as A,o as l,c as v,a as y,f as x,i as R,j as m,k as pe,h as n,F as B,l as D,d as b,t as H,m as w,n as F,p as Y,q as S,w as C,s as de,v as k,e as V,x as X,y as Se,z as Ce,A as He,B as J,C as Q,D as M,E as U,G as he,H as _e,u as me,g as I,T as fe,I as z,J as ge,K,L as G,M as Ne,N as Be,O as Z,P as be,Q as ke,b as Ie,R as ee,S as Ee,U as q,V as te,W as Ae,X as Me,Y as Pe,Z as De}from"./app.376890f8.js";const Re={},Oe={class:"theme-default-content"};function ze(r,e){const t=A("Content");return l(),v("div",Oe,[y(t)])}var Fe=$(Re,[["render",ze],["__file","HomeContent.vue"]]);const je={key:0,class:"features"},We=x({__name:"HomeFeatures",setup(r){const e=R(),t=m(()=>pe(e.value.features)?e.value.features:[]);return(a,o)=>n(t).length?(l(),v("div",je,[(l(!0),v(B,null,D(n(t),d=>(l(),v("div",{key:d.title,class:"feature"},[b("h2",null,H(d.title),1),b("p",null,H(d.details),1)]))),128))])):w("",!0)}});var qe=$(We,[["__file","HomeFeatures.vue"]]);const Ve=["innerHTML"],Ue=["textContent"],Ke=x({__name:"HomeFooter",setup(r){const e=R(),t=m(()=>e.value.footer),a=m(()=>e.value.footerHtml);return(o,d)=>n(t)?(l(),v(B,{key:0},[n(a)?(l(),v("div",{key:0,class:"footer",innerHTML:n(t)},null,8,Ve)):(l(),v("div",{key:1,class:"footer",textContent:H(n(t))},null,8,Ue))],64)):w("",!0)}});var Ge=$(Ke,[["__file","HomeFooter.vue"]]);const Xe=["href","rel","target","aria-label"],Ye=x({inheritAttrs:!1}),Je=x({...Ye,__name:"AutoLink",props:{item:{type:Object,required:!0}},setup(r){const e=r,t=F(),a=He(),{item:o}=Y(e),d=m(()=>X(o.value.link)),_=m(()=>Se(o.value.link)||Ce(o.value.link)),u=m(()=>{if(!_.value){if(o.value.target)return o.value.target;if(d.value)return"_blank"}}),s=m(()=>u.value==="_blank"),i=m(()=>!d.value&&!_.value&&!s.value),c=m(()=>{if(!_.value){if(o.value.rel)return o.value.rel;if(s.value)return"noopener noreferrer"}}),p=m(()=>o.value.ariaLabel||o.value.text),h=m(()=>{const T=Object.keys(a.value.locales);return T.length?!T.some(f=>f===o.value.link):o.value.link!=="/"}),g=m(()=>h.value?t.path.startsWith(o.value.link):!1),L=m(()=>i.value?o.value.activeMatch?new RegExp(o.value.activeMatch).test(t.path):g.value:!1);return(T,f)=>{const N=A("RouterLink"),E=A("AutoLinkExternalIcon");return n(i)?(l(),S(N,de({key:0,class:{"router-link-active":n(L)},to:n(o).link,"aria-label":n(p)},T.$attrs),{default:C(()=>[k(T.$slots,"before"),V(" "+H(n(o).text)+" ",1),k(T.$slots,"after")]),_:3},16,["class","to","aria-label"])):(l(),v("a",de({key:1,class:"external-link",href:n(o).link,rel:n(c),target:n(u),"aria-label":n(p)},T.$attrs),[k(T.$slots,"before"),V(" "+H(n(o).text)+" ",1),n(s)?(l(),S(E,{key:0})):w("",!0),k(T.$slots,"after")],16,Xe))}}});var P=$(Je,[["__file","AutoLink.vue"]]);const Qe={class:"hero"},Ze={key:0,id:"main-title"},et={key:1,class:"description"},tt={key:2,class:"actions"},nt=x({__name:"HomeHero",setup(r){const e=R(),t=J(),a=Q(),o=m(()=>a.value&&e.value.heroImageDark!==void 0?e.value.heroImageDark:e.value.heroImage),d=m(()=>e.value.heroText===null?null:e.value.heroText||t.value.title||"Hello"),_=m(()=>e.value.heroAlt||d.value||"hero"),u=m(()=>e.value.tagline===null?null:e.value.tagline||t.value.description||"Welcome to your VuePress site"),s=m(()=>pe(e.value.actions)?e.value.actions.map(({text:c,link:p,type:h="primary"})=>({text:c,link:p,type:h})):[]),i=()=>{if(!o.value)return null;const c=U("img",{src:he(o.value),alt:_.value});return e.value.heroImageDark===void 0?c:U(_e,()=>c)};return(c,p)=>(l(),v("header",Qe,[y(i),n(d)?(l(),v("h1",Ze,H(n(d)),1)):w("",!0),n(u)?(l(),v("p",et,H(n(u)),1)):w("",!0),n(s).length?(l(),v("p",tt,[(l(!0),v(B,null,D(n(s),h=>(l(),S(P,{key:h.text,class:M(["action-button",[h.type]]),item:h},null,8,["class","item"]))),128))])):w("",!0)]))}});var at=$(nt,[["__file","HomeHero.vue"]]);const ot={class:"home"},rt=x({__name:"Home",setup(r){return(e,t)=>(l(),v("main",ot,[y(at),y(qe),y(Fe),y(Ge)]))}});var st=$(rt,[["__file","Home.vue"]]);const lt=x({__name:"NavbarBrand",setup(r){const e=me(),t=J(),a=I(),o=Q(),d=m(()=>a.value.home||e.value),_=m(()=>t.value.title),u=m(()=>o.value&&a.value.logoDark!==void 0?a.value.logoDark:a.value.logo),s=()=>{if(!u.value)return null;const i=U("img",{class:"logo",src:he(u.value),alt:_.value});return a.value.logoDark===void 0?i:U(_e,()=>i)};return(i,c)=>{const p=A("RouterLink");return l(),S(p,{to:n(d)},{default:C(()=>[y(s),n(_)?(l(),v("span",{key:0,class:M(["site-name",{"can-hide":n(u)}])},H(n(_)),3)):w("",!0)]),_:1},8,["to"])}}});var it=$(lt,[["__file","NavbarBrand.vue"]]);const ut=x({__name:"DropdownTransition",setup(r){const e=a=>{a.style.height=a.scrollHeight+"px"},t=a=>{a.style.height=""};return(a,o)=>(l(),S(fe,{name:"dropdown",onEnter:e,onAfterEnter:t,onBeforeLeave:e},{default:C(()=>[k(a.$slots,"default")]),_:3}))}});var ye=$(ut,[["__file","DropdownTransition.vue"]]);const ct=["aria-label"],dt={class:"title"},vt=b("span",{class:"arrow down"},null,-1),pt=["aria-label"],ht={class:"title"},_t={class:"navbar-dropdown"},mt={class:"navbar-dropdown-subtitle"},ft={key:1},gt={class:"navbar-dropdown-subitem-wrapper"},bt=x({__name:"NavbarDropdown",props:{item:{type:Object,required:!0}},setup(r){const e=r,{item:t}=Y(e),a=m(()=>t.value.ariaLabel||t.value.text),o=z(!1),d=F();ge(()=>d.path,()=>{o.value=!1});const _=s=>{s.detail===0?o.value=!o.value:o.value=!1},u=(s,i)=>i[i.length-1]===s;return(s,i)=>(l(),v("div",{class:M(["navbar-dropdown-wrapper",{open:o.value}])},[b("button",{class:"navbar-dropdown-title",type:"button","aria-label":n(a),onClick:_},[b("span",dt,H(n(t).text),1),vt],8,ct),b("button",{class:"navbar-dropdown-title-mobile",type:"button","aria-label":n(a),onClick:i[0]||(i[0]=c=>o.value=!o.value)},[b("span",ht,H(n(t).text),1),b("span",{class:M(["arrow",o.value?"down":"right"])},null,2)],8,pt),y(ye,null,{default:C(()=>[K(b("ul",_t,[(l(!0),v(B,null,D(n(t).children,c=>(l(),v("li",{key:c.text,class:"navbar-dropdown-item"},[c.children?(l(),v(B,{key:0},[b("h4",mt,[c.link?(l(),S(P,{key:0,item:c,onFocusout:p=>u(c,n(t).children)&&c.children.length===0&&(o.value=!1)},null,8,["item","onFocusout"])):(l(),v("span",ft,H(c.text),1))]),b("ul",gt,[(l(!0),v(B,null,D(c.children,p=>(l(),v("li",{key:p.link,class:"navbar-dropdown-subitem"},[y(P,{item:p,onFocusout:h=>u(p,c.children)&&u(c,n(t).children)&&(o.value=!1)},null,8,["item","onFocusout"])]))),128))])],64)):(l(),S(P,{key:1,item:c,onFocusout:p=>u(c,n(t).children)&&(o.value=!1)},null,8,["item","onFocusout"]))]))),128))],512),[[G,o.value]])]),_:1})],2))}});var kt=$(bt,[["__file","NavbarDropdown.vue"]]);const ve=r=>decodeURI(r).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),yt=(r,e)=>{if(e.hash===r)return!0;const t=ve(e.path),a=ve(r);return t===a},$e=(r,e)=>r.link&&yt(r.link,e)?!0:r.children?r.children.some(t=>$e(t,e)):!1,Le=r=>!X(r)||/github\.com/.test(r)?"GitHub":/bitbucket\.org/.test(r)?"Bitbucket":/gitlab\.com/.test(r)?"GitLab":/gitee\.com/.test(r)?"Gitee":null,$t={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},Lt=({docsRepo:r,editLinkPattern:e})=>{if(e)return e;const t=Le(r);return t!==null?$t[t]:null},Tt=({docsRepo:r,docsBranch:e,docsDir:t,filePathRelative:a,editLinkPattern:o})=>{if(!a)return null;const d=Lt({docsRepo:r,editLinkPattern:o});return d?d.replace(/:repo/,X(r)?r:`https://github.com/${r}`).replace(/:branch/,e).replace(/:path/,Ne(`${Be(t)}/${a}`)):null},wt={key:0,class:"navbar-items"},xt=x({__name:"NavbarItems",setup(r){const e=()=>{const i=Z(),c=me(),p=J(),h=I();return m(()=>{var N,E;const g=Object.keys(p.value.locales);if(g.length<2)return[];const L=i.currentRoute.value.path,T=i.currentRoute.value.fullPath;return[{text:(N=h.value.selectLanguageText)!=null?N:"unknown language",ariaLabel:(E=h.value.selectLanguageAriaLabel)!=null?E:"unkown language",children:g.map(O=>{var oe,re,se,le,ie,ue;const j=(re=(oe=p.value.locales)==null?void 0:oe[O])!=null?re:{},ne=(le=(se=h.value.locales)==null?void 0:se[O])!=null?le:{},ae=`${j.lang}`,we=(ie=ne.selectLanguageName)!=null?ie:ae;let W;if(ae===p.value.lang)W=T;else{const ce=L.replace(c.value,O);i.getRoutes().some(xe=>xe.path===ce)?W=ce:W=(ue=ne.home)!=null?ue:O}return{text:we,link:W}})}]})},t=()=>{const i=I(),c=m(()=>i.value.repo),p=m(()=>c.value?Le(c.value):null),h=m(()=>c.value&&!X(c.value)?`https://github.com/${c.value}`:c.value),g=m(()=>h.value?i.value.repoLabel?i.value.repoLabel:p.value===null?"Source":p.value:null);return m(()=>!h.value||!g.value?[]:[{text:g.value,link:h.value}])},a=i=>be(i)?ke(i):i.children?{...i,children:i.children.map(a)}:i,d=(()=>{const i=I();return m(()=>(i.value.navbar||[]).map(a))})(),_=e(),u=t(),s=m(()=>[...d.value,..._.value,...u.value]);return(i,c)=>n(s).length?(l(),v("nav",wt,[(l(!0),v(B,null,D(n(s),p=>(l(),v("div",{key:p.text,class:"navbar-item"},[p.children?(l(),S(kt,{key:0,item:p},null,8,["item"])):(l(),S(P,{key:1,item:p},null,8,["item"]))]))),128))])):w("",!0)}});var Te=$(xt,[["__file","NavbarItems.vue"]]);const St=["title"],Ct={class:"icon",focusable:"false",viewBox:"0 0 32 32"},Ht=Ie('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9),Nt=[Ht],Bt={class:"icon",focusable:"false",viewBox:"0 0 32 32"},It=b("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1),Et=[It],At=x({__name:"ToggleColorModeButton",setup(r){const e=I(),t=Q(),a=()=>{t.value=!t.value};return(o,d)=>(l(),v("button",{class:"toggle-color-mode-button",title:n(e).toggleColorMode,onClick:a},[K((l(),v("svg",Ct,Nt,512)),[[G,!n(t)]]),K((l(),v("svg",Bt,Et,512)),[[G,n(t)]])],8,St))}});var Mt=$(At,[["__file","ToggleColorModeButton.vue"]]);const Pt=["title"],Dt=b("div",{class:"icon","aria-hidden":"true"},[b("span"),b("span"),b("span")],-1),Rt=[Dt],Ot=x({__name:"ToggleSidebarButton",emits:["toggle"],setup(r){const e=I();return(t,a)=>(l(),v("div",{class:"toggle-sidebar-button",title:n(e).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:a[0]||(a[0]=o=>t.$emit("toggle"))},Rt,8,Pt))}});var zt=$(Ot,[["__file","ToggleSidebarButton.vue"]]);const Ft=x({__name:"Navbar",emits:["toggle-sidebar"],setup(r){const e=I(),t=z(null),a=z(null),o=z(0),d=m(()=>o.value?{maxWidth:o.value+"px"}:{});ee(()=>{const s=_(t.value,"paddingLeft")+_(t.value,"paddingRight"),i=()=>{var c;window.innerWidth<=719?o.value=0:o.value=t.value.offsetWidth-s-(((c=a.value)==null?void 0:c.offsetWidth)||0)};i(),window.addEventListener("resize",i,!1),window.addEventListener("orientationchange",i,!1)});function _(u,s){var p,h,g;const i=(g=(h=(p=u==null?void 0:u.ownerDocument)==null?void 0:p.defaultView)==null?void 0:h.getComputedStyle(u,null))==null?void 0:g[s],c=Number.parseInt(i,10);return Number.isNaN(c)?0:c}return(u,s)=>{const i=A("NavbarSearch");return l(),v("header",{ref_key:"navbar",ref:t,class:"navbar"},[y(zt,{onToggle:s[0]||(s[0]=c=>u.$emit("toggle-sidebar"))}),b("span",{ref_key:"navbarBrand",ref:a},[y(it)],512),b("div",{class:"navbar-items-wrapper",style:Ee(n(d))},[k(u.$slots,"before"),y(Te,{class:"can-hide"}),k(u.$slots,"after"),n(e).colorModeSwitch?(l(),S(Mt,{key:0})):w("",!0),y(i)],4)],512)}}});var jt=$(Ft,[["__file","Navbar.vue"]]);const Wt={class:"page-meta"},qt={key:0,class:"meta-item edit-link"},Vt={key:1,class:"meta-item last-updated"},Ut={class:"meta-item-label"},Kt={class:"meta-item-info"},Gt={key:2,class:"meta-item contributors"},Xt={class:"meta-item-label"},Yt={class:"meta-item-info"},Jt=["title"],Qt=V(", "),Zt=x({__name:"PageMeta",setup(r){const e=()=>{const s=I(),i=q(),c=R();return m(()=>{var E,O,j;if(!((O=(E=c.value.editLink)!=null?E:s.value.editLink)!=null?O:!0))return null;const{repo:h,docsRepo:g=h,docsBranch:L="main",docsDir:T="",editLinkText:f}=s.value;if(!g)return null;const N=Tt({docsRepo:g,docsBranch:L,docsDir:T,filePathRelative:i.value.filePathRelative,editLinkPattern:(j=c.value.editLinkPattern)!=null?j:s.value.editLinkPattern});return N?{text:f!=null?f:"Edit this page",link:N}:null})},t=()=>{const s=I(),i=q(),c=R();return m(()=>{var g,L,T,f;return!((L=(g=c.value.lastUpdated)!=null?g:s.value.lastUpdated)!=null?L:!0)||!((T=i.value.git)!=null&&T.updatedTime)?null:new Date((f=i.value.git)==null?void 0:f.updatedTime).toLocaleString()})},a=()=>{const s=I(),i=q(),c=R();return m(()=>{var h,g,L,T;return((g=(h=c.value.contributors)!=null?h:s.value.contributors)!=null?g:!0)&&(T=(L=i.value.git)==null?void 0:L.contributors)!=null?T:null})},o=I(),d=e(),_=t(),u=a();return(s,i)=>{const c=A("ClientOnly");return l(),v("footer",Wt,[n(d)?(l(),v("div",qt,[y(P,{class:"meta-item-label",item:n(d)},null,8,["item"])])):w("",!0),n(_)?(l(),v("div",Vt,[b("span",Ut,H(n(o).lastUpdatedText)+": ",1),y(c,null,{default:C(()=>[b("span",Kt,H(n(_)),1)]),_:1})])):w("",!0),n(u)&&n(u).length?(l(),v("div",Gt,[b("span",Xt,H(n(o).contributorsText)+": ",1),b("span",Yt,[(l(!0),v(B,null,D(n(u),(p,h)=>(l(),v(B,{key:h},[b("span",{class:"contributor",title:`email: ${p.email}`},H(p.name),9,Jt),h!==n(u).length-1?(l(),v(B,{key:0},[Qt],64)):w("",!0)],64))),128))])])):w("",!0)])}}});var en=$(Zt,[["__file","PageMeta.vue"]]);const tn={key:0,class:"page-nav"},nn={class:"inner"},an={key:0,class:"prev"},on={key:1,class:"next"},rn=x({__name:"PageNav",setup(r){const e=s=>s===!1?null:be(s)?ke(s):Ae(s)?s:!1,t=(s,i,c)=>{const p=s.findIndex(h=>h.link===i);if(p!==-1){const h=s[p+c];return h!=null&&h.link?h:null}for(const h of s)if(h.children){const g=t(h.children,i,c);if(g)return g}return null},a=R(),o=te(),d=F(),_=m(()=>{const s=e(a.value.prev);return s!==!1?s:t(o.value,d.path,-1)}),u=m(()=>{const s=e(a.value.next);return s!==!1?s:t(o.value,d.path,1)});return(s,i)=>n(_)||n(u)?(l(),v("nav",tn,[b("p",nn,[n(_)?(l(),v("span",an,[y(P,{item:n(_)},null,8,["item"])])):w("",!0),n(u)?(l(),v("span",on,[y(P,{item:n(u)},null,8,["item"])])):w("",!0)])])):w("",!0)}});var sn=$(rn,[["__file","PageNav.vue"]]);const ln={class:"page"},un={class:"theme-default-content"},cn=x({__name:"Page",setup(r){return(e,t)=>{const a=A("Content");return l(),v("main",ln,[k(e.$slots,"top"),b("div",un,[k(e.$slots,"content-top"),y(a),k(e.$slots,"content-bottom")]),y(en),y(sn),k(e.$slots,"bottom")])}}});var dn=$(cn,[["__file","Page.vue"]]);const vn={class:"sidebar-item-children"},pn=x({__name:"SidebarItem",props:{item:{type:Object,required:!0},depth:{type:Number,required:!1,default:0}},setup(r){const e=r,{item:t,depth:a}=Y(e),o=F(),d=Z(),_=m(()=>$e(t.value,o)),u=m(()=>({"sidebar-item":!0,"sidebar-heading":a.value===0,active:_.value,collapsible:t.value.collapsible})),s=z(!0),i=z(void 0);return t.value.collapsible&&(s.value=_.value,i.value=()=>{s.value=!s.value},d.afterEach(()=>{s.value=_.value})),(c,p)=>{var g;const h=A("SidebarItem",!0);return l(),v("li",null,[n(t).link?(l(),S(P,{key:0,class:M(n(u)),item:n(t)},null,8,["class","item"])):(l(),v("p",{key:1,tabindex:"0",class:M(n(u)),onClick:p[0]||(p[0]=(...L)=>i.value&&i.value(...L)),onKeydown:p[1]||(p[1]=Me((...L)=>i.value&&i.value(...L),["enter"]))},[V(H(n(t).text)+" ",1),n(t).collapsible?(l(),v("span",{key:0,class:M(["arrow",s.value?"down":"right"])},null,2)):w("",!0)],34)),(g=n(t).children)!=null&&g.length?(l(),S(ye,{key:2},{default:C(()=>[K(b("ul",vn,[(l(!0),v(B,null,D(n(t).children,L=>(l(),S(h,{key:`${n(a)}${L.text}${L.link}`,item:L,depth:n(a)+1},null,8,["item","depth"]))),128))],512),[[G,s.value]])]),_:1})):w("",!0)])}}});var hn=$(pn,[["__file","SidebarItem.vue"]]);const _n={key:0,class:"sidebar-items"},mn=x({__name:"SidebarItems",setup(r){const e=F(),t=te();return ee(()=>{ge(()=>e.hash,a=>{const o=document.querySelector(".sidebar");if(!o)return;const d=document.querySelector(`.sidebar a.sidebar-item[href="${e.path}${a}"]`);if(!d)return;const{top:_,height:u}=o.getBoundingClientRect(),{top:s,height:i}=d.getBoundingClientRect();s<_?d.scrollIntoView(!0):s+i>_+u&&d.scrollIntoView(!1)})}),(a,o)=>n(t).length?(l(),v("ul",_n,[(l(!0),v(B,null,D(n(t),d=>(l(),S(hn,{key:d.link||d.text,item:d},null,8,["item"]))),128))])):w("",!0)}});var fn=$(mn,[["__file","SidebarItems.vue"]]);const gn={class:"sidebar"},bn=x({__name:"Sidebar",setup(r){return(e,t)=>(l(),v("aside",gn,[y(Te),k(e.$slots,"top"),y(fn),k(e.$slots,"bottom")]))}});var kn=$(bn,[["__file","Sidebar.vue"]]);const yn=x({__name:"Layout",setup(r){const e=q(),t=R(),a=I(),o=m(()=>t.value.navbar!==!1&&a.value.navbar!==!1),d=te(),_=z(!1),u=f=>{_.value=typeof f=="boolean"?f:!_.value},s={x:0,y:0},i=f=>{s.x=f.changedTouches[0].clientX,s.y=f.changedTouches[0].clientY},c=f=>{const N=f.changedTouches[0].clientX-s.x,E=f.changedTouches[0].clientY-s.y;Math.abs(N)>Math.abs(E)&&Math.abs(N)>40&&(N>0&&s.x<=80?u(!0):u(!1))},p=m(()=>[{"no-navbar":!o.value,"no-sidebar":!d.value.length,"sidebar-open":_.value},t.value.pageClass]);let h;ee(()=>{h=Z().afterEach(()=>{u(!1)})}),Pe(()=>{h()});const g=De(),L=g.resolve,T=g.pending;return(f,N)=>(l(),v("div",{class:M(["theme-container",n(p)]),onTouchstart:i,onTouchend:c},[k(f.$slots,"navbar",{},()=>[n(o)?(l(),S(jt,{key:0,onToggleSidebar:u},{before:C(()=>[k(f.$slots,"navbar-before")]),after:C(()=>[k(f.$slots,"navbar-after")]),_:3})):w("",!0)]),b("div",{class:"sidebar-mask",onClick:N[0]||(N[0]=E=>u(!1))}),k(f.$slots,"sidebar",{},()=>[y(kn,null,{top:C(()=>[k(f.$slots,"sidebar-top")]),bottom:C(()=>[k(f.$slots,"sidebar-bottom")]),_:3})]),k(f.$slots,"page",{},()=>[n(t).home?(l(),S(st,{key:0})):(l(),S(fe,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:n(L),onBeforeLeave:n(T)},{default:C(()=>[(l(),S(dn,{key:n(e).path},{top:C(()=>[k(f.$slots,"page-top")]),"content-top":C(()=>[k(f.$slots,"page-content-top")]),"content-bottom":C(()=>[k(f.$slots,"page-content-bottom")]),bottom:C(()=>[k(f.$slots,"page-bottom")]),_:3}))]),_:3},8,["onBeforeEnter","onBeforeLeave"]))])],34))}});var $n=$(yn,[["__file","Layout.vue"]]);const Ln={props:{source:{default:"theme-default-content",type:String}},data(){return{navTreeArr:[],domHead:[],domHeadArray:[],currentIndex:0,realScroll:null,topPadding:-20}},mounted(){this.init(2)},beforeDestroy(){window.removeEventListener("scroll",this.realScroll)},methods:{initScroll(){this.realScroll=this.handleScroll,window.addEventListener("scroll",this.realScroll)},handleScroll(){this.domHeadArray.some((r,e)=>{if(this.checkInScreen(r))return this.currentIndex=e,!0})},debouceAndThrotte(r,e=200,t=666){let a=0,o=null;return function(){const d=new Date().getTime();a===0&&(a=d),d-a<t?(clearTimeout(o),o=setTimeout(()=>{a=d,r()},e)):(a=d,r())}},checkInScreen(r){const e=r.getBoundingClientRect();return e.top>this.topPadding&&e.bottom<window.innerHeight},destroy(){this.navTreeArr=this.domHead=this.domHeadArray=[]},getTop(r,e=0){let t=r.offsetTop,a=r.offsetParent;for(;a!==null;)t+=a.offsetTop,a=a.offsetParent;return e+t},init(r=3){if(this.destroy(),this.container=document.getElementsByClassName(this.source)[0],console.log("navTree init!"),!this.container)return;const e=this.container.getElementsByTagName("h1"),t=this.container.getElementsByTagName("h2"),a=this.container.getElementsByTagName("h3"),o=this.container.getElementsByTagName("h4"),d=this.container.getElementsByTagName("h5"),_=this.container.getElementsByTagName("h6");let u,s,i;if([e,t,a,o,d,_].forEach((p,h)=>{!p.length||(u==null?u="h"+(h+1):s==null?s="h"+(h+1):i==null&&(i="h"+(h+1)))}),!u)return;this.query=[u,s,i].slice(0,r).filter(p=>!!p).join(","),this.domHead=this.container.querySelectorAll(this.query),this.domHeadArray=Array.from(this.domHead);const c={[u]:1,[s]:2,[i]:3};this.domHeadArray.forEach(p=>{this.navTreeArr.push({text:p.innerText.slice(1),level:c[p.tagName.toLowerCase()]})}),this.realScroll||this.initScroll()},getClass(r){return"navTree_indent"+r},scroll(r){this.animateTo(this.getTop(this.domHead[r],0))},animateTo(r){r=this.checkOverBottom(r),window.removeEventListener("scroll",this.realScroll);let e=document.documentElement.scrollTop||document.body.scrollTop;const t=()=>{const a=r-e;e=e+a/5,Math.abs(a)<2?(window.scrollTo(0,r),window.addEventListener("scroll",this.realScroll)):(window.scrollTo(0,e),requestAnimationFrame(t))};t()},checkOverBottom(r){const e=document.getElementById("app"),a=(e.offsetHeight||e.clientHeight)-window.innerHeight;return r>a?a:r}}},Tn={key:0,ref:"navTree",class:"navTree"},wn=["onClick"];function xn(r,e,t,a,o,d){return o.navTreeArr.length>1?(l(),v("div",Tn,[(l(!0),v(B,null,D(o.navTreeArr,(_,u)=>(l(),v("p",{key:u,class:M([d.getClass(_.level),u===o.currentIndex?"active":""]),onClick:s=>d.scroll(u)},H(_.text),11,wn))),128))],512)):w("",!0)}var Sn=$(Ln,[["render",xn],["__scopeId","data-v-651e59a2"],["__file","NavTree.vue"]]);const Cn={components:{Layout:$n,NavTree:Sn},mounted(){document.onkeydown=function(r){if(r.key==="."){const e="https://github.dev/liujunjia1996/liujunjia1996.github.io/blob/main/docs";window.open(e+window.location.pathname.replace(".html",".md"))}}}};function Hn(r,e,t,a,o,d){const _=A("NavTree"),u=A("Layout",!0);return l(),S(u,null,{"navbar-before":C(()=>[]),"page-bottom":C(()=>[y(_,{id:"navTree"})]),_:1})}var Bn=$(Cn,[["render",Hn],["__file","Layout.vue"]]);export{Bn as default};
