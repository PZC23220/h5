<template>
  <div class="index">
    <swiper :options="swiperOption" ref="mySwiper" class="banner_container" id="home">
        <!-- slides -->
        <swiper-slide>
            <img class="banner" src="../img/banner_2.png" alt="">
        </swiper-slide>
        <swiper-slide>
            <img class="banner" src="../img/banner_1.png" alt="">
        </swiper-slide>
        <swiper-slide>
            <img class="banner" src="../img/banner_3.png" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div id="product">
      <h3 class="title"></h3>
      <h4 class="subtitle">サービス</h4>
      <div class="left">
        <img src="../img/NewsJet.png" alt="">
        <div class="logo"></div>
        <p>たった一分でトップニュースを<i style="color:#F3BB23;">一瞬チェック</i>できる<br><i style="color: #FF9600;">無料</i>のニュースアプリ</p>
        <a href="http://app.newsjet-inc.com/" target="_blank" class="btn">公式サイト<span></span></a>
      </div>
      <div class="border"><span style="left: 0;top: 0;">2016.08<i style="margin-left: 13px;"></i></span><p></p><span style="right: 0;bottom: 0;"><i style="margin-right: 14.5px;margin-left: 0.5px;"></i>2017.06</span></div>
      <div class="right">
        <div class="logo"></div>
        <p>ファンが共にアイドルを<i style="color:#FC6B9F;">応援</i>できる<br><i style="color: #00B4BC;">メンバシップ制</i>アプリ</p>
        <a href="http://groupy.vip" target="_blank" class="btn">公式サイト<span></span></a>
        <img src="../img/Groupy.png" alt="">
      </div>
    </div>
    <div id="introduction">
      <div class="introduction_content">
        <h3 class="title"></h3>
        <h4 class="subtitle">会社概要</h4>
        <div class="left">
          <ul class="introduction_list">
            <li><h5><span></span>社名</h5><p>株式会社NewsJet</p></li>
            <li><h5><span></span>設立日</h5><p>2017年3月29日</p></li>
            <li><h5><span></span>資本金</h5><p>500万円</p></li>
            <li><h5><span></span>事業内容</h5><p>アプリケーションの開発・運営</p></li>
            <li><h5><span></span>所在地</h5><p>東京都墨田区両国2丁目2-10</p></li>
            <li><h5><span></span>本社名</h5><p>広州市雲動科技有限公司</p></li>
            <li><h5><span></span>所在地</h5><p>中国広東省広州市天河区中山大道西89番天河ソフトウェアパークA#16F北9-12</p></li>
            <li><h5><span></span>提携パートナー</h5><p>共同通信、ノアドット株式会社、株式会社ワードリーフ、聯合ニュース、他</p></li>
          </ul>
        </div>
        <div class="right">
          <div>(支社)株式会社NewsJet<span></span></div>
          <img src="../img/pic_map.png" alt="">
          <div><span></span>(本社)広州市雲動科技有限公司</div>
        </div>
      </div>
    </div>
    <div id="news" class="news">
      <h3 class="title"></h3>
      <h4 class="subtitle">お知らせ</h4>
      <ul class="news_list">
        <li>
          <h4><span></span>2017.07.02</h4>
          <h3><router-link to="/detail?id=6">「Groupy」ホームページリリースのお知らせ</router-link></h3>
        </li>
        <li>
          <h4><span></span>2017.07.01</h4>
          <h3><router-link to="/detail?id=5">「NewsJet」サービス一時停止のお知らせ！</router-link></h3>
        </li>
        <li>
          <h4><span></span>2017.06.06</h4>
          <h3><router-link to="/detail?id=4">新規アプリ「Groupy」開発開始！</router-link></h3>
        </li>
        <li>
          <h4><span></span>2017.01.25</h4>
          <h3><router-link to="/detail?id=3">「NewsJet」の提携メディアが100媒体突破！</router-link></h3>
        </li>
        <li>
          <h4><span></span>2016.10.25</h4>
          <h3><router-link to="/detail?id=2">いよいよ「NewsJet」版もリリース！</router-link></h3>
        </li>
      </ul>
      <router-link class="btn" to="/list">もっと見る<span></span></router-link>
    </div>
    <div id="contact">
      <div class="contact_content">
        <h3 class="title"></h3>
        <h4 class="subtitle">お問合せ</h4>
          <p>ご意見、ご質問のお申出は、下記の窓口までお願い致します。</p>
          <p style="font-size: 22px;margin-top: 38px;">E-mail：contact@newsjet-inc.com<br><br><i style="font-size: 18px;">業務提携･お仕事の依頼等はこちらの専用窓口までお願い致します。</i><br><br>Business: business@newsjet-inc.com</p>
          <p style="background: #FFFFFF;width: 88px;height: 6px;margin: 56px auto 0;"></p>
      </div>
    </div>
    <footer class="footer">Powered by Newsjet Inc. .</footer>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default {
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          // grabCursor : true,
          setWrapperSize :true,
          // autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          loop : true,
          observeParents:true,
          debugger: true,
        },
      }
    },
    components: {
        swiper,
        swiperSlide
      }
  }
</script>
<style lang="scss">
 @import '../style/common.scss';
 .banner {
  width: 100%;
 }
  #product {
    max-width: 1200px;
    padding: 46px 0 24px;
    margin: 0 auto;
    overflow: hidden;
    .left,.right {
      width: 476px;
      text-align: center;
      float: left;
      img {
        margin: 0 auto;
        display: block;
      }
      .logo {
        width: 90px;
        height: 110px;
        background: url(../img/Artboard.png);
        margin: 0 auto 15px;
      }
      .btn {
        width: 150px;
        height: 43px;
        box-sizing: border-box;
        line-height: 43px;
        border: 2px solid #666666;
        margin: 40px auto;
        color: #666;
        display: block;
        span {
          display: inline-block;
          width: 19px;
          height: 17px;
          background: url(../img/Artboard.png);
          background-position: 0 -518px;
          float: right;
          margin-right: 15px;
          margin-top: 13px;
        }
      }
    }
    .title {
      background: url(../img/Artboard.png);
      background-position: 0 -89px;
      width: 300px;
      height: 38px;
      margin: 0 auto;
    }
    .subtitle {
      height: 38px;
      text-align: center;
      color: #F3B714;
      font-size: 28px;
      margin-bottom: 65px;
    }
    .left .logo {
      background-position: 0 -275px;
    }
    .right .logo {
      background-position: 0 -405px;
    }
    .border {
      width: 154px;
      float: left;
      position: relative;
      padding: 8px 0;
      p {
        width: 2px;
        height: 415px;
        background: #E5E5E5;
        margin: 0 auto;
      }
      span {
        position: absolute;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: #888888;
        width: 81.5px;
        i {
          display: inline-block;
          width:8px;
          height: 8px;
          border-radius: 50%;
          background: #CFCFCF;
        }
      }
    }
  }
  #introduction {
    .introduction_content {
        max-width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }
    background: url(../img/bg_introduction.png);
    background-size: 100% 100%;
    padding: 55px 0 60px;
    color: #fff;
    .title {
      background: url(../img/Artboard.png);
      background-position: 0 -137px;
      width: 456px;
      height: 38px;
      margin: 0 auto;
    }
    .subtitle {
      height: 38px;
      text-align: center;
      font-size: 28px;
      color: #E0F7FF;
       margin-bottom: 55px;
    }
    .left {
      width: 60%;
      float: left;
    }
    .right {
      width: 40%;
      float: left;
      div:first-child {
        width: 171px;
        margin-left: calc(1200px * 0.23);
        text-align: center;
        span {
          display: block;
          width: 16px;
          height: 15.1px;
          margin: 5px auto; 
          background: url(../img/Artboard.png);
          background-position: 0 -635px;
        }
      }
      img {
        width: 100%;
      }
      div:last-child {
        width: 219px;
        margin-left: calc(1200px * 0.08);
        text-align: center;
        span {
          display: block;
          width: 16px;
          height: 15.1px;
          margin: 0 auto 5px; 
          background: url(../img/Artboard.png);
          background-position: 0 -603px;
        }
      }
    }
    .introduction_list {
      li {
        overflow: hidden;
        padding: 14px 0;
      }
      h5 {
        float: left;
        width: 135px;
        font-size: 16px;
        margin-right: 52px;
        span {
          float: left;
          display: block;
          background: #FFFFFF;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 11px;
          margin-top: 5px;
        }
      }
      p {
        float: left;
        font-size: 18px;
        max-width: 420px;
      }
    }
  }
  #contact {
    background: url(../img/bg_contact.png);
    background-size: 100% 100%;
    padding: 47px 0 87px;
    .contact_content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }
    .title {
      background: url(../img/Artboard.png);
      background-position: 0 -235px;
      width: 250px;
      height: 38px;
      margin: 0 auto;
    }
    .subtitle {
      height: 38px;
      text-align: center;
      font-size: 28px;
      color: #EAFFFF;
       margin-bottom: 55px;
    }
  }
  @media screen and (max-width: 980px) {
    #product,#contact, #introduction .introduction_content,#news{
      max-width: 980px;
    }
    #product .left,#product .right {
      width: 400px;
    }
    #introduction .right div:first-child {
      margin-left: calc(980px * 0.22);
    }
    #introduction .right div:last-child {
      margin-left: calc(980px * 0.06);
    }
    #introduction .introduction_list li {
      padding-left: 12px;
    }
    #introduction .introduction_list p {
      max-width: 380px;
    }
    #news {
      padding-left: 12px;
      padding-right: 12px;
      box-sizing: border-box;
    }
    #news .news_list h3 {
      max-width: 810px;
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.swiper-pagination-bullet {
  opacity: 0.6;
  background: #FFFFFF;
  width: 10px;
  height: 10px;
}
.swiper-pagination-bullet-active {
  opacity: 0.8;
  background: #FC4083;
}
</style>
