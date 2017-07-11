<template>
    <div class="main">
        <div class="header">
            <div class="income eBorder">
                <p>
                    <span class="detail_title">{{fans_text.mine}} </span>
                    <span class="detail_gcoin"><img src="../../images/icon_fans .png" alt="" class="icon"><i class="video_money left" :class="{'left_show':gcoinList.fansCount || gcoinList.fansCount == 0}">{{gcoinList.fansCount?Number(gcoinList.fansCount).toLocaleString():0}}</i></span>
                </p>
                <p>
                    <span class="detail_title">{{fans_text.add}}</span>
                    <span class="detail_gcoin"><img src="../../images/icon_fans .png" alt="" class="icon"><i class="video_money left" :class="{'left_show':gcoinList.fansCount || gcoinList.fansCount == 0}">{{gcoinList.fansIncreased?Number(gcoinList.fansIncreased).toLocaleString():0}}</i></span>
                </p>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{fans_text.Gcoin}}</a>
                <a class="tabs" @click="changePages(1)">{{fans_text.like}}</a>
                <a class="tabs" @click="changePages(2)">{{fans_text.time}}</a>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <ul class="comment_list">
                    <li v-for="(gFans,key) in gcoinList.fansList" style="padding: 0;">
                        <left-slider :index="key" @deleteItem="deleteItem(gFans.fansId)">
                            <span>
                                <img src="../../images/icon_metal_1.png" alt="" v-if="key==0">
                                <img src="../../images/icon_metal_2.png" alt="" v-if="key==1">
                                <img src="../../images/icon_metal_3.png" alt="" v-if="key==2">
                                <i class="rank_num" v-if="key>2">{{key+1}}</i>
                            </span>
                            <img class="avatar" :src="gFans.fans?gFans.fans.avatar:''" alt="">
                            <span>{{gFans.fans?gFans.fans.nickname:''}}</span>
                            <img :src="gFans.fans?'/static/images/icon_level_'+(gFans.fans.levelPlatform+1)+'.png':''" class="level" alt="">
                            <i>
                                <img src="../../images/timeline_icon_coins.png" alt="">{{Number(gFans.expendGprice).toLocaleString()}}
                            </i>
                        </left-slider>
                    </li>
                </ul>
                <div class="default_page" v-show="gcoinList.fansList?gcoinList.fansList.length == 0:false">
                    <img src="../../images/default_no coin.png" alt="">
                    <p>{{fans_text.noneGcoin}}</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList.fansList" style="padding: 0;">
                        <left-slider :index="key" @deleteItem="deleteItem(popularity.fansId)">
                            <span>
                                <img src="../../images/icon_metal_1.png" alt="" v-if="key==0">
                                <img src="../../images/icon_metal_2.png" alt="" v-if="key==1">
                                <img src="../../images/icon_metal_3.png" alt="" v-if="key==2">
                                <i v-if="key>2">{{key+1}}</i>
                            </span>
                            <img class="avatar" :src="popularity.fans?popularity.fans.avatar:''" alt="">
                            <span>{{popularity.fans?popularity.fans.nickname:''}}</span>
                            <img :src="popularity.fans?'/static/images/icon_level_'+(popularity.fans.levelPlatform+1)+'.png':''" class="level" alt="">
                            <i>
                                <img src="../../images/timeline_icon_likes.png" alt="">{{Number(popularity.totalNums).toLocaleString()}}
                            </i>
                        </left-slider>
                    </li>
                </ul>
                <div class="default_page" v-show="popularityList.fansList.length == 0">
                    <img src="../../images/default_no like.png" alt="">
                    <p>{{fans_text.noneLike}}</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <ul class="comment_list">
                    <li v-for="(fans,key) in joinList.fansList" style="padding: 0;">
                        <left-slider :index="key" @deleteItem="deleteItem(fans.fansId)">
                            <img class="avatar" :src="fans.fans?fans.fans.avatar:''" alt="">
                            <span>{{fans.fans?fans.fans.nickname:''}}</span>
                            <img :src="fans.fans?'/static/images/icon_level_'+(fans.fans.levelPlatform+1)+'.png':''" class="level" alt="">
                            <i v-html="formatTime(fans.startdate)"></i>
                        </left-slider>
                    </li>
                </ul>
                <div class="default_page" v-show="joinList.fansList.length == 0">
                    <img src="../../images/default_no history.png" alt="">
                    <p>{{fans_text.noneComment}}</p>
                </div>
            </swiper-slide>
          </swiper>
        </div>
       <!--  <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div> -->
    </div>
</template>

<script>
    import LeftSlider from '../leftSlider.vue';
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
                gcoinList: {},
                popularityList: {
                    fansList: []
                },
                // loadingBig: true,
                idx: 0,
                idx2: 0,
                idx1: 1,
                fans_text: {
                    mine: 'ファン',
                    add: '昨日の新規',
                    Gcoin: 'コイン',
                    like: 'Like',
                    time: '入会日',
                    noneGcoin: 'まだコインはないようです',
                    noneLike: 'まだLikeはないようです',
                    noneComment: 'まだメンバーはないようです'
                }
            }
        },
        components: {
            LeftSlider
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
                if(self.idx1 < 2) {
                    self.idx1++;
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
                }
                    
            },
            getGcoin(token) {
                let self = this;
                if(self.idx < 2) {
                    self.idx++;
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                    }
                    http.get('/statistic/gb').then(function(res){
                        // self.loadingBig = false;
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
                } else {
                    // self.loadingBig = false;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                         if(_lan === 'zh-cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                         }
                    })
                }
            },
            getPopularity(token) {
                let self = this;
                if(self.idx2 < 2) {
                    self.idx2++;
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
            deleteItem: function(index) {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                     if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '举报成功，我们将尽快审核');
                     }else {
                        bridge.callHandler('makeToast', '举报成功，我们将尽快审核');
                     }
                     http.get('/groupyuser/report',{
                        params: {
                            reportedUserId:index
                        }
                     }).then(function(res){
                        console.log('举报成功');
                     })
                })
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 self.fans_text= {
                    mine: '我的粉丝',
                    add: '昨日新增',
                    Gcoin: 'G币贡献',
                    like: '人气',
                    time: '入会时间',
                    noneGcoin: '还没有收到粉丝的G币',
                    noneLike: '还没有收到粉丝的点赞人气',
                    noneComment: '还没有收到粉丝的评论'

                }
              } else {
                self.fans_text= {
                    mine: 'ファン',
                    add: '昨日の新規',
                    Gcoin: 'コイン',
                    like: 'Like',
                    time: '入会日',
                    noneGcoin: 'まだコインはないようです',
                    noneLike: 'まだLikeはないようです',
                    noneComment: 'まだメンバーはないようです'
                }
              }
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
    top: 144.5px;
    left: 0;
    width: 100%;
    height: calc(100vh - 143.5px);
    .swiper-slide {
        height: calc(100vh - 143.5px);
    }
  }
   .left {
    opacity: 0.2;
    transition: opacity 0.3s;
 }
.left_show {
    opacity: 1 !important;
}
</style>
