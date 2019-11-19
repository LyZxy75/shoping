<template>
  <div class="Edit_address">
    <div class="Previous ">
      <van-icon name="arrow-left" @click="Previous" />
      <div class="top">编辑地址</div>
    </div>
    <div class="edit">
      <van-address-edit
        :area-list="areaList"
        :address-info="addressinfo"
        show-delete
        show-set-default
        show-search-result
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      ></van-address-edit>
    </div>
  </div>
</template>

<script>
  // 引入地区选择列表
  import areaList from "./area.js";
export default {
  name: "Edit_address",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: 1,
      preser: {},
      addressinfo: {}, //收货人初始信息
      areaList: areaList, //接收地区选择列表
      content: {},//装修改的数据
      index:'',
  };
  },
  methods: {
    // 返回上一页
    Previous() {
      this.$router.go(-1);
    },
    // 保存
    onSave(kmm) {
      this.$toast("保存成功");
      this.content = kmm;
      console.log(this.content);
      this.content.address =
          kmm.province + kmm.city + kmm.county + kmm.addressDetail;
      this.content.id = kmm._id;
      this.$axios
        .req("api/address", this.content)
        .then(res => {
          console.log(res);
          this.preser = res.data;
          // 返回上一级
          this.$router.go(-1);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 删除
    onDelete(val) {
      this.$toast("删除成功");
      console.log(val);
      this.$axios
        .req("api/deleteAddress", {
          id: val._id
        })
        .then(res => {
          console.log(res);
          this.$router.go(-1);
        });
    },
    onChangeDetail() {},
  },
  mounted() {
    // 路由传值，用query传的，用query接收，接收地址列表传过来的数据
    console.log(this.$route.query);
    this.addressinfo = this.$route.query.id;

  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Edit_address {
  .Previous {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    align-items: center;
    .van-icon {
      font-size: 20px;
      margin-left: 3%;
      color: #359bfb;
    }
    .top {
      margin-left: 38%;
    }
  }
}
.Preservation {
  text-align: center;
  button {
    margin-top: 300px;
    background: #ff4444;
    border-color: #ff4444;
    width: 92%;
  }
}
.delete {
  text-align: center;
  button {
    margin-top: 20px;

    width: 92%;
  }
}
</style>
