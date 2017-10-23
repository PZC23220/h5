<template>
    <div class="main">
        <div class="header">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs">インストール</a>
        </div>
        <div class="content">
            <div class="idol_desc">
                <div class="idol_desc_bg" :style="idol.avatar?'background-image: url('+ idol.avatar +');':'background-image: url(http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png);'"></div>
                <div class="idol_desc_content">
                    <div>
                        <img v-lazy="idol.avatar" class="avatar">
                        <div class="idol_support"><span>{{idol.fansNums?Number(idol.fansNums).toLocaleString():0}}<em>ファン</em></span><span>{{idol.popularityScore?Number(idol.popularityScore).toLocaleString():0}}<em>Likes</em></span><a class="cursor" :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_join.png"><i>入会</i></a></div>
                        <span class="idol_name">{{idol.nickname?idol.nickname:'...'}}</span>
                        <p>{{idol.introduce?idol.introduce:'Groupyで待ってまーす。'}}</p>
                        <a class="idol_fans_ranking cursor" :href="hrefs" target="_blank"><i>ファンランキング</i><div><img v-for="img in fansList" v-lazy="img.avatar"></div><div class="no_fans" v-if="fansList.length<=0">No.1になって目立とう！</div><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png"></a>
                    </div>
                </div>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">動画</a>
                <a class="tabs" @click="changePages(1)">掲示板</a>
                <a class="tabs" :href="hrefs" target="_blank">個チャ</a>
                <a class="tabs" :href="hrefs" target="_blank">ストア</a>
            </div>
            <div class="share_content">
                <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                    <!-- slides -->
                    <swiper-slide id="swiper1">
                        <div class="video_content" v-for="(hot,key) in hotList" v-if="key < 5">
                            <div class="userinfo con_left" :class="{'left_show':idolShow}">
                                <img :src="idol.avatar?idol.avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" onerror="this.src='http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" alt="">
                                <div class="video_desc">
                                    <h3>{{idol.nickname?idol.nickname:'...'}}</h3>
                                    <p>{{formatTime(hot.data.publishTime)}}</p>
                                </div>
                            </div>
                            <div class="public_show">
                                <video-player  ref="videoPlayer" :options="hot.data.videoItemList[2]?getSrc(hot.data.videoItemList[2],hot.data.thumbnail):false"></video-player>
                                <div class="Masked" v-if="hot.data.publicType == 1"></div>
                                <div class="gift_content">
                                    <a :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/Like.png" class="cursor">10</a>
                                    <a :href="hrefs" target="_blank"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/gift.png" class="cursor"></a>
                                </div>
                                <span class="play_times"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/Video/video_icon_play%20times.png">{{hot.data.readCount}}</span>
                                <div class="Masked2" v-if="hot.data.publicType == 1">
                                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_vip.png">
                                    <p>この動画は会員のみ視聴可能です</p>
                                    <a :href="hrefs" target="_blank">会員登録へ</a>
                                </div>
                            </div>
                            <div class="video_desc_content">
                                <a :href="hrefs" target="_blank" class="video_option"><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png">{{hot.data.giftCount}}</span><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png">{{hot.data.popularity}}</span><div><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/idol/icon_comment.png">コメントする</div></a>
                                <p class="video_text">{{hot.data.title}}</p>
                                <ul class="comment_list" style="background: #fff;">
                                    <div class="comment_total"><span><i>コメント{{hot.data.postList.length}}件すべてを表示</i></span></div>
                                    <li v-for="comment in hot.data.postList" style="border: none;padding: 0 12px 3px;">
                                       <div class="comment_content"><span>{{comment.nickname?comment.nickname:'...'}}</span>{{comment.content}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a>
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
                                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
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
                                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
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
                                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
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
                                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                        </div>
                        <li v-for="(comment,key) in commentList" :class="[{'idol_comment' : comment.userType == 'idol'},{'lastLi' : key == commentList.length-1},{'firstLi' : key == 0}]">
                            <div class="comment_info">
                                <img v-lazy="comment.avatar" class="avatar">
                                <span>{{comment.nickname?comment.nickname:'...'}}</span>
                                <span class="level" v-if="comment.userType == 'fans'">Lv.{{comment.levelPlatform}}</span>
                                <img class="medal_level" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt="">
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
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                            <p v-html="msg_text.noneComment"></p>
                        </div>
                    </ul>
                    <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a>
                    </swiper-slide>
                </swiper>
            </div>
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
        <div class="bigImg" @click="bigImgShow = false" :class="{'bullet_box_show':bigImgShow}"><img :src="Imgsrc"><span></span></div>
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
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
                src: ''
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
            Imgsrc: 'http://upload.groupy.vip/post/D4AC388D-F977-4A9A-A973-E3CB18A76978.jpg',
            bigImgShow: false
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
            showBigImg(img) {
                this.Imgsrc = img;
                this.bigImgShow = true;
            },
            changePages(val) {
                let tabs = $('.tabs');
                tabs.removeClass('active');
                tabs.eq(val).addClass('active')
                this.swiper.slideTo(val, 500, false)
                if(val == 0) {
                    
                }else if(val == 1) {
                    
                }else {
                    
                }
            },
            formatTime(key) {
                let timer = new Date(key - 1*60*60*1000);
                return timer.Format('MM.dd') + '  '+ timer.Format('hh:mm');
            },
            getIdolInfo() {
                var self = this;
                http.get('/group/idolHomeAsFans',{
                    params: {
                        idolId: location.href.split('?idolId=')[1].split('#/')[0]
                    }
                }).then(function(res){
                    console.log(res);
                    if(res.data.idol) {
                        self.idol = res.data.idol;
                        $('.htmlTilte').html(res.data.idol.nickname);
                        $('.metaTitle').attr('content',res.data.idol.nickname);
                        $('.metaDesc').attr('content',res.data.idol.introduce);
                        $('.metaImg').attr('content',res.data.idol.avatar);
                    }
                    if(res.data.hotList) {
                        self.hotList = res.data.hotList;
                        for(var i=0;i<res.data.hotList.length;i++) {

                        }
                    }
                    if(res.data.fansList) {
                        self.fansList = res.data.fansList;
                    }
                }).catch(function(){

                });
            },
            getComments() {
                let self = this;
                http.get('/post/listByFans',{
                    params: {
                        idolId: location.href.split('?idolId=')[1].split('#/')[0],
                        from: 0,
                        rows: 10
                    }
                }).then(function(res){
                    self.loadingBig = false;
                    self.showLoading = false;
                    self.joined = res.data.joined;
                    if(res.data.post.length > 0 ) {
                        for(var i=0;i<res.data.post.length;i++){
                            self.commentList.push(res.data.post[i]);
                        }                    
                    }else {
                        self.havedlast = true;
                    }
                })
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
                    idolId: location.href.split('?idolId=')[1].split('#/')[0]
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
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            this.getIdolInfo();
            this.getComments();
            this.p_log('idol_shareIdolHome_h5_open');
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
    .idol_desc {
        .idol_desc_bg {
            width: 100%;
            height: 240px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            filter: blur(12px);           
        }
        position: relative;
        width: 100%;
        overflow: hidden;
        .idol_desc_content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 240px;
            padding-top: 95px; 
            background-color: rgba(0,0,0,0.4);
            overflow: hidden;
            text-align: center;
            box-sizing: border-box;
            padding-top: 94px;
            >div {
                background: #fff;
                height: 146px;
                box-sizing: border-box;
                padding: 0 12px 12px;
                >p {
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            .avatar {
                width: 90px;
                height: 90px;
                position: absolute;
                left: 12px;
                top: 50px;
                margin: 0;
            }
            .idol_name {
                font-size: 18px;
                text-align: left;
                display: block;
                max-width: 80%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                padding: 8px 0;
            }
            .idol_support {
                overflow: hidden;
                padding-top: 9px;
                padding-left: 110px;
                span {
                    display: block;
                    float: left;
                    width: 41px;
                    em {
                        width: 40px;
                        display: block;
                        margin: 0 auto;
                        color: #666;
                    }
                    font-size: 12px;
                }
                span:nth-child(2) {
                    margin-left: 10%;
                    margin-right: 10%;
                }
                a {
                    float: right;
                    width: 34%;
                    height: 36px;
                    line-height: 34px;
                    background-image: linear-gradient(124deg, #FF8550 0%, #FF2E79 100%);
                    border-radius: 50px;
                    font-size: 16px;
                    color: #fff;
                    img {
                        width: 20px;
                        vertical-align: middle;
                    }
                }
            }
            .idol_fans_ranking {
                text-align: left;
                font-weight: 100;
                overflow: hidden;
                display: block;
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
                .no_fans {
                    font-size: 10px;
                    -webkit-transform: scale(0.8);
                    display: inline-block;
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
        overflow: hidden;
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
    .bullet_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 3;
        background: rgba(0,0,0,0.2);
        .bullet_box_content {
            position: relative;
            width: 260px;
            margin: calc(50vh - 158px) auto;
            opacity: 0;
            transition: all 0.3s;
            transform: scale(0);
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
    .bigImg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 500px;
        height: 100vh;
        z-index: 5;
        background: #000;
        vertical-align: middle;
        line-height: 100vh;
        opacity: 0;
        transition: all 0.3s;
        transform: scale(0);
        img {
            width: 100%;
            height: auto;
            vertical-align: middle;
        }

    }
    @media screen and (min-width: 500px) {
        .bigImg {
            left: 50% !important;
            margin-left: -250px !important;
        }
    }
    .bullet_box_show {
        opacity: 1 !important;
        transform: scale(1) !important;
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
    .swiper-slide {
        max-height: auto;
        height: auto;
    }
</style>