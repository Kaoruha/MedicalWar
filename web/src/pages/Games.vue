<template>
  <div class="container">
    <h4>WarGame Manager</h4>
    <q-table
      title="WarGame List"
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
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="btn-add"
          color="primary"
          rounded
          icon="add"
          label="Add Game"
          @click="is_add_show = true"
        />
      </template>
      <!--搜索框插槽-->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="uid" :props="props">{{ props.row.uid }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
            <q-popup-edit
              v-model="props.row.description"
              title="Update Description"
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
          <q-td key="round" :props="props">{{ props.row.round }}</q-td>
          <q-td key="recent" :props="props">{{ props.row.recent }}</q-td>
          <q-td key="operation" :props="props">
            <q-btn
              flat
              text-color="primay"
              label="ENTER"
              @click="enter_game(props.row.uid)"
            />
            <q-btn
              flat
              color="white"
              text-color="red"
              label="Delete"
              @click="show_delete_dialog(props.row.uid, props.row.name)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!--新建一局游戏弹窗-->
    <q-dialog v-model="is_add_show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Create Game</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="name"
            autofocus
            @keyup.enter="prompt = false"
            placeholder="Name at least 4 letters."
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="description"
            @keyup.enter="prompt = false"
            placeholder="Description"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" v-close-popup @click="creat_game" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--删除弹窗-->
    <q-dialog v-model="is_delete_show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Delete Game</div>
        </q-card-section>

        <q-card-section class="q-pt-none del-dialog">
          <p class="msg">Do you really want to delete</p>
          <p class="name">{{ ready_to_delete.name }}?</p>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            color="red"
            label="Delete"
            v-close-popup
            @click="delete_game(ready_to_delete.uid)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Game from "../api/game.js";

export default {
  name: "Game",
  data() {
    return {
      is_add_show: false,
      is_delete_show: false,
      ready_to_delete: {
        uid: 0,
        name: "god",
      },
      name: "",
      description: "",
      filter: "",
      loading: false,
      pagination: {
        sortBy: "uid",
        descending: true,
        page: 1,
        rowsPerPage: 25,
        rowsNumber: 25,
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
          label: "Name",
          align: "left",
          field: (row) => row.name,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "description",
          required: false,
          label: "Description",
          align: "left",
          field: (row) => row.description,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "round",
          required: false,
          label: "Round",
          align: "left",
          field: (row) => row.description,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "recent",
          required: true,
          label: "Recent",
          align: "left",
          field: (row) => row.recent,
          style: "width:200px",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "operation",
          required: false,
          label: "Operation",
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
      this.get_game(filter, descending);
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
        ? this.original.filter((row) => row.name.includes(filter))
        : this.original.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "uid"
            ? descending
              ? (a, b) => (a.uid > b.uid ? -1 : a.uid < b.uid ? 1 : 0)
              : (a, b) => (a.uid > b.uid ? 1 : a.uid < b.uid ? -1 : 0)
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
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    },

    get_game(filter, descending) {
      this.original = [];
      const _this = this;
      Game.Filter(filter, descending).then((response) => {
        const { data } = response;
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          _this.original.push({
            name: data[i].name,
            uid: data[i].id,
            description: data[i].description,
            round: data[i].rounds,
            recent: data[i].update,
          });
        }
      });
    },

    clear_add_dialog() {
      this.name = "";
      this.description = "";
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
            _this.name = "";
            _this.description = "";
            break;
          case 600:
            break;
          case 601:
            break;
        }
      });
      this.clear_add_dialog();
    },

    show_delete_dialog(uid, name) {
      this.is_delete_show = true;
      this.ready_to_delete.uid = uid;
      this.ready_to_delete.name = name;
    },

    delete_game(uid) {
      const _this = this;
      Game.Delete(uid).then((response) => {
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

    enter_game(uid) {
      const _this = this;
      this.$store.commit("current_game/updateCurrentGameID", uid);
      Game.GetGameInfo(uid).then((response) => {
        const { data } = response;
        _this.$store.commit("current_game/updateCurrentRounds", data.rounds);
        this.$router.push("game_host");
      });

      // alert(this.$store.state.current_game.xxx;)
      
    },
  },
};
</script>

<style scoped lang="scss">
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
