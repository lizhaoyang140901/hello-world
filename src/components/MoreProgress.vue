<template>
  <div id="mornProgress">
    <van-sticky>
      <div class="proDetailHeader">
        <router-link to="/details">
          <van-icon class="backIcon" name="arrow-left" size=".6rem" />
        </router-link>
        <div class="proName">更多工作进度</div>
      </div>
    </van-sticky>
    <div class="processInfo" v-for="item in progressInfoList" :key="item.id">
      <div class="header">
        <van-row>
          <van-col class="vanCol" span="4"> 
              <div class="personImgWrapper">
                  <img class="personImg" :src="item.personImg">
              </div>
          </van-col>
          <van-col class="vanCol" span="4">
            <div class="personName">{{item.personName}}</div>
            <div class="theDay">{{item.theDay}}</div>
          </van-col>
        </van-row>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="footer">
        <van-row gutter="20">
          <van-col span="8" v-for="item in proImgList" :key="item.id">
            <img class="proImg" :src="item.imgUrl" />
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MornProgress",
  data() {
    return {
      progressInfoList: [],
      proImgList: []
    };
  },
 methods: {
    getMoreProgress () {
      this.$axios.get('../../static/mock/moreProgress.json')
      .then(this.getMoreProgressSucc);
    },
    getMoreProgressSucc (res) {
      res = res.data;
      if (res.ret && res.data) {
        const data = res.data;
        this.proImgList = data.proImgList;
        this.progressInfoList = data.progressInfoList;
      }
    }
  },
  mounted () {
    this.getMoreProgress();
  }
};
</script>

<style scoped>
.proDetailHeader {
  line-height: 1rem;
  padding: 0.15rem 0.2rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
.backIcon {
  vertical-align: middle;
  padding: 0.1rem;
  color: #000;
}
.proName {
  display: inline-block;
  vertical-align: middle;
}
.processInfo {
  padding: .3rem .48rem;
  border-bottom: .01rem solid #e6e3e3;
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
    /* height: 1rem; */
    line-height: .9rem;
    font-size: .45rem;
}
.content {
  margin-top: 0.45rem;
  line-height: 0.45rem;
}
.footer {
  margin-top: 0.45rem;
}
.proImg {
  width: 100%;
  height: 2rem;
  border-radius: 0.18rem;
}
</style>
