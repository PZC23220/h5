<template>
    <div class="main">
        <div class="header">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">今日排名</a>
                <a class="tabs" @click="changePages(1)">总排名</a>
            </div>
        </div>
         <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                    <ul class="top3">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="../../images/bg_2.png" alt="" class="crown">
                                 <img src="" alt="" class="idol_img">
                             </div>
                             <p class="idol_name">結月 みおな</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i>451,689</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="../../images/bg_1.png" alt="" class="crown">
                                 <img src="" alt="" class="idol_img">
                             </div>
                             <p class="idol_name">結月 みおな</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i>451,689</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="../../images/bg_3.png" alt="" class="crown">
                                 <img src="" alt="" class="idol_img">
                             </div>
                             <p class="idol_name">結月 みおな</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i>451,689</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <li>
                            <span>4</span>
                            <img class="avatar" src="" alt="">
                            <span>凯平</span>
                            <i>
                                <img src="../../images/timeline_icon_likes.svg" alt="">100
                            </i>
                        </li>
                    </ul>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="top3">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="../../images/bg_2.png" alt="" class="crown">
                                 <img src="" alt="" class="idol_img">
                             </div>
                             <p class="idol_name">結月 みおな</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i>451,689</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="../../images/bg_1.png" alt="" class="crown">
                                 <img src="" alt="" class="idol_img">
                             </div>
                             <p class="idol_name">結月 みおな</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i>451,689</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="../../images/bg_3.png" alt="" class="crown">
                                 <img src="" alt="" class="idol_img">
                             </div>
                             <p class="idol_name">結月 みおな</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i>451,689</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <li>
                            <span>4</span>
                            <img class="avatar" src="" alt="">
                            <span>凯平</span>
                            <i>
                                <img src="../../images/timeline_icon_likes.svg" alt="">100
                            </i>
                        </li>
                    </ul>
                </swiper-slide>
            </swiper>
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
                commentList: {},
                gcoinList: {
                    total: ''
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

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .comment_list {
        padding: 0;
        color: #666;
        li {
            padding-left: 12px;
            padding-right: 12px;
            >span:first-child {
                font-size: 18px;
                color: #CCCCCC;
            }
            >span:nth-child(3) {
                font-size: 14px;
            }
        }
        li:first-child {
            border-top: 1px solid #EBEBEB;
        }
    }
</style>