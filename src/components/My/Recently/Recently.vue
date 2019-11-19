<template>
  <!--  最近浏览-->
  <div class="Recently">
    <div class="address">
      <van-icon
        name="arrow-left"
        color="#359bfb"
        size="20px"
        @click="Previous"
      />
      <div class="top">最近浏览</div>
    </div>
    <!--      没有浏览-->
    <div class="content" v-if="browse.length === 0">
      <div class="nothing">你还没有浏览记录哦～～</div>
    </div>

    <div v-for="(item, index) in browse" :key="index" class="commodity">
      <!--        商品图片-->
      <div class="picture">
        <div class="img"><img :src="item.image_path" alt="" /></div>
      </div>
      <!--        商品名 价钱-->
      <div class="details">
        <div class="name">{{ item.name }}</div>
        <div class="money_l">
          <span class="spans">￥{{ item.present_price}}</span>
          <span class="span">{{item.orl_price}}</span>
        </div>
        <!--        取消商品收藏-->
        <div class="del" @click="del(item,index)"><van-icon name="close" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recently",
  components: {},
  props: {},
  data() {
    return {
      browse: []
    };
  },
  methods: {
    Previous() {
      this.$router.push("My");
    },

    del(item, index) {
      this.browse = JSON.parse(localStorage.getItem("browse"));
      this.browse.splice(index, 1);
      localStorage.setItem("browse", JSON.stringify(this.browse));
      this.$toast.success("删除成功");
    }
  },
  mounted() {
    // 本来存的JSON对象，JSON.parse转回来
    this.browse = JSON.parse(localStorage.getItem("browse"));
    console.log(this.browse);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Recently {
  .address {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;
    .van-icon {
      font-size: 20px;
      margin-left: 3%;
      color: #359bfb;
    }
    .top {
      margin-left: 35%;
    }
  }
  .content {
    text-align: center;
    height: 110px;
    line-height: 110px;
    color: #e6e6e6;
    .nothing {
    }
  }
  .commodity {
    border-bottom: 1px solid #f2f2f2;
    margin: 10px 5px;
    padding-bottom: 10px;
    display: flex;

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

      width: 67%;
      .name {
        margin-top: 5px;
      }
      .money_l {
        margin-top: 8%;
        line-height: 20px;
        color: #ff4c38;
        font-size: 11px;
        .spans{
          margin-right: 10px;
          font-weight: bold;

        }
        .span{
          color: black;
          text-decoration: line-through;
        }
      }
      .del {
        display: flex;
        justify-content: flex-end;
        margin-top: 3%;
      }
    }
  }
}
</style>
