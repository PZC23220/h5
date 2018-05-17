<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
        <!-- <div class="go_back" v-if="android">
            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/nav_icon_arrow_black.png" alt="" @click="close()">
            <span>{{fans_text.pubMsg}}</span>
        </div> -->
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{fans_text.Gcoin}}</a>
                <a class="tabs" @click="changePages(1)">{{fans_text.like}}</a>
                <span class="bgActive" style="width: 144px;margin-left: calc((100vw - 24px)* 1/4 - 72px);"></span>
            </div>
        </div>
         <div class="content" :class="{'ios': android == false}">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                    <v-scroll :on-refresh="refresh" :on-infinite="infinite" :dataList="scrollData">
                         <ul class="comment_list">
                           <!--  <h3 class="ranking_type"  :class="{'left_hide':!meObj.position}">{{fans_text.me}}</h3>
                            <li class="con_left" :class="{'left_show':meObj.position}" v-if="meObj.position">
                                <span v-if="!meObj.position">0</span>
                                <span v-if="meObj.position==1"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="meObj.position==2"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="meObj.position==3"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="meObj.position>3" :class="[{'second':meObj.position>9},{'three':meObj.position>99}]">{{meObj.position?meObj.position:'-'}}</span>
                                <span class="avatar" v-if="meObj.userFans"><img v-lazy="meObj.userFans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span>
                                        <em>{{meObj.userFans?(meObj.userFans.nickname?meObj.userFans.nickname:'...'):'...'}}</em>
                                        <span class="level">Lv.{{meObj.userFans?(meObj.userFans.levelPlatform?meObj.userFans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(meObj.userFans.medal)+'.png'" v-if="meObj.userFans?(meObj.userFans.medal&&meObj.userFans.medal>0):false" alt="">
                                    </span>
                                    <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">{{meObj.expendGprice?Number(meObj.expendGprice).toLocaleString(): 0}}</span>
                                </div>
                            </li>
                            <h3 class="ranking_type">{{fans_text.all}}</h3>-->
                            <div class="con_left" :class="{'left_hide':rakingList.length>0}">
                                <li>
                                    <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>4</span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>5</span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>6</span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                            </div>
                            <li v-for="(idol,key) in rakingList">
                                <span v-if="key==0"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="key==1"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="key==2"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="key>2" :class="[{'second':key>8},{'three':key>98}]">{{key+1}}</span>
                                <span class="avatar" v-if="idol.userFans"><img v-lazy="idol.userFans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span>
                                        <em>{{idol.userFans?idol.userFans.nickname:'...'}}</em>
                                        <span class="level">Lv.{{idol.userFans?(idol.userFans.levelPlatform?idol.userFans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(idol.userFans.medal)+'.png'" v-if="idol.userFans?(idol.userFans.medal&&idol.userFans.medal>0):false" alt="">
                                    </span>
                                    <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">{{idol.expendGprice?Number(idol.expendGprice).toLocaleString(): 0}}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="default_page default_page3" v-show="rakingList.length == 0 && idx!=0">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no coin.png" alt="">
                            <p v-html="fans_text.noneGcoin"></p>
                        </div>
                    </v-scroll>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <v-scroll :on-refresh="refresh2" :on-infinite="infinite2" :dataList="scrollData2">
                        <ul class="comment_list">
                            <div class="con_left" :class="{'left_hide':rankingHeat.length>0}">
                                <li>
                                    <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                            </div>
                            <li v-for="(idol,key) in rankingHeat">
                                <span v-if="key==0"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="key==1"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="key==2"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="key>2" :class="[{'second':key>8},{'three':key>98}]">{{key+1}}</span>
                                <span class="avatar" v-if="idol.userFans"><img v-lazy="idol.userFans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span>
                                        <em>{{idol.userFans?idol.userFans.nickname:'...'}}</em>
                                        <span class="level">Lv.{{idol.userFans?(idol.userFans.levelPlatform?idol.userFans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(idol.userFans.medal)+'.png'" v-if="idol.userFans?(idol.userFans.medal&&idol.userFans.medal>0):false" alt="">
                                    </span>
                                    <span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{idol.totalNums?Number(idol.totalNums).toLocaleString(): 0}}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="default_page default_page3" v-show="rankingHeat.length == 0 && idx2!=0">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20like.png" alt="">
                            <p v-html="fans_text.noneLike"></p>
                        </div>
                    <!-- </scroller> -->
                    </v-scroll>
                </swiper-slide>
            </swiper>
            <div class="Forbidden"></div>
         </div>
         <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>

<script>
    // import VueScroller from 'vue-scroller';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import Scroll from '../../../components/scroll.vue';
    import $ from 'n-zepto';
    import http from '@api/js/http.js';
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
                    $('.bgActive').css('left','calc((100vw - 24px)* '+ (swiper.activeIndex) +'/2)');
                  },
                },
                rakingList: [],
                rankingHeat:[],
                meHeatObj: {},
                meObj: {},
                loadingBig: false,
                start: 0,
                num: 20,
                start2: 0,
                num2: 20,
                len: 20,
                len2: 20,
                default1: false,
                default2: false,
                android: false,
                havedlast: false,
                havedlast2: false,
                idx: 0,
                idx2: 0,
                fans_text: {
                    Gcoin: 'コイン',
                    like: 'Like',
                    me: '自分の順位',
                    all: '全体ランキング',
                    noneGcoin: 'まだコインはないようです',
                    noneLike: 'まだLikeはないようです',
                    pubMsg: '応援ランキング'
                },
                scrollData:{
                  noFlag: false //暂无更多数据显示
                },
                scrollData2:{
                  noFlag: false //暂无更多数据显示
                }
            }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            close() {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('close');
                });
            },
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active');
            $('.bgActive').css('left','calc((100vw - 24px)* '+ (val) +'/2)');
            this.swiper.slideTo(val, 500, false)
          },
          formatTime(key) {
              let timer = new Date(key*1000);
              return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
          },
        getRanking(token) {
            let self = this;
            if(self.idx < 2) {
                // let token_ = getParams('token');
                // if(token) {
                //     http.defaults.headers.common['Authorization'] = 'Token '+token;
                // }else if(token_!='(null)' && token_!='') {
                //     http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                // }
                http.get('/statistic/gb',{
                    params: {
                        idolId: getParams('idolId'),
                        start: self.start,
                        limit: 20
                    }
                }).then(function(res){
                    self.idx++;
                    if(res.status == 200) {
                        if(res.data.fansList.length > 0) {
                            for(var i=0;i<res.data.fansList.length;i++){
                                self.rakingList.push(res.data.fansList[i]);
                            }
                            self.havedlast = false;
                        }else {
                            self.havedlast = true;
                            self.scrollData.noFlag = true;
                            $('.load-more').css('display','none');
                        }
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRanking();
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking();
                        })
                    })
                });

            }
        },
        getRankingHeat(token) {
            let self = this;
            if(self.idx2 < 2) {
                http.get('/statistic/heat',{
                    params: {
                        idolId: getParams('idolId'),
                        start: self.start2,
                        limit: 20
                    }
                }).then(function(res){
                    self.idx2++
                    if(res.status == 200) {
                        if(res.data.fansList.length > 0) {
                            for(var i=0;i<res.data.fansList.length;i++){
                                self.rankingHeat.push(res.data.fansList[i]);
                            }
                            self.havedlast2 = false;
                        }else {
                            self.havedlast2 = true;
                            // self.infinite2();
                            self.scrollData2.noFlag = true;
                            $('.load-more').css('display','none');
                        }
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRankingHeat();
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRankingHeat();
                        })
                    })
                });
            }else {
                // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                window.setupWebViewJavascriptBridge(function(bridge) {
                    if(getParams('language') == 'cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
        },
        refresh (done) {
            var self = this;
            self.idx = 0;
            http.get('/statistic/gb',{
                params: {
                    idolId: getParams('idolId'),
                    start: 0,
                    limit: 20
                }
            }).then(function(res){
                self.start = 0;
                self.default1 = false;
                self.havedlast = false;
                if(res.status == 200) {
                    if(res.data.fansList.length > 0) {
                        self.rakingList = res.data.fansList;
                    }
                }
            })
            setTimeout(() => {
                done(true);
                // console.log(document.querySelector('._v-content'));
                // document.querySelector('._v-content').style.transform = 'translate3d(0px, 0px, 0px) scale(1) !important';
            }, 500)
        },
        infinite (done) {
            var self = this;
            self.idx = 0;
            if(self.rakingList.length>0) {
               if (self.havedlast) {
                 self.scrollData.noFlag = true;
                } else {
                  self.start = self.start + 20;
                  self.getRanking();
                }
            }else {
              self.scrollData.noFlag = true;
            }
            $('.load-more').css('display','none');
            done();
        },
        refresh2 (done) {
            var self = this;
            self.idx2 = 0;
            http.get('/statistic/heat',{
                params: {
                    idolId: getParams('idolId'),
                    start: 0,
                    limit: 20
                }
            }).then(function(res){
                self.start2 = 0;
                self.default2 = false;
                self.havedlast2 = false;
                if(res.status == 200) {
                    if(res.data.fansList.length > 0) {
                        self.rankingHeat = res.data.fansList;
                    }
                }
            })
            setTimeout(() => {
                done(true);
            }, 500)
        },
        infinite2 (done) {
            var self = this;
            self.idx2 = 0;
            if(self.rankingHeat.length>0) {
               if (self.havedlast2) {
                    self.scrollData2.noFlag = true;
                } else {
                    self.start2 = self.start2 + 20;
                    self.getRankingHeat();
                }
            }else {
                self.scrollData2.noFlag = true;
            }
            $('.load-more').css('display','none');
            done();
        },
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            var self = this;
            // if(getParams('platform') == 'android') {
            //     self.android = true;
            // }
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                 self.fans_text= {
                    Gcoin: 'G币贡献',
                    like: '人气贡献',
                    me: '我的排名',
                    all: '总排名',
                    noneGcoin: '还没有收到粉丝的G币',
                    noneLike: '还没有收到粉丝的点赞人气',
                    pubMsg: '贡献排行榜'
                }
              } else {
                self.fans_text= {
                    Gcoin: 'コイン',
                    like: 'Like',
                    me: '自分の順位',
                    all: '全体ランキング',
                    noneGcoin: 'まだコインはないようです',
                    noneLike: 'まだLikeはないようです',
                    pubMsg: '応援ランキング'
                }
              }
            self.getRanking();
            self.getRankingHeat();
        }
    }
</script>
