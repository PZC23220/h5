<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
        <div class="go_back" v-if="android">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/nav_icon_arrow_black.png" alt="" @click="close()">
            <span>{{fans_text.pubMsg}}</span>
        </div>
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
                    <!-- <scroller ref="my_scroller" class="my-scroller"
                          :on-refresh="refresh"
                          :on-infinite="infinite"
                          :noDataText="rakingList.length == 0 ? '':'全て表示されました'"> -->
                    <v-scroll :on-refresh="refresh" :on-infinite="infinite">
                         <ul class="comment_list" v-if="default1==false">
                            <h3 class="ranking_type"  :class="{'left_hide':!meObj.position}">{{fans_text.me}}</h3>
                            <li class="con_left" :class="{'left_show':meObj.position}" v-if="meObj.position">
                                <span v-if="!meObj.position">0</span>
                                <span v-if="meObj.position==1"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="meObj.position==2"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="meObj.position==3"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="meObj.position>3" :class="[{'second':meObj.position>9},{'three':meObj.position>99}]">{{meObj.position?meObj.position:'-'}}</span>
                                <span class="avatar" v-if="meObj.fans"><img v-lazy="meObj.fans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span>
                                        <em>{{meObj.fans?(meObj.fans.nickname?meObj.fans.nickname:'...'):'...'}}</em>
                                        <!-- <img :src="meObj.fans?('/static/images/icon_level_'+ (meObj.fans.levelPlatform) +'.png'): '/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{meObj.fans?(meObj.fans.levelPlatform?meObj.fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(meObj.fans.medal)+'.png'" v-if="meObj.fans?(meObj.fans.medal&&meObj.fans.medal>0):false" alt="">
                                    </span>
                                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">{{meObj.expendGprice?Number(meObj.expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <h3 class="ranking_type">{{fans_text.all}}</h3>
                            <div class="con_left" :class="{'left_hide':rakingList.length>0}">
                                <li>
                                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>4</span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>5</span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>6</span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                            </div>
                            <li v-for="(idol,key) in rakingList" v-if="key < len">
                                <span v-if="key==0"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="key==1"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="key==2"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="key>2" :class="[{'second':key>8},{'three':key>98}]">{{key+1}}</span>
                                <span class="avatar" v-if="idol.fans"><img v-lazy="idol.fans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span>
                                        <em>{{idol.fans?idol.fans.nickname:'...'}}</em>
                                        <!-- <img :src="idol.fans?('/static/images/icon_level_'+ (idol.fans.levelPlatform+1) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{idol.fans?(idol.fans.levelPlatform?idol.fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(idol.fans.medal)+'.png'" v-if="idol.fans?(idol.fans.medal&&idol.fans.medal>0):false" alt="">
                                    </span>
                                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">{{idol.expendGprice?Number(idol.expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                        </ul>
                        <div class="default_page default_page3"  v-if="default1">
                            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no coin.png" alt="">
                            <p v-html="fans_text.noneGcoin"></p>
                        </div>
                    <!-- </scroller> -->
                    </v-scroll>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <!-- <scroller ref="my_scroller" class="my-scroller"
                          :on-refresh="refresh2"
                          :on-infinite="infinite2"
                          :noDataText="rankingHeat.length == 0 ? '':'全て表示されました'"> -->
                    <v-scroll :on-refresh="refresh2" :on-infinite="infinite2">
                        <ul class="comment_list" v-if="default2==false">
                            <h3 class="ranking_type" v-if="meHeatObj.position">{{fans_text.me}}</h3>
                            <li class="con_left" :class="{'left_show':meHeatObj.position}" v-if="meHeatObj.position">
                                <span v-if="!meHeatObj.position">0</span>
                                <span v-if="meHeatObj.position==1"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="meHeatObj.position==2"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="meHeatObj.position==3"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="meObj.position>3" :class="[{'second':meHeatObj.position>9},{'three':meHeatObj.position>99}]">{{meObj.position?meObj.position:'-'}}</span>
                                <span class="avatar" v-if="meHeatObj.fans"><img v-lazy="meHeatObj.fans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span><em>{{meHeatObj.fans?meHeatObj.fans.nickname:'...'}}</em><span class="level">Lv.{{meObj.fans?(meObj.fans.levelPlatform?meObj.fans.levelPlatform:0):0}}</span></span>
                                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{meHeatObj.totalNums?Number(meHeatObj.totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <h3 class="ranking_type">{{fans_text.all}}</h3>
                            <div class="con_left" :class="{'left_hide':rankingHeat.length>0}">
                                <li>
                                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                            </div>
                            <li v-for="(idol,key) in rankingHeat" v-if="key < len2">
                                <span v-if="key==0"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span v-if="key==1"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span v-if="key==2"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span v-if="key>2" :class="[{'second':key>8},{'three':key>98}]">{{key+1}}</span>
                                <span class="avatar" v-if="idol.fans"><img v-lazy="idol.fans.avatar" alt=""></span>
                                <div class="fans_content">
                                    <span>
                                        <em>{{idol.fans?idol.fans.nickname:'...'}}</em>
                                        <!-- <img :src="idol.fans?('/static/images/icon_level_'+ (idol.fans.levelPlatform) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{idol.fans?(idol.fans.levelPlatform?idol.fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+(idol.fans.medal)+'.png'" v-if="idol.fans?(idol.fans.medal&&idol.fans.medal>0):false" alt="">
                                    </span>
                                    <span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{idol.totalNums?Number(idol.totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                        </ul>
                        <div class="default_page default_page3"  v-if="default2">
                            <img src="/img/default_no like.png" alt="">
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
    require('@api/js/common.js')
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
                len: 20,
                len2: 20,
                default1: false,
                default2: false,
                android: false,
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
                self.idx++;
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/statistic/gb',{
                    params: {
                        idolId: getParams('idolId')
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.loadingBig = true;
                        if(res.data.fansList.length > 0) {
                            self.default1 = false;
                            self.rakingList = res.data.fansList;
                            for(var i=0;i<self.rakingList.length;i++) {
                                // console.log(self.rakingList[i].fansId == 160)
                                if(self.rakingList[i].fansId == getParams('fansId')) {
                                    self.meObj = self.rakingList[i];
                                    self.meObj.position = (i+1);
                                    console.log(self.rakingList)
                                    return;
                                }
                            }
                        }else {
                            self.default1 = true;
                        }
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRanking(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking(responseData.token);
                        })
                    })
                });
                
            }else {
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          getRankingHeat(token) {
            let self = this;
            if(self.idx2 < 2) {
                self.idx2++
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/statistic/heat',{
                    params: {
                        idolId: getParams('idolId')
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        if(res.data.fansList.length > 0) {
                            self.default2 = false;
                            self.rankingHeat = res.data.fansList;
                            for(var i=0;i<self.rankingHeat.length;i++) {
                                if(self.rankingHeat[i].fansId == getParams('fansId')) {
                                    self.meHeatObj = self.rankingHeat[i];
                                    self.meHeatObj.position = (i+1);
                                    console.log(self.rankingHeat)
                                    console.log(self.meHeatObj)
                                    return;
                                }
                            }
                        }else {
                            self.default2 = true;
                        }
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRankingHeat(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRankingHeat(responseData.token);
                        })
                    })
                });
            }else {
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          refresh (done) {
            var self = this;
            setTimeout(() => {
              self.idx = 0;
              self.getRanking();
              done()
            }, 1500)
          },

          infinite (done) {
            var self = this;
           if (self.rakingList.length < self.len) {
              setTimeout(() => {
                done(true)
              }, 1500)
              return;
            } else {
                setTimeout(() => {
                  self.len += 20;
                  done()
                }, 1500)
            }
          },
          refresh2 (done) {
            var self = this;
            setTimeout(() => {
              self.idx2 = 0;
              self.getRankingHeat();
              done()
            }, 1500)
          },

          infinite2 (done) {
            var self = this;
           if (self.rankingHeat.length < self.len2) {
              setTimeout(() => {
                done(true)
              }, 1500)
              return;
            } else {
                setTimeout(() => {
                  self.len2 += 20;
                  done()
                }, 1500)
            }
          }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            var self = this;
            if(getParams('platform') == 'android') {
                self.android = true;
            }
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