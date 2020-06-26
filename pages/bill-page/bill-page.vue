<template>
	<view class="grandpa">
		<view class="son_first">
			<view class="son_first_data">
				<view @click="show = true">
					{{doto}}<u-icon name="arrow-down"></u-icon>
				</view>
				<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
			</view>
			<view class="son_first_sx" @click="bz_show = true">
				筛选
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_zc">
				<view class="son_two_son_top">当月支出(USDT)</view>
				<view class="son_two_son_center">32484.0090</view>
				<view class="son_two_son_bottom">~234.34 CNY</view>
			</view>
			<view class="son_two_sr">
				<view class="son_two_son_top">当月收入(USDT)</view>
				<view class="son_two_son_center">32484.0090</view>
				<view class="son_two_son_bottom">~234.34 CNY</view>
			</view>
		</view>
		<view class="son_three">
			<view class="son_three_son" v-for="(stiem,index) in jilulist" :key="index" @click="bz_details">
				<view class="son_three_img">
					<image src="../../static/my/gymy.png"></image>
				</view>
				<view class="son_three_text">
					<view class="son_three_text_top">
						<view>{{stiem.bz}}</view>
						<view class="son_three_val">{{stiem.je}}</view>
					</view>
					<view class="son_three_text_bottom">
						<view>{{stiem.sj}}</view>
						<view class="son_three_val">{{stiem.fs}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="bz_show" mode="right" length="80%">
			<view class="nephew">
				<view>
					<view>交易币种</view>
					<view>
						<u-checkbox-group>
							<u-checkbox 
								@change="checkboxChange" 
								v-model="item.checked" 
								v-for="(item, index) in jybzlist" :key="index" 
								:name="item.name"
							>
								{{item.name}}
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<view>
					<view>出入类型</view>
					<view>
						<u-checkbox-group>
							<u-checkbox 
								@change="checkboxChange" 
								v-model="item.checked" 
								v-for="(item, index) in crlxlist" :key="index" 
								:name="item.name"
							>
								{{item.name}}
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<view>
					<view>账单类型</view>
					<view>
						<u-checkbox-group>
							<u-checkbox 
								@change="checkboxChange" 
								v-model="item.checked" 
								v-for="(item, index) in zdlxlist" :key="index" 
								:name="item.name"
							>
								{{item.name}}
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<view>
					<view>最小交易金额</view>
					<view class="nephew_input">
						<u-input v-model="value" :type="type" :border="border" placeholder="请输入金额" placeholderStyle="color: #8F6C62;"/>
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
				keyword: "",
				show: false,
				mode: 'date',
				doto: '2020年05月20日',
				bz_show: false,
				jilulist:[
					{
						bz:"BTC",
						je:"2000.0010",
						sj:"2020-05-20 13:14",
						fs:"充值"
					},
					{
						bz:"ETH",
						je:"5300.9999",
						sj:"2020-05-20 13:14",
						fs:"提现"
					},
					{
						bz:"BTC",
						je:"2000.0010",
						sj:"2020-05-20 13:14",
						fs:"提现"
					},
					{
						bz:"ETH",
						je:"2000.0010",
						sj:"2020-05-20 13:14",
						fs:"充值"
					},
					{
						bz:"BTC",
						je:"2000.0010",
						sj:"2020-05-20 13:14",
						fs:"充值"
					}
				],
				jybzlist: [
					{
						name: '全部',
						checked: false,
						disabled: false
					},
					{
						name: 'USDT',
						checked: false,
						disabled: false
					},
					{
						name: 'BTH',
						checked: false,
						disabled: false
					},
					{
						name: 'ETH',
						checked: false,
						disabled: false
					},
				],
				crlxlist: [
					{
						name: '全部',
						checked: false,
						disabled: false
					},
					{
						name: '出账',
						checked: false,
						disabled: false
					},
					{
						name: '入账',
						checked: false,
						disabled: false
					}
				],
				zdlxlist: [
					{
						name: '全部',
						checked: false,
						disabled: false
					},
					{
						name: '钱包充值',
						checked: false,
						disabled: false
					},
					{
						name: '钱包提现',
						checked: false,
						disabled: false
					},
					{
						name: '内部转账',
						checked: false,
						disabled: false
					}
				],
				value: '',
				type: 'text',
				border: true
			}
		},
		methods:{
			change(e) {
				console.log(e);
				console.log(e.startYear)
				this.doto = (e.year) + '年' + (e.month) + '月' + (e.day) + '日'
			},
			checkboxChange(e){
				console.log(e);
			},
			/* 币种详情 */
			bz_details : function(){
				uni.navigateTo({
				    url: '../bz-details/bz-details'
				});
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-image: url(../../static/my/myone.png);
		background-size: 100%;
		height: 20vh;
		.son_first{
			width: 100%;
			height: 10vh;
			margin: 0.5rem;
			display: flex;
			align-items: center;
			font-size: large;
			.son_first_data{
				flex: 1;
			}
			.son_first_sx{
				flex: 1;
				text-align: right;
			}
		}
		.son_two{
			width: 100%;
			height: 15vh;
			margin: 0 1rem;
			border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
			background-color: #ffffff;
			display: flex;
			font-size: large;
			.son_two_son_top{
				color: #8F6C62;
				font-size: small;
			}
			.son_two_son_center{
				color: #DE531E;
			}
			.son_two_zc{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				view{
					margin: 0.3rem 0;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.son_two_sr{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				view{
					margin: 0.3rem 0;
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
			.son_three_son{
				width: 100%;
				margin: 0.3rem 0.5rem;
				margin-right: 1rem;
				display: flex;
				.son_three_img{
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
					image{
						width: 55%;
						height: 60%;
					}
				}
				.son_three_text{
					flex: 5;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					.son_three_text_top{
						width: 100%;
						display: flex;
						view{
							flex: 1;
							padding: 0.3rem 0;
						}
					}
					.son_three_text_bottom{
						width: 100%;
						display: flex;
						view{
							flex: 1;
							padding: 0.3rem 0;
						}
					}
					.son_three_val{
						text-align: right;
					}
				}
			}
		}
		.nephew{
			display: flex;
			margin: 0.5rem;
			flex-wrap: wrap;
			font-size: medium;
			view{
				padding: 0.3rem 0;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
			}
			.nephew_input{
				width: auto;
			}
		}
	}
</style>
