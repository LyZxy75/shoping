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
    <div class="score">
      <div class="picture"><img :src="item.image_path" alt="" /></div>
      <div class="details">
       <div> 商品评分</div>
        <div class="value">
          <van-rate
              v-model="value"
              :size="20"
              allow-half
              color="#f44"
              void-icon="star"
              void-color="#eee"
          />
        </div>
      </div>
    </div>


    <div class="user">
      <textarea
        name=""
        id=""
        cols="40"
        rows="10"
        placeholder="说说你的购买感受吧～～"
        v-model="text"
      ></textarea>
    </div>
    <div class="anony">
      <van-checkbox v-model="checked" icon-size="23px">匿名评价</van-checkbox>
    </div>
    <div class="Subm">
      <van-button type="primary" @click="subcomment">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Center",
  components: {},
  props: {},
  data() {
    return {
      value: 4.5,
      item: [],
      checked: false,
      text: ""
    };
  },
  methods: {
    Previous() {
      this.$router.go(-1);
    },
    // 商品评论
    async subcomment() {
      try {
        let arr = [];
        arr.id = this.item.cid;
        arr.order_id = this.item.order_id;
        arr._id = this.item._id;
        arr.anonymous = this.checked;
        arr.content = this.text;
        arr.rate = this.value;
        arr.image = [];
        console.log(arr);
        let res = await this.$api.comment(arr);
        this.$toast.success("评论成功");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    // 接收评论中心传过来的值
    this.item = this.$route.query.item;
    console.log(this.item);
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
  background: #f7f7f7;
  height: 100%;

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
      color: #359bfb;
    }

    .top {
      margin-left: 35%;
    }
  }
  .score {
    display: flex;
    font-size: 14px;
    background: white;
    padding-left: 10px;
    padding-top: 20px;
    .picture {

      img{
        width: 70px;
        height: 80px;
      }
    }
    .details {
      padding-top: 10px;
      margin-left: 10px;
      .value {
        margin-top: 20px;
      }
    }
  }

  .user {
    textarea{
      border: 0;
      width: 371px;
      background: #f7f7f7;

    }
  }
  .anony {
    background: white;
    padding-left: 4%;
    padding-top: 4%;
  }
  .Subm {
    background: white;
    text-align: center;
    .van-button{
      width: 92%;
      margin-top: 30px;
    }
  }
}
</style>
