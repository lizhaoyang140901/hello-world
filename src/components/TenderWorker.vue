<template>
    <div id="chart">
        
        <div class="title">
            <van-icon name="arrow-left"  @click="router('/TenderDetails')"/>
            <span>工人进度报告</span>
        </div>
        <div class="box">
            <h4 class="reports">上传图片</h4>
            <van-uploader v-model="fileList" multiple />
        </div>
        <div class="btnTrue">提交</div> 
        
        <div class="tianChong" value="王强"></div>

        <!-- <footer_bar></footer_bar> -->
    </div>
</template>
<script>
import footer_bar from "./footer_bar";
export default {
    name:'TenderWorker',
    data(){
        return{
            fileList: [
            { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            { url: 'https://cloud-image', isImage: true }
        ]
        }
    },
    components: { footer_bar },
    props: {},
    methods:{
        router:function(path){
            this.$router.replace(path)
        }
    }
}
</script>
<style scoped>
    #chart >>> .van-icon{
        vertical-align: middle;
    }
    #chart >>> .van-icon-photograph::before{
        content: "\F0A2"!important;
    }
    #chart >>> .van-uploader__upload-icon{
        font-size: 1rem;
    }
    .box{
        margin: 0 .4rem;
    }
    .reports{
        font-size: .38rem;
        color: #666;
        margin-bottom: .6rem;
    }
    .title{
        padding: .4rem;
        font-size: .5rem;
        font-weight: bold;
    }
   /* 提交按钮 */.btnTrue{
        width: 7.14rem;
        height: .83rem;
        line-height: .8rem;
        text-align: center;
        border-radius: .4rem;
        border: 0;
        color: #fff;
        background: #6678FF;
        font-size: .4rem;
        position: fixed;
        top: 80%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>