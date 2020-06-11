<template>
  <div id="splitDetails">
    <div class="proDetailHeader">
      <van-row>
        <van-col span="6">
          <van-icon class="backIcon" name="arrow-left" size=".6rem" @click="router('/TenderStylist')"/>
          <span class="pageTitle">拆分详情</span>
        </van-col>
      </van-row>
    </div>
    <div class="materialTitle">
      <span>材料添加</span>
      <!-- <img class="addImg" src="../assets/images/setup.png" @click="addMaterial"> -->
    </div>
    <!-- 动态数据表格 -->
    <div class="materialContent">
      <van-field v-model="workName" label="工作名称" placeholder="请输入工作名称"/>
      <van-field v-model="material.materialName" label="材料名称" placeholder="请输入材料名称"/>
      <van-field v-model="material.materialUnit" label="材料单位" placeholder="请输入材料单位"/>
      <van-field v-model="material.materialUnitPrice" label="材料单价" placeholder="请输入材料单价"/>
      <van-field v-model="material.materialQuantity" label="材料数量" placeholder="请输入材料数量"/>
      <van-field v-model="workMoney" label="工费" placeholder="请输入工作费用"/>
      <van-field v-model="workTime" label="工时" placeholder="请输入工作时长"/>
      <van-field v-model="worker" label="所属工种" readonly placeholder="请选择当前所属工种" @click="showPopupOfWorker"/>
    </div>
    <!-- 弹出层工种选择 -->
    <van-popup
      v-model="workerPopupshow"
      position="bottom"
      :style="{ height: '35' }"
    >
      <van-area
        :area-list="workerInfoList"
        :columns-num="1"
        @confirm="getSureOfWorker"
        @cancel="exit"
      />
    </van-popup>
    <div class="van-hairline--top"></div>
    <!-- <div class="materialCollectHeader">材料列表</div>
    <van-row>
      <van-col class="volItem" span="6">材料名称</van-col>
      <van-col class="volItem" span="5">材料单位</van-col>
      <van-col class="volItem" span="5">材料单价</van-col>
      <van-col class="volItem" span="5">材料数量</van-col>
      <van-col class="volItem" span="3">删除</van-col>
    </van-row> -->
    <!-- 内容： -->
    <!-- <van-row class="materialCollectBody" v-for="(item, index) in materialList" :key="index">
      <van-col class="volItem" span="6">{{ item.materialName }}</van-col>
      <van-col class="volItem" span="5">{{ item.materialUnit }}</van-col>
      <van-col class="volItem" span="5">{{ item.materialUnitPrice }}</van-col>
      <van-col class="volItem" span="5">{{ item.materialQuantity }}</van-col>
      <van-col class="volItem" span="3">
        <van-icon size=".5rem" name="delete" />
      </van-col>
    </van-row> -->
      <!-- 提交 -->
    <van-button
    class="reportBtn"
    type="primary"
    size="mini"
    color="#6678ff"
    @click="setUpWork"
    >提交</van-button
  >
  </div>
</template>

<script>
import store from './../../store'
export default {
  name: "SplitDetails",
  data() {
    return {
      id: this.$route.params.project_id,
      userclass_id: '',
      material: {
        materialName: '',
        materialUnit: '',
        materialUnitPrice: '',
        materialQuantity: ''
      },
      materialOfNew: {},
      materialList: [],
      workerPopupshow: false,
      workerInfoList: {
        province_list: {}
      },
      workName: '',
      workMoney: '',
      workTime: '',
      worker: '',
    }
  },
  methods: {
    router: function(path) {
      this.$router.replace(path + "/" + this.id);
    },
    addMaterial () {
      this.materialList.push(this.material);
      // this.material = {};
    },
    showPopupOfWorker () {
      this.workerInfoList.province_list = ["木工", "电工", "泥工"]
      this.workerPopupshow = true;
    },
    // 弹出层确认按钮
    getSureOfWorker(val) {
      this.worker = `${val[0].name}`;
      this.workerPopupshow = false;
    },
    // 弹出层取消按钮
    exit() {
      this.workerPopupshow = false;
    },
    setUpWork () {
      let data = {
        project_id:Number( this.id),
        job_name: this.workName,
        material_name: this.material.materialName,
        material_unit: this.material.materialUnit,
        material_sell: Number(this.material.materialUnitPrice),
        material_num: Number(this.material.materialQuantity),
        job_time: Number(this.workTime),
        job_money: Number(this.workMoney),
        userclass_id: 0
      };
    switch (this.worker) {
      case '木工':
        data.userclass_id = 6
        break;
      case '电工':
        data.userclass_id = 7
        break;
      default: data.userclass_id = 8
        break;
    }
    // this.addMaterial();   【先隐藏，不展示材料列表】
    // console.log(`${typeof(data.project_id)}: ${data.project_id}`);
    // console.log(`${typeof(data.job_name)}: ${data.job_name}`);
    // console.log(`${typeof(data.material_name)}: ${data.material_name}`);
    // console.log(`${typeof(data.material_sell)}: ${data.material_sell}`);
    // console.log(`${typeof(data.material_num)}: ${data.material_num}`);
    // console.log(`${typeof(data.job_time)}: ${data.job_time}`);
    // console.log(`${typeof(data.job_money)}: ${data.job_money}`);
    // console.log(`${typeof(data.userclass_id)}: ${data.userclass_id}`);
    // this.materialOfNew = material;
    this.$axios.post('https://test.sazjob.com/customapi/Fenchai/add', data)
        .then(res => {
          console.log(res.config.data);
        })
    }
  },
  mounted () {
    this.addMaterial();
    console.log(this.id + '增加工作拆分id');
    // console.log(this.materialList);
    if(typeof testfun === "function"){
	      this.userclass_id = read_user().userclass_id;
    }else{
    this.userclass_id = store.state.userclass_id;
    }
  }
}
</script>

<style scoped>
.proDetailHeader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  line-height: 1rem;
  padding: 0.15rem 0.48rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
#splitDetails >>> .backIcon {
  margin-left: -0.3rem;
  vertical-align: middle;
  color: #000;
  height: .5rem;
}
.pageTitle {
  font-size: 0.45rem;
  vertical-align: middle;
}
.materialTitle {
  font-size: 0.4rem;
  margin-top: 1.5rem;
  padding: 0 .41rem;
}
.materialCollectHeader {
  font-size: .4rem;
  padding: 0 .41rem;
  margin: 0.6rem 0 .3rem 0;
}
.materialCollectBody {
  margin-top: 0.2rem;
}
.volItem {
  text-align: center;
  font-size: .3rem;
  margin-top: 0.2rem;
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
