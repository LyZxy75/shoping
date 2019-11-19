<template>
  <!--  搜索-->
  <div class="app">
    <div class="search" @click="essential">
      <van-search v-model="value" placeholder="请输入搜索关键词" class="input">
      </van-search>
    </div>

    <div class="sear" v-if="show === false">搜索</div>
    <div class="sear" v-if="show === true" @click="cancel">取消</div>
    <div>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '93%' }"
        :overlay="false"
      >
        <div class="searchHistory">
          <div>搜索历史</div>
          <div class="del"><img src="../../../icon/删除.svg" alt="" @click="del"></div>
        </div>
        <div>
        <span class="History"  v-for="item in getHistory">
          {{item}}
        </span>
        </div>
        <div v-for="(item, index) in food" :key="index" class="foods">
<!--                          关键字高亮-->
          <a class="text" @click="details(item.id)" v-if="value !== ''">
            <span>{{
              item.name.slice(
                0,
                item.name.toLowerCase().indexOf(value.toLowerCase())
              )
            }}</span
            ><span style="color:#fe1706">{{
              item.name.slice(
                item.name.toLowerCase().indexOf(value.toLowerCase()),
                item.name.toLowerCase().indexOf(value.toLowerCase()) +
                  value.length
              )
            }}</span
            ><span>{{
              item.name.substr(
                item.name.toLowerCase().indexOf(value.toLowerCase()) +
                  value.length
              )
            }}</span>
          </a>


        </div>
      </van-popup>

    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      show: false,
      food:[],
      getHistory:[],

    };
  },
  methods: {
    cancel() {
      if (this.show === true) {
        this.show = false;
      }
    },
    essential() {
      this.show = true;
    },
    details(id){
      this.$router.push({name:'Details',query:{id:id}})
    },
    del(){
      localStorage.removeItem("History")
      if(!localStorage.getItem("History")){
        this.getHistory =''
      }
    },

  },
  mounted() {
    // // 本来存的JSON对象，JSON.parse转回来
    // if(localStorage.getItem("History")){
    //   this.getHistory = JSON.parse(localStorage.getItem("History"));
    //   console.log(this.getHistory);
    // }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    value() {
      this.$axios
        .req("api/search", {
          value: this.value
        })
        .then(res => {
          this.food = res.data.list
          // console.log(this.food);
          // 保存本地 JSON.stringify（转换为JSON对象）
          if(!localStorage.getItem("History")){
            localStorage.setItem("History",JSON.stringify([]))
          }
          this.History = JSON.parse(localStorage.getItem("History"));
          if(this.value.trim() && !(this.value in this.History) ){
            this.History.unshift(this.value);
          }
          console.log(this.value);
          localStorage.setItem("History", JSON.stringify(this.History));
          this.getHistory = JSON.parse(localStorage.getItem("History"));
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.app {
  display: flex;
  align-items: center;

  .search {
    .van-search {
      padding: 0;
      background: white;
      margin-right: 10px;
      border-radius: 4px;
      width: 230px;
      border-radius: 12px;
    }
  }
}
  span{


  }
  .History{
    margin-left: 20px;
    width: 70px;
    background: #f2f2f2;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 35px;
  }
  .searchHistory{
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    .del{
     position: relative;
     img{
       width: 20px;
       height: 20px;
       position: absolute;
       top: 50%;
       margin-top: -10px;
       right: 0;
     }

    }
  }
  .text{
    margin-left: 20px;
  }
</style>
