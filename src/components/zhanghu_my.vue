<template>
  <div>
    <div class="zh_title">
        <img :src="lefturl" alt="" @click="fanhui()">
        <span>账户与安全</span>
    </div>
    <van-cell-group>
      <van-cell  is-link v-for="(n,inx) in list" :key="inx" @click="zhanshi(n.num)">
        <div class="zh_a">{{ n.text }}</div>
      </van-cell>
    </van-cell-group> 
    <div class="zhBtn" @click="tuichu">退出登录</div> 
  </div>
</template>

<script>
import store from '../../store/index.js'

export default {
  name: "zhanghu_my",
  data() {
    return {
	  lefturl:require('../assets/my/left.png'),
	  token: '',
      list: [
        /* {
          text:'查看账单',
          num:'1'
        }, */
        {
          text:'设置收款账号',
          num:'2'
        },
        {
          text:'设置提现密码',
          num:'3'
        },
        {
          text:'修改登录密码',
          num:'4'
        },
     //    {
     //      text:'绑定手机号码',                                                  
					// num:'5'
     //    },
        {
          text:'更换手机号码',
          num:'6'
        }
      ]
    };
  },
  methods:{
    fanhui(){
      this.$router.push({ name: "my" });
    },
    zhanshi(key){
      switch(key) {
        /* case "1":
			this.$router.push({ name: "zhangdan" });
          break; */
        case "2":
          this.$router.push({ name: "shoukuan" });
          break;
        case "3":
          this.$router.push({ name: "tianxianmima" });
          break;
        case "4":
          this.$router.push({ name: "xiugaimima" });
          break;
        // case "5":
        //   this.$router.push({ name: "bangding_phone" });
        //   break;
        default:
          this.$router.push({ name: "phone_old" });
      }
    },
	tuichu() {
		if(this.token){
			if(typeof load_userinfo === "function"){
				load_userinfo();
				this.$toast({
				message: "退出登录",
				icon: "chat-o"
				});
				this.$router.push({ name: "login" });
			}else{
				store.commit("set_token", '');
				this.$toast({
				message: "退出登录",
				icon: "chat-o"
				});
				this.$router.push({ name: "login" });
			}
		}else{
			this.$toast({
			message: "您暂未登录，无需退出",
			icon: "chat-o"
			});
		}
	}
  },
  created() {
	  if(typeof read_user === "function"){
	  	this.token = read_user().token;
	  }else{
	  	this.token = store.state.token;
	  }
  }
};
</script>
<style scoped>
.zh_title{
  background-color: #fafafa;
  padding: 0px 16px;
  height: 1.4rem;
  line-height: 1.4rem;
}
.zhBtn{
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 0.5rem;
    background: #6678ff;
    height: 1.2rem;
    border-radius: 0.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
}
.zh_title img{
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.zh_title span{
    font-size: .5rem;
    height: 1.4rem;
    line-height: 1.4rem;
}
.zh_a{
  float: left;
}
.van-cell:last-child{
    border-bottom: 0;
}
</style>