(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"0a2a":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h4",[t._v("Game Manager")]),n("q-card",{staticClass:"my-card"},[n("q-img",{attrs:{src:"https://cdn.quasar.dev/img/parallax2.jpg"}},[n("div",{staticClass:"absolute-bottom"},[n("div",{staticClass:"text-h6"},[t._v(t._s(t.company_name))]),n("div",{staticClass:"text-subtitle2"},[t._v("Current Round ："+t._s(t.round))])])]),n("q-card-actions")],1),n("q-table",{attrs:{title:"Works List",data:t.data,columns:t.columns,"row-key":"id",pagination:t.pagination,loading:t.loading,filter:t.filter,"binary-state-sort":""},on:{"update:pagination":function(e){t.pagination=e},request:t.onRequest},scopedSlots:t._u([{key:"top-right",fn:function(){return[n("q-btn",{staticClass:"btn-add",attrs:{color:"primary",rounded:"",icon:"skip_next",label:"Next Round"},on:{click:function(e){t.is_submit_show=!0}}})]},proxy:!0},{key:"body",fn:function(e){return[n("q-tr",{attrs:{props:e}},[n("q-td",{key:"name",attrs:{props:e}},[t._v(t._s(e.row.name))]),n("q-td",{key:"operation_count",attrs:{props:e}},[t._v(t._s(e.row.operation_count))]),n("q-td",{key:"share",attrs:{props:e}},[t._v(t._s(e.row.share))]),n("q-td",{key:"hc",attrs:{props:e}},[t._v(t._s(e.row.hc))]),n("q-td",{key:"advertising",attrs:{props:e}},[t._v(t._s(e.row.advertising))]),n("q-td",{key:"a_price",attrs:{props:e}},[t._v(t._s(e.row.a_price))]),n("q-td",{key:"a_share",attrs:{props:e}},[t._v(t._s(e.row.a_share))]),n("q-td",{key:"b_price",attrs:{props:e}},[t._v(t._s(e.row.b_price))]),n("q-td",{key:"b_share",attrs:{props:e}},[t._v(t._s(e.row.b_share))]),n("q-td",{key:"c_price",attrs:{props:e}},[t._v(t._s(e.row.c_price))]),n("q-td",{key:"c_share",attrs:{props:e}},[t._v(t._s(e.row.c_share))]),n("q-td",{key:"hc",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc)+"\n          "),n("q-popup-edit",{attrs:{title:"Update HC",buttons:"",persistent:""},model:{value:e.row.hc,callback:function(n){t.$set(e.row,"hc",n)},expression:"props.row.hc"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc,callback:function(n){t.$set(e.row,"hc",n)},expression:"props.row.hc"}})],1)],1),n("q-td",{key:"advertising",attrs:{props:e}},[t._v("\n          "+t._s(e.row.advertising)+"\n          "),n("q-popup-edit",{attrs:{title:"Update Advertising",buttons:"",persistent:""},model:{value:e.row.advertising,callback:function(n){t.$set(e.row,"advertising",n)},expression:"props.row.advertising"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.advertising,callback:function(n){t.$set(e.row,"advertising",n)},expression:"props.row.advertising"}})],1)],1),n("q-td",{key:"a_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.a_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品A价格决策",buttons:"",persistent:""},model:{value:e.row.a_strategy,callback:function(n){t.$set(e.row,"a_strategy",n)},expression:"props.row.a_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.a_strategy,callback:function(n){t.$set(e.row,"a_strategy",n)},expression:"props.row.a_strategy"}})],1)],1),n("q-td",{key:"b_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.b_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品B价格决策",buttons:"",persistent:""},model:{value:e.row.b_strategy,callback:function(n){t.$set(e.row,"b_strategy",n)},expression:"props.row.b_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.product_b,callback:function(n){t.$set(e.row,"product_b",n)},expression:"props.row.product_b"}})],1)],1),n("q-td",{key:"c_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.c_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品C价格决策",buttons:"",persistent:""},model:{value:e.row.c_strategy,callback:function(n){t.$set(e.row,"c_strategy",n)},expression:"props.row.c_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.product_c,callback:function(n){t.$set(e.row,"product_c",n)},expression:"props.row.product_c"}})],1)],1),n("q-td",{key:"channel",attrs:{props:e}},[t._v("\n          "+t._s(e.row.channel)+"\n          "),n("q-popup-edit",{attrs:{title:"调整渠道牌",buttons:"",persistent:""},model:{value:e.row.channel,callback:function(n){t.$set(e.row,"channel",n)},expression:"props.row.channel"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.channel,callback:function(n){t.$set(e.row,"channel",n)},expression:"props.row.channel"}})],1)],1),n("q-td",{key:"permission",attrs:{props:e}},[t._v("\n          "+t._s(e.row.permission)+"\n          "),n("q-popup-edit",{attrs:{title:"调整准入牌",buttons:"",persistent:""},model:{value:e.row.permission,callback:function(n){t.$set(e.row,"permission",n)},expression:"props.row.permission"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.permission,callback:function(n){t.$set(e.row,"permission",n)},expression:"props.row.permission"}})],1)],1),n("q-td",{key:"info",attrs:{props:e}},[t._v("\n          "+t._s(e.row.info)+"\n          "),n("q-popup-edit",{attrs:{title:"调整信息牌",buttons:"",persistent:""},model:{value:e.row.info,callback:function(n){t.$set(e.row,"info",n)},expression:"props.row.info"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.info,callback:function(n){t.$set(e.row,"info",n)},expression:"props.row.info"}})],1)],1)],1)]}}])}),n("q-dialog",{attrs:{persistent:""},model:{value:t.is_submit_show,callback:function(e){t.is_submit_show=e},expression:"is_submit_show"}},[n("q-card",{staticStyle:{"min-width":"350px"}},[n("q-card-section",[n("div",{staticClass:"text-h6"},[t._v("Delete User")])]),n("q-card-section",{staticClass:"q-pt-none del-dialog"},[n("p",{staticClass:"msg"},[t._v("Do you really want to delete")]),n("p",{staticClass:"name"},[t._v(t._s(t.ready_to_submit.name)+"?")])]),n("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel"}}),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",color:"red",label:"Submit"},on:{click:function(e){return t.submit(t.ready_to_submit.id)}}})],1)],1)],1)],1)},r=[],o=(n("a4d3"),n("e01a"),n("99af"),n("4de4"),n("4160"),n("caad"),n("fb6a"),n("4e82"),n("a434"),n("b0c0"),n("2532"),n("159b"),n("448a")),i=n.n(o),s=n("aa4b"),c=n("89cb"),u={name:"Game_player",data:function(){return{capital:0,man:0,man_cost:1e3,channel_count:10,channel_price:1100,permission_count:11,permission_price:1010,info_count:12,info_price:1001,is_submit_show:!1,ready_to_submit:{id:0,name:"god"},game_id:0,company_id:0,company_name:"公司1",round:0,filter:"",loading:!1,pagination:{sortBy:"id",descending:!1,page:1,rowsPerPage:0,rowsNumber:10},columns:[{name:"name",required:!0,label:"医院名称",align:"left",field:function(t){return t.name},style:"width: 10px",headerStyle:"width: 10px",format:function(t){return"".concat(t)},sortable:!0},{name:"operation_count",required:!0,label:"年手术台数",align:"left",field:function(t){return t.operation_count},style:"width:200px",format:function(t){return"".concat(t)},sortable:!1},{name:"share",required:!0,label:"份额",align:"left",field:function(t){return t.share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!1},{name:"hc",required:!0,label:"当前HC",align:"left",field:function(t){return t.hc},style:"width:200px",format:function(t){return"".concat(t)},sortable:!1},{name:"advertising",required:!0,label:"推广费用",align:"left",field:function(t){return t.advertising},style:"width:200px",format:function(t){return"".concat(t)},sortable:!1},{name:"a_price",required:!1,label:"产品A价格",align:"left",field:function(t){return t.a_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!1},{name:"a_share",required:!1,label:"产品A份额",align:"left",field:function(t){return t.a_share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!1},{name:"b_price",required:!0,label:"产品B价格",align:"left",field:function(t){return t.b_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"b_share",required:!0,label:"产品B份额",align:"left",field:function(t){return t.b_share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_price",required:!0,label:"产品C价格",align:"left",field:function(t){return t.c_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_share",required:!0,label:"产品C份额",align:"left",field:function(t){return t.c_share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"hc_strategy",required:!0,label:"HC决策",align:"left",field:function(t){return t.hc_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"advertising_strategy",required:!0,label:"推广决策",align:"left",field:function(t){return t.advertising_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"a_strategy",required:!0,label:"产品A价格决策",align:"left",field:function(t){return t.a_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"b_strategy",required:!0,label:"产品B价格决策",align:"left",field:function(t){return t.b_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_strategy",required:!0,label:"产品C价格决策",align:"left",field:function(t){return t.c_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"channel",required:!0,label:"渠道牌",align:"left",field:function(t){return t.channel},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"permission",required:!0,label:"准入牌",align:"left",field:function(t){return t.permission},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"info",required:!0,label:"信息牌",align:"left",field:function(t){return t.info},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0}],data:[{id:0,name:"默认医院",hc:0,advertising:1e3,product_a:1100,product_b:2e3,product_c:1300,channel:1,permission:2,info:3},{id:0,name:"默认医院",hc:0,advertising:1e3,product_a:1100,product_b:2e3,product_c:1300,channel:1,permission:2,info:3},{id:0,name:"默认医院",hc:0,advertising:1e3,product_a:1100,product_b:2e3,product_c:1300,channel:1,permission:2,info:3},{id:0,name:"默认医院",hc:0,advertising:1e3,product_a:1100,product_b:2e3,product_c:1300,channel:1,permission:2,info:3}],original:[]}},mounted:function(){this.onRequest({pagination:this.pagination,filter:this.filter})},methods:{onRequest:function(t){var e=this,n=t.pagination,a=n.page,r=n.rowsPerPage,o=n.sortBy,s=n.descending,c=t.filter;this.loading=!0,this.get_hospital(c,s),setTimeout((function(){var t;e.pagination.rowsNumber=e.getRowsNumberCount(c);var n=0===r?e.pagination.rowsNumber:r,u=(a-1)*r,l=e.fetchFromServer(u,n,c,o,s);(t=e.data).splice.apply(t,[0,e.data.length].concat(i()(l))),e.pagination.page=a,e.pagination.rowsPerPage=r,e.pagination.sortBy=o,e.pagination.descending=s,e.loading=!1}),1500)},fetchFromServer:function(t,e,n,a,r){var o=n?this.original.filter((function(t){return t.account.includes(n)})):this.original.slice();if(a){var i="id"===a?r?function(t,e){return t.name>e.name?-1:t.name<e.name?1:0}:function(t,e){return t.name>e.name?1:t.name<e.name?-1:0}:r?function(t,e){return parseFloat(e[a])-parseFloat(t[a])}:function(t,e){return parseFloat(t[a])-parseFloat(e[a])};o.sort(i)}return o.slice(t,t+e)},getRowsNumberCount:function(t){if(!t)return this.original.length;var e=0;return this.original.forEach((function(n){n.account.includes(t)&&++e})),e},get_hospital:function(t,e){this.original=[];var n=this;s["a"].Filter(t,e).then((function(t){var e=t.data;console.log(e);for(var a=0;a<e.length;a++)n.original.push({name:e[a].name,id:e[a].id,type:e[a].type,scale:e[a].scale,hc:0,share:0,advertising:0,product_a:0,product_b:0,product_c:0,channel:0,permission:0,info:0})}))},clear_add_dialog:function(){this.account="",this.password=""},creat_game:function(){var t=this;c["a"].Create(this.name,this.description).then((function(e){switch(e.code){default:break;case 200:t.onRequest({pagination:t.pagination,filter:t.filter});break;case 600:break;case 601:break}})),this.clear_add_dialog()},show_delete_dialog:function(t,e){this.is_delete_show=!0,this.ready_to_delete.id=t,this.ready_to_delete.name=e},delete_game:function(t){var e=this;c["a"].Delete(t).then((function(t){switch(t.code){default:break;case 200:e.onRequest({pagination:e.pagination,filter:e.filter});break}}))},enter_game:function(t){alert("进入游戏id:"+t)},submit:function(){for(var t=this,e=[1],n=0;n<this.data.length;n++)e.push({id:t.data[n].id,hc:t.data[n].hc,advertising:t.data[n].advertising,product_a:t.data[n].product_a,product_b:t.data[n].product_b,product_c:t.data[n].product_c,channel:t.data[n].channel,permission:t.data[n].permission,info:t.data[n].info});c["a"].Submit(t.game_id,t.company_id,e).then((function(t){switch(t.code){default:break;case 200:alert("提交成功");break}}))}}},l=u,p=(n("d530"),n("2877")),d=n("f09f"),f=n("068f"),_=n("4b7e"),h=n("9c40"),m=n("eaac"),b=n("27f9"),g=n("0016"),y=n("bd08"),v=n("db86"),w=n("42a1"),q=n("24e8"),k=n("a370"),x=n("7f67"),C=n("eebe"),$=n.n(C),U=Object(p["a"])(l,a,r,!1,null,"540be04c",null);e["default"]=U.exports;$()(U,"components",{QCard:d["a"],QImg:f["a"],QCardActions:_["a"],QBtn:h["a"],QTable:m["a"],QInput:b["a"],QIcon:g["a"],QTr:y["a"],QTd:v["a"],QPopupEdit:w["a"],QDialog:q["a"],QCardSection:k["a"]}),$()(U,"directives",{ClosePopup:x["a"]})},"89cb":function(t,e,n){"use strict";var a=n("970b"),r=n.n(a),o=n("5bc3"),i=n.n(o),s=n("ed6d"),c=n.n(s),u=n("2d0d"),l=n.n(u),p=n("a417"),d="local_api/game",f=function(t){c()(n,t);var e=l()(n);function n(){return r()(this,n),e.call(this,d,3e3)}return i()(n,[{key:"Create",value:function(t,e){return this.post("/register",{name:t,description:e})}},{key:"Filter",value:function(t,e){return this.post("/filter",{start_row:0,count:2e3,account_filter:t,sort_by:"id",descending:e})}},{key:"Delete",value:function(t){return this.post("/delete",{uid:t})}},{key:"Submit",value:function(t,e,n,a){return this.post("/submit",{game_id:t,company_id:e,rounds:n,data:a})}},{key:"GetCompanyData",value:function(t,e,n){return this.post("/get_com_data",{game_id:t,company_id:e,rounds:n})}},{key:"GetCompanyInfo",value:function(t,e){return this.post("/get_com_info",{game_id:t,rounds:e})}},{key:"GetGameInfo",value:function(t){return this.post("/get_game_info",{game_id:t})}},{key:"Next",value:function(t,e){return this.post("/next",{game_id:t,data:e})}},{key:"Start",value:function(t){return this.post("/start",{game_id:t})}}]),n}(p["a"]);e["a"]=new f},a417:function(t,e,n){"use strict";n("d3b7"),n("e6cf");var a=n("970b"),r=n.n(a),o=n("5bc3"),i=n.n(o),s=n("bc3a"),c=n.n(s),u=n("a18c"),l=function(){function t(e,n){r()(this,t),this.url=e,this.timeout=n,this.instance=c.a.create({baseURL:this.url,timeout:this.timeout,headers:{"Content-Type":"application/json;charset=UTF-8",Authorization:localStorage.getItem("Authorization")}}),this.instance.interceptors.request.use((function(t){return t.headers.Authorization=localStorage.getItem("Authorization"),t}),(function(t){return Promise.reject(t)})),this.instance.interceptors.response.use((function(t){switch(t.data.code){case 200:console.log("信息获取成功");break;case 403:console.log("权限不足,权限不足"),u["a"].push("/login");break;case 600:console.log("表单信息错误");break;case 601:console.log("用户名重复");break;case 602:console.log("登录失败");break}return t.data}),(function(t){return Promise.reject(t)}))}return i()(t,[{key:"get",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance.get(t,e)}},{key:"post",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.instance.post(t,e,n)}},{key:"upload",value:function(t,e){return this.instance.post(t,e,{headers:{"Content-Type":"multipart/form-data"}})}},{key:"put",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.instance.put(t,e,n)}},{key:"delete",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance.delete(t,e)}}]),t}();e["a"]=l},aa4b:function(t,e,n){"use strict";var a=n("970b"),r=n.n(a),o=n("5bc3"),i=n.n(o),s=n("ed6d"),c=n.n(s),u=n("2d0d"),l=n.n(u),p=n("a417"),d="local_api/hospital",f=function(t){c()(n,t);var e=l()(n);function n(){return r()(this,n),e.call(this,d,3e3)}return i()(n,[{key:"Create",value:function(t,e,n,a){return this.post("/register",{name:t,description:e,scale:n,type_:a})}},{key:"Filter",value:function(t,e){return this.post("/filter",{start_row:0,count:2e3,account_filter:t,sort_by:"id",descending:e})}},{key:"Delete",value:function(t){return this.post("/delete",{uid:t})}}]),n}(p["a"]);e["a"]=new f},cfdf:function(t,e,n){},d530:function(t,e,n){"use strict";var a=n("cfdf"),r=n.n(a);r.a}}]);