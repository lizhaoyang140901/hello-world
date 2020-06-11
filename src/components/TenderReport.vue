<template>
  <div id="chart">
    <div class="title">
      <van-icon name="arrow-left" @click="router('/workerRecord')" />
      <span>工人进度报告</span>
    </div>
    <div class="box">
      <h4 class="reports">上传图片</h4>
      <div class="picWrapper">
        <van-uploader 
          v-show='show'
          v-model="fileImgList" 
          :after-read="afterRead" 
          :max-count="9"
          :multiple="true"
          @oversize="overSize"
        />
        <!-- //显示图片 -->
        <img class="proImg" v-show="!show" v-for="pic in img" :src="address+pic" alt="" :key="pic.index">
      </div>
      <div class="progressDesTitle">进度说明</div>
      <van-field 
        v-show='show'
        class="progressDes"
        v-model="progressMsg"
        rows="3"
        autosize
        type="textarea"
        maxlength="180"
        placeholder="请输入您的进度说明，内容不能为空"
        error-message="进度说明为空的错误提示信息"
        show-word-limit
      />
      
      <div class="proText" v-show="!show">{{proText}}</div>
    </div>
    <div v-show='show' class="btnTrue" @click="setUpProgress">提交</div>

    <div class="tianChong" value="王强"></div>

  </div>
</template>
<script>
import store from "../../store"
export default {
  name: "TenderReport",
  data() {
    return {
      address:'https://test.sazjob.com',
    //   id: this.$route.query.id,
      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" }
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true }
      ],
      fileImgList: [],
      progressImgList: [],
      progressMsg: '',
      index: 0,
      img:[],
      proText:'',
      show:true,    //自己上传进度时为true，其他人看为false
    //   userclass_id:this.$store.state.userclass_id
      city:'',
      userid:'',
      token:''
    };
  },
  props: {},
  methods: {
    router: function(path) {
       var abc=this.$route.path;
          var d=abc.split('/')[2];
          this.$router.push({path:path,query:{project_id:d}});
        //   alert(this.$route.query.project_id);
    },
    afterRead(file) {

      // 删除上传错误的户型图逻辑
      let deleteIcconIndex = this.index,
        progressImgList = this.progressImgList,
        deleteIcon = document.getElementsByClassName("picWrapper")[0].getElementsByTagName("i")[deleteIcconIndex];
      deleteIcon.onclick = () => {
        // console.log(deleteIcconIndex);
        progressImgList.splice(deleteIcconIndex, 1);
        this.progressImgList = progressImgList;
        console.log(progressImgList);
        this.index--;
      };
      this.index++;
      // 创建form对象，以表单形式将图片上传至服务器
      let formData = new FormData(); // 创建form对象
      formData.append("pic", file.file); // 通过append向form对象添加数据
      // console.log(formData.get("pic")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      this.$axios
        .post(this.address+"/backapi/Base/upload", formData, {headers: { Authorization: this.token}})
        .then(res => {
          let data = res.data;
          if ((data.status = 200)) {
            this.progressImgList.push(data.data);
            console.log(this.progressImgList);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(`当前错误信息：${err.message}`);
        });
    },
    // 文件大小超出限制时触发
    overSize() {
      this.$toast({
        message: "图片大小不能超过500k",
        icon: "close"
      });
    },
    // 得到错误信息提示的Dom
    proDescError_content() {
      var errDiv = document.getElementsByClassName("van-field__error-message")[0];
      return errDiv;
    },
    // 上传数据
    setUpProgress () {
        
      let imgArr = this.progressImgList,
          imgStr = imgArr.join("|"),
          data = {
            project_id:this.$route.path.split('/')[2],
            worker_id:'',
            work_schedule:this.progressMsg,//工作进度
            work_photo:imgStr,	//进度相片
            worker_type_id:'' //发布人角色
          };
      // 判断是否输入工作进度
      if (data.work_schedule == '') {
        this.proDescError_content().innerText = '进度描述不能为空';
      } else {
         this.$axios.post(this.address+'/backapi/Schedule/add',  this.$qs.stringify(data), {headers: {'Authorization': this.token},withCredentials:true})
          .then(res => {
            console.log(res);
            // alert(project_id)
            this.proDescError_content().innerText = '';
          });
          this.$toast.success('提交成功');
          // this.router('/workerRecord')
      }
    },
    getProgressInfo () {
      let dataText = {
        schedule_id: '158'
      }
      this.$axios.post(this.address+'/backapi/Schedule/view',dataText)
          .then(this.post).catch(err=>{
            console.log(err);
          })
    },
    post(res){
        res=res.data.data;
        // this.img=res.images.split("|");
        // this.proText=res.des;
        console.log(res);
    }
    // getProgressInfoSucc (res) {
    //   console.log(res);
    // }
  },
  mounted () {
              //获取userclass_id
        if(typeof read_user === "function"){
            this.userid = read_user().userclass_id;
            this.token = read_user().token;
        }else{
            this.userid = store.state.userclass_id;
            this.token = store.state.token;
        }

    var errDiv = this.proDescError_content();
    errDiv.innerText = '';
    // 查看进度详情
    this.getProgressInfo();
    //判断身份
    // console.log(this.userid);
    //     switch(this.userid){
    //         case 1 : this.show=false; break;
    //         case 2 : this.show=false; break;
    //         case 3 : this.show=false; break;
    //         case 4 : this.show=false; break;
    //         case 5 : this.show=false; break;
    //         case 6 : this.show=true; break;
    //         case 7 : this.show=true; break;
    //         case 8 : this.show=true; break;
    //         case 9 : this.show=false; break;
    //         // case 99 : this.show=false; break;
    //         // default : this.show=false; break;
    //     }
        
        
  }
};
</script>
<style scoped>
#chart >>> .van-icon {
  vertical-align: middle;
}
#chart >>> .van-icon-photograph::before {
  content: "\F0A2" !important;
}
#chart >>> .van-uploader__upload-icon {
  font-size: 1rem;
}
.box {
  margin: 0 0.4rem;
}
.reports {
  font-size: 0.38rem;
  color: #666;
  margin-bottom: 0.6rem;
}
.title {
  padding: 0.4rem;
  font-size: 0.5rem;
  font-weight: bold;
}
.progressDesTitle {
  font-size: 0.38rem;
  margin-top: 0.3rem;
}
.progressDes {
  width: 99%;
  margin: 0.15rem auto 0 auto;
  border: 0.01rem solid #c3c3c3;
}
/* 提交按钮 */
.btnTrue {
  width: 7.14rem;
  height: 0.83rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 0.4rem;
  border: 0;
  color: #fff;
  background: #6678ff;
  font-size: 0.4rem;
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*  */
.proText{
    margin: 0.15rem auto 0 auto;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
.proImg{
    display: inline-block;
    width: 2.6rem;
    height: 2rem;
    margin: .2rem;
}
</style>
