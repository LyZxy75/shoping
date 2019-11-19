<template>
  <!--  商品推荐-->
  <div class="Recommend">
    <div class="top">商品推荐</div>
    <div class="wrapper" ref="wrapper">
      <div class="picture_">
        <div
          v-for="(item, index) in commodity.recommend"
          :key="index"
          class="product"
        >
          <img
            :src="item.image"
            alt=""
            class="recommend"
            @click="mend(item.goodsId)"
          />
          <div class="picture_good">{{ item.goodsName }}</div>
          <div class="Price">
            <span class="money"> ￥{{ item.mallPrice }} </span>
            <s>￥{{ item.price }}</s>
          </div>
          <div class="see">
            <span class="seex"
              ><van-icon name="shopping-cart-o" class="cart"
            /></span>

            <span @click="mend(item.goodsId)" class="details">查看详情</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Recommend",
  components: {},
  props: {},
  data() {
    return { commodity: [] };
  },
  methods: {
    async Recommend() {
      try {
        let res = await this.$api.recommend();
        this.commodity = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    pictureScroll() {
      // this.$nextTick 是一个异步函数 为了确保DOM已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: true,
            scrollX: true,
            click: false
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    mend(id) {
      if(this.$route.path !== 'Details'){
        this.$router.push({ name: "Details", query: { id: id } });
      }
    }
  },
  mounted() {
    this.Recommend();
  },
  created() {
    this.$nextTick(() => {
      this.pictureScroll();
    });
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Recommend {
}
.top {
  color: #333333;
  font-size: 14px;
  padding-left: 4%;
  height: 30px;
  line-height: 30px;
}

img {
  width: 125px;
  height: 125px;
  padding: 10px 0;
}
.wrapper {
  overflow: hidden;
}
.picture_ {
  width: 2125px;
  display: flex;
}
.picture_good {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 5px;
  text-align: center;
}
.Price {
  margin: 5px 0;
}
.money {
  font-size: 13px;
  padding-left: 5px;
}

.product {
  width: 125px;
  outline: 1px solid #ffeaf2;
}
s {
  color: #999999;
  font-size: 11px;
}
.see {
  text-align: center;
  margin: 10px 0 20px;
  color: #ffffff;
}
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
</style>
