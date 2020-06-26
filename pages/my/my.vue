<template>
	<view class="grandpa">
		<view class="son_first">
			<view class="son_first_top">
				<view class="son_first_top_left">
					<view class="son_first_top_left_img" @click="show = true">
						<u-icon name="play-right-fill" color="#DE531E" size="40"></u-icon>
					</view>
					<view class="son_first_top_left_txt">BTH/USDT</view>
				</view>
				<view class="son_first_top_center">
					<view class="son_first_top_center_left">+0.048%</view>
					<view class="son_first_top_center_right" @click="trend">
						<u-icon name="list-dot" color="#DE531E" size="50"></u-icon>
					</view>
				</view>
				<view class="son_first_top_right" @click="order_my">
					<u-icon name="file-text" color="#DE531E" size="50"></u-icon>
				</view>
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_left">
				<view class="son_two_left_one">
					<view class="son_two_left_one_zhang">买入</view>
					<view class="son_two_left_one_die">卖出</view>
				</view>
				<view class="son_two_left_two">
					限价买入
				</view>
				<view class="son_two_left_three">
					<view class="son_two_left_three_top">
						<van-stepper v-model="xjmrvalue" @change="onChange" min="0" max="100" step="0.00001" :decimal-length="decimal" input-width="5rem" button-size="35px" />
					</view>
					<view>
						=3446.08 CNY
					</view>
				</view>
				<view class="son_two_left_four">
					<view>
						<u-input v-model="slvalue" type="text" :border="mrborder" placeholder="买入数量" />
					</view>
					<view>
						可用 0.366775765 USDT
					</view>
				</view>
				<view class="son_two_left_five">
					<u-steps :list="numList" :current="0" active-color="#fa3534"></u-steps>	
				</view>
				<view class="son_two_left_six">
					<view class="son_two_left_six_left">交易金额:</view>
					<view class="son_two_left_six_right">8.666 USDT</view>
				</view>
				<view class="son_two_left_seven">
					<u-button type="success" @click="mmshow = true">买入BTC</u-button>
				</view>
			</view>
			<view class="son_two_right">
				<view class="son_two_right_one">
					<view>价格</view>
					<view>数量</view>
				</view>
				<view class="son_two_right_list" v-for="(stiem, index) in heyuelist" :key="index">
					<view>{{stiem.text1}}</view>
					<view>{{stiem.text2}}</view>
				</view>
			</view>
		</view>
		<view class="son_three">
			<view>
				<view class="inv-h-w">
					<view class="inv-h-w-one">
						<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">当前委托</view>
						<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">历史委托</view>
					</view>
					<view class="son_three_position" @click="activity">
						全部订单
					</view>
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
					
				</view>
			</view>
			<view>
				<u-popup v-model="cdshow" mode="center" border-radius="14" length="70%" :closeable="true">
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
		<u-popup v-model="mmshow" mode="center" border-radius="14" length="80%" :closeable="true">
			<view class="eject">
				<view class="eject_one">
					<u-input v-model="value" type="text" :border="border" placeholder="请输入交易密码" />
				</view>
				<view class="eject_two">
					<u-line color="#423937" />
				</view>
				<view class="eject_three">
					忘记密码？
				</view>
				<view class="eject_four">
					<u-button type="warning" @click="mima">确定</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="ddshow" mode="center" border-radius="14" length="80%" :closeable="true">
			<view class="popup">
				<div class="box">
					<div class="left_box">
						<div class="left_item"></div>
					</div>
					<div class="right_box">
						<div class="right_item"></div>
					</div>
					<div class="mask">
						<view class="img">
							<u-count-down :timestamp="10" :show-days="false" :show-hours="false" font-size="60" separator-size="60" color="#606266"></u-count-down>
						</view>
						<view class="txt">
							倒计时
						</view>
					</div>
				</div>
				<view class="popup_one">
					现价: 227.54 USDT
				</view>
				<view class="popup_two">
					<u-line color="#322826" />
				</view>
				<view class="popup_three">
					<view class="popup_three_top">
						<view>名称</view>
						<view>方向</view>
						<view>现价</view>
						<view>金额</view>
					</view>
					<view class="popup_three_bottom">
						<view>BTC</view>
						<view>买涨</view>
						<view>227.54</view>
						<view>￥10</view>
					</view>
				</view>
				<view class="popup_four">
					<u-button type="warning">继续下单</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show" length="50%">
			<view class="nephew">
				<view class="nephew_one">合约</view>
				<view class="nephew_two">
					<view>USDT</view>
					<u-line color="red" length="50%" />
					<view>BTH/USDT</view>
					<view>ETH/USDT</view>
					<view>XRP/USDT</view>
					<view>LTC/USDT</view>
					<view>EOS/USDT</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bjlist: [{
						name: '300',
						disabled: false
					},
					{
						name: '500',
						disabled: false
					},
					{
						name: '1000',
						disabled: false
					},
					{
						name: '2000',
						disabled: false
					},
					{
						name: '5000',
						disabled: false
					},
					{
						name: '10000',
						disabled: false
					},
				],
				bjvalue: "300",
				dqsjlist: [{
						name: '30秒',
						disabled: false
					},
					{
						name: '60秒',
						disabled: false
					},
					{
						name: '120秒',
						disabled: false
					}
				],
				dqsjvalue: "30秒",
				heyuelist: [{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					},
					{
						text1: "9193.20",
						text2: "0.26501"
					}
				],
				show: false,
				mmshow: false,
				value: '',
				border: false,
				ddshow: false,
				xjmrvalue: "1",
				mrborder: true,
				decimal: "5",
				slvalue: '',
				numList: [
					{
						name: '0'
					}, {
						name: ' '
					}, {
						name: ' '
					}, {
						name: '12.5 BTC'
					},
				],
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
			/* 走势图 */
			trend: function() {
				uni.navigateTo({
					url: '../trend/trend'
				});
			},
			/* 我的订单 */
			order_my: function() {
				uni.navigateTo({
					url: '../order-my/order-my'
				});
			},
			/* 输入交易密码 */
			mima: function() {
				this.mmshow = false;
				this.ddshow = true
			},
			onChange(event) {
			    console.log(event.detail);
			},
			/* 全部订单 */
			activity: function() {
				uni.navigateTo({
					url: '../activity/activity'
				});
			}
		}
	}
</script>

<style lang="scss">
	.grandpa {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.son_first {
			width: 100%;
			margin: 0.5rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.son_first_top {
				width: 100%;
				display: flex;

				.son_first_top_left {
					flex: 2;
					display: flex;

					.son_first_top_left_img {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.son_first_top_left_txt {
						flex: 6;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				
				.son_first_top_center{
					flex: 4;
					display: flex;
					.son_first_top_center_left{
						flex: 3;
						display: flex;
						align-items: center;
						justify-content: flex-end;
					}
					.son_first_top_center_right{
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.son_first_top_right {
					flex: 1;
					text-align: right;
				}
			}
		}

		.son_two {
			height: 55vh;
			width: 100%;
			margin: 0.5rem;
			display: flex;
			
			span{
				font-size: x-small;
			}

			.son_two_left {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.son_two_left_one {
					width: 100%;
					display: flex;

					view {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.son_two_left_one_zhang {
						background-image: url(../../static/heyue/left.png);
						background-repeat: no-repeat;
						color: #ffffff;
						margin: 0 0.2rem;
					}

					.son_two_left_one_die {
						background-image: url(../../static/heyue/right.png);
						background-repeat: no-repeat;
						color: #8F6C62;
						margin: 0 0.2rem;
					}
				}
				
				.son_two_left_two{
					width: 100%;
					display: flex;
					align-items: center;
					margin: 0 0.2rem;
				}
				
				.son_two_left_three{
					width: 100%;
					margin-right: 0.5rem;
					.son_two_left_three_top{
						display: flex;
						justify-content: center;
					}
				}
				
				.son_two_left_four{
					width: 100%;
					margin-right: 0.5rem;
				}
				
				.son_two_left_five{
					width: 100%;
					margin-right: 0.5rem;
				}
				
				.son_two_left_six{
					width: 100%;
					display: flex;
					.son_two_left_six_left{
						flex: 1;
					}
					.son_two_left_six_right{
						flex: 2;
					}
				}
				
				.son_two_left_seven{
					width: 100%;
				}

			}

			.son_two_right {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.son_two_right_one {
					width: 100%;
					display: flex;

					view {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.son_two_right_list {
					width: 100%;
					display: flex;

					view {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}

		.son_three{
			width: 100%;
			.inv-h-w{
				background-color: 
				#FFFFFF;height: 100upx;
				display: flex;
				.inv-h-w-one{
					width: 45%;
					display: flex;
				}
			}
			.son_three_position{
				text-align: right;
				width: 55%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-right: 0.5rem;
			}
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

		.nephew {
			padding: 0.5rem;
			display: flex;
			flex-wrap: wrap;

			.nephew_one {
				width: 100%;
				text-align: left;
				font-size: larger;
			}

			.nephew_two {
				view {
					padding: 0.3rem 0;
				}
			}
		}

		.eject {
			margin: 0.5rem;

			.eject_one {
				margin: 0.3rem 1rem;
				margin-top: 2rem
			}

			.eject_two {
				margin: 0 1rem;
			}

			.eject_three {
				margin: 0.3rem;
				text-align: right;
			}

			.eject_four {
				margin: 1rem 1rem;
			}
		}

		.popup {
			.box {
				/* 最外层的盒子 */
				width: 200px;
				height: 200px;
				margin: 0 auto;
				position: relative;
				overflow: hidden;
				border-radius: 50%;
				background-color: #DE531E;
				margin-top: 1rem;
			}

			.left_box,
			.right_box {
				/* 
			        左右两边用于 隐藏 旋转的div的盒子 
			        通过overflow来隐藏内部div旋转出去的部分
			      */
				position: absolute;
				top: 0;
				width: 100px;
				height: 200px;
				overflow: hidden;
				z-index: 1;
			}

			.left_box {
				left: 0;
			}

			.right_box {
				right: 0;
			}

			.left_item,
			.right_item {
				/* 
			       这是需要旋转的div(没有被mask遮盖展示出来的部分作为倒计时的线条)
			       为了方便理解，下面用deeppink和cyan分别设置了左右两边div的颜色
			      */
				width: 100px;
				height: 200px;
			}

			.left_item {
				/*
			       1.设置圆角，圆角大小为高度的一半
			       2.这只旋转的中心店，这是左边圆，中心点设置到右边中心点，右边圆则设置到左边中心点
			       */
				border-top-left-radius: 100px;
				border-bottom-left-radius: 100px;
				-webkit-transform-origin: right center;
				transform-origin: right center;
				-webkit-animation: loading_left 10s linear;
				background-color: #322826;
			}

			.right_item {
				border-top-right-radius: 100px;
				border-bottom-right-radius: 100px;
				-webkit-transform-origin: left center;
				transform-origin: left center;
				-webkit-animation: loading_right 10s linear;
				background-color: #322826;
			}

			.mask {
				/* 遮住div多余的部分，呈现出线条的效果 */
				position: absolute;
				top: 15px;
				left: 15px;
				right: 15px;
				bottom: 15px;
				z-index: 2;
				border-radius: 50%;
				background-color: #fff;
				display: flex;
				flex-wrap: wrap;

				.img {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: flex-end;
				}

				.txt {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			
			.popup_one{
				margin: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: large;
				color: #de531e;
			}
			.popup_two{
				margin: 0.5rem 1rem;
			}
			.popup_three{
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				.popup_three_top{
					width: 100%;
					display: flex;
					view{
						flex: 1;
						text-align: center;
						margin: 0.3rem auto;
					}
				}
				.popup_three_bottom{
					width: 100%;
					display: flex;
					view{
						flex: 1;
						text-align: center;
						margin: 0.3rem auto;
					}
				}
			}
			.popup_four{
				margin: 1rem;
			}

			@-webkit-keyframes loading_left {
				0% {
					-webkit-transform: rotate(0deg);
				}

				50% {
					-webkit-transform: rotate(0deg);
				}

				100% {
					-webkit-transform: rotate(180deg);
				}
			}

			@-webkit-keyframes loading_right {
				0% {
					-webkit-transform: rotate(0deg);
				}

				50% {
					-webkit-transform: rotate(180deg);
				}

				100% {
					-webkit-transform: rotate(180deg);
				}
			}
		}
	}
</style>
