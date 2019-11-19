<template>
  <!--  登录/注册-->

  <div>
    <div class="background">
      <div class="return">
        <div class="icon"><van-icon name="arrow-left" @click="retreat" /></div>
      </div>
      <div class="card">
        <div class="sign">登录 / 注册</div>
        <div class="group">
          <van-cell-group>
            <van-field
              v-model="username"
              placeholder="USERNAME"
              label-width="50px"
            ></van-field>
          </van-cell-group>
        </div>
        <div class="group">
          <van-cell-group>
            <van-field
              v-model="password"
              type="password"
              placeholder="PASSWORD"
              label-width="50px"
            ></van-field>
          </van-cell-group>
        </div>
        <div class="group">
          <van-cell-group>
            <van-field
              v-model="iphone"
              placeholder="仅注册需要"
              label="手机号码"
              label-width="80px"
            ></van-field>
          </van-cell-group>
        </div>
        <div class="group">
          <van-cell-group>
            <van-field
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="仅注册需要"
              label-width="80px"
              size="large"
              input-align="center"
            >
              <van-button slot="button" size="small" type="primary"
                >发送验证码</van-button
              >
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell">
          <van-cell-group>
            <van-field
              v-model="code"
              label="验证码"
              placeholder="请输入验证码"
              label-width="80px"
              size="large"
            ></van-field>
          </van-cell-group>
          <span v-html="Averify" class="Verif" @click="Codes()"></span>
        </div>

        <van-row type="flex" class="user">
          <van-col span="12">
            <van-button type="primary" style="width: 50%;" @click="login"
              >登录</van-button
            >
          </van-col>
          <van-col span="12">
            <van-button type="danger" style="width: 50%;" @click="register"
              >注册</van-button
            >
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      iphone: "13978292828",
      sms: "4396",
      code: "",
      Averify: {}
    };
  },
  methods: {
    register() {
      this.$axios
        .req("api/register", {
          nickname: this.username,
          password: this.password,
          verify: this.code
        })
        .then(res => {
          if (res.msg === "请输入完整信息") {
            this.$toast("请输入完整信息");
          }
          if (res.msg === "用户名已存在") {
            this.$toast("用户已存在");
          }
          if (res.code === -2) {
            this.$toast("验证码错误");
          }
          if (res.code === 200) {
            this.$toast("注册成功");
            // 保存到本地 localStorage
            localStorage.setItem("user", this.username);
            this.$router.push("/Signin");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    login() {
      this.$axios
        .req("api/login", {
          nickname: this.username,
          password: this.password,
          verify: this.code
        })
        .then(res => {
          if (res.msg === "密码错误") {
            this.$toast("输入密码错误");
          }
          if (res.msg === "用户名错误") {
            this.$toast("输入用户名错误");
          }
          if (res.msg === "请输入完整信息") {
            this.$toast("请输入完整信息");
          }
          if (res.code === "") {
            this.$toast("请输入验证码");
          }
          if (res.code === -2) {
            this.$toast("验证码错误");
          }
          if (res.code === 200) {
            this.$toast("登录成功");
            // 保存到本地 localStorage
            localStorage.setItem("user", this.username);
            this.$router.push("/Home");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    Codes() {
      this.$axios
        .req("api/verify")
        .then(res => {
          this.Averify = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    retreat() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.Codes();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/*背景平铺*/
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-image: url("../../images/login.jpg");
  /*背景显示全部*/
  background-size: cover;
}
.card {
  margin: 25% auto 13%;
  width: 90%;
  height: 72.5%;
  background-color: white;
  /*背景虚化*/
  opacity: 0.8;
}
.sign {
  font-size: 25px;
  font-weight: 500;
  margin-left: 6%;
  padding-top: 6%;
}
.group {
  width: 90%;
  margin: 10% auto;
  border-bottom: 1px solid red;
}
.cell {
  width: 90%;
  margin-top: 10%;
  margin-left: 4%;
  display: flex;
}
.user {
  margin-top: 8%;
  margin-left: 6%;
}
.return {
  height: 40px;
  width: 40px;
  background: #787879;
  left: 5%;
  top: 2%;
  text-align: center;
  line-height: 40%;
  position: relative;
  border-radius: 50%;
  color: white;
}
.icon {
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -10px;
}
</style>
