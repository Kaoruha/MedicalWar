(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"1cd6":function(t,e,n){"use strict";var r=n("b8c3"),o=n.n(r);o.a},"49dc":function(t,e,n){},6606:function(t,e,n){},"72e0":function(t,e,n){"use strict";var r=n("6606"),o=n.n(r);o.a},"89cb":function(t,e,n){"use strict";var r=n("970b"),o=n.n(r),i=n("5bc3"),s=n.n(i),a=n("ed6d"),c=n.n(a),l=n("2d0d"),u=n.n(l),p=n("a417"),d="api/game",_=function(t){c()(n,t);var e=u()(n);function n(){return o()(this,n),e.call(this,d,3e3)}return s()(n,[{key:"Create",value:function(t,e){return this.post("/register",{name:t,description:e})}},{key:"Filter",value:function(t,e){return this.post("/filter",{start_row:0,count:2e3,account_filter:t,sort_by:"id",descending:e})}},{key:"Delete",value:function(t){return this.post("/delete",{uid:t})}},{key:"Submit",value:function(t,e,n,r){return this.post("/submit",{game_id:t,company_id:e,rounds:n,data:r})}},{key:"GetCompanyData",value:function(t,e,n){return this.post("/get_com_data",{game_id:t,company_id:e,rounds:n})}},{key:"GetCompanyInfo",value:function(t,e){return this.post("/get_com_info",{game_id:t,rounds:e})}},{key:"GetGameInfo",value:function(t){return this.post("/get_game_info",{game_id:t})}},{key:"Next",value:function(t,e){return this.post("/next",{game_id:t,data:e})}},{key:"Start",value:function(t){return this.post("/start",{game_id:t})}},{key:"QueryByUUID",value:function(t){return this.post("/query_by_uuid",{uuid:t})}}]),n}(p["a"]);e["a"]=new _},"8a6d":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h4",[t._v("Game Host")]),n("q-card",{staticClass:"my-card"},[n("q-img",{attrs:{src:"https://cdn.quasar.dev/img/parallax2.jpg"}},[n("div",{staticClass:"absolute-bottom"},[n("div",{staticClass:"text-h6"},[t._v(t._s(t.game_name))]),n("div",{staticClass:"text-subtitle2"},[t._v("Current Round ："+t._s(t.rounds))])])]),n("q-card-actions",[n("q-btn",{staticStyle:{width:"120px"},attrs:{flat:"",color:"light-blue",disabled:t.current_round_started},on:{click:t.start_this_round}},[t._v("开始当前回合")]),n("q-btn",{staticStyle:{width:"120px"},attrs:{disabled:!t.is_ok_to_commit(),color:"primary"},on:{click:t.next}},[t._v("提交策略")])],1)],1),n("q-table",{staticClass:"ComInfo",attrs:{title:"Company Info",data:t.data,columns:t.columns,"row-key":"id",pagination:t.pagination,loading:t.loading,filter:t.filter,"binary-state-sort":""},on:{"update:pagination":function(e){t.pagination=e},request:t.onRequest},scopedSlots:t._u([{key:"body",fn:function(e){return[n("q-tr",{attrs:{props:e}},[n("q-td",{key:"name",attrs:{props:e}},[t._v(t._s(e.row.name))]),n("q-td",{key:"capital",attrs:{props:e}},[t._v("\n          "+t._s(e.row.capital)+"\n          "),n("q-popup-edit",{attrs:{title:"调整总资金",buttons:"",persistent:""},model:{value:e.row.description,callback:function(n){t.$set(e.row,"description",n)},expression:"props.row.description"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.capital,callback:function(n){t.$set(e.row,"capital",n)},expression:"props.row.capital"}})],1)],1),n("q-td",{key:"hc_limit",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc_limit)+"\n          "),n("q-popup-edit",{attrs:{title:"调整可分配人数",buttons:"",persistent:""},model:{value:e.row.hc_limit,callback:function(n){t.$set(e.row,"hc_limit",n)},expression:"props.row.hc_limit"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc_limit,callback:function(n){t.$set(e.row,"hc_limit",n)},expression:"props.row.hc_limit"}})],1)],1),n("q-td",{key:"hc_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc_price)+"\n          "),n("q-popup-edit",{attrs:{title:"人力成本",buttons:"",persistent:""},model:{value:e.row.hc_price,callback:function(n){t.$set(e.row,"hc_price",n)},expression:"props.row.hc_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc_price,callback:function(n){t.$set(e.row,"hc_price",n)},expression:"props.row.hc_price"}})],1)],1),n("q-td",{key:"channel_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.channel_price)+"\n          "),n("q-popup-edit",{attrs:{title:"调整渠道牌价格",buttons:"",persistent:""},model:{value:e.row.channel_price,callback:function(n){t.$set(e.row,"channel_price",n)},expression:"props.row.channel_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.channel_price,callback:function(n){t.$set(e.row,"channel_price",n)},expression:"props.row.channel_price"}})],1)],1),n("q-td",{key:"channel",attrs:{props:e}},[t._v("\n          "+t._s(e.row.channel)+"\n          "),n("q-popup-edit",{attrs:{title:"调整渠道牌剩余数量",buttons:"",persistent:""},model:{value:e.row.channel,callback:function(n){t.$set(e.row,"channel",n)},expression:"props.row.channel"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.channel,callback:function(n){t.$set(e.row,"channel",n)},expression:"props.row.channel"}})],1)],1),n("q-td",{key:"permission_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.permission_price)+"\n          "),n("q-popup-edit",{attrs:{title:"调整准入牌价格",buttons:"",persistent:""},model:{value:e.row.permission_price,callback:function(n){t.$set(e.row,"permission_price",n)},expression:"props.row.permission_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.permission_price,callback:function(n){t.$set(e.row,"permission_price",n)},expression:"props.row.permission_price"}})],1)],1),n("q-td",{key:"permission",attrs:{props:e}},[t._v("\n          "+t._s(e.row.permission)+"\n          "),n("q-popup-edit",{attrs:{title:"调整准入牌剩余数量",buttons:"",persistent:""},model:{value:e.row.permission,callback:function(n){t.$set(e.row,"permission",n)},expression:"props.row.permission"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.permission,callback:function(n){t.$set(e.row,"permission",n)},expression:"props.row.permission"}})],1)],1),n("q-td",{key:"info_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.info_price)+"\n          "),n("q-popup-edit",{attrs:{title:"调整信息牌价格",buttons:"",persistent:""},model:{value:e.row.info_price,callback:function(n){t.$set(e.row,"info_price",n)},expression:"props.row.info_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.info_price,callback:function(n){t.$set(e.row,"info_price",n)},expression:"props.row.info_price"}})],1)],1),n("q-td",{key:"info",attrs:{props:e}},[t._v("\n          "+t._s(e.row.info)+"\n          "),n("q-popup-edit",{attrs:{title:"调整信息牌剩余数量",buttons:"",persistent:""},model:{value:e.row.info,callback:function(n){t.$set(e.row,"info",n)},expression:"props.row.info"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.info,callback:function(n){t.$set(e.row,"info",n)},expression:"props.row.info"}})],1)],1),n("q-td",{key:"profit",attrs:{props:e}},[t._v("\n          "+t._s(e.row.profit)+"\n          "),n("q-popup-edit",{attrs:{title:"调整营收",buttons:"",persistent:""},model:{value:e.row.profit,callback:function(n){t.$set(e.row,"profit",n)},expression:"props.row.profit"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.profit,callback:function(n){t.$set(e.row,"profit",n)},expression:"props.row.profit"}})],1)],1)],1)]}}])}),t._l(4,(function(e){return n("q-expansion-item",{key:"md-"+e,attrs:{"expand-separator":"",icon:"perm_identity",label:t.company_name[e-1],caption:t.is_company_checked[e-1].check?"确认":"未确认"}},[n("q-card",[n("q-card-section",[n("div",{staticClass:"row q-col-gutter-md"},[n("div",{staticClass:"col-12"},[n("Strategy",{attrs:{company_id:t.company_ids[e-1],company_name:t.company_name[e-1],url:t.uuid[e-1]},on:{company_check:t.company_check}})],1)])])],1)],1)})),n("div",{staticClass:"com_strategy"}),n("q-dialog",{attrs:{persistent:""},model:{value:t.is_commit_show,callback:function(e){t.is_commit_show=e},expression:"is_commit_show"}},[n("q-card",{staticStyle:{"min-width":"350px"}},[n("q-card-section",[n("div",{staticClass:"text-h6"},[t._v("确认提交")])]),n("q-card-section",{staticClass:"q-pt-none del-dialog"},[n("p",{staticClass:"msg"},[t._v("Do you really want to delete")]),n("p",{staticClass:"name"},[t._v(t._s(this.game_name)+"?")])]),n("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel"}}),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",color:"red",label:"Delete"},on:{click:t.next}})],1)],1)],1)],2)},o=[],i=(n("99af"),n("4de4"),n("4160"),n("caad"),n("fb6a"),n("4e82"),n("a434"),n("b0c0"),n("a9e3"),n("2532"),n("159b"),n("448a")),s=n.n(i),a=n("89cb"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("q-table",{staticClass:"my-sticky-virtscroll-table",attrs:{"virtual-scroll":"","rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48,title:t.company_name,data:t.data,columns:t.columns,"row-key":"id",pagination:t.pagination,loading:t.loading,filter:t.filter,"binary-state-sort":""},on:{"update:pagination":function(e){t.pagination=e},request:t.onRequest},scopedSlots:t._u([{key:"top-right",fn:function(){return[t._v("\n      "+t._s(t.url)+"\n      "),n("q-btn",{staticClass:"btn-add",attrs:{color:"primary",rounded:"",icon:"done",label:t.is_company_checked?"Checked":"Check"},on:{click:t.all_check}})]},proxy:!0},{key:"body",fn:function(e){return[n("q-tr",{attrs:{props:e}},[n("q-td",{key:"name",attrs:{props:e}},[t._v(t._s(e.row.name))]),n("q-td",{key:"operation_count",attrs:{props:e}},[t._v("\n          "+t._s(e.row.operation_count)+"\n          "),n("q-popup-edit",{attrs:{title:"调整年手术台数",buttons:"",persistent:""},model:{value:e.row.description,callback:function(n){t.$set(e.row,"description",n)},expression:"props.row.description"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.operation_count,callback:function(n){t.$set(e.row,"operation_count",n)},expression:"props.row.operation_count"}})],1)],1),n("q-td",{key:"hc_sensitivity",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc_sensitivity)+"\n          "),n("q-popup-edit",{attrs:{title:"调整HC敏感度",buttons:"",persistent:""},model:{value:e.row.hc_sensitivity,callback:function(n){t.$set(e.row,"hc_sensitivity",n)},expression:"props.row.hc_sensitivity"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc_sensitivity,callback:function(n){t.$set(e.row,"hc_sensitivity",n)},expression:"props.row.hc_sensitivity"}})],1)],1),n("q-td",{key:"advertising_sensitivity",attrs:{props:e}},[t._v("\n          "+t._s(e.row.advertising_sensitivity)+"\n          "),n("q-popup-edit",{attrs:{title:"调整推广敏感度",buttons:"",persistent:""},model:{value:e.row.advertising_sensitivity,callback:function(n){t.$set(e.row,"advertising_sensitivity",n)},expression:"props.row.advertising_sensitivity"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.advertising_sensitivity,callback:function(n){t.$set(e.row,"advertising_sensitivity",n)},expression:"props.row.advertising_sensitivity"}})],1)],1),n("q-td",{key:"price_sensitivity",attrs:{props:e}},[t._v("\n          "+t._s(e.row.price_sensitivity)+"\n          "),n("q-popup-edit",{attrs:{title:"调整价格敏感度",buttons:"",persistent:""},model:{value:e.row.price_sensitivity,callback:function(n){t.$set(e.row,"price_sensitivity",n)},expression:"props.row.price_sensitivity"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.price_sensitivity,callback:function(n){t.$set(e.row,"price_sensitivity",n)},expression:"props.row.price_sensitivity"}})],1)],1),n("q-td",{key:"share",attrs:{props:e}},[t._v("\n          "+t._s(e.row.share)+"\n          "),n("q-popup-edit",{attrs:{title:"调整份额",buttons:"",persistent:""},model:{value:e.row.share,callback:function(n){t.$set(e.row,"share",n)},expression:"props.row.share"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.share,callback:function(n){t.$set(e.row,"share",n)},expression:"props.row.share"}})],1)],1),n("q-td",{key:"hc",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc)+"\n          "),n("q-popup-edit",{attrs:{title:"调整当前HC",buttons:"",persistent:""},model:{value:e.row.hc,callback:function(n){t.$set(e.row,"hc",n)},expression:"props.row.hc"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc,callback:function(n){t.$set(e.row,"hc",n)},expression:"props.row.hc"}})],1)],1),n("q-td",{key:"hc_low_limit",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc_low_limit)+"\n          "),n("q-popup-edit",{attrs:{title:"调整HC上限",buttons:"",persistent:""},model:{value:e.row.hc_low_limit,callback:function(n){t.$set(e.row,"hc_low_limit",n)},expression:"props.row.hc_low_limit"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc_low_limit,callback:function(n){t.$set(e.row,"hc_low_limit",n)},expression:"props.row.hc_low_limit"}})],1)],1),n("q-td",{key:"advertising",attrs:{props:e}},[t._v("\n          "+t._s(e.row.advertising)+"\n          "),n("q-popup-edit",{attrs:{title:"调整推广费用",buttons:"",persistent:""},model:{value:e.row.advertising,callback:function(n){t.$set(e.row,"advertising",n)},expression:"props.row.advertising"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.advertising,callback:function(n){t.$set(e.row,"advertising",n)},expression:"props.row.advertising"}})],1)],1),n("q-td",{key:"a_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.a_price)+"\n          "),n("q-popup-edit",{attrs:{title:"产品A价格",buttons:"",persistent:""},model:{value:e.row.a_price,callback:function(n){t.$set(e.row,"a_price",n)},expression:"props.row.a_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.a_price,callback:function(n){t.$set(e.row,"a_price",n)},expression:"props.row.a_price"}})],1)],1),n("q-td",{key:"a_mean",attrs:{props:e}},[t._v("\n          "+t._s(e.row.a_mean)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品A均价",buttons:"",persistent:""},model:{value:e.row.a_mean,callback:function(n){t.$set(e.row,"a_mean",n)},expression:"props.row.a_mean"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.a_mean,callback:function(n){t.$set(e.row,"a_mean",n)},expression:"props.row.a_mean"}})],1)],1),n("q-td",{key:"a_share",attrs:{props:e}},[t._v("\n          "+t._s(e.row.a_share)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品A份额",buttons:"",persistent:""},model:{value:e.row.a_share,callback:function(n){t.$set(e.row,"a_share",n)},expression:"props.row.a_share"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.a_share,callback:function(n){t.$set(e.row,"a_share",n)},expression:"props.row.a_share"}})],1)],1),n("q-td",{key:"b_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.b_price)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品B价格",buttons:"",persistent:""},model:{value:e.row.b_price,callback:function(n){t.$set(e.row,"b_price",n)},expression:"props.row.b_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.b_price,callback:function(n){t.$set(e.row,"b_price",n)},expression:"props.row.b_price"}})],1)],1),n("q-td",{key:"b_mean",attrs:{props:e}},[t._v("\n          "+t._s(e.row.b_mean)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品B均价",buttons:"",persistent:""},model:{value:e.row.b_mean,callback:function(n){t.$set(e.row,"b_mean",n)},expression:"props.row.b_mean"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.b_mean,callback:function(n){t.$set(e.row,"b_mean",n)},expression:"props.row.b_mean"}})],1)],1),n("q-td",{key:"b_share",attrs:{props:e}},[t._v("\n          "+t._s(e.row.b_share)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品B份额",buttons:"",persistent:""},model:{value:e.row.b_share,callback:function(n){t.$set(e.row,"b_share",n)},expression:"props.row.b_share"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.b_share,callback:function(n){t.$set(e.row,"b_share",n)},expression:"props.row.b_share"}})],1)],1),n("q-td",{key:"c_price",attrs:{props:e}},[t._v("\n          "+t._s(e.row.c_price)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品C价格",buttons:"",persistent:""},model:{value:e.row.c_price,callback:function(n){t.$set(e.row,"c_price",n)},expression:"props.row.c_price"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.c_price,callback:function(n){t.$set(e.row,"c_price",n)},expression:"props.row.c_price"}})],1)],1),n("q-td",{key:"c_mean",attrs:{props:e}},[t._v("\n          "+t._s(e.row.c_mean)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品C均价",buttons:"",persistent:""},model:{value:e.row.c_mean,callback:function(n){t.$set(e.row,"c_mean",n)},expression:"props.row.c_mean"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.c_mean,callback:function(n){t.$set(e.row,"c_mean",n)},expression:"props.row.c_mean"}})],1)],1),n("q-td",{key:"c_share",attrs:{props:e}},[t._v("\n          "+t._s(e.row.c_share)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品C份额",buttons:"",persistent:""},model:{value:e.row.c_share,callback:function(n){t.$set(e.row,"c_share",n)},expression:"props.row.c_share"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.c_share,callback:function(n){t.$set(e.row,"c_share",n)},expression:"props.row.c_share"}})],1)],1),n("q-td",{key:"hc_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.hc_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整HC决策",buttons:"",persistent:""},model:{value:e.row.hc_strategy,callback:function(n){t.$set(e.row,"hc_strategy",n)},expression:"props.row.hc_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.hc_strategy,callback:function(n){t.$set(e.row,"hc_strategy",n)},expression:"props.row.hc_strategy"}})],1)],1),n("q-td",{key:"advertising_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.advertising_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整推广决策",buttons:"",persistent:""},model:{value:e.row.advertising_strategy,callback:function(n){t.$set(e.row,"advertising_strategy",n)},expression:"props.row.advertising_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.advertising_strategy,callback:function(n){t.$set(e.row,"advertising_strategy",n)},expression:"props.row.advertising_strategy"}})],1)],1),n("q-td",{key:"a_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.a_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品A价格决策",buttons:"",persistent:""},model:{value:e.row.a_strategy,callback:function(n){t.$set(e.row,"a_strategy",n)},expression:"props.row.a_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.a_strategy,callback:function(n){t.$set(e.row,"a_strategy",n)},expression:"props.row.a_strategy"}})],1)],1),n("q-td",{key:"b_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.b_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品B价格决策",buttons:"",persistent:""},model:{value:e.row.b_strategy,callback:function(n){t.$set(e.row,"b_strategy",n)},expression:"props.row.b_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.b_strategy,callback:function(n){t.$set(e.row,"b_strategy",n)},expression:"props.row.b_strategy"}})],1)],1),n("q-td",{key:"c_strategy",attrs:{props:e}},[t._v("\n          "+t._s(e.row.c_strategy)+"\n          "),n("q-popup-edit",{attrs:{title:"调整产品C价格决策",buttons:"",persistent:""},model:{value:e.row.a_strategy,callback:function(n){t.$set(e.row,"a_strategy",n)},expression:"props.row.a_strategy"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.c_strategy,callback:function(n){t.$set(e.row,"c_strategy",n)},expression:"props.row.c_strategy"}})],1)],1),n("q-td",{key:"channel",attrs:{props:e}},[t._v("\n          "+t._s(e.row.channel)+"\n          "),n("q-popup-edit",{attrs:{title:"调整渠道牌",buttons:"",persistent:""},model:{value:e.row.channel,callback:function(n){t.$set(e.row,"channel",n)},expression:"props.row.channel"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.channel,callback:function(n){t.$set(e.row,"channel",n)},expression:"props.row.channel"}})],1)],1),n("q-td",{key:"permission",attrs:{props:e}},[t._v("\n          "+t._s(e.row.permission)+"\n          "),n("q-popup-edit",{attrs:{title:"调整准入牌",buttons:"",persistent:""},model:{value:e.row.permission,callback:function(n){t.$set(e.row,"permission",n)},expression:"props.row.permission"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.permission,callback:function(n){t.$set(e.row,"permission",n)},expression:"props.row.permission"}})],1)],1),n("q-td",{key:"info",attrs:{props:e}},[t._v("\n          "+t._s(e.row.info)+"\n          "),n("q-popup-edit",{attrs:{title:"调整信息牌",buttons:"",persistent:""},model:{value:e.row.info,callback:function(n){t.$set(e.row,"info",n)},expression:"props.row.info"}},[n("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.info,callback:function(n){t.$set(e.row,"info",n)},expression:"props.row.info"}})],1)],1)],1)]}}])})],1)},l=[],u={name:"host_strategy",props:{url:{type:String,default:"uuid2url"},company_id:{type:String,default:"a"},company_name:{type:String,default:"Company X"}},data:function(){return{game_id:1,rounds:1,is_company_checked:!1,filter:"",loading:!1,pagination:{sortBy:"id",descending:!1,page:1,rowsPerPage:0,rowsNumber:10},columns:[{name:"name",required:!0,label:"医院名称",align:"left",field:function(t){return t.name},style:"width: 10px",headerStyle:"width: 10px",format:function(t){return"".concat(t)},sortable:!0},{name:"operation_count",required:!0,label:"年手术台数",align:"left",field:function(t){return t.account},style:"width:100px",format:function(t){return"".concat(t)},sortable:!1},{name:"hc_sensitivity",required:!1,label:"HC敏感度",align:"left",field:function(t){return t.hc_sensitivity},style:"width:100px",format:function(t){return"".concat(t)},sortable:!1},{name:"advertising_sensitivity",required:!1,label:"推广敏感度",align:"left",field:function(t){return t.advertising_sensitivity},style:"width:100px",format:function(t){return"".concat(t)},sortable:!1},{name:"price_sensitivity",required:!0,label:"价格敏感度",align:"left",field:function(t){return t.price_sensitivity},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"share",required:!0,label:"份额",align:"left",field:function(t){return t.share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"hc",required:!0,label:"当前HC",align:"left",field:function(t){return t.hc},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"hc_low_limit",required:!0,label:"HC下限",align:"left",field:function(t){return t.hc_low_limit},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"advertising",required:!0,label:"推广费用",align:"left",field:function(t){return t.advertising},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"a_price",required:!0,label:"产品A价格",align:"left",field:function(t){return t.a_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"a_mean",required:!0,label:"产品A均价",align:"left",field:function(t){return t.a_mean},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"a_share",required:!0,label:"产品A份额",align:"left",field:function(t){return t.a_share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"b_price",required:!0,label:"产品B价格",align:"left",field:function(t){return t.b_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"b_mean",required:!0,label:"产品B均价",align:"left",field:function(t){return t.b_mean},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"b_share",required:!0,label:"产品B份额",align:"left",field:function(t){return t.b_share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_price",required:!0,label:"产品C价格",align:"left",field:function(t){return t.c_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_mean",required:!0,label:"产品C均价",align:"left",field:function(t){return t.c_mean},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_share",required:!0,label:"产品C份额",align:"left",field:function(t){return t.c_share},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"hc_strategy",required:!0,label:"HC决策",align:"left",field:function(t){return t.hc_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"advertising_strategy",required:!0,label:"推广决策",align:"left",field:function(t){return t.advertising_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"a_strategy",required:!0,label:"产品A价格决策",align:"left",field:function(t){return t.a_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"b_strategy",required:!0,label:"产品B价格决策",align:"left",field:function(t){return t.b_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"c_strategy",required:!0,label:"产品C价格决策",align:"left",field:function(t){return t.c_strategy},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"channel",required:!0,label:"渠道牌",align:"left",field:function(t){return t.channel},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"permission",required:!0,label:"准入牌",align:"left",field:function(t){return t.permission},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"info",required:!0,label:"信息牌",align:"left",field:function(t){return t.info},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0}],data:[],original:[]}},mounted:function(){this.get_current_game(),this.onRequest({pagination:this.pagination,filter:this.filter})},methods:{onRequest:function(t){var e=this,n=t.pagination,r=n.page,o=n.rowsPerPage,i=n.sortBy,a=n.descending,c=t.filter;this.loading=!0,this.get_company_strategy(),setTimeout((function(){var t;e.pagination.rowsNumber=e.getRowsNumberCount(c);var n=0===o?e.pagination.rowsNumber:o,l=(r-1)*o,u=e.fetchFromServer(l,n,c,i,a);(t=e.data).splice.apply(t,[0,e.data.length].concat(s()(u))),e.pagination.page=r,e.pagination.rowsPerPage=o,e.pagination.sortBy=i,e.pagination.descending=a,e.loading=!1}),1500)},fetchFromServer:function(t,e,n,r,o){var i=n?this.original.filter((function(t){return t.account.includes(n)})):this.original.slice();if(r){var s="id"===r?o?function(t,e){return t.name>e.name?-1:t.name<e.name?1:0}:function(t,e){return t.name>e.name?1:t.name<e.name?-1:0}:o?function(t,e){return parseFloat(e[r])-parseFloat(t[r])}:function(t,e){return parseFloat(t[r])-parseFloat(e[r])};i.sort(s)}return i.slice(t,t+e)},getRowsNumberCount:function(t){if(!t)return this.original.length;var e=0;return this.original.forEach((function(n){n.account.includes(t)&&++e})),e},get_current_game:function(){var t=localStorage.getItem("current_game_id");this.game_id=Number(t);var e=localStorage.getItem("current_rounds");this.rounds=Number(e)},get_company_strategy:function(){this.original=[];var t=this;a["a"].GetCompanyData(this.game_id,this.company_id,this.rounds).then((function(e){for(var n=e.data,r=0;r<n.length;r++)t.original.push({name:n[r].name,operation_count:n[r].operation_count,hc_sensitivity:n[r].hc_sensitivity,advertising_sensitivity:n[r].advertising_sensitivity,price_sensitivity:n[r].price_sensitivity,hc:n[r].hc,share:n[r].share,hc_low_limit:n[r].hc_low_limit,advertising:n[r].advertising,a_price:n[r].a_price,a_mean:n[r].a_mean,a_share:n[r].a_share,b_price:n[r].b_price,b_mean:n[r].b_mean,b_share:n[r].b_share,c_price:n[r].c_price,c_mean:n[r].c_mean,c_share:n[r].c_share,hc_strategy:n[r].hc_strategy,advertising_strategy:n[r].advertising_strategy,a_strategy:n[r].a_strategy,b_strategy:n[r].b_strategy,c_strategy:n[r].c_strategy,channel:n[r].channel,permission:n[r].permission,info:n[r].info})}))},all_check:function(){this.is_company_checked=!this.is_company_checked;var t={company_id:this.company_id,is_checked:this.is_company_checked,data:this.data};this.$emit("company_check",t)},enter_game:function(t){alert("进入游戏id:"+t)},commit:function(){alert("提交信息")},end_the_game:function(){alert("做个二次确认")}}},p=u,d=(n("1cd6"),n("72e0"),n("2877")),_=n("eaac"),m=n("9c40"),f=n("bd08"),h=n("db86"),b=n("42a1"),w=n("27f9"),y=n("068f"),g=n("eebe"),v=n.n(g),k=Object(d["a"])(p,c,l,!1,null,"77f3cd02",null),q=k.exports;v()(k,"components",{QTable:_["a"],QBtn:m["a"],QTr:f["a"],QTd:h["a"],QPopupEdit:b["a"],QInput:w["a"],QImg:y["a"]});var x={name:"Game_host",components:{Strategy:q},data:function(){return{host:"http://localhost:8080/#/game_player?uuid=",is_commit_show:!1,current_round_started:!1,game_name:"default",rounds:1,game_id:1,company_ids:["a","b","c","d"],company_name:["Company A","Company B","Company C","Company D"],is_all_com_check:!1,is_company_checked:[{check:!1},{check:!1},{check:!1},{check:!1}],filter:"",loading:!1,pagination:{sortBy:"id",descending:!1,page:1,rowsPerPage:0,rowsNumber:10},columns:[{name:"name",required:!0,label:"公司名称",align:"left",field:function(t){return t.name},style:"width: 10px",headerStyle:"width: 10px",format:function(t){return"".concat(t)},sortable:!0},{name:"capital",required:!0,label:"总资金",align:"left",field:function(t){return t.capital},style:"width:100px",format:function(t){return"".concat(t)},sortable:!1},{name:"hc_limit",required:!1,label:"可分配人数",align:"left",field:function(t){return t.hc_limit},style:"width:100px",format:function(t){return"".concat(t)},sortable:!1},{name:"hc_price",required:!1,label:"人力成本",align:"left",field:function(t){return t.hc_price},style:"width:100px",format:function(t){return"".concat(t)},sortable:!1},{name:"channel_price",required:!0,label:"渠道牌价格",align:"left",field:function(t){return t.channel_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"channel",required:!0,label:"渠道牌剩余数量",align:"left",field:function(t){return t.channel},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"permission_price",required:!0,label:"准入牌价格",align:"left",field:function(t){return t.permission_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"permission",required:!0,label:"准入牌剩余数量",align:"left",field:function(t){return t.permission},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"info_price",required:!0,label:"信息牌价格",align:"left",field:function(t){return t.info_price},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"info",required:!0,label:"信息牌剩余数量",align:"left",field:function(t){return t.info},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0},{name:"profit",required:!0,label:"营收",align:"left",field:function(t){return t.profit},style:"width:200px",format:function(t){return"".concat(t)},sortable:!0}],uuid:[],data:[],data_a:[],data_b:[],data_c:[],data_d:[],original:[]}},mounted:function(){this.get_current_game()},watch:{},methods:{onRequest:function(t){var e=this,n=t.pagination,r=n.page,o=n.rowsPerPage,i=n.sortBy,a=n.descending,c=t.filter;this.loading=!0,this.get_company_info(),setTimeout((function(){var t;e.pagination.rowsNumber=e.getRowsNumberCount(c);var n=0===o?e.pagination.rowsNumber:o,l=(r-1)*o,u=e.fetchFromServer(l,n,c,i,a);(t=e.data).splice.apply(t,[0,e.data.length].concat(s()(u))),e.pagination.page=r,e.pagination.rowsPerPage=o,e.pagination.sortBy=i,e.pagination.descending=a,e.loading=!1}),1500)},fetchFromServer:function(t,e,n,r,o){var i=n?this.original.filter((function(t){return t.account.includes(n)})):this.original.slice();if(r){var s="id"===r?o?function(t,e){return t.name>e.name?-1:t.name<e.name?1:0}:function(t,e){return t.name>e.name?1:t.name<e.name?-1:0}:o?function(t,e){return parseFloat(e[r])-parseFloat(t[r])}:function(t,e){return parseFloat(t[r])-parseFloat(e[r])};i.sort(s)}return i.slice(t,t+e)},getRowsNumberCount:function(t){if(!t)return this.original.length;var e=0;return this.original.forEach((function(n){n.account.includes(t)&&++e})),e},get_company_info:function(){this.original=[];var t=this;a["a"].GetCompanyInfo(this.game_id,this.rounds).then((function(e){for(var n=e.data,r=0;r<n.length;r++)t.original.push({name:n[r].name,capital:n[r].capital,hc_limit:n[r].hc_limit,hc_price:n[r].hc_price,channel_price:n[r].channel_price,channel:n[r].channel,permission_price:n[r].permission_price,permission:n[r].permission,info_price:n[r].info_price,info:n[r].info,profit:n[r].profit})}))},get_current_game:function(){var t=this,e=this,n=localStorage.getItem("current_game_id");this.game_id=Number(n),a["a"].GetGameInfo(this.game_id).then((function(n){var r=n.data;e.rounds=r["rounds"],t.$store.commit("current_game/updateCurrentRounds",r.rounds),e.uuid.push(e.host+r.a_uuid),e.uuid.push(e.host+r.b_uuid),e.uuid.push(e.host+r.c_uuid),e.uuid.push(e.host+r.d_uuid),e.game_name=r["name"],t.onRequest({pagination:t.pagination,filter:t.filter})}))},next:function(){var t=this,e=[this.data,this.data_a,this.data_b,this.data_c,this.data_d];a["a"].Next(this.game_id,e).then((function(e){t.reset(),t.get_current_game()}))},reset:function(){var t=this;this.current_round_started=!1,this.is_all_com_check=!1;for(var e=0;e<this.is_company_checked.length;e++)t.is_company_checked[e].check=!1},start_this_round:function(){this.current_round_started=!0,alert(this.game_id),alert("做个二次确认"),a["a"].Start(this.game_id)},company_check:function(t){var e=t.company_id,n=t.is_checked,r=t.data,o=0;switch(e){case"a":o=0,this.data_a=r;break;case"b":o=1,this.data_b=r;break;case"c":o=2,this.data_c=r;break;case"d":o=3,this.data_d=r;break;default:break}this.is_company_checked[o].check=n,this.is_all_check()},is_ok_to_commit:function(){return!(!this.is_all_com_check||!this.current_round_started)},is_all_check:function(){for(var t=this,e=1,n=0;n<this.is_company_checked.length;n++)e*=t.is_company_checked[n].check;t.is_all_com_check=1==e}}},$=x,C=(n("f7c2"),n("f09f")),U=n("4b7e"),S=n("0016"),Q=n("3b73"),B=n("a370"),I=n("24e8"),N=n("7f67"),P=Object(d["a"])($,r,o,!1,null,"5de84aa7",null);e["default"]=P.exports;v()(P,"components",{QCard:C["a"],QImg:y["a"],QCardActions:U["a"],QBtn:m["a"],QTable:_["a"],QInput:w["a"],QIcon:S["a"],QTr:f["a"],QTd:h["a"],QPopupEdit:b["a"],QExpansionItem:Q["a"],QCardSection:B["a"],QDialog:I["a"]}),v()(P,"directives",{ClosePopup:N["a"]})},a417:function(t,e,n){"use strict";n("d3b7"),n("e6cf");var r=n("970b"),o=n.n(r),i=n("5bc3"),s=n.n(i),a=n("bc3a"),c=n.n(a),l=n("a18c"),u=function(){function t(e,n){o()(this,t),this.url=e,this.timeout=n,this.instance=c.a.create({baseURL:this.url,timeout:this.timeout,headers:{"Content-Type":"application/json;charset=UTF-8",Authorization:localStorage.getItem("Authorization")}}),this.instance.interceptors.request.use((function(t){return t.headers.Authorization=localStorage.getItem("Authorization"),t}),(function(t){return Promise.reject(t)})),this.instance.interceptors.response.use((function(t){switch(t.data.code){case 200:console.log("信息获取成功");break;case 403:console.log("权限不足,权限不足"),l["a"].push("/login");break;case 600:console.log("表单信息错误");break;case 601:console.log("用户名重复");break;case 602:console.log("登录失败");break}return t.data}),(function(t){return Promise.reject(t)}))}return s()(t,[{key:"get",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance.get(t,e)}},{key:"post",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.instance.post(t,e,n)}},{key:"upload",value:function(t,e){return this.instance.post(t,e,{headers:{"Content-Type":"multipart/form-data"}})}},{key:"put",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.instance.put(t,e,n)}},{key:"delete",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance.delete(t,e)}}]),t}();e["a"]=u},b8c3:function(t,e,n){},f7c2:function(t,e,n){"use strict";var r=n("49dc"),o=n.n(r);o.a}}]);