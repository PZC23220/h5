<template>
    <div class="main">
        <div class="content">
            <v-scroll :on-refresh="refresh">
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
                <div class="ranking-all" @click.stop="showRanking('all')">
                    <h3 class="ranking-title"><img class="ranking-nums" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/all_ranking_1.png"><span>{{idol_text.all}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png" class="arrow-right"></h3>
                    <div class="allRaning-list">
                        <div class="idol-content" v-if="rakingList.length > 1">
                            <div class="avatar-content" @click.stop="rakingList[1].idolId?showIdolPage(rakingList[1].idolId):false">
                                <span class="avatar" :style="rakingList[1].avatar?'background-image:url('+ rakingList[1].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.2</span>
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList[1].idolId?showIdolPage(rakingList[1].idolId):false" class="name">{{rakingList[1].name?rakingList[1].name:'...'}}</p>
                                <p @click.stop="rakingList[1].idolId?showIdolPage(rakingList[1].idolId):false" class="detail" :class="{'none':!rakingList[1].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList[1].popularity?Number(rakingList[1].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content idol-content-1" v-if="rakingList.length > 0">
                            <div class="avatar-content" @click.stop="rakingList[0].idolId?showIdolPage(rakingList[0].idolId):false">
                                <span class="avatar" :style="rakingList[0].avatar?'background-image:url('+ rakingList[0].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" alt="">
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" alt="">
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList[0].idolId?showIdolPage(rakingList[0].idolId):false" class="name">{{rakingList[0].name?rakingList[0].name:'...'}}</p>
                                <p @click.stop="rakingList[0].idolId?showIdolPage(rakingList[0].idolId):false" class="detail" :class="{'none':!rakingList[0].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList[0].popularity?Number(rakingList[0].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content" v-if="rakingList.length > 2">
                            <div class="avatar-content" @click.stop="rakingList[2].idolId?showIdolPage(rakingList[2].idolId):false">
                                <span class="avatar" :style="rakingList[2].avatar?'background-image:url('+ rakingList[2].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.3</span>
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList[2].idolId?showIdolPage(rakingList[2].idolId):false" class="name">{{rakingList[2].name?rakingList[2].name:'...'}}</p>
                                <p @click.stop="rakingList[2].idolId?showIdolPage(rakingList[2].idolId):false" class="detail" :class="{'none':!rakingList[2].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList[2].popularity?Number(rakingList[2].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="no-ranking" v-if="rakingList.length <= 0">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20ranking.jpg">
                            <p>{{idol_text.none}}</p>
                        </div>
                    </div>
                </div>
                <div class="ranking-all" @click.stop="showRanking(lang2)">
                    <h3 class="ranking-title"><img class="ranking-nums" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/all_ranking_2.png"><span>{{idol_text.internal}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png" class="arrow-right"></h3>
                    <div class="allRaning-list">
                        <div class="idol-content" v-if="rakingList2.length > 1">
                            <div class="avatar-content" @click.stop="rakingList2[1].idolId?showIdolPage(rakingList2[1].idolId):false">
                                <span class="avatar" :style="rakingList2[1].avatar?'background-image:url('+ rakingList2[1].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.2</span>
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList2[1].idolId?showIdolPage(rakingList2[1].idolId):false" class="name">{{rakingList2[1].name?rakingList2[1].name:'...'}}</p>
                                <p @click.stop="rakingList2[1].idolId?showIdolPage(rakingList2[1].idolId):false" class="detail" :class="{'none':!rakingList2[1].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList2[1].popularity?Number(rakingList2[1].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content idol-content-1" v-if="rakingList2.length > 0">
                            <div class="avatar-content" @click.stop="rakingList2[0].idolId?showIdolPage(rakingList2[0].idolId):false">
                                <span class="avatar" :style="rakingList2[0].avatar?'background-image:url('+ rakingList2[0].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" alt="">
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" alt="">
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList2[0].idolId?showIdolPage(rakingList2[0].idolId):false" class="name">{{rakingList2[0].name?rakingList2[0].name:'...'}}</p>
                                <p @click.stop="rakingList2[0].idolId?showIdolPage(rakingList2[0].idolId):false" class="detail" :class="{'none':!rakingList2[0].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList2[0].popularity?Number(rakingList2[0].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content" v-if="rakingList2.length > 2">
                            <div class="avatar-content" @click.stop="rakingList2[2].idolId?showIdolPage(rakingList2[2].idolId):false">
                                <span class="avatar" :style="rakingList2[2].avatar?'background-image:url('+ rakingList2[2].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.3</span>
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList2[2].idolId?showIdolPage(rakingList2[2].idolId):false" class="name">{{rakingList2[2].name?rakingList2[2].name:'...'}}</p>
                                <p @click.stop="rakingList2[2].idolId?showIdolPage(rakingList2[2].idolId):false" class="detail" :class="{'none':!rakingList2[2].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList2[2].popularity?Number(rakingList2[2].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="no-ranking" v-if="rakingList2.length <= 0">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20ranking.jpg">
                            <p>{{idol_text.none}}</p>
                        </div>
                    </div>
                </div>
                <div class="ranking-all" @click.stop="showRanking(lang3)">
                    <h3 class="ranking-title"><img class="ranking-nums" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/all_ranking_3.png"><span>{{idol_text.country}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png" class="arrow-right"></h3>
                    <div class="allRaning-list">
                        <div class="idol-content" v-if="rakingList3.length > 1">
                            <div class="avatar-content" @click.stop="rakingList3[1].idolId?showIdolPage(rakingList3[1].idolId):false">
                                <span class="avatar" :style="rakingList3[1].avatar?'background-image:url('+ rakingList3[1].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.2</span>
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList3[1].idolId?showIdolPage(rakingList3[1].idolId):false" class="name">{{rakingList3[1].name?rakingList3[1].name:'...'}}</p>
                                <p @click.stop="rakingList3[1].idolId?showIdolPage(rakingList3[1].idolId):false" class="detail" :class="{'none':!rakingList3[1].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList3[1].popularity?Number(rakingList3[1].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content idol-content-1" v-if="rakingList3.length > 0">
                            <div class="avatar-content" @click.stop="rakingList3[0].idolId?showIdolPage(rakingList3[0].idolId):false">
                                <span class="avatar" :style="rakingList3[0].avatar?'background-image:url('+ rakingList3[0].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" alt="">
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" alt="">
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList3[0].idolId?showIdolPage(rakingList3[0].idolId):false" class="name">{{rakingList3[0].name?rakingList3[0].name:'...'}}</p>
                                <p @click.stop="rakingList3[0].idolId?showIdolPage(rakingList3[0].idolId):false" class="detail" :class="{'none':!rakingList3[0].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList3[0].popularity?Number(rakingList3[0].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content" v-if="rakingList3.length > 2">
                            <div class="avatar-content" @click.stop="rakingList3[2].idolId?showIdolPage(rakingList3[2].idolId):false">
                                <span class="avatar" :style="rakingList3[2].avatar?'background-image:url('+ rakingList3[2].avatar +');':''"></span>
                                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.3</span>
                            </div>
                             <div class="introduction">
                                <p @click.stop="rakingList3[2].idolId?showIdolPage(rakingList3[2].idolId):false" class="name">{{rakingList3[2].name?rakingList3[2].name:'...'}}</p>
                                <p @click.stop="rakingList3[2].idolId?showIdolPage(rakingList3[2].idolId):false" class="detail" :class="{'none':!rakingList3[2].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList3[2].popularity?Number(rakingList3[2].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="no-ranking" v-if="rakingList3.length <= 0">
                            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_no%20ranking.jpg">
                            <p>{{idol_text.none}}</p>
                        </div>
                    </div>
                </div>
            </v-scroll>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
 @import "../../../css/fans_idolRanking_all.scss";
</style>
<script>
    // import VueScroller from 'vue-scroller';
    import Scroll from '../../../components/scroll.vue';
    import VueLazyload from 'vue-lazyload'
    import http from '@api/js/http.js';
    require('@api/js/common.js');
    export default {
        data() {
            return {
                rakingList: [],
                rakingList2: [],
                rakingList3: [],
                lang2: 'Japanese',
                lang3: 'Chinese',
                isJapan: true,
                idol_text: {
                    all: '总榜',
                    japan: '日本榜',
                    china: '中国榜',
                    country: '中国榜',
                    internal: '国内榜',
                    none: 'ランキング集計中...'
                },
            }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            showRanking(val) {
                window.location.assign(`${location.href}index?type=${val}`);
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
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/ranking/idolsFromFans',{
                    params: {
                        filter: 'today'
                    }
                }).then(function(res){
                        if(res.data) {
                            if(!res.data.rankingList) {
                                self.rakingList = [];
                            }else {
                                self.rakingList = res.data.rankingList;
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
            },
            getRanking2(token) {
                let self = this;
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/ranking/idolsFromFans',{
                    params: {
                        filter: 'today',
                        lang: self.lang2
                    }
                }).then(function(res){
                        if(res.data) {
                            if(!res.data.rankingList) {
                                self.rakingList2 = [];
                            }else {
                                self.rakingList2 = res.data.rankingList;
                            }
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                    self.getRanking2(responseData.token);
                                })
                            })
                        }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                            self.getRanking2(responseData.token);
                        })
                    })
                })
            },
            getRanking3(token) {
                let self = this;
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/ranking/idolsFromFans',{
                    params: {
                        filter: 'today',
                        lang: self.lang3
                    }
                }).then(function(res){
                        if(res.data) {
                            if(!res.data.rankingList) {
                                self.rakingList3 = [];
                            }else {
                                self.rakingList3 = res.data.rankingList;
                            }
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                    self.getRanking3(responseData.token);
                                })
                            })
                        }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                            self.getRanking3(responseData.token);
                        })
                    })
                })
            },
            refresh (done) {
                var self = this;
                setTimeout(() => {
                  self.getRanking();
                  self.getRanking2();
                  self.getRanking3();
                  done()
                }, 500)
            }
        },
        mounted() {
            var self = this;
            window.ranking_refresh = function() {
                self.getRanking();
                self.getRanking2();
                self.getRanking3();
            }
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('ranking_refresh', function() {
                    self.getRanking();
                    self.getRanking2();
                    self.getRanking3();
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
             if(getParams('language') == 'cn') {
                 this.idol_text= {
                    all: '总榜',
                    japan: '日本榜',
                    china: '中国榜',
                    internal: '国内榜',
                    country: '日本榜',
                    none: '暂无排名'
                }
                this.lang2 = 'Chinese';
                this.lang3 = 'Japanese';
              } else {
                this.idol_text= {
                    all: '总榜',
                    japan: '日本榜',
                    china: '中国榜',
                    internal: '国内榜',
                    country: '中国榜',
                    none: 'ランキング集計中...'
                }
                this.lang2 = 'Japanese';
                this.lang3 = 'Chinese';
              }
            this.getRanking();
            this.getRanking2();
            this.getRanking3();
        }
    }
</script>
