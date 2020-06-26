<template>
	<view class="grandpa">
		<view class="son">
			<view class="one">
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
			</view>
			<view class="two">
				<view>2020-05-20</view>
				<view @click="notice_xq" class="two_two">查看详情 ></view>
			</view>
		</view>
		<view class="son">
			<view class="one">
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
			</view>
			<view class="two">
				<view>2020-05-20</view>
				<view class="two_two">查看详情 ></view>
			</view>
		</view>
		<view class="son">
			<view class="one">
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
				关于Webit公链正式对外发布的通知关于Webit公链正式对外发布的通知
			</view>
			<view class="two">
				<view>2020-05-20</view>
				<view class="two_two">查看详情 ></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods: {
			notice_xq: function(){
				uni.navigateTo({
				    url: '../notice-xq/notice-xq'
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
		margin: 0.5rem 0;
		view{
			width: 90%;
			background-color: #F7F7F7;
			padding: 0.5rem;
		}
		.son{
			margin: 0.5rem 0;
		}
		.one{
			padding-bottom: 0;
			max-height: 120upx;
			overflow: hidden;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;  /* 超出部分省略号 */
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2; /** 显示的行数 **/
		}
		.two{
			display: flex;
			view{
				flex: 1;
				padding: 0;
			}
			.two_two{
				text-align: right;
			}
		}
	}
</style>
