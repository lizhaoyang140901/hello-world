<template>
  <div id="myProgress">
    <!-- Panel面板 -->
    <van-sticky>
      <div class="proDetailHeader">
        <router-link to='/details/:id'>
          <van-icon class="backIcon" name="arrow-left" size=".6rem" />
        </router-link>
        <div class="proName">供应商</div>
      </div>
    </van-sticky>
    <div class="processInfo" v-for="item in progressInfoList" :key="item.id">
      <!--myProProgressInfoList-->
      <div class="header">
        <van-row>
          <!-- 头像 -->
          <van-col class="vanCol" span="4">
            <div class="personImgWrapper">
              <img class="personImg" :src="item.personImg"/>
            </div>
          </van-col>
          <!-- 姓名跟日期 -->
          <van-col class="vanCol" span="4">
            <div class="personName">{{ item.personName }}</div>
            <div class="date">{{ item.theDay }}</div>
          </van-col>
        </van-row>
      </div>
      <!-- 项目进度描述 -->
      <div class="message">{{ item.content }}</div>
      <div class="footer">
        <!-- 项目进度图片展示 -->
        <van-row gutter="20">
          <van-col span="8" v-for="item in proImgList" :key="item.id">
            <!-- 点击图片进行预览 -->
            <img class="proImgMin" :src="item.imgUrl" @click="showPopup"/>
            <van-popup v-model="show"><img class="proImgMax" :src="item.imgUrl" /></van-popup>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyProgress",
  data() {
    return {
      show: false,
      progressInfoList: [],
      proImgList: []
    };
  },
  methods: {
    showPopup () {
      this.show = true;
    },
    getMyProProgress () {
      this.$axios.get('../../static/mock/myProgress.json')
          .then(this.getMyProProgressSucc)
    },
    getMyProProgressSucc (res) {
      res = res.data;
      if (res.ret && res.data) {
        const data = res.data;
        this.progressInfoList = data.progressInfoList;
        this.proImgList = data.proImgList;
      }
    }
  },
  mounted() {
    this.getMyProProgress();
  }
};
</script>

<style scoped>
.proDetailHeader {
  line-height: 1rem;
  padding: 0.15rem 0.05rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
.backIcon {
  vertical-align: middle;
  padding: 0.1rem .3rem;
  color: #000;
}
.proName {
  display: inline-block;
  vertical-align: middle;
}
.processInfo {
  padding: 0.3rem .48rem;
  border-bottom: 0.01rem solid #e6e3e3;
}
.personImgWrapper {
  width: 1.3rem;
  height: 1.3rem;
  background-color: rgb(159, 253, 237);
  border-radius: 50%;
}
.personImg {
  width: 100%;
}
.personName {
  height: 1rem;
  line-height: 0.9rem;
  font-size: 0.55rem;
}
.message {
  margin-top: 0.45rem;
  line-height: 0.45rem;
}
.footer {
  margin-top: 0.45rem;
}
.proImgMin {
  width: 100%;
  height: 2rem;
  border-radius: 0.18rem;
}
.van-popup {
  width: 100%;
  height: 50%;
}
.proImgMax {
  width: 100%;
  height: 10rem;
}

</style>
