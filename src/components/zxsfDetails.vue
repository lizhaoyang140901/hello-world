<template>
  <div>
    <header>
      <van-row>
        <van-col span="18">
          <img src="../assets/images/left.png" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="collection" span="2" :visible.sync="picVisible">
          <img :src="imgUrl" alt @click="clickPic" />
        </van-col>
        <van-col class="share" span="2">
          <img src="../assets/images/share.png" alt />
        </van-col>
      </van-row>
    </header>
    <!-- 介绍 -->
    <div class="introduce">
      <van-row>
        <van-cell>
          <img :src="imgUurl" alt class="introduceImg" />
        </van-cell>
      </van-row>
      <van-row v-for="(n, inx) in information" :key="inx" class="inforBox">
        <van-col span="9" class="inforBox1">{{n.name}}</van-col>
        <van-col span="6">{{n.sex}}</van-col>
        <van-col span="9" class="inforBox2">{{n.age}}</van-col>
        <van-col span="10" class="inforBox3">{{n.work}}</van-col>
        <van-col span="10" class="inforBox4">{{n.experience}}</van-col>
      </van-row>
    </div>
    <!-- 资质证书与案例展示 -->
    <div class="toggleTwo">
      <van-tabs v-model="active" color="#6678ff">
        <van-tab title="资质证书">
          <van-grid :border="false" :column-num="2" class="zizhi">
            <van-grid-item v-for="(n, inx) in zizhiImg" :key="inx">
              <img :src="n.zzImg" />
            </van-grid-item>
          </van-grid>
          <van-tabbar v-model="active1" class="contactBox">
            <van-grid :border="false">
              <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                  <i class="van-icon van-icon-phone-o van-grid-item__icon"></i>
                  <span class="van-grid-item__text">电话咨询</span>
                </div>
              </div>
              <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                  <i class="van-icon van-icon-service-o van-grid-item__icon"></i>
                  <span class="van-grid-item__text">在线客服</span>
                </div>
              </div>
            </van-grid>
            <div class="contactBtn">立即联系</div>
          </van-tabbar>
          <!-- <van-tabbar v-model="active1" class="contactBox">
            <van-row class="vanPos">
              <van-col span="5">
                <van-icon name="phone-o" size="1rem" />
              </van-col>
              <van-col span="16">
                <input type="text" value="12345678911" class="phoneInt" readonly="readonly" />
              </van-col>
            </van-row>
            <div class="contactBtn">立即联系</div>
          </van-tabbar>-->
        </van-tab>

        <van-tab title="案例展示">
          <van-grid :border="false" :column-num="2" class="anli">
            <van-grid-item v-for="(n, inx) in anliImg" :key="inx">
              <img :src="n.alImg" />
            </van-grid-item>

            <van-tabbar v-model="active1" class="contactBox">
              <van-grid :border="false">
                <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                  <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                    <i class="van-icon van-icon-phone-o van-grid-item__icon"></i>
                    <span class="van-grid-item__text">电话咨询</span>
                  </div>
                </div>
                <div data-v-ee50f694 class="van-grid-item" style="flex-basis: 25%;">
                  <div class="van-grid-item__content van-grid-item__content--center van-hairline">
                    <i class="van-icon van-icon-service-o van-grid-item__icon"></i>
                    <span class="van-grid-item__text">在线客服</span>
                  </div>
                </div>
              </van-grid>
              <div class="contactBtn">立即联系</div>
            </van-tabbar>

            <!-- <van-tabbar v-model="active1" class="contactBox">
              <van-row class="vanPos">
                <van-col span="5">
                  <van-icon name="phone-o" size="1rem" />
                </van-col>
                <van-col span="16">
                  <input type="text" value="12345678911" class="phoneInt" readonly="readonly" />
                </van-col>
              </van-row>
              <div class="contactBtn">立即联系</div>
            </van-tabbar>-->
          </van-grid>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "zxsfDetails",
  data() {
    return {
      picVisible: false,
      imgArr: ["Collection.png", "Collection_active.png"],
      imgIndex: 0,
      imgUurl: require("../assets/images/1.jpg"),
      information: [
        {
          name: "胡兆建",
          sex: "男",
          age: "32岁",
          work: "瓷砖装修师",
          experience: "5年经验"
        }
      ],
      active: 2,
      active1: 0,
      zizhiImg: [
        {
          zzImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          zzImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          zzImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          zzImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          zzImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          zzImg: require("../assets/images/zhuangxiu_img.png")
        }
      ],
      anliImg: [
        {
          alImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          alImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          alImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          alImg: require("../assets/images/zhuangxiu_img.png")
        },
        {
          alImg: require("../assets/images/zhuangxiu_img.png")
        }
      ]
    };
  },
  computed: {
    imgUrl: function() {
      return require("../assets/images/" + this.imgArr[this.imgIndex]);
    }
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
    clickPic() {
      this.imgIndex--;
      if (this.imgIndex < 0) {
        this.imgIndex = this.imgArr.length - 1;
      }
    }
  }
};
</script>

<style scoped>
header {
  padding: 0 0.3rem;
  height: 1.4rem;
  line-height: 1.4rem;
  font-size: 0.5rem;
}
.leftImg {
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}
.collection img {
  width: 0.7rem;
  height: 0.7rem;
}
.share {
  float: right;
}
.share img {
  width: 0.7rem;
  height: 0.7rem;
}
.introduce {
  padding: 0 0.3rem;
  border-bottom: 0.15rem solid #f2f2f2;
}
.introduceImg {
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
}
.van-cell__value--alone {
  text-align: center;
}
.van-cell {
  padding: 5px 0;
}
.inforBox {
  text-align: center;
  margin-top: 0.3rem;
  font-size: 0.4rem;
  margin-bottom: 1rem;
}
.inforBox1 {
  text-align: right;
  margin-bottom: 0.2rem;
}
.inforBox2 {
  text-align: left;
  margin-bottom: 0.3rem;
}
.inforBox3 {
  float: left;
  text-align: right;
}
.inforBox4 {
  float: right;
  text-align: left;
}
.toggleTwo {
  margin-bottom: 1.3rem;
}
.zizhi img,
.anli img {
  width: 4.2rem;
  height: 3rem;
}
/* .contactBox {
  padding: 0 0.3rem;
} */
.van-grid-item__content {
  padding: 0 0;
  width: 2rem;
  height: auto;
  margin-left: 0.3rem;
}
.van-grid-item__content::after {
  border: 0;
}
.contactBtn {
  position: fixed;
  right: 0.5rem;
  bottom: 0.15rem;
  width: 4rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #6678ff;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.4rem;
  cursor: pointer;
}
.vanPos {
  margin-left: 0.3rem;
  width: 5rem;
  height: 1.3rem;
  line-height: 1.3rem;
}
.phoneInt {
  font-size: 0.5rem;
}
</style>
