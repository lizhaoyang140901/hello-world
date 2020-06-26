<template>
	<view class="gradient">
		<view class="inv-h-w">
			<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">当前委托</view>
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">历史委托</view>
		</view>
		<view class="" v-show="Inv == 0">
			<view class="entrust" v-for="(stiem,index) in wtlist" :key="index">
				<view class="entrust_one">
					<view class="entrust_one_top">
						<view class="entrust_one_top_left">卖出</view>
						<view class="entrust_one_top_center">2020/05/20 13:14</view>
						<view class="entrust_one_top_right" @click="cdshow = true"><b>撤销</b></view>
					</view>
					<view class="entrust_one_center">
						<view class="entrust_one_center_left">委托总量(BTC)</view>
						<view class="entrust_one_center_center">已成交量(BTC)</view>
						<view class="entrust_one_center_right">委托价格(BTC)</view>
					</view>
					<view class="entrust_one_bottom">
						<view class="entrust_one_bottom_left">8.666</view>
						<view class="entrust_one_bottom_center">8.666</view>
						<view class="entrust_one_bottom_right">8.666</view>
					</view>
				</view>
				<view class="entrust_two">
					<u-line color="red" />
				</view>
			</view>
		</view>
		<view class="" v-show="Inv == 1">
			<view class="activity" v-for="(stiem,index) in wtlist" :key="index">
				<view class="activity_one">
					<view class="activity_one_top">
						<view class="activity_one_top_left">卖出</view>
						<view class="activity_one_top_center">2020/05/20 13:14</view>
					</view>
					<view class="activity_one_center">
						<view class="activity_one_center_left">委托总量(BTC)</view>
						<view class="activity_one_center_center">已成交量(BTC)</view>
						<view class="activity_one_center_right">委托价格(BTC)</view>
					</view>
					<view class="activity_one_bottom">
						<view class="activity_one_bottom_left">8.666</view>
						<view class="activity_one_bottom_center">8.666</view>
						<view class="activity_one_bottom_right">8.666</view>
					</view>
				</view>
				<view class="activity_two">
					<u-line color="red" />
				</view>
			</view>
		</view>
		<view>
			<u-popup v-model="cdshow" mode="center" border-radius="14" length="70%" closeable="true">
				<view class="cd-popup">
					<view class="cd-popup_one">确定要撤单?</view>
					<view class="cd-popup_two">
						<view>
							<u-button type="info">取消</u-button>
						</view>
						<view>
							<u-button type="warning">确定</u-button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Inv: 0,
				wtlist: [
					{
						text1: ""
					},
					{
						text1: ""
					},
					{
						text1: ""
					}
				],
				cdshow: false
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.gradient{
		.inv-h-w{background-color: #FFFFFF;height: 100upx;display: flex;}
		.inv-h{font-size: 30upx;flex: 1;text-align: center;color: #C9C9C9;height: 100upx;line-height: 100upx;}
		.inv-h-se{color: #000000;border-bottom: 4upx solid #D93900;}
		page{background-color: #F2F2F2;}
		
		.entrust{
			display: flex;
			flex-wrap: wrap;
			margin: 0.5rem;
			.entrust_one{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.entrust_one_top{
					width: 100%;
					display: flex;
					margin: 0.5rem auto;
					.entrust_one_top_left{
						flex: 1;
						color: #DE531E;
					}
					.entrust_one_top_center{
						flex: 3;
					}
					.entrust_one_top_right{
						flex: 3;
						text-align: right;
						b{
							padding: 0.3rem;
							background-color: #DE531E;
						}
					}
				}
				.entrust_one_center{
					width: 100%;
					display: flex;
					margin: 0.5rem auto;
					view{
						flex: 1;
					}
				}
				.entrust_one_bottom{
					width: 100%;
					display: flex;
					margin: 0.5rem auto;
					view{
						flex: 1;
					}
				}
			}
			.entrust_two{
				width: 100%;
			}
		}
		
		.activity{
			display: flex;
			flex-wrap: wrap;
			margin: 0.5rem;
			.activity_one{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.activity_one_top{
					width: 100%;
					display: flex;
					margin: 0.5rem auto;
					.activity_one_top_left{
						flex: 1;
						color: #DE531E;
					}
					.activity_one_top_center{
						flex: 6;
					}
				}
				.activity_one_center{
					width: 100%;
					display: flex;
					margin: 0.5rem auto;
					view{
						flex: 1;
					}
				}
				.activity_one_bottom{
					width: 100%;
					display: flex;
					margin: 0.5rem auto;
					view{
						flex: 1;
					}
				}
			}
			.activity_two{
				width: 100%;
			}
		}
		
		.cd-popup{
			display: flex;
			flex-wrap: wrap;
			.cd-popup_one{
				width: 100%;
				text-align: center;
				margin: 1rem 0;
			}
			.cd-popup_two{
				width: 100%;
				display: flex;
				margin: 1rem;
				view{
					flex: 1;
					margin: 0 0.3rem;
				}
			}
		}
	}
</style>
