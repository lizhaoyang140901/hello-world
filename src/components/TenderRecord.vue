<template>
    <div id="record">

        <div class="title">
            <van-icon name="arrow-left" />
            <span>送货记录</span>
        </div>
        <div class="contentRecord">
            <van-steps direction="vertical" :active="active" active-icon="success" active-color="#38f">
                <van-step>
                    <i class="i">
                        <b class="b"></b>
                    </i>
                    <h3>工人确认送货成功</h3>
                    <p>2016-07-12 12:40</p>
                    <van-button type="primary" class="success">已确认</van-button>
                </van-step>
                <van-step>
                    <h3>监理确认送货成功</h3>
                    <p>2016-07-11 10:00</p>
                    <van-button type="danger" class="denger">待确认</van-button>
                </van-step>
                <van-step>
                    <h3>设计师确认送货成功</h3>
                    <p>2016-07-11 10:00</p>
                </van-step>
                <van-step>
                    <h3>供应商确认送货成功</h3>
                    <p>2016-07-11 10:00</p>
                </van-step>
            </van-steps>
        </div>
        <div class="btnTrue">确认所有货物全部送达，去付款</div> 
    </div>
</template>
<script>
export default {
    name:'TenderRecord',
    data(){
        return{
            // active: 2
        }
    },
    props: {},
    methods:{
        
    }
}
</script>
<style scoped>
    #record >>> .van-icon{
        vertical-align: middle;
    }
    #record >>> .van-button--normal{
       font-size: .3rem;
        height: .5rem;
        line-height: .5rem;
        padding: 0 .2rem;
        border-radius: .2rem;
        position: absolute;
        right: 2.5rem;
        top: .3rem;
    }
    #record >>> .van-step--vertical .van-step__circle-container{
        display: none;
    }
    .contentRecord{
        margin: 0 .6rem;
    }
    .title{
        padding: .4rem;
        font-size: .5rem;
        font-weight: bold;
    }
    .tianChong{
        width: 100%;
        height: 1.5rem;
    }
    .btnTrue{
        width: 74%;
        height: .8rem;
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
    .success{
        background: #22AC38;
    }
    .denger{
        background: #f00;
    }
    /* 左侧圆圈 */
    .i{
        position: absolute;
        border: 1px solid #999999;
        width: .3rem;
        height: .3rem;
        border-radius: 1rem;
        top: .4rem;
        left: -.6rem;
        z-index: 1;
    }
    .b{
        position: absolute;
        width: .2rem;
        height: .2rem;
        background: #999999;
        border-radius: 1rem;
        top: 47%;
        left: 52%;
        transform: translate(-50%,-50%);
    }
</style>