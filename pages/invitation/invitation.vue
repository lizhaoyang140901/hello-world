<template>
	<view class="grandpa">
		<view class="son_one">
			<view class="son_one_one">
				<view class="son_son_txt">123245.1234</view>
				<view>累计收入(USDT)</view>
			</view>
			<view class="son_one_two">
				<u-line color="red" direction="col"/>
			</view>
			<view class="son_one_three">
				<view class="son_son_txt">45.12</view>
				<view>昨日收益(USDT)</view>
			</view>
		</view>
		<view class="son_two">
			<u-cell-item title="当前返佣比例" value="9%" ></u-cell-item>
		</view>
		<view class="son_three">我的好友</view>
		<view class="son_four">
			<view class="">
				<view>
					<image src="../../static/login/login.png"></image>
				</view>
				<view>
					<view>用户昵称</view>
					<view>153****1234</view>
				</view>
				<view>
					<view>超级合伙人</view>
					<view>返佣等级</view>
				</view>
			</view>
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
			
		}
	}
</script>

<style lang="scss">
	.grandpa{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.son_one{
			width: 100%;
			display: flex;
			margin: 0.5rem;
			padding: 0.5rem;
			border-radius: 0.5rem;
			background-image: url(../../static/fired/beijing.png);
			background-repeat: repeat;
			background-size: 100%;
			color: #FFFFFF;
			.son_son_txt{
				font-size: large;
				color: #DE531E;
			}
			.son_one_one{
				flex: 3;
				view{
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0.3rem 0;
				}
			}
			.son_one_two{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.son_one_three{
				flex: 3;
				view{
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0.3rem 0;
				}
			}
		}
		.son_two{
			width: 100%;
		}
		.son_three{
			width: 100%;
			margin: 0.5rem 0.8rem;
		}
		.son_four{
			width: 100%;
			margin: 0.5rem;
		}
	}
</style>
