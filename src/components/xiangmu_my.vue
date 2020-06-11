<template>
  <div>
    <div class="td_title">
        <img src="../assets/my/left.png" alt="" @click="td_fan()">
        <span>我的项目</span>
    </div>
    <van-cell-group>
        <van-cell title="设计师" value="10.21" label="天津大宇装修公司">
            <div class="van-cell__value">
                <span>10.21</span>
                <div class="td_jindu">投递成功</div>
            </div>
        </van-cell>
    </van-cell-group>
    <van-cell-group>
        <van-cell title="设计师" value="10.21" label="天津大宇装修公司">
            <div class="van-cell__value">
                <span>10.21</span>
                <div class="td_jindu">投递成功</div>
            </div>
        </van-cell>
    </van-cell-group>
    <van-cell-group>
        <van-cell title="设计师" value="10.21" label="天津大宇装修公司">
            <div class="van-cell__value">
                <span>10.21</span>
                <div class="td_jindu">投递成功</div>
            </div>
        </van-cell>
    </van-cell-group>
    <van-cell-group>
        <van-cell title="设计师" value="10.21" label="天津大宇装修公司">
            <div class="van-cell__value">
                <span>10.21</span>
                <div class="td_jindu">投递成功</div>
            </div>
        </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "zhanghu_my",
  data() {
    return {
      
    };
  },
  methods:{
    td_fan(){
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.td_title{
  background-color: #fafafa;
  padding: 0px 16px;
  height: 1.4rem;
  line-height: 1.4rem;
}
.td_title img{
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.td_title span{
    font-size: .5rem;
    height: 1.4rem;
    line-height: 1.4rem;
}
.van-cell__title span{
    font-size: 0.48rem;
}
.van-cell__label{
    color: #323233;
    font-size: 0.35rem;
}
.van-cell__value{
    color: #323233;
}
.td_jindu{
    color: #6678ff;
}
</style>