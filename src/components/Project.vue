<template>
  <div id="project">
    <div class="proDetailHeader">
      <van-row type="flex">
        <van-col class="location">
          <span class="iconfont iconLocation"></span>
          <span class="city">{{city}}</span>
        </van-col>
        <van-col class="search">
          <van-search v-model="value" placeholder="请输入公司名称"/>
        </van-col>
        <van-col class="setUpWrapper">
          <router-link to="/setup">
            <!-- <img class="setUp" src="../assets/images/setup.png"> -->
            <button class="setUpBtn">发布</button>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- Tab标签 -->
    <van-tabs class="projectTab" color="#6678FF" title-active-color="#6678FF" v-model="active" swipeable>
      <van-tab title="正在进行的项目">
        <!-- 空状态 -->
        <van-empty
          v-show="emptyShowOfWorking"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您还没有发布项目哦~"
        />
        <!-- list加载 -->
        <van-list
        v-model="workingLoading"
        :finished="workingFinished"
        finished-text="没有更多了"
        @load="getWorkingPro"
        >
          <van-grid :column-num="1">
            <!-- <van-grid-item v-for="item in workingProList" :key="item.project_id"> -->
            <van-grid-item v-for="(item, index) in workingProList" :key="index">
              <router-link :to="'/TenderDetails/' + item.project_id">
                <img class="projectImg" :src="'https://test.sazjob.com' + item.images[0]" />
              </router-link>
              <div class="proMsgContent">
                <span class="proTitle">{{title[item.title]}}</span>
                <span class="proLabel">{{decorateStyle[item.decorate_style]}}</span>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-tab>

      <van-tab title="已经完成的项目">
        <van-empty
          v-show="emptyShowOfEnd"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您还没有完成的项目哦~"
        />
        <van-list
        v-model="endedLoading"
        :finished="endedFinished"
        finished-text="没有更多了"
        @load="getEndPro"
        >
          <!-- Grid -->
          <van-grid :column-num="1">
            <van-grid-item v-for="item in endProList" :key="item.project_id">
              <img class="projectImg" :src="'https://test.sazjob.com' + item.images[0]" />
              <div class="proMsgContent">
                <span class="proTitle">{{item.title}}</span>
                <span class="proLabel">{{decorateStyle[item.decorate_style]}}</span>
              </div>
              <div class="proView">
                <!-- layout布局 -->
                <van-row>
                  <van-col class="left" span="6">立即查看</van-col>
                  <router-link :to="'/TenderDetails/' + item.project_id">
                    <van-col class="right" span="2">
                      <van-icon class="rightIcon" name="arrow" />
                    </van-col>
                  </router-link>
                </van-row>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import store from '../../store'
export default {
  name: "Project",
  data() {
    return {
      city: '',
      value: "",
      active: 2,
      emptyShowOfWorking: false,
      emptyShowOfEnd: false,
      workingProList: [],
      endProList: [],
      title: ["毛坯房装修", "旧房改造", "局部改造", "工装装修"],
      decorateStyle: ["现代", "美式", "简约", "简欧", "欧式", "宜家", "中式", "田园", "日式", "混搭", "北欧", "地中海", "新古典", "东南亚"],
      // 正在进行、已经完成的项目在用list加载的时候，page、loading、finished是冲突的，所以各写各的
      workingPage: 1,
      endedPage: 1,
      workingLoading: false,
      endedLoading: false,
      workingFinished: false,
      endedFinished: false
    };
  },
  methods: {
    // 正在进行的项目
    getWorkingPro() {
      let data = {
        page: this.workingPage
      };
      this.$axios.post('https://test.sazjob.com/customapi/Project/workinglist', data).then(res => {
          console.log(res);
          let data = res.data.data;
          //遍历每一项
          for (let i = 0; i < data.length; i++) {
            let imgArr = data[i].images.split('|')
            data[i].images = imgArr;
            this.workingProList.push(data[i]);
          }
          this.workingProList == undefined ? this.emptyShowOfWorking = true : this.emptyShowOfWorking = false;
          this.workingPage += 1;
          this.workingLoading = false;
          // 当最后一次请求的数据小于20条时候，结束加载，并且显示加载完毕状态（‘没有更多了’）
          if (data.length < 20) {
            this.workingFinished = true;
          }
        })
        .catch(err => {
          console.log(`当前错误信息：${err.message}`);
        })
    },
    // 已经完成的项目
    getEndPro() {
      let data = {
        page: this.endedPage
      };
      this.$axios.post('https://test.sazjob.com/customapi/Project/endlist', data).then(res => {
          let data = res.data.data;
          //遍历每一项
          for (let i = 0; i < data.length; i++) {
            let imgArr = data[i].images.split('|')
            data[i].images = imgArr;
            this.endProList.push(data[i]);
          }
          this.endProList = data;
          this.endProList == undefined ? this.emptyShowOfEnd = true : this.emptyShowOfEnd = false;
          this.endedPage += 1;
          this.endedLoading = false;
          // 当最后一次请求的数据小于20条时候，结束加载，并且显示加载完毕状态（‘没有更多了’）
          if (data.length < 20) {
            this.endedFinished = true;
          }
        })
        .catch(err => {
          console.log(`当前错误信息：${err.message}`);
        })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0);
     }
  },
  mounted() {
    if(typeof testfun === "function"){
			this.city = testfun();
		}else{
			this.city = '乌鲁木齐市';
			// this.city = '天津';
		}
    this.getWorkingPro();
    this.getEndPro();
    // console.log('workingProList' + ':' + typeof(this.workingProList));
  },
}
</script>

<style scoped>
.proDetailHeader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  line-height: 1rem;
  padding: 0.65rem 0.48rem .15rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
.location {
  max-width: 3rem;
  font-size: 0.4rem;
  color: #6678ff;
}
.search {
  flex: 1;
}
.van-search {
  width: 80%;
  padding: 0;
  padding-top: .05rem;
  background-color: #fafafa;
  margin-left: .2rem;
}
.van-search__content {
  background-color: #fff;
  border: .02rem solid #969696;
  border-radius: 1rem;
}
.setUpBtn {
  position: relative;
  width: 1.2rem;
  height: .85rem;
  right: .8rem;
  color: #fff;
  background-color: #6678ff;
  font-size: .4rem;
  border-radius: .2rem;
}
/* .projectTab {
   background-color: #f40; 
   margin-top: .5rem; 
} */
/* Tab切换 */
#project >>> .van-tabs__nav--line {
  position: fixed;
  top: 1.78rem;
  z-index: 99;
  width: 100%;
  height: 1.1rem;
}
/* 空状态 */
#project >>> .custom-image .van-empty__image {
  width: 3rem;
  height: 3rem;
  margin-top: 5rem;
  border: 0;
}
/* 每一个项目 */
.van-grid-item:first-of-type {
  margin-top: 1.2rem;
}
#project >>> .van-grid-item__content {
  height: auto;
  padding: 0;
  margin: 0.5rem 0.48rem 0 0.48rem;
  border-radius: 0.13rem;
  box-shadow: 1px 1px 5px #e7e2e2;
  overflow: hidden;
  z-index: 9;
}
.projectImg {
  width: 100%;
  height: 4.9rem;
}
.proMsgContent {
  width: 100%;
  padding: 0.45rem 0 0.2rem 0.45rem;
  border-bottom: 0.02rem solid #f3eaea;
}
.proTitle {
  display: block;
  font-size: 0.43rem;
}
.proLabel {
  display: block;
  font-size: 0.33rem;
  color: #666;
  margin-top: 0.3rem;
}
.proView {
  width: 100%;
  padding: 0.23rem 0.45rem;
  font-size: 0.33rem;
  color: #666;
}
a {
  color: #666;
}
.left,
.right {
  padding-left: 0.2rem;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
