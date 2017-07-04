<template>
  <div class="list">
    <div class="list_banner"><img src="../img/Banner_2(1).png" alt=""></div>
    <div class="news">
      <p><router-link to="/index">ホーム</router-link> > <i>お知らせ</i></p>
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
        <li>
          <h4><span></span>2016.10.20</h4>
          <h3><router-link to="/detail?id=1">キュレーションサービス「NewsJet」android版先行リリース決定！</router-link></h3>
        </li>
      </ul>
    </div>
    <footer class="footer">Powered by Newsjet Inc. .</footer>
  </div>
</template>
<style lang="scss" scoped>
@import '../style/common.scss';
.list_banner {
  img {
    width: 100%;
  }
}
</style>
