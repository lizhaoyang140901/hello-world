<template>
  <div>
    <div class="zl_title">
        <img :src="lefturl" alt="" @click="zl_fan()">
        <span>个人信息</span>
    </div>
    <div style="padding: 10px 16px 0px 16px;" data-v-405701cd="" role="button" tabindex="0" class="van-cell van-cell--clickable van-field">
		<div class="van-cell__title van-field__label">
			<span>头像</span>
		</div>
		<div class="picWrapper">
		    <img id="tuu" :src="tt" @click="nnn(abc)">
		</div>
	</div>
    <van-field v-model="xx_name" label="姓名" :placeholder="p_xx_name"/>
    <van-field
      readonly
      clickable
	  disabled
      name="picker"
      :value="value"
      label="性别"
      :placeholder="p_value"
      @click="showPicker = true"
    />
	<van-popup v-model="showPicker" position="bottom">
		<van-picker
	        show-toolbar
	        :columns="columns"
	        @confirm="onConfirm"
	        @cancel="showPicker = false"
			/>
	</van-popup>
    <van-field
      title="出生日期"
      label="出生日期"
	  disabled
      :placeholder="p_timeValue"
      :value-class="className"
      :value="timeValue"
      @click="showPopup" />
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :loading="isLoadingShow"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="show = false"
          @confirm="confirmPicker"
        />
    </van-popup>
    <van-field
      v-model="jiguan_ssq"
	  disabled
      label="籍贯"
      :placeholder="p_jiguan_ssq"
      @click="jiguan = true"/>
    <van-popup v-model="jiguan" position="bottom">
      <van-area
      :area-list="areaList"
      :columns-placeholder="['请选择', '请选择', '请选择']"
      @cancel="jiguan = false"
      @confirm="jiguantijiao"
      />
    </van-popup>
    <div class="zhBtn" @click="xinxi">保存</div>
  </div>
</template>

<script>
import ditushuju from '../assets/area.js'
export default {
	name: "xinxi_my",
	data() {
		return {
			lefturl:require('../assets/my/left.png'),
			jiguan_ssq: '',
			areaList: ditushuju,
			jiguan: false,
			xx_name:'',
			value: '',
			columns: ['男', '女'],
			img_list: [],
			showPicker: false,
			timeValue: '',
			show: false,
			isLoadingShow: true,
			currentDate: new Date(),
			minDate: new Date(1960, 0, 0),
			maxDate: new Date(2020, 12, 31),
			className: '',
			p_xx_name: '请输入姓名',
			p_value: '点击选择性别',
			p_timeValue: '请选择出生日期',
			p_jiguan_ssq: '请选择籍贯',
			touurl: "",
			tt: false
		};
	},
	mounted() {
		this.$axios.post('https://test.sazjob.com/customapi/Usertool/userdate').then(_d => {
			console.log(_d);
			console.log(_d.data.data);
			if(_d.data.data.realname == null){
				this.p_xx_name = "未设置"
			}else{
				this.xx_name = _d.data.data.realname;
			}
			if(_d.data.data.sex == 2){
				this.p_value = "未设置"
			}else{
				this.value = _d.data.data.sex == 1?'男':'女'
			}
			if(_d.data.data.birthday == 0){
		  		this.p_timeValue = "未设置"
			}else{
				this.timeValue = this.shijianchuo(_d.data.data.birthday)
			}
			if(_d.data.data.jiguan === ""){
		  		this.p_jiguan_ssq = "未设置"
			}else{
				this.jiguan_ssq = _d.data.data.jiguan
			}
			this.tt = "https://test.sazjob.com/" + _d.data.data.headimgurl;
		})
	},
	methods:{
		xinxi() {
			if (this.xx_name == "") {
				this.$toast({
					message: "姓名不能为空",
					icon: "chat-o"
				});
			} else if (this.value == "") {
				this.$toast({
					message: "请选择性别",
					icon: "chat-o"
				});
			}else if (this.timeValue == "") {
				this.$toast({
					message: "请选择出生日期",
					icon: "chat-o"
				});
			}else if (this.jiguan_ssq == "") {
				this.$toast({
					message: "请选择籍贯",
					icon: "chat-o"
				});
			}else if(document.getElementById("tuu").src == '') {
				this.$toast({
					message: "头像不能为空",
					icon: "chat-o"
				});
			}else{
				var touxiang = this.touurl?this.touurl:this.tt.slice(this.tt.indexOf("com/") + 4)
				var name = this.xx_name;
				var xingbie = this.xingbiepd(this.value);
				var csrq = this.timeValue;
				var jg = this.jiguan_ssq;
				this.$axios.post('https://test.sazjob.com/customapi/Usertool/userupdate',{
					birthday: csrq,
					headimgurl: touxiang,
					jiguan: jg,
					realname: name,
					sex: xingbie
				}).then(_d => {
					console.log(_d)
					if(_d.status == 200){
						this.$toast({
							message: "提交成功",
							icon: "chat-o"
						});
						var that = this;
						setTimeout(function() {
							that.$router.push({ name: "my"});
						}, 1000);
					}else{
						this.$toast({
							message: "操作失败，请稍候重试",
							icon: "chat-o"
						});
					}
				})
				
				
			}
		},
		nnn(a) {
			tupian(a);
		},
		abc(ooo) {
			if(ooo){
				this.utu = true
				this.touurl = ooo
				this.tt = "https://test.sazjob.com/" + ooo
				$api.setStorage('headimgurl', ooo);
			}
		},
		add(m){
			return m<10?'0'+m:m 
		},
		shijianchuo(shijian) {
			var time = new Date(shijian * 1000);	
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			return y+'-'+this.add(m)+'-'+this.add(d);
		},
		xingbiepd(m){
			if(m === '男'){
				return 1;
			}else if(m === '女') {
				return 0;
			}else{
				return 2;
			}
		},
		zl_fan(){
			this.$router.go(-1);
		},
		onConfirm(value) {
			this.value = value;
			this.showPicker = false;
		},
		//籍贯提交
		jiguantijiao(val){
			let sheng = val[0].name
			let shi = val[1].name
			let qu = val[2].name
			this.jiguan_ssq = sheng+shi+qu
			this.jiguan = false
		},
		// 显示弹窗
		showPopup () {
			this.show = true
			this.isLoadingShow = true
			setTimeout(() => {
				this.isLoadingShow = false
			}, 500)
		},
		// 确认选择的时间
		confirmPicker (val) {
			let year = val.getFullYear()
			let month = val.getMonth() + 1
			let day = val.getDate()
			let hour = val.getHours()
			let minute = val.getMinutes()
			if (month >= 1 && month <= 9) { month = `0${month}` }
			if (day >= 1 && day <= 9) { day = `0${day}` }
			this.className = 'timeClass'
			this.timeValue = `${year}-${month}-${day}`
			this.show = false
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
		}
	}
};
</script>
<style scoped>
.zl_title{
  background-color: #fafafa;
  padding: 0px 16px;
  height: 1.4rem;
  line-height: 1.4rem;
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
.zl_title img{
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.zl_title span{
    font-size: .5rem;
    height: 1.4rem;
    line-height: 1.4rem;
}
.van-uploader__upload{
  border-radius:50%;
  width: 1.5rem;
  height: 1.5rem;
  background:url('../assets/my/touxiang.png') no-repeat 0 0;
  background-size: 100% 100%;
}
.van-field__body{
  float: right;
}
.van-uploader__upload-icon{
  opacity: 0;
}
.van-icon{
  margin-top: 0.3rem;
}
.seller .timeClass {
    color: #333;
}
.box{
    margin: 0.4rem 0.4rem;
}
.reports{
    font-size: 0.4rem;
    color: black;
}
.gongzuo{
	border: 0.1rem solid #f2f2f2;
    margin: 0.2rem 0;
    border-radius: 0.15rem;
}
#tuu{
	width: 2.5rem;
	height: 2.5rem;
}
.picWrapper img{
	border-radius: 50%;
}
</style>
