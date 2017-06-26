<template>
    <div class="main">
        <div class="header">
            <!-- <div class="detail">
                <a href="#" class="back">
                    <img src="../../../static/images/icon_arrow_back_black.png" alt="">
                </a>
                <span>详情</span>
            </div> -->
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">G币</a>
                <a class="tabs" @click="changePages(1)">人气</a>
                <a class="tabs" @click="changePages(2)">评论</a>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <div class="income">
                    <span class="detail_title" @click="getGcoin()">本视频总收入</span>
                    <span><img src="../../images/timeline_icon_coins.png" alt="" class="icon"><i class="video_money">{{Number(gcoinList.total).toLocaleString()}}</i></span>
                </div>
                <div class="income_details">
                    <p class="detail_title">收入详情</p>
                    <ul class="income_img">
                        <li v-for="(gif,key) in gcoinList.gift">
                            <img class="gift" :src="gif.gift.img" alt="">
                            <p><span class="left">&times;{{gif.giftCount}}</span></p>
                        </li>
                    </ul>
                </div>
                <div class="fans_detail">
                    <p class="detail_title" :class="{'defalt_no' : gcoinList.rank.length == 0}">粉丝排行</p>
                    <ul class="comment_list">
                        <li v-for="(fans,key) in gcoinList.rank">
                            <span class="level_color">{{key+1}}</span>
                            <img class="avatar" :src="fans.userFans.avatar" alt="">
                            <span>{{fans.userFans.nickname}}</span>
                            <img :src="fans.userFans.level" class="level" alt="">
                            <i>
                                <img src="../../images/timeline_icon_coins.png" class="likes" alt="">{{Number(fans.userFans.gcoin).toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="gcoinList.rank.length == 0" style="padding-top: 32px;">
                        <img src="../../images/default_no coin.png" alt="">
                        <p>还没有收到粉丝的G币<br>分享视频能让更多粉丝关注</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList">
                        <span class="level_color">{{key+1}}</span>
                        <img class="avatar" :src="popularity.userFans.avatar" alt="">
                        <span>{{popularity.userFans.nickname}}</span>
                        <img :src="popularity.userFans.level" class="level" alt="">
                        <i>
                            <img src="../../images/timeline_icon_likes.png" class="likes" alt="">{{Number(popularity.userFans.gcoin).toLocaleString()}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="popularityList.length == 0">
                    <img src="../../images/default_no comment.png" alt="">
                    <p>还没有收到粉丝的点赞人气<br>分享视频能让更多粉丝关注</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <ul class="comment_list">
                    <li v-for="(comment,key) in commentList">
                        <div class="comment_info">
                            <img class="avatar" :src="comment.avatar" alt="">
                            <span>{{comment.nickname}}</span>
                            <img class="level" :src="comment.level" alt="">
                            <i v-html="formatTime(comment.createTime)"></i>
                        </div>
                        <div class="comment_content" v-html="TransferString(comment.content)"></div>
                    </li>
                </ul>
                <div class="default_page" v-show="commentList.length == 0">
                    <img src="../../images/default_no like.png" alt="">
                    <p>还没有收到粉丝的评论<br>分享视频能让更多粉丝关注</p>
                </div>
            </swiper-slide>  
          </swiper>
        </div>
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
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
                commentList: [],
                gcoinList: {
                    total: '',
                    rank: []
                },
                popularityList: []
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
          getComments() {
            let self = this;
            http.get('/post/list',{
                params: {
                    targetType: 1,
                    targetId: self.$route.query.videoId
                }
            }).then(function(res){
                if(res.status == 200) {
                    self.commentList = res.data;
                    console.log(self.commentList);
                }else {
                   console.log(res)
                }
            }).catch(function(err){
               console.log(err)
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
            http.get('/video/popularity',{
                params: {
                    videoId: self.$route.query.targetId
                }
            }).then(function(res){
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
            self.getGcoin();
            // self.getPopularity();
            self.getComments();
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

<style scoped>
    .defalt_no {
        color: #999;
    }
</style>
