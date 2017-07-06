<template>
    <div class="main">
        <div class="header">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">G币贡献</a>
                <a class="tabs" @click="changePages(1)">人气贡献</a>
            </div>
        </div>
         <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                     <ul class="comment_list">
                        <h3 class="ranking_type">我的排名</h3>
                        <li>
                            <span>5</span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_coins.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <h3 class="ranking_type">总排行</h3>
                        <li>
                            <span><img src="../../images/icon_metal_1.png" alt=""></span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_coins.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <li>
                            <span><img src="../../images/icon_metal_2.png" alt=""></span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_coins.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <li>
                            <span><img src="../../images/icon_metal_3.png" alt=""></span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_coins.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <li v-for="(idol,key) in rakingListToday.rankingList" v-if="key > 2">
                            <span>{{idol.position}}</span>
                            <img class="avatar" :src="idol.avatar" alt="">
                            <span>{{idol.name}}</span>
                            <i>
                                <img src="../../images/timeline_icon_likes.svg" alt="">{{Number(idol.score).toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="comment_list">
                        <h3 class="ranking_type">我的排名</h3>
                        <li>
                            <span>5</span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_likes.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <h3 class="ranking_type">总排行</h3>
                        <li>
                            <span><img src="../../images/icon_metal_1.png" alt=""></span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_likes.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <li>
                            <span><img src="../../images/icon_metal_2.png" alt=""></span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_likes.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <li>
                            <span><img src="../../images/icon_metal_3.png" alt=""></span>
                            <img src="" alt="" class="avatar">
                            <div class="fans_content">
                                <span><em>みーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃんみーちゃん</em><img src="" class="level" alt=""></span>
                                <span><img src="../../images/timeline_icon_likes.png" alt="">3,999</span>
                            </div>
                            <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i>
                        </li>
                        <li v-for="(idol,key) in rakingListToday.rankingList" v-if="key > 2">
                            <span>{{idol.position}}</span>
                            <img class="avatar" :src="idol.avatar" alt="">
                            <span>{{idol.name}}</span>
                            <i>
                                <img src="../../images/timeline_icon_likes.png" alt="">{{Number(idol.score).toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                </swiper-slide>
            </swiper>
         </div>
         <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import $ from 'n-zepto';
    import http from '@/utils/http.js';
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
                rakingListToday: {},
                rakingList: {},
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
              let timer = new Date(key*1000);
              return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
          },
          getRanking(val,token) {
            let self = this;
            if(token) {
                http.defaults.headers.common['Authorization'] = 'Token '+token;
            }else {
                http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
            }
            http.get('/ranking/idols',{
                params: {
                    filter: val
                }
            }).then(function(res){
                self.loadingBig = false;
                if(res.status == 200) {
                    if(val == 'all') {
                        self.rakingList = res.data;
                    }else {
                        self.rakingListToday = res.data;
                    }
                    
                    console.log(self.rakingList)
                    console.log(self.rakingListToday)
                }else {
                    WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking(responseData.token);
                        })
                    })
                }
            }).catch(function(err){
                console.log(err.response);
                WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                        self.getRanking(responseData.token);
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
            self.getRanking('today');
            if(self.$route.query.type =='all') {
                self.swiperOption.initialSlide = 1;
            }
            self.getRanking('all');
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ranking_type {
        padding: 0 12px;
        color: #999;       
    }
    .comment_list {
        padding: 0;
        color: #666;
        li {
            padding-left: 12px;
            padding-right: 12px;
            >span:first-child {
                font-size: 24px;
                color: #CCCCCC;
            }
            >span:nth-child(3) {
                font-size: 14px;
                color: #666;
            }
        }
        li:first-child {
            border-top: 1px solid #EBEBEB;
        }
        .avatar {
            width: 40px;
            height: 40px;
        }
        div {
            float: left;
            width: calc(100vw - 80px - 24px - 50px);
            span {
                display: block;
                float: none;
                line-height: 20px;
                overflow: hidden;
                margin-right: 0;
                em {
                    text-overflow: ellipsis;
                    overflow:hidden;
                    white-space: nowrap;
                    text-align: left;
                    max-width: calc((100vw - 154px) * 0.83);
                    display: block;
                    float: left;
                }
                .level {
                    margin-top: 0;
                    margin-left: 2px;
                }                    
            }
            span:nth-child(2) {
                img {
                    width: 14px;
                    vertical-align: middle;
                    margin-right: 6px;
                }
            }
        }
        .fans_medal {
            margin: 0;
            height: auto;
            width: 40px;
            position: relative;
            .medal {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 43px;
                height: 10px;
            }
        }
    }
</style>