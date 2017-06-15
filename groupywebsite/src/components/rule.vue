<template>
  <div class="index">
    <div class="banner"></div>
    <div class="product_description" id="product_description">
      <h2 class="titles">一个与爱豆亲密互动的平台<span></span></h2>
      <h4 class="desc">会员仅有的<b>私密状态</b>查看，<b>一键应援</b>，共同守护爱豆的成长</h4>
      <div class="features">
        <p style="left: -400px; top: 163px;text-align: right;"><b>每日签到、完成转发</b>等任务可获得G币，<br>直接换购会员加入社群或者买礼物送给爱豆！</p>
        <p style="left: -400px; bottom: 30px;text-align: right;">Groupy设置了不同的<b>粉丝等级</b>，<br><b>消费G币，应援爱豆成长</b>都可以让你不断升级。<br>快来做爱豆的首个骨灰级守护者吧！</p>
        <p style="right: -200px; top: 30px;">爱豆在Groupy的内容和<b>信息状态</b>都会<b>实时同步</b>，<br>打开Groupy即可轻松查看！</p>
        <p style="right: -390px; top: 163px;">观看爱豆视频<b>送人气</b>或者直接<b>给爱豆应援</b>，<br>轻松助力爱豆上Groupy的每日人气榜。<br>人气送出后你还可以通过完成观看任务让血槽恢复哦！</p>
        <p style="right: -330px; bottom: 30px;">加入爱豆的VIP会员，<br>优先查看爱豆<b>私密状态</b>，参加爱豆线下<b>粉丝聚会</b>，<br>获得爱豆私密交流和<b>直播互动</b>！</p>
      </div>
    </div>
    <div class="joinUs" id="joinUs">
      <span></span>
      <span></span>
      <span></span>
      <div class="idol_recruit">
        <span></span><span></span>
      </div>
      <div class="join_way">
        <span></span>
        <div class="left">
          <h2> 想让你喜欢的爱豆获得全日本的喜爱？<span style="width: 400px;margin-left: -205px;background: #FC4083;"></span></h2>
          <h4 style="margin-bottom: 55px;">把她推荐到Groupy，为她创造迈向事业巅峰的契机吧！</h4>
          <h2>正在寻找一个新的出发点吗？<span></span></h2>
          <h4>来入驻Groupy，和粉丝更紧密地相连在爱豆界展翅高飞！</h4>
        </div>
        <div class="right">
          <h3>报名方式</h3>
          <div class="recruit_condition">
            <div class="condition_left">请将</div>
            <ul class="condition_right">
              <li>推荐语或自我介绍</li>
              <li>Twitter/SNS帐号</li>
              <li>30秒以内的短视频</li>
            </ul>
          </div>
          <div class="contact_email">
            <span>发送至</span><span>contact@groupy.vip</span>
          </div>
        </div>
      </div>
    </div>
    <div class="videos">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h2 class="titles">入驻爱豆<span></span></h2>
      <h4 class="desc">Groupy致力于向粉丝提供近距离守护爱豆成长的平台</h4>
      <ul class="videos_list">
        <li><a href="">
          <img src="" alt="">
          <p class="video_title">メロメロン</p>
          <p class="video_desc">これなんだと思います？当と思います</p>
        </a></li>
        <li><a href="">
          <img src="" alt="">
          <p class="video_title">メロメロン</p>
          <p class="video_desc">これなんだと思います？当と思います</p>
        </a></li>
        <li><a href="">
          <img src="" alt="">
          <p class="video_title">メロメロン</p>
          <p class="video_desc">これなんだと思います？当と思います</p>
        </a></li>
        <li><a href="">
          <img src="" alt="">
          <p class="video_title">メロメロン</p>
          <p class="video_desc">これなんだと思います？当と思います</p>
        </a></li>
        <li><a href="">
          <img src="" alt="">
          <p class="video_title">メロメロン</p>
          <p class="video_desc">これなんだと思います？当と思います</p>
        </a></li>
        <li><a href="">
          <img src="" alt="">
          <p class="video_title">メロメロン</p>
          <p class="video_desc">これなんだと思います？当と思います</p>
        </a></li>
      </ul>
      <div class="more_video">查看更多</div>
    </div>
    <div class="company_profile"  id="company_profile">
      <span></span>
      <h2 class="titles">公司&团队介绍<span></span></h2>
      <p>Groupy团队秉着对日本市场一如既往的热情与坚持的态度<br>抓住日本粉丝对偶像高消费的市场，从强烈的爱豆应援文化切入，带着共同的目标<br>致力打造一个可以让爱豆在线上曝光，展示才艺，获得<b>粉丝打赏和会费分成的社群平台</b></p>
      <div class="company_desc">
        <span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        // imgs: '../images/bg.png',
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .titles {
      font-size: 26px;
      color: #00B4BC;
      letter-spacing: 6.93px;
      position: relative;
      span {
        position: absolute;
        display: block;
        width: 124px;
        height: 6px;
        background: #FF8500;
        opacity: 0.5;
        left: 50%;
        top: 50%;
        margin-left: -31px;
        margin-top: 3px;
      }
    }
    .desc {
      margin-bottom: 52px;
      font-size: 20px;
      color: #FC4083;
    }
  .banner {
    background-image: url(../images/index.png);
    background-position: 0 -80px;
    width: 100%;
    height: calc(100vw * 0.290625);
    max-height: 558px;
    background-size: 100% auto;
  }
  .product_description {
    padding: 30px 0;
    background: #F5FFFF;
    padding-bottom: 80px;
    >* {
      max-width: 1200px;
      margin: 0 auto;
    }
    h4 {
      margin-bottom: 52px;
    }
    .features {
      position: relative;
        height: 469px;
        width: 553px;
        margin: 0 auto;
        background-image: url(../images/index.png);
        background-position: 0 -662px;
      p {
        position: absolute;
        font-size: 16px;
        color: #787878;
        line-height: 24px;
        width: 388px;
        text-align: left;
      }
    }

  }
  .joinUs {
    background: #4CC0C4;
    padding: 60px 0 169px;
    position: relative;
    >span {
      position: absolute;
    }
    >span:first-child {
      width: 200px;
      height: 150px;
      bottom: 0;
      left: 50%;
      margin-left: -750px;
        background-image: url(../images/index.png);
        background-position: 0 -1649px;
    }
    >span:nth-child(2) {
      width: 200px;
      height: 21px;
      bottom: 120px;
      left: 50%;
      margin-left: -540px;
        background-image: url(../images/index.png);
        background-position: 0 -1323px;
    }
    >span:nth-child(3) {
      width: 200px;
      height: 33px;
      bottom: 70px;
      left: 50%;
      margin-left: 520px;
        background-image: url(../images/index.png);
        background-position: 0 -1389px;
    }
    h2,h4 {
        color: #fff;
    }
    .idol_recruit {
      position: relative;
      span:first-child {
        display: inline-block;
        height: 134.4px + 4px + 5px;
        width: 241px + 41px;
        background-image: url(../images/index.png);
        background-position: 0 -1168px;
      }
      span:last-child {
        position: absolute;
        left: 50%;
        top: 75px;;
        width: 58px;
        height: 21px;
        margin-left: 400px;
        background-image: url(../images/index.png);
        background-position: 0 -1323px;
      }
    }
    .join_way {
      overflow: hidden;
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 38px;
      position: relative;
      >span {
        position: absolute;
        left: 50%;
        top: 15px;
        margin-left: 400px;
        width: 110px;
        height: 79px;
        background-image: url(../images/index.png);
        background-position: 0 -3293px;
      }
      .left,.right {
        float: left;
        padding-top: 60px;
      }
      .left {
        width: 50%;
      }
      h2 {
        font-size: 24px;
        position: relative;
        margin-bottom: 6px;
        span {
          position: absolute;
          display: block;
          width: 305px;
          height: 6px;
          background: #FF8500;
          opacity: 0.5;
          top: 22px;
          left: 50%;
          margin-left: -155px;
        }
      }
      h4 {
        font-size: 18px;
      }
      .right {
        background: #FFFFFF;
        border: 7px solid #94D8DB;
        color: #00B4BC;
        padding: 21px 31px;
        width: 458px;
        text-align: left;
        box-sizing: border-box;
        h3 {
          font-size: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid #00B4BC;
        }
        .recruit_condition {
          overflow: hidden;
          font-size: 20px;
          font-weight: 600;
          padding: 24px 0;
          .condition_left {
            float: left;
            margin-right: 29px;
          }
          .condition_right {
            float: left;
            li {
              padding-left: 47px;
              background-image: url(../images/index.png);
              background-position: 7.5px -1545px;
              &:not(:first-child) {
                margin-top: 16px;
              }
            }
          }
        }
        .contact_email {
          span:first-child {
            background: #00B4BC;
            border-radius: 41px;
            display: inline-block;
            width: 69px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin-right: 43px;
            color: #fff;
          }
          span:last-child {
            font-size: 25px;
            color: #FC4083;
          }
        }
      }
    }
    p {
      text-align: left;
      max-width: 810px;
      margin: 0 auto;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .videos {
    position: relative;
    background: #FFF6FA;
    padding: 42px 0 58px;
    >span {
      position: absolute;
    }
    >span:first-child {
        left: 50%;
        top: 90px;
        width: 58px;
        height: 21px;
        margin-left: 550px;
        background-image: url(../images/index.png);
        background-position: 0 -1353px;
    }
    >span:nth-child(2) {
        left: 50%;
        top: 750px;
        width: 58px;
        height: 21px;
        margin-left: -750px;
        background-image: url(../images/index.png);
        background-position: 0 -1353px;
    }
    >span:nth-child(3) {
        left: 50%;
        top: 0;
        width: 140px;
        height: 70px;
        margin-left: 580px;
        background-image: url(../images/index.png);
        background-position: 0 -2120px;
    }
    >span:nth-child(4) {
        left: 50%;
        bottom: 0;
        width: 169px;
        height: 100px;
        margin-left: 500px;
        background-image: url(../images/index.png);
        background-position: 0 -1886px;
    }
    h2 {
      color: #FB0730;
      letter-spacing: 0;
      span {
        opacity: 0.5;
        background: #FFD300;
        width: 100px;
        margin-left: -50px;
      }
    }
    h4 {
      color: #00B4BC;
    }
    .videos_list {
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      li {
        float: left;
        padding-bottom: 42px;
        text-align: left;
        &:not(:nth-child(3n - 2)) {
          margin-left: 54px;
        }
        a {
          display: block;
          img {
            width: 360px;
            height: 202.5px;
            margin-bottom: 17px;
            display: block;
          }
          .video_title {
            font-size: 20px;
            color: #00B4BC;
          }
          .video_desc {
            font-size: 16px;
            color: #666666;
          }
        }
      }
    }
    .more_video {
      width: 229px;
      height: 69px;
      line-height: 61px;
      padding-left: 61px;
      box-sizing: border-box;
      margin: 0 auto;
      border: 4px solid #FB0730;
      font-size: 26px;
      color: #FB0730;
      background-image: url(../images/index.png);
      background-position: 43px -1570px;
    }
  }
  .company_profile {
    background-color: #64BDE3;
    padding: 58px 0 70px;
    color: #fff;
    position: relative;
    >span {
      position: absolute;
      left: 50%;
      top: 0;
      width: 163px;
      height: 100px;
      background-image: url(../images/index.png);
      background-position: 0 -2252px;
      margin-left: - 700px;
    }
    h2 {
      color: #fff;
      letter-spacing: 0;
      margin-bottom: 22px;
      span {
        width: 178px;
        margin-left: -89px;
        background-color: #277597;
      }
    }
    p {
      font-size: 18px;
      line-height: 34px;
      margin-bottom: 67px;
    }
    .company_desc {
      overflow: hidden;
      max-width: 1120px;
      margin: 0 auto;
      span {
        float: left;
        background-image: url(../images/index.png);
      }
      span:first-child {
        width: 448px;
        height: 435px;
        background-position: 0 -2390px;
      }
      span:last-child {
        float: right;
        width: 532px;
        height: 240px;
        background-position: 0 -2860px;
        margin-top: 95px;
      }
    }
  }
  @media screen and (max-width: 980px) {
    .videos .videos_list {
      max-width: 1200px;
      li {
        &:not(:nth-child(3n - 2)) {
          margin-left: 40px;
        }
        a {
          width: 300px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
