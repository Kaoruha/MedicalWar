(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"6c09":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-layout",{attrs:{view:"hHh lpR fFf"}},[t("q-header",{staticClass:"bg-primary text-white",attrs:{elevated:""}},[t("q-toolbar",[t("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(a){e.left=!e.left}}}),t("q-toolbar-title",[e._v("\n        Medical WarGame\n      ")])],1)],1),t("q-drawer",{attrs:{"show-if-above":"",side:"left",bordered:""},model:{value:e.left,callback:function(a){e.left=a},expression:"left"}},[t("mLeft")],1),t("q-page-container",[t("router-view")],1)],1)},l=[],n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-scroll-area",{staticClass:"fit"},e._l(e.menuList,(function(a,r){return t("q-list",{key:r},[t("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:"",active:"Outbox"===a.label,to:a.url}},[t("q-item-section",{attrs:{avatar:""}},[t("q-icon",{attrs:{name:a.icon}})],1),t("q-item-section",[e._v(e._s(a.label))])],1),a.separator?t("q-separator"):e._e()],1)})),1)},o=[],i={name:"Header",data:function(){return{menuList:[{icon:"games",label:"Games",separator:!1,url:"/manager/game"},{icon:"supervised_user_circle",label:"User",separator:!1,url:"/manager/user"},{icon:"local_hospital",label:"Hospital",separator:!1,url:"/manager/hospital"}]}}},s=i,c=t("2877"),u=t("4983"),p=t("1c1c"),m=t("66e5"),f=t("4074"),b=t("0016"),d=t("eb85"),v=t("714f"),q=t("eebe"),Q=t.n(q),w=Object(c["a"])(s,n,o,!1,null,null,null),_=w.exports;Q()(w,"components",{QScrollArea:u["a"],QList:p["a"],QItem:m["a"],QItemSection:f["a"],QIcon:b["a"],QSeparator:d["a"]}),Q()(w,"directives",{Ripple:v["a"]});var h={components:{mLeft:_},data:function(){return{left:!1}}},g=h,k=t("4d5a"),L=t("e359"),x=t("65c6"),y=t("9c40"),H=t("6ac5"),C=t("cb32"),I=t("9404"),O=t("09e3"),S=Object(c["a"])(g,r,l,!1,null,null,null);a["default"]=S.exports;Q()(S,"components",{QLayout:k["a"],QHeader:L["a"],QToolbar:x["a"],QBtn:y["a"],QToolbarTitle:H["a"],QAvatar:C["a"],QDrawer:I["a"],QPageContainer:O["a"]})}}]);