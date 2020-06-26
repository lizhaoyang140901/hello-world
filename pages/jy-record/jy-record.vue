<template>
	<view class="gradient">
		<view>
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">持有中</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">历史记录</view>
			</view>
			<view class="" v-show="Inv == 0">
				<view v-for="(stiem,index) in lsjllist" :key="index">
					<view class="gradient_one">
						<view class="son_one">
							<view class="son_one_one">
								<view class="son_one_one_left">BTC/USDT</view>
								<view class="son_one_one_center">2x</view>
								<view class="son_one_one_right">多</view>
							</view>
							<view class="son_one_two">
								<view class="son_one_two_left">买入价格:</view>
								<view class="son_one_two_right">3980.650000</view>
							</view>
							<view class="son_one_three">
								<view class="son_one_three_left">本金:</view>
								<view class="son_one_three_right">50000.000000</view>
							</view>
							<view class="son_one_four">
								<view class="son_one_four_left">手续费:</view>
								<view class="son_one_four_right">250.000</view>
							</view>
						</view>
						<view class="son_two">
							<view class="son_two_one">
								2019-05-20 13:14:00
							</view>
							<view class="son_two_two">
								<view class="son_two_two_left">当前价格:</view>
								<view class="son_two_two_right">3968.50000</view>
							</view>
							<view class="son_two_three">
								<view class="son_two_three_left">盈亏:</view>
								<view class="son_two_three_right">-27.040000</view>
							</view>
							<view class="son_two_four">
								<view class="son_two_four_left">
									<u-button type="warning" size="mini" @click="show = true">设置</u-button>
								</view>
								<view class="son_two_four_right">
									<u-button type="error" size="mini">平仓</u-button>
								</view>
							</view>
						</view>
					</view>
					<view class="gradient_border">
						<u-line color="#423937" />
					</view>
				</view>
			</view>
			<view class="" v-show="Inv == 1">
				<view v-for="(stiem,index) in cyzlist" :key="index">
					<view class="gradient_two">
						<view class="boy_one">
							<view class="boy_one_one">
								<view class="boy_one_one_left">BTC/USDT</view>
								<view class="boy_one_one_center">2x</view>
								<view class="boy_one_one_right">多</view>
							</view>
							<view class="boy_one_two">
								<view class="boy_one_two_left">买入价格:</view>
								<view class="boy_one_two_right">3980.650000</view>
							</view>
							<view class="boy_one_three">
								<view class="boy_one_three_left">本金:</view>
								<view class="boy_one_three_right">50000.000000</view>
							</view>
							<view class="boy_one_four">
								<view class="boy_one_four_left">手续费:</view>
								<view class="boy_one_four_right">250.000</view>
							</view>
							<view class="boy_one_five">
								<view class="boy_one_five_left">卖出时间:</view>
								<view class="boy_one_five_right">2019-05-20 13:14:00</view>
							</view>
						</view>
						<view class="boy_two">
							<view class="boy_two_one">
								2019-05-20 13:14:00
							</view>
							<view class="boy_two_two">
								<view class="boy_two_two_left">当前价格:</view>
								<view class="boy_two_two_right">3968.50000</view>
							</view>
							<view class="boy_two_three">
								<view class="boy_two_three_left">盈亏:</view>
								<view class="boy_two_three_right">-27.040000</view>
							</view>
							<view class="boy_two_four">
								<view class="boy_two_four_left">
									<u-button type="warning" size="mini" class="custom-style" disabled="true">设置</u-button>
								</view>
								<view class="boy_two_four_right">
									<u-button type="error" size="mini" class="custom-style" disabled="true">平仓</u-button>
								</view>
							</view>
						</view>
					</view>
					<view class="gradient_border">
						<u-line color="#423937" />
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" border-radius="14" length="80%" closeable="true">
			<view class="nephew">
				<view class="nephew_one">设置</view>
				<view class="nephew_two">止盈(盈利: 1000.00000)</view>
				<view class="nephew_three"><u-number-box v-model="value" @change="valChange" min="0" max="100"></u-number-box></view>
				<view class="nephew_four">止损(亏损: 1000.00000)</view>
				<view class="nephew_five"><u-number-box v-model="value" @change="valChange" min="0" max="100"></u-number-box></view>
				<view class="nephew_six">
					<u-button type="warning">知道了</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Inv: 0,
				cyzlist: [
					{
						text1:""
					},{
						text2:""
					},{
						text3:""
					},{
						text4:""
					},{
						text5:""
					}
				],
				lsjllist: [
					{
						text1:""
					},{
						text2:""
					},{
						text3:""
					},{
						text4:""
					},{
						text5:""
					}
				],
				show: false,
				value: 100
			}
		},
		methods: {
			valChange(e) {
				console.log('当前值为: ' + e.value)
			}
		}
	}
</script>

<style lang="scss">
	.gradient{
		.inv-h-w{background-color: #FFFFFF;height: 100upx;display: flex;}
		.inv-h{font-size: 30upx;flex: 1;text-align: center;color: #C9C9C9;height: 100upx;line-height: 100upx;}
		.inv-h-se{color: #000000;border-bottom: 4upx solid #D93900;}
		page{background-color: #F2F2F2;}
		.gradient_border{
			margin: 1rem 0
		}
		.gradient_one{
			display: flex;
			.son_one{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin: 0.3rem;
				.son_one_one{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					view{
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.son_one_two{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.son_one_two_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.son_one_two_right{
						flex: 1.5;
						display: flex;
						align-items: center;
					}
				}
				.son_one_three{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.son_one_three_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.son_one_three_right{
						flex: 1.5;
						display: flex;
						align-items: center;
					}
				}
				.son_one_four{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.son_one_four_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.son_one_four_right{
						flex: 1.5;
						display: flex;
						align-items: center;
					}
				}
			}
			.son_two{
				flex: 1;
				margin: 0.3rem;
				display: flex;
				flex-wrap: wrap;
				.son_two_one{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0.3rem 0;
				}
				.son_two_two{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.son_two_two_left{
						flex: 1;
					}
					.son_two_two_right{
						flex: 1.5;
					}
				}
				.son_two_three{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.son_two_three_left{
						flex: 1;
					}
					.son_two_three_right{
						flex: 1.5;
					}
				}
				.son_two_four{
					width: 100%;
					display: flex;
					.son_two_four_left{
						flex: 1;
						margin: 0.1rem;
						text-align: right;
					}
					.son_two_four_right{
						flex: 1;
						margin: 0.1rem;
					}
				}
			}
		}
		.gradient_two{
			display: flex;
			.boy_one{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin: 0.3rem;
				.boy_one_one{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					view{
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.boy_one_two{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.boy_one_two_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.boy_one_two_right{
						flex: 1.5;
						display: flex;
						align-items: center;
					}
				}
				.boy_one_three{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.boy_one_three_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.boy_one_three_right{
						flex: 1.5;
						display: flex;
						align-items: center;
					}
				}
				.boy_one_four{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.boy_one_four_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.boy_one_four_right{
						flex: 1.5;
						display: flex;
						align-items: center;
					}
				}
				.boy_one_five{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.boy_one_five_left{
						flex: 1;
						display: flex;
						align-items: center;
					}
					.boy_one_five_right{
						flex: 1.5;
						display: flex;
						align-items: center;
						font-size: x-small;
					}
				}
			}
			.boy_two{
				flex: 1;
				margin: 0.3rem;
				display: flex;
				flex-wrap: wrap;
				.boy_two_one{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0.3rem 0;
				}
				.boy_two_two{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.boy_two_two_left{
						flex: 1;
					}
					.boy_two_two_right{
						flex: 1.5;
					}
				}
				.boy_two_three{
					width: 100%;
					display: flex;
					padding: 0.3rem 0;
					.boy_two_three_left{
						flex: 1;
					}
					.boy_two_three_right{
						flex: 1.5;
					}
				}
				.boy_two_four{
					width: 100%;
					display: flex;
					.boy_two_four_left{
						flex: 1;
						margin: 0.1rem;
						text-align: right;
					}
					.boy_two_four_right{
						flex: 1;
						margin: 0.1rem;
					}
				}
			}
		}
		.nephew{
			display: felx;
			flex-wrap: wrap;
			.nephew_one{
				width: 100%;
				padding: 1rem 0;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: large;
			}
			.nephew_two{
				width: 100%;
				padding: 0.5rem 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #DE531E;
			}
			.nephew_three{
				width: 100%;
				padding: 0.5rem 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.nephew_four{
				width: 100%;
				padding: 0.5rem 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #25B770;
			}
			.nephew_five{
				width: 100%;
				padding: 0.5rem 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.nephew_six{
				width: 100%;
				padding: 0.5rem 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
