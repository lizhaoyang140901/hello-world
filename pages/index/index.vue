<template>
	<view class="content">
		<view class="son_first">
			<view class="top_first">
				<view class="left">
					<image @click="lunbo" src="../../static/lunbo/head.png"></image>
				</view>
				<view class="center">ALLUP</view>
				<view class="right">
				</view>
			</view>
			<view class="page-section-spacing">
				<swiper class="swiper" 
						:indicator-dots="indicatorDots" 
						:autoplay="autoplay" 
						:interval="interval" 
						:duration="duration">
					<swiper-item>
						<view class="swiper-item uni-bg-red">
							<image src="../../static/lunbo/dota.jpg"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-green">
							<image src="../../static/lunbo/dota.jpg"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-blue">
							<image src="../../static/lunbo/dota.jpg"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="son_two">
			<view class="first">
				<u-icon name="volume-up" color="#d93900"></u-icon>
			</view>
			<view class="two">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" :vertical= "true">
					<swiper-item v-for="(item,index) in tongzhi" :key="index">
						<view class="swiper-item">{{item.text}}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="three" @click="notice">更多</view>
		</view>
		<view class="son_two_border"></view>
		<view class="son_three">
			<view class="son_three_top">
				<view class="first">
					<view v-for="(item,index) in zichan" :key="index">
						<view>{{item.text1}}</view>
						<view class="left_text">{{item.text2}}</view>
						<view class="left_text">{{item.text3}}</view>
					</view>
				</view>
			</view>
			<view class="son_three_center" @click="invitation">
				<view class="son_three_center_son_first">
					<image src="../../static/lunbo/yongjin.png" />
				</view>
				<view class="son_three_center_son_two"></view>
			</view>
			<view class="son_three_bottom">
				<view>
					<view class="inv-h-w">
						<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">涨幅榜</view>
						<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">跌幅榜</view>
					</view>
					<view class="" v-show="Inv == 0">
						<view class="son_three_bottom_top">
							<view>交易对</view>
							<view>最新价</view>
							<view>涨跌幅</view>
						</view>
						<view class="son_three_bottom_bottom">
							<view v-for="(item,index) in zhangzu" :key="index">
								<view>{{item.text1}}</view>
								<view>{{item.text2}}</view>
								<view><b>{{item.text3}}</b></view>
							</view>
						</view>
					</view>
					<view class="" v-show="Inv == 1">
						<view class="son_three_bottom_top">
							<view>交易对</view>
							<view>最新价</view>
							<view>涨跌幅</view>
						</view>
						<view class="son_three_bottom_bottom">
							<view v-for="(item,index) in diezu" :key="index">
								<view>{{item.text1}}</view>
								<view>{{item.text2}}</view>
								<view><b>{{item.text3}}</b></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<van-popup
		  :show="show"
		  position="left"
		  custom-style="height: 100%; width: 80%"
		  @close="show=false"
		>
			<view class="sidebar">
				<view class="first">
					<view class="information">
						<view @click="my_data">
							<image src="../../static/lunbo/head1.png"></image>
						</view>
						<view class="information_phone">131****6789</view>
					</view>
					<view class="first_data"><div>上次登录: 2020-05-20 13:14:00</div></view>
				</view>
				<view class="two">
					<view class="shenfen_id" @click="real_name">
						<view class="authentication">
							<view>
								<image src="../../static/my/shenfen.png"></image>
							</view>
							<view>未认证</view>
						</view>
						<view>身份认证</view>
						<view>防止信息冒用</view>
					</view>
					<view class="security" @click="security">
						<view>
							<image src="../../static/my/anquan.png"></image>
						</view>
						<view>安全中心</view>
						<view>管理账户安全</view>
					</view>
				</view>
				<view class="three">
					<view>
						<view class="three_tubiao">
							<image src="../../static/my/yqhaoyou.png"></image>
						</view>
						<view @click="invitation">邀请好友</view>
					</view>
					<view>
						<view class="three_tubiao">
							<image src="../../static/my/kefu.png"></image>
						</view>
						<view>专属客服</view></view>
					<view>
						<view class="three_tubiao">
							<image src="../../static/my/help.png"></image>
						</view>
						<view @click="help_center">帮助中心</view>
					</view>
					<view>
						<view class="three_tubiao">
							<image src="../../static/my/gymy.png"></image>
						</view>
						<view @click="gymy">关于我们</view>
					</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				show: false,
				Inv: 0,
				tongzhi: [
					{"text" : "关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知"},
					{"text" : "关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知"},
					{"text" : "关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知"},
					{"text" : "关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知"},
					{"text" : "关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知"}
				],
				zichan: [
					{"text1" : "BTC/USDT", "text2" : "222", "text3" : "333"},
					{"text1" : "ETH/USDT", "text2" : "222", "text3" : "333"},
					{"text1" : "MTR/USDT", "text2" : "222", "text3" : "333"}
				],
				zhangzu: [
					{"text1" : "BTC/USDT", "text2" : "200", "text3" : "+30.000%"},
					{"text1" : "ETH/USDT", "text2" : "322", "text3" : "+30.000%"},
					{"text1" : "MTR/USDT", "text2" : "422", "text3" : "+30.000%"}
				],
				diezu: [
					{"text1" : "BTC/USDT", "text2" : "500", "text3" : "-30.000%"},
					{"text1" : "ETH/USDT", "text2" : "600", "text3" : "-30.000%"},
					{"text1" : "MTR/USDT", "text2" : "800", "text3" : "-30.000%"}
				]
			}
		},
		onLoad() {
			
		},
		mounted(){
			// uni.request({
			// 	url:'https://api.huobi.pro/v1/contract_position_info',
			// 	data:{},
			// 	header:{},
			// 	success: function(res){
			// 		console.log(res)
			// 	}
			// })
		},
		methods: {
			/* 轮播跳转 */
			lunbo(){
				this.show = true
			},
			/* 公告列表 */
			notice:function(){
				uni.navigateTo({
				    url: '../notice/notice'
				});
			},
			/* 涨幅榜 */
			changeTab(Inv){
				that.navIdx = Inv;
			         
			},
			/* 个人资料 */
			my_data: function(){
				uni.navigateTo({
				    url: '../my_data/my_data'
				});
			},
			/* 实名认证 */
			real_name: function(){
				uni.navigateTo({
				    url: '../real-name/real-name'
				});
			},
			/* 安全中心 */
			security: function(){
				uni.navigateTo({
				    url: '../security/security'
				});
			},
			/* 帮助中心 */
			help_center:function(){
				uni.navigateTo({
				    url: '../hp-content/hp-content'
				});
			},
			/* 邀请好友 */
			invitation:function(){
				uni.navigateTo({
				    url: '../invitation/invitation'
				});
			},
			/* 关于我们 */
			gymy:function(){
				uni.navigateTo({
				    url: '../gymy/gymy'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		view{
			width: 100%;
		}
		.son_first{
			display: flex;
			flex-wrap: wrap;
			width: 90%;
			.top_first{
				display: flex;
				height: 2.5rem;
				view{
					flex: 1;
				}
				.left {
					image{
						width: 35%;
						height: 80%;
						margin: 0.2rem;
						border-radius: 50%;
					}
				}
				.center{
					margin: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #D93900;
				}
			}
			.page-section-spacing{
				.swiper{
					view{
						height: 8rem;
					}
				}
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.son_two{
			width: 90%;
			margin: 0.5rem auto;
			display: flex;
			.first{
				flex: 1;
				display: flex;
				align-items: center;
			}
			.two{
				flex: 5;
				font-size: small;
				.swiper{
					height: 2rem;
					swiper-item{
						display: flex;
						align-items: center;
						.swiper-item{
							max-height: 30upx;
							overflow: hidden;
							word-break: break-all;  /* break-all(允许在单词内换行。) */
							text-overflow: ellipsis;  /* 超出部分省略号 */
							display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
							-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
							-webkit-line-clamp: 1; /** 显示的行数 **/
						}
					}
				}
			}
			.three{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				color: #D93900;
				font-size: small;
			}
		}
		.son_two_border{
			height: 0.1rem;
			width: 90%;
			background-color: #f7f7f7;
		}
		.son_three{
			display: flex;
			flex-wrap: wrap;
			.son_three_top{
				height:auto;
				margin:0.5rem 0;
				.first{
					font-size: small;
					display: flex;
					text-align: center;
					.left_text{
						color: #00AA57;
					}
					view{
						flex: 1;
					}
				}
			}
			.son_three_center{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.son_three_center_son_first{
					height: 4rem;
					display: flex;
					justify-content: center;
					margin-bottom: 0.5rem;
					image{
						width: 90%;
						height: 100%;
					}
				}
				.son_three_center_son_two{
					height: 0.3rem;
					background-color: #f7f7f7;
				}
			}
			.son_three_bottom{
				.inv-h-w{background-color: #FFFFFF;height: 100upx;display: flex;}
				.inv-h{font-size: 30upx;flex: 1;text-align: center;color: #C9C9C9;height: 100upx;line-height: 100upx;}
				.inv-h-se{color: #000000;border-bottom: 4upx solid #D93900;}
				page{background-color: #F2F2F2;}
				.son_three_bottom_top{
					display: flex;
					view{
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0.5rem 0;
					}
				}
				.son_three_bottom_bottom{
					font-size: small;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					view{
						width: 100%;
						display: flex;
						view{
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 0.5rem 0;
						}
					}
					b{
						background-color: #09BB07;
						color: #ffffff;
						padding: 0.3rem 0.5rem;
					}
				}
			}
		}
		.sidebar{
			background-image: url(../../static/my/myone.png);
			background-repeat: no-repeat;
			background-size: 100% 40%;
			height: 92.5vh;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.first{
				display: flex;
				flex-wrap: wrap;
				height: 15vh;
				margin: 1rem;
				width: 90%;
				view{
					padding: 0.5rem 0;
					width: 75%;
				}
				.information{
					display: flex;
					image{
						width: 90%;
						height: 100%;
					}
					view{
						padding: 0;
						flex: 1;
					}
					.information_phone{
						flex: 5;
					}
				}
				.first_data{
					div{
						font-size: small;
						background-color: rgba(0,0,0,0.1);
						padding: 0.5rem 0;
						width: auto;
						border-radius: 1rem;
					}
				}
			}
			.two{
				display: flex;
				font-size: small;
				height: 15vh;
				view{
					width: 100%;
					background-color: rgba(255, 255, 255, 0.9);
				}
				.shenfen_id{
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					margin: 0 0.5rem;
					.authentication{
						display: flex;
						view{
							flex: 1;
							height: 100%;
							padding-left: 0;
						}
					}
					view{
						display: flex;
						align-items: center;
						padding-left: 0.5rem;
					}
					image{
						width: 60%;
						height: 70%;
					}
				}
				.security{
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					margin: 0 0.5rem;
					view{
						display: flex;
						align-items: center;
						padding-left: 0.5rem;
					}
					image{
						padding-top: 0.5rem;
						width: 35%;
						height: 80%;
					}
				}
			}
			.three{
				font-size: small;
				height: 50vh;
				view{
					display: flex;
					margin: 0.5rem 0.1rem;
					view{
						flex: 8;
					}
				}
				.three_tubiao{
					flex: 1;
					image{
						width: 100%;
						height: 100%;
						padding: 0 0.3rem;
					}
				}
			}
		}
	}
</style>


  

          
