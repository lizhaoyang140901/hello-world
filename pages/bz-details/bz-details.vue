<template>
	<view class="grandpa">
		<view class="son_one">
			<view class="son_one_left">
				<image src="../../static/login/login.png"></image>
			</view>
			<view class="son_one_center">
				<view class="son_one_center_top">BTC</view>
				<view class="son_one_center_bottom">比特币</view>
			</view>
			<view class="son_one_right">
				<view class="son_one_right_top">￥9154.98亿</view>
				<view class="son_one_right_bottom">当前市值</view>
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_top">
				<view>账户总资产(USDY)</view>
				<view class="son_two_top_text">1232121.1215</view>
			</view>
			<view class="son_two_bottom">
				<view class="son_two_bottom_left">
					<view>可用(USDT)</view>
					<view>0.0000000</view>
				</view>
				<view class="son_two_bottom_right">
					<view>冻结(USDT)</view>
					<view>0.0000000</view>
				</view>
			</view>
		</view>
		<view class="son_three">
			<view>
				<view class="inv-h-w">
					<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">全部</view>
					<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">充值</view>
					<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">提现</view>
				</view>
				<view class="" v-show="Inv == 0">
					<view v-for="(item,index) in qblist" :key="index">
						<view class="whole" @click="recharging">
							<view class="whole_one">
								<image src="../../static/login/login.png"></image>
							</view>
							<view class="whole_two">
								<view>BTC</view>
								<view>2020-05-20 13:14</view>
							</view>
							<view class="whole_three">
								<view>283928.123</view>
								<view>充值</view>
							</view>
						</view>
						<view>
							<u-line color="#423937" />
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 1">
					<view class="">
						充值
					</view>
				</view>
				<view class="" v-show="Inv == 2">
					<view class="">
						提现
					</view>
				</view>
			</view>
		</view>
		<view class="son_four">
			<view class="son_four_left">
				<u-button type="warning">充值</u-button>
			</view>
			<view class="son_four_right">
				<u-button type="error">提现</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Inv: 0,
				qblist: [
					{
						text1: ""
					},{
						text1: ""
					},{
						text1: ""
					},{
						text1: ""
					},{
						text1: ""
					}
				]
			}
		},
		methods:{
			/* 充提详情 */
			recharging: function(){
				uni.navigateTo({
				    url: '../recharging/recharging'
				});
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		display: flex;
		flex-wrap: wrap;
		.son_one{
			width: 100%;
			display: flex;
			margin: 0.5rem;
			margin-top: 1rem;
			.son_one_left{
				flex: 1;
				image{
					width: 70%;
					height: 100%;
				}
			}
			.son_one_center{
				flex: 3;
			}
			.son_one_right{
				flex: 2;
				view{
					text-align: right;
				}
			}
		}
		.son_two{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin: 0.5rem;
			background-color: rgba(0,0,0,0.1);
			border-radius: 0.5rem;
			padding: 0.5rem 0;
			.son_two_top{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				view{
					width: 100%;
					padding: 0.3rem 0;
					text-align: center;
				}
				.son_two_top_text{
					color: #DE531E;
					font-size: x-large;
				}
			}
			.son_two_bottom{
				width: 100%;
				display: flex;
				margin-top: 1rem;
				.son_two_bottom_left{
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					view{
						width: 100%;
						padding: 0.3rem 0;
						text-align: center;
					}
				}
				.son_two_bottom_right{
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					view{
						width: 100%;
						padding: 0.3rem 0;
						text-align: center;	
					}
				}
			}
		}
		.son_three{
			width: 100%;
			margin: 0.5rem;
			background-color: rgba(0,0,0,0.1);
			.inv-h-w{background-color: rgba(0,0,0,0.3);height: 100upx;display: flex;}
			.inv-h{font-size: 30upx;flex: 1;text-align: center;color: #C9C9C9;height: 100upx;line-height: 100upx;}
			.inv-h-se{color: #000000;border-bottom: 4upx solid #D93900;}
			page{background-color: #F2F2F2;}
			.whole{
				display: flex;
				margin: 0.5rem;
				padding: 0.5rem 0;
				.whole_one{
					flex: 1;
					image{
						width: 70%;
						height: 100%;
					}
				}
				.whole_two{
					flex: 3;
				}
				.whole_three{
					flex: 1;
					view{
						text-align: right;
					}
				}
			}
		}
		.son_four{
			width: 100%;
			display: flex;
			margin: 1rem 0.5rem;
			.son_four_left{
				flex: 1;
				margin: 0.2rem;
			}
			.son_four_right{
				flex: 1;
				margin: 0.2rem;
			}
		}
	}
</style>
