<template>
	<view class="grandpa">
		<view class="son_one">
			<view class="son_one_left">
				{{value}}
			</view>
			<view class="son_one_right">
				<u-input :type="type" :border="border" @click="show = true" placeholder="切换币种"/>
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_image">
				<image src="../../static/lunbo/ma.jpg"></image>
			</view>
			<view>转入地址</view>
			<view>21j3bk1bk12j3bk1j3123</view>
			<view>
				<u-button type="warning">复制地址</u-button>
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
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value: 'BTH',
				type: 'select',
				show: false,
				border: false,
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
				]
			}
		},
		methods:{
			actionSheetCallback(index) {
				this.value = this.actionSheetList[index].text;
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
			padding: 1rem 0;
			margin: 0 0.5rem;
			border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
			font-size: small;
			view{
				display: flex;
				justify-content: center;
				margin: 0.5rem auto;
			}
			.son_two_three{
				color: #1AAD19;
			}
			.son_two_image{
				height: 20vh;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 30%;
					height: 70%;
				}
			}
		}
		.son_three{
			margin: 0.5rem;
			view{
				padding: 0.5rem 0;
			}
		}
	}
</style>
