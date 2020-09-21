<template>
  <div class="father">
    <div class="card center">
      <div class="left">
        <h2>Welcome</h2>
        <q-input
          class="input"
          dark
          outlined
          v-model="user"
          label="Username"
          placeholder="Good Good Study！"
          hint="Please input your username."
          :dense="dense"
        ></q-input>

        <q-input
          class="input"
          dark
          outlined
          v-model="pwd"
          label="Password"
          placeholder="Day Day UP！"
          :type="isPwd ? 'password' : 'text'"
          hint="Please input your password."
          :dense="dense"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-btn unelevated rounded color="primary" label="Login Now" @click="login" />
      </div>
      <div class="right">
        <img src="~assets/login_img.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
import User from "../api/user.js";
import { Notify } from "quasar";
export default {
  name: "List",
  components: {},
  data() {
    return {
      isPwd: true,
      dense: false,
      user: "",
      pwd: "",
    };
  },
  methods: {
    login() {
      const _this = this;
      User.Login(this.user, this.pwd).then(function (response) {
        console.log("VUE=====");
        console.log(response);
        console.log("VUE=====");
        switch (response.code) {
          default:
            _this.$q.notify({
              message: "用户名或密码错误",
              // 可用的值: 'positive', 'negative', 'warning', 'info'
              type: "negative",
              textColor: "white",
              // 'top', 'left', 'bottom-left'等
              position: "top",
            });
            break;
          case 200:
            _this.$store.commit("authorization/updateToken", response.data);
            _this.$router.push("manager");
            _this.$q.notify({
              message: "登录成功",
              // 可用的值: 'positive', 'negative', 'warning', 'info'
              type: "positive",
              textColor: "white",
              // 'top', 'left', 'bottom-left'等
              position: "top",
            });
            break;
          case 400:
            break;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
$radius: 16px;
.center {
  margin-left: 50%;
  transform: translateX(-50%);
}

.card {
  height: 500px;
  border-radius: $radius;
  box-shadow: 0px 0px $radius #212121;
  width: 800px;
  margin-top: 100px;
}

.left {
  background-color: #1e1e1e;
  border-radius: $radius 0 0 $radius;
  display: inline-block;
  height: 100%;
  width: 54%;
  padding: 0 40px;

  h2 {
    font-weight: 800;
    color: #e1e1e1;
  }

  .input {
    margin-bottom: 20px;
  }
}

.right {
  border-radius: 0 $radius $radius 0;
  display: inline-block;
  position: absolute;
  right: 0;
  height: 100%;
  width: 46%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    transition: all 0.15s;
  }

  img:hover {
    transform: scale(1.3);
  }
}

.father {
  background-image: linear-gradient(to bottom right, #4f4f4f, #2e2e2e);
  // width: 99.1vw;
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
}
</style>
