<template>
  <div class="hello">
    <div class="nav">
      <van-nav-bar left-arrow @click-left="routerOut">
        <template #right>
          <van-icon class="editBtn" name="edit" v-show="editBtnShow" @click="routerDesign('/editProItem')"/>
          <van-icon class="editBtn" name="star-o" />
          <span class="iconfont iconshare share"></span>
        </template>
      </van-nav-bar>
    </div>
    <!-- banner -->
    <div class="action">
      <div class="acImg">
        <img :src="address + banner"/>
      </div>
    </div>
    <!-- 主体 -->
    <div class="modern">
      <h4 class="title">{{ style + house }}</h4>
      <h5 class="modernList">
        <span>{{ house }}</span
        >|<span>{{ style }}</span
        >|<span>{{ acreage }}m²</span>|<span>{{ city }}</span>
      </h5>
      <div class="popup">
        <van-icon name="location" class="iconPop" />
        <div class="van-ellipsis">{{ area_name }}</div>
        <!-- <van-icon name="arrow" /> -->
      </div>
      <div class="popup">
        <van-icon name="phone" class="iconPop" />
        <div class="van-ellipsis">{{ phone }}</div>
        <!-- <van-icon name="arrow" /> -->
      </div>
      <div class="title">方案说明</div>
      <span class="modText van-multi-ellipsis--l3">
        {{ content }}
      </span>
    </div>
    <!-- 户型图 -->
    <div class="picture">
      <h4 class="title huxing">户型图</h4>
      <div class="picIndex">
        <div class="picBox">
          <div class="picList" v-for="one in picList" :key="one.id">
            <img :src="address + one.images" alt="" @click="swiper($event)" />
          </div>
        </div>
        <div class="tendering">
          <h4 class="title">招标项目</h4>

          <ul class="divisionWrapper">
            <li
              class="divisionItem flexBox"
              v-for="item in proStaffList"
              :key="item.id"
               ref="tou"
            >
              <span class="feng">{{ item.staffName }}</span>
              <van-button style="display: none;" class="flexBtn"
                >立即投标</van-button
              >
              <div class="three">
                <span
                  class="flexText"
                  v-for="ranksData in item.lv"
                  :key="ranksData.id"
                  >已有{{ ranksData.ranks }}投标</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="report">
        <div class="row">
          <div class="title">
            风水师报告
            <van-icon name="arrow" />
            <van-button
              class="schedule"
              type="info"
              @click="router('/TenderGeomancer')"
              >查看进度</van-button
            >
          </div>
          <div class="pic">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
        <div class="row">
          <div class="title">
            设计师设计图
            <van-icon name="arrow" />
            <van-button
              class="schedule"
              type="info"
              @click="routerDesign('/TenderStylist')"
              >查看进度</van-button
            >
          </div>
          <div class="pic">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>

        <div class="row">
          <div class="title">
            材料与工人分拆
            <van-icon name="arrow" />
            <van-button
              class="schedule"
              type="info"
              @click="routerDesign('/workerMateral')"
              >查看进度</van-button
            >
          </div>
          <div class="pic">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>

        <div class="row">
          <div class="title">
            供应商送货记录
            <van-icon name="arrow" />
            <van-button
              class="schedule"
              type="info"
              @click="router_1('/deliveryRecord')"
              >查看进度</van-button
            >
          </div>
        </div>

        <div class="row">
          <div class="title">
            工人进度报告
            <van-icon name="arrow" />
            <van-button
              class="schedule"
              type="info"
              @click="router_1('/workerRecord')"
              >查看进度</van-button
            >
          </div>
          <div class="pic">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import store from "../../store";
import { ImagePreview } from "vant";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "TenderDetails",
  data() {
    return {
      editBtnShow: true,
      address: "https://test.sazjob.com",
      area_name: "", //小区名称
      banner: "",
      arr: [],
      handList: [], //风水
      handListDes: [], //设计
      handListSup: [], //监理
      arr: [
        "",
        "初级风水师",
        "中级风水师",
        "高级风水师",
        "精英风水师",
        "未知等级",
      ],
      arrDes: [
        "",
        "初级设计师",
        "中级设计师",
        "高级设计师",
        "精英设计师",
        "未知等级",
      ],
      arrSup: ["", "初级监理", "中级监理", "高级监理", "精英监理", "未知等级"],
      arrLier: [
        "",
        "初级供应商",
        "中级供应商",
        "高级供应商",
        "精英供应商",
        "未知等级",
      ],
      house: "", //户型
      house_type: ["一居室", "二居室", "三居室", "四居室", "公寓", "复式", "别墅", "小户型"],
      style: "", //装修风格
      decorate_style: [
        "现代",
        "美式",
        "简约",
        "简欧",
        "欧式",
        "宜家",
        "中式",
        "田园",
        "日式",
        "混搭",
        "北欧",
        "地中海",
        "新古典",
        "东南亚"
      ],
      acreage: "", //面积
      city: "",
      content: "", //方案说明
      phone: "",
      show: false,
      userid: "", //用户id
      usertoken: "",
      id: this.$route.params.project_id,
      picList: [
        //九张缩略图
      ],
      myProProgress: {
        message: "",
        uploadFileList: [],
      },
      proStaffList: [
        {
          staffName: "风水师",
          flexBtn: "立即投标",
          // lv:store.state.id,
        },
        {
          staffName: "设计师",
          staffImg: "立即投标",
        },
        {
          staffName: "监理",
          staffImg: "立即投标",
        },
        {
          staffName: "施工队",
          staffImg: "立即投标",
        },
        {
          staffName: "供应商",
          staffImg: "立即投标",
        },
      ],

      jlRes: {
        //监理上传信息
        user_info_id: "0",
        project_id: this.$route.params.project_id,
        is_tender: "0",
        status: "0",
      },
      gyRes: {
        //供应商上传信息
        user_info_id: "0",
        project_id: this.$route.params.project_id,
        is_tender: "0",
        status: "0",
      },
    };
  },
  props: {},
  methods: {
    router(path) {
      var abc = this.$route.path;
      var d = abc.split("/")[2];
      this.$router.push({ path: path, query: { id: d } });
    },
    router_1(path) {
      var abc = this.$route.path;
      var d = abc.split("/")[2];
      this.$router.push({ path: path, query: { project_id: d } });
    },
    //尹帅
    routerDesign(path) {
      this.$router.replace(path + "/" + this.id);
    },
    routerOut() {
      if (this.userid == 3) {
        this.$router.push({ path: "/project" });
      } else {
        this.$router.push({ path: "/TenderingIndex" });
      }
    },
    swiper(event) {
      //图片预览
      var el = event.currentTarget; //获取当前被点击的元素
      var img = [];
      for (var i = 0; i < this.arr.length; i++) {
        img[i] = this.address + this.arr[i];
      }
      //下标
      var elFirst = img.indexOf(el.src);
      ImagePreview({
        images: img,
        startPosition: elFirst,
      });
    },
    info() {
      ////////////////修改
      //风水师已有投标
      let fsdata = {
        project_id: this.$route.params.project_id,
        page: 1,
        juese: 1,
      };
      this.$axios
        .post(
          this.address + "/customapi/Yitoubiao/tbjueselist",
          this.$qs.stringify(fsdata),
          {
            headers: { Authorization: this.usertoken },
            withCredentials: true,
          }
        )
        .then(this.hand)
        .catch((err) => {
          console.log(`${err}`);
        });
      //设计师已有投标
      let sjdata = {
        project_id: this.$route.params.project_id,
        page: 1,
        juese: 2,
      };
      this.$axios
        .post(
          this.address + "/customapi/Yitoubiao/tbjueselist",
          this.$qs.stringify(sjdata),
          {
            headers: { Authorization: this.usertoken },
            withCredentials: true,
          }
        )
        .then(this.handDes)
        .catch((err) => {
          console.log(`${err}`);
        });
      //监理已有投标
      let jldata = {
        project_id: this.$route.params.project_id,
        page: 1,
        juese: 4,
      };
      this.$axios
        .post(
          this.address + "/customapi/Yitoubiao/tbjueselist",
          this.$qs.stringify(jldata),
          {
            headers: { Authorization: this.usertoken },
            withCredentials: true,
          }
        )
        .then(this.handSup)
        .catch((err) => {
          console.log(`${err}`);
        });
		//工人已有投标
		let grdata = {
		  project_id: this.$route.params.project_id,
		};
		this.$axios
		  .post(this.address + "/customapi/Yitoubiao/workerlist", grdata)
		  .then(this.handSup)
		  .catch((err) => {
		    console.log(`${err}`);
		  });
      //供应商已有投标
      let gydata = {
        project_id: this.$route.params.project_id,
        page: 1,
        juese: 5,
      };
      this.$axios
        .post(
          this.address + "/customapi/Yitoubiao/tbjueselist",
          this.$qs.stringify(gydata),
          {
            headers: { Authorization: this.usertoken },
            withCredentials: true,
          }
        )
        .then(this.handLier)
        .catch((err) => {
          console.log(`${err}`);
        });
      // /backapi/Project/view
      this.$axios
        .get(
          this.address +
            "/backapi/Project/view?project_id=" +
            this.$route.params.project_id
        )
        .then(this.picListFun)
        .catch((err) => {
          console.log(`${err}`);
        });
    },
    hand(res) {
      //风水师
      res = res.data.data.slice(0, 3);
      this.handList = res;

      this.$set(this.proStaffList[0], "lv", this.handList);

      // console.log(this.proStaffList);

      for (var i = 0; i <= this.handList.length; i++) {
        //   if(this.handList[i].fs_tender_id){
        //       this.show=true;
        //   }
        this.handList[i].ranks = this.arr[this.handList[i].ranks];
      }
      console.log(res);
    },
    handDes(res) {
      //设计师
      res = res.data;
      this.handListDes = res.data.slice(0, 3);

      this.$set(this.proStaffList[1], "lv", this.handListDes);

      // console.log(this.handListDes);

      for (var i = 0; i <= this.handListDes.length; i++) {
        this.handListDes[i].ranks = this.arrDes[this.handListDes[i].ranks];
      }
    },
    handSup(res) {
      //监理
      res = res.data;
      this.handListSup = res.data.slice(0, 3);

      this.$set(this.proStaffList[2], "lv", this.handListSup);

      // console.log(this.handListSup);

      for (var i = 0; i <= this.handListSup.length; i++) {
        this.handListSup[i].ranks = this.arrSup[this.handListSup[i].ranks];
      }
    },
	handSup(res) {
	  //工人
	  res = res.data.data;
	  // var num = res.data.num;
	  // this.handListSup = res;
	
	  this.$set(this.proStaffList[3], "lv", {0:{ranks:res.num+'人'}});
	
	  // // console.log(this.handListSup);
	
	  // for (var i = 0; i <= this.handListSup.length; i++) {
	    // this.handListSup.ranks = this.handListSup.num;
    // }
    // console.log(res);
    console.log(this.proStaffList[3].lv)
	},
    handLier(res) {
      //供应商
      res = res.data;
      this.handListLier = res.data.slice(0, 3);

      this.$set(this.proStaffList[4], "lv", this.handListLier);

      // console.log(this.handListLier);

      for (var i = 0; i <= this.handListLier.length; i++) {
        this.handListLier[i].ranks = this.arrLier[this.handListLier[i].ranks];
      }
    },
    //获取数据
    picListFun(res) {
      res = res.data.data;
      this.area_name = res.area_name;

      this.arr = res.images.split("|");
      for (var i = 0; i < this.arr.length; i++) {
        this.picList[i] = { images: this.arr[i] };
      }
      this.banner = this.picList[0].images;

      this.house = this.house_type[res.house_type]; //户型
      this.style = this.decorate_style[res.decorate_style]; //装修风格
      this.acreage = res.acreage; //面积
      this.phone = res.phone; //手机号
      this.content = res.content; //方案说明
      this.city = res.city;
    },
    get() {
      if (typeof read_user === "function") {
        this.userid = read_user().userclass_id;
        this.usertoken = read_user().token;
      } else {
        this.userid = store.state.userclass_id;
        this.usertoken = store.state.token;
      }
    },
    //风水师投标
    fsTender() {
      this.get();
      let fsRes = {
        //风水师上传信息
        // user_info_id:'0',
        juese: this.userid,
        project_id: this.$route.params.project_id,
        // is_tender:'0',
        // status:null,
        // remark:'0',
        userclass_id: 1,
      };
      var that=this;
      this.$axios.post(this.address + "/customapi/Yitoubiao/toubiao", fsRes, {
          headers: { Authorization: this.usertoken},
          withCredentials: true,
        })
        .then(function (res) {
          console.log(res);
          // console.log(res.data.msg);
          if(res.data.msg == "已投标"){
            that.$toast.fail("您已投标，请勿重复投标");
          }else{
            that.$router.replace("/TenderingIndex");
          }
        })
        .catch(function (err) {
          console.log(`${err}`);
        });
    },
    //设计师投标
    sjTender() {
      this.get();
      let sjRes = {
        //设计师上传信息
        juese: this.userid,
        project_id: this.$route.params.project_id,
        // is_tender:'0',
        // status:null,
        // remark:'0',
        userclass_id: 1,
      };
      var that=this;
      this.$axios
        .post(this.address + "/customapi/Yitoubiao/toubiao", sjRes, {
          headers: { Authorization: this.usertoken },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if(res.data.msg=="已投标"){
            that.$toast.fail("您已投标，请勿重复投标");
          }else{
            that.$router.replace("/TenderingIndex");
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    },
    //监理投标
    jlTender() {
      this.get();
      let jlRes = {
        //设计师上传信息
        juese: this.userid,
        project_id: this.$route.params.project_id,
        // is_tender:'0',
        // status:null,
        // remark:'0',
        userclass_id: 1,
      };
      var that=this;
      this.$axios
        .post(this.address + "/customapi/Yitoubiao/toubiao", jlRes, {
          headers: { Authorization: this.usertoken },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if(res.data.msg=="已投标"){
            that.$toast.fail("您已投标，请勿重复投标");
          }else{
            that.$router.replace("/TenderingIndex");
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    },
	//工人投标
	grTender() {
	  this.get();
	  let grRes = {
	    //工人上传信息
	    juese: this.userid,
	    project_id: this.$route.params.project_id,
	    // is_tender:'0',
	    // status:null,
	    // remark:'0',
	    userclass_id: 1,
    };
    var that=this;
	  this.$axios
	    .post(this.address + "/customapi/Yitoubiao/toubiao", grRes, {
	      headers: { Authorization: this.usertoken },
	      withCredentials: true,
	    })
	    .then((res) => {
        console.log(res);
        if(res.data.msg=="已投标"){
            that.$toast.fail("您已投标，请勿重复投标");
          }else{
            that.$router.replace("/TenderingIndex");
          }
	    })
	    .catch((err) => {
	      console.log(`${err}`);
	    });
	},
    //供应商投标
    gyTender() {
      this.get();
      let gyRes = {
        //设计师上传信息
        juese: this.userid,
        project_id: this.$route.params.project_id,
        // is_tender:'0',
        // status:null,
        // remark:'0',
        userclass_id: 1,
      };
      var that=this;
      this.$axios
        .post(this.address + "/customapi/Yitoubiao/toubiao", gyRes, {
          headers: { Authorization: this.usertoken },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if(res.data.msg=="已投标"){
            that.$toast.fail("您已投标，请勿重复投标");
          }else{
            that.$router.replace("/TenderingIndex");
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    },
  },

  mounted() {
    if (typeof read_user === "function") {
      this.userid = read_user().userclass_id;
      this.usertoken = read_user().token;
      // alert(this.userid)
    } else {
      this.userid = store.state.userclass_id;
      this.usertoken = store.state.token;
    }
    var that = this;
    
    //风水师点击投标
    document.getElementsByClassName("flexBtn")[0].onclick = function () {
      that.fsTender();
    };
    //设计师点击投标
    document.getElementsByClassName("flexBtn")[1].onclick = function () {
      that.sjTender();
    };
    //监理点击投标
    document.getElementsByClassName("flexBtn")[2].onclick = function () {
      that.jlTender();
    };
	// 施工队点击投标
	document.getElementsByClassName("flexBtn")[3].onclick = function () {
	  that.grTender();
	};
    //供应商点击投标
    document.getElementsByClassName("flexBtn")[4].onclick = function () {
      that.gyTender();
    };
    //判断身份 如果是风水师就把其他投标按钮隐藏等npm 
    // alert(this.userid);
    // switch (this.userid) {
    //   case 1:
    //     // alert(1 == this.userid)
    //     this.$refs.tou[0].children[1].setAttribute("style", "display:block");
    //     break;
    //   case 2:
    //     this.$refs.tou[1].children[1].setAttribute("style", "display:block");
    //     break;
    //   case 4:
    //     this.$refs.tou[2].children[1].setAttribute("style", "display:block");
    //     break;
    //   case 5:
    //     this.$refs.tou[3].children[1].setAttribute("style", "display:block");
    //     break;
    // }
    if(this.userid==1){
      this.$refs.tou[0].children[1].setAttribute("style", "display:block");
    }else if(this.userid==2){
      this.$refs.tou[1].children[1].setAttribute("style", "display:block");
    }else if(this.userid==3){
      this.$refs.tou[3].children[1].setAttribute("style", "display:none");
    }else if(this.userid==4){
      this.$refs.tou[2].children[1].setAttribute("style", "display:block");
    }else if(this.userid==5){
      this.$refs.tou[4].children[1].setAttribute("style", "display:block");
    } else {
    this.$refs.tou[3].children[1].setAttribute("style", "display:block");
  }
    console.log(this.$refs.tou[4].children[2]);
    this.$refs.tou[0].children[2].onclick=function(){that.router_1('/choosebuilder');};
    this.$refs.tou[1].children[2].onclick=function(){that.router_1('/sjchoos');};
    this.$refs.tou[2].children[2].onclick=function(){that.router_1('/jlchoose');};
    this.$refs.tou[3].children[2].onclick=function(){that.router_1('/sgdchoose');};
    this.$refs.tou[4].children[2].onclick=function(){that.router_1('/gyschoose');};
    // 判断是否为业主，是业主则显示编辑按钮
    this.userid == 3 ? this.editBtnShow = true : this.editBtnShow = false;
    // console.log(this.$refs.tou[0].children[1]);
  },
  created(){
    this.info();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  position: fixed;
  width: 100%;
  left: 0;
  top: .5rem;
  z-index: 99;
}
/* 修改按钮、收藏按钮*/
.editBtn {
  margin-right: 0.25rem;
  border: 0;
}
.hello >>> .van-nav-bar .van-icon {
  color: #000;
  font-size: 0.5rem;
}
.hello >>> .van-icon {
  vertical-align: middle;
}
/* 报告 */
.report {
  margin: 0.4rem;
}
.pic img {
  display: inline-block;
  width: 2.57rem;
  height: 2.57rem;
  border: 1px solid rgba(195, 195, 195, 1);
  border-radius: 0.2rem;
  margin-right: 0.3rem;
}
.schedule {
  width: 1.9rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background: rgba(102, 120, 255, 1);
  border-radius: 0.2rem;
  font-size: 0.29rem;
  color: rgba(255, 255, 255, 1);
  padding: 0;
  float: right;
  margin-right: 0.6rem;
}
/*  */
.flexBox {
  background: #fff;
  border-radius: 0.3rem;
  margin-right: 0.3rem;
  height: 4.5rem;
  width: 28%;
  overflow: hidden;
}
.feng {
  display: inline-block;
  width: 100%;
  font-size: 0.44rem;
  font-weight: bold;
  text-align: center;
  position: relative;
  top: 0.9rem;
}
.flexBtn {
  display: block;
  width: 2rem;
  height: 0.64rem;
  line-height: 0.64rem;
  border-radius: 0.2rem;
  margin: 0 auto;
  font-size: 0.25rem;
  position: relative;
  top: 1.3rem;
  background: #6678ff;
  color: #fff;
  padding: 0 5px;
}
.share {
  display: inline-block;
  font-size: 0.5rem;
  position: relative;
}
.action {
  height: 5.5rem;
  background: #f4f4f4;
  overflow: hidden;
  margin-top: 1.1rem;
}
.acImg {
  padding: 0 0.48rem;
  margin: 0 auto;
  margin-top: 0.3rem;
}
.acImg img {
  width: 100%;
  height: 5rem;
  border-radius: 0.2rem;
}
.modern {
  padding: 0 0.48rem;
  margin: 0 auto;
}
.title {
  font-size: 0.5rem;
  font-weight: bold;
  margin: 0.3rem 0;
}
.modernList {
  font-size: 0.3rem;
  margin: 0.3rem 0;
  color: #999;
}
.modernList span {
  margin: 0 0.1rem;
}
.popup {
  font-size: 0.4rem;
  margin: 0.3rem 0;
}
.popup i {
  vertical-align: top;
  font-size: 0.5rem;
}
.van-ellipsis {
  width: 74%;
  line-height: 0.5rem;
  display: inline-block;
  padding: 0 0.3rem;
}
.iconPop {
  margin-left: 0.2rem;
}
.modText {
  font-size: 0.4rem;
  line-height: 0.5rem;
}
.huxing {
  margin: 0.48rem;
}
.picIndex {
  width: 100%;
  background: #f4f4f4;
}
/* 户型图 */
.picBox,
.tendering {
  padding: 0 0 0 0.48rem;
  margin: 0 auto;
}
.picNine img {
  width: 100%;
  margin: 0.3rem 0;
}
.tendering {
  padding-bottom: 0.2rem;
}
.picBox img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.picList {
  display: inline-block;
  width: 2.7rem;
  height: 2.7rem;
  margin-right: 0.45rem;
  margin-bottom: 0.3rem;
}
/*  */
.tianChong {
  width: 100%;
  height: 1.5rem;
}
.flexText {
  text-align: center;
  font-size: 0.3rem;
  display: block;
  line-height: 0.4rem;
  position: relative;
  top: 1.5rem;
}
.btnColor {
  background: #999;
  color: #fff;
}
/* 新建项目 */
.add {
  /* margin-top: .15rem; */
  background: #f2f2f2;
}
.msgInput {
  background: #f2f2f2;
  font-size: 0.32rem;
}
.uploadImg {
  margin-top: 0.2rem;
}
.uploadImg {
  margin-left: 0.4rem;
}
.reportBtn {
  display: block;
  height: 0.8rem;
  margin: 0.35rem auto;
  padding: 0 0.8rem;
  border-radius: 0.2rem;
  font-size: 0.48rem;
}
/* 投标分类 */
.divisionWrapper {
  list-style: none;
  white-space: nowrap;
  overflow-x: scroll;
}

.divisionItem {
  position: relative;
  display: inline-block;
  width: 35%;
  margin-top: 0.08rem;
  text-align: center;
  margin-right: 0.3rem;
  font-size: 0.24rem;
}
/*  显示三条 */
.three {
  height: 2.65rem;
  overflow: hidden;
}
</style>
