<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">效果图</van-col>
      </van-row>
    </header>
    <!-- 效果图 -->
    <van-grid :border="false" :column-num="3" class="tuijianBox">
      <van-grid-item v-for="(n, inx) in tuijianList" :key="inx">
        <img :src="'https://test.sazjob.com/' +n.headimg" class="tuijianImg" />
        <div class="tuijianTxt">{{n.content}}</div>
        <van-row class="juchangClass">
          <van-col span="3">
            <img :src="'https://test.sazjob.com/' +n.logo" class="tuijianLogo" />
          </van-col>
          <van-col span="12">
            <div class="juchangTxt">{{n.title}}</div>
          </van-col>
        </van-row>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
	name: "xiaoguotu",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			tuijianList: []
		};
	},
	methods: {
		jumpB() {
			this.$router.go(-1);
		}
	},
	created() {
		this.$axios.get("https://test.sazjob.com/backapi/HomePage/index").then(_d => {
		this.tuijianList = _d.data.data.list;
    });
  }
};
</script>

<style scoped>
header {
  padding: 0 0.3rem;
  height: 1.4rem;
  line-height: 1.4rem;
  border-bottom: 0.15rem solid #f2f2f2;
  font-size: 0.5rem;
}
.leftImg {
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}
.zshejishi {
  display: inline-block;
}
.tuijian {
  margin: 0.1rem 0 0 0.3rem;
  font-size: 0.4rem;
}
.tuijianImg {
  width: 4.27rem;
  height: 4.27rem;
  border-radius: 0.2rem;
}
.tuijianTxt {
  width: 4.27rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
.tuijianLogo {
  width: 0.5rem;
  height: 0.5rem;
}
.heart {
  float: left;
  margin-top: 0.01rem;
  width: 0.4rem;
  height: 0.4rem;
}
.juchangClass {
  width: 100%;
  margin-top: 0.1rem;
  height: 0.5rem;
  line-height: 0.5rem;
}
.juchangTxt {
  margin-left: 0.1rem;
  width: 3.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.juchangRight {
  float: right;
}
.heartNumber {
  float: left;
  margin-left: 0.05rem;
}
.tuijianBox {
  margin: 0 0.3rem;
}
.tuijianBox >>> .van-grid-item__content{
  padding: 0.5rem 0.2rem;
}
</style>
