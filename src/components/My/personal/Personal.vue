<template>
  <div class="Personal">
    <div class="top">
      <van-icon name="arrow-left" class="Return" @click="Return" />
      <span class="core">个人资料</span>
    </div>
    <div class="github">github</div>
    <div class="head">
      <div class="span">头像</div>
      <div class="img"><img src="../../../images/touxiang.jpeg" alt="" /></div>
      <div><van-icon name="arrow" size="18px" color="#7d7e80" /></div>
    </div>
    <!--      用户名-->
    <div class="nick">
      <van-cell-group class="user">
        <van-field value="g-d2+5c4aaalb88.." label="用户名" disabled />
      </van-cell-group>
    </div>
    <!--      昵称-->
    <div class="nick">
      <van-cell-group class="user">
        <van-field v-model="name" label="昵称" />
      </van-cell-group>
    </div>
    <!--      性别-->
    <div class="nick">
      <van-cell-group class="user">
        <van-field v-model="sex" label="性别" />
      </van-cell-group>
    </div>
    <!--      邮箱-->
    <div class="nick">
      <van-cell-group class="user">
        <van-field v-model="email" label="邮箱" placeholder="请输入邮箱" />
      </van-cell-group>
    </div>
    <!--      出生年月-->
    <div class="nick">
      <van-cell-group class="user">
        <van-field label="出生年月" />
      </van-cell-group>
    </div>
    <!--    按钮-->
    <div class="button">
      <van-button type="primary" style="width: 80%;">保存</van-button>
    </div>
    <div class="buttons">
      <van-button style="width: 80%;">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  components: {},
  props: {},
  data() {
    return {
      email: "",
      sex: "",
      name:""
    };
  },
  methods: {
    Return() {
      this.$router.go(-1);
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Personal {
  height: 40px;
  line-height: 40px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  .top {
    text-align: center;
    outline: 1px solid #f2f2f2;

    .Return {
      color: #00b4ce;
      position: absolute;
      left: 3%;
      top: 25%;
    }
    .core {
    }
  }
  .github {
    padding: 0 3%;
    outline: 1px solid #f2f2f2;
  }
  .head {
    height: 60px;
    line-height: 60px;
    display: flex;
    outline: 1px solid #f2f2f2;

    .span {
      margin-left: 3%;
    }
    .img {
      line-height: 50px;
      margin-left: 60%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .nick {
    display: flex;
    outline: 1px solid #f2f2f2;
    padding: 0 3%;
    .user {
      margin-left: -15px;
    }
    .name {
    }
  }
  .nicks {
    display: flex;
    outline: 1px solid #f2f2f2;
    align-items: center;
    padding: 0 3%;
    .user {
    }
    .call {
      text-align: center;
      input {
        border: 0;
        margin-left: 30%;
      }
    }
  }
  .button {
    text-align: center;
    margin: 5% 0;
  }
  .buttons {
    text-align: center;
  }
}
</style>
