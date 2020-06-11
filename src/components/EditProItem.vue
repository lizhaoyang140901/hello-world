<template>
  <div id="editProItem">
    <div class="proDetailHeader">
      <van-row>
        <van-col class="location">
          <span class="iconfont iconLocation"></span>
          <span class="city">{{location}}</span>
        </van-col>
        <van-col class="search" span="15">
          <van-search v-model="value" placeholder="请输入公司名称" />
        </van-col>
        <van-col class="setUpWrapper">
            <!-- :to="'/editWorkItem/' + item.project_id + '/' + item.id" -->
          <router-link :to="'/TenderDetails' + '/' + id">
            <button class="setUpBtn">返回</button>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- Field 输入框 -->
    <van-cell-group class="cellGroup">
      <van-field
        class="proInput"
        v-for="item in proInputInfo.list"
        :label="item.listItemInfo"
        :placeholder="item.listItemPrompt"
        v-model="item.listItemText"
        :readonly="item.readonly"
        :type="item.type"
        :clearable="true"
        :key="item.id"
        :error-message = item.errMessage
      />
    </van-cell-group>
    <!-- 输入金额 -->
    
    <van-row class="amountInpBox" >
      <!-- <van-field class="amountTitle" label="预算金额(万)"></van-field> -->
      <div class="amountTitle">预算金额(万元)</div>
      <van-col span="6" class="minMoney">
        <van-field v-model="minMoney" type="digit" input-align="center" placeholder="输入金额" error-message="输入小金额的错误提示信息"/>
      </van-col>
      <van-col class="line">——</van-col>
      <van-col span="6" class="maxMoney">
        <van-field v-model="maxMoney" type="digit" input-align="center" placeholder="输入金额" error-message="输入大金额的错误提示信息"/>
      </van-col>
    </van-row>

    <!-- 弹出层项目信息选择 -->
    <van-popup
      v-model="housePopupshow"
      position="bottom"
      :style="{ height: '35' }"
    >
      <van-area
        :area-list="houseProInfoList"
        :columns-num="1"
        @confirm="getSureOfHouse"
        @cancel="exit"
      />
    </van-popup>
    <!-- 弹出层省市区选择 -->
    <van-popup
      v-model="areaPopupshow"
      position="bottom"
      :style="{ height: '35' }"
    >
      <van-area
        :area-list="areaListDress"
        :columns-num="3"
        @confirm="getSureOfArea"
        @cancel="exit"
      />
    </van-popup>
    <!-- 项目方案说明 -->
    <div class="proDesc">方案说明</div>
    <van-field
      class="ProgressUpload"
      v-model="proInputInfo.message"
      rows="4"
      autosize
      type="textarea"
      maxlength="300"
      placeholder="请输入您的方案说明，内容不能为空"
      error-message="方案说明为空的错误提示信息"
      show-word-limit
    />
    <div class="housePic">户型图</div>
    <div class="picWrapper">
      <van-uploader
        id="upload_file"
        class="uploadImgWrapper"
        v-model="fileImgList"
        accept="image/*"
        :max-count="9"
        :multiple="true"
        :after-read="afterRead"
        @oversize="overSize"
      />
    </div>
    <van-button
      class="reportBtn"
      type="primary"
      size="mini"
      color="#6678ff"
      @click="editProInfo"
      >提交发布</van-button
    >
  </div>
</template>

<script>
import region from "../assets/area.js";
export default {
  name: "EditProItem",
  data() {
    return {
      id: this.$route.params.project_id,
      location: '',
      value: "",
      housePopupshow: false,
      areaPopupshow: false,
      houseProInfoList: {
        province_list: {}
      },
      areaListDress: region,
      province: "",
      city: "",
      converge: "",
      clickInputIndex: 0, // 存储点击的输入框的索引
      // post的对象
      proInputInfo: {
        list: [
          {
            id: 1,
            listItemInfo: "项目名称",
            listItemPrompt: "点击选择项目名称",
            listItemText: "",
            readonly: true,
            decorateType: ["毛坯房装修", "旧房改造", "局部改造", "工装装修"]
          },
          {
            id: 2,
            listItemInfo: "所在地区",
            listItemPrompt: "点击选择所在地",
            listItemText: "",
            readonly: true
          },
          {
            id: 3,
            listItemInfo: " 小区名称",
            listItemPrompt: "请输入小区名称",
            listItemText: "",
            errMessage: "小区名称的错误提示信息"
          },
          {
            id: 4,
            listItemInfo: " 详细地址",
            listItemPrompt: "请输入详细地址",
            listItemText: "",
            errMessage: "详细地址的错误提示信息"
          },
          {
            id: 5,
            listItemInfo: "房屋户型",
            listItemPrompt: "点击选择户型",
            listItemText: "",
            readonly: true,
            houseLayout: ["一居室", "二居室", "三居室", "四居室", "公寓", "复式", "别墅", "小户型"]
          },
          {
            id: 6,
            listItemInfo: "房屋面积",
            listItemPrompt: "请输入户型面积",
            listItemText: "",
            errMessage: "房屋面积的错误提示信息"
          },
          {
            id: 7,
            listItemInfo: "装修阶段",
            listItemPrompt: "点击选择装修阶段",
            listItemText: "",
            readonly: true,
            decorateStage: ["未开始", "拆改", "水电", "泥工", "油漆", "竣工", "软装"]
          },
          {
            id: 8,
            listItemInfo: "装修风格",
            listItemPrompt: "点击选择装修风格",
            listItemText: "",
            readonly: true,
            decorateStyle: ["现代", "美式", "简约", "简欧", "欧式", "宜家", "中式", "田园", "日式", "混搭", "北欧", "地中海", "新古典", "东南亚"]
          },
          {
            id: 9,
            listItemInfo: "联系电话",
            listItemPrompt: "请输入联系电话",
            errMessage: "手机号的错误提示信息",
          },
          {
            id: 10,
            listItemInfo: "招标风水师",
            listItemPrompt: "点击选择是否招标风水师",
            listItemText: "",
            readonly: true,
            fsneed: ["否", "是"]
          },
        ],
        message: ""
      },
      fileImgList: [],
      imgUrlList: [],
      minMoney: '',
      maxMoney: '',
      // 获取vuex中存储的用户token
      // usertoken: this.$store.state.token,
      index: 0
    };
  },
  methods: {

    //单条（当前）项目信息
    singleProInfo () {
        this.$axios.get('https://test.sazjob.com/backapi/Project/view?project_id=' + this.id).then(res => {
          // console.log(res);
          let data = res.data.data;
          let list = this.proInputInfo.list;
          console.log(data);
          list[0].listItemText = list[0].decorateType[data.title];
          list[1].listItemText = data.province + data.city + data.converge;
          list[2].listItemText = data.area_name;
          list[3].listItemText = data.address;
          list[4].listItemText = list[4].houseLayout[data.house_type];
          list[5].listItemText = data.acreage;
          list[6].listItemText = list[6].decorateStage[data.decoration];
          list[7].listItemText = list[7].decorateStyle[data.decorate_style];
          list[8].listItemText = data.phone;
          list[9].listItemText = list[9].fsneed[data.fsneed];
          // 省市区
          this.province = data.province;
          this.city = data.city;
          this.converge = data.converge;
          // 金额/方案
          this.minMoney = data.zongmoney_min;
          this.maxMoney = data.zongmoney_max;
          this.proInputInfo.message = data.content;
          // 图片
          let imgArr = data.images.split('|');
          for (const index in imgArr) {
            if (imgArr.hasOwnProperty(index)) {
              this.fileImgList.push({url:'https://test.sazjob.com' + imgArr[index]});
              this.imgUrlList.push(imgArr[index]);
            }
          }
          // console.log(this.imgUrlList);
          // 删除上传错误的户型图逻辑
          let deleteIcconIndex = this.index,
              imgUrlList = this.imgUrlList,
              deleteIcon = document.getElementsByClassName("picWrapper")[0].getElementsByTagName("i")[deleteIcconIndex];
          deleteIcon.onclick = () => {
            console.log(deleteIcconIndex);
            imgUrlList.splice(deleteIcconIndex, 1);
            this.imgUrlList = imgUrlList;
            this.index--;
          };
          this.index++;
      })
    },
    getDom() {
      var _that = this;
      var fieldArr = document.getElementsByTagName("input");
      // 遍历数组，给每一个点击的输入框添加点击事件
      for (const index in fieldArr) {
        if (fieldArr.hasOwnProperty(index)) {
          if (fieldArr[index].getAttribute("readonly")) {
            fieldArr[index].setAttribute("index", index);
            if (
              fieldArr[index].getAttribute("placeholder") == "点击选择所在地"
            ) {
              fieldArr[index].addEventListener("click", showPopupOfArea);
            } else {
              fieldArr[index].addEventListener("click", showPopupOfHouse);
            }
          }
        }
      }
      function showPopupOfHouse() {
        _that.housePopupshow = true;
        var thisAttribute = this.getAttribute("placeholder");
        switch (thisAttribute) {
          case "点击选择户型":
            _that.houseProInfoList.province_list =
              _that.proInputInfo.list[4].houseLayout;
            // 拿取点击的输入框的索引
            _that.clickInputIndex = parseInt(this.getAttribute("index")) - 1;
            break;
          case "点击选择装修阶段":
            _that.houseProInfoList.province_list =
              _that.proInputInfo.list[6].decorateStage;
            _that.clickInputIndex = parseInt(this.getAttribute("index")) - 1;
            break;
          case "点击选择项目名称":
            _that.houseProInfoList.province_list =
              _that.proInputInfo.list[0].decorateType;
            _that.clickInputIndex = parseInt(this.getAttribute("index")) - 1;
            break;
          case "点击选择装修风格":
            _that.houseProInfoList.province_list =
              _that.proInputInfo.list[7].decorateStyle;
            _that.clickInputIndex = parseInt(this.getAttribute("index")) - 1;
            break;
          default:
            _that.houseProInfoList.province_list =
              _that.proInputInfo.list[9].fsneed;
            _that.clickInputIndex = parseInt(this.getAttribute("index")) - 1;
        }
      }
      function showPopupOfArea() {
        _that.areaPopupshow = true;
        var thisAttribute = this.getAttribute("placeholder");
        switch (thisAttribute) {
          case "点击选择所在地":
            _that.clickInputIndex = parseInt(this.getAttribute("index")) - 1;
            break;
        }
      }
    },
    // 弹出层确认按钮
    getSureOfArea(val) {
      this.proInputInfo.list[
        this.clickInputIndex
      ].listItemText = `${val[0].name}${val[1].name}${val[2].name}`;
      this.province = val[0].name;
      this.city = val[1].name;
      this.converge = val[2].name;
      this.areaPopupshow = false;
    },
    getSureOfHouse(val) {
      this.proInputInfo.list[
        this.clickInputIndex
      ].listItemText = `${val[0].name}`;
      this.housePopupshow = false;
    },
    // 弹出层取消按钮
    exit() {
      this.housePopupshow = false;
      this.areaPopupshow = false;
    },
    // 图片上传
    afterRead(file) {
      this.index++;
      // 创建form对象，以表单形式将图片上传至服务器
      let formData = new FormData(); // 创建form对象
      formData.append("pic", file.file); // 通过append向form对象添加数据
      console.log(formData.get('pic')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      this.$axios.post("https://test.sazjob.com/backapi/Base/upload", formData)
          .then(res => {
            let data = res.data;
            if (data.status = 200) {
              this.imgUrlList.push(data.data);
              console.log(this.imgUrlList);
            }
          })
          .catch(err => {
            console.log(`当前错误信息：${err.message}`);
          });
          // 删除上传错误的户型图逻辑
          // let deleteIcconIndex = this.imgUrlList.length - 1,
          //     imgUrlList = this.imgUrlList,
          //     deleteIcon = document.getElementsByClassName("picWrapper")[0].getElementsByTagName("i")[deleteIcconIndex];
          //     deleteIcon.onclick = () => {
          //     console.log('删除操作');
          //     console.log(deleteIcconIndex);
          //     imgUrlList.splice(deleteIcconIndex, 1);
          //     this.imgUrlList = imgUrlList;
          //     console.log(imgUrlList);
          //     this.index++;
          // };
      // console.log(deleteIcon);
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
      var errDivArr = document.getElementsByClassName("van-field__error-message");
      return errDivArr;
    },
    // 修改项目
    editProInfo() {
      let imgArr = this.imgUrlList;
      let imgStr = imgArr.join("|");
      let list = this.proInputInfo.list,
          dataText = {
            // title: list[0].listItemText,
            project_id: this.id,
            title: list[0].decorateType.indexOf(list[0].listItemText),
            province: this.province,
            city: this.city,
            converge: this.converge,
            area_name: list[2].listItemText,
            address: list[3].listItemText,
            house_type: list[4].houseLayout.indexOf(list[4].listItemText), //返回当前所选项的索引到服务器
            acreage: list[5].listItemText,
            // sdadasddsda
            decoration: list[6].decorateStage.indexOf(list[6].listItemText),
            // decorate_type: list[7].decorateType.indexOf(list[7].listItemText),
            decorate_style: list[7].decorateStyle.indexOf(list[7].listItemText),
            phone: list[8].listItemText,
            fsneed: list[9].fsneed.indexOf(list[9].listItemText),
            zongmoney_min: parseInt(this.minMoney),
            zongmoney_max: parseInt(this.maxMoney),
            content: this.proInputInfo.message,
            images: imgStr
          };
        console.log(dataText.title);
      // 判断必输项是否为空
      
      dataText.area_name == '' ? this.proDescError_content()[0].innerText = "小区名称不能为空" : this.proDescError_content()[0].innerText = "";
      dataText.address == '' ? this.proDescError_content()[1].innerText = "详细地址不能为空" : this.proDescError_content()[1].innerText = "";
      dataText.acreage == '' ? this.proDescError_content()[2].innerText = "户型面积不能为空" : this.proDescError_content()[2].innerText = "";
      if (dataText.phone == undefined) {
        this.proDescError_content()[3].innerText = "手机号不能为空";
      } else if (!/^1[3456789]\d{9}$/.test(dataText.phone)) {
        this.proDescError_content()[3].innerText = "输入正确的手机号";
      } else {
        this.proDescError_content()[3].innerText = '';
      }
      if (dataText.zongmoney_min > dataText.zongmoney_max) {
        this.proDescError_content()[4].innerText = "小金额须小于大金额";
        this.proDescError_content()[5].innerText = "大金额须大于小金额";
      } else {
        this.proDescError_content()[4].innerText = "";
        this.proDescError_content()[5].innerText = "";
      }
      dataText.content == '' ? this.proDescError_content()[6].innerText = "说明方案不能为空" : this.proDescError_content()[6].innerText = "";
      // 若都无问题，提交修改（发请求、跳转
      if (dataText.area_name !== '' && dataText.address !== '' && dataText.acreage !== '' && dataText.content !== '' && dataText.phone !== undefined) {
        if (!!/^1[3456789]\d{9}$/.test(dataText.phone)) {
          if (dataText.zongmoney_min < dataText.zongmoney_max) {
            this.$axios.post('https://test.sazjob.com/customapi/Project/projectedit', dataText).then(res => {
              console.log(res);
            });
            this.$router.push({ path: "/TenderDetails" + "/" + this.id });
          }
        }
      } else {
        console.log('想得美');
      }
    }
  },
  mounted() {
    console.log(`项目修改页id：${this.id}`);
    if(typeof testfun === "function"){
		this.location = testfun();
    }else{
        this.location = '乌鲁木齐市';
        // this.location = '天津市';
    }
    //得到当前项目的信息
    this.singleProInfo();
    this.getDom();
    var errDivArr = this.proDescError_content();
    for (const index in errDivArr) {
      if (errDivArr.hasOwnProperty(index)) {
        errDivArr[index].innerText = '';
      }
    }
    // console.log(errDivArr);
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
  padding: 0.65rem 0.48rem .15rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
.location {
  max-width: 3rem;
  font-size: 0.4rem;
  color: #6678ff;
}
.search {
  flex: 1;
}
.van-search {
  width: 80%;
  padding: 0;
  padding-top: .05rem;
  background-color: #fafafa;
  margin-left: .2rem;
}
.van-search__content {
  background-color: #fff;
  border: .02rem solid #969696;
  border-radius: 1rem;
}
.setUpBtn {
  position: relative;
  width: 1.2rem;
  height: .85rem;
  right: .8rem;
  color: #fff;
  background-color: #6678ff;
  font-size: .4rem;
  border-radius: .2rem;
}
/* 创建项目 */
.cellGroup {
  margin-top: 1.78rem;
}
.cellGroup .van-cell {
  padding: 0.24rem 0.44rem;
  border-bottom: 0.01rem solid #d2d2d2;
  font-size: 0.4rem;
}
/* 金额输入 */
.amountInpBox .van-cell{
  font-size: .4rem;
  float: left;
}
.amountTitle {
  float: left;
  width: 3.15rem;
  padding: .37rem 0 .37rem .4rem;
  font-size: .4rem;
}
.line {
  height: 1.1rem;
  line-height: 1.1rem;
  text-align: center;
}
/* 方案说明 */
.proDesc,
.housePic,
.masterOrNot {
  height: 0.8rem;
  line-height: 1rem;
  padding: 0 0.44rem;
  color: #222;
  font-size: 0.4rem;
  margin-top: 0.3rem;
}
.ProgressUpload {
  width: 93%;
  margin: 0.15rem auto 0 auto;
  border: 0.01rem solid #c3c3c3;
}
#setup >>> .ProgressUpload .van-field__control {
  line-height: 0.5rem;
  color: #000;
}
.picWrapper {
  width: 93%;
  margin: 0 auto;
}
#setup >>> .van-uploader__upload {
  width: 90px;
  height: 90px;
}
#setup >>> .van-uploader__preview-image {
  width: 90px;
  height: 90px;
}
/* 文件上传预览图 */
#setup >>> .van-uploader__preview {
  margin: 0 0.52rem 0.2rem 0;
}
/* 包裹图片的容器 */
.uploadImgWrapper {
  margin: 0.25rem 0 0 0.52rem;
}
.reportBtn {
  text-align: center;
  display: block;
  width: 7.14rem;
  height: 0.83rem;
  line-height: .83rem;
  margin: 0.5rem auto;
  border-radius: 0.41rem;
  font-size: 0.48rem;
  color: #fff;
  background-color: #6678ff;
}
</style>


