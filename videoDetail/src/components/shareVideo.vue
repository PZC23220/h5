<template>
    <div class="main">
        <div class="header">
            <img src="../images/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a href="itms-apps://itunes.apple.com/app/id1251249933">インストール</a>
        </div>
        <div class="content" style="height: calc(100vh - 64px);">
            <div class="userinfo">
                <img :src="idol.bgImg" alt="">
                <div class="video_desc">
                    <h3>{{idol.idolNickname}}</h3>
                    <p>{{idol.introduce}}</p>
                </div>
            </div>
            <div class="vip_show" v-show="vipShow">
                <p>{{video.title}}</p>
                <div class="video_banner">
                    <img :src="video.thumbnail" alt="">
                    <img src="../images/icon_menbership.png" alt=""> 
                </div>
                <div class="video_bg"></div>
                <div class="vip_download">
                    <p>会員のみ視聴可能です<br>会員登録して、アイドルのプライベート動画を見よう</p>
                    <a href="itms-apps://itunes.apple.com/app/id1251249933" title="下载Groupy查看完整视频" alt="下载Groupy查看完整视频">Groupyをダウンロードしてもっと見よう</a>
                </div>
            </div>
            <div class="public_show"v-show="vipShow == false">
                <p>{{video.title}}</p>
                <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
                <a href="itms-apps://itunes.apple.com/app/id1251249933" class="download">Groupyをダウンロードしてもっと見よう</a>
            </div>
            <div class="more_video">
                <h3>おすすめ</h3>
                <ul>
                    <li v-for="(video,key) in videos"><a href="itms-apps://itunes.apple.com/app/id1251249933" title="">
                    <div class="video_bigImg">
                        <img :src="video.thumbnail" class="video_poster" alt=""><img src="../images/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="../images/video_bg_play times.png" class="time_bg" alt="">
                            <img src="../images/video_icon_time.png" class="time_play" alt="">
                            <span v-html="formatTime(video.duration)"></span>
                        </div>
                    </div>
                    <p class="video_content">{{video.title}}</p>
                    </a></li>
                </ul>         
            </div>
        </div>
    </div>
</template>

<script>

</script>
<script>
    import VideoPlayer from 'vue-video-player';
    import http from '@/utils/http.js';
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            playerOptions: {

              // component options
              start: 0,
              playsinline: false,
              autoplay: true,
              // videojs options
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: "video/mp4",
                src: ""
              }],
              poster: "",
            },
            vipShow: true,
            video: {},
            videos:[],
            idol: {}
          }
        },
        methods: {
            formatTime(key) {
                let _m = Math.floor(key/60) >= 10 ? Math.floor(key/60) : '0'+ Math.floor(key/60);
                let _s = (key-Math.floor(key/60)*60) >= 10 ? (key-Math.floor(key/60)*60) : '0'+ (key-Math.floor(key/60)*60);
                return _m+":"+_s;
              },
            getVideo() {
                var self = this;
                console.log(location.href.split('/shareVideo/')[1].split('#/')[0])
                http.get('/video/get',{
                    params: {
                        videoId: location.href.split('/shareVideo/')[1].split('#/')[0]
                    }
                }).then(function(res){
                    self.idol = res.data.group;
    //                 $('<meta property="og:image" content="'+ res.data.group +'" />')
                    
    // <meta property="og:description" content="2017WBCのスケジュールをチェックして、お気に入りの試合の情報を逃さず全て入手！" class="facebook_content"/>
                    if(res.data.video.publicType == 2) {
                        self.vipShow = true;
                    }else {
                        self.vipShow = false;
                        self.playerOptions.poster = res.data.video.thumbnail;
                        let _len = res.data.video.videoItemList.length - 1;
                        self.playerOptions.sources[0].src = res.data.video.videoItemList[_len].url;
                    }
                    self.video = res.data.video;
                    self.videos = res.data.related;
                }).catch(function(){

                });
            }
        },
        mounted() {
          console.log('this is current player instance object', this.player)
        },
        computed: {
          player() {
            return this.$refs.videoPlayer.player
          }
        },
        created() {
            this.getVideo();
        }
      }
</script>

<style scoped lang="scss">
    @import "../styles/share.scss";
</style>

<style>
     .vjs_video_417-dimensions {
        height: auto !important;
        video {
            position: inherit !important;
        }
    }
    .vjs_video_3-dimensions {
        height: auto !important;
    }
    .video-js .vjs-tech {
        position: inherit !important;
    }
    .vjs-playback-rate-value {
        display: none;
    }
    .video-js.vjs-custom-skin .vjs-control-bar .vjs-fullscreen-control  {
        display: none;
    }
    .video-player .video-js.vjs-custom-skin .vjs-big-play-button {
        width: 41px !important;
        height: 41px !important;
        line-height: 41px !important;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: -20.5px;
        margin-top: -20.5px;
    }
    .public_show >p {
        font-size: 16px;
        padding: 0 12px 7.5px;
    }
    .video_bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.66) 100%);
        height: 155px;
    }
</style>