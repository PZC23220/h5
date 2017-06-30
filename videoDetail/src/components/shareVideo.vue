<template>
    <div class="main">
        <div class="header">
            <img src="../images/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a class="down_link" @click="p_log('share_h5_download_groupy')" href="itms-apps://itunes.apple.com/app/id1251249933">インストール</a>
        </div>
        <div class="content" style="height: calc(100vh - 124px);">
            <div class="userinfo" v-if="idolShow">
                <img :src="idol.bgImg?idol.bgImg: '/static/images/default_img.png'" alt="">
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
                    <a class="down_link" @click="p_log('share_h5_download_groupy')" href="itms-apps://itunes.apple.com/app/id1251249933" title="下载Groupy查看完整视频" alt="下载Groupy查看完整视频">Groupyをダウンロードしてもっと見よう</a>
                </div>
            </div>
            <div class="public_show"v-show="publicShow">
                <p>{{video.title}}</p>
                <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
                <a @click="p_log('share_h5_download_groupy')" href="itms-apps://itunes.apple.com/app/id1251249933" class="download down_link">Groupyをダウンロードしてもっと見よう</a>
            </div>
            <div class="default_page" v-show="pageNone">
                <img src="../images/default_no like.png" alt="">
                <p>まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう</p>
                <a  class="down_link" @click="p_log('share_h5_download_groupy')" href="itms-apps://itunes.apple.com/app/id1251249933" title="下载Groupy查看完整视频" alt="下载Groupy查看完整视频">Groupyをダウンロードしてもっと見よう</a>
            </div>
            <div class="more_video" v-if="videos.length > 0">
                <h3>おすすめ</h3>
                <ul>
                    <li v-for="(video,key) in videos"><a class="down_link" @click="p_log('share_h5_watch_more')" href="itms-apps://itunes.apple.com/app/id1251249933" title="">
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
        <div class="bigLoading" v-show="loadingBig">
            <img src="../images/loading_2.png" alt="">
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
              playsinline: true,
              autoplay: true,
              preload: true,
              // videojs options
              language: 'en',
              // playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: "video/mp4",
                src: ""
              }],
              poster: "",
            },
            vipShow: false,
            publicShow: false,
            video: {},
            videos:[],
            idol: {},
            pageNone: true,
            loadingBig: true,
            idolShow: false
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
                    console.log(res);
                    if(res) {
                        if(res.data.video) {
                            if(res.data.video.active == 1) {
                                self.pageNone = false;
                                $('<meta property="og:image" content="'+ res.data.video.thumbnail +'" />').appendTo('head')     
                                $('<meta property="og:description" content="'+ res.data.video.title +'"/>').appendTo('head')
                                if(res.data.video.publicType == 2) {
                                    self.vipShow = true;
                                    self.publicShow = false;
                                }else {
                                    self.vipShow = false;
                                    self.publicShow = true;
                                    self.playerOptions.poster = res.data.video.thumbnail;
                                    let _len = res.data.video.videoItemList.length - 1;
                                    self.playerOptions.sources[0].src = res.data.video.videoItemList[_len].url;
                                }
                                self.video = res.data.video;
                            } else {
                                self.pageNone = true;
                            }

                        }else {
                            self.pageNone = true;
                        }
                        if(res.data.related) {
                            self.videos = res.data.related;
                        }
                        if(res.data.group) {
                            self.idolShow = true;
                            self.idol = res.data.group;
                        }
                    }else {
                        self.pageNone = true;
                        self.vipShow = false;
                        self.publicShow = false;
                    }
                    self.loadingBig = false;
                }).catch(function(){

                });
            },
            p_log(val) {
                var _data = {

                    topic: "groupy",
                    app: "groupyIdol",
                    platform: "h5",
                    system: navigator.userAgent,
                    version: "1.0.0",
                    action: val,
                    result: "success",
                    videoId: location.href.split('/shareVideo/')[1].split('#/')[0]
                }
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                }).catch(function(){

                })
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
            this.p_log('idol_share_h5_open');
            setTimeout(function(){
                var ua = navigator.userAgent.toLowerCase();
                if (!(/iphone|ipad|ipod/.test(ua))) {
                    document.querySelector('.down_link').href = 'https://itunes.apple.com/app/id1251249933';
                }
            },200)
        }
      }
</script>

<style scoped lang="scss">
    @import "../styles/share.scss";
    .default_page {
        a {
            display: block;
            color: #fff;
            width: 300px;
            height: 44px;
            line-height: 44px;
            opacity: 0.9;
            background: #FC4083;
            border-radius: 4px;
            font-size: 14px;
            margin-top: 7.5px;
            margin: 20px auto;
        }
    }
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