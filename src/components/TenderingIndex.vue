<template>
  <div class="hello">
    <!-- <van-sticky > -->
      <van-row class="search top">
        <van-col span="4" class="location">
          <span class="city">{{city}}</span>
        </van-col>
        <van-col span="18">
          <van-search v-model="value" placeholder="请输入公司名称"  /><!-- @click="switchTo('/TenderReport')"-->
        </van-col>
      </van-row>
    <!-- </van-sticky> -->
    
    <div class="listDressing">
      
    </div>

    <!-- list 图片区域 -->
    <van-tabs v-model="active" animated type='none' swipeable>
      
      <van-tab title="投标项目">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="infor"
        >
        <van-row class="bid" v-for="bid in bidList" :key='bid.index'  @click="jurisdiction(bid.project_id)">
          <van-col span="16">
            <div class="bidText">{{decorateType[bid.title]+' '+decorate_style[bid.decorate_style]+house_type[bid.house_type]}}</div>
            <div class="bidTwo">
              <span>{{house_type[bid.house_type]}}</span>|<span>{{decorate_style[bid.decorate_style]}}</span>|<span>{{bid.acreage}}㎡</span>|<span>{{bid.city}}</span>
            </div>
          </van-col>
          <van-col span="8">
            <div class="bidData">{{new Date(bid.add_time*1000).getFullYear()+'-'+Number(new Date(bid.add_time*1000).getMonth()+1)+'-'+new Date(bid.add_time*1000).getDate()}}</div>
            <div class="bidBolean">已投标</div>
          </van-col>
        </van-row>
        </van-list>
      </van-tab>

      
      <van-tab title="中标项目">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="infor_1"
        >
         <van-row class="bid" v-for="winBid in winBidList" :key='winBid.index'  @click="jurisdiction(winBid.project_id)">
          <van-col span="16">
            <div class="bidText">{{decorate_style[winBid.decorate_style]+house_type[winBid.house_type]}}</div>
            <div class="bidTwo">
              <span>{{house_type[winBid.house_type]}}</span>|<span>{{decorate_style[winBid.decorate_style]}}</span>|<span>{{winBid.acreage}}㎡</span>|<span>{{winBid.city}}</span>
            </div>
          </van-col>
          <van-col span="8">
            <div class="bidData">{{new Date(winBid.add_time*1000).getFullYear()+'-'+Number(new Date(winBid.add_time*1000).getMonth()+1)+'-'+new Date(winBid.add_time*1000).getDate()}}</div>
            <div class="bidBolean">已中标</div>
          </van-col>
        </van-row>
        </van-list>
      </van-tab>
     
    </van-tabs>
    

    <div class="tianChong" value="王强"></div>

    <!-- <footer_bar></footer_bar> -->
  </div>
</template>

<script>
import store from '../../store';
// import addressList from "../assets/myStyle/area.js";
export default {
  name: "TenderingIndex",
  data() {
    return {
      showRegion: false,
      showDress: false,
      area_name:'去看看',
      value: "",
      active: 0,
      address:'https://test.sazjob.com',
      token:'',
      userid:'',
      city:'',
      list_1:{},
      page:1,
      page1:1,
      finished:false,
      loading:false,
      //house:'',
      decorateType: ["毛坯房装修", "旧房改造", "局部改造", "工装装修"],
      house_type:["一居室", "二居室", "三居室", "四居室", "公寓", "复式", "别墅", "小户型"],
      //style:'',//装修风格
      decorate_style:["现代", "美式", "简约", "简欧", "欧式", "宜家", "中式", "田园", "日式", "混搭", "北欧", "地中海", "新古典", "东南亚"],
      t_is_tender:['已投标','未投标'],
      newdata:'',
      time:[],
      // listIndex:[],
      // images:[],
      // 中标项目列表
      winBidList:[
       
      ],
      // 投标项目列表
      bidList:[
        
      ],
      //列表数据
      list:[
        {
          imgUrl:require('../assets/images/yz.png'),
          listText:'108m²现代风格',
          listButton:'去看看'
        },
        {
          imgUrl:require('../assets/images/yz.png'),
          listText:'188m²现代风格',
          listButton:'去看看'
        },
        {
          imgUrl:require('../assets/images/yz.png'),
          listText:'108m²现代风格',
          listButton:'去看看'
        },
        {
          imgUrl:require('../assets/images/yz.png'),
          listText:'188m²现代风格',
          listButton:'去看看'
        },
        {
          imgUrl:require('../assets/images/yz.png'),
          listText:'108m²现代风格',
          listButton:'去看看'
        },
        {
          imgUrl:require('../assets/images/yz.png'),
          listText:'188m²现代风格',
          listButton:'去看看'
        }
      ],

    };
  },
  props: {},
  methods: {
    switchTo(path,attr) {
      // console.log(this.$router)
      // this.$router.replace(path);
      this.$router.push({name:path,params:{project_id:attr}});
      // alert(attr.project_id);
    },
    infor(){
      //投标
      this.$axios.post(this.address+'/customapi/Yitoubiao/list',{
        page:this.page,
        juese:this.userid,
      }).then(this.hand)
        .catch(err=> {
            console.log(`${err}`);
            // console.log(data.time)
        })
      },
      //中标
      infor_1(){
        this.$axios.post(this.address+'/customapi/Yitoubiao/zhonglist',{
          page:this.page1,
          juese:this.userid
        }).then(this.handNext)
        .catch(err=> {
            console.log(`${err}`);
        })
      },
      
    
    
    hand(res){
      res=res.data.data;
    
        // this.bidList=res;
        for(var i=0; i<res.length;i++){
          this.bidList.push(res[i]);
        }
        this.page+=1;
        this.loading=false;
        if(res.length<20){
          this.finished=true;
        }
        console.log(res);

      },
      handNext(res){
        res=res.data.data;
    
        for(var i=0; i<res.length;i++){
          this.winBidList.push(res[i]);
        }
        this.page1++;
        this.loading=false;
        if(res.length<20){
          this.finished=true;
        }
        console.log(res);
      },
      jurisdiction(attr){//判断是否有权操作
        this.$axios.post(this.address+'/customapi/Yitoubiao/isauthor',{
          juese:this.userid,
          project_id:attr
        },{header:{Authorization: this.token}}).then(res=>{
          console.log(res);
          if(res.data.status==201){
              this.switchTo('TenderDetailsNew',attr);
          }else{
              this.switchTo('TenderDetails',attr);
          }
        }).catch(err=>{
          console.log(`${err}`);
        })
      }
    },
  mounted(){
		//获取userclass_id和token
		if(typeof read_user === "function"){
			this.city = testfun();
			this.userid = read_user().userclass_id;
			this.token = read_user().token;
		}else{
			this.userid = store.state.userclass_id;
			this.token = store.state.token;
			this.city = '天津市';
    }
    // this.jurisdiction();
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  position: fixed;
  width: 100%;
  z-index: 10;
}
.van-search__content {
  background-color: #fff;
  border: 1px solid #969696;
  border-radius: 1rem;
}
.add {
  background: #fee;
}
.listDressing {
  padding: 0 0.3rem;
}
.textDres {
  font-size: 0.4rem;
}
.iconFont {
  margin: 0 0 0 0.2rem;
  vertical-align: text-top;
}
.listFlex {
  width: 100%;
  float: left;
  position: relative;
}
.listFlex .listPic {
  margin-left: 0.36rem;
  height: 5.8rem;
  width: 44.5%;
  /* background: url("../assets/images/tender.jpg"); */
  float: left;
  border-radius: 0.4rem;
  margin-top: 0.2rem;
  position: relative;
}
.listLogo {
  position: absolute;
  top: 1.4rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: 1.6rem;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  color: #000;
  font-size: .4rem;
  background: #fee;
  border-radius: 50%;
}
.listText {
  font-size: 0.4rem;
  color: #fff;
  position: absolute;
  top: 3.5rem;
  display: block;
  width: 100%;
  text-align: center;
  /* left: 20%; */
  /* transform: translate(-50%,0); */
}
.listButton {
  font-size: 0.3rem;
  color: #fff;
  position: absolute;
  top: 4.6rem;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #fff;
  width: 2rem;
  padding: 0;
}
.listGo {
  margin-left: 0.1rem;
  vertical-align: text-top;
  position: relative;
  top: 0.03rem;
}
.van-button {
  height: 0.6rem;
  line-height: 0.6rem;
}
.tianChong{
  width: 100%;
  height: 1.5rem;
  float: left;
}
/* 定位 */
.location{
  font-size: .4rem;
    color: #6678ff;
    height: 1.3rem;
    line-height: 1.3rem;
    margin: .2rem 0 .2rem .2rem;
    padding-left: .2rem;
}
.search{
  background: #fff!important;
}
/* 投标项目 */
.bid{
  padding: .5rem;
  box-shadow: 1px 1px 5px #e7e2e2;
}
.bidText,.bidData{
  font-size: .4rem;
  margin-bottom: .4rem;
}
.bidTwo span{
  font-size: .3rem;
  color: #969696;
  margin-right: .3rem;
  margin-left: .1rem;
}
.bidData{
  text-align: right;
}
.bidBolean{
  color: #6678ff;
  font-size: .3rem;
  text-align: right;
}
.hello >>> .van-cell__value--alone {
  text-align: center;
}
.hello >>> .van-picker__cancel {
  color: #999;
}
.hello >>> .van-picker__confirm {
  color: #000;
}

.showDress >>> .van-picker-column{
  text-align: left;
  padding-left: .2rem;
}
.hello >>> .van-search{
  width: 6rem;
}
.hello >>> .van-tab__text{
  font-size: .4rem;
  font-weight: bold;
}
.hello >>> .van-tabs__line{
  background: #6678ff;
  width: 2.6rem!important;
}
.hello >>> .van-tab--active{
  color: #6678ff;
}
.hello >>> .van-tabs__wrap{
    position: fixed;
    z-index: 10;
    width: 100%;
}
.hello >>> .van-tabs__content--animated{
      margin-top: 1rem;
}
.hello >>> .van-tabs{
  overflow: hidden;
  top: 1.4rem;
}
</style>
