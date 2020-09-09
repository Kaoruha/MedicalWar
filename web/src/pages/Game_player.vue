<template>
  <div class="container">
    <h4>Game Manager</h4>
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">{{company_name}}</div>
          <div class="text-subtitle2">Current Round ：{{round}}</div>
        </div>
      </q-img>

      <q-card-actions>
        <!-- <q-btn flat color="negative" @click="end_the_game" style="width: 120px">End the Game</q-btn>
        <q-btn disabled color="primary" @click="submit" style="width: 120px">Next</q-btn>-->
      </q-card-actions>
    </q-card>
    <q-table
      title="Works List"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <!--搜索框插槽-->
      <template v-slot:top-right>
        <!-- <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>-->
        <q-btn
          class="btn-add"
          color="primary"
          rounded
          icon="skip_next"
          label="Next Round"
          @click="is_submit_show=true"
        />
      </template>
      <!--搜索框插槽-->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="operation_count" :props="props">{{ props.row.operation_count }}</q-td>
          <q-td key="hc" :props="props">{{ props.row.hc }}</q-td>
          <q-td key="advertising" :props="props">{{ props.row.advertising }}</q-td>

          <q-td key="a_price" :props="props">{{ props.row.a_price }}</q-td>
          <q-td key="a_share" :props="props">{{ props.row.a_share }}</q-td>

          <q-td key="b_price" :props="props">{{ props.row.b_price }}</q-td>
          <q-td key="b_share" :props="props">{{ props.row.b_share }}</q-td>

          <q-td key="c_price" :props="props">{{ props.row.c_price }}</q-td>
          <q-td key="c_share" :props="props">{{ props.row.c_share }}</q-td>

          <q-td key="hc_strategy" :props="props">
            {{ props.row.hc_strategy }}
            <q-popup-edit v-model="props.row.info" title="Update HC" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.hc_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="advertising_strategy" :props="props">
            {{ props.row.advertising_strategy }}
            <q-popup-edit
              v-model="props.row.advertising_strategy"
              title="Update Advertising"
              buttons
              persistent
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

          <q-td key="a_strategy" :props="props">
            {{ props.row.a_strategy }}
            <q-popup-edit v-model="props.row.a_strategy" title="Update A Price" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.a_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="b_strategy" :props="props">
            {{ props.row.a_strategy }}
            <q-popup-edit v-model="props.row.b_strategy" title="Update B Price" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.b_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="c_strategy" :props="props">
            {{ props.row.a_strategy }}
            <q-popup-edit v-model="props.row.c_strategy" title="Update C Price" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.c_strategy"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="channel" :props="props">
            {{ props.row.channel }}
            <q-popup-edit v-model="props.row.channel" title="Update Channel" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.channel"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="permission" :props="props">
            {{ props.row.permission }}
            <q-popup-edit
              v-model="props.row.permission"
              title="Update Permission"
              buttons
              persistent
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

          <q-td key="info" :props="props">
            {{ props.row.info }}
            <q-popup-edit v-model="props.row.info" title="Update Info" buttons persistent>
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

    <!--删除弹窗-->
    <q-dialog v-model="is_submit_show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">结束回合</div>
        </q-card-section>

        <q-card-section class="q-pt-none del-dialog">
          <p class="msg">你确定提交第{{rounds}}回合策略么？</p>
          <!-- <p class="name">{{ready_to_submit.name}}?</p> -->
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="green" label="Submit" v-close-popup @click="submit()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Game from "../api/game.js";

export default {
  name: "Game_player",
  data() {
    return {
      uuid: "",
      game_id: 7,
      rounds: 2,
      company_id: "a",
      capital: 0,
      man: 0,
      man_cost: 1000,
      channel_count: 10,
      channel_price: 1100,
      permission_count: 11,
      permission_price: 1010,
      info_count: 12,
      info_price: 1001,
      is_submit_show: false,
      ready_to_submit: {
        id: 0,
        name: "god",
      },
      company_name: "公司1",
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
          sortable: false,
        },
        {
          name: "hc",
          required: true,
          label: "当前HC",
          align: "left",
          field: (row) => row.hc,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "advertising",
          required: true,
          label: "推广费用",
          align: "left",
          field: (row) => row.advertising,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
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
          name: "a_share",
          required: false,
          label: "产品A份额",
          align: "left",
          field: (row) => row.a_share,
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
          name: "b_share",
          required: true,
          label: "ProductA Price",
          align: "产品B份额",
          field: (row) => row.b_share,
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
          name: "c_share",
          required: true,
          label: "产品C份额",
          align: "left",
          field: (row) => row.c_share,
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
          label: "推广决策",
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
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: this.filter,
    });
  },
  methods: {
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

    get_company_data(filter, descending) {
      this.original = [];
      const _this = this;
      Game.GetCompanyData(this.game_id, this.company_id, this.rounds).then(
        (response) => {
          const { data } = response;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            _this.original.push({
              name: data[i].name,
              operation_count: data[i].operation_count,
              hc: data[i].hc,
              advertising: data[i].advertising,
              a_price: data[i].a_price,
              a_share: data[i].a_share,
              b_price: data[i].b_price,
              b_share: data[i].b_share,
              c_price: data[i].c_price,
              c_share: data[i].c_share,
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

    creat_game() {
      const _this = this;
      Game.Create(this.name, this.description).then((response) => {
        switch (response.code) {
          default:
            break;
          case 200:
            _this.onRequest({
              pagination: _this.pagination,
              filter: _this.filter,
            });
            break;
          case 600:
            break;
          case 601:
            break;
        }
      });
      this.clear_add_dialog();
    },

    show_delete_dialog(id, name) {
      this.is_delete_show = true;
      this.ready_to_delete.id = id;
      this.ready_to_delete.name = name;
    },

    get_uuid() {
      let s = window.location.href;
      alert(s);
      // var url = location.search; //获取url中"?"符后的字串
      // if (url.indexOf("?") != -1) {
      //   //判断是否有参数
      //   var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      //   strs = str.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
      //   alert(strs[1]); //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
      // }
      // alert("gameid：" + this.game_id);
      // alert("rounds:" + this.rounds);
      // alert("company_id" + this.company_id);
      // TODO 从url获取gameid，companyid，再从game。playerrounds获取回合
    },

    submit() {
      const _this = this;
      Game.Submit(this.game_id, this.company_id, this.rounds, this.data).then(
        (response) => {
          switch (response.code) {
            default:
              break;
            case 200:
              alert("提交成功");
              break;
          }
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
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
