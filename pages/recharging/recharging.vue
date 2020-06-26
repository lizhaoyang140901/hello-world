<template>
	<view class="grandpa">
		<view class="son_one">
			<view>充提类型</view>
			<view class="son_one_right">充值</view>
		</view>
		<view class="son_two">
			<view>充提币种</view>
			<view class="son_two_right">BTC</view>
		</view>
		<view class="son_three">
			<view>变动数量</view>
			<view class="son_three_right">23123123</view>
		</view>
		<view class="son_four">
			<view>开始时间</view>
			<view class="son_four_right">2020-05-20 13:14</view>
		</view>
		<view class="son_five">
			<view>当前状态</view>
			<view class="son_five_right">成功</view>
		</view>
		<view class="son_six">
			<view>变动哈希</view>
		</view>
		<view class="son_seven">
			<view></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.grandpa{
		margin: 0.5rem;
		background-color: rgba(0,0,0,0.1);
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		.son_one{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
			.son_one_right{
				text-align: right;
			}
		}
		.son_two{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
			.son_two_right{
				text-align: right;
			}
		}
		.son_three{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
			.son_three_right{
				text-align: right;
			}
		}
		.son_four{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
			.son_four_right{
				text-align: right;
			}
		}
		.son_five{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
			.son_five_right{
				text-align: right;
			}
		}
		.son_six{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
		}
		.son_seven{
			width: 100%;
			display: flex;
			view{
				flex: 1;
				padding: 0.5rem 0;
			}
		}
	}
</style>
