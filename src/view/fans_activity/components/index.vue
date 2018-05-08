<template>
    <div class="main">
        <div class="content">
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
                    <a :href="host_+ shows.showsId">
                        <div class="activity_content">
                            <p class="activity_name">{{shows.title}}</p>
                            <p class="activity_info"><span>{{formatTime(shows.startTime,'MM.dd')}} {{formatDay(shows.startTime)}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_time.png" alt=""><span>{{showstext.start}}{{formatTime(shows.startTime,'hh:mm')}}/{{showstext.shows}}{{formatTime(shows.showTime,'hh:mm')}}</span></p>
                        </div>
                        <img :src="showstext.over" alt="" class="activity_end" v-if="isOver(shows.startTime)">
                    </a>
                </li>
                <div class="default_page" v-show="showsList.length == 0 && isLoading">
                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_noactivity.png" alt="">
                    <p v-html="showstext.none"></p>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
    require('@api/js/common.js');
    import http from '@api/js/http.js';
    export default {
        data() {
          return {
            token_: '',
            showsList: '',
            isLoading: false,
            idx: 0,
            showstext: {
                start: '開場',
                shows: '開演',
                none: '还没有参加爱豆的活动哦',
                over: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_concert_end.png'
            },
            host_: 'https://h5.groupy.vip/shows_detail/index.html'
          }
        },
        methods: {
            formatTime(key,type) {
                let timer = new Date(key);
                return timer.Format(type);
            },
            formatDay(key) {
                let timer = new Date(key).getDay();
                var str;
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
            isOver(key) {
                let timer = Date.parse(new Date());
                if(timer > key) {
                    return true;
                }else {
                    return false;
                }
            },
            getInfo(token) {
                let self = this;
                // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                let token_ = getParams('token');
                if(self.idx < 2) {
                   if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                        self.tokens = token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token '+token_;
                    }
                    http.get('/groupyuser/joinShowsListByFans')
                    .then(function(res){
                        console.log(res)
                        self.isLoading = true;
                        self.showsList = res.data;
                    }).catch(function(err){
                        self.idx++;
                         window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':'1'}, function responseCallback(responseData) {
                                self.getInfo(responseData.token);
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
            }
        },
        created() {
            let self = this;
            self.getInfo();
            self.host_ = location.origin + '/shows_detail/index.html?token=' + getParams('token') + '&language=' + getParams('language') + '&showsId=';
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                self.showstext = {
                    start: '开场',
                    shows: '开演',
                    none: '还没有参加爱豆的活动哦',
                    over: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_concert_end_chn.png'
                }
            }else {
                self.showstext = {
                    start: '開場',
                    shows: '開演',
                    none: 'まだイベントを参加していません',
                    over: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/icon_concert_end.png'
                }
            }

        }
      }
</script>
