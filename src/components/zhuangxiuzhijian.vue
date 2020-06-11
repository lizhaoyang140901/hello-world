<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">装修质检</van-col>
      </van-row>
    </header>
    <div class="content">
		<div class="denglu" v-if="usertoken">
			<van-button round type="primary" size="large" @click="tijiao" v-if="zhijian">我要质检</van-button>
		</div>
		<div class="denglu" v-else>
			<div v-if="liuxia">
				<div class="tishi">
					未登录，请留下您的信息。
				</div>
				<van-form @submit="onSubmit">
				<van-field
					v-model="username"
					label="姓名"
					:rules="[{ required: true, message: '请填写姓名' }]"
				/>
				<van-field
					v-model="phone"
					label="电话"
					:rules="[{ required: true, message: '请填写电话' }]"
				/>
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
					提交
					</van-button>
				</div>
				</van-form>
			</div>
        </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  name: "zhuangxiuzhijian",
  data(){
    return{
			lefturl:require('../assets/images/left.png'),
      username: '',
      phone: '',
	  //1
      /* usertoken: this.$store.state.token, */
	  //2
	  usertoken:'',
      zhijian: true,
      liuxia: true,
    }
  },
  components: {
      [Dialog.Component.name]: Dialog.Component,
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      this.liuxia = false;
      Dialog.alert({
        title: '您已提交',
        message: '请等候消息',
      }).then(() => {
        this.$router.go(-1);
      });
    },
    tijiao(){
      this.zhijian = false;
      Dialog.alert({
        title: '您已提交',
        message: '请等候消息',
      }).then(() => {
        this.$router.go(-1);
      });
    }
  },
   mounted(){
	  this.usertoken = this.$common.read_userinfo().token;
	  this.userid = this.$common.read_userinfo().userclass_id;
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
.content{
  height:100%;width:100%;
  position:fixed;
  background-image: url(../assets/images/timg.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.denglu{
  position:absolute;
  left: 10%;
  top: 30%;
  bottom: 0;
  right: 10%;
  margin: auto;
}
.tishi{
  text-align: center;
  margin: 0, auto;
  background-color: #FFFFFF;
  padding: 0.5rem 0;
  font-size: larger;
}
</style>
