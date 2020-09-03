<template>
  <div class="container">
    <h4>Game Host</h4>
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">{{game_name}}</div>
          <div class="text-subtitle2">Current Round ：{{round}}</div>
        </div>
      </q-img>

      <q-card-actions>
        <q-btn flat color="negative" @click="end_the_game" style="width: 120px">End the Game</q-btn>
        <q-btn disabled color="primary" @click="commit" style="width: 120px">Next</q-btn>
      </q-card-actions>
    </q-card>
    <div class="row q-col-gutter-md">
      <div class="col-12" v-for="n in 4" :key="`md-${n}`">
        <q-table
          title="data[n]"
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
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <!-- <template v-slot:append> -->
              <!-- <q-icon name="search" /> -->
              <!-- </template> -->
            </q-input>
            <q-btn
              class="btn-add"
              color="primary"
              rounded
              icon="done"
              :label= "is_company_checked[n-1].check ? 'Checked':'Check'"
              @click="is_company_checked[n-1].check = !is_company_checked[n-1].check"
            />
          </template>
          <!--检查按钮-->

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="hc" :props="props">
                {{ props.row.description }}
                <q-popup-edit
                  v-model="props.row.description"
                  title="Update HC"
                  buttons
                  persistent
                >
                  <q-input
                    type="input"
                    v-model="props.row.description"
                    dense
                    autofocus
                    hint="Use buttons to close"
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="advertising" :props="props">{{ props.row.round }}</q-td>
              <q-td key="product_a" :props="props">{{ props.row.recent }}</q-td>
              <q-td key="product_b" :props="props"></q-td>
              <q-td key="product_c" :props="props"></q-td>
              <q-td key="channel" :props="props"></q-td>
              <q-td key="permission" :props="props"></q-td>
              <q-td key="info" :props="props"></q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import Game from "../api/game.js";

export default {
  name: "Game_host",
  data() {
    return {
      game_name: "default",
      round: 0,
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
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
          style: "width: 10px",
          headerStyle: "width: 10px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.account,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "hc",
          required: false,
          label: "HC",
          align: "left",
          field: (row) => row.description,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "advertising",
          required: false,
          label: "Advertising",
          align: "left",
          field: (row) => row.description,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "product_a",
          required: true,
          label: "ProductA Price",
          align: "left",
          field: (row) => row.recent,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "product_b",
          required: true,
          label: "ProductB Price",
          align: "left",
          field: (row) => row.recent,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "product_c",
          required: true,
          label: "ProductC Price",
          align: "left",
          field: (row) => row.recent,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "channel",
          required: false,
          label: "Channel",
          align: "right",
          style: "width:200px",
        },
        {
          name: "permission",
          required: false,
          label: "Permission",
          align: "right",
          style: "width:200px",
        },
        {
          name: "info",
          required: false,
          label: "Info",
          align: "right",
          style: "width:200px",
        },
      ],
      data: [],
      original: [],
    };
  },
  mounted() {
    // get initial data from server (1st page)
    this.get_current_game();
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
      this.get_company_strategy(filter, descending);
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

    get_company_strategy(filter, descending) {
      this.original = [];
      const _this = this;
      Game.Filter(filter, descending).then((response) => {
        const { data } = response;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          _this.original.push({
            name: data[i].name,
            id: data[i].id,
            description: data[i].description,
            round: data[i].rounds,
            recent: data[i].update,
          });
        }
      });
    },

    enter_game(id) {
      alert("进入游戏" + "id:" + id);
    },

    get_current_game() {
      var t = localStorage.getItem("current_game_id");
      this.game_name = t; // 目前是把id显示出来，回头用id去查询这一局的情况
    },

    commit() {
      alert("提交信息");
    },
    end_the_game() {
      alert("做个二次确认");
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
