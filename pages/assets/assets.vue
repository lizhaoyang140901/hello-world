<template>
	<view class="grandpa">
		<view class="son_first">
			<view class="son_first_left">
				<image src="../../static/lunbo/ma.jpg"></image>
			</view>
			<view class="son_first_center">
				<view class="son_first_center_top">
					<view class="son_first_center_top_left">账户余额</view>
					<view class="son_first_center_top_right" @click="zhye">
						<image :src="imgurl" ref="image"></image>
					</view>
				</view>
				<view class="son_first_center_center">{{yue}}</view>
				<view class="son_first_center_bottom">{{huansuan}}</view>
			</view>
			<view class="son_first_right" @click="bill_page">
				<u-icon name="order" color="#2979ff" size="50"></u-icon>
			</view>
		</view>
		<view class="son_two">
			<view class="chongbi">
				<view>
					<image src="../../static/my/gymy.png"></image>
				</view>
				<view @click="recharge">充币</view>
			</view>
			<view class="tibi">
				<view>
					<image src="../../static/my/gymy.png"></image>
				</view>
				<view @click="extract">提币</view>
			</view>
			<view class="zhuanzhang">
				<view>
					<image src="../../static/my/gymy.png"></image>
				</view>
				<view @click="transfer">转账</view>
			</view>
		</view>
		<view class="son_three">
			<view class="son_three_title">
				<view><u-search placeholder="搜索币种" v-model="keyword" :animation="true"></u-search></view>
				<view class="son_three_title_two">
					<!-- @change="checkboxGroupChange" -->
					<u-checkbox-group >
						<u-checkbox 
							@change="checkboxChange" 
							v-model="item.checked" 
							v-for="(item, index) in list" :key="index" 
							:name="item.name"
						>
							{{item.name}}
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view class="son_three_subject">
				<view class="son_three_subject_main" v-for="(stiem,index) in bzlist" :key="index">
					<view class="title">{{stiem.bz}}</view>
					<view class="subject">
						<view>
							<view>{{stiem.ke}}</view>
							<view>{{stiem.ke_val}}</view>
						</view>
						<view>
							<view>{{stiem.dj}}</view>
							<view>{{stiem.dj_val}}</view>
						</view>
						<view class="three">
							<view>{{stiem.zh}}</view>
							<view>{{stiem.zh_val}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="smshow" mode="center" length="80%" :closeable="true">
			<view class="shiming">
				<view class="shiming_one">
					<image src="../../static/login/login.png"></image>
				</view>
				<view class="shiming_two">实名认证</view>
				<view class="shiming_theww">保障信息安全，防止实名冒用</view>
				<view class="shiming_four">
					<u-button type="warning">立即实名</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="jymmshow" mode="center" length="80%" :closeable="true">
			<view class="jymm">
				<view class="jymm_one">提示</view>
				<view class="jymm_two">
					<u-line color="#423937" />
				</view>
				<view class="jymm_three">您还未设置交易密码，请先设置</view>
				<view class="jymm_four">
					<u-button type="warning">立即设置</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgurl:'../../static/zichan/yanjing.png',
				yue:'50000.00',
				huansuan: '~3550000.00 CNY',
				keyword: "",
				list: [
					{
						name: '隐藏小币种',
						checked: false,
						disabled: false	,
					}
				],
				bzlist:[
					{
						bz: "BTH",
						ke: "可用",
						ke_val: "0.00000000",
						dj: "冻结",
						dj_val: "0.00000000",
						zh: "折合(CNY)",
						zh_val: "0.00"
					},
					{
						bz: "ETH",
						ke: "可用",
						ke_val: "0.99999999",
						dj: "冻结",
						dj_val: "0.88888888",
						zh: "折合(CNY)",
						zh_val: "0.77"
					},
					{
						bz: "ETH",
						ke: "可用",
						ke_val: "0.11111111",
						dj: "冻结",
						dj_val: "0.22222222",
						zh: "折合(CNY)",
						zh_val: "0.33"
					}
				],
				smshow: false,
				jymmshow:false
			}
		},
		methods:{
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			// checkboxGroupChange(e) {
			// 	// console.log(e);
			// }
			/* 充币 */
			recharge: function(){
				uni.navigateTo({
				    url: '../recharge/recharge'
				});
			},
			/* 提币 */
			extract: function(){
				uni.navigateTo({
				    url: '../extract/extract'
				});
				// this.smshow = true
			},
			/* 转账 */
			transfer: function(){
				// this.smshow = true
				uni.navigateTo({
				    url: '../huazhang/huazhang'
				});
				// this.jymmshow = true
			},
			/* 账单 */
			bill_page: function(){
				uni.navigateTo({
				    url: '../bill-page/bill-page'
				});
			},
			zhye:function(){
				if(this.imgurl == "../../static/zichan/yanjing.png" ){
					this.imgurl ="../../static/zichan/yanjing-tianchong.png"
					this.yue = '*******'
					this.huansuan = '~******** CNY'
				}else{
					this.imgurl = "../../static/zichan/yanjing.png" 
					this.yue = '50000.00'
					this.huansuan = '~3550000.00 CNY'
				}
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		display: flex;
		flex-wrap: wrap;
		background-image: url(../../static/my/myone.png);
		background-size: 100%;
		height: 25vh;
		.son_first{
			margin: 0.5rem;
			width: 100%;
			height: 17vh;
			display: flex;
			.son_first_left{
				display: flex;
				flex: 1;
				image{
					width: 50%;
					height: 40%;
				}
			}
			.son_first_center{
				flex: 2;
				flex-wrap: wrap;
				view{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 30%;
				}
				.son_first_center_top{
					padding-left: 2.5rem;
					.son_first_center_top_right{
						justify-content: left;
						height: 100%;
					}
					.son_first_center_top_left{
						height: 100%;
					}
					image{
						width: 25%;
						height: 50%;
					}
				}
				.son_first_center_center{
					font-size: x-large;	
				}
			}
			.son_first_right{
				flex: 1;
				text-align: right;
			}
		}
		.son_two{
			width: 100%;
			height: 10vh;
			margin: 0 0.5rem;
			background-color: #ffffff;
			display: flex;
			image{
				width: 25%;
				height: 100%;
			}
			.chongbi{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 0.5rem;
				view{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.tibi{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 0.5rem;
				view{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.zhuanzhang{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 0.5rem;
				view{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.son_three{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 0.5rem;
			.son_three_title{
				width: 100%;
				display: flex;
				view{
					flex: 1;
				}
				.son_three_title_two{
					text-align: right;
				}
			}
			.son_three_subject{
				width: 100%;
				.son_three_subject_main{
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					.title{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: left;
						padding: 0.2rem;
						color: #DE531E;
					}
					.subject{
						width: 100%;
						padding: 0.2rem;
						display: flex;
						view{
							flex: 1;
							padding: 0.2rem 0;
						}
						.three{
							text-align: right;
						}
					}
				}
			}
		}
		.shiming{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 0.5rem;
			.shiming_one{
				display: flex;
				justify-content: center;
				margin: 1rem 0;
				height: 5vh;
				width: 100%;
				image{
					width: 15%;
					height: 100%;
				}
			}
			.shiming_two{
				width: 100%;
				margin: 0.5rem;
				display: flex;
				justify-content: center;
			}
			.shiming_three{
				width: 100%;
				margin: 0.5rem;
			    display: flex;
			    justify-content: center;
			}
			.shiming_four{
				width: 100%;
			    margin: 0.5rem;
			}
		}
		.jymm{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.jymm_one{
				width: 100%;
				margin: 1rem 0;
			    font-size: large;
			    text-align: center;
			}
			.jymm_two{
				width: 100%;
				margin: 0.5rem 0;
			}
			.jymm_three{
				width: 100%;
				margin: 0.5rem 0;
				text-align: center;
			}
			.jymm_four{
				width: 100%;
				margin: 1rem;
			}
		}
	}
</style>
