<template>
  <div id="chart">
    <div class="proDetailHeader">
      <van-row>
        <van-col span="10">
          <van-icon
            class="backIcon"
            name="arrow-left"
            size=".6rem"
            @click="router('/TenderDetails')"
          />
          <span class="pageTitle">材料与工人分拆</span>
        </van-col>
      </van-row>
    </div>
    <div class="box">
      <div class="materialWorkSplitTitle">
        <span>材料和工作拆分</span>
        <!-- <img v-show="btnShow" class="addImg" src="../assets/images/setup.png" @click="router('/addWorkItem')"> -->
        <button v-show="btnShow" class="setUpBtn" @click="router('/addWorkItem')">新建</button>
      </div>
      <van-row>
        <van-col class="volItem" span="6">工作名</van-col>
        <van-col class="volItem" span="5">材料费</van-col>
        <van-col class="volItem" span="2">工时</van-col>
        <van-col class="volItem" span="5">工费</van-col>
        <van-col class="volItem" span="3">修改</van-col>
        <van-col class="volItem" span="3">删除</van-col>
      </van-row>
      <!-- 内容： -->
      <van-row
        class="materialWorkSplitContent"
        v-for="item in materialWorkList"
        :key="item.id"
      >
        <van-col class="volItem" span="6">{{ item.job_name }}</van-col>
        <van-col class="volItem" span="5">{{ item.sum }}</van-col>
        <van-col class="volItem" span="2">{{ item.job_time }}</van-col>
        <van-col class="volItem" span="5">{{ item.job_money }}</van-col>
        <van-col class="volItem" span="3">
          <!-- <router-link tag="i" :to="'/editWorkItem/' + item.project_id + '/' + item.id"> -->
            <!-- <van-icon v-show="btnShow" size=".5rem" name="edit"/> -->
            <van-button :disabled="disabled" class="theBtn" icon="edit" :to="'/editWorkItem/' + item.project_id + '/' + item.id"></van-button>   
          <!-- </router-link> -->
        </van-col>
        <van-col class="volItem" span="3">
          <!-- <van-icon disabled v-show="btnShow" size=".5rem" name="delete" @click="deleteWorkItem(item.id)"/> -->
          <van-button :disabled="disabled" class="theBtn" icon="delete" @click="deleteWorkItem(item.id)"></van-button>   
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import store from './../../store'
export default {
  name: "WorkerMateral",
  data() {
    return {
      id: this.$route.params.project_id,
      userclass_id: '',
      token: '',
      btnShow: true,
      disabled: true,
      //工作和材料
      materialWorkList: []
    };
  },
  methods: {
    // 传项目id，用于跳转页面
    router(path) {
      this.$router.replace(path + "/" + this.id);
    },
    // 工作项列表数据
    getFenChaiList () {
      let fenChaiData = {
        project_id: this.id
      }
      this.$axios.post('https://test.sazjob.com/customapi/Fenchai/clist', fenChaiData)
          .then(res => {
            console.log(res);
            let data = res.data;
            if (data.status == 201) {
              this.$toast.fail('设计师未提交工作项！');
            } else {
              this.materialWorkList = data.data;
            }
          })
    },
    // 删除工作项
    deleteWorkItem (workId) {
      let data = {
        id: workId,
        project_id: this.id
      };
      this.$dialog.confirm({
        message: '确认删除此工作项？',
      })
      .then(() => {
        this.$axios.post('https://test.sazjob.com/customapi/Fenchai/delete', data).then(res => {
        console.log(res);
        this.getFenChaiList();
      })
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    console.log(`设计师材料与工人分拆页面项目id: ${this.id}`);
	  if(typeof testfun === "function"){
	      this.userclass_id = read_user().userclass_id;
	      this.token = read_user().token;
    }else{
    this.userclass_id = store.state.userclass_id;
    this.token = store.state.token;
    }
    this.getFenChaiList();
    // 判断身份，只有设计师可以添加、修改、删除
    this.userclass_id == 2 ? this.btnShow = true : this.btnShow = false;
    this.userclass_id == 2 ? this.disabled = false : this.disabled = true;
  }
};
</script>
<style scoped>
.proDetailHeader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  line-height: 1rem;
  padding: 0.65rem 0.3rem .15rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
#splitDetails >>> .backIcon {
  margin-left: -0.3rem;
  vertical-align: middle;
  color: #000;
  height: 0.5rem;
}
.pageTitle {
  font-size: 0.45rem;
  vertical-align: middle;
}
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
  margin: 2rem 0.4rem 0 0.4rem;
}
.reports {
  font-size: 0.38rem;
  margin-bottom: 0.6rem;
}
.progressDesTitle {
  font-size: 0.38rem;
  margin: 0.7rem 0 .4rem 0;
}
.progressDes {
  width: 99%;
  margin: 0.15rem auto 0 auto;
  border: 0.01rem solid #c3c3c3;
}
/* 材料和工作拆分 */
.materialWorkSplitTitle {
  font-size: .38rem;
  margin: 0.7rem 0 .4rem 0;
}
.setUpBtn {
  float: right;
  width: 1.1rem;
  height: .6rem;
  color: #fff;
  background-color: #6678ff;
  font-size: .3rem;
  border-radius: .2rem;
}
.addImg {
  float: right;
  width: .5rem;
}
.materialWorkSplitContent {
  margin-top: 0.2rem;
}
.volItem {
  text-align: center;
  margin-top: 0.2rem;
}
/* 修改删除按钮 */
.theBtn {
  height: .0;
  margin-top: -1.2rem;
  border: 0;
}
/* 提交按钮 */
.btnTrue {
  text-align: center;
  display: block;
  width: 7.14rem;
  height: 0.83rem;
  line-height: .83rem;
  margin: 0.6rem auto;
  border-radius: 0.41rem;
  font-size: 0.48rem;
  color: #fff;
  background-color: #6678ff;
}
.proImg {
  display: inline-block;
  width: 2.6rem;
  height: 2rem;
  margin: 0.2rem;
}
</style>
