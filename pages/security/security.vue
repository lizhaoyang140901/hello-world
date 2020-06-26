<template>
	<view>
		<u-cell-group>
			<u-cell-item title="修改登录密码" @click="loginps"></u-cell-item>
			<u-cell-item title="设置交易密码" @click="jiaoyips"></u-cell-item>
			<u-cell-item title="谷歌验证码" value="未绑定" @click="google"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					
				}
			},
			methods:{
				loginps:function(){
					uni.navigateTo({
					    url: '../loginps/loginps'
					});
				},
				jiaoyips:function(){
					uni.navigateTo({
					    url: '../jiaoyips/jiaoyips'
					});
				},
				/* 谷歌验证 */
				google: function(){
					uni.navigateTo({
					    url: '../google/google'
					});
				}
			}
		}
</script>

<style>
</style>
