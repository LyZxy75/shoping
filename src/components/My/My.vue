<template>
  <!--  Member  会员中心-->
  <div class="my">
    <div class="Member">会员中心</div>
    <div class="user">
      <van-icon name="setting-o" class="set_up" @click="personal" />
      <div class="Head_portrait">
        <img src="../../images/233.jpeg" alt="" />
      </div>
      <div class="Welcome">欢迎您：{{ user }}</div>
      <div class="sign" @click="sign" v-if="user">退出登录</div>
      <div class="sign" @click="sign" v-else>登录</div>
    </div>
    <div class="orderStatus">
      <div class="instate">
        <div class="icon"><img src="../../icon/待付款.svg" alt="" /></div>
        <div class="state">待付款</div>
      </div>
      <div class="instate">
        <div class="icon"><img src="../../icon/待发货.svg" alt="" /></div>
        <div class="state">待发货</div>
      </div>
      <div class="instate">
        <div class="icon"><img src="../../icon/待收货.svg" alt="" /></div>
        <div class="state">待收货</div>
      </div>
      <div class="instate" @click="evaluate">
        <div class="icon"><img src="../../icon/评价晒单.svg" alt="" /></div>
        <div class="state">评价</div>
      </div>
      <div class="instate" @click="already">
        <div class="icon"><img src="../../icon/已完成.svg" alt="" /></div>
        <div class="state">已完成</div>
      </div>
    </div>
    <div class="allOrders" @click="whole">
      <div class="instate">
        <div class="icon"><img src="../../icon/全部订单.svg" alt="" /></div>
        <div class="state">全部订单</div>
      </div>
      <van-icon name="arrow" class="Arrow" />
    </div>
    <div class="allOrders" @click="collection">
      <div class="instate">
        <div class="icon">
          <img src="../../icon/收藏商品-暂无.svg" alt="" />
        </div>
        <div class="state">收藏商品</div>
      </div>
      <van-icon name="arrow" class="Arrow" />
    </div>
    <div class="allOrders" @click="address">
      <div class="instate">
        <div class="icon"><img src="../../icon/地址管理.svg" alt="" /></div>
        <div class="state">地址管理</div>
      </div>
      <van-icon name="arrow" class="Arrow" />
    </div>
    <div class="allOrders" @click="browse">
      <div class="instate">
        <div class="icon"><img src="../../icon/最近浏览.svg" alt="" /></div>
        <div class="state">最近浏览</div>
      </div>
      <van-icon name="arrow" class="Arrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      flag: false,
      user: ""
    };
  },
  methods: {
    personal() {
      this.$router.push("/Personal");
    },
    sign() {
      if (!this.user) {
        this.$router.push("/Signin");
      } else {
        localStorage.removeItem("user");
        this.user = ''
        this.$toast.success('退出登录成功')
      }
    },

    evaluate() {
      this.$router.push('/Comment')
    },
    already() {
      this.$router.push("/Completed");
    },
    whole() {
      this.$router.push('/Myorder')
    },
    collection() {
      this.$router.push('/Collection')
    },
    address() {
      this.$router.push("/Address_list");
    },
    browse() {
      this.$router.push('/Recently')
    }
  },
  mounted() {
    // 用户名
    this.user = localStorage.getItem("user");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.my {
  .Member {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ffffff;
  }
  .user {
    margin-top: 40px;
    height: 200px;
    background: #e30c7b;
    color: #ffffff;

    .set_up {
      font-size: 20px;
      margin-top: 10px;
      margin-left: 90%;
    }
    .Head_portrait {
      margin-left: 50%;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-left: -30px;
      }
    }
    .Welcome {
      text-align: center;
      margin: 20px 0;
      font-weight: bold;
      font-size: 18px;
    }
    .sign {
      text-align: center;
      font-size: 14px;
    }
  }
  .orderStatus {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
    .instate {
      .icon {
        img {
          width: 30px;
          height: 30px;
        }
      }
      .state {
        padding-top: 10px;
        font-size: 14px;
      }
    }
  }
  .allOrders {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #f2f2f2;
    .instate {
      display: flex;
      .icon {
        img {
          width: 20px;
          height: 20px;
          margin-top: 5px;
        }
      }
      .state {
        line-height: 30px;
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .Arrow {
      line-height: 30px;
      color: #a7c2e5;
    }
  }
}
</style>
