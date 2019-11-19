<template>
  <!--  详情页-->
  <div v-if="goodOne">
    <!--    返回按钮-->
    <div class="content" ref="wrapper">
      <div class="content_box">
        <div class="return" @click="retur">
          <van-icon name="arrow-left" size="25px" />
        </div>
        <!--    商品轮播图-->
        <van-swipe :autoplay="3000" indicator-color="#FF951B">
          <van-swipe-item>
            <img :src="goodOne.image" alt="" class="commodity" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="goodOne.image_path" alt="" class="commodity" />
          </van-swipe-item>
        </van-swipe>
        <!--    商品名 价格-->
        <div class="details">
          <div class="name">{{ goodOne.name }}</div>
          <div class="price">
            <span class="present_price">￥{{ goodOne.present_price }}</span>
            &nbsp;&nbsp;<span class="orl_price">￥{{ goodOne.orl_price }}</span>
          </div>
        </div>
        <div class="freight">
          <div class="surplus">运费：{{ goodOne.__v }}</div>
          <div class="surplus">剩余：{{ goodOne.amount }}</div>
          <div>
            <!--    收藏      点击后变色-->
            <div @click="block" v-if="flag === false" class="heart">
              <div>收藏：</div>
              <van-icon name="like-o" class="collection" />
            </div>
            <div @click="block" v-else class="heart">
              <div>取消收藏：</div>
              <van-icon name="like" class="cancel" color="red" />
            </div>
          </div>
        </div>
        <div class="shop">
          <div class="zan"><van-icon name="shop-o" class="store" /></div>
          <div class="zan">有赞的店</div>
          <div class="zan"><van-tag type="danger">官方</van-tag></div>
          <div class="get">
            <div>进入店铺</div>
            <div class="Symbol"><van-icon name="arrow" /></div>
          </div>
        </div>
        <div>
          <!--          父组件传值-->
          <Commoditydetails
            class="information"
            :detail="goodOne.detail"
            :goodOne="goodOne"
            :goodTwo="goodTwo"
          ></Commoditydetails>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Commoditydetails from "./Commoditydetails/Commoditydetails";
export default {
  name: "Details",
  components: {
    Commoditydetails
  },
  props: {},
  data() {
    return {
      id: "",
      goodOne: {},
      goodTwo: [],
      goodThree: [],
      flag: false,
      show: false,
      isColl: {}
    };
  },
  methods: {
    // 获取单个商品详情
    async getgoodOne() {
      this.id = this.$route.query.id;
      try {
        let res = await this.$api.goodOne(this.id);
        this.goodOne = res.goods.goodsOne;
        this.goodTwo = res.goods.comment;
        // console.log(this.goodOne);
        // 保存本地 JSON.stringify（转换为JSON对象）
        if(!localStorage.getItem("browse")){
          localStorage.setItem("browse",JSON.stringify([]))
        }
       this.browse = JSON.parse(localStorage.getItem("browse"));
        this.browse.unshift(this.goodOne);
        // console.log(this.browse);
        localStorage.setItem("browse", JSON.stringify(this.browse));

      } catch (e) {
        console.log(e);
      }
    },
    // 收藏商品
    async getcollection() {
      try {
        let res = await this.$api.collection(this.goodOne);
        // console.log(res);
        if (res.msg === "收藏成功") {
          this.$toast("收藏成功");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 取消收藏
    async getcancelCollection() {
      try {
        let res = await this.$api.cancelCollection(this.goodOne.id);
        // console.log(res);
        if (res.msg === "取消收藏成功") {
          this.$toast("取消收藏成功");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 返回
    retur() {
      this.$router.go(-1);
    },
    // 收藏控制按钮
    block() {
      if (this.flag === false) {
        this.flag = true;
        this.getcollection();
      } else {
        this.flag = false;
        this.getcancelCollection();
      }
    }
  },
  mounted() {
    this.getgoodOne();

    // 查询商品是否被收藏
    this.$axios.req("api/isCollection", { id: this.id }).then(res => {
      this.isColl = res.isCollection;
      if (this.isColl === 1) {
        this.flag = true;
      } else if (this.isColl === 0) {
        this.flag = false;
      }
    });
  },
  created() {
    this.goodOne = this.getgoodOne.goodOne;
    this.goodTwo = this.getgoodOne.goodTwo;
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.return {
  position: fixed;
  top: 15px;
  left: 5px;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #7f7f7f;
  text-align: center;
  z-index: 999;

  .van-icon{
    color: white;
    top: 50%;
    margin-top: -12.5px;
  }
}
.van-swipe{
  margin-top: 50px;
}
.commodity {
  width: 100%;
}
.details {
  height: 60px;
  outline: 1px solid #f2f2f2;

  .name {
    margin-left: 20px;
    padding-top: 10px;
  }
  .price {
    margin-left: 10px;
    padding: 10px;
    .present_price {
      color: #ff4c38;
    }
    .orl_price {
      font-size: 12px;
      color: #666666;
      text-decoration: line-through;
    }
  }
}
.freight {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  align-items: center;
  color: #666666;
  font-size: 14px;
}
.heart {
  display: flex;
  align-items: center;
}
.collection {
  font-size: 25px;
}
.cancel {
  font-size: 25px;
}
.shop {
  outline: 1px solid #ededed;
  padding: 20px 0 20px 20px;
  display: flex;
  font-size: 14px;
  align-items: center;
  .zan {
    margin-right: 5px;
  }

  .store {
    font-size: 20px;
  }

  .official {
    width: 9%;
    height: 45px;
    padding-left: 10px;
    background-color: #ff4444;
    border-radius: 10px;
    color: white;
  }

  .get {
    display: flex;
    align-items: center;
    margin-left: 130px;
    .Symbol {
      color: #7d7e80;
      margin-left: 5px;
    }
  }
}
</style>
