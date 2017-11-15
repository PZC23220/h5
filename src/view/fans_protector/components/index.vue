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
                <li class="protextor_li" v-for="idol in idolList" @click.stop="idol.idol_id?showIdolPage(idol.idol_id):false">
                    <span class="avatar"><img v-lazy="idol.avatar" alt=""></span>
                    <p class="idol_name">idol.nickname</p>
                    <p class="idol_likes">
                        <span><i>{{Number(idol.followed?idol.followed:0).toLocaleString()}}</i><br><i>{{showstext.attention}}</i></span>
                        <span><i>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</i><br><i>Likes</i></span>
                    </p>
                    <p class="idol_money" @click.stop="idol.idol_id?support(idol):false">{{showstext.support}}</p>
                </li>
                <div class="default_page" v-show="idolList.length == 0 && isLoading">
                    <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_join.png" alt="">
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
            idolList: '',
            isLoading: false,
            idx: 0,
            showstext: {
                attention: 'フォロワー',
                support: '応援する',
                none: 'まだ推しメンがいません',
            },
          }
        },
        methods: {
            support(idol) {
                console.log('support');
                var self = this;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('makeToast', 'send_gift_before');
                    bridge.callHandler('send_gift', {'context':'0','idol_id':idol.idol_id,'freeFirstMonth':idol.freeFirstMonth,'gpriceHalfyear':idol.gpriceHalfyear,'gpriceMonth': idol.gpriceMonth,'gpriceSeason': idol.gpriceSeason}, function responseCallback(responseData) {
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
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                let token_ = getParams('token');
                if(self.idx < 1) {
                   if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                        self.tokens = token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token '+token_;
                    }
                    http.get('/groupyuser/idolFollowedListByFans')
                    .then(function(res){
                        console.log(res)
                        self.isLoading = true;
                        self.idolList = res.data;
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
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                self.showstext = {
                    attention: '关注',
                    support: '应援',
                    none: '还没有守护的爱豆',
                }
            }else {
                self.showstext = {
                    attention: 'フォロワー',
                    support: '応援する',
                    none: 'まだ推しメンがいません',
                }
            }
        }
      }
</script>