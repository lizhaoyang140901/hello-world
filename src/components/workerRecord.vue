<template>
    <div id="record">
        
        <div class="title">
            <van-icon name="arrow-left" @click="router('/TenderDetails')"/>
            <span>工人进度报告</span>
            <div class="right" v-show="show" @click="router('/TenderReport')">
              发布
                <!-- <b class="picAdd iconfont">&#xe624;</b> -->
                <!-- <span class="newText">新建工作报告</span> -->
            </div>
        </div>
        <van-row class="bid" v-for="bid in report" :key='bid.index' @click="router('/DeliveryDetails',bid.schedule_id)">
          <van-col span="24">
            <div class="bidText van-ellipsis">{{bid.work_schedule}} <span style="color:#6678ff;float:right;" @click="router('/TenderReportNew',bid.schedule_id)" v-show="show">修改</span> </div>
            <div class="bidTwo">
              <span>{{new Date(bid.add_time*1000).getFullYear()+'年'+Number(new Date(bid.add_time*1000).getMonth()+1)+'月'+new Date(bid.add_time*1000).getDate()+'日'+new Date(bid.add_time*1000).getHours()+':'+new Date(bid.add_time*1000).getMinutes()}}</span>
            </div>
          </van-col>
          
        </van-row>
        
        <div class="tianChong" value="王强"></div>

    </div>
</template>
<script>
import store from '../../store'
export default {
    name:'workerRecord',
    data(){
        return{
             // 投标项目列表
            bidList:[
                {
                bidText:'20200420工作报告',
                bidData:'2020年4月20日23：21',
                bidBolean:'已投标'
                },
                {
                bidText:'XXX送货记录',
                bidData:'2020年4月20日23：21',
                bidBolean:'已投标'
                },
                {
                bidText:'XXX送货记录',
                bidData:'2020年4月20日23：21',
                bidBolean:'已投标'
                },
                {
                bidText:'XXX送货记录',
                bidData:'2020年4月20日23：21',
                bidBolean:'已投标'
                },
                {
                bidText:'XXX送货记录',
                bidData:'2020年4月20日23：21',
                bidBolean:'已投标'
                },
                {
                bidText:'XXX送货记录',
                bidData:'2020年4月20日23：21',
                bidBolean:'已投标'
                }
            ],
            address:'https://test.sazjob.com',
            report:[],
            userid:'',
            show:false,
        }
    },
    props: {},
    methods:{
        router: function(path,schedule_id) {
          var abc=this.$route.path;
          var d=abc.split('/')[2];
          this.$router.push({path:path+ "/" + this.$route.query.project_id,query:{schedule_id:schedule_id,project_id:d}});
          // this.$router.replace(path + "/" + this.$route.query.project_id);
          
        },
        info(){
          this.$axios.get(this.address+'/backapi/Schedule/sidjidlist?project_id='+this.$route.query.project_id)
          .then(this.hand).catch(err=>{
              console.log(`${err}`);
          })
        },
        hand(res){
          res=res.data.data.list;
          this.report=res;
          // this.schedule_id=res[0].schedule_id;
          //没有数据
          if(this.report.length==0){
            this.$toast.fail('暂无进度报告');
          }
          console.log(res);
          // console.log(res[0].schedule_id)
        }
    },
    mounted() {
      if(typeof read_user === "function"){
          this.userid = read_user().userclass_id;
          this.token = read_user().token;
      }else{
          this.city = '天津市';
          this.userid = store.state.userclass_id;
          this.token = store.state.token;
      }
      
      this.info();
      //判断
      // switch(this.userid){
      //       case 1 : this.show=false; break;
      //       case 2 : this.show=false; break;
      //       case 4 : this.show=false; break;
      //       case 5 : this.show=false; break;
      //       case 6 : this.show=true; break;
      //       case 7 : this.show=true; break;
      //       case 8 : this.show=true; break;
      //       case 9 : this.show=false; break;
      //   }
        if(this.userid==6||this.userid==7||this.userid==8){
          this.show=true;
        }
    },
}
</script>
<style scoped>
    .title{
        padding: .4rem;
        font-size: .5rem;
        font-weight: bold;
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
  color: #222;
  margin-right: .3rem;
  margin-left: .1rem;
  float: right;
}
.bidData{
  text-align: right;
}
.bidBolean{
  color: #6678ff;
  font-size: .3rem;
  text-align: right;
}
/* 填充 */
.tianChong{
  width: 100%;
  height: 1.5rem;
  float: left;
}
/* 右侧加号 */
.picAdd{
    display: block;
    margin: 0 auto;
    width: .8rem;
    height: .8rem;
    /* background: url('../assets/images/minus.png'); */
    background-size: cover;
    margin-bottom: .1rem;
    color: #6678ff;
    font-size: .8rem;
}
.newText{
    color: #6678FF;
    font-size: 0.24rem;
    text-align: center;
}
.right{
    float: right;
    position: fixed;
    width: 1.2rem;
    height: .65rem;
    top: .25rem;
    right: .35rem;
    color: #fff;
    background-color: #6678ff;
    font-size: .4rem;
    border-radius: .2rem;
    /* padding: 0.2rem; */
    text-align: center;
    padding-top: .2rem;
}
#record >>> .van-icon{
    vertical-align: middle;
}
</style>