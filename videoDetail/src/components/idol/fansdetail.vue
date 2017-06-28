<template>
    <div class="main">
        <div class="header">
            <div class="income eBorder">
                <p>
                    <span class="detail_title"> ファン</span>
                    <span class="detail_gcoin"><img src="../../images/icon_fans .png" alt="" class="icon"><i class="video_money">{{Number(gcoinList.fansCount).toLocaleString()}}</i></span>
                </p>
                <p>
                    <span class="detail_title">昨日の新規</span>
                    <span class="detail_gcoin"><img src="../../images/icon_fans .png" alt="" class="icon"><i class="video_money">{{Number(gcoinList.fansIncreased).toLocaleString()}}</i></span>
                </p>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">コイン</a>
                <a class="tabs" @click="changePages(1)">Like</a>
                <a class="tabs" @click="changePages(2)">入会日</a>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <ul class="comment_list">
                    <li v-for="(gFans,key) in gcoinList.fansList">
                        <span>
                            <img src="../../images/icon_metal_1.png" alt="" v-if="key==0">
                            <img src="../../images/icon_metal_2.png" alt="" v-if="key==1">
                            <img src="../../images/icon_metal_3.png" alt="" v-if="key==2">
                            <i class="rank_num" v-if="key>2">{{key+1}}</i>
                        </span>
                        <img class="avatar" :src="gFans.fans?gFans.fans.avatar:''" alt="">
                        <span>{{gFans.fans?gFans.fans.nickname:''}}</span>
                        <img :src="gFans.fans?gFans.fans.level:''" class="level" alt="">
                        <i>
                            <img src="../../images/timeline_icon_coins.png" alt="">{{Number(gFans.expendGprice).toLocaleString()}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="gcoinList.fansList.length == 0">
                    <img src="../../images/default_no coin.png" alt="">
                    <p>まだコインはないようです</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList.fansList">
                        <span>
                            <img src="../../images/icon_metal_1.png" alt="" v-if="key==0">
                            <img src="../../images/icon_metal_2.png" alt="" v-if="key==1">
                            <img src="../../images/icon_metal_3.png" alt="" v-if="key==2">
                            <i v-if="key>2">{{key+1}}</i>
                        </span>
                        <img class="avatar" :src="popularity.fans?popularity.fans.avatar:''" alt="">
                        <span>{{popularity.fans?popularity.fans.nickname:''}}</span>
                        <img :src="popularity.fans?popularity.fans.level:''" class="level" alt="">
                        <i>
                            <img src="../../images/timeline_icon_likes.svg" alt="">{{Number(popularity.totalNums).toLocaleString()}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="popularityList.fansList.length == 0">
                    <img src="../../images/default_no like.png" alt="">
                    <p>まだLikeはないようです</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <ul class="comment_list">
                    <li v-for="(fans,key) in joinList.fansList">
                        <img class="avatar" :src="fans.fans?fans.fans.avatar:''" alt="">
                        <span>{{fans.fans?fans.fans.nickname:''}}</span>
                        <img :src="fans.fans?fans.fans.level:''" class="level" alt="">
                        <i v-html="formatTime(fans.startdate)"></i>
                    </li>
                </ul>
                <div class="default_page" v-show="joinList.fansList.length == 0">
                    <img src="../../images/default_no history.png" alt="">
                    <p>まだメンバーはないようです</p>
                </div>
            </swiper-slide>  
          </swiper>
        </div>
        <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import $ from 'n-zepto';
    import http from '@/utils/http.js';
    require('../../utils/common.js')
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
                  },
                },
                joinList: {
                    fansList: []
                },
                gcoinList: {
                    fansCount: '',
                    fansIncreased: '',
                    fansList: []
                },
                popularityList: {
                    fansList: []
                },
                loadingBig: true
            }
        },
        methods: {
            changePages(val) {
                let tabs = $('.tabs');
                tabs.removeClass('active');
                tabs.eq(val).addClass('active')
                this.swiper.slideTo(val, 500, false)
              },
            formatTime(key) {
                  let timer = new Date(key);
                  return timer.Format('yyyy.MM.dd');
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
            getJoin(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/statistic/time').then(function(res){
                    if(res.status == 200) {
                        self.joinList = res.data;
                        console.log(self.joinList);
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getJoin(responseData.token);
                            })
                        })
                    }
                }).catch(function(){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getGoin(responseData.token);
                        })
                    })
                });
            },
            getGcoin(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/statistic/gb').then(function(res){
                    self.loadingBig = false;
                    if(res.status == 200) {
                        self.gcoinList = res.data;
                        console.log(self.gcoinList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getGoin(responseData.token);
                            })
                        })
                    }
                }).catch(function(){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getGoin(responseData.token);
                        })
                    })
                });
            },
            getPopularity(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                console.log(http.defaults.headers.common)
                http.get('/statistic/heat').then(function(res){
                    if(res.status == 200) {
                        self.popularityList = res.data;
                        console.log(self.popularityList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getPopularity(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    console.log(err.response);
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getPopularity(responseData.token);
                        })
                    })
                });
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            var self = this;
            self.getGcoin();
            self.getPopularity();
            self.getJoin();

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    .income {
        text-align: left;
    }
  }
  .content {
    position: absolute;
    top: 143.5px;
    left: 0;
    width: 100%;
    height: calc(100vh - 143.5px);
    .swiper-slide {
        height: calc(100vh - 143.5px);
    }
  }
</style>
