<template>
  <div id="proDetails">
    <!-- Panel面板 -->
    <van-sticky>
      <div class="proDetailHeader">
        <router-link to="/project">
          <van-icon class="backIcon" name="arrow-left" size=".6rem" />
        </router-link>
        <div class="proName">某项目</div>
      </div>
    </van-sticky>
    <!-- swiper -->
    <div class="my-swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in proDetailsList.proImgList" :key="item.id">
          <img class="proImg" :src="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- Panel面板 -->
    <van-panel class="proIntro" title="某项目" desc="项目介绍">
      <div class="proDesc">{{ proDetailsList.proDesc }}</div>
    </van-panel>
    <div class="proDivision">项目分工</div>
    <!-- 项目分工 -->
      <ul class="divisionWrapper">
        <li class="divisionItem" v-for="item in proDetailsList.proStaffList" :key="item.id">
          <van-grid :column-num="1" :icon-size="65">
            <van-grid-item :text="item.staffName" :icon="item.staffImg"></van-grid-item>
          </van-grid>
           <span class="staffBtn">点击查看</span>
        </li>
      </ul>
    <!-- 工作进度 -->
    <div class="proProgress">
      <router-link to="/myProgress">
        <div class="myProgress">我的工作进度</div>
      </router-link>
      <router-link to="/moreProgress">
        <div class="moreProgress">
          更多工作进度
          <van-icon class="lookIcon" name="arrow" />
        </div>
      </router-link>
    </div>
    <!-- 上传工作进度 -->
    <div class="ProgressUpload">
      <van-field
        class="msgInput"
        v-model="myProProgress.message"
        rows="1"
        autosize
        type="textarea"
        placeholder="今日工作进度"
      />
      <!-- 图片上传 -->
      <van-uploader
        class="uploadImg"
        v-model="myProProgress.uploadFileList"
        :max-count="3"
      />
    </div>
    <van-button
      class="reportBtn"
      @click="postProProgress"
      type="primary"
      size="mini"
      color="#6678ff"
      to="/myProgress"
    >新建项目进度</van-button>
  </div>
</template>

<script>
export default {
  name: "ProDetails",
  data() {
    return {
      proDetailsList: {
        proImgList: [],
        proStaffList: []
      },
      // 要post的json数据
      myProProgress: {
        personImg: "../../static/images/personImg.png",  
        personName: "琴琴",
        date: "2020/4/7",
        message: "",
        uploadFileList: []
      }
    };
  },
  methods: {
    // 将myProgress页面中的数据post到firebase中
    postProProgress() {
      this.$axios .post("https://tingmu-9c4e3.firebaseio.com/myProgress.json", this.myProProgress)
        .then(data => {
          console.log(data);
      });
    },
    getProDetails() {
      this.$axios.get("../../static/mock/proDetails.json", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(this.getProDetailsSucc);
    },
    getProDetailsSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        const data = res.data;
        this.proDetailsList = data;
      }
    }
  },
  mounted() {
    this.getProDetails();
  }
};
</script>

<style scoped>
.proDetailHeader {
  line-height: 1rem;
  padding: 0.15rem .33rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
.backIcon {
  vertical-align: middle;
  color: #000;
}
.proName {
  display: inline-block;
  vertical-align: middle;
}
/* 轮播图 */
.my-swipe {
  margin-top: 0.3rem;
  padding: 0 0.48rem;
}
#proDetails >>> .van-swipe {
  border-radius: 0.13rem; /*直接给swiper组件的最外层加圆角*/
  height: 6.6rem;
}
.proImg {
  width: 100%;
  height: 100%;
}
/* 轮播图以下 */
.van-cell:not(:last-child)::after {
  border: 0;
}
/* 项目介绍 */
.van-cell {
  padding: .3rem .48rem;
  font-size: .48rem;
}
.van-cell__label {
  font-size: .4rem;
}
.proDesc {
  line-height: 0.5rem;
  padding: 0 .48rem;
  text-indent: 2em;
  font-size: .4rem;
}
/* "项目分工" */
.proDivision {
  line-height: 0.5rem;
  padding: 0 .48rem;
  margin-top: 0.4rem;
  font-size: 0.4rem;
  color: #969799;
}
.divisionWrapper {
  list-style: none;
  white-space: nowrap;
  overflow-x: scroll;
}                          
.divisionItem:first-child {
   margin-left: .23rem;
}                 
.divisionItem:last-child {        
    margin-right: .23rem;
}
.divisionItem {                     
    position: relative;
    display: inline-block  ;     
    width: 23%;
    margin-top: .08rem;
    text-align: center;
    margin-right: .13rem;
    font-size: .24rem;
}     
#proDetails >>> [class*="van-hairline"]::after {
  border: 0;
}
#proDetails >>> .van-grid-item__content {
  padding: 0;
  padding-bottom: 0.15rem;
}
#proDetails >>> .van-grid-item__text {
  margin: 0;
  font-size: .4rem;
}
.staffBtn {
  display: inline-block;
  font-size: 0.32rem;
  color: #fff;
  background-color: #6678ff;
  padding: 0.15rem .25rem;
  border-radius: 0.3rem;
}
.proProgress {
  position: relative;
  height: 0.7rem;
  margin-top: 0.6rem;
}
.myProgress,
.moreProgress {
  position: absolute;
  bottom: 0;
  color: #333;
}
.myProgress {
  left: 0.48rem;
  font-size: 0.4rem;
}
.moreProgress {
  right: 0.3rem;
  font-size: 0.36rem;
}
.lookIcon {
  vertical-align: bottom;
}
/* 进度上传 */
.ProgressUpload {
  margin-top: 0.15rem;
  background-color: #f2f2f2;
}
.msgInput {
  background-color: #f2f2f2;
  font-size: 0.32rem;
}
.uploadImg {
  margin-top: 0.2rem;
}
.uploadImg {
  margin-left: 0.4rem;
}
.reportBtn {
  display: block;
  width: 7.14rem;
  height: .83rem;
  margin: 0.5rem auto;
  border-radius: .41rem;
  font-size: .48rem;
}
</style>
