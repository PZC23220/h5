<template>
    <div class="main">
        <div class="content">
            <ul class="protector">
                <div class="page_defalt" :class="{'active': isLoading}">
                    <li class="activity_li">
                        <span class="avatar"></span>
                        <p class="idol_time"></p>
                        <p class="idol_time"></p>
                    </li>
                    <li class="activity_li">
                        <span class="avatar"></span>
                        <p class="idol_time"></p>
                        <p class="idol_time"></p>
                    </li>
                    <li class="activity_li">
                        <span class="avatar"></span>
                        <p class="idol_time"></p>
                        <p class="idol_time"></p>
                    </li>
                    <li class="activity_li">
                        <span class="avatar"></span>
                        <p class="idol_time"></p>
                        <p class="idol_time"></p>
                    </li>
                </div>
                <li class="protextor_li" v-for="idol in idolList" @click.stop="idol.idolId?showIdolPage(idol.idolId):false">
                    <span class="avatar"><img v-lazy="idol.avatarIdol" alt=""></span>
                    <p class="idol_name">{{idol.nickname}}</p>
                    <p class="idol_info"><span class="fans_medal" :class="{'none':!idol.medalLevel}"><img :src="'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/icon_medal_'+ idol.medalLevel +'.png'" alt="" v-if="idol.medalLevel"><em v-else>{{showstext.medal}}</em></span><span>(<i>{{idol.medalValue}}</i>/{{idol.medalLevel>=5?'-':medalList[(idol.medalLevel+1)].medal}})</span></p>
                    <p class="idol_time">{{formatTime(idol.enddate,'yyyy.MM.dd')}}{{showstext.enddate}}</p>
                    <p class="idol_money" @click.stop="idol.idolId?support(idol):false">{{showstext.money}}</p>
                </li>
                <div class="default_page" v-show="idolList.length == 0 && isLoading">
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_follow.png" alt="">
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
            idolList: [],
            isLoading: false,
            idx: 0,
            medalList:[],
            showstext: {
                enddate: 'まで有効',
                money: '期限を更新',
                medal: 'まだ貢献バッジはありません',
                none: 'まだフォロー中のアイドルがいません',
            },
          }
        },
        methods: {
            support(idol) {
                console.log('support');
                var self = this;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('renew_fee', {'context':'0','idol_id':idol.idol_id,'freeFirstMonth':idol.freeFirstMonth,'gpriceHalfyear':idol.gpriceHalfyear,'gpriceMonth': idol.gpriceMonth,'gpriceSeason': idol.gpriceSeason}, function responseCallback(responseData) {
                        self.idx = 0;
                        self.getInfo();
                    })
                })
                return;
            },
            showIdolPage(val) {
                console.log(val)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showIdolPage', {'idolId': val})
                })
            },
            formatTime(key,type) {
                let timer = new Date(key);
                return timer.Format(type);
            },
            getInfo(token) {
                let self = this;
                // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                let token_ = getParams('token');
                if(self.idx < 1) {
                   if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                        self.tokens = token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token '+token_;
                    }
                    http.get('/groupyuser/fansIdolList?version=2')
                    .then(function(res){
                        console.log(res)
                        self.isLoading = true;
                        if(res.data) {
                            self.idolList = res.data.idolList;
                            self.medalList = res.data.medalList;
                        }else {
                            if(res.status != 10013) {
                                self.idx++;
                                 window.setupWebViewJavascriptBridge(function(bridge) {
                                    bridge.callHandler('getToken', {'targetType':'1','targetId':'1'}, function responseCallback(responseData) {
                                        self.getInfo(responseData.token);
                                    })
                                })
                            }
                        }
                    }).catch(function(err){
                        self.idx++;
                         window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':'1'}, function responseCallback(responseData) {
                                self.getInfo(responseData.token);
                            })
                        })
                    })
                }else {
                    console.log(11111)
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
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                self.showstext = {
                    enddate: '到期',
                    money: '续费',
                    medal: '暂无勋章',
                    none: '还没有守护的爱豆',
                }
            }else {
                self.showstext = {
                    enddate: 'まで有効',
                    money: '期限を更新',
                    medal: 'まだ貢献バッジはありません',
                    none: 'まだ推しメンがいません',
                }
            }
        }
      }
</script>