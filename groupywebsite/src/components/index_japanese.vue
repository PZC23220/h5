<template>
  <div id="index_japanese">
    <header class="header">
    <div class="header_content">
      <a href="/" class="logo"></a>
      <ul class="menuList">
        <li><a href="#product_description" @click="to_maoPoint()" style="color: #FC4083;">{{commentWords.product}}</a></li>
        <li><a href="#joinUs" @click="to_maoPoint()" style="color: #FF8500;">{{commentWords.join}}</a></li>
        <li><a href="#company_profile" @click="to_maoPoint()" style="color: #00B4BC;" v-if="commentWords.company === '公司介绍'">公司介绍</a></li>
       <!--  <li  :class="{'activeIdol':$route.path==='/chinese_idol' || $route.path==='/japanese_idol'}" ><a :href="commentWords.to_idol" style="color: #3CA6D4;">{{commentWords.idol}}</a></li>
        <li  :class="{'activeVideos':$route.path==='/chinese_videos' || $route.path==='/japanese_videos'}"><a :href="commentWords.to_videos" style="color: #666666;">{{commentWords.videos}}</a></li> -->
      </ul>
      <div class="language"><router-link to="/index_chinese">中文</router-link><router-link to="/index_japanese" class="active">日本語</router-link></div>
    </div>
    </header>
    <div class="main">
      <router-view></router-view>
      <footer class="footer">
        <div class="links">
          <a href="/" class="logo">Groupy</a>
          <!-- <a href="" class="facebook"></a> -->
          <a href="https://twitter.com/GGroupyyy"  target="_blank" class="twitter"></a>
        </div>
        <ul>
         <!--  <li><a :href="commentWords.to_idol">{{commentWords.idol}}</a></li>
          <li><a :href="commentWords.to_videos">{{commentWords.videos}}</a></li> -->
          <li><router-link to="/index_japanese/japanese_rule">{{commentWords.rule}}</router-link></li>
          <li><router-link to="/index_japanese/japanese_privacy_policy">{{commentWords.privacy_policy}}</router-link></li>
        </ul>
        <div class="desc">Copyright  2017 Groupy Inc. All rights reserved.<br></div>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        language: 'japanese',
        commentWords: {
          product: 'アプリの詳細',
          join: 'アイドル大募集',
          idol: 'アイドル一覧',
          videos: 'ファンへの招待動画',
          rule: '利用規約',
          privacy_policy: 'プライバシーポリシー',
          to_idol: '/japanese_idol',
          to_videos: '/japanese_videos',
          to_rule: '/japanese_rule',
          to_pp: '/japanese_privacy_policy'
        }
      }
    },
    methods: {
      changeLanguage(val) {
        console.log(val,this.language);
        if(val == 'chinese' && location.pathname.substring(0, 8) != '/chinese') {
          this.languageList('chinese');
          location.href = 'http://' + location.host + '/chinese'+location.pathname.substring(9);
          console.log(location.href);
        }else if (val == 'japanese' && location.pathname.substring(0, 9) != '/japanese') {
          this.languageList('japanese');
          location.href = 'http://' + location.host + '/japanese'+location.pathname.substring(8);
          console.log(location.href);        
        }
      },
      languageList(val) {
          if(val == 'chinese') {
            this.language = 'chinese';
            this.commentWords = {
              product: '产品介绍',
              company: '公司介绍',
              join: '爱豆招募',
              idol: '爱豆一览',
              videos: '入驻视频',
              rule: '利用规约',
              privacy_policy: '隐私政策',
              to_idol: '/chinese_idol',
              to_videos: '/chinese_videos',
              to_rule: '/chinese_rule',
              to_pp: './chinese_privacy_policy'
            }
          }else {
            this.language = 'japanese';
            this.commentWords = {
              product: 'アプリの詳細',
              join: 'アイドル大募集',
              idol: 'アイドル一覧',
              videos: 'ファンへの招待動画',
              rule: '利用規約',
              privacy_policy: 'プライバシーポリシー',
              to_idol: '/japanese_idol',
              to_videos: '/japanese_videos',
              to_rule: '/japanese_rule',
              to_pp: './japanese_privacy_policy'
            }
          }
      },
      to_maoPoint() {
        console.log(this.$route.path)
        if(!this.$route.path || this.$route.path =='/index_japanese/japanese' || this.$route.path == '/japanese' || this.$route.path == '/') {
          console.log(this.$route.path);
          return;
        }else {
          location.href = 'http://' +location.host;
        }
      }
    },
    created: function() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../styles/reset.css';
  body {
    // max-width: 1920px;
    // margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .activeVideos {
    border-bottom: 4px solid #666;
  }
  .activeIdol {
    border-bottom: 4px solid #0092D1;
  }
  .header {
    position: fixed;
    top: 0;
    border-top-width: 4px;
    border-top-style: solid;
    border-image: linear-gradient(90deg, #FD4F66 2%, #E34079 22%, #910FB5 44%, #6451CC 64%, #00E5FF 85%, #00AFC4 100%) 30 30;
    width: 100%;
    overflow: hidden;
    // max-width: 1914px;
    box-sizing: border-box;
    height: 80px;
    padding: 10px 0;
    box-shadow: 0 2px 4px 0 rgba(208,208,208,0.50);
    z-index: 1;
    background: #fff;
    >.header_content {
      max-width: 1120px;
      margin: 0 auto;
      overflow: hidden;
    }
    .logo {
      float: left;
      width: 56px;
      height: 56px;
      display: block;
      margin-right: calc(23.5px/2);
      background: url(../images/index.png);
    }
    ul {
      float: left;
      color: #fff;
      li {
        float: left;
        height: 56px;
        line-height: 56px;
        font-size: 20px;
        padding: 0 calc(23.5px/2);
      }
    }
     .language {
      float: right;
      border: 1px solid #FC4083;
      border-radius: 100px;
      width: 145px;
      overflow: hidden;
      margin-top: 10px;
      a {
        color: #FC4083;
        float: left;
        display: block;
        line-height: 26px;
        height: 26px;
        margin: 2px;
        text-align: center;
        &:first-child {
          width: 60px;
        }
        &:last-child {
          width: 137px-60px;
        }
      }
      a.active {
        background: #FC4083;
        border-radius: 100px;
        color: #fff;
      }
     }
  }
  .footer {
    background: #3A525C;
    padding: 34px 0 0;
    >* {
      max-width: 1120px;
      margin: 0 auto;
      text-align: center;
    }
    a {
      color: #fff;
    }
    .links {
      overflow: hidden;
      margin-bottom: 26px;
      .logo {
        background-image : url(../images/index.png);
        display: block;
        float: left;
        width: 103px;
        height: 60px;
        font-size: 24px;
        line-height: 60px;
        padding-left: 64px;
      }
      .facebook,.twitter {
        float: right;
        width: 51px;
        height: 51px;
        background-image : url(../images/index.png);
        background-position: 0 -3224px;

      }
      .twitter {
        margin-right: 43.2px;
        background-image : url(../images/index.png);
        background-position: 0 -3164px;
      }
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        // display: inline-block;
        &:not(:first-child) {
          margin-left: 59px;
        }
        a {
          display: block;
          width: 104px;
          height: 28px;
          line-height: 28px;
          padding-left: 24px;
          background-image: url(../images/index.png);
          background-position: 0 -1618px;
          text-align: left;
        }
      }
    }
    .desc {
      color: #fff;
      margin-top: 20px;
      margin-bottom: 0;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      &:last-child {
        padding-bottom: 30px;
      }
    }
  }
  .main {
    text-align: center;
    position: fixed;
    top: 80px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: calc(100vh - 80px);
  }
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,0.3);
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #FC4083;
    -webkit-box-shadow: inset 0 0 8px #FC4083;
}
::-webkit-scrollbar-thumb:window-inactive {
    background: #FC4083;
}
::-webkit-scrollbar-track-piece {
  width: 6px;
}
::-webkit-resizer {
  width: 6px;
}

</style>
