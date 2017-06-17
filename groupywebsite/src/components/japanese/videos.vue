<template>
  <div class="video">
    <div class="videos">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h2 class="titles">メッセージ動画<span></span></h2>
      <h4 class="desc">アイドルからあなたにメッセージを残したって？さっさとチェックしよう！</h4>
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
      color: #FB0730;
      letter-spacing: 0;
      position: relative;
      span {
        position: absolute;
        display: block;
        width: 180px;
        height: 28px;
        background: #FF8500;
        opacity: 0.3;
        left: 50%;
        top: 5px;
        margin-left: -88px;
      }
    }
    .desc {
      margin-bottom: 52px;
      font-size: 20px;
      color: #FC4083;
    }
  .videos {
    position: relative;
    background: #FFF6FA;
    padding: 42px 0 400px;
    >span {
      position: absolute;
    }
    >span:first-child {
        left: 50%;
        top: 90px;
        width: 58px;
        height: 21px;
        margin-left: 600px;
        background-image: url(../../images/index.png);
        background-position: 0 -1353px;
    }
    >span:nth-child(2) {
        left: 50%;
        top: 750px;
        width: 58px;
        height: 21px;
        margin-left: -750px;
        background-image: url(../../images/index.png);
        background-position: 0 -1353px;
    }
    >span:nth-child(3) {
        left: 50%;
        top: 90px;
        width: 60px;
        height: 32px;
        margin-left: -680px;
        background-image: url(../../images/index.png);
        background-position: 0 -1438px;
    }
    >span:nth-child(4) {
        left: 50%;
        top: 850px;
        width: 60px;
        height: 32px;
        margin-left: 650px;
        background-image: url(../../images/index.png);
        background-position: 0 -1438px;
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
