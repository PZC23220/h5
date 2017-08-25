<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">{{ranking_text.today}}</a>
                <a class="tabs" @click="changePages(1)">{{ranking_text.all}}</a>
                <span class="bgActive" style="width: 144px;margin-left: calc((100vw - 24px)* 1/4 - 72px);"></span>
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
                                 <img src="http://h2.groupy.vip/groupy_h5/crown_metal/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>1?rakingListToday[1].avatar:false}" v-lazy="rakingListToday.length>1?rakingListToday[1].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>1?rakingListToday[1].name:false}">{{rakingListToday.length>1?(rakingListToday[1].name?rakingListToday[1].name:'...'):'...'}}</p>
                             <span><img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>1?rakingListToday[1].score || rakingListToday[1].score==0:false}">{{Number(rakingListToday.length>1?(rakingListToday[1].score?rakingListToday[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="http://h2.groupy.vip/groupy_h5/crown_metal/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>0?rakingListToday[0].avatar:false}" v-lazy="rakingListToday.length>0?rakingListToday[0].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>0?rakingListToday[0].name:false}">{{rakingListToday.length>0?(rakingListToday[0].name?rakingListToday[0].name:'...'):'...'}}</p>
                             <span><img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>0?rakingListToday[0].score || rakingListToday[0].score==0:false}">{{Number(rakingListToday.length>0?(rakingListToday[0].score?rakingListToday[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="http://h3.groupy.vip/groupy_h5/crown_metal/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>2?(rakingListToday[2].avatar?rakingListToday[2].avatar:'/img/default_img.png'):false}" v-lazy="rakingListToday.length>2?rakingListToday[2].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>2?rakingListToday[2].name:false}">{{rakingListToday.length>2?(rakingListToday[2].name?rakingListToday[2].name:'...'):'...'}}</p>
                             <span><img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>2?rakingListToday[2].score || rakingListToday[2].score==0:false}">{{Number(rakingListToday.length>2?(rakingListToday[2].score?rakingListToday[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                        <!-- <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[3].position:'4'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[3].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[3].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[3].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[3].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[3].score || rakingListToday.rankingList[3].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[3].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[4].position:'5'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[4].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[4].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[4].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[4].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[4].score || rakingListToday.rankingList[4].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[4].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[5].position:'6'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[5].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[5].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[5].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[5].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[5].score || rakingListToday.rankingList[5].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[5].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[6].position:'7'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[6].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[6].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[6].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[6].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[6].score || rakingListToday.rankingList[6].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[6].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[7].position:'8'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[7].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[7].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[7].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[7].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[7].score || rakingListToday.rankingList[7].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[7].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[8].position:'9'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[8].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[8].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[8].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[8].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[8].score || rakingListToday.rankingList[8].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[8].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingListToday.rankingList[9].position:'10'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[9].avatar:false}" :src="rakingListToday.rankingList?rakingListToday.rankingList[9].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[9].name:false}">{{rakingListToday.rankingList?rakingListToday.rankingList[9].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[9].score || rakingListToday.rankingList[9].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingListToday.rankingList?rakingListToday.rankingList[9].score:'').toLocaleString()}}
                            </i>
                        </li> -->
                        <li v-for="(idol,key) in rakingListToday" v-if="key > 2">
                            <span>{{idol.position?idol.position:'0'}}</span>
                            <img class="avatar" v-lazy="idol.avatar" alt="">
                            <span>{{idol.name?idol.name:'...'}}</span>
                            <i>
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(idol.score?idol.score:'0').toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="top3NoneToday">
                        <img src="http://h4.groupy.vip/groupy_h5/default_img/default_no message.png" alt="">
                        <p>还没有爱豆的排名</p>
                    </div>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="top3" v-show="top3None == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="http://h2.groupy.vip/groupy_h5/crown_metal/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>1?rakingList[1].avatar:false}" v-lazy="rakingList.length>1?rakingList[1].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>1?rakingList[1].name:false}">{{rakingList.length>1?(rakingList[1].name?rakingList[1].name:'...'):'...'}}</p>
                             <span><img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>1?rakingList[1].score || rakingList[1].score==0:false}">{{Number(rakingList.length>1?(rakingList[1].score?rakingList[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="http://h2.groupy.vip/groupy_h5/crown_metal/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>0?rakingList[0].avatar:false}" v-lazy="rakingList.length>0?rakingList[0].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>0?rakingList[0].name:false}">{{rakingList.length>0?(rakingList[0].name?rakingList[0].name:'...'):'...'}}</p>
                             <span><img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>0?rakingList[0].score || rakingList[0].score==0:false}">{{Number(rakingList.length>0?(rakingList[0].score?rakingList[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="http://h3.groupy.vip/groupy_h5/crown_metal/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>2?rakingList[2].avatar:false}" v-lazy="rakingList.length>2?rakingList[2].avatar:'http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>2?rakingList[2].name:false}">{{rakingList.length>2?(rakingList[2].name?rakingList[2].name:'...'):'...'}}</p>
                             <span><img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>2?rakingList[2].score || rakingList[2].score==0:false}">{{Number(rakingList.length>2?(rakingList[2].score?rakingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <ul class="comment_list">
                       <!--  <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[3].position:'4'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[3].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[3].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[3].name:false}">{{rakingList.rankingList?rakingList.rankingList[3].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[3].score || rakingList.rankingList[3].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[3].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[4].position:'5'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[4].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[4].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[4].name:false}">{{rakingList.rankingList?rakingList.rankingList[4].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[4].score || rakingList.rankingList[4].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[4].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[5].position:'6'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[5].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[5].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[5].name:false}">{{rakingList.rankingList?rakingList.rankingList[5].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[5].score || rakingList.rankingList[5].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[5].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[6].position:'7'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[6].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[6].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[6].name:false}">{{rakingList.rankingList?rakingList.rankingList[6].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[6].score || rakingList.rankingList[6].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[6].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[7].position:'8'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[7].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[7].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[7].name:false}">{{rakingList.rankingList?rakingList.rankingList[7].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[7].score || rakingList.rankingList[7].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[7].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[8].position:'9'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[8].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[8].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[8].name:false}">{{rakingList.rankingList?rakingList.rankingList[8].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[8].score || rakingList.rankingList[8].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[8].score:'').toLocaleString()}}
                            </i>
                        </li>
                        <li>
                            <span>{{rakingListToday.rankingList?rakingList.rankingList[9].position:'10'}}</span>
                            <img class="avatar con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[9].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[9].avatar:'/static/images/default_img.png'" alt="">
                            <span class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[9].name:false}">{{rakingList.rankingList?rakingList.rankingList[9].name:'...'}}</span>
                            <i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[9].score || rakingList.rankingList[9].score==0:false}">
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(rakingList.rankingList?rakingList.rankingList[9].score:'').toLocaleString()}}
                            </i>
                        </li> -->
                        <li v-for="(idol,key) in rakingList" v-if="key > 2">
                            <span>{{idol.position}}</span>
                            <img class="avatar" v-lazy="idol.avatar" alt="">
                            <span>{{idol.name?idol.name:'...'}}</span>
                            <i>
                                <img src="http://h4.groupy.vip/groupy_h5/icon/timeline_icon_likes.png" alt="">{{Number(idol.score?idol.score:'0').toLocaleString()}}
                            </i>
                        </li>
                    </ul>
                    <div class="default_page" v-show="top3None">
                        <img src="http://h4.groupy.vip/groupy_h5/default_img/default_no message.png" alt="">
                        <p>还没有爱豆的排名</p>
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
                  iOSEdgeSwipeDetection : true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  noneAvatar: 'http://h5.groupy.vip/img/default_img.png',
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    $('.bgActive').css('left','calc((100vw - 24px)* '+ (swiper.activeIndex) +'/2)');
                  },
                },
                rakingList: [],
                rakingListme: [],
                rakingListToday: [],
                rakingListTodayme: [],
                top3None: false,
                top3NoneToday: false,
                // loadingBig: true,
                idx: 0,
                ranking_text: {
                    today: '今日のランキング',
                    all: '総合ランキング'
                }
            }
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active');
            $('.bgActive').css('left','calc((100vw - 24px)* '+ (val) +'/2)');
            this.swiper.slideTo(val, 500, false)
          },
          formatTime(key) {
              let timer = new Date(key*1000);
              return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
          },
          getRanking(val,token) {
            let self = this;
            if(self.idx < 4) {
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/ranking/idols',{
                    params: {
                        filter: val
                    }
                }).then(function(res){
                    // self.loadingBig = false;
                    if(res.status == 200) {
                        if(val == 'all') {
                            if(!res.data.rankingList) {
                              self.top3None = true;   
                            }else {

                                self.rakingList = res.data.rankingList;
                            }
                        }else {
                            if(res.data.rankingList) {
                                self.rakingListToday = res.data.rankingList;
                            }else {
                                self.top3NoneToday = true;
                            }
                        }
                        
                        console.log(self.rakingList)
                        console.log(self.rakingListToday)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRanking(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    self.idx++;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking(responseData.token);
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
                self.ranking_text = {
                    today: '今日排名',
                    all: '总排名'
                }
              } else {
                self.ranking_text = {
                    today: '今日のランキング',
                    all: '総合ランキング'
                }
              }
            self.getRanking('today');
            if(self.$route.query.type =='all') {
                self.swiperOption.initialSlide = 1;
            }
            self.getRanking('all');
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