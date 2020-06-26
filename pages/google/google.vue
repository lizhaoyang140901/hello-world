<template>
	<view class="gradient">
		<view class="son_one">
			<view class="son_one_top">
				<view class="son_image">
					<image src="../../static/lunbo/ma.jpg"></image>
				</view>
			</view>
			<view class="son_one_bottom">
				点击复制
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_top">
				<u-field v-model="mobile" label="谷歌验证码" label-width="150" placeholder="请填写谷歌验证码" ></u-field>
			</view>
			<view class="son_two_border"><u-line color="#423937" /></view>
			<view class="son_two_center">
				<u-field v-model="code" label="交易密码" label-width="150" placeholder="请填写交易密码" ></u-field>
			</view>
			<view class="son_two_border"><u-line color="#423937" /></view>
			<view class="son_two_wj">忘记密码?</view>
			<view class="son_two_bottom">
				<u-button type="warning">确认绑定</u-button>
			</view>
		</view>
		<view class="son_three" @click="hp_content">
			什么是谷歌验证？
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			/* 什么是谷歌验证 */
			hp_content:function(){
				uni.navigateTo({
				    url: '../hp-content/hp-content'
				});
			}
		}
	}
</script>

<style lang="scss">
	.gradient{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.son_one{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.son_one_top{
				width: 100%;
				height: 30vh;
				display: flex;
				align-items: center;
				justify-content: center;
				.son_image{
					width: 50%;
					height: 85%;
				}
				image{
					width: 100%;
					height: 100%;
				}
			}
			.son_one_bottom{
				width: 100%;
				text-align: center;
				margin-bottom: 1rem;
			}
		}
		.son_two{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 0.5rem 1rem;
			background-color: rgba(0,0,0,0.1);
			border-radius: 0.5rem;
			.son_two_border{
				width: 90%;
			}
			.son_two_top{
				width: 100%;
			}
			.son_two_center{
				width: 100%;
			}
			.son_two_bottom{
				width: 100%;
				margin: 0.5rem 1rem;
			}
			.son_two_wj{
				width: 100%;
				text-align: right;
				margin: 0.5rem 1rem;
			}
		}
		.son_three{
			width: 100%;
			text-align: center;
			margin-top: 6rem;
		}
	}
</style>
