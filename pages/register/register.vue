<template>
	<view class="grandpa">
		<view class="top">
			<view class="top_image">
				<image src="../../static/login/login.png"></image>
			</view>
		</view>
		<view class="first_select">
			<div class="select">
				<div class="select-head c-row a-c j-b"  v-on:click="changeSiteTitle()">
					<span class="select-head-cont" >{{condition}}</span>          
				</div>
				<ul class="option"  v-show="option">
					<li class="option-item  c-row a-c" v-for="item in siteList" v-on:click="changeSite(item)">            
						{{item.siteName}}
					</li>
				</ul>
			</div>
		</view>
		<view class="bottom">
			<view>注册</view>
			<view>
				<u-form :model="form" ref="uForm">
					<u-form-item >
						<u-input v-model="form.name" placeholder="请输入手机号"/><u-button @click="huoqu">获取验证码</u-button>
					</u-form-item>
					<!-- <move-verify @result='verifyResult' ref="verifyElement"></move-verify> -->
					<u-form-item left-icon="man-add">
						<u-input v-model="form.yzm" placeholder="请输入验证码"/>
					</u-form-item>
					<u-form-item left-icon="lock" >
						<u-input v-model="form.intro1" type="password" :password-icon="passwordIcon" placeholder="登陆密码(8-20位)数字和字母组成"/>
					</u-form-item>
					<u-form-item left-icon="lock" >
						<u-input v-model="form.intro2" type="password" :password-icon="passwordIcon" placeholder="确认登陆密码"/>
					</u-form-item>
					<u-form-item left-icon="share">
						<u-input v-model="form.yqm" placeholder="请输入邀请码"/>
					</u-form-item>
				</u-form>
			</view>
			<view>
				<u-button type="warning" class="custom-style" @click="zhuce">注册</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	// import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	import request from '../../common/request.js'
	
	export default {
		// components: {
		// 	"move-verify":moveVerify
		// },
		data() {
			return {
				form: {
					name: '',
					yzm: '',
					intro1: '',
					intro2: '',
					yqm: ''
				},
				passwordIcon:true,
				option: false,
				condition: "+86",
				siteList: [
					{ 
						siteName:   "+81"
					},{ 
						siteName:   "+82"
					},{ 
						siteName:   "+83"
					}
				],
				resultData:{}
			}
		},
		methods:{
			/* 校验结果回调函数 */
			// verifyResult(res){
			// 	console.log(res);
			// 	this.resultData = res;
			// 	if(res.flag == true){
			// 		console.log("truetruetrue")
			// 	}
			// },
			/* 校验插件重置 */
			// verifyReset(){
			// 	this.$refs.verifyElement.reset();
			// 	/* 删除当前页面的数据 */
			// 	this.resultData = {};
			// },
			changeSite(e) {
				console.log(e.siteName)
				this.condition = e.siteName
				this.option = false;
			},
			changeSiteTitle() {
				this.option = !this.option
			},
			huoqu: function(){
				console.log("发送成功");
				var model = this.form.name;
				var data = {
					  "area": "",
					  "mobile": model,
					  "ticket": "",
					  "randstr": "",
					  "code": ""
				}
				request.post('sms/Register',data).then(res=>{
					console.log(res,444444444444444);
				}) 
			},
			zhuce: function(){
				console.log("注册成功");
				var model = this.form.name;
				var password = this.form.intro1;
				var code = this.form.yzm;
				var data = {
					  "mobile": model,
					  "password": password,
					  "code": code,
					  "paypassword": "111111",
					  "InviateCode": "",
					  "countryid": 0,
					  "nick": ""
				}
				request.post('Member/Register',data).then(res=>{
					console.log(res,444444444444444);
					if(res.status === 1 ){
						console.log(res)
						setTimeout(function() {
						    uni.navigateTo({  
						        url: '/pages/login/login'  
						    });  
						}, 1000) 
					}
				}) 
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		.top{
			width: 100%;
			height: 30vh;
			display: flex;
			align-items: center;
			justify-content: center;
			.top_image{
				width: 30%;
				height: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.first_select{
			width: 10%;
			position: absolute;
			top: 16.7rem;
			left: 2rem;
			z-index: 99999;
			.select {
			    width: 2rem;
			    height: 1rem;
			    color: #666666;
			}
			
			.select-head {
			    height: .8rem;
			    color: #202020;
			    box-sizing: border-box;
			    line-height: .8rem;
			}
			
			.select-head .select-head-cont {
			    float: left;
			    padding-right: 10px;
			}
			
			.select:hover .option {
			    display: block;
			}
			
			.option {
			    position: absolute;
			    left: 0;
			    color: #63666E;
			    background: #FFFFFF;
			    line-height: 25px;
			    display: none;
			    z-index: 20000;
			    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.09);
			    text-align: center;
				list-style: none;
				padding: 0;
				padding-right: 10px;
			}
			
			.option-item {
			    border-bottom: .5px solid rgba(197, 197, 197, 0.27);
			    width: 1rem;
			    padding:.25rem;
			    height: .8rem;
			}
			
			.option-item:last-child {
			    border: none;
			}
		}
		.bottom{
			margin: 2rem 1rem;
			background-color: rgba(220,220,220,0.5);
			padding: 0.5rem 1rem;
			border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			view{
				width: 100%;
				margin: 0.3rem 0;
			}
		}
		.custom-style{
			background-color: #DE531E;
			width: 600rpx;
		}
	}
</style>
