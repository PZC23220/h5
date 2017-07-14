<template>
    <div class="main">
        <div class="header">
            <img src="../images/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="_href">インストール</a>
        </div>
        <div class="content">
            <div class="idol_desc">
                <div class="idol_desc_bg"></div>
                <div class="idol_desc_content">
                    <img src="../images/default_img.png" class="avatar">
                    <span class="idol_name">メロメロン</span>
                    <div class="idol_support"><span><img src="../images/idol_icon_fans.png">698</span><span><img src="../images/idol_icon_likes.png">698</span><span><img src="../images/idol_icon_ranking.png">1113位</span><span>応援</span></div>
                    <p>しろくまナイト、ぼんこつおんみつ最前線、めるめるめるちゅ の3曲だよ♪ ぜひきいてね💕╰(*´︶`*)╯ぼんこつおんみつ最前…</p>
                    <div class="idol_fans_ranking"><i>粉丝排行</i><div><img src="../images/default_img.png"><img src="../images/default_img.png"><img src="../images/default_img.png"></div><img src="../images/icon_arrow_white.png"></div>
                </div>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">动态</a>
                <a class="tabs" @click="changePages(1)">留言板</a>
                <a class="tabs" @click="boxShow = true;">私信</a>
                <a class="tabs" @click="boxShow = true;">商城</a>
            </div>
            <div class="share_content">
                <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                    <!-- slides -->
                    <swiper-slide id="swiper1">
                        <div class="video_content">
                            <div class="userinfo con_left" :class="{'left_show':idolShow}">
                                <img :src="idol.bgImg?idol.bgImg: '/static/images/default_img.png'" alt="">
                                <div class="video_desc">
                                    <h3>Groupy</h3>
                                    <p>05.12  12:00  </p>
                                </div>
                            </div>
                            <div class="public_show">
                                <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
                                <div class="gift_content">
                                    <img src="../images/Like.png">10
                                    <img src="../images/gift.png">
                                </div>
                                <span class="play_times"><img src="../images/video_icon_play times.png">325</span>
                            </div>
                            <p class="video_text">初めての写真集です、これなんだと思います？当てた方これなんだ</p>
                            <a :href="_href" class="video_option"><span><img src="../images/timeline_icon_coins.png">31,256</span><span><img src="../images/timeline_icon_likes.png">31,256</span><img src="../images/icon_arrow_gray.png"></a>
                            <ul class="comment_list" style="background: #fff;">
                                <div class="comment_total"><span><img src="../images/icon_comment.png"><i>共45条评论</i><img src="../images/icon_arrow_gray.png" alt=""></span><a :href="_href">添加评论</a></div>  
                                <li>
                                    <div class="comment_info">
                                        <img class="avatar" src="../images/default_img.png" alt="">
                                        <span>。。。</span>
                                        <img class="level" src="../images/icon_level_1.png" alt="">
                                        <i>05.12  12:00  </i>
                                    </div>
                                    <div class="comment_content">初めての写真集です、これなんだと思います？当てた方これなんだ</div>
                                </li>
                                <li>
                                    <div class="comment_info">
                                        <img class="avatar" src="../images/default_img.png" alt="">
                                        <span>。。。</span>
                                        <img class="level" src="../images/icon_level_1.png" alt="">
                                        <i>05.12  12:00  </i>
                                    </div>
                                    <div class="comment_content">初めての写真集です、これなんだと思います？当てた方これなんだ</div>
                                </li>
                                <!-- <li v-for="(comment,key) in commentList" :class="[{'lastLi' : commentList.length > 5 && key == commentList.length-1},{'firstLi' : key == 0}]">
                                    <div class="comment_info">
                                        <img class="avatar" :src="comment.avatar?comment.avatar:'/static/images/default_img.png'" alt="">
                                        <span>{{comment.nickname}}</span>
                                        <img class="level" :src="'/static/images/icon_level_'+(comment.levelPlatform+1)+'.png'" alt="">
                                        <i v-html="formatTime(comment.createTime)"></i>
                                    </div>
                                    <div class="comment_content" v-html="TransferString(comment.content)"></div>
                                </li> -->
                            </ul>
                            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="_href" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a>
                        </div>
                    </swiper-slide>
                    <swiper-slide id="swiper2">
                        <ul class="comment_list dynamic">
                        <!-- <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                            <p>{{msg_text.load}}</p>
                            <span></span>
                        </div> -->
                        <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                            <li class="defalt_msg" :class="{'firstLi':loadingBig}">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                        </div>
                        <li v-for="(comment,key) in commentList" :class="[{'idol_comment' : comment.userType == 'idol'},{'lastLi' : key == commentList.length-1},{'firstLi' : key == 0}]" v-if="!joined?key<10:true">
                            <div class="userinfo">
                                <img :src="comment.avatar" alt="" class="avatar">
                                <span>{{comment.nickname}}</span>
                                <img :src="comment.level?'/static/images/icon_level_'+(comment.level+1)+'.png':'/static/images/icon_level_1.png'" alt="" v-if="comment.userType == 'fans'" class="level">
                                <img :src="comment.medal?'/static/images/icon_level_'+(comment.medal)+'.png':'/static/images/icon_level_1.png'" alt="" v-if="comment.userType == 'fans'" class="level">
                                <i v-html="formatTime(comment.createTime)"></i>
                            </div>
                            <div class="comment_content">
                                <p>{{comment.content}}</p>
                                <div class="comment_img" v-if="comment.imgs?comment.imgs.length > 0:false">
                                    <span :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="img in JSON.parse(comment.imgs)"><img :src="img" alt="" class="autoHeight" @click="showBigImg(img)"></span>
                                </div>
                            </div>
                        </li>
                        <div class="default_page" v-show="commentList.length == 0 && idx!=0">
                            <img src="../images/default_no message.png" alt="">
                            <p v-html="msg_text.noneComment"></p>
                        </div>
                    </ul>
                    <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="_href" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="bullet_box" v-show="boxShow">
            <div class="bullet_box_content">
                <img src="../images/box.png" class="box_bg">
                <div class="box_content">
                    <img src="../images/icon_cancel_2.png" class="close" @click="boxShow = false">
                    <img src="../images/icon_groupy_120.png" class="groupy">
                    <p class="tips">请下载Groupy查看更多内容</p>
                    <span class="tips2">前往下载</span>
                    <a :href="_href" class="appstore"><img src="../images/btn_appstore.png"></a>
                </div>    
            </div>
        </div>    
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import http from '@env/http.js';
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            swiperOption: {
                  notNextTick: true,
                  // grabCursor : true,
                  setWrapperSize :true,
                  // autoHeight: true,
                  pagination : '.swiper-pagination',
                  paginationClickable :true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    if(swiper.activeIndex == 0) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_g_coin');
                        }) 
                    }else if(swiper.activeIndex == 1) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_like');
                        })
                    }
                  }
            },
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
                type: "video/mp4",
                src: "http://videodebug.groupy.vip/Act-ss-mp4-ld/a058daa12ab3412499cc78bff1df7d58/BC0EDA96-7544-483A-8278-ECD607B52EE6.mp4"
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
            loadingBig: true,
            idolShow: false,
            commentList: [],
            idx: 0,
            boxShow: false,
            msg_text: {
                publish: '投稿',
                pubMsg: '投稿して<br>盛り上がろう',
                noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                load: '読み込み中',
                loadAll: '全て表示されました'

            },
            _href: 'itms-apps://itunes.apple.com/app/id1251249933'
          }
        },
        methods: {
            changePages(val) {
                let tabs = $('.tabs');
                tabs.removeClass('active');
                tabs.eq(val).addClass('active')
                this.swiper.slideTo(val, 500, false)
                if(val == 0) {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('view_g_coin');
                    }) 
                }else if(val == 1) {
                    bridge.callHandler('view_like');
                }else {
                    bridge.callHandler('view_comment');
                }
            },
            formatTime(key) {
                let _m = Math.floor(key/60) >= 10 ? Math.floor(key/60) : '0'+ Math.floor(key/60);
                let _s = (key-Math.floor(key/60)*60) >= 10 ? (key-Math.floor(key/60)*60) : '0'+ (key-Math.floor(key/60)*60);
                return _m+":"+_s;
              },
            getVideo() {
                var self = this;
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

                        if(res.data.group) {
                            self.idolShow = true;
                            self.idol = res.data.group;
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
                // var _data = {

                //     topic: "groupy",
                //     app: "groupyIdol",
                //     platform: "h5",
                //     system: navigator.userAgent,
                //     version: "1.0.0",
                //     action: val,
                //     result: "success",
                //     videoId: location.href.split('/shareVideo/')[1].split('#/')[0]
                // }
                // http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                //     console.log('success');
                // }).catch(function(){

                // })
            }
        },
        mounted() {
          console.log('this is current player instance object', this.player)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            // this.getVideo();
            this.p_log('idol_share_h5_open');
            var ua = navigator.userAgent.toLowerCase();
            if (!(/iphone|ipad|ipod/.test(ua))) {
                this._href = 'https://itunes.apple.com/app/id1251249933';
            }else {
                this._href = 'itms-apps://itunes.apple.com/app/id1251249933';
            }
        }
      }
</script>

<style scoped lang="scss">
    @import "../styles/share.scss";
    .idol_desc {
        .idol_desc_bg {
            width: 100%;
            height: 258px;
            background: url(../images/default_img.png) no-repeat center center;
            background-size: cover;
            filter: blur(20px);           
        }
        position: relative;
        width: 100%;
        .idol_desc_content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 258px; 
            background-color: rgba(0,0,0,0.4);
            overflow: hidden;
            text-align: center;
            color: #fff;
            box-sizing: border-box;
            padding: 12px;
            .avatar {
                width: 60px;
                height: 60px;
                display: block;
                margin: 0 auto;
                float: none;
                margin-bottom: 4px;
            }
            .idol_name {
                font-size: 16px;
            }
            .idol_support {
                overflow: hidden;
                margin-top: 17px;
                span {
                    display: block;
                    float: left;
                    width: 41px;
                    img {
                        width: 20px;
                        display: block;
                        margin: 0 auto;
                    }
                    font-size: 12px;
                    font-weight: 100;
                }
                span:nth-child(2) {
                    margin-left: 10%;
                    margin-right: 10%;
                }
                span:last-child {
                    float: right;
                    width: 34%;
                    height: 36px;
                    line-height: 36px;
                    background-image: linear-gradient(124deg, #FF8550 0%, #FF2E79 100%);
                    border-radius: 50px;
                    font-weight: 500;
                    font-size: 18px;
                }
            }
            >p {
                text-align: left;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-bottom: 20px;
                margin-top: 12px;
            }
            .idol_fans_ranking {
                text-align: left;
                font-weight: 100;
                overflow: hidden;
                line-height: 25px;
                i:first-child {
                    float: left;
                }
                >img:last-child {
                    float: right;
                    width: 7px;
                    margin-top: 6.5px;
                }
                div {
                    overflow: hidden;
                    margin-left: 12px;
                    float: left;
                    img {
                        float: left;
                        margin-left: 8px;
                        display: block;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
    .detailPages {
        border-top: 10px solid #eee;
        width: 100%;
        background: #fff;
        height: 50px;
        line-height: 40px;
        display: flex;
        padding: 0 12px;
        text-align: center;
        box-sizing: border-box;
        filter: blur(0px);
        .tabs {
            flex: 1;
            box-sizing: border-box;
            margin: 0 12px;
            font-size: 14px;
            font-weight: 200;
        }
        .tabs.active {
            border-bottom: 3px solid #FC4083;
            color: #FC4083;
            font-weight: 600;
        }
    }
    .share_content {
        position: relative;
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
    }
    .gift_content {
        position: absolute;
        right: 20px;
        bottom: 50px;
        color: #fff;
        text-align: center;
        img {
            display: block;
            width: 45px;
            margin: 0 auto;
        }
        img:last-child {
            width: 64px;
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
        padding: 0 12px 8px;
        border-bottom: 1px solid #eee;
        span {
            float: left;
            box-sizing: border-box;
            img {
                width: 12px;
                margin-right: 3px;
            }
        }
        span:first-child {
            margin-right: 28px;
        }
        >img {
            float: right;
            width: 7px;
        }
    }
    .comment_total {
        overflow: hidden;
        padding: 8px 12px 0;
        color: #999;
        span:first-child {
            margin-top: 7px;
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
        a:last-child {
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
    .bullet_box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: 3;
        background: rgba(0,0,0,0.2);
        .bullet_box_content {
            position: relative;
            width: 260px;
            margin: calc(50vh - 158px) auto;
        }
        .box_bg {
            width: 100%;
            display: block;
        }
        .box_content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            text-align: center;
            .close {
                width: 22px;
                padding: 12px;
                display: block;
            }
            .groupy {
                width: 60px;
                display: block;
                margin: 20px auto 15px;
            }
            .tips {
                color: #fff;
                font-size: 16px;
                font-weight: 100;
                margin-bottom: 67px;
            }
            .tips2 {
                color: #666666;
            }
            .appstore {
                width: 145px;
                display: block;
                margin: 8px auto 0;
                img {
                    width: 100%;
                }
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
    .vjs_video_3-dimensions {
        height: auto !important;
    }
    .vjs_video_375-dimensions,.vjs_video_388-dimensions {
        width: 100%;
        height: auto;
    }
    .video-js .vjs-tech {
        position: inherit !important;
        background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.66) 100%) !important;
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
    .swiper-slide {
        max-height: auto;
        height: auto;
    }
</style>