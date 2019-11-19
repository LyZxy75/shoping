<template>
  <!--  分类-->
  <div>
    <div class="classification">
      <div class="top">商品分类</div>

      <div class="side">
        <div class="sidebar">
          <div
            v-for="(item, index) in Navigation"
            :key="item.id"
            @click="getcart(index)"
            :class="{ leftbg: leftindex === index }"
          >
            <div>{{ item.mallCategoryName }}</div>
          </div>
        </div>
        <div></div>
        <div class="data_bar">
          <div class="right_data" ref="wrapp">
            <div class="Fruits" v-if="Navigation_datas">
              <div
                v-for="(item, index) in Navigation_datas.bxMallSubDto"
                :key="index"
                class="pinz"
                @click="nav(item.mallSubId, index)"
                :class="{ red: index === topindex }"
              >
                {{ item.mallSubName }}
              </div>
            </div>
          </div>
          <div class="content"  ref="wrapper">
            <div class="content_box">
              <div v-for="(item) in getbxMallSubDto" :key="item.id" class="ccc" @click="mend(item.id)">
                <div class="imgs">
                  <img :src="item.image" alt="" class="img" />
                </div>
                <div class="Total">
                  <div class="name">{{ item.name }}</div>
                  <div class="price">
                    <div class="prices">￥{{ item.present_price }}</div>
                    <div class="sss">{{ item.orl_price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Classification",
  components: {},
  props: {},
  data() {
    return {
      categroy: {
        categroy: {},
        categoryItem: {},
        categoryIndex: 0,
        id: ""
      },
      categroy_index: 0,
      Navigation: [], // 获取左侧导航数据信息
      getbxMallSubDto: [], // 获取右侧导航数据信息
      topindex: 0,
      leftindex: 0
    };
  },
  methods: {
    // 获取左侧导航栏的数据
    async change() {
      try {
        let res = await this.$api.recommend();
        this.Navigation = res.data.category;
        if (this.Navigation) {
          this.details(this.Navigation[0].bxMallSubDto[0].mallSubId);
          this.getcart(this.categroy.categoryIndex);
        }
        if(this.Navigation_datas){
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapp, {
              scrollX: true,
              click: true
            });
          });
        }

      } catch (e) {
        console.log(e);
      }
    },
    // 获取分类查询得到的数据
    async details(mallSubId) {
      try {
        let res = await this.$api.category(mallSubId);
        this.getbxMallSubDto = res.dataList;
        console.log(this.getbxMallSubDto);

      } catch (e) {
        console.log(e);
      }
    },
    // 点击右侧导航显示对应数据
    nav(mallSubId, index) {
      this.topindex = index;
      this.details(mallSubId);
    },
    // 点击左侧导航展示右侧导航信息
    getcart(index) {
      this.categroy_index = index;
      this.leftindex = index;
      this.categroy.categoryIndex = index;
      this.details(this.Navigation[index].bxMallSubDto[0].mallSubId);
    },
    mend(id){
      this.$router.push ({name: 'Details' , query: {id:id}});
    }
  },
  mounted() {
    this.change();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      });
    });
    this.categroy.categoryIndex = this.$route.query.categoryIndex;
  },
  created() {},
  filters: {},
  computed: {
    Navigation_datas: function() {
      return this.Navigation[this.categroy_index];
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.classification {
}
.top {
  text-align: center;
  height: 40px;
  line-height: 40px;
  outline: 1px solid #f2f2f2;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  z-index: 888;
}
.right_data {
  overflow: hidden;
  display: flex;
  width: 100%;
  .Fruits {
    height: 40px;
    display: flex;
    flex: 1;
    justify-content: space-around;
    line-height: 40px;
    font-size: 14px;
    background: #fff;
    z-index: 888;
  }
}
.side {
  display: flex;
  margin-top: 40px;
}
.sidebar {
  width: 20%;
  height: 100vh;
  background: #f1f8ff;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  color: #666666;
  position: fixed;
  left: 0;
  top: 40px;

  div {
    outline: 1px solid #f2f2f2;
  }
}
.data_bar {
  width: 80%;
  margin-left: 20%;
}

.content {
  outline: 1px solid #f2f2f2;
  position: absolute;
  right: 0;
  left: 20%;
  top: 80px;
  bottom: 50px;
  overflow: hidden;
  .content-box {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
.pinz {
  white-space: nowrap;
  margin: 0 20px;
}
.ccc {
  display: flex;
  padding: 10px 10px 0;
  .imgs {
    outline: 1px solid #f2f2f2;
    margin-left: 10px;
  }
  .img {
    width: 99px;
    height: 80px;
  }
  .Total {
    margin-left: 25px;
    .name {
      color: red;
    }
    .price {
      display: flex;
      margin-top: 40px;
      .prices {
        color: red;
      }
      .sss {
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
  }
}
.red {
  border-bottom: 2px solid #ff4c38;
}
.leftbg {
  background: white;
}
</style>
