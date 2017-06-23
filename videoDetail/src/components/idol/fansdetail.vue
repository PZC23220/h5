<template>
    <div class="main">
        <div class="header">
            <div class="income eBorder">
                <p>
                    <span class="detail_title">我的粉丝</span>
                    <span class="detail_gcoin"><img src="../../images/icon_fans .png" alt="" class="icon"><i class="video_money">31,256</i></span>
                </p>
                <p>
                    <span class="detail_title">昨日粉丝</span>
                    <span class="detail_gcoin"><img src="../../images/icon_fans .png" alt="" class="icon"><i class="video_money">31,256</i></span>
                </p>
            </div>
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">G币贡献</a>
                <a class="tabs" @click="changePages(1)">人气数</a>
                <a class="tabs" @click="changePages(2)">入会时间</a>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList">
                        <span>
                            <img src="../../images/icon_metal_1.png" alt="" v-if="key==0">
                            <img src="../../images/icon_metal_2.png" alt="" v-if="key==1">
                            <img src="../../images/icon_metal_3.png" alt="" v-if="key==2">
                            <i v-if="key>2">{{key+1}}</i>
                        </span>
                        <img class="avatar" :src="popularity.userFans.avatar" alt="">
                        <span>{{popularity.userFans.nickname}}</span>
                        <img src="../../images/icon_level.svg" class="level" alt="">
                        <!-- <embed src="./icon_level.svg" class="level" type="image/svg+xml"pluginspage="http://www.adobe.com/svg/viewer/install/" /> -->
                        <i>
                            <img src="../../images/timeline_icon_coins.png" alt="">{{Number(popularity.totalNums).toLocaleString()}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="true">
                    <img src="../../images/default_no coin.png" alt="">
                    <p>还没有收到粉丝的G币</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList">
                        <span>
                            <img src="../../images/icon_metal_1.png" alt="" v-if="key==0">
                            <img src="../../images/icon_metal_2.png" alt="" v-if="key==1">
                            <img src="../../images/icon_metal_3.png" alt="" v-if="key==2">
                            <i v-if="key>2">{{key+1}}</i>
                        </span>
                        <img class="avatar" :src="popularity.userFans.avatar" alt="">
                        <span>{{popularity.userFans.nickname}}</span>
                        <img src="../../images/icon_level.svg" class="level" alt="">
                        <!-- <embed src="./icon_level.svg" class="level" type="image/svg+xml"pluginspage="http://www.adobe.com/svg/viewer/install/" /> -->
                        <i>
                            <img src="../../images/timeline_icon_likes.svg" alt="">{{Number(popularity.totalNums).toLocaleString()}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="true">
                    <img src="../../images/default_no like.png" alt="">
                    <p>还没有收到粉丝的点赞人气</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList">
                        <img class="avatar" :src="popularity.userFans.avatar" alt="">
                        <span>{{popularity.userFans.nickname}}</span>
                        <img src="../../images/icon_level.svg" class="level" alt="">
                        <!-- <embed src="./icon_level.svg" class="level" type="image/svg+xml"pluginspage="http://www.adobe.com/svg/viewer/install/" /> -->
                        <i>2017.5.14</i>
                    </li>
                </ul>
                <div class="default_page" v-show="true">
                    <img src="../../images/default_no history.png" alt="">
                    <p>还没有会员入会记录</p>
                </div>
            </swiper-slide>  
          </swiper>
        </div>
    </div>
</template>

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
                commentList: {},
                gcoinList: {
                    total: 0
                },
                popularityList: {}
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
            getIncome(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/group/income').then(function(res){
                    console.log(res);
                }).catch(function(){

                });
            },
            getGcoin(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                console.log(http.defaults.headers.common)
                http.get('/video/gcoin',{
                    params: {
                        videoId: self.$route.query.targetId
                    }
                }).then(function(res){
                    console.log()
                    if(res.status == 200) {
                        self.gcoinList = res.data;
                        console.log(self.gcoinList)
                    }else {
                        WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':'2'}, function responseCallback(responseData) {
                                alert(1111)
                                alert(JSON.stringify(responseData));
                                self.getGoin(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    console.log(err.response);
                    WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':'2'}, function responseCallback(responseData) {
                            alert(1111)
                            alert(JSON.stringify(responseData))
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
                http.get('/video/popularity',{
                    params: {
                        videoId: self.$route.query.targetId
                    }
                }).then(function(res){
                    console.log()
                    if(res.status == 200) {
                        self.popularityList = res.data;
                        console.log(self.popularityList)
                    }else {
                        WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':'2'}, function responseCallback(responseData) {
                                alert(1111)
                                alert(JSON.stringify(responseData));
                                self.getPopularity(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    console.log(err.response);
                    WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':'2'}, function responseCallback(responseData) {
                            alert(1111)
                            alert(JSON.stringify(responseData));
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
            // console.log(self.$route.query);
            // self.getGcoin();
                self.getIncome();
            //调用一个测试函数
            let _data = {
                targetType: 1,
                targetId: 2
            }
            // setupWebViewJavascriptBridge(function(bridge) {
            //     bridge.callHandler('getToken', {'targetType':'1','targetId':'2'}, function responseCallback(responseData) {
            //         alert(1111);
            //         alert(JSON.stringify(responseData));
            //     })
            // })

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
