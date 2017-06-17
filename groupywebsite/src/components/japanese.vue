<template>
  <div class="index">
    <div class="banner"><img src="../images/banner_japanese.png" alt=""></div>
    <div class="product_description" id="product_description">
      <h2 class="titles" style="letter-spacing: 0;margin-bottom: 22px;"><i style="width: 180px;margin-left: -13px;"></i><span>アイドルとファンをしっかり繋がるアプリ</span></h2>
      <h4 class="desc">ひと押しだけで応援できるから、アイドルの成長をより身近に守ろう。更にメンバーのみの限定情報も！</h4>
      <div class="features">
        <img src="../images/features_japanese.png" alt="">
        <p style="left: -400px; top: 163px;text-align: right;">連続ログインしたりシェアしたりすれば<br>コインをボーナスとして貰えます！<br>貯めしてメンバーシップに登録かアイドルにプレゼントしよう</p>
        <p style="left: -400px; bottom: 30px;text-align: right;"><b>応援の活動量を基準にファンのレベルが表示されます<br>アイドルを守る同時に自分のレベルアップを達成しよう！</b></p>
        <p style="right: -220px; top: 20px;">アイドルが投稿した日常やパフォーマンスが即時流れます<br>空いた時間にチェックして応援しよう</p>
        <p style="right: -405px; top: 163px;">アイドルの配信にハートかギフトで応援して<br>ランキング上位に入らせよう<br>ただでハートをいっぱい貰えしてアイドルの注目度を高めよう！</p>
        <p style="right: -340px; bottom: 30px;"> アイドルのメンバーにご登録後、アイドルの限定投稿・生配信が見れます<br>更にアイドルに会えるかも！</p>
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
          <h2 style="width: 505px;"><span> お好きなアイドルに大人気になってほしい？？</span></h2>
          <h4 style="margin-bottom: 55px;">Groupyに推薦して、業界トップになるキッカケを作ってあげよう！</h4>
          <h2 style="width: 458px; border-color: #ff8500;"><span>新しい一歩を踏みだそうとしています？？</span></h2>
          <h4>Groupyに応募して、ファンとよりしっかり結んで世間に羽ばたこう！</h4>
        </div>
        <div class="right">
          <h3>応募方法</h3>
          <div class="recruit_condition">
            <ul class="condition_right">
              <li><b>推薦コメント</b>（他薦）<b>か自己紹介</b>（自薦）</li>
              <li><b>Twitter/SNSのアカウント</b></li>
              <li><b>30秒以内のファンへの招待動画</b></li>
              <p style="font-size: 20px;font-weight: 500;padding-left: 30px;">（自薦の場合必須）</p>
            </ul>
          </div>
          <div class="contact_email">上記の応募資料を<i>wanted@groupy.vip</i>までご送付くださいますようお願い申し上げます。</div>
        </div>
      </div>
    </div>
   <!--  <div class="videos">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h2 class="titles">ファンへの招待動画<span></span></h2>
      <h4 class="desc">あなたにメッセージを！一緒にGroupyにて再スタートしよう！</h4>
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
      <div class="more_video">すべて表示</div>
    </div> -->
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/index.scss';
  .titles {
    width: 626px;
    border: none;
    margin-bottom: 10px;
  }
  .joinUs .idol_recruit span:first-child {
    background-image: url(../images/idol_japanese.png) !important;
    background-position: 0 0 !important;
  }
  .joinUs .join_way .right {
    padding: 20px 30px;
    width: 531px;
  }
  .joinUs .join_way .right .recruit_condition .condition_right li {
    padding-left: 30px;
    background-position: 0 -1545px;
  }
  .contact_email {
    font-size: 20px;
    color: #00B4BC;
  }
  .contact_email i {
    font-size: 25px;
    color: #FC4083;
    padding: 0 10px;
    font-weight: 600;
  }
  .videos h2 span {
    margin-left: -110px !important;
    width: 230px !important;
  }
  @media screen and (max-width: 980px) {
    .joinUs .join_way .left {
      clear: both;
      float: none;
      margin: 0 auto;
      width: 600px;
    }
    .joinUs .join_way .right {
      clear: both;
      float: none;
      margin: 50px auto 0;
    }
  }
</style>
