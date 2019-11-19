<template>
  <!--  我的收藏-->
  <div class="Collection">
    <div class="address">
      <van-icon
        name="arrow-left"
        color="#359bfb"
        size="20px"
        @click="Previous"
      />
      <div class="top">我的收藏</div>
    </div>
    <!--      没有收藏-->
    <div class="content" v-if="list.length === 0">
      <div class="nothing">你还没有收藏的商品哦～～</div>
    </div>

    <div v-for="(item, index) in list" :key="index" class="commodity">
      <!--        商品图片-->
      <div class="picture">
        <div class="img" ><img :src="item.image_path" alt="" /></div>
      </div>
      <!--        商品名 价钱-->
      <div class="details">
        <div class="name" @click="details(item)">{{ item.name }}</div>
        <div class="money_l" @click="details(item)">
          ￥{{ item.present_price }}
        </div>
<!--        取消商品收藏-->
        <div class="del" @click="del(item)"><van-icon name="close" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    // 返回
    Previous() {
      this.$router.go(-1);
    },
    // 查询我的收藏
    async getCollections() {
      try {
        let res = await this.$api.getCollection();
        this.list = res.data.list;
        // console.log(this.list);
      } catch (e) {
        console.log(e);
      }
    },
    // 跳转详情页
    details(item) {
      this.$router.push({ name: "Details", query: { id: item.cid } });
    },
    // 取消收藏商品
    del(item) {
      // console.log(item);
      this.$axios
        .req("api/cancelCollection", {
          id: item.cid
        })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.getCollections();
            this.$toast.success(res.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getCollections();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Collection {
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
