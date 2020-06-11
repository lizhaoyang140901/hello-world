<template>
  <div id="newProject">
    <div class="proDetailHeader">
      <van-row>
        <van-col span="5">
          <router-link to="/">
            <van-icon class="backIcon" name="arrow-left" size=".6rem" />
          </router-link>
          <span class="pageTitle">新项目</span>
        </van-col>
      </van-row>
      <!-- 选择项目筛选条件 -->
      <!-- <van-row>
        <van-col span="12">
          <van-field readonly label='选择省市区筛选数据' placeholder="点击选择地区" v-model="areaText"/>
        </van-col> -->
      <!-- <van-col span="12">
          <van-field readonly placeholder="点击选择角色" v-model="roleText"/>
        </van-col> -->
      <!-- </van-row> -->
    </div>
    <van-cell-group class="fielGroup">
      <van-field
        readonly
        label="选择地区"
        placeholder="点击选择地区"
        v-model="areaText"
      />
    </van-cell-group>

    <!-- 弹出层角色信息选择 -->
    <!-- <van-popup
      v-model="rolePopupshow"
      position="bottom"
      :style="{ height: '35' }"
    >
      <van-area
        :area-list="houseProInfoList"
        :columns-num="1"
        @confirm="getSureOfHouse"  
        @cancel="exit"
      />
    </van-popup> -->
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

    <!-- 新项目列表 -->
    <van-empty
      v-show="emptyBoxShow"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="亲！还没有数据哦~"
    />
    <div class="bigWrapper">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-row class="bid" v-for="(item, index) in bidList" :key="index">
          <router-link tag="div" :to="'/TenderDetailsNew/' + item.project_id">
            <van-col span="16">
              <div class="proName">{{ title[item.title] }}</div>
              <div class="bidText">{{decorateStyle[item.decorate_style] + houseType[item.house_type]}}</div>
              <div class="bidTwo">
                <span>{{ houseType[item.house_type] }}</span
                ><span>{{ decorateStyle[item.decorate_style] }}</span
                ><span>{{ item.acreage }}㎡</span><span>{{ item.city }}</span>
              </div>
            </van-col>
            <van-col span="8">
              <div class="bidDate">{{ `${new Date(item.add_time * 1000).getFullYear()}年${new Date(item.add_time * 1000).getMonth() + 1}月${new Date(item.add_time * 1000).getDate()}日`}}</div>
                <!-- <div class="bidBolean">{{ item.bidBolean }}</div> -->
            </van-col>
          </router-link>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import region from "../assets/area.js";
import store from "../../store/index.js";
export default {
  name: "NewProject",
  data() {
    return {
	    userclass_id: "",
      areaText: "",
      // roleText: "",
      bidList: [],
      myArr: [],
      emptyBoxShow: false,
      areaPopupshow: false,
      rolePopupshow: false,
      title: ["毛坯房装修", "旧房改造", "局部改造", "工装装修"],
      houseType: ["一居室", "二居室", "三居室", "四居室", "公寓", "复式", "别墅", "小户型"],
      decorateStyle: ["现代", "美式", "简约", "简欧", "欧式", "宜家", "中式", "田园", "日式", "混搭", "北欧", "地中海", "新古典", "东南亚" ],
      page: 1,
      loading: false,
      finished: false,

      // houseProInfoList: {
      //   province_list: []
      // },
      areaListDress: region,
      // roleList: ['风水师', '设计师', '监理', '木工', '电工', '泥工'],
    };
  },
  methods: {
    getDom() {
      var _that = this;
      var fieldArr = document.getElementsByTagName("input");
      // console.log(fieldArr);
      // 遍历数组，给每一个点击的输入框添加点击事件
      for (const index in fieldArr) {
        if (fieldArr.hasOwnProperty(index)) {
          if (fieldArr[index].getAttribute("readonly")) {
            fieldArr[index].setAttribute("index", index);
            if (fieldArr[index].getAttribute("placeholder") == "点击选择地区") {
              fieldArr[index].addEventListener("click", showPopupOfArea);
            } else {
              fieldArr[index].addEventListener("click", showPopupOfHouse);
            }
          }
        }
      }
      // 弹出弹层
      // function showPopupOfHouse() {
      //   _that.rolePopupshow = true;
      //   _that.houseProInfoList.province_list = _that.roleList;
      // }
      function showPopupOfArea() {
        _that.areaPopupshow = true;
      }
    },
    // 弹出层确认按钮
    getSureOfArea(val) {
      this.areaText = `${val[0].name}${val[1].name}${val[2].name}`;
      this.areaPopupshow = false;
      this.getNewProInfo();
    },
    // getSureOfHouse(val) {
    //   this.roleText = `${val[0].name}`
    //   this.rolePopupshow = false;
    //   this.getNewProInfo();
    // },
    // 弹出层取消按钮
    exit() {
      // this.rolePopupshow = false;
      this.areaPopupshow = false;
    },
    // 请求并展示数据
    onLoad() {
      let data = {
        province: this.areaText,
        city: this.areaText,
        converge: this.areaText,
        juese: this.userclass_id,
        page: this.page
      };
      this.$axios
        .post("https://test.sazjob.com/customapi/Newproject/newlist",  data).then(res => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.bidList.push(res.data.data[i]);
          }
          this.bidList == undefined ? this.emptyBoxShow = true : this.emptyBoxShow = false;
          this.page += 1;
          this.loading = false;
          // 当最后一次请求的数据小于20条时候，结束加载，并且显示加载完毕状态（‘没有更多了’）
          if (res.data.data.length < 20) {
            this.finished = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
	  if(typeof read_user === "function"){
	      this.userclass_id = read_user().userclass_id;
		    // this.token = read_user().token;
	     }else{
	      this.userclass_id = store.state.userclass_id;
		    // this.token = store.state.token;
	     }
    this.getDom();
    console.log(this.userclass_id);
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
.backIcon {
  margin-left: -0.3rem;
  vertical-align: middle;
  color: #000;
}
.pageTitle {
  font-size: 0.45rem;
  vertical-align: middle;
}
.fielGroup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  margin-top: 1.78rem;
}
/* 空状态 */
#newProject >>> .custom-image .van-empty__image {
  width: 3rem;
  height: 3rem;
  margin-top: 5rem;
  border: 0;
}
.bigWrapper {
  margin-top: 2.4rem;
}
.van-cell {
  font-size: 0.4rem;
  padding-left: 0.5rem;
}
.bid {
  padding: 0.5rem;
  box-shadow: 1px 1px 5px #e7e2e2;
}
.bidText,
.bidData,
.proName {
  display: inline-block;
  font-size: 0.4rem;
  margin-bottom: 0.4rem;
}
.proName {
  margin-right: 0.45rem;
}
.bidTwo {
  font-size: 0.3rem;
  color: #969696;
}

.bidTwo span:after {
  display: inline-block;
  content: "|";
  margin: 0 0.2rem;
}
.bidDate {
  text-align: right;
}
.bidBolean {
  color: #6678ff;
  font-size: 0.3rem;
  text-align: right;
}
</style>
