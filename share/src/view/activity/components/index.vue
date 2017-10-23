<template>
    <div class="main">
        <div class="content">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/acticity_banner/banner-coke.jpg" class="banner">
            <h2 class="activity_title">中国のファッション誌「可楽生活」に、上位1名の所属ユニットメンバー全員が特集ページに登場する！是非奮ってご参加ください！</h2>
            <div class="idol-ranking" v-if="ranking.length > 0">
                <div class="ranking-two">
                    <div class="ranking-idol" v-if="ranking.length > 0"><p class="avatar-content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/ranking_1.png"><img :src="ranking[0].avatar?ranking[0].avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'"></p><p class="idolName-content"><span>{{ranking[0].nickname?ranking[0].nickname:'...'}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{Number(ranking[0].popularity?ranking[0].popularity:0).toLocaleString()}}</i></span></p></div>
                    <div class="ranking-idol" v-if="ranking.length > 1"><p class="avatar-content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/ranking_2.png"><img :src="ranking[1].avatar?ranking[1].avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'"></p><p class="idolName-content"><span>{{ranking[1].nickname?ranking[1].nickname:'...'}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{Number(ranking[1].popularity?ranking[1].popularity:0).toLocaleString()}}</i></span></p></div>
                </div>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download ranking-download">ランキング</a>
            </div>
            <div class="idol-ranking" v-if="ranking.length <= 0">
                <div class="ranking-one">
                   <div class="img_content">
                        <img v-lazy="idol.avatar?idol.avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" class="avatar">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_ranking_1.png" class="ranking_pic">
                        <span class="idol_level">NO.{{idol.ranking?idol.ranking:'-'}}</span>
                    </div>
                    <div class="name">{{idol.nickname?idol.nickname:'...'}}</div>
                    <div class="idol_desc">
                        <!-- <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(ranking.length>0?(idol.gcoin?idol.gcoin:0):0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p> -->
                        <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</em></span></p>
                        <p><span><em>{{Number(idol.videoCount?idol.videoCount:0).toLocaleString()}}</em></span><i>作品</i></p>
                    </div>
                </div>
                <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="width: 150px;">Groupyへ応援する</a>
            </div>
            <div class="share_content">
                <div class="video_content" v-for="(hot,key) in videos" v-if="key < 10">
                    <div class="userinfo con_left" :class="{'left_show':idolShow}" v-if="hot.idol">
                        <img :src="hot.idol.avatar?hot.idol.avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" onerror="this.src='http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" alt="">
                        <div class="video_desc">
                            <h3>{{hot.idol.nickname?hot.idol.nickname:'...'}}</h3>
                            <p>{{formatTime(hot.publishTime)}}</p>
                        </div>
                    </div>
                    <div class="public_show">
                        <video-player  ref="videoPlayer" :options="hot.videoItemList[2]?getSrc(hot.videoItemList[2],hot.thumbnail):false" v-if="hot.publicType != 1"></video-player>
                        <img :src="hot.thumbnail?hot.thumbnail:hot.firstFrame" v-else></img>
                        <div class="Masked" v-if="hot.publicType == 1"></div>
                        <div class="gift_content">
                            <a :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/Like.png" class="cursor">10</a>
                            <a :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/gift.png" class="cursor"></a>
                        </div>
                        <span class="play_times"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/Video/video_icon_play%20times.png">{{hot.readCount}}</span>
                        <div class="Masked2" v-if="hot.publicType == 1">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_vip.png">
                            <p>この動画は会員のみ視聴可能です</p>
                            <a :href="hrefs" target="_blank">会員登録へ</a>
                        </div>
                    </div>
                    <div class="video_desc_content">
                        <a :href="hrefs" target="_blank" class="video_option"><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png">{{hot.giftCount}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png">{{hot.popularity}}</span><div><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_comment.png">コメントする</div></a>
                        <p class="video_text">{{hot.title}}</p>
                        <ul class="comment_list" style="background: #fff;">
                            <div class="comment_total"><span><i>コメント{{hot.postList.length}}件すべてを表示</i></span></div>
                            <li v-for="comment in hot.postList" style="border: none;padding: 0 12px 3px;">
                               <div class="comment_content"><span>{{comment.nickname?comment.nickname:'...'}}</span>{{comment.content}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a> -->
            </div>
        </div>
        <div class="header">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs">インストール</a>
        </div>
        <!-- <div class="bullet_box" v-show="boxShow">
            <div class="bullet_box_content" :class="{'bullet_box_show':boxShow}">
                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/box.png" class="box_bg">
                <div class="box_content">
                    <img src="/img/icon_cancel_2.png" class="close" @click="boxShow = false">
                    <img src="/img/icon_groupy_120.png" class="groupy">
                    <p class="tips">请下载Groupy查看更多内容</p>
                    <span class="tips2">前往下载</span>
                    <a :href="hrefs" class="appstore"><img src="/img/btn_appstore.png"></a>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            playerOptions: {

              // component options
              start: 0,
              playsinline: true,
              // autoplay: true,
              preload: true,
              // videojs options
              language: 'en',
              // playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: "application/x-mpegURL",
                src: '',
                withCredentials: false
              }],
              poster: "",
              techOrder: 'vimeo'
            },
            vipShow: false,
            publicShow: false,
            video: {},
            videos:[],
            idol: {},
            pageNone: true,
            loadingBig: true,
            idolShow: false,
            commentList: [],
            idx: 0,
            boxShow: false,
            havedlast: false,
            msg_text: {
                publish: '投稿',
                pubMsg: '投稿して<br>盛り上がろう',
                noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                load: '読み込み中',
                loadAll: '全て表示されました'

            },
            hotList:[],
            idol: {},
            fansList: [],
            hrefs: 'itms-apps://itunes.apple.com/app/id1270083927',
            bigImgShow: false,
            videos: [],
            ranking: []
          }
        },
        methods: {
            getSrc(obj,poster) {
               let playerOptions= {

                  // component options
                  start: 0,
                  playsinline: true,
                  // autoplay: true,
                  preload: true,
                  // videojs options
                  language: 'en',
                  // playbackRates: [0.7, 1.0, 1.5, 2.0],
                  sources: [{
                    type: "video/mp4",
                    src: obj.url
                  }],
                  poster: poster,
                }
                return playerOptions;
            },
            formatTime(key) {
                let timer = new Date(key - 1*60*60*1000);
                return timer.Format('MM.dd') + '  '+ timer.Format('hh:mm');
            },
            getActivityInfo() {
                var self = this;
                http.get('/video/shareActivityVideos',{
                    params: {
                        idolId: getParams('idolId'),
                        activityId: getParams('activityId')
                    }
                }).then(function(res){
                    console.log(res)
                    if(res.data.selfRanking) {
                        self.idol = res.data.selfRanking;
                    }
                    if(res.data.videos) {
                        self.videos = res.data.videos;
                    }
                }).catch(function(){

                });
            },
            getRanking() {
                var self = this;
                http.get('/video/activityIdols',{
                    params: {
                        activityId: getParams('activityId'),
                        rows: 10
                    }
                }).then(function(res){
                    if(res.data.ranking) {
                        self.ranking = res.data.ranking;
                    }
                }).catch(function(){

                });
            },
            getVideoList() {
                var self = this;
                http.get('/video/activityVideos',{
                    params: {
                        activityId: getParams('activityId'),
                        rows: 10
                    }
                }).then(function(res){
                    console.log(res);
                    if(res.data.videos) {
                        self.videos = res.data.videos;
                    }
                }).catch(function(){

                });
            },
            p_log(val) {
                var _data = {

                    topic: "groupy",
                    app: "groupy",
                    platform: "h5",
                    system: navigator.userAgent,
                    version: "1.0.0",
                    action: val,
                    result: "success",
                    idolId: getParams('idol_id')
                }
                http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                    console.log('success');
                }).catch(function(){

                })
            }
        },
        mounted() {
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        created() {
            if(getParams('isFans') == 1 || !getParams('isFans')) {
                this.getRanking();
                this.getVideoList();
            }else {
                this.getActivityInfo();
            }
            
            // this.p_log('idol_shareActivity_h5_open');
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                this.hrefs = 'itms-apps://itunes.apple.com/app/id1270083927';
            }else if(/android/.test(ua)) {
                this.hrefs = 'https://play.google.com/store/apps/details?id=com.groupy.app.fans';
            }else {
                this.hrefs = 'https://itunes.apple.com/app/id1270083927';
            }
        }
      }
</script>

<style scoped lang="scss">
    // @import "../styles/share.scss";
    .ranking-one {
            background-image: url(http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_1.png);
            background-size: 100% auto;
            background-position: center center;
            background-repeat: no-repeat;
            .img_content {
                width: 103.5px;
                height: 114px;
                padding-left: 0;
                padding-top: 12px;
                float: none;
                margin: 0 auto;
                position: relative;
                text-align: center;
                img.avatar {
                    width: 90px;
                    height: 90px;
                    border: 2px solid #f8a50d;
                    float: none;
                }
                img.ranking_pic {
                    width: 103.5px;
                    position: absolute;
                    bottom:0;
                    left: 0;
                }
                img.crown {
                    width: 38px;
                    left: 3px;
                }
                span.idol_level {
                    bottom: 17px;
                    width: 103.5px;
                    font-size: 14px;
                    position: absolute;
                    left: 0;
                    color: #fff;
                }
            } 
            .name {
                float: none;
                text-align: center;
                font-size: 16px;
                font-weight: 600;
                margin-top: 8px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .idol_desc {
                display: flex;
                overflow: hidden;
                margin-top: 8px;
                width: 100%;
                p {
                    flex: 1.5;
                    text-align: center;
                    overflow: hidden;
                    line-height: 24px;
                    >span {
                        display: inline-block;
                        text-align: center;
                        overflow: hidden;
                        vertical-align: middle;
                        img {
                            width: 12px;
                            margin-top: 6px;
                            margin-right: 5.5px;
                        }
                        em {
                            display: inline-block;
                            font-size: 16px;
                            font-weight: 600;
                            color: #333;
                            max-width: calc(22vw - 31px);
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    i {
                        display: inline-block;
                        color: #333;
                        font-size: 12px;
                        margin-left: 8px
                    }
                }
            }
        }
    .header {
        position: relative;
    }
    .content {
        position: relative;
        top: 0;
    }
    .banner {
        width: 100%;
    }
    .activity_title {
        color: #f4ba4b;
        font-size: 16px;
        font-weight: 600;
        box-sizing: border-box;
        padding: 12px;
        line-height: 22.5px;
    }
    .idol-ranking {
        background: #FFF5F7;
        border: 1px solid #FFB2C6;
        border-radius: 5px;
        padding:8px 12px;
        margin:0 12px;box-sizing: border-box;
    }
    .avatar-content {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 12px;
        display: inline-block;
        vertical-align: middle;
        img:last-child {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-sizing: border-box;
            border: 1px solid #FC4083;
        }
        img:first-child {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 15px;
        }
    }
    .idolName-content {
        display: inline-block;
        vertical-align: middle;
        max-width: calc(50vw - 90px);
        span {
            display: block;
            img {
                width: 12px;
                margin-right: 5px;
            }
        }
        span,i {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        i {
            max-width: calc(50vw - 110px);
        }
    }
    .ranking-download {
        width: 100px;
        height: 25px;
        line-height: 25px;
        border-radius:25px;
        font-size: 14px;
        margin: 17px auto 0;
    }
    .ranking-two {
        display: flex;
    }
    .ranking-idol {
        flex: 1;
        text-align: left;
    }
    .share_content {
        position: relative;
        overflow: hidden;
        border-top: 8px solid #eee;
        margin-top: 12px;
        .userinfo >img {
            width: 40px;
            height: 40px;
        }
        .video_desc p {
            font-size: 10px;
            -webkit-transform: scale(0.8);
            margin-left: -28px;
        }
    }
    .public_show {
        position: relative;
        overflow: hidden;
    }
    .Masked {
        position: absolute;
        left: 0 ;
        top: 0;
        width: 120vw;
        margin-left: -20px;
        margin-top: -20px;
        height: calc(100vw * 502/355);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        filter: blur(12px);
        overflow: hidden;
        background-image: url(http://videodebugoutput.oss-cn-hongkong.aliyuncs.com/Act-Snapshot/04183d8a5fd54c47aec133494326072a/1000.jpg);

    }
    .Masked2 {
        background-color: rgba(0,0,0,0.4);
        width: 100%;
        height: calc(100vw * 502/375);
        position: absolute;
        left: 0 ;
        top: 0;
        text-align: center;
        color: #fff;
        img {
            width: 34px;
            display: block;
            margin: 100px auto 12px;
        }
        p {
            font-size: 14px;
            margin-bottom: 16px;
        }
        a {
            width: 140px;
            height: 45px;
            display: block;
            line-height: 45px;
            border-radius: 26px;
            background: #00B4BC;
            font-size: 18px;
            margin: 0 auto;
            color: #fff;
        }
    }
    .gift_content {
        position: absolute;
        right: 20px;
        bottom: 50px;
        text-align: center;
        a {
            display: block;
            width: 45px;
            margin: 0 auto;
            color: #fff;
        }
        a:last-child {
            width: 64px;
        }
        img {
            display: block;
            width: 100%;
        }
    }
    .play_times {
        position: absolute;
        right: 20px;
        top: 20px;
        color: #fff;
        img {
            width: 14px;
            margin-right: 5px;
        }
    }
    .video_option {
        overflow: hidden;
        display: block;
        padding: 5px 12px 0;
        // border-bottom: 1px solid #eee;
        span {
            float: left;
            box-sizing: border-box;
            margin-top: 5px;
            img {
                width: 15px;
                margin-right: 3px;
                float: left;
                margin-top: 2px;
            }
        }
        span:first-child {
            margin-right: 28px;
        }
        >div {
            float: right;
            overflow: hidden;
            >img {
                width: 25px;
                vertical-align: middle;
                margin-right: 3px;
            }
        }   
    }
    .comment_total {
        overflow: hidden;
        padding: 0 12px 3px;
        line-height: 20px;
        color: #bbb;
        color: #999;
        font-size: 14px;
        span:first-child {
            display: block;
            float: left;
            img:first-child {
                width: 18px;
                float: left;
                margin-right: 5.5px;
            }
            i {
                float: left;
            }
            img:last-child {
                width: 7px;
                margin-left: 5.5px;
                float: left;
                margin-top: 3px;
            }
        }
        div:last-child {
            float: right;
            display: block;
            border: 1px solid #999999;
            border-radius: 27.5px;
            width: 90px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    }
    .comment_list {
        border-bottom: solid 8px #eee;
    }
    .page_defalt {
        height: auto;
        opacity: 0.8;
        overflow: hidden;
        transition: all 0.3s;
    }
    .page_defalt_none {
        height: 0;
        padding:0;
        opacity: 0;
        border: none;
    }
    .defalt_msg {
         z-index: -1;
        .userinfo {
            span {
                width: 50px;
                height: 14px;
                background: #eee;
                margin-top:8px;
            }
        }
        .comment_content {
            >* {

                margin-top:10px;
                background: #eee;
                height: 14px;
            }
        }
    }
</style>
<style lang="scss">
    .vjs_video_417-dimensions {
        height: auto !important;
        video {
            position: inherit !important;
            background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.66) 100%) !important;
        }
    }
    .vjs_video_3-dimensions,.vjs_video_364-dimensions,.video-js {
        height: auto !important;
    }
    .vjs_video_375-dimensions,.vjs_video_388-dimensions {
        width: 100%;
        height: auto;
    }
    .video-js .vjs-tech {
        position: inherit !important;
        background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.66) 100%) !important;
        height: auto !important;
        background-color: rgba(0,0,0,0.2);
    }
    .vjs-playback-rate-value {
        display: none;
    }
    .video-js.vjs-custom-skin .vjs-control-bar .vjs-fullscreen-control  {
        display: none;
    }
    // .video-player,.vjs-poster {
    //     height: calc(100vw * 502/375) !important;
    //     max-height: calc(500px * 502/375) !important;
    //     // background-color: rgba(0,0,0,0.2);
    // }
    .video-player .video-js.vjs-custom-skin .vjs-big-play-button {
        width: 41px !important;
        height: 41px !important;
        line-height: 41px !important;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: -20.5px;
        margin-top: -20.5px !important;
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