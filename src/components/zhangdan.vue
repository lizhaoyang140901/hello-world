<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">我的账单</van-col>
      </van-row>
    </header>
	<van-tabs v-model="activeName">
	  <van-tab title="全部" name="a" class="zhangdan">
		  <van-row type="flex" justify="space-around">
		    <van-col span="6">收入:</van-col>
		    <van-col span="6">2020/04/22 19:55</van-col>
		    <van-col span="6">+500.00元</van-col>
		  </van-row>
		  <div class="van-hairline--bottom"></div>
		  <van-row type="flex" justify="space-around">
		    <van-col span="6">支出:</van-col>
		    <van-col span="6">2020/04/22 20:55</van-col>
		    <van-col span="6">-200.00元</van-col>
		  </van-row>
	  </van-tab>
	  <van-tab title="收入" name="b" class="zhangdan">
		  <van-row type="flex" justify="space-around">
		    <van-col span="6">收入:</van-col>
		    <van-col span="6">2020/04/22 19:55</van-col>
		    <van-col span="6">+500.00元</van-col>
		  </van-row>
	  </van-tab>
	  <van-tab title="支出" name="c" class="zhangdan">
		  <van-row type="flex" justify="space-around">
		    <van-col span="6">支出:</van-col>
		    <van-col span="6">2020/04/22 20:55</van-col>
		    <van-col span="6">-200.00元</van-col>
		  </van-row>
	  </van-tab>
	</van-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "zhangdan",
  data() {
    return {
		lefturl:require('../assets/images/left.png'),
      activeName: 'a'
    };
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    }
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
.zhangdan {
	text-align: center;
	font-size: larger;
	padding: 0.1rem;
}
</style>
