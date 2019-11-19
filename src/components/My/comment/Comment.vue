<template>
  <div class="Comment">
    <div class="address">
      <van-icon
        name="arrow-left"
        color="#359bfb"
        size="20px"
        @click="Previous"
      />
      <div class="top">评价中心</div>
    </div>
    <div class="banner"></div>
    <div class="state">
      <!--            动态绑定:class-->
      <div class="user" @click="evaluate" :class="{ red: stay === true }">
        待评价
      </div>
      <div class="user" @click="evaluate" :class="{ red: stay === false }">
        已评价
      </div>
    </div>
    <!--      待评价-->
    <div v-if="stay === true">
      <div v-for="(item, index) in review" :key="index" class="eval">
        <div class="commodity">
          <img :src="item.image_path" alt="" />
        </div>
        <div class="name">
          <div>{{ item.name }}</div>
          <div class="luate" @click="core(item)">
            <van-icon name="chat" />
            评论晒单
          </div>
        </div>
      </div>
    </div>
    <!--      已评价-->
    <div v-else>
      <div class="eval" v-for="(item, index) in already" :key="index">
        <div class="commodity">
          <img :src="item.goods[0].image_path" alt="" />
        </div>
        <div class="name">
          <div>{{ item.goods[0].name }}</div>
          <div class="luate" @click="details(item)">

              <van-icon name="chat" />
              评论详情

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {},
  props: {},
  data() {
    return {
      stay: false,
      review: [],
      already: []
    };
  },
  methods: {
    // 返回上一页
    Previous() {
      this.$router.push("My");
    },
    evaluate() {
      if (this.stay === false) {
        this.stay = true;
        // 查询待评价
        this.$axios
          .req("api/tobeEvaluated")
          .then(res => {
            this.review = res.data.list;
            // console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.stay = false;
        // 查询已评价
        this.$axios
          .req("api/alreadyEvaluated")
          .then(res => {
            this.already = res.data.list;
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    // 路由传值跳转晒单评论页面
    core(item) {
      this.$router.push({ name: "Center", query: { item: item } });
    },
    // 路由传值跳转单条评论详情页面
    details(item) {
      this.$router.push({ name: "Commentdetails", query: { id: item._id } });
    }
  },
  mounted() {
    this.evaluate();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Comment {
  width: 100%;
  position: relative;
  .address {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
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
  .banner {
    margin-top: 41px;
    background-image: url("../../../images/evaluate.jpg");
    width: 100%;
    height: 150px;
    background-size: cover;
    /*图片全部显示*/
  }
  .state {
    display: flex;
    background: white;
    font-size: 14px;
    height: 40px;
    width: 90%;
    justify-content: space-around;
    position: absolute;
    line-height: 40px;
    margin: 0 auto;
    margin-top: -21px;
    margin-left: 5%;
    border-radius: 6px;
    border: 1px solid #f2f2f2;
    .user {

    }
  }
  .eval {
    display: flex;
    padding: 25px 0 0 20px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 14px;
    position: relative;
    .commodity {

      img {
        width: 70px;
        height: 70px;
      }
    }
    .name {
      margin-left: 30px;
      .luate {
        height: 25px;

        width: 85px;
        position: absolute;
        bottom: 5px;
        right: 10px;
        border: 1px solid red;
        align-items: center;
        text-align: center;
        color: red;
        border-radius: 35px;

          .van-icon {
            line-height: 25px;
          }

      }
    }
  }
}
  .red{
    border-bottom: 2px solid red;

  }
</style>
