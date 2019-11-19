<template>
  <!--    购物车-->
  <div class="cart">
    <!--      顶部-->
    <div class="vehicle">
      购物车
    </div>
    <!--      确认订单-->
    <div class="order">
      <div class="cancel">
        <div>
          <input type="checkbox" v-model="choice" @change="allElection" />
        </div>
        <div class="election" v-if="choice === false">全选</div>
        <div class="election" v-if="choice === true">取消全选</div>
      </div>
      <div class="total">
        <div class="Total">
          合计：<span class="money">￥{{ sum }}</span>
        </div>
        <div>请确认订单</div>
      </div>
    </div>
    <!--      按钮-->
    <div class="button">
      <div class="del">
        <van-button type="primary" @click="dele">删除</van-button>
      </div>
      <div class="Settlement">
        <van-button type="primary" @click="Settlement">去结算</van-button>
      </div>
    </div>
    <!--    购物车列表-->
    <div v-for="(item, index) in card" :key="index" class="commodity">
      <!--     选项   商品图片-->
      <div class="picture">
        <div class="option">
          <input
            type="checkbox"
            v-model="item.check"
            @change="singleElection"
          />
        </div>
        <div class="img"><img :src="item.image_path" alt="" /></div>
      </div>
      <!--        商品名 价钱-->
      <div class="details">
        <div>{{ item.name }}</div>
        <div class="money_l">
          <div>￥{{ (item.present_price * item.count * 1).toFixed(2) }}</div>
          <div class="number">
            <van-stepper
              input-width="30px"
              button-size="20px"
              @change="increase(item)"
              v-model="item.count"
            ></van-stepper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Vehicle",
  components: {},
  props: {},
  data() {
    return {
      card: [],
      choice: false,
      arr: [],
      item: []
    };
  },
  methods: {
    // 查询获取购物车数据
    async getCard() {
      try {
        let res = await this.$api.getCard();
        this.card = res.shopList;

        console.log(this.card);
      } catch (e) {
        console.log(e);
      }
    },
    // 全选
    allElection() {
      this.card.map(item => {
        item.check = this.choice;
        // console.log(item.check);
      });
    },
    // 单选
    singleElection() {
      this.choice = this.card.every(item => {
        return item.check === true;
      });
    },
    // 加减商品
    increase(item) {
      // console.log(item);
      this.$axios
        .req("api/editCart", {
          id: item.cid,
          count: item.count,
          mallPrice: item.mallPrice
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 删除
    dele() {
      this.card.map(item => {
        if (item.check === true) {
          this.arr.push(item.cid);
        }
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除商品吗?"
          })
          .then(() => {
            axios
              .post("api/deleteShop", this.arr)
              .then(res => {
                this.getCard();
                console.log(res);
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(() => {});
      });
      // console.log(this.arr);
    },
    // 跳转结算页面
    Settlement() {
      this.card.map(item => {
        if (item.check === true) {
          this.item.push(item);
        }
      });

      this.$router.push({ name: "Settlement", query: { item: this.item } });
      // console.log(this.item);
    }
  },
  mounted() {
    this.getCard();
  },
  created() {},
  filters: {},
  computed: {
    sum() {
      let val = 0;
      this.card.map(item => {
        if (item.check === true) {
          val += (item.count * item.mallPrice * 1).toFixed(2) * 1;
        }
      });
      return val;
    },
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.cart {
  .vehicle {
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .order {
    display: flex;
    outline: 1px solid #f2f2f2;
    height: 80px;
    font-size: 14px;
    .cancel {
      display: flex;
      text-align: center;
      div {
        line-height: 80px;
        input {
          display: block;
          width: 20px;
          height: 20px;
          background: #ff4c38;
          position: relative;
          top: 50%;
          margin-top: -10px;
          margin-left: 10px;
        }
      }
      .election {
        margin-left: 5px;
      }
    }
    .total {
      margin-left: 35%;
      .Total {
        margin: 15px 0;
        span {
          color: #ff4c38;
        }
      }
    }
  }
  .button {
    display: flex;
    margin-left: 60%;
    margin-top: 5px;
    .del {
      button {
        background: #e30c7b;
        border-color: #e30c7b;
      }
    }
    .Settlement {
      button {
        margin-left: 5px;
        background: #e30c7b;
        border-color: #e30c7b;
      }
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
        margin-left: 20px;
        background: white;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  .details {
    font-size: 14px;
    margin-left: 15px;
    color: #ff4c38;
    width: 200px;
    .money_l {
      display: flex;
      margin-top: 25%;
      line-height: 20px;
      justify-content: space-between;
    }
    .number {
      .van-stepper {
      }
    }
  }
}
</style>
