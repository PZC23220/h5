<template>
    <div class="main">
        <div class="content">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_cn.jpg" class="live_banner">
            <h2 class="live_title">是什么</h2>
            <span class="live_border_bottom"></span>
            <p class="live_desc">1V1见面会是Groupy推出的偶像粉丝互动新模式：偶像进行线上直播，与粉丝一对一视频连线，即可单独见面。</p>
            <h2 class="live_title">怎么参加</h2>
            <span class="live_border_bottom"></span>
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_step_1.png" class="live_step">
            <p class="live_desc"> 购买见面券 在Groupy-【LIVE】发现偶像的见面会，购买见面券获得入场番号，当天根据番号进行见面。</p>
            <div class="live_process"><span class="process_tips">入口</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips">购票</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips two">获得<br>番号</span></div>
            <div class="live_imgs"><img src=""><img src=""><img src=""></div>
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_step_2.png" class="live_step">
            <p class="live_desc"> 视频连线见面 见面会当天，从【首页】进入直播间等候，到了番号即自动与偶像进行视频连线。见面时间结束后，将自动断开连接。</p>
            <div class="live_process live_process_blue"><span class="process_tips">进入</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips">等候</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips">见面</span></div>
            <div class="live_imgs"><img src=""><img src=""><img src=""></div>
        </div>
    </div>
</template>

<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                medal_text: {
                    title: '成長レベル',
                    desc: 'ファンがGroupyでの総合応援アクションを表現したものです。アイドルを応援すればするほど、レベルアップを達成できます。<br><br>高レベルのファンに特典（無料会員体験など）もご用意していますので、ぜひレベルアップを！',
                    how: 'レベルアップのヒントは？',
                    pubMsg: ' 成長レベル'
                },
                lvNow: '',
                lvNext: '',
                score:'',
                style: 'width: calc(320px * 0)',
                android: false,
                idx: 0,
                level_img: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/level/pic_upgrade.png'
            }
        },
        methods: {
            close() {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('close');
                });
            },
            getLevel(token) {
                let self = this;
                if(self.idx < 2) {
                    self.idx++;
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                    }
                    http.get('/groupyuser/fansLevel').then(function(res){
                        console.log(res);
                        self.lvNow = res.data.levelLowerLimit.level;
                        self.lvNext = res.data.levelUpperLimit.level;
                        self.score = (res.data.fansLevelValue - res.data.levelLowerLimit.popularity)+ '/' +(res.data.levelUpperLimit.popularity - res.data.levelLowerLimit.popularity);
                        self.style = 'width: calc(320px * '+ self.score +')'
                    }).catch(function(){
                        self.loadingBig = false;
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getLevel(responseData.token);
                            })
                        })
                    });
                }else {
                    // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
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
            var self = this;
            if(getParams('platform') == 'android') {
                self.android = true;
            }
            self.getLevel();
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                 self.medal_text= {
                    title: 'Groupy等级',
                    desc: 'level是根据粉丝在Groupy平台所送的人气划分的。送出人气和礼物越多，代表该粉丝是越资深的用户，level也会越高。<br><br>在Groupy里面也会更有机会与爱豆直接互动，邀请进入VIP社群等福利!',
                    how: '如何可以快速升级？',
                    pubMsg: ' Groupy等级'
                }
                self.level_img = 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/level/pic_upgrade.jpg';
            } else {
                self.medal_text= {
                    title: '成長レベル',
                    desc: 'ファンがGroupyでの総合応援アクションを表現したものです。アイドルを応援すればするほど、レベルアップを達成できます。<br><br>高レベルのファンに特典（無料会員体験など）もご用意していますので、ぜひレベルアップを！',
                    how: 'レベルアップのヒントは？',
                    pubMsg: ' 成長レベル'
                }
                self.level_img = 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/level/pic_upgrade.png';
            }
        }
    }
</script>
