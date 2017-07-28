<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
            <div class="income eBorder">
                <p>
                    <span class="detail_title">{{fans_text.mine}} </span>
                    <span class="detail_gcoin"><img src="/img/icon_fans .png" alt="" class="icon"><i class="video_money left" :class="{'left_show':gcoinList.fansCount || gcoinList.fansCount == 0}">{{gcoinList.fansCount?Number(gcoinList.fansCount).toLocaleString():0}}</i></span>
                </p>
                <p>
                    <span class="detail_title">{{fans_text.add}}</span>
                    <span class="detail_gcoin"><img src="/img/icon_fans .png" alt="" class="icon"><i class="video_money left" :class="{'left_show':gcoinList.fansCount || gcoinList.fansCount == 0}">{{gcoinList.fansIncreased?Number(gcoinList.fansIncreased).toLocaleString():0}}</i></span>
                </p>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{fans_text.Gcoin}}</a>
                <a class="tabs" @click="changePages(1)">{{fans_text.like}}</a>
                <a class="tabs" @click="changePages(2)">{{fans_text.time}}</a>
                <span class="bgActive"></span>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <ul class="comment_list">
                    <li v-for="(gFans,key) in gcoinList.fansList">
                        <!-- <left-slider :index="key" @deleteItem="deleteItem(gFans.fansId)"> -->
                            <span>
                                <img src="/img/fans_fansRanking/icon_metal_1.png" alt="" v-if="key==0">
                                <img src="/img/fans_fansRanking/icon_metal_2.png" alt="" v-if="key==1">
                                <img src="/img/fans_fansRanking/icon_metal_3.png" alt="" v-if="key==2">
                                <i class="rank_num" v-if="key>2" style="height: auto;line-height: 18px;margin-top:6px;">{{key+1}}</i>
                            </span>
                            <img class="avatar" :src="gFans.fans?(gFans.fans.avatar?gFans.fans.avatar:'http://h5.groupy.vip/img/default_img.png'):'http://h5.groupy.vip/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="">
                            <span class="name">{{gFans.fans?(gFans.fans.nickname?gFans.fans.nickname:'...'):'...'}}</span>
                            <!-- <img :src="gFans.fans?'/static/images/icon_level_'+(gFans.fans.levelPlatform)+'.png':'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                            <span class="level">Lv.{{gFans.fans?(gFans.fans.levelPlatform?gFans.fans.levelPlatform:0):0}}</span>
                            <img class="medal_level" :src="'/img/icon_medal_'+(gFans.fans.medal)+'.png'" v-if="gFans.fans.medal&&gFans.fans.medal>0" alt="">
                            <!-- <img :src="gFans.fans?'/static/images/icon_level_'+(gFans.fans.medal)+'.png':''" class="level" alt=""> -->
                            <i>
                                <img src="/img/timeline_icon_coins.png" alt=""><em class="coin">{{Number(gFans.expendGprice?gFans.expendGprice:'0').toLocaleString()}}</em>
                            </i>
                        <!-- </left-slider> -->
                    </li>
                </ul>
                <div class="default_page" v-show="gcoinList.fansList?gcoinList.fansList.length == 0:false">
                    <img src="/img/default_no coin.png" alt="">
                    <p>{{fans_text.noneGcoin}}</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList.fansList">
                        <!-- <left-slider :index="key" @deleteItem="deleteItem(popularity.fansId)"> -->
                            <span>
                                <img src="/img/fans_fansRanking/icon_metal_1.png" alt="" v-if="key==0">
                                <img src="/img/fans_fansRanking/icon_metal_2.png" alt="" v-if="key==1">
                                <img src="/img/fans_fansRanking/icon_metal_3.png" alt="" v-if="key==2">
                                <i v-if="key>2" style="height: auto;line-height: 18px;margin-top:6px;">{{key+1}}</i>
                            </span>
                            <img class="avatar" :src="popularity.fans?(popularity.fans.avatar?popularity.fans.avatar:'http://h5.groupy.vip/img/default_img.png'):'http://h5.groupy.vip/img/default_img.png'"  onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="">
                            <span class="name">{{popularity.fans?(popularity.fans.nickname?popularity.fans.nickname:'...'):'...'}}</span>
                            <!-- <img :src="popularity.fans?'/static/images/icon_level_'+(popularity.fans.levelPlatform)+'.png':'/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                            <span class="level">Lv.{{popularity.fans?(popularity.fans.levelPlatform?popularity.fans.levelPlatform:0):0}}</span>
                            <img class="medal_level" :src="'/img/icon_medal_'+(popularity.fans.medal)+'.png'" v-if="popularity.fans.medal&&popularity.fans.medal>0" alt="">
                            <!-- <img :src="popularity.fans?'/static/images/icon_level_'+(popularity.fans.medal)+'.png':''" class="level" alt=""> -->
                            <i>
                                <img src="/img/timeline_icon_likes.png" alt=""><em class="coin">{{Number(popularity.totalNums?popularity.totalNums:'0').toLocaleString()}}</em>
                            </i>
                        <!-- </left-slider> -->
                    </li>
                </ul>
                <div class="default_page" v-show="popularityList.fansList.length == 0">
                    <img src="/img/default_no like.png" alt="">
                    <p>{{fans_text.noneLike}}</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3" style="overflow-y: scroll;">
                <ul class="comment_list">
                    <li v-for="(fans,key) in joinList.fansList" style="padding: 0;">
                        <left-slider :index="key" @deleteItem.stop="deleteItem(fans.fansId)">
                            <img class="avatar" :src="fans.fans?(fans.fans.avatar?fans.fans.avatar:'http://h5.groupy.vip/img/default_img.png'):'http://h5.groupy.vip/img/default_img.png'"  onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="">
                            <span class="name">{{fans.fans?(fans.fans.nickname?fans.fans.nickname:'...'):'...'}}</span>
                            <!-- <img :src="fans.fans?'/static/images/icon_level_'+(fans.fans.levelPlatform)+'.png':'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                            <span class="level">Lv.{{fans.fans?(fans.fans.levelPlatform?fans.fans.levelPlatform:0):0}}</span>
                            <img class="medal_level" :src="'/img/icon_medal_'+(fans.fans.medal)+'.png'" v-if="fans.fans.medal&&fans.fans.medal>0" alt="">
                            <!-- <img :src="fans.fans?'/static/images/icon_level_'+(fans.fans.medal)+'.png':''" class="level" alt=""> -->
                            <i v-html="formatTime(fans.startdate)"></i>
                        </left-slider>
                    </li>
                </ul>
                <div class="default_page" v-show="joinList.fansList.length == 0">
                    <img src="/img/default_no history.png" alt="">
                    <p>{{fans_text.noneComment}}</p>
                </div>
            </swiper-slide>
          </swiper>
           <!-- <div class="Forbidden"></div> -->
        </div>
       <!--  <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>

<script>
    import LeftSlider from '../../../components/leftSlider.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
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
                  // shortSwipes : false,
                  touchMoveStopPropagation : false,
                  resistanceRatio : 0,
                  iOSEdgeSwipeDetection : true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    $('.bgActive').css('left','calc((100vw - 24px)* '+ (swiper.activeIndex) +'/3)');
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
                    noneGcoin: 'まだコインを獲得したことないです',
                    noneLike: 'まだLikeしたファンはいないです',
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
                tabs.eq(val).addClass('active');
                $('.bgActive').css('left','calc((100vw - 24px)* '+ (val) +'/3)');
                this.swiper.slideTo(val, 500, false);
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
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
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
                        self.idx1++;
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
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
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
                        self.idx++;
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
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
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
                        self.idx2++;
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
                    noneComment: '还没有会员入会记录'

                }
              } else {
                self.fans_text= {
                    mine: 'ファン',
                    add: '昨日の新規',
                    Gcoin: 'コイン',
                    like: 'Like',
                    time: '入会日',
                    noneGcoin: 'まだコインを獲得したことないです',
                    noneLike: 'まだLikeしたファンはいないです',
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
    top: 150.5px;
    left: 0;
    width: 100%;
    height: calc(100vh - 150.5px);
    .swiper-slide {
        height: calc(100vh - 150.5px);
    }
  }
  .name {
    max-width: calc(100vw - 250px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .coin {
    max-width: calc((100vw - 24px)*0.21 - 20px);
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
   .left {
    opacity: 0.2;
    transition: opacity 0.3s;
 }
.left_show {
    opacity: 1 !important;
}
#swiper3::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid rgba(0, 0, 0, 0);
}
#swiper3::-webkit-scrollbar {
  width: 5px;
  height: 13px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
#swiper3::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 28px;
}
#swiper3::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</style>
