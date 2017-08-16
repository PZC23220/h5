<template>
  <div class="index">
    <div class="banner"><img src="../images/banner_2.png" alt=""></div>
    <div class="product_description" id="product_description">
      <h2 class="titles" style="border:none;margin-bottom: 22px;"><i></i><span style="width: 398px;">一个与爱豆亲密互动的平台</span></h2>
      <h4 class="desc">会员独有的<b>私密状态</b>查看，<b>一键应援</b>，共同守护爱豆的成长</h4>
      <div class="features">
        <img src="../images/features_chinese.png" alt="">
        <p style="left: -400px; top: 163px;text-align: right;"><b>每日签到、完成转发</b>等任务可获得G币，<br>直接换购会员加入社群或者买礼物送给爱豆！</p>
        <p style="left: -400px; bottom: 30px;text-align: right;">Groupy设置了不同的<b>粉丝等级</b>，<br><b>消费G币，应援爱豆成长</b>都可以让你不断升级。<br>快来做爱豆的首个骨灰级守护者吧！</p>
        <p style="right: -210px; top: 30px;">爱豆在Groupy的内容和<b>信息状态</b>都会<b>实时同步</b>，<br>打开Groupy即可轻松查看！</p>
        <p style="right: -400px; top: 163px;">观看爱豆视频<b>送人气</b>或者直接<b>给爱豆应援</b>，<br>轻松助力爱豆上Groupy的每日人气榜。<br>人气送出后你还可以通过完成观看任务让血槽恢复哦！</p>
        <p style="right: -340px; bottom: 30px;">成为爱豆的VIP会员，<br>优先查看爱豆<b>私密状态</b>，参加爱豆线下<b>粉丝聚会</b>，<br>获得爱豆私密交流和<b>直播互动</b>！</p>
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
        <div class="left" style="padding-top:0;">
          <!-- <h2><span>想让你喜欢的爱豆获得全日本的喜爱？</span></h2>
          <h4 style="margin-bottom: 55px;">把她推荐到Groupy，为她创造迈向事业巅峰的契机吧！</h4>
          <h2 style="width: 312px;border-color: #FF8500;"><span>正在寻找一个新的出发点吗？</span></h2>
          <h4>来入驻Groupy，和粉丝更紧密地相连在爱豆界展翅高飞！</h4> -->
          <img src="../images/pic_idol.png" width="85%">
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
            <span>发送至</span><span>wanted@groupy.cn</span>
          </div>
        </div>
      </div>
    </div>
    <div class="videos" id="videos">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h2 class="titles" style="width: 110px;border:none;"><i style="margin-left: -50px;width: 100%;background: #FFD300;"></i><span>爱豆视频</span></h2>
      <h4 class="desc">来自爱豆的邀请函！陪着爱豆在Groupy重新出发</h4>
      <ul class="videos_list">
         <!-- <li style="width: 30%;">
          <video id="video1" playsinline preload="load" controls src="/static/video/video1.mp4" width="100%">
            您的浏览器不支持HTML5
        </video>
        </li>
        <li style="width: 30%;">
          <video id="video2" playsinline preload="load" controls src="/static/video/video2.mp4" width="100%">
            您的浏览器不支持HTML5
        </video>
        </li>
        <li style="width: 30%;">
          <video id="video3" playsinline preload="load" controls src="/static/video/video3.mp4" width="100%">
            您的浏览器不支持HTML5
        </video>
        </li>
        <li style="width: 30%;">
          <video id="video2" playsinline preload="load" controls src="/static/video/video4.mp4" width="100%">
            您的浏览器不支持HTML5
        </video>
        </li>
        <li style="width: 30%;">
          <video id="video2" playsinline preload="load" controls src="/static/video/video5.mp4" width="100%">
            您的浏览器不支持HTML5
        </video>
        </li>
        <li style="width: 30%;">
          <video id="video2" playsinline preload="load" controls src="/static/video/video6.mp4" width="100%">
            您的浏览器不支持HTML5
        </video>
        </li> -->
        <li><img src="../images/1.2.png"></li>
        <li><img src="../images/1.4.png"></li>
        <li><img src="../images/1.3.png"></li>
        <li><img src="../images/1.5.png"></li>
      </ul>
      <!-- <div class="more_video">查看更多</div> -->
    </div>
    <div class="company_profile"  id="company_profile">
      <span></span>
      <h2 class="titles"><span>公司&团队介绍</span></h2>
      <p>Groupy团队秉着对爱豆市场一如既往的热情与坚持的态度<br>抓住粉丝对偶像高消费的市场，从强烈的爱豆应援文化切入，带着共同的目标<br>致力打造一个可以让爱豆在线上曝光，展示才艺，获得<b>粉丝打赏和会费分成的社群平台</b></p>
      <div class="company_desc">
        <span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // imgs: '../images/bg.png',
        msg: 'Welcome to Your Vue.js App',
        idx: 0
      }
    },
    mounted() {
      // var self = this;
      // var myVideo = document.getElementById('video1')//获取video元素
      // var myVideo2 = document.getElementById('video2')//获取video元素
      //  var _box = document.querySelector('.main');
      //  var _con = document.querySelector('.videos_list');
      //  _box.addEventListener('scroll', () => {
      //         if(_con.getBoundingClientRect().bottom >450 &&  _con.getBoundingClientRect().bottom < 1150 && self.idx <1) {
      //           self.idx++;
      //             myVideo.play()
      //             setTimeout(() => {
      //               myVideo2.play()
      //             },24000)
      //         }
      //     }, false)
      //  myVideo.onplay = function() {
      //   myVideo2.pause()
      //  }
      //  myVideo2.onplay = function() {
      //   myVideo.pause()
      //  }
      //  myVideo.onended = function() {
      //   myVideo.play()
      //   myVideo.pause()
      //  }
      //  myVideo2.onended = function() {
      //   myVideo2.play()
      //   myVideo2.pause()
      //  }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  @import '../styles/index.scss';
  @media screen and (max-width: 980px) {
      .videos_list li {
        width: 100% !important;
        a {
          width: 100% !important;
        }
      }
  }
</style>
