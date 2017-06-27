<template>
    <div class="main">
        <div class="header">
            <img src="../images/icon_groupy_128.png" alt="">
            <p>会员独有的私密状态查看，一键应援，共同守护爱豆的成长</p>
            <a href="">下载</a>
        </div>
        <div class="content">
            <div class="userinfo">
                <img src="" alt="">
                <div class="video_desc">
                    <h3>メロメロン</h3>
                    <p>爱豆简介おしゃれ大好き♡Jc𗿋みゆです(≧▽≦)みゆ…</p>
                </div>
            </div>
            <div class="vip_show" v-show="false">
                <p>初めての写真集です初めての写真集です</p>
                <div class="video_banner">
                    <img src="" alt="">
                    <img src="../images/icon_menbership.png" alt=""> 
                </div>
                <div class="vip_download">
                    <p>本视频仅为会员可见<br>下载Groupy并加入会员，查看爱豆的隐秘视频吧</p>
                    <a href="" title="下载Groupy查看完整视频" alt="下载Groupy查看完整视频">下载Groupy查看完整视频</a>
                </div>
            </div>
            <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
            <a href="" class="download">下载Groupy查看更多视频</a>
            <div class="more_video">
                <h3>还有更多视频</h3>
                <ul>
                    <li><a href="" title="">
                    <div class="video_bigImg">
                        <img src="" class="video_poster" alt=""><img src="../images/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="../images/video_bg_play times.png" class="time_bg" alt="">
                            <img src="../images/video_icon_time.png" class="time_play" alt="">
                            <span>23:12</span>
                        </div>
                    </div>
                    <p class="video_content">初めての写真集です初めての写真集です</p>
                    </a></li>
                    <li><a href="" title="">
                    <div class="video_bigImg">
                        <img src="" class="video_poster" alt=""><img src="../images/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="../images/video_bg_play times.png" class="time_bg" alt="">
                            <img src="../images/video_icon_time.png" class="time_play" alt="">
                            <span>23:12</span>
                        </div>
                    </div>
                    <p class="video_content">初めての写真集です初めての写真集です</p>
                    </a></li>
                    <li><a href="" title="">
                    <div class="video_bigImg">
                        <img src="" class="video_poster" alt=""><img src="../images/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="../images/video_bg_play times.png" class="time_bg" alt="">
                            <img src="../images/video_icon_time.png" class="time_play" alt="">
                            <span>23:12</span>
                        </div>
                    </div>
                    <p class="video_content">初めての写真集です初めての写真集です</p>
                    </a></li>
                    <li><a href="" title="">
                    <div class="video_bigImg">
                        <img src="" class="video_poster" alt=""><img src="../images/timeline_icon_play.png" class="btn_play" alt="">
                        <div>
                            <img src="../images/video_bg_play times.png" class="time_bg" alt="">
                            <img src="../images/video_icon_time.png" class="time_play" alt="">
                            <span>23:12</span>
                        </div>
                    </div>
                    <p class="video_content">初めての写真集です初めての写真集です</p>
                    </a></li>
                </ul>         
            </div>
        </div>
    </div>
</template>

<script>

</script>
<script>
    import VideoPlayer from 'vue-video-player'
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
                src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              }],
              poster: "/static/images/author.jpg",
            }
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
        methods: {
        }
      }
</script>

<style lang="scss" scoped>
    @import "../styles/share.scss";
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
</style>