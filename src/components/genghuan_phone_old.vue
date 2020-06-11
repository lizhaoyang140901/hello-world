<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">更换手机号</van-col>
      </van-row>
    </header>
    <!-- 手机号 -->
    <van-field v-model="tel" type="number" placeholder="请输入您的原手机号" maxlength="11" />
    <!-- 验证码 -->
    <van-field v-model="sms" center clearable placeholder="请输入短信验证码" type="number">
      <template #button>
        <van-button size="small" color="#6678ff" @click="zc_verify" v-show="show">获取验证码</van-button>
        <van-button size="small" color="#6678ff" class="count" v-show="!show">{{ count }}</van-button>
      </template>
    </van-field>
    <div class="zhBtn" @click="bangding">下一步</div>
  </div>
</template>

<script>
import store from '../../store/index.js'
export default {
  name: "genghuan_phone_old",
  data() {
		return {
			lefturl: require('../assets/images/left.png'),
			tel: "",
			sms: "",
			show: true,
			count: "",
			verify_id:''
		};
	},
	methods: {
		jumpB() {
			this.$router.go(-1);
		},
		zc_verify() {
			if (this.tel == "") {
				this.show = true;
				clearInterval(this.timer);
				this.timer = null;
				this.$toast("手机号不能为空");
			} else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/.test(this.tel)) {
				this.show = true;
				clearInterval(this.timer);
				this.timer = null;
				this.$toast("请正确填写手机号");
			} else {
				var Toast = this.$toast;
				var $store = this.$store;
				var that = this;
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
				this.$axios.post("https://test.sazjob.com/customapi/User/sendSms", {
					mobile: this.tel
				}).then(function(response) {
					that.verify_id = response.data.key;
					console.log(response.data.code);
					console.log(that.verify_id);
					if (response.data.status == 200) {
						Toast.success("验证码发送成功,请注意查收");
					} else if (response.data.status == 201) {
						Toast("请输入真实手机号");
					} else if (response.data.status == 102) {
						Toast("手机号格式错误");
					} else {
						Toast.fail("网络不佳请稍后重试");
					}
				}).catch(function(error) {
						console.log(error);
				});
			}
		},
		bangding(){
			var that = this;
			if (this.tel == "") {
				this.$toast({
					message: "手机号不能为空",
					icon: "chat-o"
				});
			} else if (!/^1[3456789]\d{9}$/.test(this.tel)) {
				this.$toast({
					message: "请正确填写手机号",
					icon: "chat-o"
				});
			} else if (this.sms == "") {
				this.$toast({
					message: "请输入验证码",
					icon: "chat-o"
				});
			}else {
				this.$axios.post('https://test.sazjob.com/customapi/User/changeoldphone',{
					phone:this.tel,
					model:this.tel,
					verify_id:this.verify_id,
					verify:this.sms
				}).then(_d => {
					console.log(_d)
					console.log(_d.data.status);
					if (_d.data.status == 102) {
						this.$toast({
							message: "验证成功",
							icon: "chat-o"
						});
						setTimeout(function() {
							that.$router.push({ name: "phone_new" });
						}, 1000);
					} else if (_d.data.status == 101) {
						this.$toast({
							message: "手机不存在",
							icon: "chat-o"
						});
						this.tel = '';
						this.sms = '';
					} else if (_d.data.status == 100) {
						this.$toast({
							message: "手机格式不合法",
							icon: "chat-o"
						});
						this.tel = '';
						this.sms = '';
					} else {
						this.$toast({
							message: "操作失败",
							icon: "chat-o"
						});
						this.tel = '';
						this.sms = '';
					}
				})
			}
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
.zhBtn{
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 0.5rem;
    background: #6678ff;
    height: 1.2rem;
    border-radius: 0.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
}
</style>
