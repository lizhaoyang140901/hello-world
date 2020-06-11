<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">资质认证</van-col>
      </van-row>
    </header>
		<van-cell-group>
		  <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
		</van-cell-group>
		<van-cell-group>
		  <van-field v-model="id_number" label="身份证号" placeholder="请输入身份证号" />
		</van-cell-group>
		<van-cell-group>
		  <van-field v-model="Professional" label="专业职称" placeholder="请输入专业职称" />
		</van-cell-group>
		<van-cell-group>
		  <van-field v-model="title_level" label="职称级别" placeholder="请输入职称级别" />
		</van-cell-group>
		<van-cell-group>
		  <van-field v-model="certificate" label="证书编号" placeholder="请输入证书编号" />
		</van-cell-group>
		<van-cell-group>
			<van-field v-model="date_issue" label="发证日期" placeholder="请指定发证日期" @click="fazhneg"/>
			<van-popup v-model="show_date_issue" position="bottom">
				<van-datetime-picker
				  v-model="currentDate"
				  type="date"
				  :min-date="minDate"
				  :max-date="maxDate"
				  :formatter="formatter"
				  @cancel="show_date_issue = false"
				  @confirm="confirm_date_issue"
				/>
			</van-popup>
		</van-cell-group>
		<van-cell-group>
			<van-field v-model="term_validity" label="有效期" placeholder="请指定有效期" @click="youxiao"/>
			<van-popup v-model="show_term_validity" position="bottom">
				<van-datetime-picker
				  v-model="currentDate"
				  type="date"
				  :min-date="minDate"
				  :max-date="maxDate"
				  :formatter="formatter"
				  @cancel="show_term_validity = false"
				  @confirm="confirm_term_validity"
				/>
			</van-popup>
		</van-cell-group>
		<div class="zhBtn">提交认证</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "zizhirenzheng",
  data() {
    return {
		lefturl:require('../assets/images/left.png'),
      tuijianList: [],
	  name: '',
	  id_number: '',
	  Professional: '',
	  title_level: '',
	  certificate: '',
	  date_issue: '',
	  show_date_issue: false,
	  minDate: new Date(2020, 0, 1),
	  maxDate: new Date(2025, 10, 1),
	  currentDate: new Date(),
	  term_validity: '',
	  show_term_validity: false
    };
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
	fazhneg() {
		this.show_date_issue = true;
		this.isLoadingShow = true
		setTimeout(() => {
		  this.isLoadingShow = false
		}, 500)
	},
	// 确认选择的时间
	confirm_date_issue (val) {
	  let year = val.getFullYear()
	  let month = val.getMonth() + 1
	  let day = val.getDate()
	  let hour = val.getHours()
	  let minute = val.getMinutes()
	  if (month >= 1 && month <= 9) { month = `0${month}` }
	  if (day >= 1 && day <= 9) { day = `0${day}` }
	  this.date_issue = `${year}-${month}-${day}`
	  this.show_date_issue = false
	},
	// 选项格式化函数
	formatter (type, value) {
	  if (type === 'year') {
	    return `${value}年`
	  } else if (type === 'month') {
	    return `${value}月`
	  } else if (type === 'day') {
	    return `${value}日`
	  }
	  return value
	},
	youxiao() {
		this.show_term_validity = true;
		this.isLoadingShow = true
		setTimeout(() => {
		  this.isLoadingShow = false
		}, 500)
	},
	confirm_term_validity(val) {
		let year = val.getFullYear()
		let month = val.getMonth() + 1
		let day = val.getDate()
		let hour = val.getHours()
		let minute = val.getMinutes()
		if (month >= 1 && month <= 9) { month = `0${month}` }
		if (day >= 1 && day <= 9) { day = `0${day}` }
		this.term_validity = `${year}-${month}-${day}`
		this.show_term_validity = false
	}
  }
};
</script>

<style scoped>
header {
  padding: 0 0.3rem;
  height: 1.4rem;
  line-height: 1.4rem;
  border-bottom: 0.15rem solid #f2f2f2;
  font-size: 0.5rem;
}
.leftImg {
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}
.zhBtn{
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 0.5rem;
    background: #6678ff;
    height: 1.2rem;
    border-radius: 0.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
}
</style>
