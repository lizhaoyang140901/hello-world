<template>
	<div>
		<div class="grandpa" ref="grandpa_height">
			<div id="son" class="eldest_son">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
					<!-- <van-swipe-item v-for="(n, index) in lunbo_list" :key="index">
						<img :src='n.img'>
					</van-swipe-item> -->
					<van-swipe-item >
						<img src='../assets/dota.jpg'>
					</van-swipe-item>
					<van-swipe-item >
						<img src='../assets/dota.jpg'>
					</van-swipe-item>
					<van-swipe-item >
						<img src='../assets/dota.jpg'>
					</van-swipe-item>
				</van-swipe>
			</div>
			<div id="son" class="second_son"></div>
			<div id="son" class="youngest_son"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
	    return {
			clientHeight:'',
			lunbo_list:[
				{
					"img":"../assets/dota.jpg"
				},{
					"img":"../assets/dota.jpg"
				},{
					"img":"../assets/dota.jpg"
				}
			]
		};
	},
	mounted(){
		// 获取浏览器可视区域高度
		this.clientHeight = document.documentElement.clientHeight; 
		window.onresize = function temp() {
		    this.clientHeight = document.documentElement.clientHeight;
		};
	},
	watch: {
		// 如果 `clientHeight` 发生改变，这个函数就会运行
		clientHeight: function () {
	        this.changeFixed(this.clientHeight)
		}
	},
	methods:{
		//动态修改样式
		changeFixed(clientHeight){   
	        this.$refs.grandpa_height.style.height = (clientHeight - 50)+'px';
		},
	}
}
</script>

<style scoped lang="scss">
	.grandpa{
		width: 100%;
		display: flex;
		flex-wrap: wrap ;
		justify-content: center;
		background-color: #f1f1f1;
		#son{
			width: 100%;
			height:33%;
		}
		.eldest_son{
			background-color: #aaffff;
			display: flex;
			.my-swipe{
				width:100%;
				height:90%;
				color: #fff;
				margin: auto;
				font-size: 20px;
				text-align: center;
				img {
				    width: 100%;
				    height: 100%;
				}
			}
		}
	}
</style>
