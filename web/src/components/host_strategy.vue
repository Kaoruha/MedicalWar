<template>
  <div>
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      :title="company_name"
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
      <template v-slot:top-right>
        {{url}}
        <q-btn
          class="btn-add"
          color="primary"
          rounded
          icon="done"
          :label="is_company_checked ? 'Checked':'Check'"
          @click="all_check"
        />
      </template>
      <!--检查按钮-->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-tooltip anchor="top left" self="top middle" :offset="[10, 10]">
            <strong>{{ props.row.name }}</strong>
            <br />
            <em>{{ props.row.operation_count }}</em>
          </q-tooltip>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="operation_count" :props="props">
            {{ props.row.operation_count }}
            <q-popup-edit v-model="props.row.description" title="调整年手术台数" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.operation_count"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="current_operation_count" :props="props">
            {{ props.row.current_operation_count }}
            <q-popup-edit
              v-model="props.row.current_operation_count"
              title="调整本轮台数"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.current_operation_count"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="last_operation_count" :props="props">{{ props.row.last_operation_count }}</q-td>
          <q-td key="operation_count_change" :props="props">{{ props.row.operation_count_change }}</q-td>
          <q-td
            key="operation_count_change_ratio"
            :props="props"
          >{{ props.row.operation_count_change_ratio }}</q-td>

          <q-td key="hc_sensitivity" :props="props">
            {{ props.row.hc_sensitivity }}
            <q-popup-edit v-model="props.row.hc_sensitivity" title="调整HC敏感度" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.hc_sensitivity"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="advertising_sensitivity" :props="props">
            {{ props.row.advertising_sensitivity }}
            <q-popup-edit
              v-model="props.row.advertising_sensitivity"
              title="调整市场敏感度"
              buttons
              auto-save
            >
              <q-input
                type="number"
                v-model="props.row.advertising_sensitivity"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="price_sensitivity" :props="props">
            {{ props.row.price_sensitivity }}
            <q-popup-edit v-model="props.row.price_sensitivity" title="调整价格敏感度" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.price_sensitivity"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="share" :props="props">
            {{ props.row.share }}
            <q-popup-edit v-model="props.row.share" title="调整份额" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.share"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="share_visibility" :props="props">
            {{ props.row.share_visibility }}
            <q-popup-edit v-model="props.row.share_visibility" title="份额可见" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.share_visibility"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="total_share" :props="props">
            {{ props.row.total_share }}
            <q-popup-edit v-model="props.row.total_share" title="总份额" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.total_share"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="last_share" :props="props">
            {{ props.row.last_share }}
            <q-popup-edit v-model="props.row.last_share" title="上轮份额" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.last_share"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="share_change" :props="props">
            {{ props.row.share_change }}
            <q-popup-edit v-model="props.row.share_change" title="份额增长净值" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.share_change"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="share_change_ratio" :props="props">
            {{ props.row.share_change_ratio }}
            <q-popup-edit v-model="props.row.share_change_ratio" title="份额增长比例" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.share_change_ratio"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="hc" :props="props">
            {{ props.row.hc }}
            <q-popup-edit v-model="props.row.hc" title="调整当前HC" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.hc"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="hc_low_limit" :props="props">
            {{ props.row.hc_low_limit }}
            <q-popup-edit v-model="props.row.hc_low_limit" title="调整HC上限" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.hc_low_limit"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="advertising" :props="props">
            {{ props.row.advertising }}
            <q-popup-edit v-model="props.row.advertising" title="调整市场费用" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.advertising"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="a_price" :props="props">
            {{ props.row.a_price }}
            <q-popup-edit v-model="props.row.a_price" title="产品A价格" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.a_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="a_mean" :props="props">
            {{ props.row.a_mean }}
            <q-popup-edit v-model="props.row.a_mean" title="调整产品A均价" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.a_mean"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="a_count" :props="props">
            {{ props.row.a_count }}
            <q-popup-edit v-model="props.row.a_count" title="调整产品A台数" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.a_count"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="b_price" :props="props">
            {{ props.row.b_price }}
            <q-popup-edit v-model="props.row.b_price" title="调整产品B价格" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.b_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="b_mean" :props="props">
            {{ props.row.b_mean }}
            <q-popup-edit v-model="props.row.b_mean" title="调整产品B均价" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.b_mean"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="b_count" :props="props">
            {{ props.row.b_count }}
            <q-popup-edit v-model="props.row.b_count" title="调整产品B台数" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.b_count"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="c_price" :props="props">
            {{ props.row.c_price }}
            <q-popup-edit v-model="props.row.c_price" title="调整产品C价格" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.c_price"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="c_mean" :props="props">
            {{ props.row.c_mean }}
            <q-popup-edit v-model="props.row.c_mean" title="调整产品C均价" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.c_mean"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="c_count" :props="props">
            {{ props.row.c_count }}
            <q-popup-edit v-model="props.row.c_count" title="调整产品C台数" buttons auto-save>
              <q-input
                type="number"
                v-model="props.row.c_count"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="hc_strategy" :props="props">
            {{ props.row.hc_strategy }}
            <q-popup-edit v-model="props.row.hc_strategy" title="调整HC决策" buttons auto-save>
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
              title="调整市场决策"
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

          <q-td key="a_strategy" :props="props">
            {{ props.row.a_strategy }}
            <q-popup-edit v-model="props.row.a_strategy" title="调整产品A价格决策" buttons auto-save>
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
            {{ props.row.b_strategy }}
            <q-popup-edit v-model="props.row.b_strategy" title="调整产品B价格决策" buttons auto-save>
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
            {{ props.row.c_strategy }}
            <q-popup-edit v-model="props.row.a_strategy" title="调整产品C价格决策" buttons auto-save>
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
            <q-popup-edit v-model="props.row.channel" title="调整渠道牌" buttons auto-save>
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
            <q-popup-edit v-model="props.row.permission" title="调整准入牌" buttons auto-save>
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
            <q-popup-edit v-model="props.row.info" title="调整信息牌" buttons auto-save>
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
  </div>
</template>

<script>
import Game from "../api/game.js";
export default {
  name: "host_strategy",
  props: {
    url: {
      type: String,
      default: "uuid2url",
    },
    company_id: {
      type: String,
      default: "a",
    },
    company_name: {
      type: String,
      default: "Company X",
    },
  },
  data() {
    return {
      game_id: 1,
      rounds: 1,
      is_company_checked: false,
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
          field: (row) => row.account,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "current_operation_count",
          required: true,
          label: "本轮台数",
          align: "left",
          field: (row) => row.current_operation_count,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "last_operation_count",
          required: true,
          label: "上轮台数",
          align: "left",
          field: (row) => row.last_operation_count,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "operation_count_change",
          required: true,
          label: "台数增长净值",
          align: "left",
          field: (row) => row.operation_count_change,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "operation_count_change_ratio",
          required: true,
          label: "台数增长比例",
          align: "left",
          field: (row) => row.operation_count_change_ratio,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "hc_sensitivity",
          required: false,
          label: "HC敏感度",
          align: "left",
          field: (row) => row.hc_sensitivity,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "advertising_sensitivity",
          required: false,
          label: "市场敏感度",
          align: "left",
          field: (row) => row.advertising_sensitivity,
          style: "width:100px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "price_sensitivity",
          required: true,
          label: "价格敏感度",
          align: "left",
          field: (row) => row.price_sensitivity,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "share",
          required: true,
          label: "份额",
          align: "left",
          field: (row) => row.share,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "share_visibility",
          required: true,
          label: "份额可见",
          align: "left",
          field: (row) => row.share_visibility,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "total_share",
          required: true,
          label: "总份额",
          align: "left",
          field: (row) => row.total_share,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "last_share",
          required: true,
          label: "上轮份额",
          align: "left",
          field: (row) => row.last_share,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "share_change",
          required: true,
          label: "份额增长净值",
          align: "left",
          field: (row) => row.share_change,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "share_change_ratio",
          required: true,
          label: "份额增长比例",
          align: "left",
          field: (row) => row.share_change_ratio,
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
          name: "hc_low_limit",
          required: true,
          label: "HC下限",
          align: "left",
          field: (row) => row.hc_low_limit,
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
          sortable: true,
        },
        {
          name: "a_mean",
          required: true,
          label: "产品A均价",
          align: "left",
          field: (row) => row.a_mean,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "a_count",
          required: true,
          label: "产品A台数",
          align: "left",
          field: (row) => row.a_count,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "b_price",
          required: true,
          label: "产品B价格",
          align: "left",
          field: (row) => row.b_price,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "b_mean",
          required: true,
          label: "产品B均价",
          align: "left",
          field: (row) => row.b_mean,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
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
          name: "c_mean",
          required: true,
          label: "产品C均价",
          align: "left",
          field: (row) => row.c_mean,
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
          label: "市场费用决策",
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
    this.get_current_game();
    // alert(this.game_id)
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
      this.get_company_strategy();
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
    get_current_game() {
      let id = localStorage.getItem("current_game_id");
      this.game_id = Number(id);
      let r = localStorage.getItem("current_rounds");
      this.rounds = Number(r);
    },

    get_company_strategy() {
      this.original = [];
      const _this = this;

      Game.GetCompanyData(this.game_id, this.company_id, this.rounds).then(
        (response) => {
          // if (_this.company_id == "b") {
          //   const { data } = eval("(" + response + ")");
          // } else {
          //   const { data } = response;
          // }
          let { data } = Object;
          if (typeof(response)==typeof "") {
            data = eval("(" + response + ")")["data"];
          }else{
            data = response["data"];
          }
          // const { data } = eval("(" + response + ")");
           console.log("222");
          console.log(data);
          // const { data } = eval("(" + response + ")");
          // console.log(response);
          // console.log(data);
          for (let i = 0; i < data.length; i++) {
            _this.original.push({
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

              // 0922 新增各个产品的台数
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
          _this.int_parse();
        }
      );
    },

    all_check() {
      this.is_company_checked = !this.is_company_checked;
      let msg = {
        company_id: this.company_id,
        is_checked: this.is_company_checked,
        data: this.data,
        // TODO 要把表内的数据data也传过去
      };
      this.$emit("company_check", msg); //this.value为向父组件传递的数据
    },

    enter_game(id) {
      alert("进入游戏" + "id:" + id);
    },

    commit() {
      alert("提交信息");
    },

    reset() {
      this.is_company_checked = false;
    },

    int_parse() {
      for (let index = 0; index < this.original.length; index++) {
        const element = this.original[index];
        element.hc = Number(element.hc).toFixed(1);
        element.advertising = Number(element.advertising).toFixed(2);
        element.a_price = Number(element.a_price).toFixed(2);
        element.a_share = Number(element.a_share).toFixed(2);
        element.b_price = Number(element.b_price).toFixed(2);
        element.b_share = Number(element.b_share).toFixed(2);
        element.c_price = Number(element.c_price).toFixed(2);
        element.c_share = Number(element.c_share).toFixed(2);
        element.hc_strategy = Number(element.hc_strategy).toFixed(1);
        element.operation_count = Math.round(element.operation_count);

        element.a_count = Math.round(element.a_count);
        element.b_count = Math.round(element.b_count);
        element.c_count = Math.round(element.c_count);

        element.hc_sensitivity = Number(element.hc_sensitivity).toFixed(2);
        element.advertising_sensitivity = Number(
          element.advertising_sensitivity
        ).toFixed(2);
        element.price_sensitivity = Number(element.price_sensitivity).toFixed(
          2
        );

        element.share = Number(element.share).toFixed(2);
        element.total_share = Number(element.total_share).toFixed(2);
        element.last_share = Number(element.last_share).toFixed(2);
        element.share_change = Number(element.share_change).toFixed(2);
        element.share_change_ratio = Number(element.share_change_ratio).toFixed(
          2
        );

        element.operation_count = Math.round(element.operation_count);
        element.last_operation_count = Math.round(element.last_operation_count);
        element.current_operation_count = Math.round(
          element.current_operation_count
        );
        element.operation_count_change = Math.round(
          element.operation_count_change
        );
        element.operation_count_change_ratio = Number(
          element.operation_count_change_ratio
        ).toFixed(2);
      }
    },
  },
};
</script>
};

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