<template>
  <div id="app">
    <header class="header">
      <div class="header_content">
          <div class="logo"></div>
          <div class="list">
            <a href="#home" @click="to_maoPoint()">
              <h3>ホーム</h3>
              <span>HOME</span>
            </a>
            <a href="#product" @click="to_maoPoint()">
              <h3>サービス</h3>
              <span>PRODUCT</span>
            </a>
            <a href="#introduction" @click="to_maoPoint()">
              <h3>会社概要</h3>
              <span>INTRODUCTION</span>
            </a>
            <a href="#news" @click="to_maoPoint()">
              <h3>お知らせ</h3>
              <span>NEWS</span>
            </a>
            <a href="#contact" class="last" @click="to_maoPoint()">
              <h3>お問合せ</h3>
              <span>CONTACT</span>
            </a>
          </div>
      </div>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>     
  </div>
</template>
<script>
  export default {
    methods: {
      to_maoPoint() {
        if(!this.$route.path || this.$route.path =='/index' || this.$route.path == '/') {
          console.log(this.$route.path);
          return;
        }else {
          location.href = 'http://' +location.host;
        }
      }
    },
    created() {

    }
  }
</script>

<style lang="scss">
 @import './style/reset.css';
  .header {
    background: #22252D;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 3;
    .header_content {
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      padding: 16px 0 17px;
    }
      color: #fff;
      a {
        color: #fff;
        display: block;
        float: left;
        padding: 0 39.5px;
        text-align: center;
      }
      .logo {
        width: 66px;
        height: 66px;
        float: left;
        background: url(./img/Artboard.png);
        margin-right: 9px;
      }
      .list {
        float: left;
        h3 {
          font-size: 22px;
        }
        span {
          font-size: 14px;
        }
      }
      .last {
        margin-left: 275px;
      }
  }
  .content {
    position: fixed;
    left: 0;
    width: 100%;
    top: 99px;
    height: calc( 100vh - 99px);
    overflow: auto;
    overflow-x: hidden;
  }
  // @font-face{
  //     font-family: 'bige';
  //     src: url('font/ruizibige.eot'); /* IE9 兼容模式 */
  //     src: url('font/ruizibige.eot?#iefix') format('embedded-opentype'), /*IE6-IE8 */
  //         url('font/ruizibige.woff') format('woff'), /*标准浏览器*/
  //         url('font/ruizibige.ttf')  format('truetype'), /*Safari, Android, iOS*/
  //         url('font/ruizibige.svg#ruizibige') format('svg'); /*Legacy iOS*/
  // }

</style>
