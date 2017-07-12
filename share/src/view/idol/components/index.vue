<template>
    <div class="main">
        <div class="header">
            <img src="/img/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="_href">インストール</a>
        </div>
        <div class="content">
            <div class="idol_desc">
                <div class="idol_desc_bg" :style="idol.avatar?'background-image: url('+ idol.avatar +');':'background-image: url(http://h5.groupy.vip/static/images/default_img.png);'"></div>
                <div class="idol_desc_content">
                    <img :src="idol.avatar?idol.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" class="avatar">
                    <span class="idol_name">{{idol.nickname?idol.nickname:'...'}}</span>
                    <div class="idol_support"><span><img src="/img/idol/idol_icon_fans.png">{{idol.fansNums?Number(idol.fansNums).toLocaleString():0}}</span><span><img src="/img/idol/idol_icon_likes.png">{{idol.popularityScore?Number(idol.popularityScore).toLocaleString():0}}</span><span><img src="/img/idol/idol_icon_ranking.png">{{idol.rankingPosition?Number(idol.rankingPosition).toLocaleString():0}}位</span><span class="cursor" @click="boxShow = true;">応援</span></div>
                    <p>{{idol.introduce?idol.introduce:'我在groupy等你哦！'}}</p>
                    <div class="idol_fans_ranking cursor" @click="boxShow = true;"><i>粉丝排行</i><div><img v-for="img in fansList" :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'"  onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'"></div><div class="no_fans" v-if="fansList.length<=0">赶紧来抢占第一位吧！</div><img src="/img/icon_arrow_white.png"></div>
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
                        <div class="video_content" v-for="hot in hotList">
                            <div class="userinfo con_left" :class="{'left_show':idolShow}">
                                <img :src="idol.avatar?idol.avatar: 'http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                <div class="video_desc">
                                    <h3>{{idol.nickname?idol.nickname:'...'}}</h3>
                                    <p>{{formatTime(hot.data.publishTime)}}</p>
                                </div>
                            </div>
                            <div class="public_show">
                                <video-player  ref="videoPlayer" :options="hot.data.videoItemList[2]?getSrc(hot.data.videoItemList[2],hot.data.thumbnail):false"></video-player>
                                <div class="Masked" v-if="hot.data.publicType == 1"></div>
                                <div class="gift_content">
                                    <img src="/img/idol/Like.png" class="cursor" @click="boxShow = true;">10
                                    <img src="/img/idol/gift.png" class="cursor" @click="boxShow = true;">
                                </div>
                                <span class="play_times"><img src="/img/video_icon_play times.png">325</span>
                                <div class="Masked2" v-if="hot.data.publicType == 1">
                                    <img src="/img/idol/icon_vip.png">
                                    <p>加入会员才能观看视频</p>
                                    <div @click="boxShow = true;">入会</div>
                                </div>
                            </div>
                            <div class="video_desc_content">
                                <p class="video_text">{{hot.data.title}}</p>
                                <a :href="_href" class="video_option"><span><img src="/img/timeline_icon_coins.png">{{hot.data.giftCount}}</span><span><img src="/img/timeline_icon_likes.png">{{hot.data.popularity}}</span><img src="/img/icon_arrow_gray.png"></a>
                                <ul class="comment_list" style="background: #fff;">
                                    <div class="comment_total"><span><img src="/img/idol/icon_comment.png"><i>共{{hot.data.postList.length}}条评论</i><img src="/img/icon_arrow_gray.png" alt=""></span><div @click="boxShow = true;" class="cursor">添加评论</div></div>
                                    <li v-for="comment in hot.data.postList">
                                        <div class="comment_info">
                                            <img :src="comment.avatar" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="avatar">
                                            <span>{{comment.nickname}}</span>
                                            <img :src="comment.level?'/img/icon_level_'+(comment.level+1)+'.png':'/static/images/icon_level_1.png'" alt="" v-if="comment.userType == 'fans'" class="level">
                                            <img :src="comment.medal?'/img/icon_level_'+(comment.medal)+'.png':'/static/images/icon_level_1.png'" alt="" v-if="comment.userType == 'fans'" class="level">
                                            <i>{{formatTime(comment.createTime)}}</i>
                                        </div>
                                        <div class="comment_content">{{comment.content}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="_href" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a>
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
                                    <img :src="'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="avatar">
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
                                    <img :src="'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="avatar">
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
                                    <img :src="'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="avatar">
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
                                    <img :src="'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="avatar">
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
                            <div class="userinfo">
                                <img :src="comment.avatar" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="avatar">
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
                            <img src="/img/default_no message.png" alt="">
                            <p v-html="msg_text.noneComment"></p>
                        </div>
                    </ul>
                    <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="_href" class="download" style="margin-bottom: 40px;">Groupyをダウンロードしてもっと見よう</a>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="bullet_box" :class="{'bullet_box_show':boxShow}">
            <div class="bullet_box_content">
                <img src="/img/idol/box.png" class="box_bg">
                <div class="box_content">
                    <img src="/img/icon_cancel_2.png" class="close" @click="boxShow = false">
                    <img src="/img/icon_groupy_120.png" class="groupy">
                    <p class="tips">请下载Groupy查看更多内容</p>
                    <span class="tips2">前往下载</span>
                    <a :href="_href" class="appstore"><img src="/img/btn_appstore.png"></a>
                </div>
            </div>
        </div>
        <div class="bigImg" @click="bigImgShow = false" :class="{'bullet_box_show':bigImgShow}"><img :src="Imgsrc"><span></span></div>
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import http from '../http.js';
    require('../common.js')
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
                       
                    }else if(swiper.activeIndex == 1) {
                        
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
            _href: 'itms-apps://itunes.apple.com/app/id1251249933',
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
                return playerOptions
                console.log(playerOptions)
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
                let timer = new Date(key);
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
                    app: "groupyIdol",
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
            console.log(this.$route.query)
            // this.p_log('idol_share_h5_open');
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
    // @import "../styles/share.scss";
    .idol_desc {
        .idol_desc_bg {
            width: 100%;
            height: 258px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            filter: blur(20px);           
        }
        position: relative;
        width: 100%;
        overflow: hidden;
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
        filter: blur(20px);
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
            margin: 150px auto 12px;
        }
        p {
            font-size: 14px;
            margin-bottom: 16px;
        }
        div {
            width: 140px;
            height: 45px;
            line-height: 45px;
            border-radius: 26px;
            background: #00B4BC;
            font-size: 18px;
            margin: 0 auto;
        }
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
        padding: 8px 12px;
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
        opacity: 0;
        transition: all 0.3s;
        background: rgba(0,0,0,0.2);
        transform: scale(0);
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
    .bigImg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
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
    .bullet_box_show {
        opacity: 1;
        transform: scale(1);
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
    }
    .vjs-playback-rate-value {
        display: none;
    }
    .video-js.vjs-custom-skin .vjs-control-bar .vjs-fullscreen-control  {
        display: none;
    }
    .video-player,.vjs-poster {
        height: calc(100vw * 502/375) !important;
        max-height: calc(500px * 502/375) !important;
    }
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