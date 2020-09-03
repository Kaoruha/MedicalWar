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
        </q-input> -->
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
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="scale" :props="props">{{ props.row.scale }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="share" :props="props">{{ props.row.share }}</q-td>

          <q-td key="hc" :props="props">
            {{ props.row.hc }}
            <q-popup-edit v-model="props.row.hc" title="Update HC" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.hc"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="advertising" :props="props">
            {{ props.row.advertising }}
            <q-popup-edit
              v-model="props.row.advertising"
              title="Update Advertising"
              buttons
              persistent
            >
              <q-input
                type="number"
                v-model="props.row.advertising"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="product_a" :props="props">
            {{ props.row.product_a }}
            <q-popup-edit v-model="props.row.product_a" title="Update Product A" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.product_a"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="product_b" :props="props">
            {{ props.row.product_b }}
            <q-popup-edit v-model="props.row.product_b" title="Update Product B" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.product_b"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="product_c" :props="props">
            {{ props.row.product_c }}
            <q-popup-edit v-model="props.row.product_c" title="Update Product C" buttons persistent>
              <q-input
                type="number"
                v-model="props.row.product_c"
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
          <div class="text-h6">Delete User</div>
        </q-card-section>

        <q-card-section class="q-pt-none del-dialog">
          <p class="msg">Do you really want to delete</p>
          <p class="name">{{ready_to_submit.name}}?</p>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="red" label="Submit" v-close-popup @click="submit(ready_to_submit.id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Hospital from "../api/hospital.js";
import Game from "../api/game.js";

export default {
  name: "Game_player",
  data() {
    return {
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
      game_id: 0,
      company_id: 0,
      company_name: "公司1",
      round: 0,
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
          field: (row) => row.name,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "scale",
          required: true,
          label: "Scale",
          align: "left",
          field: (row) => row.scale,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "type",
          required: true,
          label: "Type",
          align: "left",
          field: (row) => row.type,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "share",
          required: true,
          label: "Share",
          align: "left",
          field: (row) => row.share,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "hc",
          required: false,
          label: "HC",
          align: "left",
          field: (row) => row.hc,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "advertising",
          required: false,
          label: "Advertising",
          align: "left",
          field: (row) => row.advertising,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "product_a",
          required: true,
          label: "ProductA Price",
          align: "left",
          field: (row) => row.product_a,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "product_b",
          required: true,
          label: "ProductB Price",
          align: "left",
          field: (row) => row.product_b,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "product_c",
          required: true,
          label: "ProductC Price",
          align: "left",
          field: (row) => row.product_c,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "channel",
          required: true,
          label: "Channel",
          align: "left",
          field: (row) => row.channel,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "permission",
          required: true,
          label: "Permission",
          align: "left",
          field: (row) => row.permission,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "info",
          required: true,
          label: "Info",
          align: "left",
          field: (row) => row.info,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      data: [
        {
          id: 0,
          name: "默认医院",
          hc: 0,
          advertising: 1000,
          product_a: 1100,
          product_b: 2000,
          product_c: 1300,
          channel: 1,
          permission: 2,
          info: 3,
        },
        {
          id: 0,
          name: "默认医院",
          hc: 0,
          advertising: 1000,
          product_a: 1100,
          product_b: 2000,
          product_c: 1300,
          channel: 1,
          permission: 2,
          info: 3,
        },
        {
          id: 0,
          name: "默认医院",
          hc: 0,
          advertising: 1000,
          product_a: 1100,
          product_b: 2000,
          product_c: 1300,
          channel: 1,
          permission: 2,
          info: 3,
        },
        {
          id: 0,
          name: "默认医院",
          hc: 0,
          advertising: 1000,
          product_a: 1100,
          product_b: 2000,
          product_c: 1300,
          channel: 1,
          permission: 2,
          info: 3,
        },
      ],
      original: [],
    };
  },
  mounted() {
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
      this.get_hospital(filter, descending);
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

    get_hospital(filter, descending) {
      this.original = [];
      const _this = this;
      Hospital.Filter(filter, descending).then((response) => {
        const { data } = response;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          _this.original.push({
            name: data[i].name,
            id: data[i].id,
            type: data[i].type,
            scale: data[i].scale,
            hc: 0,
            share: 0,
            advertising: 0,
            product_a: 0,
            product_b: 0,
            product_c: 0,
            channel: 0,
            permission: 0,
            info: 0,
          });
        }
      });
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

    delete_game(id) {
      const _this = this;
      Game.Delete(id).then((response) => {
        switch (response.code) {
          default:
            break;
          case 200:
            _this.onRequest({
              pagination: _this.pagination,
              filter: _this.filter,
            });
            break;
        }
      });
    },

    enter_game(id) {
      alert("进入游戏" + "id:" + id);
    },

    submit() {
      const _this = this;
      let strategy_data = [1];
      for (let i = 0; i < this.data.length; i++) {
          strategy_data.push({
            id: _this.data[i].id,
            hc: _this.data[i].hc,
            advertising: _this.data[i].advertising,
            product_a: _this.data[i].product_a,
            product_b: _this.data[i].product_b,
            product_c: _this.data[i].product_c,
            channel: _this.data[i].channel,
            permission: _this.data[i].permission,
            info: _this.data[i].info,
          });
        }
      Game.Submit(_this.game_id, _this.company_id, strategy_data).then((response) => {
        switch (response.code) {
          default:
            break;
          case 200:
            alert('提交成功')
            break;
        }
      });
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
