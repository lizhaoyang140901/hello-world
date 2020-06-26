<template>
	<view class="grandpa">
		<view class="first">
			<view>
				<view class="first_select">
					<div class="select">
						<div class="select-head c-row a-c j-b"  v-on:click="changeSiteTitle()">
							<span class="select-head-cont" >{{condition}}</span>          
						</div>
						<ul class="option"  v-show="option">
							<li class="option-item  c-row a-c" v-for="item in siteList" v-on:click="changeSite(item)">            
								{{item.siteName}}
							</li>
						</ul>
					</div>
				</view>
				<u-form :model="form" ref="uForm">
					<u-form-item>
						<u-input v-model="form.name" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item left-icon="man-add">
						<u-input v-model="form.name" placeholder="请输入验证码"/>
						<u-button :custom-style="customStyle">获取验证码</u-button>
					</u-form-item>
					<u-form-item left-icon="lock">
						<u-input v-model="form.intro1" type="password" :password-icon="passwordIcon" placeholder="登陆密码(8-20位)数字和字母组成"/>
					</u-form-item>
					<u-form-item left-icon="lock">
						<u-input v-model="form.intro2" type="password" :password-icon="passwordIcon" placeholder="确认登陆密码"/>
					</u-form-item>
				</u-form>
			</view>
			<view>
				<u-button type="warning" class="custom-style">确定</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					form: {
						name: '',
						intro1: '',
						intro2: ''
					},
					option: false,
					condition: "+86",
					siteList: [
						{ 
							siteName:   "+81"
					    },{ 
							siteName:   "+82"
					    },{ 
							siteName:   "+83"
						}
					],
					passwordIcon:true,
					customStyle:{
						color: '#DE531E',
						width: '160rpx'
					}
				}
			},
			methods:{
				changeSite(e) {
					console.log(e.siteName)
					this.condition = e.siteName
					this.option = false;
				},
				changeSiteTitle() {
					this.option = !this.option
				}
			}
		}
</script>

<style lang="scss">
	.grandpa{
		.first{
			padding: 0.5rem 1rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			view{
				width: 100%;
				margin: 0.3rem 0;
			}
			.first_select{
				width: 10%;
				position: absolute;
				top: 2.1rem;
				z-index: 99999;
				.select {
				    width: 2rem;
				    height: 1rem;
				    color: #666666;
				}
				
				.select-head {
				    height: .8rem;
				    color: #202020;
				    box-sizing: border-box;
				    line-height: .8rem;
				}
				
				.select-head .select-head-cont {
				    float: left;
				    padding-right: 10px;
				}
				
				.select:hover .option {
				    display: block;
				}
				
				.option {
				    position: absolute;
				    left: 0;
				    color: #63666E;
				    background: #FFFFFF;
				    line-height: 25px;
				    display: none;
				    z-index: 20000;
				    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.09);
				    text-align: center;
					list-style: none;
					padding: 0;
					padding-right: 10px;
				}
				
				.option-item {
				    border-bottom: .5px solid rgba(197, 197, 197, 0.27);
				    width: 1rem;
				    padding:.25rem;
				    height: .8rem;
				}
				
				.option-item:last-child {
				    border: none;
				}
			}
		}
		.custom-style{
			background-color: #DE531E;
			width: 600rpx;
		}
	}
</style>
