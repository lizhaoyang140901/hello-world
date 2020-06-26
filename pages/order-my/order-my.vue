<template>
	<view class="grandpa">
		<view class="son" v-for="(stiem,index) in ddlist" :key="index">
			<view class="son_one">
				<view class="son_one_left">{{stiem.bz}}</view>
				<view class="son_one_center">{{stiem.text1}}</view>
				<view class="son_one_right">{{stiem.text2}}</view>
			</view>
			<view class="son_two">
				<view class="son_two_left">
					<view class="son_two_left_one">{{stiem.text3}}</view>
					<view class="son_two_left_two">{{stiem.text4}}</view>
				</view>
				<view class="son_two_right">
					<view class="son_two_right_one">{{stiem.text5}}</view>
					<view class="son_two_right_two">{{stiem.text6}}</view>
				</view>
			</view>
			<view class="son_three">
				<view class="son_three_left">
					<view class="son_three_left_one">{{stiem.text7}}</view>
					<view class="son_three_left_two">{{stiem.text8}}</view>
				</view>
				<view class="son_three_right">
					<view class="son_three_right_one">{{stiem.text9}}</view>
					<view class="son_three_right_two">{{stiem.text10}}</view>
				</view>
			</view>
			<view class="son_four">
				<view class="son_four_left">
					<view class="son_four_left_one">{{stiem.text11}}</view>
					<view class="son_four_left_two">{{stiem.text12}}</view>
				</view>
				<view class="son_four_right"></view>
			</view>
			<view class="son_six">
				<u-line color="#423937" />
			</view>
			<view class="son_seven">
				{{stiem.data}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ddlist: [
					{
						bz: "BTC/USDT",
						text1: "买涨",
						text2: "开跌",
						text3: "开盘价格:",
						text4: "13980.0085",
						text5: "收盘价格:",
						text6: "13980.6500",
						text7: "投入本金:",
						text8: "2000 CBE",
						text9: "盈亏:",
						text10: "+850 USDT",
						text11: "手续费:",
						text12: "10 CBE",
						data: "2019.05.20 13:14:00 - 2020.05.20 13:14:00"
					},
					{
						bz: "BTC/USDT",
						text1: "买涨",
						text2: "开跌",
						text3: "开盘价格:",
						text4: "13980.0085",
						text5: "收盘价格:",
						text6: "13980.6500",
						text7: "投入本金:",
						text8: "2000 CBE",
						text9: "盈亏:",
						text10: "+850 USDT",
						text11: "手续费:",
						text12: "10 CBE",
						data: "2019.05.20 13:14:00 - 2020.05.20 13:14:00"
					},
					{
						bz: "BTC/USDT",
						text1: "买涨",
						text2: "开跌",
						text3: "开盘价格:",
						text4: "13980.0085",
						text5: "收盘价格:",
						text6: "13980.6500",
						text7: "投入本金:",
						text8: "2000 CBE",
						text9: "盈亏:",
						text10: "+850 USDT",
						text11: "手续费:",
						text12: "10 CBE",
						data: "2019.05.20 13:14:00 - 2020.05.20 13:14:00"
					},{
						bz: "BTC/USDT",
						text1: "买涨",
						text2: "开跌",
						text3: "开盘价格:",
						text4: "13980.0085",
						text5: "收盘价格:",
						text6: "13980.6500",
						text7: "投入本金:",
						text8: "2000 CBE",
						text9: "盈亏:",
						text10: "+850 USDT",
						text11: "手续费:",
						text12: "10 CBE",
						data: "2019.05.20 13:14:00 - 2020.05.20 13:14:00"
					},
					{
						bz: "BTC/USDT",
						text1: "买涨",
						text2: "开跌",
						text3: "开盘价格:",
						text4: "13980.0085",
						text5: "收盘价格:",
						text6: "13980.6500",
						text7: "投入本金:",
						text8: "2000 CBE",
						text9: "盈亏:",
						text10: "+850 USDT",
						text11: "手续费:",
						text12: "10 CBE",
						data: "2019.05.20 13:14:00 - 2020.05.20 13:14:00"
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.son{
			width: 100%;
			margin: 0.5rem;
			padding: 0.3rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			background-color: rgba(0,0,0,0.3);
			border-radius: 0.5rem 0.5rem;
			view{
				margin: 0.2rem 0;
			}
			.son_one{
				width: 100%;
				display: flex;
				.son_one_left{
					flex: 1;
				}
				.son_one_center{
					color: #25B770;
					flex: 2;
				}
				.son_one_right{
					flex: 1;
					text-align: right;
					color: #DE531E;
				}
			}
			.son_two{
				width: 100%;
				display: flex;
				.son_two_left{
					flex: 1;
					display: flex;
					.son_two_left_one{
						flex: 1;
						color: #423937;
					}
					.son_two_left_two{
						flex: 1.5;
					}
				}
				.son_two_right{
					flex: 1;
					display: flex;
					.son_two_right_one{
						flex: 1;
						color: #423937;
					}
					.son_two_right_two{
						flex: 1.5;
						color: #DE531E;
					}
				}
			}
			.son_three{
				width: 100%;
				display: flex;
				.son_three_left{
					flex: 1;
					display: flex;
					.son_three_left_one{
						flex: 1;
						color: #423937;
					}
					.son_three_left_two{
						flex: 1.5;
					}
				}
				.son_three_right{
					flex: 1;
					display: flex;
					.son_three_right_one{
						flex: 1;
						color: #423937;
					}
					.son_three_right_two{
						flex: 1.5;
						color: #25B770;
					}
				}
			}
			.son_four{
				width: 100%;
				display: flex;
				.son_four_left{
					flex: 1;
					display: flex;
					.son_four_left_one{
						color: #423937;
						flex: 1;
					}
					.son_four_left_two{
						flex: 1.5;
					}
				}
				.son_four_right{
					flex: 1;
				}
			}
			.son_five{
				width: 100%;
			}
			.son_six{
				width: 100%;
			}
			.son_seven{
				width: 100%;
				color: #423937;
			}
		}
	}
</style>
