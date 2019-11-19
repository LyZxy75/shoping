<template>
  <!--  商品详情评论-->
  <div>
    <div class="head">
      <van-tabs v-model="active" class="details">
        <van-tab title="商品详情"
          ><div v-html="detail" class="hand"></div
        ></van-tab>
        <van-tab title="商品评论">
          <div v-for="(item, index) in goodTwo" :key="index">
            <div class="comm">
              <!--  头像-->
              <div class="c-img">
                <img src="../../../images/233.jpeg" alt="" class="img" />
              </div>
              <!--            当不为匿名显示名字-->
              <div class="left">
                <div class="nav_details">
                  <div v-if="item.anonymous === false" class="anon">
                    <div v-for="(item1, index) in item.user" :key="index">
                      {{ item1.nickname }}:
                    </div>
                  </div>
                  <!--            当为匿名不显示名字-->

                  <div v-if="item.anonymous === true" class="anon">
                    {{ item.comment_nickname }}
                  </div>
                  <div class="time">
                    {{ item.comment_time }}
                  </div>
                </div>
                <div class="rate">
                  <van-rate
                    v-model="value"
                    :size="12"
                    color="#f44"
                    void-icon="star"
                    void-color="#eee"
                  ></van-rate>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!--    底部栏-->
      <div class="column">
        <van-goods-action class="bottom">
          <van-goods-action-icon
            icon="wap-home-o"
            text="首页"
            @click="Home"
          ></van-goods-action-icon>
          <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            info="5"
            @click="Cart"
          ></van-goods-action-icon>
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="onClickVehicle(goodOne.id)"
          ></van-goods-action-button>
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
          ></van-goods-action-button>
        </van-goods-action>
        <!--            立即购买弹框-->
        <van-popup v-model="show" position="bottom" :style="{ height: '38%' }">
          <!--        商品详情-->
          <div class="elastic">
            <div class="chart"><img :src="goodOne.image_path" alt="" /></div>
            <div class="commodity_n">
              <div class="div">{{ goodOne.name }}</div>
              <div class="red">￥{{ goodOne.present_price }}</div>
            </div>
            <van-icon name="close" @click="Jump" />
          </div>
          <!--        购买数量-->
          <div class="pur">
            <div class="number">
              <div class="sl">购买数量:</div>
              <div class="surplus">剩余 10000件 <span>每人限购50件</span></div>
            </div>
            <van-stepper v-model="value" button-size="25px" disable-input />
          </div>
          <!--        立即购买按钮-->
          <div class="diately">
            <van-button type="danger" @click="purchase">立即购买</van-button>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commoditydetails",
  components: {},
  props: {
    detail: {
      type: String,
      default: ""
    },
    goodOne: {
      type: Object
    },
    goodTwo: {
      type: Array
    }
  },
  data() {
    return {
      active: 2,
      show: false,
      value: 3,
      id: ""
    };
  },
  methods: {
    async onClickVehicle() {
      this.id = this.goodOne.id;
      try {
        let res = await this.$api.addShop(this.id);
        if (res.msg === "加入购物车成功") {
          this.$toast("添加成功，在购物车等你哦～");
        }
      } catch (e) {
        console.log(e);
      }
    },
    onClickButton() {
      this.show = true;
    },
    Home() {
      this.$router.push("/Home");
    },
    Cart() {
      this.$router.push("/Cart");
    },
    purchase() {
      this.goodOne.cid = this.goodOne.id;
      this.goodOne.count = this.value;
      this.goodOne.sum = this.goodOne.present_price * this.goodOne.count * 1
      // console.log(this.goodOne);
      this.$router.push({ name: "Settlement", query: { item: this.goodOne } });

    },
    Jump() {
      this.show = false;
    }
  },
  mounted() {
    console.log(this.goodTwo);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.head {
  margin-bottom: 50px;
}
.hand {
  /deep/ img {
    display: block;
  }
}
.column {
  .bottom {
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  }
}
.elastic {
  display: flex;

  .chart {
    img {
      width: 80px;
      height: 80px;
      background: white;
      position: fixed;
      bottom: 185px;
      right: 0;
      left: 4%;
      outline: 1px solid #f2f2f2;
    }
  }
  .commodity_n {
    font-size: 13px;
    margin-left: 100px;
    margin-top: 10px;

    .div {
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 10px;
    }
    .red {
      color: #ce272d;
      margin-left: 10px;
      margin-top: 15px;
    }
  }
  .van-icon {
    margin-left: 15%;
    margin-top: 3%;
  }
}
.pur {
  margin-top: 10%;
  margin-left: 4%;
  padding: 3% 4%;
  display: flex;
  outline: 1px solid #f2f2f2;
  font-size: 13px;
  .number {
    .sl {
    }
    .surplus {
      margin-top: 10%;
      margin-bottom: 2%;
      span {
        color: #ce272d;
      }
    }
  }
  .van-stepper {
    margin-left: 10%;
  }
}
.diately {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  .van-button {
    width: 100%;
  }
}
.comm {
  display: flex;
  margin: 10px 0;
  .c-img {
    margin-left: 3%;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%  ;
    }
  }
  .left{
    margin-left: 15px;
    .nav_details {
      display: flex;
      justify-content: space-between;
      width: 275px;
      .anon {
        white-space: nowrap;
      }
      .time {
        color: #a3a3a3;
        font-size: 12px;
        line-height: 16px;
        margin-left: 30%;
        white-space: nowrap;

      }
    }
    .rate {
      margin-top: 10px;
    }
  }
}
</style>
