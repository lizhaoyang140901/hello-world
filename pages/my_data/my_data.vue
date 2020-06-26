<template>
	<view class="grandpa">
		<view class="touxiang">
			<view class="touxiang_img">
				<image src="../../static/lunbo/head.png"></image>
			</view>
			<view class="touxiang_text">修改头像</view>
		</view>
		<view class="phone">
			<view>手机</view>
			<view class="phone_phone">13145567890</view>
		</view>
		<view class="unlogin">
			<u-button type="warning" class="custom-style">退出登录</u-button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.grandpa{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.touxiang{
			width: 90%;
			height: 20vh;
			display: flex;
			flex-wrap: wrap;
			margin: 1rem 0;
			background-color: rgba(50,40,38,0.2);
			.touxiang_img{
				width: 100%;
				height: 70%;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				margin-bottom: 0.5rem;
			}
			.touxiang_text{
				width: 100%;
				height: 30%;
				display: flex;
				justify-content: center;
				align-items: flex-start;
			}
			image{
				width: 25%;
				height: 60%;
				border-radius: 50%;
			}
		}
		.phone{
			width: 90%;
			display: flex;
			margin: 1rem 0;
			view{
				flex: 1;
			}
			.phone_phone{
				text-align: right;
			}
		}
		.unlogin{
			display: flex;
			height: 70vh;
			align-items: center;
			.custom-style{
				color: #DE531E;
				width: 600rpx;
			}
		}
	}
</style>
