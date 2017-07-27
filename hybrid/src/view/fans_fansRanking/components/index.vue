<template>
    <div class="main">
        <div class="header">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{fans_text.Gcoin}}</a>
                <a class="tabs" @click="changePages(1)">{{fans_text.like}}</a>
            </div>
        </div>
         <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                    <scroller ref="my_scroller" class="my-scroller"
                          :on-refresh="refresh"
                          :on-infinite="infinite"
                          :noDataText="rakingList.length == 0 ? '':'全て表示されました'">
                         <ul class="comment_list" v-if="default1==false">
                            <h3 class="ranking_type"  :class="{'left_hide':!meObj.position}">{{fans_text.me}}</h3>
                            <li class="con_left" :class="{'left_show':meObj.position}" v-if="meObj.position">
                                <span v-if="!meObj.position">0</span>
                                <span v-if="meObj.position==1"><img src="/img/fans_fansRanking/icon_metal_1.png" alt=""></span>
                                <span v-if="meObj.position==2"><img src="/img/fans_fansRanking/icon_metal_2.png" alt=""></span>
                                <span v-if="meObj.position==3"><img src="/img/fans_fansRanking/icon_metal_3.png" alt=""></span>
                                <span v-if="meObj.position>3">{{meObj.position?meObj.position:'0'}}</span>
                                <img :src="meObj.fans?meObj.fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{meObj.fans?(meObj.fans.nickname?meObj.fans.nickname:'...'):'...'}}</em>
                                        <!-- <img :src="meObj.fans?('/static/images/icon_level_'+ (meObj.fans.levelPlatform) +'.png'): '/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{meObj.fans?(meObj.fans.levelPlatform?meObj.fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(meObj.fans.medal)+'.png'" v-if="meObj.fans.medal&&meObj.fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_coins.png" alt="">{{meObj.expendGprice?Number(meObj.expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <h3 class="ranking_type">{{fans_text.all}}</h3>
                            <div class="con_left" :class="{'left_hide':rakingList.length>0}">
                                <li>
                                    <span><img src="/img/fans_fansRanking/icon_metal_1.png" alt=""></span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="/img/fans_fansRanking/icon_metal_2.png" alt=""></span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="/img/fans_fansRanking/icon_metal_3.png" alt=""></span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>4</span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>5</span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span>5</span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                            </div>
                            <li v-if="rakingList.length>0">
                                <span><img src="/img/fans_fansRanking/icon_metal_1.png" alt=""></span>
                                <img :src="rakingList.length>0?rakingList[0].fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{rakingList.length>0?rakingList[0].fans.nickname:'...'}}</em>
                                        <!-- <img :src="rakingList.length>0?('/static/images/icon_level_'+ (rakingList[0].fans.levelPlatform) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{rakingList.length>0?(rakingList[0].fans.levelPlatform?rakingList[0].fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(rakingList[0].fans.medal)+'.png'" v-if="rakingList[0].fans.medal&&rakingList[0].fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_coins.png" alt="">{{rakingList.length>0?Number(rakingList[0].expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <li v-if="rakingList.length>1">
                                <span><img src="/img/fans_fansRanking/icon_metal_2.png" alt=""></span>
                                <img :src="rakingList.length>1?rakingList[1].fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{rakingList.length>1?rakingList[1].fans.nickname:'...'}}</em>
                                        <!-- <img :src="rakingList.length>1?('/static/images/icon_level_'+ (rakingList[1].fans.levelPlatform+1) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{rakingList.length>1?(rakingList[1].fans.levelPlatform?rakingList[1].fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(rakingList[1].fans.medal)+'.png'" v-if="rakingList[1].fans.medal&&rakingList[1].fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_coins.png" alt="">{{rakingList.length>1?Number(rakingList[1].expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <li v-if="rakingList.length>2">
                                <span><img src="/img/fans_fansRanking/icon_metal_3.png" alt=""></span>
                                <img :src="rakingList.length>2?rakingList[2].fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{rakingList.length>2?rakingList[2].fans.nickname:'...'}}</em>
                                        <!-- <img :src="rakingList.length>2?('/static/images/icon_level_'+ (rakingList[2].fans.levelPlatform+2) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{rakingList.length>2?(rakingList[2].fans.levelPlatform?rakingList[2].fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(rakingList[2].fans.medal)+'.png'" v-if="rakingList[2].fans.medal&&rakingList[2].fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_coins.png" alt="">{{rakingList.length>2?Number(rakingList[2].expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <li v-for="(idol,key) in rakingList" v-if="key > 2 && key < len">
                                <span>{{key+1}}</span>
                                <img :src="idol.fans?idol.fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{idol.fans?idol.fans.nickname:'...'}}</em>
                                        <!-- <img :src="idol.fans?('/static/images/icon_level_'+ (idol.fans.levelPlatform+1) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{idol.fans?(ridol.fans.levelPlatform?ridol.fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(ridol.fans.medal)+'.png'" v-if="ridol.fans.medal&&ridol.fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_coins.png" alt="">{{idol.expendGprice?Number(idol.expendGprice).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                        </ul>
                        <div class="default_page default_page3"  v-if="default1">
                            <img src="/img/default_no coin.png" alt="">
                            <p v-html="fans_text.noneGcoin"></p>
                        </div>
                    </scroller>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <scroller ref="my_scroller" class="my-scroller"
                          :on-refresh="refresh2"
                          :on-infinite="infinite2"
                          :noDataText="rankingHeat.length == 0 ? '':'全て表示されました'">
                        <ul class="comment_list" v-if="default2==false">
                            <h3 class="ranking_type" v-if="meHeatObj.position">{{fans_text.me}}</h3>
                            <li class="con_left" :class="{'left_show':meHeatObj.position}" v-if="meHeatObj.position">
                                <span v-if="!meHeatObj.position">0</span>
                                <span v-if="meHeatObj.position==1"><img src="/img/fans_fansRanking/icon_metal_1.png" alt=""></span>
                                <span v-if="meHeatObj.position==2"><img src="/img/fans_fansRanking/icon_metal_2.png" alt=""></span>
                                <span v-if="meHeatObj.position==3"><img src="/img/fans_fansRanking/icon_metal_3.png" alt=""></span>
                                <span v-if="meHeatObj.position>3">{{meHeatObj.position}}</span>
                                <img :src="meHeatObj.fans?meHeatObj.fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span><em>{{meHeatObj.fans?meHeatObj.fans.nickname:'...'}}</em><img :src="meHeatObj.fans?('/img/icon_level_'+ (meHeatObj.fans.levelPlatform) +'.png'): ''" class="level" alt=""></span>
                                    <span><img src="/img/timeline_icon_likes.png" alt="">{{meHeatObj.totalNums?Number(meHeatObj.totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <h3 class="ranking_type">{{fans_text.all}}</h3>
                            <div class="con_left" :class="{'left_hide':rankingHeat.length>0}">
                                <li>
                                    <span><img src="/img/fans_fansRanking/icon_metal_1.png" alt=""></span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="/img/fans_fansRanking/icon_metal_2.png" alt=""></span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                                <li>
                                   <span><img src="/img/fans_fansRanking/icon_metal_3.png" alt=""></span>
                                    <img src="/img/default_img.png"alt="" class="avatar">
                                    <div class="fans_content">
                                        <span><em>...</em></span>
                                        <span><img src="/img/timeline_icon_coins.png" alt="">0</span>
                                    </div>
                                </li>
                            </div>
                            <li v-if="rankingHeat.length>0">
                                <span><img src="/img/fans_fansRanking/icon_metal_1.png" alt=""></span>
                                <img :src="rankingHeat.length>0?(rankingHeat[0].fans.avatar?rankingHeat[0].fans.avatar:'/img/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{rankingHeat.length>0?(rankingHeat[0].fans.nickname?rankingHeat[0].fans.nickname:'...'):'...'}}</em>
                                        <!-- <img :src="rankingHeat.length>0?('/static/images/icon_level_'+ (rankingHeat[0].fans.levelPlatform) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{rankingHeat.length>0?(rankingHeat[0].fans.levelPlatform?rankingHeat[0].fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(rankingHeat[0].fans.medal)+'.png'" v-if="rankingHeat[0].fans.medal&&rankingHeat[0].fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_likes.png" alt="">{{rankingHeat.length>0?Number(rankingHeat[0].totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <li v-if="rankingHeat.length>1">
                                <span><img src="/img/fans_fansRanking/icon_metal_2.png" alt=""></span>
                                <img :src="rankingHeat.length>1?rankingHeat[1].fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{rankingHeat.length>1?rankingHeat[1].fans.nickname:'...'}}</em>
                                        <!-- <img :src="rankingHeat.length>1?('/static/images/icon_level_'+ (rankingHeat[1].fans.levelPlatform) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{rankingHeat.length>1?(rankingHeat[1].fans.levelPlatform?rankingHeat[1].fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(rankingHeat[1].fans.medal)+'.png'" v-if="rankingHeat[1].fans.medal&&rankingHeat[1].fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_likes.png" alt="">{{rankingHeat.length>1?Number(rankingHeat[1].totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <li v-if="rankingHeat.length>2">
                                <span><img src="/img/fans_fansRanking/icon_metal_3.png" alt=""></span>
                                <img :src="rankingHeat.length>2?rankingHeat[2].fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{rankingHeat.length>2?rankingHeat[2].fans.nickname:'...'}}</em>
                                        <!-- <img :src="rankingHeat.length>2?('/static/images/icon_level_'+ (rankingHeat[2].fans.levelPlatform) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{rankingHeat.length>2?(rankingHeat[2].fans.levelPlatform?rankingHeat[2].fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(rankingHeat[2].fans.medal)+'.png'" v-if="rankingHeat[2].fans.medal&&rankingHeat[2].fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_likes.png" alt="">{{rankingHeat.length>2?Number(rankingHeat[2].totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                            <li v-for="(idol,key) in rankingHeat" v-if="key > 2 && key < len2">
                                <span>{{key+1}}</span>
                                <img :src="idol.fans?idol.fans.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="avatar">
                                <div class="fans_content">
                                    <span>
                                        <em>{{idol.fans?idol.fans.nickname:'...'}}</em>
                                        <!-- <img :src="idol.fans?('/static/images/icon_level_'+ (idol.fans.levelPlatform) +'.png'): 'http://h5.groupy.vip/static/images/icon_level_0.png'" onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" class="level" alt=""> -->
                                        <span class="level">Lv.{{idol.fans?(idol.fans.levelPlatform?idol.fans.levelPlatform:0):0}}</span>
                                        <img class="medal_level" :src="'/img/icon_medal_'+(idol.fans.medal)+'.png'" v-if="idol.fans.medal&&idol.fans.medal>0" alt="">
                                    </span>
                                    <span><img src="/img/timeline_icon_likes.png" alt="">{{idol.totalNums?Number(idol.totalNums).toLocaleString(): 0}}</span>
                                </div>
                                <!-- <i class="fans_medal"><img src="" alt="" class="avatar"><img src="" alt="" class="medal"></i> -->
                            </li>
                        </ul>
                        <div class="default_page default_page3"  v-if="default2">
                            <img src="/img/default_no like.png" alt="">
                            <p v-html="fans_text.noneLike"></p>
                        </div>
                    </scroller>
                </swiper-slide>
            </swiper>
         </div>
         <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import VueScroller from 'vue-scroller';
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
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                  },
                },
                rakingList: [],
                rankingHeat:[],
                meHeatObj: {},
                meObj: {},
                loadingBig: false,
                len: 20,
                len2: 20,
                default1: false,
                default2: false,
                fans_text: {
                    Gcoin: 'コイン',
                    like: 'Like',
                    me: '自分の順位',
                    all: '総合ランキング',
                    noneGcoin: 'まだコインはないようです',
                    noneLike: 'まだLikeはないようです',
                },
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
          getRanking(token) {
            let self = this;
            if(token) {
                http.defaults.headers.common['Authorization'] = 'Token '+token;
            }else {
                http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
            }
            http.get('/statistic/gb',{
                params: {
                    idolId: getParams('idolId')
                }
            }).then(function(res){
                if(res.status == 200) {
                    self.loadingBig = true;
                    if(res.data.fansList.length > 0) {
                        self.default1 = false;
                        self.rakingList = res.data.fansList;
                        for(var i=0;i<self.rakingList.length;i++) {
                            // console.log(self.rakingList[i].fansId == 160)
                            if(self.rakingList[i].fansId == 160) {
                                self.meObj = self.rakingList[i];
                                self.meObj.position = (i+1);
                                console.log(self.rakingList)
                                return;
                            }
                        }
                    }else {
                        self.default1 = true;
                    }
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking(responseData.token);
                        })
                    })
                }
            }).catch(function(err){
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                        self.getRanking(responseData.token);
                    })
                })
            });
          },
          getRankingHeat(token) {
            let self = this;
            if(token) {
                http.defaults.headers.common['Authorization'] = 'Token '+token;
            }else {
                http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
            }
            http.get('/statistic/heat',{
                params: {
                    idolId: getParams('idolId')
                }
            }).then(function(res){
                if(res.status == 200) {
                    if(res.data.fansList.length > 0) {
                        self.default2 = false;
                        self.rankingHeat = res.data.fansList;
                        for(var i=0;i<self.rankingHeat.length;i++) {
                            if(self.rankingHeat[i].fansId == 6) {
                                self.meHeatObj = self.rankingHeat[i];
                                self.meHeatObj.position = (i+1);
                                console.log(self.rankingHeat)
                                console.log(self.meHeatObj)
                                return;
                            }
                        }
                    }else {
                        self.default2 = true;
                    }
                }else {
                    WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking(responseData.token);
                        })
                    })
                }
            }).catch(function(err){
                WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                        self.getRanking(responseData.token);
                    })
                })
            });
          },
          refresh (done) {
            var self = this;
            setTimeout(() => {
              self.getRanking();
              done()
            }, 1500)
          },

          infinite (done) {
            var self = this;
            if(self.rakingList.rankingList) {
               if (self.rakingList.rankingList.length < self.len) {
                  setTimeout(() => {
                    done(true)
                  }, 1500)
                  return;
                } else {
                    setTimeout(() => {
                      self.len += 20;
                      done()
                    }, 1500)
                }
            }else {
              setTimeout(() => {
                done(true)
              }, 1500)
              return;
            }
          },
          refresh2 (done) {
            var self = this;
            setTimeout(() => {
              self.getRankingHeat();
              done()
            }, 1500)
          },

          infinite2 (done) {
            var self = this;
            if(self.rakingList.rankingList) {
               if (self.rakingList.rankingList.length < self.len) {
                  setTimeout(() => {
                    done(true)
                  }, 1500)
                  return;
                } else {
                    setTimeout(() => {
                      self.len2 += 20;
                      done()
                    }, 1500)
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
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 self.fans_text= {
                    Gcoin: 'G币贡献',
                    like: '人气贡献',
                    me: '我的排名',
                    all: '总排名',
                    noneGcoin: '还没有收到粉丝的G币',
                    noneLike: '还没有收到粉丝的点赞人气',
                    
                }
              } else {
                self.fans_text= {
                    Gcoin: 'コイン',
                    like: 'Like',
                    me: '自分の順位',
                    all: '総合ランキング',
                    noneGcoin: 'まだコインはないようです',
                    noneLike: 'まだLikeはないようです',
                }
              }
            self.getRanking();
            self.getRankingHeat();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ranking_type {
        padding: 0 12px;
        color: #999;       
    }
    .medal_level {
        margin-top: 3px;
    }
    .comment_list {
        padding: 0;
        color: #666;
        background: #fff;
        li {
            padding-left: 12px;
            padding-right: 12px;
            >span:first-child {
                font-size: 24px;
                color: #CCCCCC;
                margin-top: 3px;
                line-height: 33px;
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
        div:not(.con_left) {
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
                    margin-top: 2px;
                    margin-left: 5px;
                    float: left;
                }                    
            }
            span:nth-child(2) {
                img {
                    width: 14px;
                    vertical-align: middle;
                    margin-right: 6px;
                    float: left;
                    margin-top: 3px;
                }
            }
        }
        .fans_medal {
            margin: 0;
            height: auto;
            // width: 40px;
            position: relative;
            .medal {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 43px;
                height: 10px;
            }
        }
        .con_left {
            opacity: 0.2;
            height: auto;
            transition: all 0.3s;
         }
        .left_show {
            opacity: 1;
        }
        .left_hide {
            opacity: 0;
            height: 0;
            padding: 0;
            overflow: hidden;
        }
    }
</style>