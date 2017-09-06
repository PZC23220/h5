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
        <a class="registered" @click="dialogVisible = true">注 册</a>
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
    <el-dialog
    title="请先登录"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    size="tiny">
    <div class="login_sns">
      <span href="" class="twitter" @click="twitterLogin()"></span>
      <span href="" class="facebook" @click="facebookLogin()"></span>
    </div>
  </el-dialog>
</div>
</template>

<style type="text/css" lang="scss" scoped>
  @import '../styles/common.scss';
  .registered {
    padding: 2.5px 10px;
    border-radius: 4px;
    font-size: 12px;
    display: inline-block;
    border: 1px solid #52d2fc;
    background: #fff;
    color: #52d2fc;
    cursor: pointer;
    margin-top: 25px;
    margin-left: 10px;
  }
  .login_sns {
    text-align: center;
    .facebook,.twitter {
      display: inline-block;
      width: 51px;
      height: 51px;
      background-image : url(../images/index.png);
      background-position: 0 -3224px;
      cursor: pointer;
    }
    .twitter {
      margin-right: 43.2px;
      background-image : url(../images/index.png);
      background-position: 0 -3164px;
    }
  }
</style>

<script>
  import http from '../js/http.js';
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
        },
        dialogVisible: false
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
      },
      facebookLogin() {
        var self= this;
        window.fbAsyncInit = function() {
            FB.init({
              appId            : '310622289379360',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v2.10'
            });
            // FB.AppEvents.logPageView();
            FB.getLoginStatus(function(response) {
              console.log(response)
            if (response.status === 'connected' || response.status === 'not_authorized') {
              console.log(response);
              FB.api('/me', {fields: 'name'}, function(response) {
                // console.log(response);
                var obj = {
                    snsUid:response.id,
                    snsPlatform:'fb',
                    nickname:response.name,
                    avatar:'https://graph.facebook.com/'+ response.id +'/picture?type=large', 
                    sign:'',
                    introduce:''
                };
                self.login(obj);
              });
            } else {
              FB.login(function(response) {
                FB.api('/me', {fields: 'name'}, function(response) {
                    console.log(response);
                    var obj = {
                        snsUid:response.id,
                        snsPlatform:'fb',
                        nickname:response.name,
                        avatar:'https://graph.facebook.com/'+ response.id +'/picture?type=large', 
                        sign:'',
                        introduce:''
                    };
                    self.login(obj);
                });
              }, {scope: 'public_profile'});
            }
          });
        };
        (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "http://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      },
      twitterLogin() {
        var self = this;
        window.twttr = (function(d, s, id) {
             var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
              if (d.getElementById(id)) return t;
              js = d.createElement(s);
              js.id = id;
              js.src = "https://platform.twitter.com/widgets.js";
              fjs.parentNode.insertBefore(js, fjs);

              t._e = [];
              t.ready = function(f) {
                  t._e.push(f);
              };
              return t;
        }(document, "script", "twitter-wjs"));
        var log = console.log;
        hello.init({'twitter': '6YNVtKZPe9RhAI32wKCvfp8RN'},{
          oauth_proxy: 'https://auth-server.herokuapp.com/proxy' 
        });
        function login_twitter(network){  //登录方法，并将twitter 作为参数传入
              // Twitter instance
              var twitter = hello(network);
              // Login
              twitter.login().then(function(r){
                  // Get Profile
                  return twitter.api('/me');
              },log).then(function(p){
                  //已获取用户信息，在此处理                   
                  // var response = {'id':p.id,'name':p.name,'picture':p.thumbnail,'link':'https://twitter.com/'+p.screen_name,'login_type':'twitter'};
                  // console.dir(response);
                  var obj = {
                    snsUid:p.id,
                    snsPlatform:'tw',
                    nickname:p.name,
                    avatar:p.thumbnail, 
                    sign:'',
                    introduce:''
                };
                self.login(obj);
              }, log );
        }
        login_twitter('twitter');
      },
      login(obj) {
        var self = this;
        http.post('/groupyuser/loginFans?tokenize=true',JSON.stringify(obj)).then(function(res){
            if(res.status == 200) {
                let href_ = 'http://' + location.host + '/index_japanese/japanese_registered?token=' + res.data.accessToken;
                location.href = href_;
                // self.getShows(res.data.accessToken);
            }
        }).catch(function(err){
            self.$message.error('服务器错误，请稍后再试');
        });
      }
    },
    created: function() {
    }
  }
</script>
