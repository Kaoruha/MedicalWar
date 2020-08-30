<template>
  <div class="father">
    <div class="card center">
      <div class="left">
        <h2>Welcome</h2>
        <q-input class="input" dark outlined v-model="user" label="Username" placeholder="Good Good Study！"
                 hint="Please input your username." :dense="dense"></q-input>

        <q-input class="input" dark outlined v-model="pwd" label="Password" placeholder="Day Day UP！"
                 :type="isPwd ? 'password' : 'text'" hint="Please input your password." :dense="dense">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-btn unelevated rounded color="primary" label="Login Now" @click="login"/>
      </div>
      <div class="right">
        <img src="~assets/login_img.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import User from '../api/user.js'

  export default {
    name: 'List',
    components: {},
    data() {
      return {
        isPwd: true,
        dense: false,
        user: '',
        pwd: '',
      }
    },
    methods: {
      login() {
        const _this = this
        User.Login(this.user, this.pwd).then(function (response) {
          console.log('VUE=====')
          console.log(response)
          console.log('VUE=====')
          switch (response.code) {
            case 200:
              _this.$store.commit('authorization/updateToken', response.data)
              _this.$router.push('manager')
              break
            case 400:
              break
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  $radius: 14px;
  .center {
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .card {
    height: 500px;
    border-radius: $radius;
    box-shadow: 0px 0px 8px #212121;
    width: 800px;
    margin-top: 80px;
  }


  .left {
    background-color: #1E1E1E;
    border-radius: $radius 0 0 $radius;
    display: inline-block;
    height: 100%;
    width: 54%;
    padding: 0 40px;

    h2 {
      font-weight: 800;
      color: #E1E1E1;
    }

    .input {
      margin-bottom: 20px;
    }
  }


  .right {
    border-radius: 0 $radius $radius 0;
    background-color: red;
    display: inline-block;
    right: 0;
    height: 100%;
    width: 46%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.8s;
    }

    img:hover {
      color: #999;
      transform: scale(1.2);
    }
  }

  .father {
    background-image: linear-gradient(to bottom right, #4E4E4E, #2E2E2E);
    width: 100vw;
    height: 100vh;
    padding-top: 10px;
  }
</style>
