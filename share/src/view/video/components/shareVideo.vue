<template>
    <div class="main">
        <div class="header">
            <img src="/img/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="href_">インストール</a>
        </div>
        <div class="content">
            <div class="userinfo con_left" :class="{'left_show':idolShow}">
                <img :src="idol.avatar?idol.avatar: '/img/default_img.png'" onerror="this.src='/img/default_img.png'" alt="">
                <div class="video_desc">
                    <h3>{{idol.nickname?idol.nickname:'Groupy'}}</h3>
                    <p>{{idol.introduce?idol.introduce:'Groupyで待ってまーす'}}</p>
                </div>
            </div>
            <div class="vip_show" v-show="vipShow">
                <p>{{video.title}}</p>
                <div class="video_banner">
                    <img :src="video.thumbnail" alt="">
                    <img src="/img/icon_menbership.png" alt="">
                </div>
                <div class="video_bg"></div>
                <div class="vip_download">
                    <p>会員のみ視聴可能です<br>会員登録して、アイドルのプライベート動画を見よう</p>
                    <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="href_" title="Groupyをダウンロードしてもっと見よう" alt="Groupyをダウンロードしてもっと見よう">Groupyをダウンロードしてもっと見よう</a>
                </div>
            </div>
            <div class="public_show"v-show="publicShow">
                <p>{{video.title}}</p>
                <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="href_" class="download">Groupyをダウンロードしてもっと見よう</a>
            </div>
            <div class="default_page" v-show="pageNone">
                <img src="/img/default_no like.png" alt="">
                <p v-show="pageNone2">まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう</p>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="href_" title="Groupyをダウンロードしてもっと見よう" alt="Groupyをダウンロードしてもっと見よう">Groupyをダウンロードしてもっと見よう</a>
            </div>
            <div class="more_video">
                <h3>おすすめ</h3>
                <ul>
                    <li class="con_left" :class="{'left_show':videos.length>0}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="href_" title="">
                    <div class="video_bigImg">
                        <img :src="videos.length>0?videos[0].thumbnail:'/img/video/default_video.png'" class="video_poster" alt=""><img src="/img/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="/img/video_bg_play times.png" class="time_bg" alt="">
                            <img src="/img/video_icon_time.png" class="time_play" alt="">
                            <span v-html="videos.length>0?formatTime(videos[0].duration):'00:00'"></span>
                        </div>
                    </div>
                    <p class="video_content">{{videos.length>1?videos[1].title:'Groupyで待ってまーす'}}</p>
                    </a></li>
                    <li class="con_left" :class="{'left_show':videos.length>1}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="href_" title="">
                    <div class="video_bigImg">
                        <img :src="videos.length>1?videos[1].thumbnail:'/img/video/default_video.png'" class="video_poster" alt=""><img src="/img/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="/img/video_bg_play times.png" class="time_bg" alt="">
                            <img src="/img/video_icon_time.png" class="time_play" alt="">
                            <span v-html="videos.length>1?formatTime(videos[1].duration):'00:00'"></span>
                        </div>
                    </div>
                    <p class="video_content">{{videos.length>1?videos[1].title:'Groupyで待ってまーす'}}</p>
                    </a></li>
                    <li class="con_left" :class="{'left_show':videos.length>2}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="href_" title="">
                    <div class="video_bigImg">
                        <img :src="videos.length>2?videos[2].thumbnail:'/img/video/default_video.png'" class="video_poster" alt=""><img src="/img/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="/img/video_bg_play times.png" class="time_bg" alt="">
                            <img src="/img/video_icon_time.png" class="time_play" alt="">
                            <span v-html="videos.length>2?formatTime(videos[2].duration):'00:00'"></span>
                        </div>
                    </div>
                    <p class="video_content">{{videos.length>2?videos[2].title:'Groupyで待ってまーす'}}</p>
                    </a></li>
                    <li class="con_left" :class="{'left_show':videos.length>3}"><a @click="p_log('share_h5_watch_more')" target="_blank" :href="href_" title="">
                    <div class="video_bigImg">
                        <img :src="videos.length>3?videos[3].thumbnail:'/img/video/default_video.png'" class="video_poster" alt=""><img src="/img/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="/img/video_bg_play times.png" class="time_bg" alt="">
                            <img src="/img/video_icon_time.png" class="time_play" alt="">
                            <span v-html="videos.length>3?formatTime(videos[3].duration):'00:00'"></span>
                        </div>
                    </div>
                    <p class="video_content">{{videos.length>3?videos[3].title:'Groupyで待ってまーす'}}</p>
                    </a></li>
                </ul>
            </div>
        </div>
        <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import http from '@api/js/http.js';
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
            pageNone2: false,
            // loadingBig: true,
            idolShow: false,
            href_: 'itms-apps://itunes.apple.com/app/id1251249933'
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
                http.get('/video/get',{
                    params: {
                        videoId: location.href.split('?videoId=')[1].split('#/')[0]
                    }
                }).then(function(res){
                    console.log(res);
                    if(res) {
                        if(res.data.video) {
                            if(res.data.video.active == 1) {
                                self.pageNone = false;
                                self.pageNone2 = false;
                                $('<meta property="og:image" content="'+ res.data.video.thumbnail +'" />').appendTo('head')     
                                $('<meta property="og:description" content="'+ res.data.video.title +'"/>').appendTo('head')
                                if(res.data.video.publicType == 1) {
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
                                self.pageNone2 = true;
                            }

                        }else {
                            self.pageNone = true;
                            self.pageNone2 = true;
                        }

                        if(res.data.related) {
                            self.videos = res.data.related;
                        }

                        if(res.data.idol) {
                            self.idolShow = true;
                            self.idol = res.data.idol;
                        }
                    }else {
                        self.pageNone = true;
                        self.pageNone2 = true;
                        self.vipShow = false;
                        self.publicShow = false;
                    }
                    // self.loadingBig = false;
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
                    videoId: location.href.split('?videoId=')[1].split('#/')[0]
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
            var ua = navigator.userAgent.toLowerCase();
            if (!(/iphone|ipad|ipod/.test(ua))) {
                this.href_ = 'https://itunes.apple.com/app/id1251249933';
            }else {
                this.href_ = 'itms-apps://itunes.apple.com/app/id1251249933';
            }
        }
      }
</script>

<style scoped lang="scss">
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

<style lang="scss">
    .vjs_video_417-dimensions {
        height: auto !important;
        video {
            position: inherit !important;
        }
    }
    .vjs_video_3-dimensions {
        height: auto !important;
    }
    .vjs_video_375-dimensions,.vjs_video_388-dimensions {
        width: 100%;
        height: auto;
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
    .con_left {
        opacity: 0.2;
        transition: opacity 0.3s;
     }
    .left_show {
        opacity: 1;
    }
</style>