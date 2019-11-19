<template>
  <!--商品按楼层分类-->
  <div>
    <!--    楼层1休闲食品-->
    <div class="Floors" v-if="floor1.length > 0">
      <div class="top">
        <div class="one">1F</div>
        <div class="floor" v-if="floorName">{{ floorName.floor1 }}</div>
      </div>
      <div>
        <div class="bar">
          <div class="left">
            <img :src="floor1[0].image" alt="" @click="mend(floor1[0].goodsId)"/>
          </div>
          <div class="right">
            <div><img :src="floor1[1].image" alt="" @click="mend(floor1[1].goodsId)"/></div>
            <div><img :src="floor1[2].image" alt="" @click="mend(floor1[2].goodsId)"/></div>
          </div>
        </div>
        <div class="foot">
          <div><img :src="floor1[3].image" alt="" @click="mend(floor1[3].goodsId)"/></div>
          <div><img :src="floor1[4].image" alt="" @click="mend(floor1[4].goodsId)"/></div>
        </div>
      </div>
    </div>
    <!--    楼层2新鲜水果-->
    <div class="Floors" v-if="floor2.length > 0">
      <div class="top">
        <div class="one">2F</div>
        <div class="floor" v-if="floorName">{{ floorName.floor2 }}</div>
      </div>
      <div class="bar">
        <div class="left">
          <img :src="floor2[0].image" alt="" @click="mend(floor2[0].goodsId)"/>
        </div>
        <div class="right">
          <div><img :src="floor2[1].image" alt="" @click="mend(floor2[1].goodsId)"/></div>
          <div><img :src="floor2[2].image" alt="" @click="mend(floor2[2].goodsId)"/></div>
        </div>
      </div>
      <div class="foot">
        <div><img :src="floor2[3].image" alt="" @click="mend(floor2[3].goodsId)"/></div>
        <div><img :src="floor2[4].image" alt="" @click="mend(floor2[4].goodsId)"/></div>
      </div>
    </div>
    <!--    楼层3营养奶品-->
    <div class="Floors" v-if="floor3.length > 0">
      <div class="top">
        <div class="one">3F</div>
        <div class="floor" v-if="floorName">{{ floorName.floor3 }}</div>
      </div>
      <div class="bar">
        <div class="left">
          <img :src="floor3[0].image" alt="" @click="mend(floor3[0].goodsId)"/>
        </div>
        <div class="right">
          <div><img :src="floor3[1].image" alt="" @click="mend(floor3[1].goodsId)"/></div>
          <div><img :src="floor3[2].image" alt="" @click="mend(floor3[2].goodsId)"/></div>
        </div>
      </div>
      <div class="foot">
        <div><img :src="floor3[3].image" alt="" @click="mend(floor3[3].goodsId)"/></div>
        <div><img :src="floor3[4].image" alt="" @click="mend(floor3[4].goodsId)"/></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floors",
  components: {},
  props: {},
  data() {
    return {
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: []
    };
  },
  methods: {
    async floors() {
      try {
        let res = await this.$api.recommend();
        this.floor1 = res.data.floor1;
        this.floor2 = res.data.floor2;
        this.floor3 = res.data.floor3;
        this.floorName = res.data.floorName;
      } catch (e) {
        console.log(e);
      }
    },
    mend(id) {
      this.$router.push({ name: "Details", query: { id: id } });
    }
  },
  mounted() {
    this.floors();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Floors {
  .top {
    display: flex;
    justify-content: center;
    margin: 10px 0;

    .one {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: red;
      color: white;
      font-size: 14px;
      line-height: 20px;
    }
    .floor {
      color: red;
    }
  }
  .bar {
    background: white;
    display: flex;
    .left {
      img {
        width: 187px;
      }
    }
    .right {
      div {
        outline: 1px solid #f2f2f2;
        img {
          width: 187px;
        }
      }
    }
  }
  .foot {
    display: flex;
    div {
      outline: 1px solid #f2f2f2;
      img {
        width: 187px;
      }
    }
  }
}
</style>
