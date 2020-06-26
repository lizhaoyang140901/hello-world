<template>
	<view class="grandpa">
		<view class="son_one">
			<view class="son_one_left">
				{{bzvalue}}
			</view>
			<view class="son_one_right">
				<u-input type="select" :border="false" @click="show = true" placeholder="切换币种"/>
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_phone">
				<view>收款用户</view>
				<view>
					<u-input v-model="mobile" type="text" :border="true" border-color="#c8c8c4" placeholderStyle="color: #8F6C62;" placeholder="请输入手机号"/>
				</view>
			</view>
			<view class="son_two_zz">
				<view class="son_two_zz_tiele">
					<view>转账数量</view>
					<view class="son_two_zz_tiele_right">USDT 可用: 25.5678</view>
				</view>
				<view>
					<u-input v-model="mobile" type="text" :border="true" border-color="#c8c8c4" placeholderStyle="color: #8F6C62;" placeholder="请输入转账金额"/>
				</view>
			</view>
			<view class="son_two_sx">
				<view class="son_two_sx_title">
					<view>手续费</view>
					<view class="son_two_sx_title_right">费率: 1%</view>
				</view>
				<view>
					<u-input v-model="sx" type="text" :border="true" border-color="#c8c8c4" placeholderStyle="color: #8F6C62;"/>
				</view>
			</view>
			<view class="son_two_bz">
				<view>备注</view>
				<view>
					<u-input v-model="mobile" type="text" :border="true" border-color="#c8c8c4" placeholderStyle="color: #8F6C62;" placeholder="请输入备注"/>
				</view>
			</view>
			<view class="son_two_button">
				<u-button type="warning" @click="sfyz_show = true">确认转账</u-button>
			</view>
		</view>
		<view class="son_three">
			<view>
				温馨提示:
			</view>
			<view>
				<ul>
					<li>请勿提现ERC2.0_USDT以外的地址</li>
					<li>最低1 USDT提起</li>
				</ul>
			</view>
		</view>
		<u-popup v-model="sfyz_show" mode="center" border-radius="14" length="90%" :closeable="true">
			<view class="authentication">
				<view class="sfyz_tt">身份验证</view>
				<view class="sfyz_tc">
					<view class="inv-h-w">
						<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">谷歌</view>
						<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">短信</view>
					</view>
					<view class="" v-show="Inv == 0">
						<view class="input">
							<u-input v-model="value" type="text" :border="false" placeholder="请输入谷歌验证"/>
						</view>
						<u-line color="#423937" />
						<view class="input">
							<u-input v-model="value" type="text" :border="false" placeholder="请输入交易密码"/>
						</view>
						<u-line color="#423937" />
						<view class="input wangji">忘记密码</view>
						<view>
							<u-button type="warning">确定</u-button>
						</view>
					</view>
					<view class="" v-show="Inv == 1">
						<view class="input">
							<u-input v-model="value" type="text" :border="false" placeholder="请输入短信验证码"/>
						</view>
						<u-line color="#423937" />
						<view class="input verifivcation">
							<view>验证码将发送至+86 153****0219</view>
							<view class="verifivcation_right">获取验证码</view>
						</view>
						<view class="input">
							<u-input v-model="value" type="text" :border="false" placeholder="请输入交易密码"/>
						</view>
						<u-line color="#423937" />
						<view class="input wangji">忘记密码</view>
						<view>
							<u-button type="warning">确定</u-button>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bzvalue: 'BTH',
				show: false,
				actionSheetList: [
					{
						text: 'BTH'
					},
					{
						text: 'ETH'
					},
					{
						text: 'FTP'
					}
				],
				mobile: '',
				sx:'5.00,                                                          USDT',
				sfyz_show: false,
				Inv: 0,
				value: '',
			}
		},
		methods:{
			actionSheetCallback(index) {
				this.bzvalue = this.actionSheetList[index].text;
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		.son_one{
			display: flex;
			padding-left: 0.5rem;
			margin: 0.5rem 0;
			.son_one_left{
				flex: 3;
				display: flex;
				align-items: center;
			}
			.son_one_right{
				flex: 1;
			}
		}
		.son_two{
			background-color: rgba(0,0,0,0.1);
			margin: 0.5rem;
			border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
			padding-bottom: 0.5rem;
			.son_two_phone{
				padding: 0 0.5rem;
				view{
					padding: 0.5rem 0;
				}
			}
			.son_two_zz{
				padding: 0 0.5rem;
				view{
					padding: 0.5rem 0;
				}
				.son_two_zz_tiele{
					display: flex;
					view{
						flex: 1;
					}
					.son_two_zz_tiele_right{
						text-align: right;
					}
				}
			}
			.son_two_sx{
				padding: 0 0.5rem;
				view{
					padding: 0.5rem 0;
				}
				.son_two_sx_title{
					display: flex;
					view{
						flex: 1;
					}
					.son_two_sx_title_right{
						text-align: right;
					}
				}
			}
			.son_two_bz{
				padding: 0 0.5rem;
				view{
					padding: 0.5rem 0;
				}
			}
			.son_two_button{
				padding: 0 0.5rem;
				margin: 1rem 0;
			}
		}
		.son_three{
			margin: 0.5rem;
			view{
				padding: 0.5rem 0;
			}
		}
		.authentication{
			display: flex;
			flex-wrap: wrap;
			.sfyz_tt{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0.5rem;
			}
			.sfyz_tc{
				width: 100%;
				margin: 0.5rem;
				.inv-h-w{
					background-color: 
					#FFFFFF;height: 100upx;
					display: flex;
					width: 50%;
					margin: 0 auto;
				}
				.inv-h{font-size: 30upx;flex: 1;text-align: center;color: #C9C9C9;height: 100upx;line-height: 100upx;width: 20%;}
				.inv-h-se{color: #000000;border-bottom: 4upx solid #D93900;}
				page{background-color: #F2F2F2;}
				.input{
					padding: 0.3rem 0;
				}
				.wangji{
					text-align: right;
				}
				.verifivcation{
					display: flex;
					view{
						flex: 1;
					}
					.verifivcation_right{
						text-align: right;
					}
				}
			}
		}
	}
</style>
