(function(e){function t(t){for(var r,a,c=t[0],i=t[1],s=t[2],l=0,f=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={1:0},o={1:0},u=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{2:"32e83d0e",3:"ad1f68cf",4:"23dd3820",5:"bb5fa9f9",6:"00d88efe",7:"e41be709",8:"f9056958",9:"d4c5477b",10:"cee0a83b",11:"e28900a2"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{2:"193c55c7",3:"c3ae1559",4:"bd82cfa4",5:"a7d9e523",6:"a93779bd",7:"9554541b",8:"6271fe9c",9:"091366d6",10:"31d6cfe0",11:"31d6cfe0"}[e]+".css",o=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var s=u[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){s=f[c],l=s.getAttribute("data-href");if(l===r||l===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],d.parentNode.removeChild(d),n(u)},d.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;u.push([1,0]),n()})({1:function(e,t,n){e.exports=n("2f39")},"2f39":function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"default",(function(){return O}));var a={};n.r(a),n.d(a,"updateToken",(function(){return j}));var o={};n.r(o),n.d(o,"setToken",(function(){return C}));var u={};n.r(u),n.d(u,"default",(function(){return T}));var c={};n.r(c),n.d(c,"updateCurrentGameID",(function(){return I})),n.d(c,"updateCurrentRounds",(function(){return L}));var i={};n.r(i),n.d(i,"setCurrentGame",(function(){return N}));n("ac1f"),n("5319"),n("96cf");var s=n("c973"),l=n.n(s),f=(n("5c7d"),n("7d6e"),n("e54f"),n("985d"),n("31cd"),n("2b0e")),d=n("1f91"),p=n("42d2"),m=n("b05d"),h=n("2a19"),b=n("7518");f["a"].use(m["a"],{config:{},lang:d["a"],iconSet:p["a"],plugins:{Notify:h["a"],BottomSheet:b["a"]}});var g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},v=[],y={name:"App",mounted:function(){window.router=this.$router}},_=y,w=n("2877"),k=Object(w["a"])(_,g,v,!1,null,null,null),x=k.exports,P=n("2f62"),S=function(){return{token:""}};function O(e){return e.token=localStorage.getItem("Authorization"),e.token}function j(e,t){e.token=t,localStorage.setItem("Authorization",t)}var C=function(e,t){var n=e.commit;n("updateToken",t)},A={namespaced:!0,state:S,getters:r,mutations:a,actions:o},E=function(){return{current_game_id:0,current_rounds:0}};function T(e){return 0===e.current_game_id&&(e.current_game_id=localStorage.getItem("current_game_id")),0===e.current_rounds&&(e.current_rounds=localStorage.getItem("current_rounds")),result={current_game_id:e.current_game_id,current_rounds:e.current_rounds},result}function I(e,t){e.current_game_id=t,localStorage.setItem("current_game_id",t)}function L(e,t){e.current_rounds=t,localStorage.setItem("current_rounds",t)}var N=function(e,t){var n=e.commit;n("updateCurrentGameID",t)},B={namespaced:!0,state:E,getters:u,mutations:c,actions:i};f["a"].use(P["a"]);var R=function(){var e=new P["a"].Store({modules:{authorization:A,current_game:B},strict:!1});return e},q=n("a18c"),D=function(){return M.apply(this,arguments)};function M(){return M=l()(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("function"!==typeof R){e.next=6;break}return e.next=3,R({Vue:f["a"]});case 3:e.t0=e.sent,e.next=7;break;case 6:e.t0=R;case 7:if(t=e.t0,"function"!==typeof q["a"]){e.next=14;break}return e.next=11,Object(q["a"])({Vue:f["a"],store:t});case 11:e.t1=e.sent,e.next=15;break;case 14:e.t1=q["a"];case 15:return n=e.t1,t.$router=n,r={router:n,store:t,render:function(e){return e(x)}},r.el="#q-app",e.abrupt("return",{app:r,store:t,router:n});case 20:case"end":return e.stop()}}),e)}))),M.apply(this,arguments)}var $=n("a925"),z={failed:"Action failed",success:"Action was successful"},G={"en-us":z};f["a"].use($["a"]);var V=new $["a"]({locale:"en-us",fallbackLocale:"en-us",messages:G}),J=function(e){var t=e.app;t.i18n=V},F=n("bc3a"),H=n.n(F);f["a"].prototype.$axios=H.a;var K="";function Q(){return U.apply(this,arguments)}function U(){return U=l()(regeneratorRuntime.mark((function e(){var t,n,r,a,o,u,c,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:t=e.sent,n=t.app,r=t.store,a=t.router,o=!1,u=function(e){o=!0;var t=Object(e)===e?a.resolve(e).route.fullPath:e;window.location.href=t},c=window.location.href.replace(window.location.origin,""),i=[J,void 0],s=0;case 11:if(!(!1===o&&s<i.length)){e.next=29;break}if("function"===typeof i[s]){e.next=14;break}return e.abrupt("continue",26);case 14:return e.prev=14,e.next=17,i[s]({app:n,router:a,store:r,Vue:f["a"],ssrContext:null,redirect:u,urlPath:c,publicPath:K});case 17:e.next=26;break;case 19:if(e.prev=19,e.t0=e["catch"](14),!e.t0||!e.t0.url){e.next=24;break}return window.location.href=e.t0.url,e.abrupt("return");case 24:return console.error("[Quasar] boot error:",e.t0),e.abrupt("return");case 26:s++,e.next=11;break;case 29:if(!0!==o){e.next=31;break}return e.abrupt("return");case 31:new f["a"](n);case 32:case"end":return e.stop()}}),e,null,[[14,19]])}))),U.apply(this,arguments)}Q()},"31cd":function(e,t,n){},a18c:function(e,t,n){"use strict";var r=n("2b0e"),a=n("8c4f"),o=(n("d3b7"),n("e6cf"),[{path:"/",component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"713b"))},children:[{path:"",redirect:"intro"},{name:"name",path:"login",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"013f"))}},{name:"intro",path:"intro",component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"576c"))}},{path:"game_player",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"3e5f"))}}]},{path:"/manager",component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"6c09"))},children:[{path:"",redirect:"game"},{path:"user",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"d843"))}},{path:"game",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"2d81"))}},{path:"game_host",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"8a6d"))}},{path:"hospital",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"3dea"))}}]}]);o.push({path:"*",component:function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"e51e"))}});var u=o;r["a"].use(a["a"]);t["a"]=function(){var e=new a["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:u,mode:"hash",base:""});return e}}});