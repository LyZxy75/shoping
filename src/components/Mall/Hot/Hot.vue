<template>
  <div>
    <div class="hot">
      <div class="top">热销商品</div>
      <div class="duct">
        <div
          v-for="(item, index) in hotGoods"
          :key="index"
          class="product"
          @click="mend(item.goodsId)"
        >
          <img :src="item.image" alt="" class="recommend" />
          <div class="picture_good">{{ item.name }}</div>
          <div class="Price">
            <span class="money"> ￥{{ item.mallPrice }} </span>
            <s>￥{{ item.price }}</s>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hot",
  components: {},
  props: {},
  data() {
    return { hotGoods: [] };
  },
  methods: {
    async hot() {
      try {
        let res = await this.$api.recommend();
        this.hotGoods = res.data.hotGoods;
      } catch (e) {
        console.log(e);
      }
    },
    mend(id) {
      this.$router.push({ name: "Details", query: { id: id } });
    }
  },
  mounted() {
    this.hot();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.hot {
  .top {
    color: red;
    text-align: center;
    margin: 10px 0 0;
  }
  .duct {
    display: flex;
    flex-wrap: wrap;
    .product {
      width: 50%;
      background: white;
      outline: 1px solid #f2f2f2;
      margin-top: 10px;
    }
    img {
      width: 187px;
    }
    .recommend {
    }
    .picture_good {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 5px;
      margin: 10px 0 5px;
      text-align: center;
      color: #ff4c38;
    }
    .Price {
      margin: 5px 0;
      text-align: center;
      .money {
        font-size: 14px;
        font-weight: bold;
        color: red;
      }
      s {
        color: #999999;
        font-size: 11px;
      }
    }
    .see {
      text-align: center;
      margin: 10px 0 15px;
      color: #ffffff;
      .seex {
        background: #feca3a;
        height: 30px;
        padding: 5px;
        border-radius: 5px 0 0 5px;
        font-size: 14px;
      }
      .details {
        background: #ff4c38;
        font-size: 14px;
        height: 30px;
        padding: 5px;
        border-radius: 0 5px 5px 0;
      }
    }
  }
}
</style>
