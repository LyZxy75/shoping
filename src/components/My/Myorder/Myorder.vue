<template>
  <!--    我的订单-->
  <div class="Completed">
    <div class="address">
      <van-icon
        name="arrow-left"
        color="#359bfb"
        size="20px"
        @click="Previous"
      />
      <div class="top">我的订单</div>
    </div>

    <!--    商品订单-->
    <div class="colour">
      <div class="card" v-for="(item, index) in complete" :key="index">
        <div class="number">
          <div>订单编号:{{ item.order_id }}</div>
          <div class="Comple">交易完成</div>
        </div>
        <!--                商品详情-->
        <div
          class="comm"
          v-for="(item1, index) in item.order_list"
          :key="index"
        >
          <div class="img">
            <img :src="item1.image_path" alt="" />
          </div>
          <div class="name">{{ item1.name }}</div>
          <div class="money">
            <div>￥{{ item1.present_price }}</div>
            <div class="numbe">x{{ item1.count }}</div>
          </div>
        </div>
        <!--                收货详情-->
        <div class="goods">
          <div>创建时间：{{ item.add_time }}</div>
          <div>收货地址：{{ item.address }}</div>
          <div>
            共{{ item.order_list.length }}件商品
            <span> 合计：{{ item.mallPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Myorder",
  components: {},
  props: {},
  data() {
    return {
      complete: []
    };
  },
  methods: {
    // 返回会员中心
    Previous() {
      this.$router.push("My");
    },
    // 订单查询
    getMyOrder() {
      this.$axios
        .req("api/myOrder")
        .then(res => {
          this.complete = res.list;
          // console.log(this.complete);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getMyOrder();
    // 查询用户订单数量
    this.$axios.req('api/myOrder/orderNum').then(res =>{
      console.log(res);
    })
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Completed {
  background: #f2f2f2;

  .address {
    display: flex;
    outline: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;
    background: white;
    .van-icon {
      font-size: 20px;
      margin-left: 3%;
      color: #359bfb;
    }
    .top {
      margin-left: 35%;
    }
  }
  .colour {
    .card {
      background: white;
      margin: 4% 3% 3%;
      padding: 0 3%;
      border-radius: 12px;
      font-size: 13px;
      .number {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        justify-content: space-between;
        .Comple{
          color: #da7246;
        }
      }
      .comm {
        display: flex;
        padding: 5% 0 3%;
        justify-content: space-between;
        border-bottom: 1px solid #f2f2f2;
        .img {
          background: white;
          border: 1px solid #f2f2f2;
          border-radius: 8px;
          img {
            height: 80px;
            width: 80px;
          }
        }
        .name {
          line-height: 20px;
        }
        .money {
          line-height: 20px;
          .numbe {
            display: flex;
            justify-content: flex-end;
            color: #c8c8c8;
          }
        }
      }
      .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        line-height: 25px;
      }
    }
  }
}
</style>
