<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
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
                <span class="bgActive"></span>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <div class="income eBorder">
                    <span class="detail_title" @click="getGcoin()">{{video_text.income}}</span>
                    <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="" class="icon"><i class="video_money" :class="{'video_money_show':(gcoinList.total || gcoinList.total == 0)}">{{gcoinList.total?Number(gcoinList.total).toLocaleString():0}}</i></span>
                </div>
                <div class="income_details eBorder">
                    <p class="detail_title">{{video_text.gift}}</p>
                    <ul class="income_img">
                        <!-- <li v-for="(gif,key) in gcoinList.gift">
                            <img class="gift" :src="gif.gift.img" alt="">
                            <p><span class="left">&times;{{gif.giftCount}}</span></p>
                        </li> -->
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_heart.png" alt="" style="background: #ffe7ea;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[1].giftCount?gcoinList.gift[1].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_star.png" alt="" style="background: #fffddd;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[0].giftCount?gcoinList.gift[0].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_rose.png" alt="" style="background: #ffe9ec;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[2].giftCount?gcoinList.gift[2].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_diamond.png" alt="" style="background: #e1eff2;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[3].giftCount?gcoinList.gift[3].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_bear.png" alt="" style="background: #fff1e2;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[4].giftCount?gcoinList.gift[4].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_tree.png" alt="" style="background: #ffedf1;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[5].giftCount?gcoinList.gift[5].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_tower.png" alt="" style="background: #ffe9ea;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[6].giftCount?gcoinList.gift[6].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                        <li>
                            <img class="gift" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/gift/pic_castle.png" alt="" style="background: #dbe6f6;">
                            <p><span class="left maxWidth" :class="{'left_show':gcoinList.gift}" v-if="gcoinList.gift">&times;{{Number(gcoinList.gift[7].giftCount?gcoinList.gift[7].giftCount:0).toLocaleString()}}</span></p>
                        </li>
                    </ul>
                </div>
                <div class="fans_detail">
                    <p class="detail_title" :class="{'defalt_no' : gcoinList.rank?gcoinList.rank.length == 0:false}">{{video_text.fans}}</p>
                    <ul class="comment_list">
                        <li v-for="(fans,key) in gcoinList.rank" >
                            <!-- <left-slider :index="key" @deleteItem="deleteItem(fans.fansId)"> -->
                                <span class="level_color" v-if="key == 0"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                                <span class="level_color" v-if="key == 1"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                                <span class="level_color" v-if="key == 2"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                                <span class="level_color" v-if="key > 2">{{key+1}}</span>
                                <img class="avatar" v-lazy="fans.userFans?fans.userFans.avatar:'http://h5.groupy.vip/img/default_img.png'" alt="">
                                <span class="shortName">{{fans.userFans?fans.userFans.nickname: '...'}}</span>
                                <!-- <img :src="fans.userFans?('/static/images/icon_level_'+ (fans.userFans.levelPlatform) +'.png'): '/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                <!-- <img :src="fans.userFans?('/img/icon_medal_'+ (fans.userFans.medal) +'.png'): ''" class="level" alt=""> -->
                                <span class="level">Lv.{{fans.userFans?(fans.userFans.levelPlatform?fans.userFans.levelPlatform:0):0}}</span>
                                <img class="medal_level" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/medal/icon_medal_'+(fans.userFans.medal)+'.png'" v-if="fans.userFans.medal&&fans.userFans.medal>0" alt="">
                                <i>
                                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" class="likes" alt="">{{fans.expendGprice?Number(fans.expendGprice).toLocaleString(): 0}}
                                </i>
                            <!-- </left-slider> -->
                        </li>
                        <div class="default_page" v-show="gcoinList.rank?gcoinList.rank.length == 0:false" style="padding-top: 32px;">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no coin.png" alt="">
                            <p v-html="video_text.noneGcoin"></p>
                        </div>
                    </ul>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper2">
                <ul class="comment_list" style="padding: 0;min-height: calc(100vh - 41px);">
                    <li v-for="(popularity,key) in popularityList" >
                        <!-- <left-slider :index="key" @deleteItem="deleteItem(popularity.fansId)"> -->
                            <span class="level_color" v-if="key == 0"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_1.png" alt=""></span>
                            <span class="level_color" v-if="key == 1"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_2.png" alt=""></span>
                            <span class="level_color" v-if="key == 2"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_3.png" alt=""></span>
                            <span class="level_color" v-if="key > 2">{{key+1}}</span>
                            <img class="avatar" v-lazy="popularity.userFans?popularity.userFans.avatar:'http://h5.groupy.vip/img/default_img.png'" alt="">
                            <span class="shortName">{{popularity.userFans?(popularity.userFans.nickname?popularity.userFans.nickname:'...'):'...'}}</span>
                            <!-- <img :src="popularity.userFans?('/static/images/icon_level_'+(popularity.userFans.levelPlatform)+'.png'):''" class="level" alt=""> -->
                            <span class="level">Lv.{{popularity.userFans?(popularity.userFans.levelPlatform?popularity.userFans.levelPlatform:0):0}}</span>
                            <img class="medal_level" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/medal/icon_medal_'+(popularity.userFans.medal)+'.png'" v-if="popularity.userFans.medal&&popularity.userFans.medal>0" alt="">
                            <i>
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" class="likes" alt="">{{popularity.totalNums?Number(popularity.totalNums).toLocaleString():'0'}}
                            </i>
                        <!-- </left-slider> -->
                    </li>
                    <div class="default_page" v-show="popularityList.length == 0">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no comment.png" alt="">
                        <p v-html="video_text.noneLike"></p>
                    </div>
                </ul>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <!-- <scroller ref="my_scroller" class="my-scroller"
                  :on-refresh="refresh"
                  :on-infinite="infinite"
                  :noDataText="commentList.length == 0 ? '':'全て表示されました'"> -->
                  <v-scroll :on-refresh="refresh" :on-infinite="infinite">
                    <ul class="comment_list" style="background: #fff;min-height: calc(100vh - 41px);">
                        <li v-for="(comment,key) in commentList" :class="[{'lastLi' : commentList.length > 5 && key == commentList.length-1},{'firstLi' : key == 0}]">
                            <div class="comment_info">
                                <img class="avatar"  v-lazy="comment.avatar" alt="">
                                <span class="name">{{comment.nickname?comment.nickname:'...'}}</span>
                                <!-- <img class="level" :src="'/static/images/icon_level_'+(comment.levelPlatform)+'.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" alt=""> -->
                                <span class="level" style="margin-top: 1px;">Lv.{{comment.levelPlatform}}</span>
                                <img class="medal_level" style="margin-top: 0px;" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/medal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt="">
                                <i v-html="formatTime(comment.createTime)"></i>
                            </div>
                            <div class="comment_content" v-html="TransferString(comment.content)"></div>
                        </li>
                        <div class="default_page default_page3" v-show="commentList.length == 0">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no%20like.png" alt="">
                            <p v-html="video_text.noneComment"></p>
                        </div>
                        <!-- <div class="loading" :class="{'loading_show': showLoading}"><p><img src="/img/loading_1.png" alt="">読み込み中</p><p v-show="havedlast">全て表示されました</p></div> -->
                    </ul>
                <!-- </scroller> -->
                </v-scroll>
            </swiper-slide>
          </swiper>
          <div class="Forbidden"></div>
        </div>
        <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import LeftSlider from '../../../components/leftSlider.vue';
    import Scroll from '../../../components/scroll.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    // import VueScroller from 'vue-scroller';
    import $ from 'n-zepto';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    // var vConsole = require('@api/js/vconsole.min.js');
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
                  iOSEdgeSwipeDetection : true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    $('.bgActive').css('left','calc((100vw - 24px)* '+ (swiper.activeIndex) +'/3)');
                    console.log(this.bgRun)
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
                num: 20,
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
                    noneGcoin: 'まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう'
                },
            }
        },
        components: {
            LeftSlider,
            'v-scroll': Scroll
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active')
            this.swiper.slideTo(val, 500, false);
            $('.bgActive').css('left','calc((100vw - 24px)* '+ (val) +'/3)');
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
              let timer = new Date(key - 1*60*60*1000);
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
                        targetId: getParams('videoId'),
                        from: self.start,
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
                }).catch(function(){

                });
          },
          getGcoin(token) {
            let self = this;
            if(self.idx < 2) {
                self.idx++;
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                console.log(http.defaults.headers.common)
                http.get('/video/gcoin',{
                    params: {
                        videoId: getParams('videoId')
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.gcoinList = res.data;
                        self.loadingBig = false;
                        console.log(self.gcoinList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                self.getGoin(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
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
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          getPopularity(token) {
            let self = this;
            if(self.idx1 < 2) {
                self.idx1++;
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/video/popularity',{
                    params: {
                        videoId: getParams('videoId')
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.popularityList = res.data;
                        console.log(self.popularityList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':getParams('videoId')}, function responseCallback(responseData) {
                                self.getPopularity(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
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
                        targetId: getParams('videoId'),
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
                 self.video_text= {
                    Gcoin: 'G币',
                    like: '人气',
                    comment: '评论',
                    income: '本视频G币',
                    gift: '礼物数量',
                    fans: '粉丝排行',
                    noneGcoin: '还没有收到粉丝的G币<br>分享视频能让更多粉丝关注',
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
            setTimeout(function(){
                self.getPopularity();
                self.getComments(); 
            },0);
        }
    }
</script>

<style scoped>
    .defalt_no {
        color: #999;
    }
    .name {
        max-width: calc(100vw - 200px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
    }
    .shortName {
        max-width: calc(80vw - 180px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
    }
    .maxWidth {
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: block;
    }
    .income .video_money {
        max-width: calc(100vw - 166px);
    }
    .loading_top span {
        background: url(/img/pic_loading_1.png);
        background-size: 100% auto;
    }
    .loading_top_show {
        height: 80px;
    }
    .loading_top_show span {
        animation: changebg 1s linear infinite;
    }
    @keyframes changebg{
        from {background: url(/img/pic_loading_1.png);background-size: 100% auto;}
        to {background: url(/img/pic_loading_2.png);background-size: 100% auto;}
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
