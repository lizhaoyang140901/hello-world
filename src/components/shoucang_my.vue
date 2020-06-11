<template>
  <div id="shoucang_my">
    <div class="sc_title">
        <img :src="lefturl" alt="" @click="sc_fan()">
        <span>我的收藏</span>
        <div @click="sc_redact()" class="sc_edit" v-show="flag==true">{{ message }}</div>
        <div @click="sc_redact()" class="sc_edit" v-show="flag==false">{{ message }}</div>
    </div>
    <van-tabs v-model="active">
        <van-tab title="业主">
            <van-cell>
                <!-- :style="{display:activeDisplay}" -->
                <van-checkbox-group  ref="checkboxGroup" v-model="result">
                   <div class="sc_buju">
                        <van-checkbox name="a" :style="{display:activeDisplay}">                       
                        </van-checkbox>
                        <div class="sc_head"></div>
                        <div class="sc_name">胡丽</div>
                   </div>
                    <div class="sc_buju">
                        <van-checkbox name="b" :style="{display:activeDisplay}">                       
                        </van-checkbox>
                        <div class="sc_head"></div>
                        <div class="sc_name">胡丽</div>
                   </div>
                    <div class="sc_buju">
                        <van-checkbox name="c" :style="{display:activeDisplay}">                       
                        </van-checkbox>
                        <div class="sc_head"></div>
                        <div class="sc_name">胡丽</div>
                   </div>
                    
                </van-checkbox-group>
                <div class="sc_btns"> 
                    <van-button type="info" @click="toggleAll" :style="{display:activeDisplay}">全选</van-button>
                    <div class="sc_del" :style="{display:activeDisplay}">删除</div>
                </div>
            </van-cell>
        </van-tab>
        <van-tab title="设计师">内容 2</van-tab>
        <van-tab title="供应商">内容 3</van-tab>
        <van-tab title="装修公司">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "shoucang_my",
  data() {
    return {
		lefturl:require('../assets/my/left.png'),
      result: [],
      checked: false,
      message:'编辑',
      flag:true,
      active:0,
      activeDisplay:'none'
    };
  },
  methods:{
    sc_fan(){
      this.$router.go(-1);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    sc_redact(){
        this.flag = !this.flag
        if(this.flag==true){
            this.message = '编辑';
            this.activeDisplay = 'none';

        }else if(this.flag==false){
            this.message = '完成'
            this.activeDisplay = 'block';
        }
    }
  }
};
</script>
<style scoped>
/* #shoucang_my{
     background-color: #fafafa;
} */
.sc_title{
  background-color: #fafafa;
  padding: 0px 16px;
  height: 1.4rem;
  line-height: 1.4rem;
}
.sc_title img{
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.sc_title span{
    font-size: .5rem;
    height: 1.4rem;
    line-height: 1.4rem;
}
.sc_title div{
    float: right;
    font-size: 0.35rem;
}
/* .van-cell{
    border: 0 solid #ebedf0;
    border-width: 1.5px 0;
    box-sizing: border-box;
} */
.van-checkbox{
    float: left;
    margin: 0.55rem 0.3rem;
}
.sc_head {
  float: left;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: url("../assets/my/touxiang.png") no-repeat 0 0;
  background-size: 100% 100%;
}
.sc_name{
    float: left;
    margin: 0.55rem 0.3rem;
}
/* .van-checkbox{
    width: 100%;
    border: 0 solid #ebedf0;
    border-width: 0 0 1px 0;
    box-sizing: border-box;
    margin: 0rem;
    padding: 0.1rem 0rem;
} */
.van-button--normal{
    float: left;
    border-radius: 0.4rem;
    height: 1rem;
    line-height: 0rem;
    padding: 0rem 0.7rem;
}
.sc_del{
    float: right;
    border-radius: 0.4rem;
    height: 1rem;
    line-height: 1rem;
    padding: 0rem 0.7rem;
    color: #fff;
    background-color: #7680f4;
    border: 1px solid #7680f4;
}
.van-tabs__line{
    background-color: #7680f4 !important;
}
.sc_buju{
    float: left;
    width: 100%;
    height: 100%;
    border: 0 solid #ebedf0;
    border-width: 0 0 1px 0;
    box-sizing: border-box;
    margin: 0rem;
    padding: 0.1rem 0rem;
}
.sc_btns{
    float: left;
    margin-top: 1rem;
    width: 100%;
}
</style>