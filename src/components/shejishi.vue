<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">找设计师</van-col>
      </van-row>
    </header>
    <!-- 内容盒子 -->
    <div class="boxCont" v-for="(n, inx) in boxContList" :key="inx">
      <van-row>
        <van-col class="imgBox">
          <img :src="n.imgurl" alt class="imgHead" />
        </van-col>
        <van-col class="inputSjs" span="10">
          <p style="font-size:.4rem;font-weight:400;">{{n.text1}}</p>
          <p style="font-size:.3rem;font-weight:300;">{{n.text2}}</p>
        </van-col>
        <van-col>
          <van-button type="default" class="buttonCls" @click="jumpsjsDetails(n.user_class_id,n.user_id)">查看详情</van-button>
        </van-col>
      </van-row>
      <div class="labelIconBox">
        <img :src="labelIcon" alt class="labelIconImg" />
        <span class="styleGood">{{n.styleGood_txt}}</span>
      </div>
      <van-row gutter="20" class="sjsImg">
        <van-col span="8">
          <img :src="n.sjsImg1" alt />
        </van-col>
        <van-col span="8">
        </van-col>
        <van-col span="8">
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

export default {
	name: "shejishi",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			labelIcon:require('../assets/images/labelIcon.png'),
			boxContList: []
		};
	},
	created(){
		this.$axios.get("https://test.sazjob.com/customapi/HomePage/sheji_list?page=1").then(_d => {
		var list = [];
		var map = {};
		for(var i in _d.data.data){
			map["imgurl"] = this.touxiang(_d.data.data[i].headimgurl);
			map["text1"] = this.xingming(_d.data.data[i].nickname);
			map["text2"] = this.zhicheng(_d.data.data[i].ranks);
			map["sjsImg1"] = this.zuopin(_d.data.data[i].view_project.imgurl);
			map["user_id"] = _d.data.data[i].user_info_id;
			map["user_class_id"] = _d.data.data[i].userclass_id;
			list.push(map);
			map = {};
		}
		console.log(list);
		this.boxContList = list;
		});
	},
	methods: {
		zhicheng(n) {
			switch(n){
				case 1:
					return '高级设计师'
					break;
				case 2:
					return '中级设计师'
					break;
				default:
					return '初级设计师'
		        break;
			}
		},
		touxiang(n) {
			let url = '';
			if(n){
				url = 'https://test.sazjob.com' + n;
			}else{
				url = '../assets/images/touxiang.png';
			}
			return url;
		},
		xingming(n) {
			let url = '';
			if(n){
				url = n;
			}else{
				url = '未填写昵称'
			}
			return url;
		},
		zuopin(n) {
			let url = 'https://test.sazjob.com' + n;
			return url;
		},
		jumpB() {
			this.$router.go(-1);
		},
		jumpsjsDetails(m,n) {
			this.$router.push({ name: "sjsDetails",params:{user_class:m,user_id:n}});
		}
	}
};
</script>
<style scoped>
header {
  padding: 0 0.3rem;
  height: 1.4rem;
  line-height: 1.4rem;
  border-bottom: 0.15rem solid #f2f2f2;
  font-size: 0.5rem;
}
.leftImg {
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}
.zshejishi {
  display: inline-block;
}
.boxCont {
  padding: 0 0.3rem;
  border-bottom: 0.15rem solid #f2f2f2;
  box-sizing: border-box;
}
.imgBox {
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
}
.imgHead {
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
}
.buttonCls {
  margin-top: 1.2rem;
  background: #6678ff;
  color: #fff;
  border-radius: 0.2rem;
  width: 2.4rem;
  height: 0.8rem;
  line-height: 0;
  padding: 0;
}
.inputSjs {
  width: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.inputSjs p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1rem;
}
.labelIconBox {
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #d4d6ff;
  border-radius: 0.1rem;
  padding: 0 0.1rem;
  display: inline-block;
}
.labelIconImg {
  width: 0.4rem;
  height: 0.4rem;
}
.styleGood {
  display: inline-block;
  color: #909bff;
}
.sjsImg {
  margin: 0.2rem 0;
}
.sjsImg img {
  border-radius: 0.2rem;
  width: 2.72rem;
  height: 2.72rem;
}
</style>
