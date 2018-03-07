<template>
    <div class="main">
        <div class="content">
            <v-scroll :on-refresh="refresh">
                <!-- <div class="page_none" :class="{'fans_none': rakingList.length>0}">
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
                </div> -->
                <div class="ranking-all" @click.stop="showRanking('all')">
                    <h3 class="ranking-title"><img class="ranking-nums" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/all_ranking_1.png"><span>{{idol_text.all}}</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray.png" class="arrow-right"></h3>
                    <div class="allRaning-list">
                        <div class="idol-content" v-if="rakingList.length > 0" @click.stop="rakingList[0].idolId?showIdolPage(rakingList[0].idolId):false">
                            <div class="avatar-content">
                                <span class="avatar" :style="rakingList[0].avatar?'background-image:url('+ rakingList[0].avatar +');':''"></span>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.2</span>
                            </div>
                             <div class="introduction">
                                <p class="name">{{rakingList[0].name?rakingList[0].name:'...'}}</p>
                                <p class="detail" :class="{'none':!rakingList[0].organization}"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList[0].popularity?Number(rakingList[0].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content idol-content-1" v-if="rakingList.length > 0" @click.stop="rakingList[0].idolId?showIdolPage(rakingList[0].idolId):false">
                            <div class="avatar-content">
                                <span class="avatar" :style="rakingList[0].avatar?'background-image:url('+ rakingList[0].avatar +');':''"></span>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" alt="">
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" alt="">
                            </div>
                             <div class="introduction">
                                <p class="name">{{rakingList[0].name?rakingList[0].name:'...'}}</p>
                                <p class="detail" :class="{'none':!rakingList[0].organization}"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList[0].popularity?Number(rakingList[0].popularity).toLocaleString():'0'}}</em></p>
                            </div>
                        </div>
                        <div class="idol-content" v-if="rakingList.length > 0" @click.stop="rakingList[0].idolId?showIdolPage(rakingList[0].idolId):false">
                            <div class="avatar-content">
                                <span class="avatar" :style="rakingList[0].avatar?'background-image:url('+ rakingList[0].avatar +');':''"></span>
                                <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" alt="">
                                <span class="ranking1 ranking2">No.3</span>
                            </div>
                             <div class="introduction">
                                <p class="name">{{rakingList[0].name?rakingList[0].name:'...'}}</p>
                                <p class="detail" :class="{'none':!rakingList[0].organization}"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{rakingList[0].popularity?Number(rakingList[0].popularity).toLocaleString():'0'}}</em></p>
                            </div>
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
                len:20,
                start: 0,
                num: 20,
                idx: 0,
                idol_text: {
                    all: '总榜',
                    japan: '日本榜',
                    china: '中国榜',
                    internal: '国内榜',
                },
                top3None: false,
                allFans: [],
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
                            filter: 'today'
                        }
                    }).then(function(res){
                        let allFansList = [],meFansList = [];
                            if(res.data) {
                                if(!res.data.rankingList) {
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
            refresh (done) {
                var self = this;
                setTimeout(() => {
                  self.idx = 0;
                  self.getRanking();
                  done()
                }, 500)
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
             if(getParams('language') == 'cn') {
                 this.idol_text= {
                    all: '总榜',
                    japan: '日本榜',
                    china: '中国榜',
                    internal: '国内榜',
                }
              } else {
                this.idol_text= {
                    all: '总榜',
                    japan: '日本榜',
                    china: '中国榜',
                    internal: '国内榜',
                }
              }
            this.getRanking();
        }
    }
</script>
