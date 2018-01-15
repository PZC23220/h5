<template>
    <div class="main">
       <div class="content" v-if="!reply">
            <!-- <div class="video_content">
                <video-player  ref="videoPlayer" :options="playerOptions"></video-player>
            </div> -->
            <div class="video_content">
                <video :src="videoSrc"
                :poster="videoPoster"
                loop
                @click="videoPaused()"
                :muted="dMuted"
                @ended='onPlayerEnded()'
                webkit-playsinline="true"
                playsinline="true"
                x-webkit-airplay="allow"
                x5-video-player-fullscreen="false"
                x5-video-orientation="portraint"
                controls="false"
                style="object-fit:fill"
                id="idolVideo"
                preload>
                您的浏览器不支持 video 标签。
                </video>
                <!-- <div  class="poster" v-if="posterSee"><img :src="videoPoster"><span></span></div> -->
                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_play.png" class="video_play" v-if="videoPlay" @click="videoPlayed()">
                <img :src="isMuted" class="video_muted" @click="videoMuted()">
            </div>
            <div class="video_details">
                <span class="video_gcoins"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="" class="icon"> <i class="video_money" :class="{'video_money_show':(gcoinList.total || gcoinList.total == 0)}">{{gcoinList.total?Number(gcoinList.total).toLocaleString():0}}</i></span>
                <span class="video_gcoins"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="" class="icon"> <i class="video_money" :class="{'video_money_show':(gcoinList.totalPopularity || gcoinList.totalPopularity == 0)}">{{gcoinList.totalPopularity?Number(gcoinList.totalPopularity).toLocaleString():0}}</i></span>
                <span class="video_comments" v-show='false' @click="add_reply(comment)"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_comment.png"><i>コメントする</i></span>
            </div>
            <div class="video_title eBorder video_money" :class="{'video_money_show':videoTitle}"><span class="video_idol_name">{{idolName?idolName:'...'}}</span>{{videoTitle?videoTitle:'...'}}</div>
            <div class="detailPages" id="scrollIntoPages">
                <a class="tabs active" @click="changePages(0)">{{video_text.comment}}</a>
                <a class="tabs" @click="changePages(1)">{{video_text.Gcoin}}</a>
                <span class="bgActive"></span>
            </div>
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <!-- <v-scroll :on-refresh="refresh" :on-infinite="infinite"> -->
                    <ul class="comment_list" style="background: #eee;">
                        <li v-for="(comment,key) in commentList" :class="[{'lastLi' : commentList.length > 5 && key == commentList.length-1},{'firstLi' : key == 0}]">
                            <div class="comment_info">
                                <span class="avatar"><img  v-lazy="comment.avatar" alt=""></span>
                                <span class="name">{{comment.nickname?comment.nickname:'...'}}</span>
                                <!-- <img class="level" :src="'/static/images/icon_level_'+(comment.levelPlatform)+'.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" alt=""> -->
                                <span class="level" style="margin-top: 11px;">Lv.{{comment.levelPlatform}}</span>
                                <img class="medal_level" style="margin-top: 11px;" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt="">
                            </div>
                            <div class="comment_content" v-html="TransferString(comment.content)"></div>
                            <div class="comment_reply" v-if="comment.referencePostView"><span>{{comment.referencePostView.nickname}}</span> <p v-html="TransferString(comment.referencePostView.content)"></p></div>
                            <div class="reply"><span v-html="formatTime(comment.createTime)"></span><span @click="add_reply(comment)"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_comment_blue.png"><em>{{video_text.reply}}</em></span></div>
                        </li>
                        <div class="default_page default_page3" v-show="commentList.length == 0">
                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20like.png" alt="">
                            <p v-html="video_text.noneComment"></p>
                        </div>
                        <!-- <div class="loading" :class="{'loading_show': showLoading}"><p><img src="/img/loading_1.png" alt="">読み込み中</p><p v-show="havedlast">全て表示されました</p></div> -->
                    </ul>
                <!-- </scroller> -->
                <!-- </v-scroll> -->
            </swiper-slide>
            <swiper-slide id="swiper2">
                <!-- <div class="income eBorder">
                    <span class="detail_title" @click="getGcoin()">{{video_text.income}}</span>
                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="" class="icon"><i class="video_money" :class="{'video_money_show':(gcoinList.total || gcoinList.total == 0)}">{{gcoinList.total?Number(gcoinList.total).toLocaleString():0}}</i></span>
                </div> -->
                <div class="income_details eBorder">
                    <p class="detail_title">{{video_text.gift}}</p>
                    <ul class="income_img">
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_heart.png" style="background-color: #ffe7ea;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[1].giftCount?gcoinList.gift[1].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_star.png" style="background-color: #fffddd;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[0].giftCount?gcoinList.gift[0].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_rose.png" style="background-color: #ffe9ec;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[2].giftCount?gcoinList.gift[2].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_diamond.png" style="background-color: #e1eff2;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[3].giftCount?gcoinList.gift[3].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ lollipop.png" style="background-color: #ffedef;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[4].giftCount?gcoinList.gift[4].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ sushi.png" style="background-color: #fff5e5;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[5].giftCount?gcoinList.gift[5].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_bear.png" style="background-color: #fff1e2;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[6].giftCount?gcoinList.gift[6].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ noodles.png" style="background-color: #ffefe9;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[7].giftCount?gcoinList.gift[7].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_tree.png" style="background-color: #ffedfe;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[8].giftCount?gcoinList.gift[8].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_tower.png" style="background-color: #ffe9ea;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[9].giftCount?gcoinList.gift[9].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_castle.png" style="background-color: #dbe6f6;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[10].giftCount?gcoinList.gift[10].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_firework.png" style="background-color: #e8fdff;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[11].giftCount?gcoinList.gift[11].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ maple.png" style="background-color: #fef4e8;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[12].giftCount?gcoinList.gift[12].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ island.png" style="background-color: #ffeced;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[13].giftCount?gcoinList.gift[13].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ meteor.png" style="background-color: #f3f1ff;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[14].giftCount?gcoinList.gift[14].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_fuji.png" style="background-color: #e5f2ff;" alt="">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}">&times;{{Number(gcoinList.gift?(gcoinList.gift[15].giftCount?gcoinList.gift[15].giftCount:0):0).toLocaleString()}}</span></p>
                        </li>
                    </ul>
                </div>
                <div class="fans_detail">
                    <div class="fansPages">
                        <a class="tabs2 active" @click="changePages2(0)">{{video_text.Gcoin}}</a>
                        <a class="tabs2" @click="changePages2(1)">{{video_text.like}}</a>
                    </div>
                    <swiper :options="swiperOption2" ref="mySwiper2" class="banner_container">
                        <swiper-slide id="swiper4">
                            <ul class="comment_list">
                                <li v-for="(fans,key) in gcoinList.rank" >
                                    <!-- <left-slider :index="key" @deleteItem="deleteItem(fans.fansId)"> -->
                                        <span class="level_color" v-if="key == 0"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                        <span class="level_color" v-if="key == 1"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                        <span class="level_color" v-if="key == 2"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                        <span class="level_color" v-if="key > 2">{{key+1}}</span>
                                        <span class="avatar" v-if="fans.userFans"><img v-lazy="fans.userFans.avatar" alt=""></span>
                                        <span class="shortName">{{fans.userFans?fans.userFans.nickname: '...'}}</span>
                                        <!-- <img :src="fans.userFans?('/static/images/icon_level_'+ (fans.userFans.levelPlatform) +'.png'): '/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <!-- <img :src="fans.userFans?('/img/icon_medal_'+ (fans.userFans.medal) +'.png'): ''" class="level" alt=""> -->
                                        <span class="level">Lv.{{fans.userFans?(fans.userFans.levelPlatform?fans.userFans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(fans.userFans.medal)+'.png'" v-if="fans.userFans.medal&&fans.userFans.medal>0" alt="">
                                        <i>
                                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" class="likes" alt="">{{fans.expendGprice?Number(fans.expendGprice).toLocaleString(): 0}}
                                        </i>
                                    <!-- </left-slider> -->
                                </li>
                                <div class="default_page" v-show="gcoinList.rank?gcoinList.rank.length == 0:true" style="padding-top: 32px;">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no coin.png" alt="">
                                    <p v-html="video_text.noneGcoin"></p>
                                </div>
                            </ul>
                        </swiper-slide>
                        <swiper-slide id="swiper5">
                            <ul class="comment_list" style="padding: 0;">
                                <li v-for="(popularity,key) in popularityList" >
                                    <!-- <left-slider :index="key" @deleteItem="deleteItem(popularity.fansId)"> -->
                                        <span class="level_color" v-if="key == 0"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                        <span class="level_color" v-if="key == 1"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                        <span class="level_color" v-if="key == 2"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                        <span class="level_color" v-if="key > 2">{{key+1}}</span>
                                        <span class="avatar" v-if="popularity.userFans"><img v-lazy="popularity.userFans.avatar" alt=""></span>
                                        <span class="shortName">{{popularity.userFans?(popularity.userFans.nickname?popularity.userFans.nickname:'...'):'...'}}</span>
                                        <!-- <img :src="popularity.userFans?('/static/images/icon_level_'+(popularity.userFans.levelPlatform)+'.png'):''" class="level" alt=""> -->
                                        <span class="level">Lv.{{popularity.userFans?(popularity.userFans.levelPlatform?popularity.userFans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(popularity.userFans.medal)+'.png'" v-if="popularity.userFans.medal&&popularity.userFans.medal>0" alt="">
                                        <i>
                                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" class="likes" alt="">{{popularity.totalNums?Number(popularity.totalNums).toLocaleString():'0'}}
                                        </i>
                                    <!-- </left-slider> -->
                                </li>
                                <div class="default_page" v-show="popularityList.length == 0">
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no comment.png" alt="">
                                    <p v-html="video_text.noneLike"></p>
                                </div>
                            </ul>
                        </swiper-slide>
                    </swiper>
                </div>
            </swiper-slide>
          </swiper>
          <div class="Forbidden"></div>
        </div>
        <div class="reply_container" v-if="reply">
            <div class="reply_header"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/close/close.png" @click="reply = false">{{video_text.reply}}<span @click="reply_submit()">{{video_text.submit}}</span></div>
            <div class="reply_comment_content"><span>{{reply_comment_content_fans}}</span>{{reply_comment_content}}</div>
            <textarea class="reply_content" v-model="reply_content" :placeholder="video_text.replyTips"></textarea>
        </div>
        <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import VideoPlayer from 'vue-video-player';
    import Scroll from '../../../components/scroll.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import $ from 'n-zepto';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                swiperOption: {
                  notNextTick: true,
                  setWrapperSize :true,
                  pagination : '.swiper-pagination',
                  paginationClickable :true,
                  iOSEdgeSwipeDetection : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    $('.bgActive').css('left','calc('+ swiper.activeIndex +'*50%)');
                    if(swiper.activeIndex == 0) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_comment');
                        })
                    }else{
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_g_coin');
                        })
                    }
                  },
                },
                swiperOption2: {
                  notNextTick: true,
                  setWrapperSize :true,
                  pagination : '.swiper-pagination',
                  paginationClickable :true,
                  iOSEdgeSwipeDetection : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs2').removeClass('active')
                    $('.tabs2').eq(swiper.activeIndex).addClass('active');
                    if(swiper.activeIndex == 0) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_g_coin');
                        })
                    }else{
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_like');
                        })
                    }
                  },
                },
                isMuted: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_on.png',
                posterSee: true,
                videoSrc: '',
                videoPoster: '',
                dMuted: false,
                commentList: [],
                gcoinList: {},
                popularityList: [],
                start: 0,
                num: 20,
                reply: false,
                videoPlay: true,
                showLoading: false,
                showLoading2: false,
                loadingBig: true,
                havedlast: false,
                videoTitle: '',
                idolName: '',
                token_: '',
                commentId: '',
                idx: 0,
                idx1: 0,
                idx2: 0,
                reply_content: '',
                reply_comment_content: '',
                reply_comment_content_fans: '',
                video_text: {
                    Gcoin: 'コイン',
                    like: 'Like',
                    comment: 'コメント',
                    income: '獲得コイン数',
                    gift: 'ギフトリスト',
                    fans: '貢献ランキング',
                    reply: 'リプライ',
                    noneGcoin: 'まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう',
                    submit: '送信',
                    replyTips: '回复みおな'
                },
            }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            videoMuted() {
                if(this.isMuted == 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_on.png') {
                    this.isMuted = 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_off.png'
                }else {
                    this.isMuted = 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/video_icon_voice_on.png'
                }
                this.dMuted = !this.dMuted;
            },
            videoPaused() {
                $('#idolVideo')[0].pause();
                this.videoPlay = true;
            },
            videoPlayed() {
                $('#idolVideo')[0].play();
                this.posterSee = false;
                this.videoPlay = false;
            },
            onPlayerEnded() {
                this.videoPlay = true;
            },
            add_reply(obj) {
                if(obj) {
                    this.reply_comment_content = obj.content;
                    this.reply_comment_content_fans = obj.nickname;
                    this.commentId = obj.id;
                }
                this.reply = true;
                setTimeout(function(){
                    document.querySelector('textarea').focus();
                },0);
            },
            reply_submit() {
                let self = this;
                // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                if(self.reply_content !=""){
                    if(!self.token_) {
                        self.token_ = getParams('token');
                    }
                    if(self.token_!='(null)' && self.token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.token_;
                    }
                    let _data = {
                        content:self.reply_content,
                        targetType: 1,
                        targetId: getParams('videoId'),
                        reference: self.commentId
                    }
                    console.log(_data);
                    http.post('/post/add?type=idol',JSON.stringify(_data)).then(function(res){
                        if(res.status) {
                            self.refresh();
                            self.reply_content = '';
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                 if(getParams('language') == 'cn') {
                                    bridge.callHandler('makeToast', '回复成功！');
                                 }else {
                                    bridge.callHandler('makeToast', 'リプライしました！');
                                 }
                            });
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                if(getParams('language') == 'cn') {
                                    bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                                 }else {
                                    bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                                 }
                            });
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                    self.token_ = responseData.token;
                                })
                            })
                        }
                        self.reply = false;
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                                if(getParams('language') == 'cn') {
                                    bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                                 }else {
                                    bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                                 }
                        })
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                self.token_ = responseData.token;
                            })
                        })
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                         if(getParams('language') == 'cn') {
                            bridge.callHandler('makeToast', '请输入评论！');
                         }else {
                            bridge.callHandler('makeToast', 'コメントを入力してください');
                         }
                    })
                }
            },
            changePages(val) {
                let tabs = $('.tabs');
                tabs.removeClass('active');
                tabs.eq(val).addClass('active')
                this.swiper.slideTo(val, 500, false);
                $('.bgActive').css('left','calc('+ val +'*50%)');
                if(val == 0) {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('view_comment');
                    })
                }else {
                    bridge.callHandler('view_like');
                }
            },
            changePages2(val) {
                let tabs = $('.tabs2');
                tabs.removeClass('active');
                tabs.eq(val).addClass('active')
                this.swiper2.slideTo(val, 500, false);
                window.setupWebViewJavascriptBridge(function(bridge) {
                    if(val == 0) {
                            bridge.callHandler('view_g_coin');
                    }else{
                        bridge.callHandler('view_like');
                    }
                })
            },
            formatTime(key) {
                  let timer = new Date(key);
                  return timer.Format('MM.dd')+ '&nbsp;' + timer.Format('hh:mm')
           },
            TransferString(content) {
                 let string = content;
                 try{
                    string=string.replace(/\r\n/g,"<br>")
                    string=string.replace(/\n/g,"<br>");
                 }catch(e) {
                    console.log(e.message);
                 }
                 return string;
            },
            getVideo(token) {
                let self = this;
                if(self.idx2 < 2) {
                    self.idx2++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/video/getVideo',{
                        params: {
                            videoId: getParams('videoId')
                        }
                    }).then(function(res){
                        if(res.status == 200) {
                            if(res.data.firstFrame) {
                                self.videoPoster = res.data.firstFrame;
                            }
                            if(res.data.title) {
                                self.videoTitle = res.data.title;
                            }
                            if(res.data.videoItemList) {
                                let videoItem = res.data.videoItemList;
                                let videoitem = {
                                    hd: '',
                                    ld: '',
                                    sd: ''
                                };
                                videoItem.forEach(function(item){
                                    if(item.resolution == 'sd') {
                                        $.ajax({
                                            url: item.url,
                                            type: 'head',
                                            async: false,
                                            success: function(res) {
                                                videoitem.sd = item.url;
                                            }
                                        })
                                    }
                                    else if(item.resolution == 'ld') {
                                        $.ajax({
                                            url: item.url,
                                            type: 'head',
                                            async: false,
                                            success: function(res) {
                                                videoitem.ld = item.url;
                                            }
                                        })
                                    }else {
                                        $.ajax({
                                            url: item.url,
                                            type: 'head',
                                            async: false,
                                            success: function(res) {
                                                videoitem.hd = item.url;
                                            }
                                        })
                                    }
                                })
                                if(videoitem.hd) {
                                    self.videoSrc = videoitem.hd
                                }else if(videoitem.ld) {
                                    self.videoSrc = videoitem.ld
                                }else {
                                    self.videoSrc = videoitem.sd
                                }
                                let ele = document.querySelector('#scrollIntoPages');
                                ele.scrollIntoView(false);
                                $('.poster').css('height',`calc(100vw * ${res.data.videoItemList[len].height}/${res.data.videoItemList[len].width})`)
                            }
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                    self.getVideo(responseData.token);
                                })
                            })
                        }
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                self.getVideo(responseData.token);
                            })
                        })
                    });
                }
            },
            getComments() {
                let self = this;
                http.get('/post/list',{
                    params: {
                        targetType: 1,
                        targetId: getParams('videoId'),
                        from: self.start,
                        rows: self.num
                    }
                }).then(function(res){
                    console.log(res)
                    self.showLoading = false;
                    if(res.data.length>0) {
                        for(var i=0;i<res.data.length;i++){
                            self.commentList.push(res.data[i]);
                        }
                    }else {
                        self.havedlast = true;
                    }
                })
            },
            getGcoin(token) {
                let self = this;
                if(self.idx < 1) {
                    self.idx++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/video/gcoin',{
                        params: {
                            videoId: getParams('videoId')
                        }
                    }).then(function(res){
                        if(res.status == 200) {
                            self.gcoinList = res.data;
                            self.loadingBig = false;
                            console.log(self.gcoinList)
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                    self.getGoin(responseData.token);
                                })
                            })
                        }
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                self.getGcoin(responseData.token);
                            })
                        })
                    });
                }
            },
            getPopularity(token) {
                let self = this;
                if(self.idx1 < 1) {
                    self.idx1++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/video/popularity',{
                        params: {
                            videoId: getParams('videoId')
                        }
                    }).then(function(res){
                        if(res.status == 200) {
                            self.popularityList = res.data;
                            console.log(self.popularityList)
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                    self.getPopularity(responseData.token);
                                })
                            })
                        }
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                self.getPopularity(responseData.token);
                            })
                        })
                    });
                }
            },
            refresh (done) {
                var self = this;
                http.get('/post/list',{
                    params: {
                        targetType: 1,
                        targetId: getParams('videoId'),
                        from: 0,
                        rows: self.num
                    }
                }).then(function(res){
                    self.start = 0;
                    self.havedlast = false;
                    self.showLoading2 = false;
                     self.commentList = res.data;
                    console.log(self.commentList);
                }).catch(function(){
                    self.showLoading2 = false;
                });
                setTimeout(() => {
                  done()
                }, 500)
            },
            infinite (done) {
                var self = this;
                if(self.commentList.length>0) {
                   if (self.havedlast) {
                      setTimeout(() => {
                        done(true)
                      }, 500)
                      return;
                    } else {
                        setTimeout(() => {
                          self.start = self.start + self.num;
                          self.getComments();
                          done()
                        }, 500)
                    }
                }else {
                  setTimeout(() => {
                    done(true)
                  }, 1500)
                  return;
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            swiper2() {
                return this.$refs.mySwiper2.swiper
            }
        },
        created() {
            var self = this;
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                 self.video_text= {
                    Gcoin: 'G币',
                    like: '人气',
                    comment: '评论',
                    income: '本视频G币',
                    gift: '礼物数量',
                    fans: '粉丝排行',
                    reply: '回复',
                    noneGcoin: '还没有收到粉丝的G币<br>分享视频能让更多粉丝关注',
                    noneLike: '还没有收到粉丝的点赞人气<br>分享视频能让更多粉丝关注',
                    noneComment: '还没有收到粉丝的评论<br>分享视频能让更多粉丝关注',
                    submit: '提交',
                    replyTips: '请输入回复信息'

                }
              } else {
                self.video_text= {
                    Gcoin: 'コイン',
                    like: 'Like',
                    comment: 'コメント',
                    income: '獲得コイン数',
                    gift: 'ギフトリスト',
                    fans: '貢献ランキング',
                    reply: 'リプライ',
                    noneGcoin: 'まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう',
                    submit: '送信',
                    replyTips: '回复みおな'
                }
              }
            self.idolName = decodeURIComponent(getParams('idolName'));
            self.getVideo();
            self.getComments();
            setTimeout(function(){
                self.getPopularity();
                self.getGcoin();
            },0);
        }
    }
</script>
