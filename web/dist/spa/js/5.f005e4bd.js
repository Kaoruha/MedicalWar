(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"0f5e":function(e,t,n){},"2d81":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h4",[e._v("WarGame Manager")]),n("q-table",{attrs:{title:"WarGame List",data:e.data,columns:e.columns,"row-key":"id",pagination:e.pagination,loading:e.loading,filter:e.filter,"binary-state-sort":""},on:{"update:pagination":function(t){e.pagination=t},request:e.onRequest},scopedSlots:e._u([{key:"top-right",fn:function(){return[n("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),n("q-btn",{staticClass:"btn-add",attrs:{color:"primary",rounded:"",icon:"add",label:"Add Game"},on:{click:function(t){e.is_add_show=!0}}})]},proxy:!0},{key:"body",fn:function(t){return[n("q-tr",{attrs:{props:t}},[n("q-td",{key:"uid",attrs:{props:t}},[e._v(e._s(t.row.uid))]),n("q-td",{key:"name",attrs:{props:t}},[e._v(e._s(t.row.name))]),n("q-td",{key:"description",attrs:{props:t}},[e._v("\n          "+e._s(t.row.description)+"\n          "),n("q-popup-edit",{attrs:{title:"Update Description",buttons:"",persistent:""},model:{value:t.row.description,callback:function(n){e.$set(t.row,"description",n)},expression:"props.row.description"}},[n("q-input",{attrs:{type:"input",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:t.row.description,callback:function(n){e.$set(t.row,"description",n)},expression:"props.row.description"}})],1)],1),n("q-td",{key:"round",attrs:{props:t}},[e._v(e._s(t.row.round))]),n("q-td",{key:"recent",attrs:{props:t}},[e._v(e._s(t.row.recent))]),n("q-td",{key:"operation",attrs:{props:t}},[n("q-btn",{attrs:{flat:"","text-color":"primay",label:"ENTER"},on:{click:function(n){return e.enter_game(t.row.uid)}}}),n("q-btn",{attrs:{flat:"",color:"white","text-color":"red",label:"Delete"},on:{click:function(n){return e.show_delete_dialog(t.row.uid,t.row.name)}}})],1)],1)]}}])}),n("q-dialog",{attrs:{persistent:""},model:{value:e.is_add_show,callback:function(t){e.is_add_show=t},expression:"is_add_show"}},[n("q-card",{staticStyle:{"min-width":"350px"}},[n("q-card-section",[n("div",{staticClass:"text-h6"},[e._v("Create Game")])]),n("q-card-section",{staticClass:"q-pt-none"},[n("q-input",{attrs:{dense:"",autofocus:"",placeholder:"Name at least 4 letters."},on:{keyup:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.prompt=!1}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),n("q-card-section",{staticClass:"q-pt-none"},[n("q-input",{attrs:{dense:"",placeholder:"Description"},on:{keyup:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.prompt=!1}},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1),n("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel"}}),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Add"},on:{click:e.creat_game}})],1)],1)],1),n("q-dialog",{attrs:{persistent:""},model:{value:e.is_delete_show,callback:function(t){e.is_delete_show=t},expression:"is_delete_show"}},[n("q-card",{staticStyle:{"min-width":"350px"}},[n("q-card-section",[n("div",{staticClass:"text-h6"},[e._v("Delete User")])]),n("q-card-section",{staticClass:"q-pt-none del-dialog"},[n("p",{staticClass:"msg"},[e._v("Do you really want to delete")]),n("p",{staticClass:"name"},[e._v(e._s(e.ready_to_delete.name)+"?")])]),n("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel"}}),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",color:"red",label:"Delete"},on:{click:function(t){return e.delete_game(e.ready_to_delete.uid)}}})],1)],1)],1)],1)},i=[],r=(n("a4d3"),n("e01a"),n("99af"),n("4de4"),n("4160"),n("caad"),n("fb6a"),n("4e82"),n("a434"),n("b0c0"),n("2532"),n("159b"),n("448a")),o=n.n(r),s=n("89cb"),c={name:"Game",data:function(){return{is_add_show:!1,is_delete_show:!1,ready_to_delete:{uid:0,name:"god"},name:"",description:"",filter:"",loading:!1,pagination:{sortBy:"uid",descending:!0,page:1,rowsPerPage:25,rowsNumber:25},columns:[{name:"uid",required:!0,label:"ID",align:"left",field:function(e){return e.uid},style:"width: 10px",headerStyle:"width: 10px",format:function(e){return"".concat(e)},sortable:!0},{name:"name",required:!0,label:"Name",align:"left",field:function(e){return e.name},style:"width:200px",format:function(e){return"".concat(e)},sortable:!0},{name:"description",required:!1,label:"Description",align:"left",field:function(e){return e.description},style:"width:200px",format:function(e){return"".concat(e)},sortable:!1},{name:"round",required:!1,label:"Round",align:"left",field:function(e){return e.description},style:"width:200px",format:function(e){return"".concat(e)},sortable:!0},{name:"recent",required:!0,label:"Recent",align:"left",field:function(e){return e.recent},style:"width:200px",format:function(e){return"".concat(e)},sortable:!0},{name:"operation",required:!1,label:"Operation",align:"right",style:"width:200px"}],data:[],original:[]}},mounted:function(){this.onRequest({pagination:this.pagination,filter:this.filter})},methods:{onRequest:function(e){var t=this,n=e.pagination,a=n.page,i=n.rowsPerPage,r=n.sortBy,s=n.descending,c=e.filter;this.loading=!0,this.get_game(c,s),setTimeout((function(){var e;t.pagination.rowsNumber=t.getRowsNumberCount(c);var n=0===i?t.pagination.rowsNumber:i,u=(a-1)*i,l=t.fetchFromServer(u,n,c,r,s);(e=t.data).splice.apply(e,[0,t.data.length].concat(o()(l))),t.pagination.page=a,t.pagination.rowsPerPage=i,t.pagination.sortBy=r,t.pagination.descending=s,t.loading=!1}),1500)},fetchFromServer:function(e,t,n,a,i){var r=n?this.original.filter((function(e){return e.name.includes(n)})):this.original.slice();if(a){var o="uid"===a?i?function(e,t){return e.uid>t.uid?-1:e.uid<t.uid?1:0}:function(e,t){return e.uid>t.uid?1:e.uid<t.uid?-1:0}:i?function(e,t){return parseFloat(t[a])-parseFloat(e[a])}:function(e,t){return parseFloat(e[a])-parseFloat(t[a])};r.sort(o)}return r.slice(e,e+t)},getRowsNumberCount:function(e){if(!e)return this.original.length;var t=0;return this.original.forEach((function(n){n.name.includes(e)&&++t})),t},get_game:function(e,t){this.original=[];var n=this;s["a"].Filter(e,t).then((function(e){for(var t=e.data,a=0;a<t.length;a++)n.original.push({name:t[a].name,uid:t[a].id,description:t[a].description,round:t[a].rounds,recent:t[a].update})}))},clear_add_dialog:function(){this.name="",this.description=""},creat_game:function(){var e=this;s["a"].Create(this.name,this.description).then((function(t){switch(t.code){default:break;case 200:e.onRequest({pagination:e.pagination,filter:e.filter}),e.name="",e.description="";break;case 600:break;case 601:break}})),this.clear_add_dialog()},show_delete_dialog:function(e,t){this.is_delete_show=!0,this.ready_to_delete.uid=e,this.ready_to_delete.name=t},delete_game:function(e){var t=this;s["a"].Delete(e).then((function(e){switch(e.code){default:break;case 200:t.onRequest({pagination:t.pagination,filter:t.filter});break}}))},enter_game:function(e){this.$store.commit("current_game/updateCurrentGameID",e),this.$router.push("game_host")}}},u=c,l=(n("7ffb"),n("2877")),d=n("eaac"),p=n("27f9"),f=n("0016"),m=n("9c40"),h=n("bd08"),g=n("db86"),_=n("42a1"),b=n("24e8"),y=n("f09f"),v=n("a370"),w=n("4b7e"),k=n("7f67"),q=n("eebe"),x=n.n(q),C=Object(l["a"])(u,a,i,!1,null,"92911f88",null);t["default"]=C.exports;x()(C,"components",{QTable:d["a"],QInput:p["a"],QIcon:f["a"],QBtn:m["a"],QTr:h["a"],QTd:g["a"],QPopupEdit:_["a"],QDialog:b["a"],QCard:y["a"],QCardSection:v["a"],QCardActions:w["a"]}),x()(C,"directives",{ClosePopup:k["a"]})},"7ffb":function(e,t,n){"use strict";var a=n("0f5e"),i=n.n(a);i.a},"89cb":function(e,t,n){"use strict";var a=n("970b"),i=n.n(a),r=n("5bc3"),o=n.n(r),s=n("ed6d"),c=n.n(s),u=n("2d0d"),l=n.n(u),d=n("a417"),p="api/game",f=function(e){c()(n,e);var t=l()(n);function n(){return i()(this,n),t.call(this,p,3e3)}return o()(n,[{key:"Create",value:function(e,t){return this.post("/register",{name:e,description:t})}},{key:"Filter",value:function(e,t){return this.post("/filter",{start_row:0,count:2e3,account_filter:e,sort_by:"id",descending:t})}},{key:"Delete",value:function(e){return this.post("/delete",{uid:e})}},{key:"Submit",value:function(e,t,n,a){return this.post("/submit",{game_id:e,company_id:t,rounds:n,data:a})}},{key:"GetCompanyData",value:function(e,t,n){return this.post("/get_com_data",{game_id:e,company_id:t,rounds:n})}},{key:"GetCompanyInfo",value:function(e,t){return this.post("/get_com_info",{game_id:e,rounds:t})}},{key:"GetGameInfo",value:function(e){return this.post("/get_game_info",{game_id:e})}},{key:"Next",value:function(e,t){return this.post("/next",{game_id:e,data:t})}},{key:"Start",value:function(e,t){return this.post("/start",{game_id:e,data:t})}},{key:"QueryByUUID",value:function(e){return this.post("/query_by_uuid",{uuid:e})}}]),n}(d["a"]);t["a"]=new f},a417:function(e,t,n){"use strict";n("d3b7"),n("e6cf");var a=n("970b"),i=n.n(a),r=n("5bc3"),o=n.n(r),s=n("bc3a"),c=n.n(s),u=(n("a18c"),n("2a19")),l=function(){function e(t,n){i()(this,e),this.url=t,this.timeout=n,this.instance=c.a.create({baseURL:this.url,timeout:this.timeout,headers:{"Content-Type":"application/json;charset=UTF-8",Authorization:localStorage.getItem("Authorization")}}),this.instance.interceptors.request.use((function(e){return e.headers.Authorization=localStorage.getItem("Authorization"),e}),(function(e){return Promise.reject(e)})),this.instance.interceptors.response.use((function(e){switch(e.data.code){case 200:console.log("尝试获取信息");break;case 403:console.log(e.data),window.router.push("/login"),u["a"].create({message:"权限不足，请登录后尝试",type:"negative",textColor:"white",position:"top"});break;case 600:u["a"].create({message:"表单信息错误",type:"negative",textColor:"white",position:"top"});break;case 601:u["a"].create({message:"用户名重复",type:"negative",textColor:"white",position:"top"});break;case 602:u["a"].create({message:"登录失败",type:"negative",textColor:"white",position:"top"});break}return e.data}),(function(e){return Promise.reject(e)}))}return o()(e,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance.get(e,t)}},{key:"post",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.instance.post(e,t,n)}},{key:"upload",value:function(e,t){return this.instance.post(e,t,{headers:{"Content-Type":"multipart/form-data"}})}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.instance.put(e,t,n)}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance.delete(e,t)}}]),e}();t["a"]=l}}]);