<template>
	<div>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
			<van-tabbar-item icon="label-o" to="/tuijianProject">项目展示</van-tabbar-item>
			<van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import store from '../../store'

export default {
	name: "footer_bar",
	data() {
		return {
			active: 0
		};
	},
	mounted() {
		this.active = store.state.daohang_id === ''?0:store.state.daohang_id
	}
};
</script>

<style scoped>
</style>
