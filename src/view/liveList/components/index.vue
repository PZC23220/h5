<template>
    <div class="main">
        <div class="content">
            <v-scroll :on-refresh="refresh" :on-infinite="infinite">
                <ul class="live_ul">
                    <div class="page_defalt" :class="{'active': isLoading}">
                        <li class="activity_li">
                            <p></p>
                            <p class="activity_info"></p>
                        </li>
                        <li class="activity_li">
                            <p></p>
                            <p></p>
                        </li>
                        <li class="activity_li">
                            <p></p>
                            <p></p>
                        </li>
                        <li class="activity_li">
                            <p></p>
                            <p></p>
                        </li>
                    </div>
                    <li class="live_li" v-for="(shows,key) in showsList" @click="ticketInfo(shows)">
                        <div class="live_info">
                            <div class="live_number" :class="[{'fir':shows.myTicket.ticketNumber == 0},{'sec':shows.myTicket.ticketNumber == 1},{'thr':shows.myTicket.ticketNumber == 2}]"><span>{{shows.myTicket.ticketNumber}}</span><i>{{liveText.number}}</i></div>
                            <div class="live_dates">
                                <p class="live_name">{{shows.idol.nickname}}{{liveText.meeting}}</p>
                                <p class="live_times"><span>{{formatTime(shows.meeting.startTime,'yyyy.MM.dd')}}({{formatDay(shows.meeting.startTime)}})</span><span>{{formatTime(shows.meeting.startTime,'hh:mm')}}</span></p>
                            </div>
                        </div>
                        <div class="live_start">
                            <p class="live_startTime">{{liveText.forecast}}<span>{{formatTime(shows.myTicket.startTime,'hh:mm')}}</span>{{liveText.connect}}</p>
                            <p class="live_tips">{{liveText.tips}}</p>
                        </div>
                        <img class="live_bg" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/bg_1.jpg">
                        <img class="live_end" :src="liveText.endImg" v-if="isOver(shows.meeting.endTime)">
                    </li>
                    <div class="default_page" v-show="showsList.length == 0 && isLoading">
                        <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_noactivity.png" alt="">
                        <p v-html="liveText.none"></p>
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
            token_: '',
            idx: 0,
            offset: 0,
            liveText: {
                number: '番',
                meeting: 'の1V1生配信',
                none: 'まだチケットがありません',
                forecast: 'アイドルと',
                connect: 'に接続予定',
                tips: '※チケットを購入された方は、お早めに入室してお待ちください。順番が過ぎた場合、チケットは無効となります。',
                endImg: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/icon_concert_end_cn.png'
            },
          }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            ticketInfo(val) {
                console.log(val)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    // bridge.callHandler('umeng',{'event_key':'rankpage_enter_idol'});
                    bridge.callHandler('ticketInfo', {'info': val})
                })
            },
            formatTime(key,type) {
                let timer = new Date(key);
                return timer.Format(type);
            },
            formatDay(key) {
                let timer = new Date(key).getDay();
                var str;
                // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                if(getParams('language') == 'cn') {
                    switch (timer) {
                        case 0 :
                                str = "周日";
                                break;
                        case 1 :
                                str = "周一";
                                break;
                        case 2 :
                                str = "周二";
                                break;
                        case 3 :
                                str = "周三";
                                break;
                        case 4 :
                                str = "周四";
                                break;
                        case 5 :
                                str = "周五";
                                break;
                        case 6 :
                                str = "周六";
                                break;
                    }
                }else {
                    switch (timer) {
                        case 0 :
                                str = "日";
                                break;
                        case 1 :
                                str = "月";
                                break;
                        case 2 :
                                str = "火";
                                break;
                        case 3 :
                                str = "水";
                                break;
                        case 4 :
                                str = "木";
                                break;
                        case 5 :
                                str = "金";
                                break;
                        case 6 :
                                str = "土";
                                break;
                    }
                }
                return  str;
            },
            isOver(key){
                let newTimes = Date.parse(new Date());
                if(newTimes < key) {
                    return false;
                }else {
                    return true;
                }
            },
            getInfo(token) {
                let self = this;
                if(self.idx < 2) {
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/meetings/listOfFans',{
                        params: {
                            offset: self.offset,
                            limit: 10
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
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':0}, function responseCallback(responseData) {
                                self.getRanking3(responseData.token);
                            })
                        })
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
                http.get('/meetings/listOfFans',{
                    params: {
                        offset: self.offset,
                        limit: 10
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
             if(getParams('language') == 'cn') {
                self.liveText = {
                    number: '番号',
                    meeting: '的1V1见面会',
                    none: '还没有购买见面券',
                    forecast: '预计',
                    connect: '开始与爱豆连线',
                    tips: '※请提早进入直播间排队等候，过号则见面券无效',
                    endImg: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/icon_concert_end_cn.png'
                }
            }else {
                self.liveText = {
                    number: '番',
                    meeting: 'の1V1生配信',
                    none: 'まだチケットがありません',
                    forecast: 'アイドルと',
                    connect: 'に接続予定',
                    tips: '※チケットを購入された方は、お早めに入室してお待ちください。順番が過ぎた場合、チケットは無効となります。',
                    endImg: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/icon_concert_end_jp.png'
                }
            }

        }
      }
</script>
