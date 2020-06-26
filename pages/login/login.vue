<template>
	<view class="grandpa">
		<view class="top">
			<view class="top_image">
				<image src="../../static/login/login.png"></image>
			</view>
		</view>
		<view class="bottom">
			<view>登陆</view>
			<view>
				<u-form :model="form" ref="uForm">
					<u-form-item label="手机号" label-width="120">
						<u-input v-model="form.name" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item label="密码" label-width="120" >
						<u-input v-model="form.intro" type="password" :password-icon="passwordIcon" placeholder="登陆密码"/>
					</u-form-item>
				</u-form>
			</view>
			<!-- <view>
				<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
			</view> -->
			<view>
				<u-button type="warning" class="custom-style" @click="show">登陆</u-button>
				<!-- <view>开发中，暂不需登陆，点击进入首页</view> -->
			</view>
			<view class="bottom_bottom">
				<view @click="forget">忘记密码</view>
				<view class="zhuce" @click="register">立即注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	/* import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue" */
	import request from '../../common/request.js'
	import Vue from 'vue'
	import Router from '@/router'
	
	export default {
			// components: {
		 //        "move-verify":moveVerify
		 //    },
			data() {
				return {
					form: {
						name: '',
						intro: ''
					},
					passwordIcon: true,
					resultData:{}
				}
			},
			methods:{
				show:function(){
					console.log("123456789")
					var model = this.form.name;
					var password = this.form.intro;
					var data = {
						"mobile": model,
						"password": password,
						"code": "123456",
						"Mold": 0,
						"CheckMold": 0
					}
					request.post('Member/Login',data).then(res=>{
						console.log(res,444444444444444);
						if(res.status === 1){
							console.log(res)
							uni.setStorage({
								key: 'userInfo',
								data: res.data.data,
								success: function () {
									uni.switchTab({
									    url: '/pages/index/index'  
									});
								}
							});  
						}
					}) 
				},
				/* 忘记密码 */
				forget:function(){
					uni.navigateTo({
					    url: '../forget/forget'
					});
				},
				/* 注册 */
				register: function(){
					uni.navigateTo({
					    url: '../register/register'
					});
				},
				/* 校验结果回调函数 */
				// verifyResult(res){
				// 	console.log(res);
				// 	this.resultData = res;
				// },
				/* 校验插件重置 */
				// verifyReset(){
				// 	this.$refs.verifyElement.reset();
				
				// 	/* 删除当前页面的数据 */
				// 	this.resultData = {};
				// }
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
				height: 40%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.bottom{
			margin: 0.5rem;
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
			.bottom_bottom{
				display: flex;
				view{
					flex: 1;
				}
				.zhuce{
					text-align: right;
				}
			}
		}
		.custom-style{
			background-color: #DE531E;
			width: 600rpx;
		}
	}
</style>
