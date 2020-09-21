<template>
  <div class="container">
    <h4>Game Host</h4>
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">{{game_name}}</div>
          <div class="text-subtitle2">Current Round ：{{rounds}}</div>
          <div class="text-subtitle2">Player Round ：{{player_rounds}}</div>
        </div>
      </q-img>

      <q-card-actions>
        <q-btn
          flat
          color="light-blue"
          @click="start_this_round"
          :disabled="!is_ok_to_start()"
          style="width: 120px"
        >开始当前回合</q-btn>
        <q-btn
          :disabled="!is_ok_to_commit()"
          color="primary"
          @click="next"
          style="width: 120px"
        >提交策略</q-btn>
      </q-card-actions>
    </q-card>

    <q-table
      class="ComInfo"
      title="Company Info"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <!--检查按钮-->
      <!-- <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="btn-add"
          color="primary"
          rounded
          icon="done"
          :label="is_company_checked ? 'Checked':'Check'"
          @click="all_check"
        />
      </template>-->
      <!--检查按钮-->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="capital" :props="props">
            {{ props.row.capital }}
            <q-popup-edit v-model="props.row.description" title="调整总资金" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.capital"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="hc_limit" :props="props">
            {{ props.row.hc_limit }}
            <q-popup-edit v-model="props.row.hc_limit" title="调整可分配人数" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.hc_limit"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="hc_price" :props="props">
            {{ props.row.hc_price }}
            <q-popup-edit v-model="props.row.hc_price" title="人力成本" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.hc_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="channel_price" :props="props">
            {{ props.row.channel_price }}
            <q-popup-edit v-model="props.row.channel_price" title="调整渠道牌价格" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.channel_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="channel" :props="props">
            {{ props.row.channel }}
            <q-popup-edit v-model="props.row.channel" title="调整渠道牌剩余数量" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.channel"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="permission_price" :props="props">
            {{ props.row.permission_price }}
            <q-popup-edit v-model="props.row.permission_price" title="调整准入牌价格" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.permission_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="permission" :props="props">
            {{ props.row.permission }}
            <q-popup-edit v-model="props.row.permission" title="调整准入牌剩余数量" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.permission"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="info_price" :props="props">
            {{ props.row.info_price }}
            <q-popup-edit v-model="props.row.info_price" title="调整信息牌价格" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.info_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="info" :props="props">
            {{ props.row.info }}
            <q-popup-edit v-model="props.row.info" title="调整信息牌剩余数量" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.info"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="profit" :props="props">
            {{ props.row.profit }}
            <q-popup-edit v-model="props.row.profit" title="调整营收" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.profit"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="last_profit" :props="props">{{ props.row.last_profit }}</q-td>

          <q-td key="total_profit" :props="props">{{ props.row.total_profit }}</q-td>

          <q-td key="profit_change" :props="props">{{ props.row.profit_change }}</q-td>

          <q-td key="profit_change_ratio" :props="props">{{ props.row.profit_change_ratio }}</q-td>

          <q-td key="vbp_price" :props="props">
            {{ props.row.vbp_price }}
            <q-popup-edit v-model="props.row.vbp_price" title="调整VBP价格" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.vbp_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="vbp_share" :props="props">
            {{ props.row.vbp_share }}
            <q-popup-edit v-model="props.row.vbp_share" title="调整VBP" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.vbp_share"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="a_cost" :props="props">
            {{ props.row.a_cost }}
            <q-popup-edit v-model="props.row.vbpa_cost_share" title="调整产品A成本" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.a_cost"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="b_cost" :props="props">
            {{ props.row.b_cost }}
            <q-popup-edit v-model="props.row.b_cost" title="调整产品B成本" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.b_cost"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="c_cost" :props="props">
            {{ props.row.c_cost }}
            <q-popup-edit v-model="props.row.c_cost" title="调整产品C成本" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.c_cost"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="total_investment" :props="props">
            {{ props.row.total_investment }}
            <q-popup-edit v-model="props.row.total_investment" title="调整总资金投入" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.total_investment"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="total_cost" :props="props">
            {{ props.row.total_cost }}
            <q-popup-edit v-model="props.row.total_cost" title="调整总生产成本" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.total_cost"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-expansion-item
      expand-separator
      icon="perm_identity"
      :label="company_name[n-1]"
      :caption="is_company_checked[n-1].check ? '确认':'未确认'"
      v-for="n in 4"
      :key="`md-${n}`"
    >
      <q-card>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <Strategy
                @company_check="company_check"
                :company_id="company_ids[n-1]"
                :company_name="company_name[n-1]"
                :url="uuid[n-1]"
              ></Strategy>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <div class="com_strategy"></div>
    <!--提交弹窗-->
    <q-dialog v-model="is_commit_show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">确认提交</div>
        </q-card-section>

        <q-card-section class="q-pt-none del-dialog">
          <p class="msg">Do you really want to delete</p>
          <p class="name">{{this.game_name}}?</p>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="red" label="Delete" v-close-popup @click="next" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Game from "../api/game.js";
import Strategy from "../components/host_strategy";

export default {
  name: "Game_host",
  components: {
    Strategy,
  },
  data() {
    return {
      host: "http://localhost:8080/#/game_player?uuid=",
      // host: "http://49.235.80.242/#/game_player?uuid=",
      is_commit_show: false,
      current_round_started: false,
      game_name: "default",
      rounds: 1,
      player_rounds: 0,
      game_id: 1,
      company_ids: ["a", "b", "c", "d"],
      company_name: ["Company A", "Company B", "Company C", "Company D"],
      is_all_com_check: false,
      is_company_checked: [
        { check: false },
        { check: false },
        { check: false },
        { check: false },
      ],
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
          name: "name",
          required: true,
          label: "公司名称",
          align: "left",
          field: (row) => row.name,
          style: "width: 10px",
          headerStyle: "width: 10px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "capital",
          required: true,
          label: "总资金",
          align: "left",
          field: (row) => row.capital,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "hc_limit",
          required: false,
          label: "可分配人数",
          align: "left",
          field: (row) => row.hc_limit,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "hc_price",
          required: false,
          label: "人力成本",
          align: "left",
          field: (row) => row.hc_price,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "channel_price",
          required: true,
          label: "渠道牌价格",
          align: "left",
          field: (row) => row.channel_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "channel",
          required: true,
          label: "渠道牌剩余数量",
          align: "left",
          field: (row) => row.channel,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "permission_price",
          required: true,
          label: "准入牌价格",
          align: "left",
          field: (row) => row.permission_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "permission",
          required: true,
          label: "准入牌剩余数量",
          align: "left",
          field: (row) => row.permission,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "info_price",
          required: true,
          label: "信息牌价格",
          align: "left",
          field: (row) => row.info_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "info",
          required: true,
          label: "信息牌剩余数量",
          align: "left",
          field: (row) => row.info,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "profit",
          required: true,
          label: "营收",
          align: "left",
          field: (row) => row.profit,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "last_profit",
          required: true,
          label: "上轮营收",
          align: "left",
          field: (row) => row.last_profit,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "total_profit",
          required: true,
          label: "总营收",
          align: "left",
          field: (row) => row.total_profit,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "profit_change",
          required: true,
          label: "营收增长净值",
          align: "left",
          field: (row) => row.profit_change,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "profit_change_ratio",
          required: true,
          label: "营收增长比例",
          align: "left",
          field: (row) => row.profit_change_ratio,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "vbp_price",
          required: true,
          label: "VBP价格",
          align: "left",
          field: (row) => row.vbp_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "vbp_share",
          required: true,
          label: "VBP份额",
          align: "left",
          field: (row) => row.vbp_share,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "a_cost",
          required: true,
          label: "产品A成本",
          align: "left",
          field: (row) => row.a_cost,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "b_cost",
          required: true,
          label: "产品B成本",
          align: "left",
          field: (row) => row.b_cost,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "c_cost",
          required: true,
          label: "产品C成本",
          align: "left",
          field: (row) => row.c_cost,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "total_investment",
          required: true,
          label: "总资金投入",
          align: "left",
          field: (row) => row.total_investment,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "total_cost",
          required: true,
          label: "总生产成本",
          align: "left",
          field: (row) => row.total_cost,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      uuid: [],
      data: [],
      data_a: [],
      data_b: [],
      data_c: [],
      data_d: [],
      original: [],
    };
  },
  mounted() {
    // get initial data from server (1st page)
    this.get_current_game();
  },
  watch: {},
  methods: {
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const { filter } = props;

      this.loading = true;
      // Update original
      this.get_company_info();
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

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
          sortBy === "id"
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

    get_company_info() {
      this.original = [];
      const _this = this;
      // alert(this.rounds)
      Game.GetCompanyInfo(this.game_id, this.rounds).then((response) => {
        const { data } = response;
        // console.log(response);
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          _this.original.push({
            name: data[i].name,
            capital: data[i].capital,
            hc_limit: data[i].hc_limit,
            hc_price: data[i].hc_price,
            channel_price: data[i].channel_price,
            channel: data[i].channel,
            permission_price: data[i].permission_price,
            permission: data[i].permission,
            info_price: data[i].info_price,
            info: data[i].info,
            profit: data[i].profit,
            last_profit: data[i].last_profit,
            total_profit: data[i].total_profit,
            profit_change: data[i].profit_change,
            profit_change_ratio: data[i].profit_change_ratio,
            vbp_price: data[i].vbp_price,
            vbp_share: data[i].vbp_share,

            a_cost: data[i].a_cost,
            b_cost: data[i].b_cost,
            c_cost: data[i].c_cost,
            total_investment: data[i].total_investment,
            total_cost: data[i].total_cost,
          });
        }
      });
    },

    get_current_game() {
      // TODO 将id传到后段，获得gamename和当前回合，本地存储
      // TODO 后段写个api，入id，吐name和rounds
      const _this = this;
      var t = localStorage.getItem("current_game_id");
      this.game_id = Number(t); // 目前是把id显示出来，回头用id去查询这一局的情况
      Game.GetGameInfo(this.game_id).then((response) => {
        const { data } = response;
        console.log(data);
        _this.rounds = data["rounds"];
        _this.player_rounds = data["player_rounds"];
        this.$store.commit("current_game/updateCurrentRounds", data.rounds);
        // 存储四个公司的UUID
        _this.uuid.push(_this.host + data.a_uuid);
        _this.uuid.push(_this.host + data.b_uuid);
        _this.uuid.push(_this.host + data.c_uuid);
        _this.uuid.push(_this.host + data.d_uuid);

        //TODO store更新存储rounds
        _this.game_name = data["name"];
        if (_this.player_rounds >= _this.rounds) {
          _this.current_round_started = true;
        }

        this.onRequest({
          pagination: this.pagination,
          filter: this.filter,
        });
      });
    },

    next() {
      const _this = this;
      let data = [
        this.data,
        this.data_a,
        this.data_b,
        this.data_c,
        this.data_d,
      ];
      Game.Next(this.game_id, data).then((response) => {
        _this.reset();
        _this.get_current_game();
        _this.$q.notify({
          message: "提交成功",
          // 可用的值: 'positive', 'negative', 'warning', 'info'
          type: "positive",
          textColor: "white",
          // 'top', 'left', 'bottom-left'等
          position: "top",
        });
      });

      // 将gameid和rounds 和5个dataframe拼起来传到后端
      // 后端处理生成下回合的初始数据
      // 数据库gameround ++，playerrounds保持
      // 前端刷新，拿到新的回合，根据新的回合去拿数据
      // 确认无误后，点开始，playerrounds++
      // 通知学生刷新
    },

    reset() {
      const _this = this;
      this.is_all_com_check = false;
      for (let index = 0; index < this.is_company_checked.length; index++) {
        _this.is_company_checked[index].check = false;
      }
    },
    start_this_round() {
      const _this = this;
      let data = [
        this.data,
        this.data_a,
        this.data_b,
        this.data_c,
        this.data_d,
      ];
      console.log(data);
      Game.Start(this.game_id, data).then((response) => {
        location.reload();
      });
    },
    company_check(msg) {
      // 子组件发起的函数
      let id = msg.company_id;
      let is_checked = msg.is_checked;
      let data = msg.data;
      let index = 0;
      switch (id) {
        case "a":
          index = 0;
          this.data_a = data;
          console.log(this.data_a);
          break;
        case "b":
          index = 1;
          this.data_b = data;
          break;
        case "c":
          index = 2;
          this.data_c = data;
          break;
        case "d":
          index = 3;
          this.data_d = data;
          break;
        default:
          break;
      }
      this.is_company_checked[index].check = is_checked;
      this.is_all_check();
    },

    is_ok_to_commit() {
      if (this.is_all_com_check && this.current_round_started) {
        return true;
        _this.$q.notify({
          message: "可以提交",
          // 可用的值: 'positive', 'negative', 'warning', 'info'
          type: "positive",
          textColor: "white",
          // 'top', 'left', 'bottom-left'等
          position: "top",
        });
      } else {
        return false;
      }
    },

    is_ok_to_start() {
      if (this.is_all_com_check && !this.current_round_started) {
        return true;
        _this.$q.notify({
          message: "可以开始回合",
          // 可用的值: 'positive', 'negative', 'warning', 'info'
          type: "positive",
          textColor: "white",
          // 'top', 'left', 'bottom-left'等
          position: "top",
        });
      } else {
        return false;
      }
    },

    is_all_check() {
      const _this = this;
      let r = 1;
      for (let index = 0; index < this.is_company_checked.length; index++) {
        r *= _this.is_company_checked[index].check;
      }
      if (r == 1) {
        _this.is_all_com_check = true;
      } else {
        _this.is_all_com_check = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.com_strategy {
  margin-bottom: 40px;
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
.ComInfo {
  margin-bottom: 20px;
}
</style>
