<template>
	<view class="grandpa">
		<u-form :model="form" ref="uForm">
			<u-form-item label="旧交易密码" label-width="180">
				<u-input v-model="form.name" type="password" password-icon="true" placeholder="请输入原密码"/>
			</u-form-item>
			<u-form-item label="新交易密码" label-width="180" >
				<u-input v-model="form.intro" type="password" password-icon="true" placeholder="请输入新密码"/>
			</u-form-item>
			<u-form-item label="确认密码" label-width="180" >
				<u-input v-model="form.intro" type="password" password-icon="true" placeholder="请输入新密码"/>
			</u-form-item>
		</u-form>
		<view class="tishi">
			交易密码由6位数字组成
		</view>
		<view class="queren">
			<u-button type="warning" class="custom-style">确认</u-button>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					form: {
						name: '',
						intro: ''
					}
				}
			}
		}
</script>

<style lang="scss">
	.grandpa{
		margin: 0.5rem;
		.tishi{
			color: red;
			margin: 0.5rem 0;
		}
		.custom-style{
			background-color: #DE531E;
			width: 600rpx;
		}
		.queren{
			margin: 5rem 0;
		}
	}
</style>
