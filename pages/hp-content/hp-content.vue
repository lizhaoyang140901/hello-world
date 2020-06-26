<template>
	<view class="grandpa">
		<u-collapse>
			<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">
				<view class="collapse-item">
					{{item.body}}
				</view>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				itemList: [
					{
						head: "标题1",
						body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
						open: true,
						disabled: true
					},{
						head: "标题2",
						body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
						open: false,
					},{
						head: "标题3",
						body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
						open: false,
					},
				],
			}
		}
	}
</script>

<style lang="scss">
	.grandpa{
		margin: 0.5rem;
		.collapse-item {
			background-color: rgba(50,40,38,0.2);
			padding: 0.3rem;
			border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
		}
	}
</style>
