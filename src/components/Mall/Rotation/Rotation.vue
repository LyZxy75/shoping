<template>
  <div>
<!--    商城轮播图-->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img :src="item.image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Rotation",
  components: {},
  props: {},
  data() {
    return {
      images: []
    };
  },
  methods: {
    async getData() {
      try {
        let res = await this.$api.recommend();
        this.images = res.data.slides;
      } catch (e) {
        console.log(e);
      }
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
img {
  width: 100%;
}
</style>
