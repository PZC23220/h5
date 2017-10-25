<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{ranking_text.today}}</a>
                <a class="tabs" @click="changePages(1)">{{ranking_text.week}}</a>
                <a class="tabs" @click="changePages(2)">{{ranking_text.month}}</a>
                <a class="tabs" @click="changePages(3)">{{ranking_text.all}}</a>
                <span class="bgActive" style="margin-left: calc((100vw - 24px)* 1/8 - 40px);"></span>
            </div>
        </div>
         <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                    <ul class="top3" v-show="top3NoneToday == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>1?rakingListToday[1].avatar:false}" v-lazy="rakingListToday.length>1?rakingListToday[1].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>1?rakingListToday[1].name:false}">{{rakingListToday.length>1?(rakingListToday[1].name?rakingListToday[1].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>1?rakingListToday[1].score || rakingListToday[1].score==0:false}">{{Number(rakingListToday.length>1?(rakingListToday[1].score?rakingListToday[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>0?rakingListToday[0].avatar:false}" v-lazy="rakingListToday.length>0?rakingListToday[0].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>0?rakingListToday[0].name:false}">{{rakingListToday.length>0?(rakingListToday[0].name?rakingListToday[0].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>0?rakingListToday[0].score || rakingListToday[0].score==0:false}">{{Number(rakingListToday.length>0?(rakingListToday[0].score?rakingListToday[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>2?(rakingListToday[2].avatar?rakingListToday[2].avatar:'/img/default_img.png'):false}" v-lazy="rakingListToday.length>2?rakingListToday[2].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>2?rakingListToday[2].name:false}">{{rakingListToday.length>2?(rakingListToday[2].name?rakingListToday[2].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>2?rakingListToday[2].score || rakingListToday[2].score==0:false}">{{Number(rakingListToday.length>2?(rakingListToday[2].score?rakingListToday[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <li v-for="(idol,key) in rakingListToday" v-if="key > 2">
                            <span>{{idol.position?idol.position:'0'}}</span>
                            <img class="avatar" v-lazy="idol.avatar" alt="">
                            <span>{{idol.name?idol.name:'...'}}</span>
                            <i>
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{Number(idol.score?idol.score:'0').toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="top3NoneToday">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                        <p>ただ今集計中です</p>
                    </div>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="top3" v-show="top3NoneWeek == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListWeek.length>1?rakingListWeek[1].avatar:false}" v-lazy="rakingListWeek.length>1?rakingListWeek[1].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListWeek.length>1?rakingListWeek[1].name:false}">{{rakingListWeek.length>1?(rakingListWeek[1].name?rakingListWeek[1].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListWeek.length>1?rakingListWeek[1].score || rakingListWeek[1].score==0:false}">{{Number(rakingListWeek.length>1?(rakingListWeek[1].score?rakingListWeek[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListWeek.length>0?rakingListWeek[0].avatar:false}" v-lazy="rakingListWeek.length>0?rakingListWeek[0].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListWeek.length>0?rakingListWeek[0].name:false}">{{rakingListWeek.length>0?(rakingListWeek[0].name?rakingListWeek[0].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListWeek.length>0?rakingListWeek[0].score || rakingListWeek[0].score==0:false}">{{Number(rakingListWeek.length>0?(rakingListWeek[0].score?rakingListWeek[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListWeek.length>2?(rakingListWeek[2].avatar?rakingListWeek[2].avatar:'/img/default_img.png'):false}" v-lazy="rakingListWeek.length>2?rakingListWeek[2].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListWeek.length>2?rakingListWeek[2].name:false}">{{rakingListWeek.length>2?(rakingListWeek[2].name?rakingListWeek[2].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListWeek.length>2?rakingListWeek[2].score || rakingListWeek[2].score==0:false}">{{Number(rakingListWeek.length>2?(rakingListWeek[2].score?rakingListWeek[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <li v-for="(idol,key) in rakingListWeek" v-if="key > 2">
                            <span>{{idol.position?idol.position:'0'}}</span>
                            <img class="avatar" v-lazy="idol.avatar" alt="">
                            <span>{{idol.name?idol.name:'...'}}</span>
                            <i>
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{Number(idol.score?idol.score:'0').toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="top3NoneWeek">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                        <p>ただ今集計中です</p>
                    </div>
                </swiper-slide>
                <swiper-slide id="swiper1">
                    <ul class="top3" v-show="top3NoneMonth == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListMonth.length>1?rakingListMonth[1].avatar:false}" v-lazy="rakingListMonth.length>1?rakingListMonth[1].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListMonth.length>1?rakingListMonth[1].name:false}">{{rakingListMonth.length>1?(rakingListMonth[1].name?rakingListMonth[1].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListMonth.length>1?rakingListMonth[1].score || rakingListMonth[1].score==0:false}">{{Number(rakingListMonth.length>1?(rakingListMonth[1].score?rakingListMonth[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListMonth.length>0?rakingListMonth[0].avatar:false}" v-lazy="rakingListMonth.length>0?rakingListMonth[0].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListMonth.length>0?rakingListMonth[0].name:false}">{{rakingListMonth.length>0?(rakingListMonth[0].name?rakingListMonth[0].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListMonth.length>0?rakingListMonth[0].score || rakingListMonth[0].score==0:false}">{{Number(rakingListMonth.length>0?(rakingListMonth[0].score?rakingListMonth[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListMonth.length>2?(rakingListMonth[2].avatar?rakingListMonth[2].avatar:'/img/default_img.png'):false}" v-lazy="rakingListMonth.length>2?rakingListMonth[2].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListMonth.length>2?rakingListMonth[2].name:false}">{{rakingListMonth.length>2?(rakingListMonth[2].name?rakingListMonth[2].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListMonth.length>2?rakingListMonth[2].score || rakingListMonth[2].score==0:false}">{{Number(rakingListMonth.length>2?(rakingListMonth[2].score?rakingListMonth[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <li v-for="(idol,key) in rakingListMonth" v-if="key > 2">
                            <span>{{idol.position?idol.position:'0'}}</span>
                            <img class="avatar" v-lazy="idol.avatar" alt="">
                            <span>{{idol.name?idol.name:'...'}}</span>
                            <i>
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{Number(idol.score?idol.score:'0').toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="top3NoneMonth">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                        <p>ただ今集計中です</p>
                    </div>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="top3" v-show="top3None == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>1?rakingList[1].avatar:false}" v-lazy="rakingList.length>1?rakingList[1].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>1?rakingList[1].name:false}">{{rakingList.length>1?(rakingList[1].name?rakingList[1].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>1?rakingList[1].score || rakingList[1].score==0:false}">{{Number(rakingList.length>1?(rakingList[1].score?rakingList[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>0?rakingList[0].avatar:false}" v-lazy="rakingList.length>0?rakingList[0].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>0?rakingList[0].name:false}">{{rakingList.length>0?(rakingList[0].name?rakingList[0].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>0?rakingList[0].score || rakingList[0].score==0:false}">{{Number(rakingList.length>0?(rakingList[0].score?rakingList[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>2?rakingList[2].avatar:false}" v-lazy="rakingList.length>2?rakingList[2].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>2?rakingList[2].name:false}">{{rakingList.length>2?(rakingList[2].name?rakingList[2].name:'...'):'...'}}</p>
                             <span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>2?rakingList[2].score || rakingList[2].score==0:false}">{{Number(rakingList.length>2?(rakingList[2].score?rakingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <li v-for="(idol,key) in rakingList" v-if="key > 2">
                            <span>{{idol.position}}</span>
                            <img class="avatar" v-lazy="idol.avatar" alt="">
                            <span>{{idol.name?idol.name:'...'}}</span>
                            <i>
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png" alt="">{{Number(idol.score?idol.score:'0').toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="top3None">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                        <p>ただ今集計中です</p>
                    </div>
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
                  resistanceRatio : 0,
                  iOSEdgeSwipeDetection : true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    $('.bgActive').css('left',`calc((100vw - 24px)*1/4*${swiper.activeIndex})`);
                  },
                },
                rakingList: [],
                rakingListme: [],
                rakingListmeShow: false,
                rakingListToday: [],
                rakingListTodayme: [],
                rakingListTodaymeShow: false,
                rakingListWeek: [],
                rakingListWeekme: [],
                rakingListWeekmeShow: false,
                rakingListMonth: [],
                rakingListMonthme: [],
                rakingListMonthmeShow: false,
                isShow: false,
                tottleImg: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/arrow/icon_arrow_gray_down.png',
                tokens: '',
                // loadingBig: true,
                top3None: false,
                top3NoneToday: false,
                top3NoneWeek: false,
                top3NoneMonth: false,
                idx: 0
            }
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active');
            $('.bgActive').css('left',`calc((100vw - 24px)*1/4*${val})`);
            this.swiper.slideTo(val, 500, false)
          },
          formatTime(key) {
              let timer = new Date(key*1000 - 1*60*60*1000);
              return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
          },
          getRanking(val,token) {
                let self = this;
                if(self.idx < 4) {
                    self.idx++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                        self.tokens = token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('ranking/idols',{
                        params: {
                            filter: val
                        }
                    }).then(function(res){
                        if(res.status == 200) {
                            // self.loadingBig = false;
                            if(val == 'all') {
                                if(!res.data.rankingList) {
                                  self.top3None = true;   
                                }else {

                                    self.rakingList = res.data.rankingList;
                                }
                                if(res.data.me) {
                                    self.rakingListme = res.data.me;
                                }
                                self.rakingListmeShow = true;
                            }else if(val == 'today') {
                                if(res.data.rankingList) {
                                    self.rakingListToday = res.data.rankingList;
                                }else {
                                    self.top3NoneToday = true;
                                }
                                if(res.data.me) {
                                    self.rakingListTodayme = res.data.me;
                                }
                                self.rakingListTodaymeShow = true;
                            }else if(val == 'week') {
                                if(res.data.rankingList) {
                                    self.rakingListWeek = res.data.rankingList;
                                }else {
                                    self.top3NoneWeek = true;
                                }
                                if(res.data.me) {
                                    self.rakingListWeekme = res.data.me;
                                }
                                self.rakingListWeekmeShow = true;
                            }else if(val =='month') {
                                if(res.data.rankingList) {
                                    self.rakingListMonth = res.data.rankingList;
                                }else {
                                    self.top3NoneMonth = true;
                                }
                                if(res.data.me) {
                                    self.rakingListMonthme = res.data.me;
                                }
                                self.rakingListMonthmeShow = true;
                            }
                            console.log(self.rakingListMonth)
                            console.log(self.rakingListMonthme)
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                    self.getRanking(responseData.token);
                                })
                            })
                        }
                    }).catch(function(err){
                        console.log(err);
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRanking(responseData.token);
                            })
                        })
                    });
                }else {
                    self.top3None = true;
                    // self.loadingBig = false;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                    })
                }
            },
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
                self.ranking_text = {
                    today: '今日',
                    week: '本周',
                    month: '本月',
                    all: '总榜'
                }
              } else {
                self.ranking_text = {
                    today: '本日',
                    week: '今週',
                    month: '今月',
                    all: '総合'
                }
              }
            self.getRanking('today');
            console.log(self.$route.query.type)
            if(self.$route.query.type =='all') {
                self.swiperOption.initialSlide = 3;
            }else if(self.$route.query.type =='Week') {
                self.swiperOption.initialSlide = 1;
            }else if(self.$route.query.type =='Month') {
                self.swiperOption.initialSlide = 2;
            }else {
                self.swiperOption.initialSlide = 0;
            }
            self.getRanking('all');
            self.getRanking('week');
            self.getRanking('month');
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
                color: #666;
                max-width: 53%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        li:first-child {
            border-top: 1px solid #EBEBEB;
        }
    }
    .con_left {
        opacity: 0.2;
        transition: opacity 0.3s;
     }
    .left_show {
        opacity: 1;
    }
</style>