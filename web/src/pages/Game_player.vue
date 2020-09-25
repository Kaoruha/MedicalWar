<template>
  <div class="container">
    <h4>{{ game_name }}</h4>
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">{{ company_name }}</div>
          <div class="text-subtitle2">Current Round ：{{ rounds }}</div>
        </div>
      </q-img>
      <div class="row">
        <div class="col">剩余资金：{{ this.capital }}</div>
        <div class="col" :style="{ color: capital_check ? '#666' : '#FF0000' }">
          使用：{{ this.temp_capital }}
        </div>

        <div class="col">人力成本:{{ hc_price }}</div>
        <div class="col">渠道牌价格：{{ channel_price }}</div>

        <div class="col">准入牌价格：{{ permission_price }}</div>

        <div class="col">信息牌价格：{{ info_price }}</div>
        <!-- <div class="col">VBP价格：{{ vbp_price }}</div>
        <div class="col">VBP份额：{{ vbp_share }}</div> -->

        <div class="col" :style="{ color: a_check ? '#666' : '#FF0000' }">
          A成本：{{ a_cost }}
        </div>
        <div class="col" :style="{ color: b_check ? '#666' : '#FF0000' }">
          B成本：{{ b_cost }}
        </div>
        <div class="col" :style="{ color: c_check ? '#666' : '#FF0000' }">
          C成本：{{ c_cost }}
        </div>
      </div>
      <div class="row">
        <div class="col">初始人数：{{ hc_init }}</div>
        <div class="col">已分配人数：{{ hc_assigned }}</div>
        <div class="col" :style="{ color: hc_check ? '#666' : '#FF0000' }">
          新分配人数：{{ total_hc }}
        </div>
        <div class="col">可新增人数:{{ hc_can_be_added }}</div>
        <div class="col" :style="{ color: channel_check ? '#666' : '#FF0000' }">
          渠道牌数量：{{ channel_count - total_channel }}
        </div>
        <div
          class="col"
          :style="{ color: permission_check ? '#666' : '#FF0000' }"
        >
          准入牌数量：{{ permission_count - total_permission }}
        </div>
        <div class="col" :style="{ color: info_check ? '#666' : '#FF0000' }">
          信息牌数量：{{ info_count - total_info }}
        </div>
      </div>
      <div class="row">
        <div class="col">营收：{{ profit }}</div>
        <div class="col">上轮营收：{{ last_profit }}</div>
        <div class="col">总营收：{{ total_profit }}</div>
        <div class="col">营收增长净值：{{ profit_change }}</div>
        <div class="col">营收增长比例：{{ profit_change_ratio }}</div>
      </div>
    </q-card>

    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="id"
      title="Strategy"
      :data="data"
      :columns="columns"
      @request="onRequest"
    >
      <!--搜索框插槽-->
      <template v-slot:top-right>
        <!-- <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>-->
        <q-btn
          flat
          style="color: #8080ff; margin-left: 40px"
          label="Export"
          @click="export2excel"
        />
        <q-btn
          flat
          style="color: #8080ff; margin-left: 40px"
          label="批量"
          @click="is_batch_show = true"
        />
        <q-btn
          class="btn-add"
          color="primary"
          rounded
          icon="skip_next"
          label="Next Round"
          :disabled="!is_able_to_submit"
          @click="is_submit_show = true"
        />
      </template>
      <!--搜索框插槽-->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-tooltip anchor="top left" self="top middle" :offset="[10, 10]">
            <strong>{{ props.row.name }}</strong>
            <br />
            <em>
              {{
                props.row.share_visibility == 1
                  ? props.row.operation_count
                  : "暂不可见"
              }}
            </em>
          </q-tooltip>
          <q-td key="uid" :props="props">{{ props.row.uid }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="operation_count" :props="props">
            {{
              props.row.share_visibility == 1
                ? props.row.operation_count
                : "暂不可见"
            }}
          </q-td>
          <q-td key="hc" :props="props">{{ props.row.hc }}</q-td>
          <q-td key="advertising" :props="props">
            {{ props.row.advertising }}
          </q-td>

          <q-td key="a_price" :props="props">{{ props.row.a_price }}</q-td>
          <q-td key="a_count" :props="props">{{ props.row.a_count }}</q-td>

          <q-td key="b_price" :props="props">{{ props.row.b_price }}</q-td>
          <q-td key="b_count" :props="props">{{ props.row.b_count }}</q-td>

          <q-td key="c_price" :props="props">{{ props.row.c_price }}</q-td>
          <q-td key="c_count" :props="props">{{ props.row.c_count }}</q-td>

          <q-td key="last_operation_count" :props="props">
            {{ props.row.last_operation_count }}
          </q-td>
          <q-td key="current_operation_count" :props="props">
            {{ props.row.current_operation_count }}
          </q-td>
          <q-td key="operation_count_change" :props="props">
            {{ props.row.operation_count_change }}
          </q-td>
          <q-td key="operation_count_change_ratio" :props="props">
            {{ props.row.operation_count_change_ratio }}
          </q-td>

          <q-td key="hc_strategy" class="editable" :props="props">
            {{ props.row.hc_strategy }}
            <q-popup-edit
              v-model.number="props.row.hc_strategy"
              title="Update HC"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.hc_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="advertising_strategy" class="editable" :props="props">
            {{ props.row.advertising_strategy }}
            <q-popup-edit
              v-model="props.row.advertising_strategy"
              title="Update Advertising"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.advertising_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="a_strategy" class="editable" :props="props">
            {{ props.row.a_strategy }}
            <q-popup-edit
              v-model="props.row.a_strategy"
              title="Update A Price"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.a_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="b_strategy" class="editable" :props="props">
            {{ props.row.b_strategy }}
            <q-popup-edit
              v-model="props.row.b_strategy"
              title="Update B Price"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.b_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="c_strategy" class="editable" :props="props">
            {{ props.row.c_strategy }}
            <q-popup-edit
              v-model="props.row.c_strategy"
              title="Update C Price"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.c_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="channel" class="editable" :props="props">
            {{ props.row.channel }}
            <q-popup-edit
              v-model="props.row.channel"
              title="Update Channel"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.channel"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="permission" class="editable" :props="props">
            {{ props.row.permission }}
            <q-popup-edit
              v-model="props.row.permission"
              title="Update Permission"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.permission"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="info" class="editable" :props="props">
            {{ props.row.info }}
            <q-popup-edit
              v-model="props.row.info"
              title="Update Info"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.info"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!--提交弹窗-->
    <q-dialog v-model="is_submit_show">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">结束回合</div>
        </q-card-section>

        <q-card-section class="q-pt-none del-dialog">
          <p class="msg">你确定提交第{{ rounds }}回合策略么？</p>
          <!-- <p class="name">{{ready_to_submit.name}}?</p> -->
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            color="green"
            label="Submit"
            v-close-popup
            @click="submit()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--批量弹窗-->
    <q-dialog v-model="is_batch_show">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">批量填写</div>
        </q-card-section>

        <q-card-section class="q-pt-none del-dialog">
          <q-select
            filled
            v-model="batch"
            :options="options"
            label="目标字段"
          />
          <q-input
            v-model="batch_num"
            label="Number"
            style="margin-top: 20px"
            type="number"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            color="green"
            label="Submit"
            v-close-popup
            @click="batch_submit()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Game from "../api/game.js";
import exportJson2Excel from "../scripts/xlsx.js";

export default {
  name: "Game_player",
  data() {
    return {
      batch_num: 0,
      batch: "HC决策",
      options: [
        "HC决策",
        "市场决策",
        "产品A价格决策",
        "产品B价格决策",
        "产品C价格决策",
        "渠道牌",
        "准入牌",
        "信息牌",
      ],
      options_target: [
        "hc_strategy",
        "advertising_strategy",
        "a_strategy",
        "b_strategy",
        "c_strategy",
        "channel",
        "permission",
        "info",
      ],
      // options: [{name:'1212',value:'hc_strategy'},{name:'1212',value:'hc_strategy'}],
      is_able_to_submit: true,
      a_check: true,
      b_check: true,
      c_check: true,
      capital_check: true,
      hc_check: true,
      channel_check: true,
      permission_check: true,
      info_check: true,
      total_channel: 0,
      total_permission: 0,
      total_info: 0,
      total_hc: 0,
      total_advertising: 0,
      uuid: "",
      game_id: 1,
      game_name: "",
      rounds: 1,
      company_id: "a",
      capital: 0,
      temp_capital: 0,
      hc_limit: 0,
      hc_price: 1000,
      hc_init: 0,
      hc_assigned: 0,
      hc_can_be_added: 0,
      channel_count: 10,
      channel_price: 1100,
      permission_count: 11,
      permission_price: 1010,
      info_count: 12,
      info_price: 1001,
      profit: 0,
      last_profit: 0,
      total_profit: 0,
      profit_change: 0,
      profit_change_ratio: 0,
      vbp_price: 0,
      vbp_share: 0,
      a_cost: 0,
      b_cost: 0,
      c_cost: 0,
      total_investment: 0,
      total_cost: 0,
      is_batch_show: false,
      is_submit_show: false,
      ready_to_submit: {
        id: 0,
        name: "god",
      },
      company_name: "公司12",
      filter: "",
      loading: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 0,
        rowsNumber: 10,
      },
      columns: [
        {
          name: "uid",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.uid,
          style: "width: 10px",
          headerStyle: "width: 10px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: "医院名称",
          align: "left",
          field: (row) => row.name,
          style: "width: 10px",
          headerStyle: "width: 10px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "operation_count",
          required: true,
          label: "年手术台数",
          align: "left",
          field: (row) => row.operation_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "hc",
          required: true,
          label: "当前HC",
          align: "left",
          field: (row) => row.hc,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "advertising",
          required: true,
          label: "市场费用",
          align: "left",
          field: (row) => row.advertising,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "a_price",
          required: true,
          label: "产品A价格",
          align: "left",
          field: (row) => row.a_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "a_count",
          required: false,
          label: "产品A台数",
          align: "left",
          field: (row) => row.a_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "b_price",
          required: false,
          label: "产品B价格",
          align: "left",
          field: (row) => row.b_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "b_count",
          required: true,
          label: "产品B台数",
          align: "left",
          field: (row) => row.b_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "c_price",
          required: true,
          label: "产品C价格",
          align: "left",
          field: (row) => row.c_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "c_count",
          required: true,
          label: "产品C台数",
          align: "left",
          field: (row) => row.c_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "last_operation_count",
          required: true,
          label: "上轮台数",
          align: "left",
          field: (row) => row.last_operation_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "current_operation_count",
          required: true,
          label: "本轮台数",
          align: "left",
          field: (row) => row.current_operation_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "operation_count_change",
          required: true,
          label: "台数增长净值",
          align: "left",
          field: (row) => row.operation_count_change,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "operation_count_change_ratio",
          required: true,
          label: "台数增长比例",
          align: "left",
          field: (row) => row.operation_count_change_ratio,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "hc_strategy",
          required: true,
          label: "HC决策",
          align: "left",
          field: (row) => row.hc_strategy,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "advertising_strategy",
          required: true,
          label: "市场决策",
          align: "left",
          field: (row) => row.advertising_strategy,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "a_strategy",
          required: true,
          label: "产品A价格决策",
          align: "left",
          field: (row) => row.a_strategy,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "b_strategy",
          required: true,
          label: "产品B价格决策",
          align: "left",
          field: (row) => row.b_strategy,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "c_strategy",
          required: true,
          label: "产品C价格决策",
          align: "left",
          field: (row) => row.c_strategy,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "channel",
          required: true,
          label: "渠道牌",
          align: "left",
          field: (row) => row.channel,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "permission",
          required: true,
          label: "准入牌",
          align: "left",
          field: (row) => row.permission,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "info",
          required: true,
          label: "信息牌",
          align: "left",
          field: (row) => row.info,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      data: [],
      original: [],
    };
  },
  mounted() {
    this.get_uuid();
    this.get_current_game_info();
  },

  watch: {
    data: {
      handler: function (val, oldval) {
        // console.log('修改后',val,'修改前',oldval);

        // 计算
        this.calculate();
        // 取整
        this.int_parse();
        // 合法校验
        this.check();
        // console.log(this.is_able_to_submit);
      },
      deep: true,
    },
  },

  methods: {
    test: function (value, initialValue) {
      alert(value);
      alert(initialValue);
    },
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const { filter } = props;

      this.loading = true;
      // Update original
      this.get_company_data(filter, descending);
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
        // const fetchCount = 0;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = this.fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        // ...and turn of loading indicator
        this.loading = false;
      }, 1500);
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.original.filter((row) => row.account.includes(filter))
        : this.original.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "name"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount(filter) {
      if (!filter) {
        return this.original.length;
      }
      let count = 0;
      this.original.forEach((treat) => {
        if (treat.account.includes(filter)) {
          ++count;
        }
      });
      return count;
    },

    get_company_data(filter, descending) {
      this.original = [];
      const _this = this;
      Game.GetCompanyData(this.game_id, this.company_id, this.rounds).then(
        (response) => {
          // console.log(typeof response == typeof "");
          let { data } = Object;
          if (typeof response == typeof "") {
            data = eval("(" + response + ")")["data"];
          } else {
            data = response["data"];
          }
          // const { data } = eval("(" + response + ")");
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            _this.original.push({
              uid: data[i].uid,
              name: data[i].name,
              operation_count: data[i].operation_count,

              hc_sensitivity: data[i].hc_sensitivity,
              advertising_sensitivity: data[i].advertising_sensitivity,
              price_sensitivity: data[i].price_sensitivity,

              share: data[i].share,
              share_visibility: data[i].share_visibility,
              total_share: data[i].total_share,
              last_share: data[i].last_share,
              share_change: data[i].share_change,
              share_change_ratio: data[i].share_change_ratio,

              hc: data[i].hc,
              hc_low_limit: data[i].hc_low_limit,
              advertising: data[i].advertising,
              a_price: data[i].a_price,
              a_mean: data[i].a_mean,
              a_share: data[i].a_share,
              b_price: data[i].b_price,
              b_mean: data[i].b_mean,
              b_share: data[i].b_share,
              c_price: data[i].c_price,
              c_mean: data[i].c_mean,
              c_share: data[i].c_share,

              a_count: data[i].a_count,
              b_count: data[i].b_count,
              c_count: data[i].c_count,

              last_operation_count: data[i].last_operation_count,
              current_operation_count: data[i].current_operation_count,
              operation_count_change: data[i].operation_count_change,
              operation_count_change_ratio:
                data[i].operation_count_change_ratio,

              hc_strategy: data[i].hc_strategy,
              advertising_strategy: data[i].advertising_strategy,
              a_strategy: data[i].a_strategy,
              b_strategy: data[i].b_strategy,
              c_strategy: data[i].c_strategy,
              channel: data[i].channel,
              permission: data[i].permission,
              info: data[i].info,
            });
          }
        }
      );
    },

    clear_add_dialog() {
      this.account = "";
      this.password = "";
    },

    show_delete_dialog(id, name) {
      this.is_delete_show = true;
      this.ready_to_delete.id = id;
      this.ready_to_delete.name = name;
    },

    // 获取公司基本数据
    get_company_info() {
      const _this = this;
      Game.GetCompanyInfo(this.game_id, this.rounds).then((response) => {
        const { data } = response;
        console.log(data);
        let temp_name = "";
        switch (_this.company_id) {
          case "a":
            temp_name = "长庆";
            break;
          case "b":
            temp_name = "吉业";
            break;
          case "c":
            temp_name = "洛华";
            break;
          case "d":
            temp_name = "柳树威";
            break;
          default:
            break;
        }
        for (let index = 0; index < data.length; index++) {
          if (data[index].name == temp_name) {
            _this.name = data[index].name;
            _this.capital = data[index].capital;
            // _this.hc_limit = data[index].hc_limit;
            _this.hc_init = data[index].hc_init;
            _this.hc_assigned = data[index].hc_assigned;
            _this.hc_can_be_added = data[index].hc_can_be_added;

            _this.hc_price = data[index].hc_price;
            _this.channel_price = data[index].channel_price;
            _this.channel_count = data[index].channel;
            _this.permission_price = data[index].permission_price;
            _this.permission_count = data[index].permission;
            _this.info_price = data[index].info_price;
            _this.info_count = data[index].info;
            _this.profit = data[index].profit;
            _this.last_profit = data[index].last_profit;
            _this.total_profit = data[index].total_profit;
            _this.profit_change = data[index].profit_change;
            _this.profit_change_ratio = data[index].profit_change_ratio;
            _this.vbp_price = data[index].vbp_price;
            _this.vbp_share = data[index].vbp_share;

            _this.a_cost = data[index].a_cost;
            _this.b_cost = data[index].b_cost;
            _this.c_cost = data[index].c_cost;
            _this.total_investment = data[index].total_investment;
            _this.total_cost = data[index].total_cost;
          }
        }
      });
    },

    get_uuid() {
      let result = this.get_query_string("uuid");
      this.uuid = result;
    },

    get_query_string(name) {
      let url = window.location.href;
      let param = url.split(name + "=")[1];
      return param;
    },

    get_current_game_info() {
      const _this = this;
      Game.QueryByUUID(this.uuid).then((response) => {
        const { data } = response;
        console.log(data);
        _this.game_id = data.game_id;
        _this.company_id = data.company_id;
        switch (_this.company_id) {
          case "a":
            _this.company_name = "长庆";
            break;
          case "b":
            _this.company_name = "吉业";
            break;
          case "c":
            _this.company_name = "洛华";
            break;
          case "d":
            _this.company_name = "柳树威";
            break;

          default:
            break;
        }
        _this.rounds = data.player_rounds;
        _this.game_name = data.name;
        _this.onRequest({
          pagination: this.pagination,
          filter: this.filter,
        });
        _this.get_company_info();
      });
    },

    submit() {
      const _this = this;
      Game.Submit(this.game_id, this.company_id, this.rounds, this.data).then(
        (response) => {
          switch (response.code) {
            default:
              break;
            case 200:
              _this.$q.notify({
                message: "提交成功",
                // 可用的值: 'positive', 'negative', 'warning', 'info'
                type: "positive",
                textColor: "white",
                // 'top', 'left', 'bottom-left'等
                position: "top",
              });
              break;
          }
        }
      );
    },

    int_parse() {
      this.profit = Number(this.profit).toFixed(2);
      this.last_profit = Number(this.last_profit).toFixed(2);
      this.total_profit = Number(this.total_profit).toFixed(2);
      this.profit_change = Number(this.profit_change).toFixed(2);
      this.profit_change_ratio = Number(this.profit_change_ratio).toFixed(2);
      this.total_hc = Number(this.total_hc).toFixed(1);

      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        element.hc = Number(element.hc).toFixed(1);
        element.advertising = Number(element.advertising).toFixed(2);
        element.a_price = Number(element.a_price).toFixed(2);
        element.a_share = Number(element.a_share).toFixed(2);
        element.b_price = Number(element.b_price).toFixed(2);
        element.b_share = Number(element.b_share).toFixed(2);
        element.c_price = Number(element.c_price).toFixed(2);
        element.c_share = Number(element.c_share).toFixed(2);

        element.a_count = Math.round(element.a_count);
        element.b_count = Math.round(element.b_count);
        element.c_count = Math.round(element.c_count);

        element.hc_strategy = Number(element.hc_strategy).toFixed(1);
        element.advertising_strategy = Number(
          element.advertising_strategy
        ).toFixed(2);
        element.a_strategy = Number(element.a_strategy).toFixed(2);
        element.b_strategy = Number(element.b_strategy).toFixed(2);
        element.c_strategy = Number(element.c_strategy).toFixed(2);
        element.channel = Math.round(element.channel);
        element.permission = Math.round(element.permission);
        element.info = Math.round(element.info);

        element.last_operation_count = Math.round(element.last_operation_count);
        element.current_operation_count = Math.round(
          element.current_operation_count
        );
        element.operation_count_change = Number(
          element.operation_count_change
        ).toFixed(2);
        element.operation_count_change_ratio = Number(
          element.operation_count_change_ratio
        ).toFixed(2);
        // element.info = Math.round(element.info);
        // element.info = Math.round(element.info);
      }
    },

    calculate() {
      const _this = this;
      this.total_hc = 0;
      this.total_advertising = 0;
      this.total_permission = 0;
      this.total_channel = 0;
      this.total_info = 0;

      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        _this.total_hc += Number(element.hc_strategy);
        _this.total_advertising += Number(element.advertising_strategy);
        _this.total_permission += Number(element.permission);
        _this.total_channel += Number(element.channel);
        _this.total_info += Number(element.info);
      }
      this.temp_capital = Number(
        this.hc_price * (this.total_hc - this.hc_init) +
          this.channel_price * this.total_channel +
          this.permission_price * this.total_permission +
          this.info_price * this.total_info +
          this.total_advertising
      ).toFixed(2);
      console.log(this.total_hc)
    },

    check() {
      if (this.company_id == "d") {
        this.hc_check =
          this.hc_can_be_added * 2 + this.hc_assigned - this.total_hc >= 0;
        this.capital_check = this.capital + 100000 - this.temp_capital >= 0;
      } else if (this.company_id == "c") {
        this.hc_check =
          this.hc_can_be_added * 2 + this.hc_assigned - this.total_hc >= 0;
      } else {
        this.hc_check =
          this.hc_can_be_added + this.hc_assigned - this.total_hc >= 0;
        this.capital_check = this.capital - this.temp_capital >= 0;
      }
      // this.hc_check = this.hc_limit - this.total_hc >= 0;
      // this.capital_check = this.temp_capital >= 0;
      this.permission_check =
        this.permission_count - this.total_permission >= 0;
      this.channel_check = this.channel_count - this.total_channel >= 0;
      this.info_check = this.info_count - this.total_info >= 0;

      this.a_check = true;
      this.b_check = true;
      this.c_check = true;

      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        if (element.a_strategy < this.a_cost) {
          this.a_check = false;
          break;
        }
      }
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        if (element.b_strategy < this.b_cost) {
          this.b_check = false;
          break;
        }
      }
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        if (element.c_strategy < this.c_cost) {
          this.c_check = false;
          break;
        }
      }

      this.is_able_to_submit =
        this.a_check &&
        this.b_check &&
        this.c_check &&
        this.capital_check &&
        this.hc_check &&
        this.channel_check &&
        this.permission_check &&
        this.info_check;
    },

    export2excel() {
      let jsonData = [];
      const data = this.data;
      for (let i = 0; i < data.length; i++) {
        jsonData.push({
          ID: data[i].uid,
          医院名称: data[i].name,
          年手术台数:
            data[i].share_visibility == 1
              ? data[i].operation_count
              : "暂不可见",

          // HC敏感度: data[i].hc_sensitivity,
          // 推广敏感度: data[i].advertising_sensitivity,
          // 价格敏感度: data[i].price_sensitivity,

          // 份额: data[i].share,
          // 份额可见: data[i].share_visibility,
          // 总份额: data[i].total_share,
          // 上轮份额: data[i].last_share,
          // 份额增长净值: data[i].share_change,
          // 份额增长比例: data[i].share_change_ratio,

          当前HC: data[i].hc,
          // HC下限: data[i].hc_low_limit,
          推广费用: data[i].advertising,
          产品A价格: data[i].a_price,
          // 产品A均价: data[i].a_mean,
          产品B价格: data[i].b_price,
          // 产品B均价: data[i].b_mean,
          产品C价格: data[i].c_price,
          // 产品C均价: data[i].c_mean,

          // 0922 新增各个产品的台数
          产品A台数: data[i].a_count,
          产品B台数: data[i].b_count,
          产品C台数: data[i].c_count,

          上轮台数: data[i].last_operation_count,
          本轮台数: data[i].current_operation_count,
          台数增长净值: data[i].operation_count_change,
          台数增长比例: data[i].operation_count_change_ratio,

          HC决策: data[i].hc_strategy,
          推广决策: data[i].advertising_strategy,
          产品A价格决策: data[i].a_strategy,
          产品B价格决策: data[i].b_strategy,
          产品C价格决策: data[i].c_strategy,
          渠道牌: data[i].channel,
          准入牌: data[i].permission,
          信息牌: data[i].info,
        });
      }
      // const jsonData = [{ 姓名: 'Tom', 年龄: 18, 身份证号: '0102' }, { 姓名: '张三', 年龄: 210204199901212290, 身份证号: '210204199901212290' }]
      let path =
        this.game_name + "_" + this.rounds + "_" + this.company_name + ".xlsx";
      exportJson2Excel(jsonData, path);
    },
    batch_submit() {
      let i = 0;
      for (let index = 0; index < this.options.length; index++) {
        if (this.options[index] == this.batch) {
          i = index
        }
      }
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        element[this.options_target[i]] = this.batch_num
      }
      this.batch_num = 0

      // alert(this.options_target[i]+this.batch_num);
    },
  },
};
</script>

<style scoped lang="scss">
.editable {
  background-color: #e6f3f5;
}
.row {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
  color: #666;

  .info {
  }
}
.my-card {
  width: 100%;
  margin-bottom: 24px;
  // max-width: 250px;
  .q-img {
    height: 200px;
  }
}
.del-dialog {
  p {
    display: inline-block;
  }

  .msg {
    margin-right: 10px;
  }

  .name {
    color: #f54336;
    font-weight: 600;
    font-size: 16px;
  }
}

.container {
  padding: 0 24px;
}

.th-class {
  color: red;
}

.btn-add {
  margin-left: 40px;
}

h4 {
  display: block;
  font-weight: 600;
  font-size: 28px;
  padding: 0;
  margin: 0;
  line-height: 50px;
  height: 50px;
}
</style>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 600px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>