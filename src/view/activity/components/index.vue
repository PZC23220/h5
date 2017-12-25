<template>
    <div class="main">
        <div class="content">
            <ul class="idol_activity">
                <v-scroll :on-refresh="refresh" :on-infinite="infinite">
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
                        <div class="activity_content" @click.stop="toVideoList(shows.id,shows.tag)">
                            <img :src="shows.img" class="activity_banner" alt="">
                            <p v-if="(shows.goal && (shows.state == 'inProgress'))" class="activity_purpose">目标：{{shows.goal}}</p>
                            <p v-if="(shows.goal && (shows.state == 'comingSoon'))" class="activity_begin">{{formatTime(shows.startTime)}} 开始</p>
                            <p v-if="(shows.goal && (shows.state == 'comingSoon'))" class="activity_purpose activity_beigin_purpose">目标：{{shows.goal}}</p>
                            <div class="idol_list">
                                <div class="idols_desc" v-for="(idol,key) in shows.rankingList">
                                    <div class="avatar_content">
                                        <img @click.stop="idol.idol_id?showIdolPage(idol.idol_id):false" :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/ranking_'+ (key+1) +'.png'">
                                        <span class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                                    </div>
                                    <div class="idol_name">{{idol.nickname}}</div>
                                    <div class="likes_content"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><i>{{idol.popularity?Number(idol.popularity).toLocaleString():0}}</i></div> 
                                </div>
                            </div>
                        </div>
                        <img v-if="shows.state == 'inProgress'" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_hold.png" class="activity_status" alt="">
                        <img v-if="shows.state == 'comingSoon'" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_advance.png" class="activity_status" alt="">
                        <img v-if="shows.state == 'ended'" src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_finish.png" class="activity_status" alt="">
                        <span class="activity_status_tips">{{formatStatus(shows.state)}}</span>
                    </li>
                    <div class="default_page" v-show="showsList.length == 0 && isLoading">
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_noactivity.png" alt="">
                        <p v-html="showstext.none"></p>
                    </div>
                </v-scroll>
            </ul>
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
                start: '開場',
                shows: '開演',
                none: '还没有参加爱豆的活动哦',
                over: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_concert_end.png'
            },
            host_: 'http://h5.groupy.vip/shows_detail/index.html'
          }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            toVideoList(id,tag) {
                console.log(id)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('activity_videos', {'activityId':id,'activityName':tag})
                })
              },
            showIdolPage(val) {
                console.log(val)
                window.setupWebViewJavascriptBridge(function(bridge) {
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
                                return "进行中";  
                                break;  
                        case 'comingSoon' :  
                                return "预告";  
                                break;  
                        case 'ended' :  
                                return "已结束";  
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
                      setTimeout(() => {
                        done(true)
                      }, 500)
                      return;
                    } else {
                        setTimeout(() => {
                          self.offset += 10;
                          self.getInfo();
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
        created() {
            let self = this;
            self.getInfo();
            self.host_ = location.origin + '/shows_detail/index.html?token=' + getParams('token') + '&language=' + getParams('language') + '&showsId=';
             if(getParams('language') == 'cn') {
                self.showstext = {
                    start: '开场',
                    shows: '开演',
                    none: '还没有参加爱豆的活动哦',
                    over: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_concert_end_chn.png'
                }
            }else {
                self.showstext = {
                    start: '開場',
                    shows: '開演',
                    none: 'まだイベントを参加していません',
                    over: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_concert_end.png'
                }
            }

        }
      }
</script>