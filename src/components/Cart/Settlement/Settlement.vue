<template>
  <div class="Order ">
    <!--    订单结算-->
    <div class="Settlement">
      <van-icon name="arrow-left" @click="Previous" />
      <div class="top">订单结算</div>
    </div>
    <!--    收货地址-->
    <div class="address" v-if="defaultAdd">
      <div class="place"><van-icon name="location-o" /></div>
      <div class="goods">
        <div class="receivingGoods">
          <div class="Consignee">收货人:{{ defaultAdd.name }}</div>
          <div class="number">{{ defaultAdd.tel }}</div>
        </div>
        <div class="add_ress">收货地址:{{ defaultAdd.address }}</div>
        <div class="tips">(收货不便时,可选择免费待收货服务)</div>
      </div>

      <div class="modify"><van-icon name="arrow" @click="Address_list" /></div>
    </div>
    <div v-else @click="add" class="add">点击添加收货地址</div>
    <div class="caitiao"><img src="../../../images/caitiao.jpg" alt="" /></div>
    <!--    商品列表-->
    <div v-for="(item, index) in list" :key="index" class="commodity">
      <!--     选项   商品图片-->
      <div class="picture">
        <div class="img"><img :src="item.image_path" alt="" /></div>
      </div>
      <!--        商品名 价钱-->
      <div class="details">
        <div class="name">{{ item.name }}</div>
        <div class="money_l">
          <div>￥{{ item.present_price }}</div>
          <div class="number">X{{ item.count }}</div>
        </div>
      </div>
    </div>
    <!--    底部提交-->
    <div class="total">
      <div class="Total">
        合计：
        <span class="money" v-if="list.length === 1">￥{{ list[0].sum }}</span>
        <span class="money" v-else>￥{{ sum }}</span>
      </div>
      <van-button type="danger" @click="placeOrder">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Settlement",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      idDirect: "",
      defaultAdd: [],
      item: {
        id: [],
        orderId: [],
        count: 0
      },
      count: 0,
      id: []
    };
  },
  methods: {
    // 返回
    Previous() {
      this.$router.go(-1);
    },
    // 跳转地址列表
    Address_list() {
      this.$router.push("/Address_list");
    },
    placeOrder() {
      this.item.address = this.defaultAdd.address;
      this.item.tel = this.defaultAdd.tel;
      this.item.totalPrice = this.list.totalPrice;
      this.item.idDirect = this.idDirect;
      this.list.map(item => {
        this.count += item.count;
      });
      this.item.count = this.count;

      console.log(this.item.orderId);
      axios.post("api/order", this.item).then(res => {
        this.$toast.success(res.msg);
        this.$router.push("/");
        console.log(res);
      });
    },
    // 跳转地址列表 添加地址
    add() {
      this.$router.push("/Address_list");
    }
  },
  mounted() {
    // 查询默认收货地址
    this.$axios
      .req("api/getDefaultAddress")
      .then(res => {
        this.defaultAdd = res.defaultAdd;
        console.log(this.defaultAdd);
      })
      .catch(e => {
        console.log(e);
      });
    // 接收数据

    // console.log(this.list);
  },
  created() {},

  filters: {},
  computed: {
    sum() {
      let val = 0;
      if (this.list) {
        this.list.map(item => {
          val += (item.count * item.mallPrice).toFixed(2) * 1;
        });
      }
      return val;
    }
  },
  watch: {},
  directives: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === "/Cart") {
        vm.idDirect = false;
        vm.list = vm.$route.query.item;
        console.log(vm.list);
        vm.item.count = vm.list.count;
        vm.list.forEach(item => {
          vm.item.orderId.push(item.cid);
        });
      } else if (from.path === "/Details") {
        vm.idDirect = true;
        vm.list.push(vm.$route.query.item);
        console.log(vm.list);
        // vm.item.count = 1;
        vm.item.orderId.push(vm.list[0].id);
        // console.log(vm.item.orderId);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.Order {
  .Settlement {
    display: flex;
    outline: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;

    .van-icon {
      font-size: 20px;
      margin-left: 3%;
    }
    .top {
      margin-left: 38%;
    }
  }
  .address {
    display: flex;
    padding: 5% 2% 1%;
    align-items: center;
    .place {
      .van-icon {
        font-size: 30px;
      }
    }
    .goods {
      margin-left: 4%;
      .receivingGoods {
        display: flex;
        .Consignee {
          white-space: nowrap;
        }
        .number {
          margin-left: 40%;
        }
      }
      .add_ress {
        margin: 7% 0 5%;
        font-size: 14px;
      }
      .tips {
        font-size: 14px;
        color: #f9cc9c;
        white-space: nowrap;
      }
    }
    .modify {
      margin-left: 21%;
      .van-icon {
        font-size: 20px;
        color: #865a21;
      }
    }
  }
  .add {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 13px;
  }
  .caitiao {
    img {
      height: 5px;
      width: 100%;
    }
  }
  .commodity {
    border-bottom: 1px solid #f2f2f2;
    margin: 20px 5px;
    padding-bottom: 20px;
    display: flex;
    margin-bottom: 50px;
    .picture {
      display: flex;
      .option {
        align-items: center;
        input {
          display: block;
          width: 20px;
          height: 20px;
          border-color: #ff4c38;
          position: relative;
          top: 50%;
          margin-top: -10px;
          align-items: center;
        }
      }
      .img {
        outline: 1px solid #f2f2f2;
        margin-left: 10px;
        background: white;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
    .details {
      font-size: 14px;
      margin-left: 20px;
      color: #ff4c38;
      width: 67%;
      .name {
        margin-top: 5px;
      }
      .money_l {
        display: flex;
        margin-top: 13%;
        line-height: 20px;
        justify-content: space-between;
      }
      .number {
        color: black;
      }
    }
  }
  .total {
    position: fixed;
    display: flex;
    bottom: 0;
    right: 0;
    background: white;

    .Total {
      margin: 15px 0;
      margin-right: 10px;
      .money {
        color: #ff4c38;
      }
    }
  }
}
</style>
