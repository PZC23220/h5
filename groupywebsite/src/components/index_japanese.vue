<template>
  <div id="index_japanese">
    <header class="header">
    <div class="header_content">
      <a href="/" class="logo"></a>
      <ul class="menuList">
        <li><a href="#product_description" @click="to_maoPoint()" style="color: #FC4083;">{{commentWords.product}}</a></li>
        <li><a href="#joinUs" @click="to_maoPoint()" style="color: #FF8500;">{{commentWords.join}}</a></li>
        <!-- <li><a href="#company_profile" @click="to_maoPoint()" style="color: #00B4BC;" v-if="commentWords.company === '公司介绍'">公司介绍</a></li> -->
        <li><a href="#videos" @click="to_maoPoint()" style="color: #666666;">{{commentWords.videos}}</a></li>
        <!-- <li><router-link to="/index_japanese/japanese_registered" style="color: #52d2fc;">参加アイドルの情報登録</router-link></li> -->
       <!--  <li  :class="{'activeIdol':$route.path==='/chinese_idol' || $route.path==='/japanese_idol'}" ><a :href="commentWords.to_idol" style="color: #3CA6D4;">{{commentWords.idol}}</a></li>
        <li  :class="{'activeVideos':$route.path==='/chinese_videos' || $route.path==='/japanese_videos'}"><a :href="commentWords.to_videos" style="color: #666666;">{{commentWords.videos}}</a></li> -->
      </ul>
      <!-- <div class="language"><router-link to="/index_chinese">中文</router-link><router-link to="/index_japanese" class="active">日本語</router-link></div> -->
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

<style type="text/css" lang="scss" scoped>
  @import '../styles/common.scss';
</style>

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
          location.href = 'http://' +location.host + '/index_japanese/japanese';
        }
      }
    },
    created: function() {
    }
  }
</script>
