<template>
    <div class="main">
       <div class="header" v-if="android">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/nav_icon_arrow_white.png" alt="" @click="close()">
            <span>{{medal_text.pubMsg}}</span>
        </div>
        <div class="content" :class="{'ios': android == false}">
            <div class="header_content">
                <div class="header_banner">
                    <div class="level_bg">
                        <span class="con_left" :class="{'left_show':lvNow||lvNow==0}">Lv {{lvNow?lvNow:'0'}}</span>
                        <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/level/bg_level.png" alt="">
                    </div>
                    <p class="score con_left" :class="{'left_show':lvNow||lvNow==0}">{{score?score:'0/0'}}</p>
                    <div class="progress">
                        <span :style="style"></span>
                    </div>
                    <div class="me_leval"><span class="con_left" :class="{'left_show':lvNow||lvNow==0}">Lv.{{lvNow?lvNow:'0'}}</span><span class="con_left" :class="{'left_show':lvNext}">Lv.{{lvNext?lvNext:'0'}}</span></div>
                </div>
            </div>
            <div class="howToUpgrade">
                <p>{{medal_text.how}}</p>
                <img :src="level_img" alt="">
                <p v-html="medal_text.desc"></p>
            </div>
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

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 43px;
        background: #00B4BC;
        color: #fff;
        border-color: #00B4BC;
        img {
            position: absolute;
            left: 12px;
            width: 22px;
            padding: 10.5px 5px;
        }
        p {
            float: right;
            border: 1px solid #FC4083;
            border-radius: 50px;
            font-size: 16px;
            color: #FC4083;
            width: 72px;
            height: 32px;
            line-height: 32px;
            margin-top: 3px;
        }
    }
    .content.ios {
        top: 0;
        height: 100vh;
    }
    .header_content {
        color: #fff;
        background: #00B4BC;
    }
    .header_banner {
        width: 320px;
        margin: 0 auto;
        padding-bottom: 8px;
        .level_bg {
            position: relative;
            width:135.5px;
            margin: 0 auto;
            img {
                width: 100%;
                display: block;
            }
            span {
                position: absolute;
                width: 135.5px;
                height:28px;
                text-align: center;
                line-height: 28px;
                bottom: 20px;
                left: 0;
                font-size: 16px;
                letter-spacing: 0;
                font-weight: 500;
            }
        }
        .score {
            font-size: 12px;
            letter-spacing: 1.2px;
            text-align: center;
        }
        .progress {
            width: 100%;
            height: 5px;
            background: rgba(255,255,255,0.3);
            border-radius: 11.5px;
            margin: 2.5px 0 1.5px;
            span {
                display: block;
                height: 5px;
                width:3px;
                transition: all 0.5s;
                background-image: linear-gradient(-150deg, #FF8550 0%, #FF2E79 100%);
                border-radius: 11.5px;
            }
            span.active {
                width: calc(320px * (102/300));
            }
        }
        .me_leval {
            overflow: hidden;
            span:first-child {
                -webkit-transform: scale(0.8);
                font-size: 10px;
                float: left;
            }
            span:last-child {
                float: right;
                -webkit-transform: scale(0.8);
                font-size: 10px;
            }
        }
    }
    .content {
        // top: 173.5px;
        color: #666;
        // height: calc(100vh - 173.5px);
        font-weight: 200;
        padding-bottom: 20px;
        box-sizing: border-box;
        background: #eee;
        .howToUpgrade {
            background: #FCFCFC;
            margin: 14px 12px 20px;
            padding-top: 11px;
            padding-bottom: 11px;
            box-sizing: border-box;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
            border-radius: 4px;
            text-align: center;
            >p:first-child {
                font-size: 14px;
            }
            img {
                width: 306px;
                margin: 14px auto;
                display: block;
            }
            >p:last-child {
                text-align: left;
                padding-left: 17px;
                padding-right: 8.5px;
            }
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
