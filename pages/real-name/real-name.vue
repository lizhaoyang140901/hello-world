<template>
	<view class="gradient">
		<view class="son_one">
			<view class="son_one_one">填写身份信息</view>
			<view class="son_one_two">
				<ol>
					<li>确保名称证件信息为本人所有。</li>
					<li>请填写正确的身份信息。</li>
				</ol>
			</view>
			<view class="son_one_three">
				真实姓名
			</view>
			<view class="son_one_four">
				<u-input v-model="value" :type="type" :border="border" />
			</view>
			<view class="son_one_five">
				<u-line color="#423937" />
			</view>
			<view class="son_one_six">
				身份证号
			</view>
			<view class="son_one_seven">
				<u-input v-model="value" :type="type" :border="border" />
			</view>
			<view class="son_one_eight">
				<u-line color="#423937" />
			</view>
		</view>
		<view class="son_two">
			<view class="son_two_top">上传身份证照片</view>
			<view class="son_two_bottom">
				<view>
					<u-upload :action="action" upload-text="正面照片"></u-upload>
				</view>
				<view>
					<u-upload :action="action" upload-text="反面照片"></u-upload>
				</view>
			</view>
		</view>
		<view class="son_three">
			<view class="son_three_top">上传手持身份证照片</view>
			<view class="son_three_bottom">
				<view class="son_three_image">
					<image src="../../static/login/login.png"></image>
				</view>
				<view>
					<u-upload :action="action" upload-text="手持正面照"></u-upload>
				</view>
			</view>
		</view>
		<view class="son_four">
			<u-button type="warning">立即申请</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value: '',
				type: 'text',
				border: false,
				action: ''
			}
		}
	}
</script>

<style lang="scss">
	.gradient{
		display: flex;
		flex-wrap: wrap;
		.son_one{
			width: 100%;
		    background-color: rgba(0,0,0,0.1);
		    border-radius: 0.5rem;
		    margin: 0.5rem;
		    padding: 0.5rem;
			view{
				width: 100%
			}
			.son_one_one{
				width: 100%;
			    margin: 0.3rem;
			    font-size: larger;	
			}
			.son_one_two{
				margin: 0.5rem 0;
				margin-bottom: 1rem;
				ol{
					padding-left: 1.5rem;
				}
			}
			.son_one_three{
				margin: 0.5rem 0.3rem;
			    width: auto;	
			}
			.son_one_four{
				margin: 0.5rem 0.3rem;
				width: auto;
			}
			.son_one_five{
				width: auto;
				margin: 0 0.3rem;
			}
			.son_one_six{
				margin: 0.5rem 0.3rem;
				width: auto;
			}
			.son_one_seven{
				margin: 0.5rem 0.3rem;
				width: auto;
			}
			.son_one_eight{
				width: auto;
				margin: 0 0.3rem;
				margin-bottom: 1rem;
			}
		}
		.son_two{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			background-color: rgba(0,0,0,0.1);
			border-radius: 0.5rem;
			margin: 0.5rem;
			padding: 0.5rem;
			.son_two_top{
				width: 100%;
				margin: 0.5rem 0.3rem;
			}
			.son_two_bottom{
				width: 100%;
				display: flex;
				view{
					flex: 1;
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
			background-color: rgba(0,0,0,0.1);
			border-radius: 0.5rem;
			margin: 0.5rem;
			padding: 0.5rem;
			.son_three_top{
				width: 100%;
				margin: 0.5rem 0.3rem;
			}
			.son_three_bottom{
				width: 100%;
				display: flex;
				.son_three_image{
					image{
						width: 70%;
						height: 90%;
					}
				}
				view{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.son_four{
			margin: 2rem 1rem;
		    width: 100%;
		}
	}
</style>
