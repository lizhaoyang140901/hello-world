<template>
  <div>
    <header>
      <van-row>
        <van-col span="18">
          <img src="../assets/images/left.png" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="collection" span="2" :visible.sync="picVisible">
          <img :src="imgUrl" alt @click="clickPic" />
        </van-col>
        <van-col class="share" span="2">
          <img src="../assets/images/share.png" alt />
        </van-col>
      </van-row>
    </header>
    <!-- 介绍 -->
    <div class="introduce">
      <van-row>
        <van-cell>
          <img :src="imgUurl" alt class="introduceImg" />
        </van-cell>
      </van-row>
      <van-row v-for="(n, inx) in information" :key="inx" class="inforBox">
        <van-col span="9" class="inforBox1">{{n.name}}</van-col>
        <van-col span="6">{{n.sex}}</van-col>
        <van-col span="9" class="inforBox2">{{n.age}}</van-col>
        <van-col span="10" class="inforBox3">{{n.work}}</van-col>
        <van-col span="10" class="inforBox4">{{n.experience}}</van-col>
      </van-row>
    </div>
    <!-- 资质证书与案例展示 -->
    <div class="toggleTwo">
      <van-tabs v-model="active" color="#6678ff">
        <van-tab title="资质证书">
          <van-grid :border="false" :column-num="2" class="zizhi" v-if="zizhiImg.length >0">
            <van-grid-item v-for="(n, inx) in zizhiImg" :key="inx">
				<div class="biaoti">{{n.title}}</div>
				<img :src="n.imgurl" />
            </van-grid-item>
          </van-grid>
		  <van-grid :border="false" :column-num="1" class="zizhi" v-else>
		    <van-grid-item>
		  		<div class="biaoti">暂未上传任何资质证书</div>
		    </van-grid-item>
		  </van-grid>
          <!-- <van-tabbar v-model="active1" class="contactBox">
            <van-grid :border="false">
              <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                  <i class="van-icon van-icon-phone-o van-grid-item__icon"></i>
                  <span class="van-grid-item__text">电话咨询</span>
                </div>
              </div>
              <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                  <i class="van-icon van-icon-service-o van-grid-item__icon"></i>
                  <span class="van-grid-item__text">在线客服</span>
                </div>
              </div>
            </van-grid>
            <div class="contactBtn">立即联系</div>
          </van-tabbar> -->
          <!-- <van-tabbar v-model="active1" class="contactBox">
            <van-row class="vanPos">
              <van-col span="5">
                <van-icon name="phone-o" size="1rem" />
              </van-col>
              <van-col span="16">
                <input type="text" value="12345678911" class="phoneInt" readonly="readonly" />
              </van-col>
            </van-row>
            <div class="contactBtn">立即联系</div>
          </van-tabbar> -->
        </van-tab>

        <van-tab title="案例展示">
            <van-grid :border="false" :column-num="2" class="anli" v-if="anliImg.length >0">
				<van-grid-item v-for="(n, inx) in anliImg" :key="inx">
					<div class="biaoti">{{n.title}}</div>
					<img :src="n.imgurl" />
				</van-grid-item>
			</van-grid>
			<van-grid :border="false" :column-num="1" class="anli" v-else>
				<van-grid-item>
					<div class="biaoti">暂未上传任何资质证书</div>
				</van-grid-item>
			</van-grid>
            <!-- <van-tabbar v-model="active1" class="contactBox">
              <van-grid :border="false">
                <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                  <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                    <i class="van-icon van-icon-phone-o van-grid-item__icon"></i>
                    <span class="van-grid-item__text">电话咨询</span>
                  </div>
                </div>
                <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                  <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                    <i class="van-icon van-icon-service-o van-grid-item__icon"></i>
                    <span class="van-grid-item__text">在线客服</span>
                  </div>
                </div>
              </van-grid>
              <div class="contactBtn">立即联系</div>
            </van-tabbar>-->
			<!-- <van-tabbar v-model="active1" class="contactBox">
              <van-row class="vanPos">
                <van-col span="5">
                  <van-icon name="phone-o" size="1rem" />
                </van-col>
                <van-col span="16">
                  <input type="text" value="12345678911" class="phoneInt" readonly="readonly" />
                </van-col>
              </van-row>
              <div class="contactBtn">立即联系</div>
            </van-tabbar> -->
          
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "sjsDetails",
  data() {
    return {
      picVisible: false,
      imgArr: ["Collection.png", "Collection_active.png"],
      imgIndex: 0,
	  imgUurl: "",
      /* imgUurl: require("../assets/images/1.jpg"), */
      information: [
        // {
        //   name: "胡兆建",
        //   sex: "男",
        //   age: "32岁",
        //   work: "精英设计师",
        //   experience: "5年经验"
        // }
      ],
      active: 2,
      active1: 0,
      zizhiImg: [
        // {
        //   zzImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   zzImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   zzImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   zzImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   zzImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   zzImg: require("../assets/images/zhuangxiu_img.png")
        // }
      ],
      anliImg: [
        // {
        //   alImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   alImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   alImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   alImg: require("../assets/images/zhuangxiu_img.png")
        // },
        // {
        //   alImg: require("../assets/images/zhuangxiu_img.png")
        // }
      ]
    };
  },
  computed: {
    imgUrl: function() {
      return require("../assets/images/" + this.imgArr[this.imgIndex]);
    }
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
    clickPic() {
      this.imgIndex--;
      if (this.imgIndex < 0) {
        this.imgIndex = this.imgArr.length - 1;
      }
    },
	touxiang(n) {
		let url = '';
		if(n){
			url = 'https://test.sazjob.com' + n;
		}else{
			url = '../static/images/1.jpg';
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
	zhicheng(m,n) {
		if(m == 2){
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
		}
	},
	xingbie(n) {
		let xingbie = '';
		if(n){
			xingbie = n;
		}else{
			xingbie = '未填写性别'
		}
		return xingbie;
	},
	suishu(n) {
		let nianji = '';
		if(n){
			nianji = n;
		}else{
			nianji = '未填写年龄'
		}
		return nianji;
	},
	jing(n) {
		let jingyan = '';
		if(n){
			jingyan = n;
		}else{
			jingyan	 = '未填写经验'
		}
		return jingyan;
	},
	image(n) {
		let url = '';
		if(n){
			url = 'https://test.sazjob.com' + n;
		}else{
			url = '../static/images/zhuangxiu_img.png';
		}
		return url;
	},
	juese_xiangqing() {
		let m = this.$route.params.user_class
		let n = this.$route.params.user_id
		if(n){
			this.$axios.get('https://test.sazjob.com/backapi/Singlejuesexq/view?user_info_id='+ n).then(_d =>{
				var _this = this;
				/* console.log(_d);
				console.log(_d.data.data); */
				var list = [];
				var map = {};
				var image = this.touxiang(_d.data.data.headimgurl);
				var name = this.xingming(_d.data.data.nickname);
				var dengji = this.zhicheng(m,_d.data.data.ranks);
				var nan_nv = this.xingbie(_d.data.data.sex);
				var nianling = this.suishu(_d.data.data.age);
				var jingyan = this.jing(_d.data.data.experience);
				map["name"]=name;
				map["work"]=dengji;
				map["sex"] = nan_nv;
				map["age"] = nianling;
				map["experience"] = jingyan;
				list.push(map);
				/* console.log(list); */
				_this.imgUurl = image;
				_this.information = list;
			});
			this.$axios.get('https://test.sazjob.com/backapi/JueseZizhi/list?user_info_id='+ n).then(_d => {
				// console.log(_d);
				// console.log(_d.data.data.list);
				if(_d.data.data.list){
					var list = [];
					var map = {};
					for(var or in _d.data.data.list){
						var biaoti = _d.data.data.list[or].title;
						var img = this.image(_d.data.data.list[or].imgurl);
						map['title'] = biaoti;
						map['imgurl'] = img;
						list.push(map);
						map = {};
					}
					console.log(list);
					this.zizhiImg = list;
				}else{
					this.zizhiImg = '';
					/* console.log(this.zizhiImg); */
				}
			});
			this.$axios.get('https://test.sazjob.com/backapi/Jueseprojectlist/list?user_info_id='+ n).then(_d => {
				// console.log(_d);
				// console.log(_d.data.data.list);
				if(_d.data.data.list){
					var list = [];
					var map = {};
					for(var or in _d.data.data.list){
						var biaoti = _d.data.data.list[or].title;
						var img = this.image(_d.data.data.list[or].imgurl);
						map['title'] = biaoti;
						map['imgurl'] = img;
						list.push(map);
						map = {};
					}
					console.log(list);
					this.anliImg = list;
				}else{
					this.anliImg = '';
					/* console.log(this.anliImg); */
				}
			});
		}
	}
  },
  created() {
  	  this.juese_xiangqing();
  },
  watch:{
  	  "$route": "juese_xiangqing"
  }
};
</script>

<style scoped>
header {
  padding: 0 0.3rem;
  height: 1.4rem;
  line-height: 1.4rem;
  font-size: 0.5rem;
}
.leftImg {
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}
.biaoti{
	font-size: larger;
	padding: 0.1rem;
}
.collection img {
  width: 0.7rem;
  height: 0.7rem;
}
.share {
  float: right;
}
.share img {
  width: 0.7rem;
  height: 0.7rem;
}
.introduce {
  padding: 0 0.3rem;
  border-bottom: 0.15rem solid #f2f2f2;
}
.introduceImg {
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
}
.van-cell__value--alone {
  text-align: center;
}
.van-cell {
  padding: 5px 0;
}
.inforBox {
  text-align: center;
  margin-top: 0.3rem;
  font-size: 0.4rem;
  margin-bottom: 1rem;
}
.inforBox1 {
  text-align: right;
  margin-bottom: 0.2rem;
}
.inforBox2 {
  text-align: left;
  margin-bottom: 0.3rem;
}
.inforBox3 {
  float: left;
  text-align: right;
}
.inforBox4 {
  float: right;
  text-align: left;
}
.toggleTwo {
  margin-bottom: 1.3rem;
}
.zizhi img,
.anli img {
  width: 4.2rem;
  height: 3rem;
}
/* .contactBox {
  padding: 0 0.3rem;
} */
.van-grid-item__content {
  padding: 0 0;
  width: 2rem;
  height: auto;
  margin-left: 0.3rem;
}
.van-grid-item__content::after {
  border: 0;
}
.contactBtn {
  position: fixed;
  right: 0.5rem;
  bottom: 0.15rem;
  width: 4rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #6678ff;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.4rem;
  cursor: pointer;
}
.vanPos {
  margin-left: 0.3rem;
  width: 5rem;
  height: 1.3rem;
  line-height: 1.3rem;
}
.phoneInt {
  font-size: 0.5rem;
}
.van-icon {
  margin-top: 0.15rem;
}
</style>
