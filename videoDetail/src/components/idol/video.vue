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
                <a class="tabs active" @click="changePages(0)">コイン</a>
                <a class="tabs" @click="changePages(1)">Like</a>
                <a class="tabs" @click="changePages(2)">コメント</a>
            </div>
        </div>
        <div class="content">
          <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
            <!-- slides -->
            <swiper-slide id="swiper1">
                <div class="income">
                    <span class="detail_title" @click="getGcoin()">獲得したコイン</span>
                    <span><img src="../../images/timeline_icon_coins.png" alt="" class="icon"><i class="video_money">{{Number(gcoinList.total).toLocaleString()}}</i></span>
                </div>
                <div class="income_details">
                    <p class="detail_title">収入詳細</p>
                    <ul class="income_img">
                        <li v-for="(gif,key) in gcoinList.gift">
                            <img class="gift" :src="gif.gift.img" alt="">
                            <p><span class="left">&times;{{gif.giftCount}}</span></p>
                        </li>
                    </ul>
                </div>
                <div class="fans_detail">
                    <p class="detail_title" :class="{'defalt_no' : gcoinList.rank.length == 0}">貢献ランキング</p>
                    <ul class="comment_list">
                        <li v-for="(fans,key) in gcoinList.rank" style="padding: 12px 0;">
                            <span class="level_color" v-if="key == 0"><img src="../../images/icon_metal_1.png" alt=""></span>
                            <span class="level_color" v-if="key == 1"><img src="../../images/icon_metal_2.png" alt=""></span>
                            <span class="level_color" v-if="key == 2"><img src="../../images/icon_metal_3.png" alt=""></span>
                            <span class="level_color" v-if="key > 2">{{key+1}}</span>
                            <img class="avatar" :src="fans.userFans?fans.userFans.avatar: ''" alt="">
                            <span>{{fans.userFans?fans.userFans.nickname: ''}}</span>
                            <img :src="fans.userFans?fans.userFans.level: ''" class="level" alt="">
                            <i>
                                <img src="../../images/timeline_icon_coins.png" class="likes" alt="">{{Number(fans.userFans?fans.userFans.gcoin: 0).toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="gcoinList.rank.length == 0" style="padding-top: 32px;">
                        <img src="../../images/default_no coin.png" alt="">
                        <p>まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう</p>
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
                        <img class="avatar" :src="popularity.userFans?popularity.userFans.avatar:''" alt="">
                        <span>{{popularity.userFans?popularity.userFans.nickname:''}}</span>
                        <img :src="popularity.userFans?popularity.userFans.level:''" class="level" alt="">
                        <i>
                            <img src="../../images/timeline_icon_likes.png" class="likes" alt="">{{Number(popularity.userFans?popularity.userFans.gcoin:'').toLocaleString()}}
                        </i>
                    </li>
                </ul>
                <div class="default_page" v-show="popularityList.length == 0">
                    <img src="../../images/default_no comment.png" alt="">
                    <p>まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう</p>
                </div>
            </swiper-slide>
            <swiper-slide id="swiper3">
                <ul class="comment_list">
                    <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                        <p>読み込み中</p>
                        <span></span>
                    </div>
                    <li v-for="(comment,key) in commentList" :class="[{'lastLi' : commentList.length > 5 && key == commentList.length-1},{'firstLi' : key == 0}]">
                        <div class="comment_info">
                            <img class="avatar" :src="comment.avatar" alt="">
                            <span>{{comment.nickname}}</span>
                            <img class="level" :src="comment.level" alt="">
                            <i v-html="formatTime(comment.createTime)"></i>
                        </div>
                        <div class="comment_content" v-html="TransferString(comment.content)"></div>
                    </li>
                    <div class="loading" :class="{'loading_show': showLoading}"><p><img src="../../images/loading_1.png" alt="">読み込み中</p><p v-show="havedlast">全て表示されました</p></div>
                </ul>
                <div class="default_page" v-show="commentList.length == 0">
                    <img src="../../images/default_no like.png" alt="">
                    <p>まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう</p>
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
                commentList: [],
                gcoinList: {
                    total: '',
                    rank: []
                },
                popularityList: [],
                start: 0,
                num: 10,
                showLoading: false,
                showLoading2: false,
                loadingBig: true,
                havedlast: false
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
                        targetId: 1,
                        start: self.start,
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
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                console.log(http.defaults.headers.common)
                http.get('/video/gcoin',{
                    params: {
                        videoId: 1
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.gcoinList = res.data;
                        self.loadingBig = false;
                        console.log(self.gcoinList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':'2'}, function responseCallback(responseData) {
                                alert(1111)
                                alert(JSON.stringify(responseData));
                                self.getGoin(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','videoId':'2'}, function responseCallback(responseData) {
                            self.getGcoin(responseData.token);
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
                        videoId: 1
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        self.popularityList = res.data;
                        console.log(self.popularityList)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','videoId':'2'}, function responseCallback(responseData) {
                                self.getPopularity(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'1','targetId':'2'}, function responseCallback(responseData) {
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
         mounted() {
            let self = this;
            self.box = document.querySelector('#swiper3');
            self.box.addEventListener('scroll', () => {
              if(parseInt(document.querySelector('.lastLi').getBoundingClientRect().bottom) == parseInt(document.querySelector('.content').getBoundingClientRect().bottom)) {
                self.showLoading = true;
                setTimeout(() => {
                    self.start = self.start + self.num;
                    self.getComments();
                },500)
                
              }
              // alert(parseInt(document.querySelector('.firstLi').getBoundingClientRect().top) == parseInt(document.querySelector('.content').getBoundingClientRect().top))
              if(parseInt(document.querySelector('.firstLi').getBoundingClientRect().top) == parseInt(document.querySelector('.content').getBoundingClientRect().top)) {
                self.showLoading2 = true;
                setTimeout(() => {
                    http.get('/post/list',{
                        params: {
                            targetType: self.$route.query.targetType,
                            targetId: 1,
                            start: 0,
                            rows: self.num
                        }
                    }).then(function(res){
                        self.showLoading2 = false;
                         self.commentList = res.data;                  
                        console.log(self.commentList);
                    }).catch(function(){

                    });
                },500)
              }
            }, false)
        },
        created() {
            var self = this;
            // console.log(self.$route.query);
            self.getGcoin();
            // self.getPopularity();
            // self.getComments();

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
</style>
