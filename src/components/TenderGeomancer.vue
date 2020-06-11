<template>
  <div id="chart">
    <div class="title">
      <van-icon name="arrow-left" @click="router('/TenderDetails')" />
      <span>风水师报告</span>
    </div>
    <div class="box">
      <h4 class="reports">上传图片</h4>
      <!-- :max-size="512000" -->
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
  </div>
</template>
<script>
import store from '../../store' 
export default {
  name: "TenderGeomancer",
  data() {
    return {
      address:'https://test.sazjob.com',
      id: this.$route.query.id,
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
      show:false,    //自己上传进度时为true，其他人看为false
      //从localStorage/sessionStorage获取用户类别ID
      /* userclass_id: store.state.userclass_id, */
      //从本地内存中获取用户类别ID
      userid: '',
	  //从localStorage/sessionStorage获取token
	  /* usertoken: store.state.token, */
	  //从本地内存中获取token
	  usertoken: '',
    };
  },
  props: {},
  methods: {
    router: function(path) {
      this.$router.replace(path + "/" + this.$route.query.id);
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
        .post(this.address+"/backapi/Base/upload", formData, {headers: { Authorization: this.usertoken}})
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
            project_id: this.id,
            images: imgStr,
            des: this.progressMsg
          };
      // 判断是否输入工作进度
      if (data.des == '') {
        this.proDescError_content().innerText = '进度描述不能为空';
      } else {
         this.$axios.post(this.address+'/backapi/Fsreport/add',  this.$qs.stringify(data), {headers: {'Authorization': this.usertoken},withCredentials:true})
          .then(res => {
            console.log(res);
            this.proDescError_content().innerText = '';
          })
          this.$toast.success('提交成功');
          this.router('/TenderDetails');
      }
    },
    getProgressInfo () {
      let dataText = {
        project_id: this.id
      }
      this.$axios.post(this.address+'/customapi/Fsreport/fsreportview',dataText)
          .then(this.post).catch(err=>{
            console.log(err);
          })
    },
    post(res){
        res=res.data.data;
        console.log(res);
        //没有数据时
        if(res==undefined&&this.userid!=1){
          this.$toast.fail('风水师未提交报告');
        }else{
          this.img=res.images.split("|");
          this.proText=res.des;
        }
    }
    // getProgressInfoSucc (res) {
    //   console.log(res);
    // }
  },
  mounted () {
	if(typeof testfun === "function"){
		this.userid = read_user().userclass_id;
		this.usertoken = read_user().token;
	}else{
		this.userid = store.state.userclass_id;
		this.usertoken = store.state.token;
	}
    var errDiv = this.proDescError_content();
    errDiv.innerText = '';
    // 查看进度详情
    this.getProgressInfo();
    //判断身份
        // switch(this.userid){
        //     case 1 : this.show=true; break;
        //     case 2 : this.show=false; break;
        //     case 4 : this.show=false; break;
        //     case 5 : this.show=false; break;
        //     case 6 : this.show=false; break;
        //     case 7 : this.show=false; break;
        //     case 8 : this.show=false; break;
        //     // case 9 : this.show=false; break;
        //     // case 99 : this.show=false; break;
        // }
        if(this.userid==1){
          this.show=true;
        }else if(this.userid==2){
          this.show=false;
        }else if(this.userid==4){
          this.show=false;
        }else if(this.userid==5){
          this.show=false;
        }else if(this.userid==6){
          this.show=false;
        }else if(this.userid==7){
          this.show=false;
        }else if(this.userid==8){
          this.show=false;
        }
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
