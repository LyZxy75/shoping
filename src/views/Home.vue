<template>
  <!--  商城-->

  <div class="home">
    <div class="top">
      <!--      定位-->

      <div class="Location" @click="city" v-if="locations">
        {{locations}}
        <img src="../icon/向下箭头.svg" alt="" class="Arrow">
      </div>
      <div class="Location" @click="city" v-else>
        {{location}}
        <img src="../icon/向下箭头.svg" alt="" class="Arrow">
      </div>
      <!--      搜索-->
      <div class="Search"><Searchinput></Searchinput></div>
    </div>
    <div class="content" ref="wrapper">
      <div class="content-box">
        <!--    轮播图-->
        <div class="abdomen">
          <Rotation></Rotation>
        </div>
        <!--    导航-->
        <div class="Navigation">
          <Navigation></Navigation>
        </div>
        <!--    小车车-->
        <div class="Advertisement">
          <img :src="images.PICTURE_ADDRESS" />
        </div>
        <!--    商品推荐-->
        <div class="Recommend">
          <Recommend></Recommend>
        </div>
        <!--    商品按楼层分类-->
        <div>
          <Floors></Floors>
        </div>
        <!--    热销商品-->
        <div class="Hot">
          <Hot></Hot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Searchinput from "../components/Mall/Search/Search";
import Rotation from "../components/Mall/Rotation/Rotation";
import Navigation from "../components/Mall/Navigation/Navigation";
import Recommend from "../components/Mall/Recommend/Recommend";
import Floors from "../components/Mall/floors/Floors";
import Hot from "../components/Mall/Hot/Hot";
import BScroll from "better-scroll";
export default {
  name: "home",
  components: {

    Searchinput,
    Rotation,
    Navigation,
    Recommend,
    Floors,
    Hot
  },
  data() {
    return {
      images: [],
      location: "",
      locations: "",


    };
  },
  methods: {
    // 跳转城市列表
    city() {
      this.$router.push({ name: "Location", params: { item: this.location } });
    },
    // 获取首页数据
    async getData() {
      try {

        let res = await this.$api.recommend();
        this.images = res.data.advertesPicture;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    // 纵向平滑滚动
    pictureScroll() {
      // this.$nextTick 是一个异步函数 为了确保DOM已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startY: true,
            scrollY: true,
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  mounted() {
    // this.$nextTick 是一个异步函数 为了确保DOM已经渲染
    this.$nextTick(() => {
      this.pictureScroll();
    });

    this.getData();
this.locations = this.$route.query.city
    // 获取自动定位
    let _this = this;
    AMap.plugin("AMap.Geolocation", function() {
      let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        // console.log(data);
        _this.location = data.addressComponent.city;
        // console.log(data.addressComponent);
      }

      function onError(data) {
        // 定位出错
        console.log(data);
      }
    });

  },

  // 调用纵向平滑滚动
  created() {

  }
};
</script>
import BScroll from "better-scroll";
<style scoped lang="scss">
.home {
  background-color: #f2f2f2;
}
.top {
  display: flex;
  justify-content: space-around;
  height: 50px;
  line-height: 50px;
  background: #f2f2f2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.Location {
  width: 20%;
  text-align: center;
  .Arrow{
    width: 10px;
    height: 10px;

  }
}
Search {
  width: 80%;
}
.sear {
}
.abdomen {
  margin-top: 3%;
}
.Navigation {
  background: #ffffff;
  width: 94%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 9px;
  height: 100%;
}
.Advertisement {
  margin-top: 3%;
  img {
    width: 100%;
  }
}
.Recommend {
  margin-top: 5%;
  background: #ffffff;
}
.Hot {

}
.content {
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.content-box {
}
</style>
