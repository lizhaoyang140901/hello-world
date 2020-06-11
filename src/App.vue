<template>
  <div id="app" :class="{'active': isActive}">
    <router-view></router-view>
    <footer_bar v-if="!$route.meta.keepAlive"></footer_bar>
  </div>
</template>

<script>
import footer_bar from './components/footer_bar'
export default {
	name: "App",
	components: {
		footer_bar
	},
	data() {
		return {
			isActive:true
		};
	},
	methods: {
		lss(){
			this.isActive = false;
		}
	},
	
	created() {
		var _this = this;
		_this.lss();
	},
	watch: {
		'$route':'lss',
		$route(to,from){
			if(to.path === '/'){
				this.isActive = false;
			}else{
				this.isActive = true;
			}
		}
	}
};
</script>

<style>
	#app{
		padding-top: 0.5rem;
	}
	.active {
		padding-bottom: 1.5rem;
	}
	.van-tabbar--fixed {
		z-index: 999;
	}
</style>
