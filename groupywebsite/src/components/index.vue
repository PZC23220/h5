<template>
  <div class="index">
    <div class="banner"><img :src="imgs" alt=""></div>
    <div class="product_description" id="product_description">
      <h2 class="titles">Groupy是一个基于视频的，让粉丝线上应援爱豆的会员制社群</h2>
      <h4>Groupy：一个与爱豆亲密互动的平台。会员仅有的私密状态查看，一键应援，共同守护爱豆的成长。</h4>
      <p>Groupy让你随时查看爱豆的即时状态和由爱豆亲自拍摄的各种精彩短视频。<br>你可以在这里找到心目中的爱豆，加入他们的社群，观看直播，及时聊天，优先获得参与线下活动资格以及查看更多私密内容。</p>
      <ul class="features">
        <li>Groupy 功能特点：</li>
        <li>✔每日任务获取G币</li>
        <li>每日签到、完成转发等任务可获得G币，直接换购会员加入社群或者买礼物送给爱豆！</li>
        <li>✔爱豆状态实时同步</li>
        <li>爱豆在Groupy的内容和信息状态都会实时同步，打开Groupy即可轻松查看！</li>
        <li>✔助力爱豆上人气榜</li>
        <li>观看爱豆视频送人气或者直接给爱豆应援，轻松助力爱豆上Groupy的每日人气榜。人气送出后你还可以通过完成观看任务让血槽恢复哦！</li>
        <li>✔越忠实，越守护</li>
        <li>Groupy设置了不同的粉丝等级，消费G币，应援爱豆成长都可以让你不断升级。快来做爱豆的首个骨灰级守护者吧！</li>
        <li>✔加入社群与爱豆更亲密互动</li>
        <li>加入爱豆的VIP会员，优先查看爱豆私密状态，参加爱豆线下粉丝聚会，获得爱豆私密交流和直播互动！</li>
      </ul>
    </div>
    <div class="joinUs" id="joinUs">
      <h2 class="titles"> 爱豆主播热烈招募中</h2>
      <p>"Groupy致力于向粉丝提供近距离守护爱豆成长的平台。想让你喜欢的爱豆获得全日本的喜爱？把她推荐到Groupy，为她创造迈向事业巅峰的契机吧！正在寻找一个新的出发点吗？来入驻Groupy，和粉丝更紧密地相连在爱豆界展翅高飞！"</p>
      <p>"报名方式：请将推荐语或自我介绍、Twitter/SNS账号，30秒以内的短视频发送至contact@groupy.vip"</p>
    </div>
    <div class="videos"></div>
    <div class="company_profile"  id="company_profile">
      <h2 class="titles">公司介绍</h2>
      <p>"Groupy创始团队为BAT离职创业,曾将UC浏览器海外日活从零做到数千万,两印市场占有超50% 。我们的团队有丰富的国际化和本土经验，精通移动产品研发，普遍90后，有活力有热情。同时具有日本本土深厚商务、运营能力和资源"</p><br>
      <p>Groupy抓住日本粉丝对偶像高消费的市场，从强烈的爱豆应援文化切入，且在付费会员制社群类泛娱乐App里，无同类型竞品。</p><br>
      <p>我们与日本经纪公司和爱豆团体紧密合作，致力打造一个可以让爱豆在线上曝光，展示才艺，获得粉丝打赏和会费分成的社群平台。</p><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      imgs: '../images/bg.png',
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  h2.titles {
    font-weight: bold;
    font-size: 28px;
    color: #203141;
    line-height: 60px;
  }
  .banner {
    img {
      width: 100%;
      height: 500px;
      display: block;
    }
  }
  .product_description {
    padding: 30px 0;
    background-color: #fff;
    background: #fef6f8;
    box-shadow: 0px 0px 10px 1px #d4d4d4;
    -moz-box-shadow: 0px 0px 10px 1px #d4d4d4;
    -webkit-box-shadow: 0px 0px 10px 1px #d4d4d4;
    >* {
      max-width: 810px;
      margin: 0 auto;
    }
    h4 {
      line-height: 40px;
    }
    p {
      font-size: 14px;
      text-align: left;
      line-height: 30px;
    }
    ul {
      text-align: left;
      background-color: #fff;
      border-radius: 40px;
      padding: 30px;
      margin-top: 20px;
      box-shadow: 0px 0px 10px 1px #d4d4d4;
      -moz-box-shadow: 0px 0px 10px 1px #d4d4d4;
      -webkit-box-shadow: 0px 0px 10px 1px #d4d4d4;
      li {
        padding: 10px 0;
      }
      li:first-child {
        font-weight: bold;
      }
      li:not(:first-child) {
        font-size: 12px;
      }
    }

  }
  .joinUs {
    background: #fef6f8 url(../images/bg.jpg);
    padding: 50px 0;
    box-shadow: 0px 0px 10px 1px #d4d4d4;
    -moz-box-shadow: 0px 0px 10px 1px #d4d4d4;
    -webkit-box-shadow: 0px 0px 10px 1px #d4d4d4;
    h2 {
        // color: #fc0088;
    }
    p {
      text-align: left;
      max-width: 810px;
      margin: 0 auto;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .company_profile {
    background-color: #f0f6fb;
    box-shadow: 0px 0px 10px 1px #d4d4d4;
    -moz-box-shadow: 0px 0px 10px 1px #d4d4d4;
    -webkit-box-shadow: 0px 0px 10px 1px #d4d4d4;
    padding: 30px 0;
    p {
      max-width: 810px;
      margin: 0 auto;
      text-align: left;
    }
  }
</style>
