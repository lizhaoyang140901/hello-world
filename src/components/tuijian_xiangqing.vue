<template>
  <div class="hello">
    <header>
      <van-row>
        <van-col>
          <img src="../assets/images/left.png" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">项目介绍</van-col>
      </van-row>
    </header>
    <div class="action">
        <div class="acImg">
             <img :src="'https://test.sazjob.com'+this.img" alt="">
        </div>
    </div>
    <div class="modern">
        <!-- <h4 class="title">送货单</h4>
        <h5 class="modernList"><span>二居</span>|<span>现代简约</span>|<span>39m²</span>|<span>南京</span></h5>
        <div class="popup">
            <van-icon name="location" class="iconPop"/>
            <div class="van-ellipsis">富安达街万兆科贸产业大厦D座7层，富安达街万兆科贸产业大厦D座7层</div>
            <van-icon name="arrow" />
        </div>
        <div class="popup">
            <van-icon name="phone" class="iconPop"/>
                <div class="van-ellipsis">15210797858</div>
            <van-icon name="arrow" />
        </div> -->
        <div class="title">方案说明</div>
        <span class="modText van-multi-ellipsis--l3">
            {{shouming}}
        </span>
    </div>
	<van-overlay :show="show" @click="show = false">
	  <div class="wrapper" @click.stop>
	    <div class="block">
			加载中...
		</div>
	  </div>
	</van-overlay>
    <footer_bar></footer_bar>
  </div>
</template>

<script>
import footer_bar from "./footer_bar";
export default {
  name: "TenderDetails",
  data() {
    return {
		img:'',
		shouming:'',
		show: true
	}
  },
  components: {
	  footer_bar
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
	qingqiu() {
		let n = this.$route.params.id
		this.$axios.get("https://test.sazjob.com/backapi/HomePagexq/view?shouye_id="+n).then(_d => {
			console.log(_d.data)
			console.log(_d.data.data);
			var _this = this;
			_this.show = true;
			if(_d.data.data){
				_this.img = _d.data.data.headimg;
				_this.shouming = _d.data.data.content;
			}else{
				_this.img = '';
				_this.shouming = '';
			}
			/* console.log(_d.data.data.headimg); */
			/* console.log(_d.data.data.content); */
			_this.show = false;
		})
	}
  },
  created() {
	  this.qingqiu();
  },
  watch:{
	  "$route": "qingqiu"
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
	.wrapper {
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    height: 100%;
	}
	.block {
	    width: 5rem;
	    height: 1rem;
	    background-color: #fafafa;
	    font-size: larger;
	    line-height: 1rem;
	    text-align: center;
	}
    .action{
        height: 5.5rem;
        background: #f4f4f4;
        overflow: hidden;
    }
    .acImg{
        padding: 0 .48rem;
        margin: 0 auto;
        margin-top: .3rem;        
    }
    .acImg img{
        width: 100%;
        height: 5rem;
        border-radius: .2rem;
    }
    .modern{
        padding: 0 .48rem;
        margin: 0 auto;
    }
    .title{
        font-size: .5rem;
        font-weight: bold;
        margin: .3rem 0;
    }
    .modernList{
        font-size: .3rem;
        margin: .3rem 0;
        color:#999;
    }
    .modernList span{
        margin: 0 .1rem;
    }
    .popup{
        font-size: .4rem;
        margin: .3rem 0;
    }
    .popup i{
        vertical-align: top;
        font-size: .5rem;
    }
    .van-ellipsis {
        width: 74%;
        line-height: .5rem;
        display: inline-block;
        padding: 0 .3rem;
    }
    .iconPop{
        margin-left: .2rem;
    }
    .modText{
        font-size: .4rem;
        line-height: .5rem;
    }
</style>
