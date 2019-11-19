<template>
  <div class="Commentdetails">
    <div class="address">
      <van-icon name="arrow-left" size="20px" @click="Previous" />
      <div class="top">评价中心</div>
    </div>
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
            v-model="item.rate"
            :size="14"
            color="#f44"
            void-icon="star"
            void-color="#eee"
          ></van-rate>
        </div>
      </div>
    </div>
    <div class="content">评价内容：{{ item.content }}</div>
    <div class="commodity" v-if="item.goods">
      <div class="b_img"><img :src="item.goods[0].image" alt="" /></div>
      <div class="name">{{ item.goods[0].name }}</div>
      <div class="shop" @click="shop(item.goods[0].id)"><img src="../../../images/shop.png" alt="" /></div>
    </div>
    <div class="van-buttons">
      <van-button type="primary">返回</van-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "Commentdetails",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      item: [],

    };
  },
  methods: {
    Previous() {
      this.$router.go(-1);
    },
    // 查询单条评论
    async getevaluateOne() {
      try {
        let res = await this.$api.evaluateOne(this.id);
        this.item = res.evaluateOne;
        // console.log(this.item);
      } catch (e) {
        console.log(e);
      }
    },
    // 加入购物车
    async shop() {
      this.id = this.item.goods[0].id;
      try {
        let res = await this.$api.addShop(this.id);
        console.log(res);
        if (res.msg === "加入购物车成功") {
          this.$toast("添加成功，在购物车等你哦～");
        }
      } catch (e) {
        console.log(e);
      }
    },

  },
  mounted() {
    // 接收评论中心传过来的值

    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getevaluateOne();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Commentdetails {
  .address {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;
    background: white;
    .van-icon {
      font-size: 20px;
      margin-left: 3%;
    }

    .top {
      margin-left: 35%;
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
        border-radius: 50%;
      }
    }
    .left {
      margin-left: 15px;
      .nav_details {
        width: 275px;
        .anon {
          white-space: nowrap;
          font-size: 14px;
        }
        .time {
          color: #a3a3a3;
          font-size: 12px;
          line-height: 16px;
          white-space: nowrap;
          display: flex;
          justify-content: flex-end;
        }
      }
      .rate {
      }
    }
  }
  .content {
    padding: 3% 3% 5%;
    border-bottom: 1px solid #f2f2f2;
    font-size: 14px;
  }
  .commodity {
    padding: 0 3%;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .b_img {
      margin-top: 20px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      margin-top: 25px;
      margin-left: -60px;
    }
    .shop {
      width: 40px;
      height: 40px;
      background: #ffe6e2;
      margin-top: 15px;
border-radius: 50%  ;
      position: relative;
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
        left: 50%;
        margin-left: -10px;
      }
    }
  }
  .van-buttons{
    text-align: center;
    position: fixed;
    bottom: 10%;
    right: 0;
    left: 0;
    .van-button{
      width: 90%;
      background: #44bb00;
    }
  }
}
</style>
