<template>
  <div class="container">
    <h4>User Manager</h4>
      <q-table
        title="User List"
        :data="data"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn class="btn-add" color="primary" rounded icon="add" label="Add User" @click="is_add_show = true"/>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="account" :props="props">
              {{ props.row.account }}
            </q-td>
            <q-td key="description" :props="props">
              {{ props.row.description }}
              <q-popup-edit v-model="props.row.description" title="Update Description" buttons persistent>
                <q-input type="input" v-model="props.row.description" dense autofocus hint="Update Description"/>
              </q-popup-edit>
            </q-td>
            <q-td key="recent" :props="props">
              {{ props.row.recent }}
            </q-td>
            <q-td key="operation" :props="props">
              <q-btn flat color="white" text-color="red" label="Delete"
                     @click="show_delete_dialog(props.row.id, props.row.account)"/>
            </q-td>
          </q-tr>
        </template>

      </q-table>

      <!--新增用户弹窗-->
      <q-dialog v-model="is_add_show" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Add User</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="account" autofocus @keyup.enter="prompt = false" placeholder="Account"/>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="password" @keyup.enter="prompt = false" placeholder="Password"/>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup/>
            <q-btn flat label="Add" v-close-popup @click="add_user"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!--用户删除弹窗-->
      <q-dialog v-model="is_delete_show" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Delete User</div>
          </q-card-section>


          <q-card-section class="q-pt-none del-dialog">
            <p class="msg">Do you really want to delete</p>
            <p class="name">{{ready_to_delete.account}}?</p>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup/>
            <q-btn flat color="red" label="Delete" v-close-popup @click="delete_user(ready_to_delete.id)"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>
</template>

<script>
  import User from '../api/user.js'

  export default {
    name: "User",
    data() {
      return {
        is_add_show: false,
        is_delete_show: false,
        ready_to_delete: {
          "id": 0,
          "account": "god"
        },
        account: '',
        password: '',
        filter: '',
        loading: false,
        pagination: {
          sortBy: 'id',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 10
        },
        columns: [
          {
            name: 'id',
            required: true,
            label: 'ID',
            align: 'left',
            field: row => row.id,
            style: 'width: 10px',
            headerStyle: 'width: 10px',
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'account',
            required: true,
            label: 'Account',
            align: 'left',
            field: row => row.account,
            style: "width:200px",
            format: val => `${val}`,
            sortable: false
          },
          {
            name: 'description',
            required: false,
            label: 'Description',
            align: 'left',
            field: row => row.description,
            style: "width:200px",
            format: val => `${val}`,
            sortable: false
          },
          {
            name: 'recent',
            required: true,
            label: 'Recent',
            align: 'left',
            field: row => row.recent,
            style: "width:200px",
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'operation',
            required: false,
            label: 'Operation',
            align: 'right',
            style: "width:200px",
          },
        ],
        data: [],
        original: []
      }
    },
    mounted() {
      // get initial data from server (1st page)
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    methods: {
      onRequest(props) {
        const {page, rowsPerPage, sortBy, descending} = props.pagination
        const filter = props.filter

        this.loading = true
        // Update original
        this.get_user(filter, descending)
        // emulate server
        setTimeout(() => {
          // update rowsCount with appropriate value
          this.pagination.rowsNumber = this.getRowsNumberCount(filter)

          // get all rows if "All" (0) is selected
          const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

          // calculate starting row of data
          const startRow = (page - 1) * rowsPerPage

          // fetch data from "server"
          const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

          // clear out existing data and add new
          this.data.splice(0, this.data.length, ...returnedData)

          // don't forget to update local pagination object
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending

          // ...and turn of loading indicator
          this.loading = false
        }, 1500)
      },

      // emulate ajax call
      // SELECT * FROM ... WHERE...LIMIT...
      fetchFromServer(startRow, count, filter, sortBy, descending) {
        const data = filter
          ? this.original.filter(row => row.account.includes(filter))
          : this.original.slice()

        // handle sortBy
        if (sortBy) {
          const sortFn = sortBy === 'id'
            ? (descending
                ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
                : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            )
            : (descending
                ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
                : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            )
          data.sort(sortFn)
        }

        return data.slice(startRow, startRow + count)
      },

      // emulate 'SELECT count(*) FROM ...WHERE...'
      getRowsNumberCount(filter) {
        if (!filter) {
          return this.original.length
        }
        let count = 0
        this.original.forEach((treat) => {
          if (treat.account.includes(filter)) {
            ++count
          }
        })
        return count
      },

      get_user(filter, descending) {
        this.original = []
        const _this = this
        User.Filter(filter, descending).then(function (response) {
          const data = response.data
          console.log(response)
          for (let i = 0; i < data.length; i++) {
            _this.original.push({
              "account": data[i]["account"],
              "id": data[i]["id"],
              "description": data[i]["description"],
              "recent": data[i]["update"],
            })
          }
        })
      },

      clear_add_dialog() {
        this.account = ''
        this.password = ''
      },

      add_user() {
        const _this = this
        User.Register(this.account, this.password).then(function (response) {
          switch (response.code) {
            case 200:
              _this.onRequest({
                pagination: _this.pagination,
                filter: _this.filter
              })

              break
            case 600:
              break
            case 601:
              break
          }
        })
        this.clear_add_dialog()
      },

      show_delete_dialog(id, account) {
        this.is_delete_show = true
        this.ready_to_delete.id = id
        this.ready_to_delete.account = account
      },

      delete_user(id) {
        const _this = this
        User.Delete(id).then(function (response) {
          switch (response.code) {
            case 200:
              _this.onRequest({
                pagination: _this.pagination,
                filter: _this.filter
              })
              break
          }
        })
      },

      test() {
        this.$router.push('/login')
      }
    }
  }
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
      color: #F54336;
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
