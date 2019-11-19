<template>
  <!--  底部分类-->
  <div>
    <div
      class="footers"
      :default-active="$route.path"
      :router="true"
      active-text-color="#ff4c38"
    >
      <!--    商城-->
      <div class="Shopping" @click="goTo(0)" :class="{ select: index === 0}">
        <div class="tb"><van-icon name="wap-home-o" /></div>
        <div class="sc" slot="title">商城</div>
      </div>
      <!--    分类-->
      <div
        class="classification"
        @click="goTo(1)"
        :class="{ select: index === 1}"
      >
        <div class="tb"><van-icon name="apps-o" /></div>
        <div class="sc" slot="title">分类</div>
      </div>
      <!--    购物车-->
      <div class="Cart" @click="goTo(2)" :class="{ select: index === 2 }">
        <div class="tb"><van-icon name="shopping-cart-o" /></div>
        <div class="sc" slot="title">购物车</div>
      </div>
      <!--    我的-->
      <div class="My" @click="goTo(3)" :class="{ select: index === 3 }">
        <div class="tb"><van-icon name="contact" /></div>
        <div class="sc" slot="title">我的</div>
      </div>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: "footers",
  components: {},
  props: {},
  data() {
    return {
      index:0
    };
  },
  methods: {
    goTo(index) {
      this.index = index


      if (index === 0) {
        if(this.$route.path !== '/Home'){
          this.$router.push("/Home");
        }

      } else if (index === 1) {
        if(this.$route.path !== '/Classification'){
          this.$router.push({
            path: "/Classification",
            query: {
              categoryIndex: 0
            }
          });
        }

      } else if (index === 2) {
        if(this.$route.path !== '/Cart'){
          this.$router.push("/Cart");
        }

      } else if (index === 3) {
        if(this.$route.path !== '/My'){
          this.$router.push("/My");
        }

      }
    }
  },
  mounted() {
    if(this.$route.path === '/Classification'){
      this.goTo(1)
    }else if(this.$route.path === '/Cart'){
      this.goTo(2)
    }else if(this.$route.path === '/My'){
      this.goTo(3)
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.footers {
  z-index: 999;
  background: white;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  height: 50px;
  align-items: center;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  outline: 1px solid #f2f2f2;
  .tb {
    font-size: 20px;
    margin-bottom: 3px;
  }
}
.select {
  color: #ff4c38;
}
</style>
