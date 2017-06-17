<template>
  <div class="idol">
    <div class="idol_join">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
        <h2 class="titles">登場アイドル<span></span></h2>
        <h4 class="desc">続々追加する予定ですので、これからも要チェック！</h4>
        <ul class="idol_list">
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
          <li><img src="" alt=""><span>メロメロン</span></li>
        </ul>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .titles {
      font-size: 26px;
      color: #00B4BC;
      position: relative;
      span {
        position: absolute;
        display: block;
        width: 160px;
        height: 28px;
        background: #FFD300;
        opacity: 0.3;
        left: 50%;
        top: 4px;
        margin-left: -80px;
        margin-top: 3px;
      }
    }
    .idol_join {
      position: relative;
      background: #F5FFFF;
      padding: 30px 0 80px;
      >span {
      position: absolute;
    }
      >span:first-child {
        left: 50%;
        top: 90px;
        width: 58px;
        height: 21px;
        margin-left: 550px;
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
        top: 50px;
        width: 60px;
        height: 32px;
        margin-left: -640px;
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
    }
    .desc {
      margin-bottom: 40px;
      font-size: 20px;
      color: #FC4083;
    }
    .idol_list {
      overflow: hidden;
      max-width: 1200px;
      margin: 0 auto;
      li {
        float: left;
        position: relative;
        width: 270px;
        margin-bottom: 35px;
        &:nth-child(2n + 2) {
          margin-top: 90px;
        }
        img {
          width: 270px;
          height: 360px;
          display: block;
        }
        span {
          position: absolute;
          left: 0 ;
          bottom: 0;
          width: 100%;
          height: 50px;
          line-height: 50px;
          opacity: 0.8;
          background: #F76C9E;
          color: #fff;
          font-size: 20px;
          padding-left: 12px;
          text-align: left;
          box-sizing: border-box;
        }
        &:not(:nth-child(4n-3)) {
          margin-left: 40px;
        }
      }
    }
</style>
