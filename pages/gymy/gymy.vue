<template>
	<view class="grandpa">
		<u-cell-group>
			<u-cell-item title="用户协议" @click="agreement"></u-cell-item>
			<u-cell-item title="隐私政策" @click="privacy"></u-cell-item>
			<u-cell-item title="检查更新" value="版本1.05"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			privacy:function(){
				uni.navigateTo({
				    url: '../privacy/privacy'
				});
			},
			agreement:function(){
				uni.navigateTo({
				    url: '../agreement/agreement'
				});
			}
		}
	}
</script>

<style>
</style>
