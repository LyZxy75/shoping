<template>
  <!--    城市列表-->
  <div class="cityList">
    <div class="address">
      <van-icon name="arrow-left" size="20px" @click="Previous" />
      <div class="top">城市列表</div>
    </div>

    <van-search placeholder="请输入搜索关键词" v-model="value"/>
    <!--      当前城市-->
    <div>
      <div class="citys">当前城市</div>
      <div class="current">
        <div class="Frame" @click="tiaozhuan(currentCity)">{{ currentCity }}</div>
      </div>
    </div>
    <!--      热门城市-->
    <div>
      <div class="citys">热门城市</div>
      <div class="list">
        <div v-for="(item, index) in list.hotCities" :key="index" class="Frame" @click="tiaozhuan(item.name)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <!--      城市分组-->
    <div class="grouping">
      <van-index-bar>
        <div v-for="(item, index) in list.cities" :key="index" class="city">
          <van-index-anchor :index="index" />
          <div v-for="item1 in item" @click="tiaozhuan(item1.name)">
            <van-cell :title="item1.name" ></van-cell>
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import city from "./city";
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      currentCity: [],
      value:''
    };
  },
  methods: {
    Previous() {
      this.$router.go(-1);
    },
    tiaozhuan(city){
      this.$router.push({path:'/',query:{city:city}})
    }
  },
  mounted() {
    this.list = city.data;
    console.log(this.list);
    this.currentCity = this.$route.params.item;
    console.log(this.currentCity);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.cityList {
  background: #f2f2f2;
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
  .van-search{
    background: #f2f2f2;
    color: white;
    padding: 0;
    margin: 10px 12px;

  }
  .grouping {
    .van-index-bar {
      color: #2fc2d7;
      font-size: 25px;




      .van-index-bar__index{
  font-size: 30px;
        z-index: 999;
}

      .city {
        .van-index-anchor {

        }
        .van-cell{
border-bottom: 1px solid #f2f2f2;
        }
      }

    }
  }
  .citys{
    padding: 10px 10px;
  }
  .current{
    padding: 10px 10px;
    background: white;
    .Frame{
      border: 1px solid #cccccc;
      text-align: center;
      width: 100px;
      height: 25px;
      line-height: 25px;
    }
  }
  .list{
    padding: 10px;
display: flex;
    flex-wrap: wrap;
    background: white;
    .Frame{
      border: 1px solid #cccccc;
      text-align: center;
      width: 100px;
      height: 25px;
      line-height: 25px;
      margin-right: 10px;
      margin-bottom: 5px;
    }
  }
}

</style>
