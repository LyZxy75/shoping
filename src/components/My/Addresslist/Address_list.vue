<template>
  <div class="Address_list">
    <div class="Previous ">
      <van-icon name="arrow-left" @click="Previous" />
      <div class="top">地址列表</div>
    </div>
    <!--      地址内容-->
    <div class="content" v-if="list.length === 0">
      <div class="nothing">暂无收货地址～～</div>
    </div>
    <div v-else></div>
    <div class="list">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      ></van-address-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "Address_list",
  components: {},
  props: {},
  data() {
    return {
      address: [],
      chosenAddressId: 1,
      list: [],
      set: []
    };
  },
  methods: {
    Previous() {
      this.$router.go(-1);
    },
    // 修改默认地址
    select(val) {
      // console.log(val);
      this.$axios
        .req("api/setDefaultAddress", {
          id: val._id
        })
        .then(res => {
          console.log(res);
          this.$toast("设置默认地址成功");
        });
    },
    // 查询用户收货地址
    getAddress() {
      this.$axios
        .req("api/getAddress")
        .then(res => {
          // console.log(res.address);
          this.list = res.address;
          res.address.map((item, index) => {
            item.id = index ;
            // console.log(item);
            if (item.isDefault === true) {
              this.chosenAddressId = index ;
            }
            // 定一个变量flag，循环数组的每一项，判断isDefault为false时负值给flag
            let flag = this.list.every(item => {
              return item.isDefault === false;
            });
            // 判断flag，每一项的isDefault都为false时，则把数组第一项的isDefault改为true
            if (flag) {
              this.list[0].isDefault = true;
            }
          });
          console.log(this.list);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 底部新增地址按钮跳转编辑地址  新增不传参
    onAdd() {
      this.$toast("请输入新增地址");
      this.$router.push("Edit_address");
    },
    onEdit(item) {
      this.$toast("请修改地址");
      // console.log(item);
      // 路由传值 传item
      this.$router.push({ name: "Edit_address", query: { id: item } });

    }
  },
  mounted() {
    this.getAddress();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Address_list {
  .Previous {
    display: flex;
    outline: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;
    .van-icon {
      font-size: 20px;
      margin-left: 3%;
      color: #359bfb;
    }
    .top {
      margin-left: 35%;
    }
  }
  .content {
    text-align: center;
    margin-top: 15%;
    color: #c1d2ee;
    .nothing {
    }
  }
}
</style>
