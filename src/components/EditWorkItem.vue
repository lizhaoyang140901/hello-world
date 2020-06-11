<template>
  <div id="splitDetails">
    <div class="proDetailHeader">
      <van-row>
        <van-col span="7">
          <van-icon
            class="backIcon"
            name="arrow-left"
            size=".6rem"
            @click="router('/workerMateral')"
          />
          <span class="pageTitle">修改工作项</span>
        </van-col>
      </van-row>
    </div>
    <div class="materialTitle">
      <span>工作项修改</span>
    </div>
    <!-- 动态数据表格 -->
    <div class="materialContent">
      <van-field v-model="workName" label="工作名称" :clearable=true placeholder="请输入工作名称" />
      <van-field v-model="material.materialName" label="材料名称" :clearable=true placeholder="请输入材料名称" />
      <van-field v-model="material.materialUnit" label="材料单位" :clearable=true placeholder="请输入材料单位" />
      <van-field v-model="material.materialUnitPrice" label="材料单价" :clearable=true placeholder="请输入材料单价" />
      <van-field v-model="material.materialQuantity" label="材料数量" :clearable=true placeholder="请输入材料数量" />
      <van-field v-model="workMoney" label="工费" :clearable=true placeholder="请输入工作费用" />
      <van-field v-model="workTime" label="工时" :clearable=true placeholder="请输入工作时长" />
      <van-field v-model="worker" label="所属工种" readonly placeholder="请选择当前所属工种" @click="showPopupOfWorker" />
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
    <van-button
      class="reportBtn"
      type="primary"
      size="mini"
      color="#6678ff"
      @click="editWorkItem"
      >修改</van-button
    >
  </div>
</template>

<script>
import store from "../../store";
export default {
  name: "SplitDetails",
  data() {
    return {
      id: this.$route.params.project_id,
      workId: this.$route.params.id,
      userclass_id: "",
      material: {
        materialName: "",
        materialUnit: "",
        materialUnitPrice: "",
        materialQuantity: ""
      },
      materialOfNew: {},
      materialList: [],
      workerPopupshow: false,
      workerInfoList: {
        province_list: {}
      },
      workName: "",
      workMoney: "",
      workTime: "",
      worker: ""
    };
  },
  methods: {
    router(path) {
      this.$router.replace(path + "/" + this.id);
    },
    showPopupOfWorker() {
      this.workerInfoList.province_list = ["木工", "电工", "泥工"];
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
    // 单个工作项
    singleWorkItem() {
      let dataObj = {
        id:Number(this.workId),
        project_id: Number(this.id)
      };
      switch (this.userclass_id) {
        case '6':
          this.worker = '木工';
          break;
        case '7':
          this.worker = '电工';
          break;
        default:
          this.worker = '泥工';
          break;
      };
      this.$axios.post('https://test.sazjob.com/customapi/Fenchai/view', dataObj).then(res => {
        let data = res.data.data[0];
        this.workName = data.job_name;
        this.material.materialName = data.material_name;
        this.material.materialUnit = data.material_unit;
        this.material.materialUnitPrice = data.material_sell;
        this.material.materialQuantity = data.material_num;
        this.workMoney = data.job_money;
        this.workTime = data.job_time;
        this.userclass_id = data.userclass_id;
      })
    },
    // 修改工作项目
    editWorkItem() {
      let inputArray = document.getElementsByTagName("input"),
          count = 0,
          data = {
            id: this.workId,
            userclass_id: this.userclass_id,
            project_id: Number(this.id),
            job_name: this.workName,
            material_name: this.material.materialName,
            material_unit: this.material.materialUnit,
            material_sell: Number(this.material.materialUnitPrice),
            material_num: Number(this.material.materialQuantity),
            job_time: Number(this.workTime),
            job_money: Number(this.workMoney),
          };
      switch (this.worker) {
        case "木工":
          data.userclass_id = 6;
          break;
        case "电工":
          data.userclass_id = 7;
          break;
        default:
          data.userclass_id = 8;
          break;
      }
      for (const index in inputArray) {
        if (inputArray.hasOwnProperty(index)) {
          if (inputArray[index].value == "") {
            count++;
          }
        }
      }
      if (count == 8) {
        this.$toast({
          message: "您未填写任何工作项信息",
          icon: "close"
        });
      } else {
        this.$axios.post("https://test.sazjob.com/customapi/Fenchai/edit", data).then(res => {
          console.log(res);
          this.router("/workerMateral");
          this.singleWorkItem();
        });
      }
    }
  },
  mounted() {
    console.log(`修改工作项页面项目id: ${this.id}`);
    console.log(`工作项id: ${this.workId}`);

    if (typeof read_user === "function") {
      this.userclass_id = read_user().userclass_id;
    } else {
      this.userclass_id = store.state.userclass_id;
    }
    this.singleWorkItem();
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
.materialTitle {
  font-size: 0.4rem;
  margin-top: 2rem;
  padding: 0.2rem 0.41rem 0.2rem;
}
.materialCollectHeader {
  font-size: 0.4rem;
  padding: 0 0.41rem;
  margin: 0.6rem 0 0.3rem 0;
}
.materialCollectBody {
  margin-top: 0.2rem;
}
.volItem {
  text-align: center;
  font-size: 0.3rem;
  margin-top: 0.2rem;
}
.reportBtn {
  text-align: center;
  display: block;
  width: 7.14rem;
  height: 0.83rem;
  line-height: 0.83rem;
  margin: 0.5rem auto;
  border-radius: 0.41rem;
  font-size: 0.48rem;
  color: #fff;
  background-color: #6678ff;
}
</style>
