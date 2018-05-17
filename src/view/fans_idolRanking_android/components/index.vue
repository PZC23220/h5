<template>
    <div class="main">
        <div class="header">
             <div class="go_back" v-if="android">
                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/nav_icon_arrow_black.png" alt="" @click="close()">
                <span>{{idol_text.pubMsg}}</span>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{idol_text.today}}</a>
                <a class="tabs" @click="changePages(1)">{{idol_text.week}}</a>
                <a class="tabs" @click="changePages(2)">{{idol_text.month}}</a>
                <span class="bgActive"></span>
            </div>
        </div>
        <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <swiper-slide class="swiper-no-swiping" id="swiper1">
                    <v-scroll :on-refresh="refresh" :on-infinite="infinite" :dataList="scrollData">
                        <div class="idol_all" v-if="top3None ==false">
                            <div class="page_none" :class="{'fans_none': rakingList.length>0}">
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                            <div class="idol_detail" :class="{'no1':key == 0}" v-for="(idol,key) in rakingList" v-if="rakingList.length>0?key < len: false" @click.stop="idol.idolId?showIdolPage(idol.idolId):false">
                                <div class="idol_content">
                                    <i v-if="key != 0" :class="[{'sizeTwo': key > 8},{'sizeThree': key > 98},{'_sec': key == 1},{'_thr': key == 2}]">{{idol.position}}</i>
                                    <div class="idol_border">
                                        <div class="avatar_content">
                                            <span class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" v-if="key == 0" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" v-if="key == 1" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" v-if="key == 2" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" v-if="key == 0" alt="">
                                        </div>
                                        <div class="introduction">
                                            <p class="name" :class="{'none':!idol.organization}">{{idol.name?idol.name:'...'}}</p>
                                            <p class="signature">{{idol.organization?'@'+idol.organization:''}}</p>
                                            <p class="detail" :class="{'none':!idol.organization}"><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{idol.popularity?Number(idol.popularity).toLocaleString():'0'}}</em></span></p>
                                            <div class="fans_list"  v-for="fans in allFans" v-if="(fans.id == idol.idolId) && (key == 0)">{{idol_text.fans}}<br><div class="fans_imgList"><span v-for="img in fans.topFans"><img v-lazy="img.avatar" alt=""></span></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                                        </div>
                                        <div class="support" @click.stop="support(idol.idolId?idol.idolId:'')">{{idol_text.support}}</div>
                                    </div>
                                </div>
                                <div class="fans_list fans_show" :class="{'fans_none': allFans.length>0}"><em class="fansRanking_tips">{{idol_text.fans}}</em><div class="no_fans">{{idol_text.no1}}</div></div>
                                <div class="fans_list"  v-for="fans in allFans" v-if="(fans.id == idol.idolId) && (key > 0)"><em class="fansRanking_tips">{{idol_text.fans}}</em><div class="fans_imgList"><span v-for="img in fans.topFans"><img v-lazy="img.avatar" alt=""></span></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                            </div>
                        </div>
                        <div class="default_page" v-if="top3None">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20message.png" alt="">
                            <p v-html="idol_text.noneIdol"></p>
                        </div>
                    </v-scroll>
                </swiper-slide>
                <swiper-slide class="swiper-no-swiping" id="swiper3">
                    <v-scroll :on-refresh="refresh3" :on-infinite="infinite3" :dataList="scrollData3">
                        <div class="idol_all" v-if="top3None3 ==false">
                            <div class="page_none" :class="{'fans_none': rakingList3.length>0}">
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                            <div class="idol_detail" :class="{'no1':key == 0}" v-for="(idol,key) in rakingList3" v-if="rakingList3.length>0?key < len3: false" @click.stop="idol.idolId?showIdolPage(idol.idolId):false">
                                <div class="idol_content">
                                    <i v-if="key != 0" :class="[{'sizeTwo': key > 8},{'sizeThree': key > 98},{'_sec': key == 1},{'_thr': key == 2}]">{{idol.position}}</i>
                                    <div class="idol_border">
                                        <div class="avatar_content">
                                            <span class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" v-if="key == 0" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" v-if="key == 1" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" v-if="key == 2" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" v-if="key == 0" alt="">
                                        </div>
                                        <div class="introduction">
                                            <p class="name" :class="{'none':!idol.organization}">{{idol.name?idol.name:'...'}}</p>
                                            <p class="signature">{{idol.organization?'@'+idol.organization:''}}</p>
                                            <p class="detail" :class="{'none':!idol.organization}"><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{idol.popularity?Number(idol.popularity).toLocaleString():'0'}}</em></span></p>
                                            <div class="fans_list"  v-for="fans in allFans3" v-if="(fans.id == idol.idolId) && (key == 0)">{{idol_text.fans}}<br><div class="fans_imgList"><span v-for="img in fans.topFans"><img v-lazy="img.avatar" alt=""></span></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                                        </div>
                                        <div class="support" @click.stop="support(idol.idolId?idol.idolId:'')">{{idol_text.support}}</div>
                                    </div>
                                </div>
                                <div class="fans_list fans_show" :class="{'fans_none': allFans3.length>0}"><em class="fansRanking_tips">{{idol_text.fans}}</em><div class="no_fans">{{idol_text.no1}}</div></div>
                                <div class="fans_list"  v-for="fans in allFans3" v-if="(fans.id == idol.idolId) && (key > 0)"><em class="fansRanking_tips">{{idol_text.fans}}</em><div class="fans_imgList"><span v-for="img in fans.topFans"><img v-lazy="img.avatar" alt=""></span></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                            </div>
                        </div>
                        <div class="default_page" v-if="top3None3">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20message.png" alt="">
                            <p v-html="idol_text.noneIdol"></p>
                        </div>
                            <!-- </scroller> -->
                    </v-scroll>
                </swiper-slide>
                <swiper-slide class="swiper-no-swiping" id="swiper4">
                    <v-scroll :on-refresh="refresh4" :dataList="scrollData4">
                        <div class="idol_all" v-if="top3None4 ==false">
                            <div class="page_none" :class="{'fans_none': rakingList4.length>0}">
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="idol_detail">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                            <div class="idol_detail" :class="{'no1':key == 0}" v-for="(idol,key) in rakingList4" v-if="rakingList4.length>0?key < len4: false" @click.stop="idol.idolId?showIdolPage(idol.idolId):false">
                                <div class="idol_content">
                                    <i v-if="key != 0" :class="[{'sizeTwo': key > 8},{'sizeThree': key > 98},{'_sec': key == 1},{'_thr': key == 2}]">{{idol.position}}</i>
                                    <div class="idol_border">
                                        <div class="avatar_content">
                                            <span class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" v-if="key == 0" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" v-if="key == 1" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" v-if="key == 2" alt="">
                                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" v-if="key == 0" alt="">
                                        </div>
                                        <div class="introduction">
                                            <p class="name" :class="{'none':!idol.organization}">{{idol.name?idol.name:'...'}}</p>
                                            <p class="signature">{{idol.organization?'@'+idol.organization:''}}</p>
                                            <p class="detail" :class="{'none':!idol.organization}"><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{idol.popularity?Number(idol.popularity).toLocaleString():'0'}}</em></span></p>
                                            <div class="fans_list"  v-for="fans in allFans4" v-if="(fans.id == idol.idolId) && (key == 0)">{{idol_text.fans}}<br><div class="fans_imgList"><span v-for="img in fans.topFans"><img v-lazy="img.avatar" alt=""></span></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                                        </div>
                                        <div class="support" @click.stop="support(idol.idolId?idol.idolId:'')">{{idol_text.support}}</div>
                                    </div>
                                </div>
                                <div class="fans_list fans_show" :class="{'fans_none': allFans4.length>0}"><em class="fansRanking_tips">{{idol_text.fans}}</em><div class="no_fans">{{idol_text.no1}}</div></div>
                                <div class="fans_list"  v-for="fans in allFans4" v-if="(fans.id == idol.idolId) && (key > 0)"><em class="fansRanking_tips">{{idol_text.fans}}</em><div class="fans_imgList"><span v-for="img in fans.topFans"><img v-lazy="img.avatar" alt=""></span></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                            </div>
                        </div>
                        <div class="default_page" v-if="top3None4">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20message.png" alt="">
                            <p v-html="idol_text.noneIdol"></p>
                        </div>
                        <div class="top_20"><span class="left"></span>{{idol_text.top20}}<span class="right"></span></div>
                    </v-scroll>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
    // import VueScroller from 'vue-scroller';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import Scroll from '../../../components/scroll.vue';
    import VueLazyload from 'vue-lazyload'
    import $ from 'n-zepto';
    import http from '@api/js/http.js';
    require('@api/js/common.js');
    // var vConsole = require('@api/js/vconsole.min.js');
    export default {
        data() {
            return {
                rakingList: [],
                // rakingList2: [],
                rakingList3: [],
                rakingList4: [],
                len:20,
                // len2:20,
                len3:20,
                len4:20,
                start: 0,
                num: 20,
                idx: 0,
                // idx2: 0,
                idx3: 0,
                idx4: 0,
                lang: '',
                android: false,
                idol_text: {
                    me: '推しメン',
                    all: '全体ランキング',
                    fans: '応援ランキング',
                    support: '応援',
                    no1: 'No.1になって目立とう！',
                    none: 'Groupyで待ってまーす。',
                    noneIdol: 'ただ今集計中です',
                    today: '本日',
                    week: '今週',
                    month: '今月',
                    alltop: '総合',
                    top20: '上位20名まで表示',
                    pubMsg: 'ランキング'
                },
                ranking_img: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/banner_bg/banner-jp.jpg',
                swiperOption: {
                  notNextTick: false,
                  // grabCursor : false,
                  setWrapperSize :false,
                  noSwiping : true,
                  pagination : '.swiper-pagination',
                  paginationClickable :false,
                  //loop : false,
                  observeParents:false,
                  // onTransitionStart(swiper){
                  //   $('.tabs').removeClass('active')
                  //   $('.tabs').eq(swiper.activeIndex).addClass('active');
                  //   $('.bgActive').css('margin-left',`calc(33.33333% * ${swiper.activeIndex})`);
                  // },
                },
                top3None: false,
                // top3None2: false,
                top3None3: false,
                top3None4: false,
                allFans: [],
                // allFans2: [],
                allFans3: [],
                allFans4: [],
                android: false,
                scrollData:{
                  noFlag: false //暂无更多数据显示
                },
                scrollData4:{
                  noFlag: false //暂无更多数据显示
                },
                scrollData3:{
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
                $('.bgActive').css('margin-left',`calc(33.33333% * ${val})`);
                this.swiper.slideTo(val, 500, false);
                window.setupWebViewJavascriptBridge(function(bridge) {
                    switch (val) {
                        case 0:
                            bridge.callHandler('umeng',{'event_key':'rankpage_check_day'});
                            break;
                        case 1:
                            bridge.callHandler('umeng',{'event_key':'rankpage_check_week'});
                            break;
                        case 2:
                            bridge.callHandler('umeng',{'event_key':'rankpage_check_month'});
                            break;
                    }
                })
            },
            showIdolPage(val) {
                console.log(val)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('umeng',{'event_key':'rankpage_enter_idol'});
                    bridge.callHandler('showIdolPage', {'idolId': val})
                })
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
            },
            getRanking(token) {
                let self = this;
                if(self.idx < 1) {
                    self.idx++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/ranking/idolsFromFans',{
                        params: {
                            filter: 'today',
                            lang: self.lang
                        }
                    }).then(function(res){
                        let allFansList = [];
                            if(res.data) {
                                if(res.data.rankingList.length <= 0) {
                                    self.top3None = true;
                                }else {
                                    self.rakingList = res.data.rankingList;
                                    for(var i=0;i<self.rakingList.length;i++) {
                                        allFansList.push(self.rakingList[i].idolId);
                                    }
                                    self.getFansList(allFansList,'all')
                                }
                            }else {
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                    bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                        self.getRanking(responseData.token);
                                    })
                                })
                            }
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                self.getRanking(responseData.token);
                            })
                        })
                    })
                }
            },
            getRanking3(token) {
                let self = this;
                if(self.idx3 < 1) {
                    self.idx3++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/ranking/idolsFromFans',{
                        params: {
                            filter: 'week',
                            lang: self.lang
                        }
                    }).then(function(res){
                        let allFansList3 = [];
                            if(res.data) {
                                if(res.data.rankingList <= 0) {
                                    self.top3None3 = true;
                                }else {
                                    self.rakingList3 = res.data.rankingList;
                                    for(var i=0;i<self.rakingList3.length;i++) {
                                        allFansList3.push(self.rakingList3[i].idolId);
                                    }
                                    self.getFansList(allFansList3,'all3')
                                }
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                    self.getRanking3(responseData.token);
                                })
                            })
                        }
                    }).catch(function(err) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                self.getRanking3(responseData.token);
                            })
                        })
                    })
                }
            },
            getRanking4(token) {
                let self = this;
                if(self.idx4 < 2) {
                    self.idx4++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/ranking/idolsFromFans',{
                        params: {
                            filter: 'month',
                            lang: self.lang
                        }
                    }).then(function(res){
                        console.log(res)
                        let allFansList4 = [];
                            if(res.data) {
                                if(res.data.rankingList <= 0) {
                                    self.top3None4 = true;
                                }else {
                                    self.rakingList4 = res.data.rankingList;
                                    for(var i=0;i<self.rakingList4.length&&i<20;i++) {
                                        allFansList4.push(self.rakingList4[i].idolId);
                                    }
                                    self.getFansList(allFansList4,'all4')
                                }
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                    self.getRanking4(responseData.token);
                                })
                            })
                        }
                    }).catch(function(err) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                self.getRanking4(responseData.token);
                            })
                        })
                    })
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
            getFansList(_val,arr) {
                let self = this;
                console.log(_val)
                http.post('/groupyuser/idolTopFans',{
                    idolIds: _val
                }).then(function(res){
                    if(res.data.length > 0) {
                        if(arr == 'all') {
                            self.allFans = res.data;
                        }else if(arr == 'all3') {
                            self.allFans3 = res.data;
                        }else if(arr == 'all4') {
                            self.allFans4 = res.data;
                        }
                    }
                })
            },
            refresh (done) {
                var self = this;
                setTimeout(() => {
                  self.idx = 0;
                  self.getRanking();
                  done()
                }, 500)
            },
            refresh3 (done) {
                var self = this;
                setTimeout(() => {
                  self.idx3 = 0;
                  self.getRanking3();
                  done()
                }, 500)
            },
            refresh4 (done) {
                var self = this;
                setTimeout(() => {
                  self.idx4 = 0;
                  self.getRanking4();
                  done()
                }, 500)
            },
            infinite (done) {
                var self = this;
                if(self.rakingList) {
                   if (self.rakingList.length < self.len) {
                      self.scrollData.noFlag = true;
                    } else {
                      self.len += 20;
                    }
                }else {
                  self.scrollData.noFlag = true;
                }
                this.$el.querySelector('.load-more').style.display = 'none';
                done();
            },
            infinite3 (done) {
                var self = this;
                if(self.rakingList3) {
                   if (self.rakingList3.length < self.len3) {
                      self.scrollData3.noFlag = true;
                    } else {
                      self.len3 += 20;
                    }
                }else {
                  self.scrollData3.noFlag = true;
                }
                this.$el.querySelector('.load-more').style.display = 'none';
                done();
            },
            infinite4 (done) {
                var self = this;
                if(self.rakingList4) {
                   if (self.rakingList4.length < self.len4) {
                     self.scrollData4.noFlag = true;
                    } else {
                      self.len4 += 20;
                    }
                }else {
                  self.scrollData4.noFlag = true;
                }
                this.$el.querySelector('.load-more').style.display = 'none';
                done();
            },
            support(val) {
                console.log('support');
                var self = this;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('umeng',{'event_key':'rankpage_idol_gift'});
                    bridge.callHandler('send_gift', {'context':'0','idol_id':val}, function responseCallback(responseData) {
                        self.idx3 = 0;
                        self.idx4 = 0;
                        self.idx = 0;
                        self.getRanking();
                        self.getRanking3();
                        self.getRanking4();
                    })
                })
                return;
            }
        },
        mounted() {
            var self = this;
            window.ranking_refresh = function() {
                self.idx3 = 0;
                self.idx4 = 0;
                self.idx = 0;
                self.getRanking();
                self.getRanking3();
                self.getRanking4();
            }
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('ranking_refresh', function() {
                    self.idx = 0;
                    self.idx3 = 0;
                    self.idx4 = 0;
                    self.getRanking();
                    self.getRanking3();
                    self.getRanking4();
                })
            });
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(getParams('platform') == 'android') {
                this.android = true;
            }
             if(getParams('language') == 'cn') {
                 this.idol_text= {
                    me: ' 我的守护',
                    all: ' 全部爱豆',
                    fans: ' 贡献排行',
                    support: '应援',
                    no1: '赶紧来抢占第一位吧！',
                    none: '我在groupy等你哦!',
                    noneIdol: '还没有爱豆的排名',
                    today: '今日',
                    week: '本周',
                    month: '本月',
                    alltop: '总榜',
                    top20: '月榜只显示前20名',
                    pubMsg: '排行榜'
                }
                this.ranking_img = 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/banner_bg/banner-chn.jpg';
              } else {
                this.idol_text= {
                    me: '推しメン',
                    all: '全体ランキング',
                    fans: '応援ランキング',
                    support: '応援',
                    no1: 'No.1になって目立とう！',
                    none: 'Groupyで待ってまーす。',
                    noneIdol: 'ただ今集計中です',
                    today: '本日',
                    week: '今週',
                    month: '今月',
                    alltop: '総合',
                    top20: '上位20名まで表示',
                    pubMsg: 'ランキング'
                }
                this.ranking_img = 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/banner_bg/banner-jp.jpg';
              }
            // if(this.$route.query.type == 'all') {
            //     this.lang = '';
            // }else{
            //     this.lang = this.$route.query.type;
            // }
            this.getRanking();
            this.getRanking3();
            this.getRanking4();
        }
    }
</script>
