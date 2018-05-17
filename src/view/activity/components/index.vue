<template>
    <div class="main">
        <div class="content">
            <v-scroll :on-refresh="refresh" :on-infinite="infinite" :dataList="scrollData">
                <ul class="idol_activity">
                    <div class="page_defalt" :class="{'active': isLoading}">
                        <li class="activity_li">
                            <p class="activity_name"></p>
                            <p class="activity_info"></p>
                        </li>
                        <li class="activity_li">
                            <p class="activity_name"></p>
                            <p class="activity_info"></p>
                        </li>
                        <li class="activity_li">
                            <p class="activity_name"></p>
                            <p class="activity_info"></p>
                        </li>
                        <li class="activity_li">
                            <p class="activity_name"></p>
                            <p class="activity_info"></p>
                        </li>
                    </div>
                    <li class="activity_li" v-for="shows in showsList">
                        <div class="activity_content" @click.stop="toVideoList(shows.id,shows.title,shows.state,shows.actionInfo)">
                            <img :src="shows.img" class="activity_banner" alt="">
                            <p v-if="(shows.goal && (shows.state == 'inProgress' || shows.state == 'ended'))" class="activity_purpose">{{showstext.purpose}}：{{shows.goal}}</p>
                            <p v-if="(shows.goal && (shows.state == 'comingSoon'))" class="activity_begin">{{formatTime(shows.startTime)}} {{showstext.begin}}</p>
                            <p v-if="(shows.goal && (shows.state == 'comingSoon'))" class="activity_purpose activity_beigin_purpose">{{showstext.purpose}}：{{shows.goal}}</p>
                            <div class="allRaning-list" v-if="(shows.rankingType == 2) && (shows.id != 1015)">
                                <!-- <div class="idols_desc" v-for="(idol,key) in shows.rankingList" v-if="key < 3">
                                    <div class="avatar_content">
                                        <img :src="'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/ranking_'+ (key+1) +'.png'">
                                        <span @click.stop="!idol.orgId?(idol.idolId?showIdolPage(idol.idolId):false):false" class="avatar"><img v-lazy="idol.orgLogo?idol.orgLogo:idol.avatar" alt=""></span>
                                    </div>
                                    <div class="idol_name">{{idol.orgName?'@' + idol.orgName:idol.nickname}}</div>
                                    <div class="likes_content"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{idol.popularity?Number(idol.popularity).toLocaleString():0}}</i></div>
                                </div> -->
                                <div class="idol-content" v-if="shows.rankingList.length > 1"  @click.stop="!shows.rankingList[1].orgId?(shows.rankingList[1].idolId?showIdolPage(shows.rankingList[1].idolId):false):false">
                                    <div class="avatar-content">
                                         <span :style="shows.rankingList[1].orgLogo?'background-image:url('+ shows.rankingList[1].orgLogo +');':'background-image:url('+ shows.rankingList[1].avatar +');'" @click.stop="!shows.rankingList[1].orgId?(shows.rankingList[1].idolId?showIdolPage(shows.rankingList[1].idolId):false):false" class="avatar"></span>
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" alt="">
                                        <span class="ranking1 ranking2">No.2</span>
                                    </div>
                                     <div class="introduction">
                                        <p class="name">{{shows.rankingList[1].orgName?'@' + shows.rankingList[1].orgName:shows.rankingList[1].nickname}}</p>
                                        <p class="detail" :class="{'none':!shows.rankingList[1].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{shows.rankingList[1].popularity?Number(shows.rankingList[1].popularity).toLocaleString():'0'}}</em></p>
                                    </div>
                                </div>
                                <div class="idol-content idol-content-1" v-if="shows.rankingList.length > 0" @click.stop="!shows.rankingList[0].orgId?(shows.rankingList[0].idolId?showIdolPage(shows.rankingList[0].idolId):false):false">
                                    <div class="avatar-content">
                                        <span :style="shows.rankingList[0].orgLogo?'background-image:url('+ shows.rankingList[0].orgLogo +');':'background-image:url('+ shows.rankingList[0].avatar +');'" @click.stop="!shows.rankingList[0].orgId?(shows.rankingList[0].idolId?showIdolPage(shows.rankingList[0].idolId):false):false" class="avatar"></span>
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" alt="">
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" alt="">
                                    </div>
                                     <div class="introduction">
                                        <p class="name">{{shows.rankingList[0].orgName?'@' + shows.rankingList[0].orgName:shows.rankingList[0].nickname}}</p>
                                        <p class="detail" :class="{'none':!shows.rankingList[0].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{shows.rankingList[0].popularity?Number(shows.rankingList[0].popularity).toLocaleString():'0'}}</em></p>
                                    </div>
                                </div>
                                <div class="idol-content" v-if="shows.rankingList.length > 2"  @click.stop="!shows.rankingList[2].orgId?(shows.rankingList[2].idolId?showIdolPage(shows.rankingList[2].idolId):false):false">
                                    <div class="avatar-content">
                                        <span :style="shows.rankingList[2].orgLogo?'background-image:url('+ shows.rankingList[2].orgLogo +');':'background-image:url('+ shows.rankingList[2].avatar +');'" @click.stop="!shows.rankingList[2].orgId?(shows.rankingList[2].idolId?showIdolPage(shows.rankingList[2].idolId):false):false" class="avatar"></span>
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" alt="">
                                        <span class="ranking1 ranking2">No.3</span>
                                    </div>
                                     <div class="introduction">
                                        <p class="name">{{shows.rankingList[2].orgName?'@' + shows.rankingList[2].orgName:shows.rankingList[2].nickname}}</p>
                                        <p class="detail" :class="{'none':!shows.rankingList[2].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{shows.rankingList[2].popularity?Number(shows.rankingList[2].popularity).toLocaleString():'0'}}</em></p>
                                    </div>
                                </div>
                            </div>
                            <div class="allRaning-list" v-if="(shows.rankingType == 1) && (shows.id != 1015)">
                                <!-- <div class="idols_desc" v-for="(idol,key) in shows.rankingList" v-if="key < 3">
                                    <div class="avatar_content">
                                        <img :src="'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/ranking_'+ (key+1) +'.png'">
                                        <span @click.stop="idol.idol_id?showIdolPage(idol.idol_id):false" class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                                    </div>
                                    <div class="idol_name">{{idol.nickname}}</div>
                                    <div class="likes_content"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{idol.popularity?Number(idol.popularity).toLocaleString():0}}</i></div>
                                </div> -->
                                <div class="idol-content" v-if="shows.rankingList.length > 1"  @click.stop="!shows.rankingList[1].orgId?(shows.rankingList[1].idolId?showIdolPage(shows.rankingList[1].idolId):false):false">
                                    <div class="avatar-content">
                                        <span class="avatar" :style="shows.rankingList[1].avatar?'background-image:url('+ shows.rankingList[1].avatar +');':''"></span>
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_2.png" class="crown" alt="">
                                        <span class="ranking1 ranking2">No.2</span>
                                    </div>
                                     <div class="introduction">
                                        <p class="name">{{shows.rankingList[1].nickname?shows.rankingList[1].nickname:'...'}}</p>
                                        <p class="detail" :class="{'none':!shows.rankingList[1].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{shows.rankingList[1].popularity?Number(shows.rankingList[1].popularity).toLocaleString():'0'}}</em></p>
                                    </div>
                                </div>
                                <div class="idol-content idol-content-1" v-if="shows.rankingList.length > 0" @click.stop="!shows.rankingList[0].orgId?(shows.rankingList[0].idolId?showIdolPage(shows.rankingList[0].idolId):false):false">
                                    <div class="avatar-content">
                                        <span class="avatar" :style="shows.rankingList[0].avatar?'background-image:url('+ shows.rankingList[0].avatar +');':''"></span>
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_1.png" class="crown" alt="">
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/pic_ranking_1.png" class="ranking1" alt="">
                                    </div>
                                     <div class="introduction">
                                        <p class="name">{{shows.rankingList[0].nickname?shows.rankingList[0].nickname:'...'}}</p>
                                        <p class="detail" :class="{'none':!shows.rankingList[0].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{shows.rankingList[0].popularity?Number(shows.rankingList[0].popularity).toLocaleString():'0'}}</em></p>
                                    </div>
                                </div>
                                <div class="idol-content" v-if="shows.rankingList.length > 2"  @click.stop="!shows.rankingList[2].orgId?(shows.rankingList[2].idolId?showIdolPage(shows.rankingList[2].idolId):false):false">
                                    <div class="avatar-content">
                                        <span class="avatar" :style="shows.rankingList[2].avatar?'background-image:url('+ shows.rankingList[2].avatar +');':''"></span>
                                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_ranking_3.png" class="crown" alt="">
                                        <span class="ranking1 ranking2">No.3</span>
                                    </div>
                                     <div class="introduction">
                                        <p class="name">{{shows.rankingList[2].nickname?shows.rankingList[2].nickname:'...'}}</p>
                                        <p class="detail" :class="{'none':!shows.rankingList[2].organization}"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_likes.png" alt=""><em>{{shows.rankingList[2].popularity?Number(shows.rankingList[2].popularity).toLocaleString():'0'}}</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img v-if="shows.state == 'inProgress'" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_hold.png" class="activity_status" alt="">
                        <img v-if="shows.state == 'comingSoon'" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_advance.png" class="activity_status" alt="">
                        <img v-if="shows.state == 'ended'" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_finish.png" class="activity_status" alt="">
                        <span class="activity_status_tips">{{formatStatus(shows.state)}}</span>
                    </li>
                    <div class="default_page" v-show="showsList.length == 0 && isLoading">
                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_noactivity.png" alt="">
                        <p v-html="showstext.none"></p>
                    </div>
                </ul>
            </v-scroll>
        </div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    import Scroll from '../../../components/scroll.vue';
    export default {
        data() {
          return {
            token_: '',
            showsList: [],
            isLoading: false,
            havedlast: false,
            idx: 0,
            offset: 0,
            showstext: {
                begin: '開催',
                purpose: '対象',
                none: 'まだイベントがありません'
            },
            scrollData:{
              noFlag: false //暂无更多数据显示
            },
          }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            toVideoList(id,title,state,actionInfo) {
                if(state == 'comingSoon') {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('umeng',{'event_key':'eventlist_enter_event'});
                        bridge.callHandler('open_h5', {'url':actionInfo,'title':title})
                    })
                }else {
                    console.log(id)
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('umeng',{'event_key':'eventlist_enter_event'});
                        bridge.callHandler('activity_videos', {'activityId':id,'activityName':title})
                    })
                }
              },
            showIdolPage(val) {
                console.log(val)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('umeng',{'event_key':'eventlist_enter_idol'});
                    bridge.callHandler('showIdolPage', {'idolId': val})
                })
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('yyyy年MM月dd日') + ' ' + timer.Format('hh:mm');
            },
            formatStatus(key) {
                if(getParams('language') == 'cn') {
                    switch (key) {
                        case 'inProgress' :
                                return "进行中";
                                break;
                        case 'comingSoon' :
                                return "预告";
                                break;
                        case 'ended' :
                                return "已结束";
                                break;
                    }
                }else {
                    switch (key) {
                        case 'inProgress' :
                                return "開催中";
                                break;
                        case 'comingSoon' :
                                return "予告";
                                break;
                        case 'ended' :
                                return "終了";
                                break;
                    }
                }
                return  str;
            },
            getInfo() {
                let self = this;
                if(self.idx < 2) {
                    http.get('/activities/all',{
                        params: {
                            offset: self.offset
                        }
                    })
                    .then(function(res){
                        console.log(res)
                        self.isLoading = true;
                        if(res.data.length > 0 ) {
                            for(var i=0;i<res.data.length;i++){
                                self.showsList.push(res.data[i]);
                            }
                            self.havedlast = false;
                        }else {
                            self.havedlast = true;
                            self.scrollData.noFlag = true;
                            self.$el.querySelector('.load-more').style.display = 'none';
                        }
                    }).catch(function(err){
                        self.idx++;
                        self.getInfo();
                    })
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                         if(getParams('language') == 'cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                         }
                    })
                }
            },
            refresh (done) {
                var self = this;
                http.get('/activities/all',{
                    params: {
                        offset: 0
                    }
                }).then(function(res){
                    self.offset = 0;
                    self.havedlast = false;
                    self.showsList = res.data;
                }).catch(function(){
                    self.showsList = [];
                });
                setTimeout(() => {
                    done(true);
                }, 500)
            },
            infinite (done) {
                var self = this;
                if(self.showsList.length>0) {
                   if (self.havedlast) {
                      self.scrollData.noFlag = true;
                    } else {
                      self.offset += 10;
                      self.getInfo();
                    }
                }else {
                 self.scrollData.noFlag = true;
                }
                this.$el.querySelector('.load-more').style.display = 'none';
                done();
            }
        },
        created() {
            let self = this;
            self.getInfo();
             if(getParams('language') == 'cn') {
                self.showstext = {
                    begin: '开始',
                    purpose: '目标',
                    none: '还没有活动'
                }
            }else {
                self.showstext = {
                    begin: '開催',
                    purpose: '対象',
                    none: 'まだイベントがありません'
                }
            }

        }
      }
</script>
