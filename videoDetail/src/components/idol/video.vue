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
                <a class="tabs active" @click="changePages(0)">{{video_text.Gcoin}}</a>
                <a class="tabs" @click="changePages(1)">{{video_text.like}}</a>
                <a class="tabs" @click="changePages(2)">{{video_text.comment}}</a>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <div class="income eBorder">
                    <span class="detail_title" @click="getGcoin()">{{video_text.income}}</span>
                    <span><img src="../../images/timeline_icon_coins.png" alt="" class="icon"><i class="video_money" :class="{'video_money_show':gcoinList.total || gcoinList.total == 0}">{{gcoinList.total?Number(gcoinList.total).toLocaleString():'0'}}</i></span>
                </div>
                <div class="income_details eBorder">
                    <p class="detail_title">{{video_text.gift}}</p>
                    <ul class="income_img">
                        <!-- <li v-for="(gif,key) in gcoinList.gift">
                            <img class="gift" :src="gif.gift.img" alt="">
                            <p><span class="left">&times;{{gif.giftCount}}</span></p>
                        </li> -->
                        <li>
                            <img class="gift" src="../../images/pic_star.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[0].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_heart.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[1].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_rose.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[2].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_diamond.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[3].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_bear.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[4].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_tree.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[5].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_tower.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[6].giftCount}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="../../images/pic_castle.png" alt="">
                            <p><span class="left" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{gcoinList.gift[7].giftCount}}</span></p>
                        </li>
                    </ul>
                </div>
                <div class="fans_detail">
                    <p class="detail_title" :class="{'defalt_no' : gcoinList.rank?gcoinList.rank.length == 0:false}">{{video_text.fans}}</p>
                    <ul class="comment_list">
                        <li v-for="(fans,key) in gcoinList.rank" style="padding: 12px 0;">
                            <span class="level_color" v-if="key == 0"><img src="../../images/icon_metal_1.png" alt=""></span>
                            <span class="level_color" v-if="key == 1"><img src="../../images/icon_metal_2.png" alt=""></span>
                            <span class="level_color" v-if="key == 2"><img src="../../images/icon_metal_3.png" alt=""></span>
                            <span class="level_color" v-if="key > 2">{{key+1}}</span>
                            <img class="avatar" :src="fans.userFans?fans.userFans.avatar: '/static/images/default_img.png'" alt="">
                            <span>{{fans.userFans?fans.userFans.nickname: ''}}</span>
                            <img :src="fans.userFans?('/static/images/icon_level_'+ (fans.userFans.levelPlatform+1) +'.png'): ''" class="level" alt="">
                            <i>
                                <img src="../../images/timeline_icon_coins.png" class="likes" alt="">{{fans.expendGprice?Number(fans.expendGprice).toLocaleString(): 0}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="gcoinList.rank?gcoinList.rank.length == 0:false" style="padding-top: 32px;">
                        <img src="../../images/default_no coin.png" alt="">
                        <p v-html="video_text.noneGcoin"></p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list">
                    <li v-for="(popularity,key) in popularityList">
                        <span class="level_color" v-if="key == 0"><img src="../../images/icon_metal_1.png" alt=""></span>
                        <span class="level_color" v-if="key == 1"><img src="../../images/icon_metal_2.png" alt=""></span>
                        <span class="level_color" v-if="key == 2"><img src="../../images/icon_metal_3.png" alt=""></span>
                        <span class="level_color" v-if="key > 2">{{key+1}}</span>
                        <img class="avatar" :src="popularity.userFans?popularity.userFans.avatar:'/static/images/default_img.png'" alt="">
                        <span>{{popularity.userFans?popularity.userFans.nickname:''}}</span>
                        <img :src="popularity.userFans?('/static/images/icon_level_'+(popularity.userFans.levelPlatform+1)+'.png'):''" class="level" alt="">
                        <i>
                            <img src="../../images/timeline_icon_likes.png" class="likes" alt="">{{popularity.giftCount?Number(popularity.giftCount).toLocaleString():'0'}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="popularityList.length == 0">
                    <img src="../../images/default_no comment.png" alt="">
                    <p v-html="video_text.noneLike"></p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <scroller ref="my_scroller" class="my-scroller"
                  :on-refresh="refresh"
                  :on-infinite="infinite"
                  :noDataText="commentList.length == 0 ? '':'没有更多数据'">
                    <ul class="comment_list" style="background: #fff;">
                        <!-- <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                            <p>読み込み中</p>
                            <span></span>
                        </div> -->
                        <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                            <li class="defalt_msg" :class="{'firstLi':loadingBig}">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                            <li class="defalt_msg">
                                <div class="userinfo">
                                    <img :src="'/static/images/default_img.png'" alt="">
                                    <span></span>
                                    <i></i>
                                </div>
                                <div class="comment_content">
                                    <p></p>
                                    <div class="comment_img"></div>
                                </div>
                            </li>
                        </div>
                        <li v-for="(comment,key) in commentList" :class="[{'lastLi' : commentList.length > 5 && key == commentList.length-1},{'firstLi' : key == 0}]">
                            <div class="comment_info">
                                <img class="avatar" :src="comment.avatar?comment.avatar:'/static/images/default_img.png'" alt="">
                                <span>{{comment.nickname}}</span>
                                <img class="level" :src="'/static/images/icon_level_'+(comment.levelPlatform+1)+'.png'" alt="">
                                <i v-html="formatTime(comment.createTime)"></i>
                            </div>
                            <div class="comment_content" v-html="TransferString(comment.content)"></div>
                        </li>
                        <div class="default_page default_page3" v-show="commentList.length == 0">
                            <img src="../../images/default_no like.png" alt="">
                            <p v-html="video_text.noneComment"></p>
                        </div>
                        <!-- <div class="loading" :class="{'loading_show': showLoading}"><p><img src="../../images/loading_1.png" alt="">読み込み中</p><p v-show="havedlast">全て表示されました</p></div> -->
                    </ul>
                </scroller>
            </swiper-slide>
          </swiper>
        </div>
        <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import VueScroller from 'vue-scroller';
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
                    if(swiper.activeIndex == 0) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_g_coin');
                        }) 
                    }else if(swiper.activeIndex == 1) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_like');
                        })
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('view_comment');
                        })
                    }
                  },
                },
                commentList: [],
                gcoinList: {},
                popularityList: [],
                start: 0,
                num: 10,
                showLoading: false,
                showLoading2: false,
                loadingBig: true,
                havedlast: false,
                idx: 0,
                idx1: 0,
                video_text: {
                    Gcoin: 'コイン',
                    like: 'Like',
                    comment: 'コメント',
                    income: '獲得コイン数',
                    gift: 'ギフトリスト',
                    fans: '貢献ランキング',
                    noneGcoin: '还没有收到粉丝的G币<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう'
                },
            }
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active')
            this.swiper.slideTo(val, 500, false)
            if(val == 0) {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('view_g_coin');
                }) 
            }else if(val == 1) {
                bridge.callHandler('view_like');
            }else {
                bridge.callHandler('view_comment');
            }
          },
          formatTime(key) {
              let timer = new Date(key);
              return timer.Format('MM.dd')+ '&nbsp;' + timer.Format('hh:mm')
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
                        targetId: self.$route.query.videoId,
                        form: self.start,
                        rows: self.num
                    }
                }).then(function(res){
                    self.showLoading = false;
                    if(res.data.length>0) {
                        for(var i=0;i<res.data.length;i++){
                            self.commentList.push(res.data[i]);
                        }                    
                    }else {
                        self.havedlast = true;
                    }
                    console.log(self.commentList);
                }).catch(function(){

                });
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
                console.log(http.defaults.headers.common)
                http.get('/video/gcoin',{
                    params: {
                        videoId: self.$route.query.videoId
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.gcoinList = res.data;
                        self.loadingBig = false;
                        console.log(self.gcoinList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':self.$route.query.videoId}, function responseCallback(responseData) {
                                self.getGoin(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','videoId':self.$route.query.videoId}, function responseCallback(responseData) {
                            self.getGcoin(responseData.token);
                        })
                    })
                });
            }else {
                self.loadingBig = false;
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
            if(self.idx1 < 2) {
                self.idx1++;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/video/popularity',{
                    params: {
                        videoId: self.$route.query.videoId
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.popularityList = res.data;
                        console.log(self.popularityList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':self.$route.query.videoId}, function responseCallback(responseData) {
                                self.getPopularity(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':self.$route.query.videoId}, function responseCallback(responseData) {
                            self.getPopularity(responseData.token);
                        })
                    })
                });
            }
          },
          refresh (done) {
                var self = this;
                http.get('/post/list',{
                    params: {
                        targetType: 1,
                        targetId: self.$route.query.videoId,
                        from: 0,
                        rows: self.num
                    }
                }).then(function(res){
                    self.start = 0;
                    self.havedlast = false;
                    self.showLoading2 = false;
                     self.commentList = res.data;                  
                    console.log(self.commentList);
                }).catch(function(){
                    self.showLoading2 = false;
                });
                setTimeout(() => {
                  done()
                }, 500)
          },
          infinite (done) {
            var self = this;
            if(self.commentList.length>0) {
               if (self.havedlast) {
                  setTimeout(() => {
                    done(true)
                  }, 500)
                  return;
                } else {
                    setTimeout(() => {
                      self.start = self.start + self.num;
                      self.getComments();
                      done()
                    }, 500)
                }
            }else {
              setTimeout(() => {
                done(true)
              }, 1500)
              return;
            }
          }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
         mounted() {
            let self = this;
          //   self.box = document.querySelector('#swiper3');
          //   self.box.addEventListener('scroll', () => {
          //     if(document.querySelector('.lastLi')) {
          //         if(parseInt(document.querySelector('.lastLi').getBoundingClientRect().bottom)  == parseInt(document.querySelector('.content').getBoundingClientRect().bottom)) {
          //           if(self.havedlast == true) {
          //               self.showLoading = true;
          //               setTimeout(() => {
          //                   self.showLoading = false;
          //               },1500)
          //           }else {
          //               self.showLoading = true;
          //               setTimeout(() => {
          //                   self.start = self.start + self.num;
          //                   self.getComments();
          //               },500)
          //           }                    
          //         }
          //   }else {
          //     if(parseInt(document.querySelector('.default_page3').getBoundingClientRect().top)  == parseInt(document.querySelector('.content').getBoundingClientRect().top)) {
          //       self.showLoading2 = true;
          //       setTimeout(() => {
          //           self.refresh()
          //       },500)
          //     }
          //   }
          //   if(document.querySelector('.firstLi')) {
          //       if(parseInt(document.querySelector('.firstLi').getBoundingClientRect().top)  == parseInt(document.querySelector('.content').getBoundingClientRect().top)) {
          //           self.showLoading2 = true;
          //           setTimeout(() => {
          //              self.refresh()
          //           },500)
          //         }
          //   }
          // }, false)
        },
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 self.video_text= {
                    Gcoin: 'G币',
                    like: '人气',
                    comment: '评论',
                    income: '本视频G币',
                    gift: '礼物数量',
                    fans: '粉丝排行',
                    noneGcoin: 'まだコインはないようです<br>分享视频能让更多粉丝关注',
                    noneLike: '还没有收到粉丝的点赞人气<br>分享视频能让更多粉丝关注',
                    noneComment: '还没有收到粉丝的评论<br>分享视频能让更多粉丝关注'

                }
              } else {
                self.video_text= {
                    Gcoin: 'コイン',
                    like: 'Like',
                    comment: 'コメント',
                    income: '獲得コイン数',
                    gift: 'ギフトリスト',
                    fans: '貢献ランキング',
                    noneGcoin: 'まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう'
                }
              }
            self.getGcoin();
            self.getPopularity();
            self.getComments(); 
        }
    }
</script>

<style scoped>
    .defalt_no {
        color: #999;
    }
    .loading_top span {
        background: url(../../images/pic_loading_1.png);
        background-size: 100% auto;
    }
    .loading_top_show {
        height: 80px;
    }
    .loading_top_show span {
        animation: changebg 1s linear infinite;
    }
    @keyframes changebg{
        from {background: url(../../images/pic_loading_1.png);background-size: 100% auto;}
        to {background: url(../../images/pic_loading_2.png);background-size: 100% auto;}
    }
    .left {
    opacity: 0;
    transition: opacity 0.3s;
 }
.left_show {
    opacity: 1;
}
    .defalt_msg {
        .userinfo {
            span {
                width: 50px;
                height: 14px;
                background: #eee;
                margin-top:8px;
            }
        }
        .comment_content {
            >* {

                margin-top:10px;
                background: #eee;
                height: 14px;
            }
        }
    }
    .page_defalt {
        height: auto;
        opacity: 0.8;
        transition: all 0.3s;
    }
    .page_defalt_none {
        height: 0;
        padding:0;
        opacity: 0;
        border: none;
    }
</style>
