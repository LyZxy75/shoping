<template>
  <!--  商城导航-->
  <div class="nav">
    <div v-for="(item, index) in Navigation" :key="index">
      <div class="top">
        <img :src="item.image" @click="icon(item, index)" />
      </div>
      <div class="bottom">{{ item.mallCategoryName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  components: {},
  props: {},
  data() {
    return {
      Navigation: []
    };
  },
  methods: {
    async getData() {
      try {
        let res = await this.$api.recommend();
        this.Navigation = res.data.category;
      } catch (e) {
        console.log(e);
      }
    },
    // 路由传值 （数据多用对象形式，自动跳转）
    icon(item, index) {
      this.$router.push({
        name: "Classification",
        query: { categoryIndex: index }
      });
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
}
img {
  width: 50px;
  height: 50px;
}
.top {
  padding-top: 15px;
}
.bottom {
  margin: 10px 0;
}
</style>
