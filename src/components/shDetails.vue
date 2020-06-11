<template>
    <div id="report">
        <div class="title">
            <van-icon name="arrow-left" @click="router('/deliveryRecord')"/>
            <span>送货详情</span>
        </div>
        <div class="box">
            <h2 class="h2">送货报告</h2>
            <div class="text" v-html="text"></div>
        </div>
        <div class="delivery">
            <h4 class="h4">送货确认</h4> 
            <ul class="van-row-first" gutter="20">
                <li  v-for="(attr,index) in list" :key="index" ref="btn">
                    <img class="myLogo" src="" alt="">
                    <div class="occupation">{{attr.occupation}}</div>
                    <van-button style="visibility: hidden;" class="btn" type="default">{{attr.btn}}</van-button>
                </li>
            </ul>
        </div>
        <!-- <div class="btnTrue">提交</div> -->
     </div>
</template>
<script>
import store from '../../store'
export default {
    name:'shDetails',
    data(){
        return{
           message:'',
           text:'',
           usertoken:'',
           userid:'',
           project_id:'',
           list:[
               {
                   myLogo:'',
                   occupation:'业主',
                   btn:'确认送货'
               },
               {
                   myLogo:'',
                   occupation:'风水师',
                   btn:'确认送货'
               },
               {
                   myLogo:'',
                   occupation:'设计师',
                   btn:'确认送货'
               },
               {
                   myLogo:'',
                   occupation:'监理',
                   btn:'确认送货'
               },
               {
                   myLogo:'',
                   occupation:'工人',
                   btn:'确认送货'
               },
               {
                   myLogo:'',
                   occupation:'供应商',
                   btn:'确认送货'
               },
           ],
           address:'https://test.sazjob.com'
        }
    },
    methods:{
        router(path) {
            var abc=this.$route.path;
            var d=abc.split('/')[2];
            this.$router.push({path:path,query:{project_id:d}});
            //   alert(this.$route.query.project_id);
        },
        info(){
            let handData={
                id:this.$route.query.id,
                project_id:this.$route.query.project_id,
                // juese:this.userid
            }
            this.$axios.post(this.address+'/customapi/Songhuocheck/songhuodes',handData)
            .then(this.hand).catch(err=>{
                console.log(`${err}`);
            })
        },
        hand(res){
            res=res.data.data;
            this.text=res[0].des;
            this.project_id=res[0].project_id;
            console.log(res)
        },
        yzEnter(){
            let data = {
                id:this.$route.query.id,
                project_id:this.$route.query.project_id,
                juese:this.userid
            }
            this.$axios.post(this.address+'/customapi/Songhuocheck/yezhucheck',data,{headers: {'Authorization': this.usertoken},withCredentials:true})
            .then(msg=>{
                console.log(msg);
            }).catch(err=>{
                console.log(`${err}`);
            })
        },
        fsEnter(){
            let data = {
                id:this.$route.query.id,
                project_id:this.$route.query.project_id,
                juese:this.userid
            }
            this.$axios.post(this.address+'/customapi/Songhuocheck/othercheck',data,{headers: {'Authorization': this.usertoken},withCredentials:true})
            .then(msg=>{
                console.log(msg);
            }).catch(err=>{
                console.log(`${err}`);
            })
        },
        sjEnter(){
            let data = {
                schedule_id:this.$route.query.schedule_id,	//主键ID (必填)

                project_id:this.project_id //项目id
            }
            this.$axios.post(this.address+'/customapi/Schedule/designercheck',data,{headers: {'Authorization': this.usertoken},withCredentials:true})
            .then(msg=>{
                console.log(msg);
            }).catch(err=>{
                console.log(`${err}`);
            })
        },
        jlEnter(){
            let data = {
                schedule_id:this.$route.query.schedule_id,	//主键ID (必填)

                project_id:this.project_id //项目id
            }
            this.$axios.post(this.address+'/customapi/Schedule/supervisorcheck',data,{headers: {'Authorization': this.usertoken},withCredentials:true})
            .then(msg=>{
                console.log(msg);
            }).catch(err=>{
                console.log(`${err}`);
            })
        }
    },
    mounted(){
        if(typeof read_user === "function"){
            this.userid = read_user().userclass_id;
            this.token = read_user().token;
        }else{
            this.city = '天津市';
            this.userid = store.state.userclass_id;
            this.token = store.state.token;
        }
        var that=this;
        that.info();
		if(this.userid==1){
			that.$refs.btn[1].lastChild.setAttribute("style","visibility: visible;")
		}else if(this.userid==2){
			that.$refs.btn[2].lastChild.setAttribute("style","visibility: visible;")
		}else if(this.userid==3){
			that.$refs.btn[0].lastChild.setAttribute("style","visibility: visible;")
		}else if(this.userid==4){
			that.$refs.btn[3].lastChild.setAttribute("style","visibility: visible;")
		}else if(this.userid==5){
			that.$refs.btn[5].lastChild.setAttribute("style","visibility: visible;")
		}else if(this.userid==6||this.userid==7||this.userid==8){
			that.$refs.btn[4].lastChild.setAttribute("style","visibility: visible;")
		}
        // console.log(that.$refs.btn[0].lastChild);
        that.$refs.btn[0].lastChild.addEventListener('click',function(){
            that.yzEnter();
            that.$toast.success('已确认');
        });
        that.$refs.btn[1].lastChild.addEventListener('click',function(){
            that.fsEnter();
            that.$toast.success('已确认');
        });
        that.$refs.btn[2].lastChild.addEventListener('click',function(){
            that.fsEnter();
            that.$toast.success('已确认');
        });
        that.$refs.btn[3].lastChild.addEventListener('click',function(){
            that.fsEnter();
            that.$toast.success('已确认');
        });
        that.$refs.btn[4].lastChild.addEventListener('click',function(){
            that.fsEnter();
            that.$toast.success('已确认');
        });
        that.$refs.btn[5].lastChild.addEventListener('click',function(){
            that.fsEnter();
            that.$toast.success('已确认');
        });
    }
}
</script>
<style scoped>
    .van-row-first{
        list-style: none;
        white-space: nowrap;
        overflow-x: scroll;
    }
    .van-row-first li{
       position: relative;
        display: inline-block;
        width: 28%;
    }
    #report >>> .van-icon{
        vertical-align: middle;
    }
    #report{
        background: #F2F2F2;
    }
    #app {
        padding-bottom: 1.3rem;
    }
    .title{
        padding: .4rem;
        font-size: .5rem;
        font-weight: bold;
        position: fixed;
        top: 0;
        width: 100%;
        background: #F2F2F2;
    }
    .box{
        margin: 0 .4rem;
        width: 9.2rem;
        height: 10rem;
        background: #fff;
        overflow: hidden;
        margin-top: 1.2rem;
        overflow: scroll;
    }
    .h2{
        color: #333;
        font-size: .45rem;
        text-align: center;
        margin-top: 1rem;
    }
    .reports{
        font-size: .3rem;
        color: #666;
    }

    /* 下面确认 */
    .delivery{
        margin: 0 .4rem;
        width: 9.2rem;
        height: 4.85rem;
        background: #fff;
        overflow: hidden;
        margin-top: .4rem;
    }
    .h4{
        margin: .5rem .14rem;
        font-size: .36rem;
        color: #444;
    }
    .myLogo{
        display: block;
        width:1.29rem;
        height:1.29rem;
        background:rgba(229,229,229,1);
        border-radius:50%;
        margin: 0 auto;
    }
    .occupation{
        font-size:0.34rem;
        color: #444;
        text-align: center;
        margin: .3rem 0;
    }
    .btn{
        display: block;
        margin: 0 auto;
        font-size: .24rem;
        color: #fff;
        width: 1.7rem;
        height: 0.6rem;
        background:rgba(102,120,255,1);
        border-radius: .5rem;
        padding: 0;
        line-height: .44rem;
        text-align:center;
    }
    .text{
        width: 90%;
        margin: 0 auto;
        padding: .6rem 0;
        font-size: .4rem;
        line-height: .5rem;
    }
    /* 提交按钮 */
    .btnTrue{
        width: 7.14rem;
        height: .83rem;
        line-height: .8rem;
        text-align: center;
        border-radius: .4rem;
        border: 0;
        color: #fff;
        background: #6678FF;
        font-size: .4rem;
        position: relative;
        top: -1.2rem;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    /* 填充 */
    .tianChong{
        width: 100%;
        height: 1.5rem;
        float: left;
    }
</style>