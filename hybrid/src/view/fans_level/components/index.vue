<template>
    <div class="main">
        <div class="header">
           <!--  <div class="detail">
                <div class="back" @click="close()">
                    <img src="../../../static/images/icon_arrow_back_black.png" alt="">
                </div>
                <span>{{medal_text.title}}</span>
            </div> -->
            <div class="header_banner">
                <div class="level_bg">
                    <span class="con_left" :class="{'left_show':lvNow||lvNow==0}">Lv {{lvNow?lvNow:'0'}}</span>
                    <img src="/img/level/bg_level.png" alt="">
                </div>
                <p class="score con_left" :class="{'left_show':lvNow||lvNow==0}">{{score?score:'0/0'}}</p>
                <div class="progress">
                    <span :style="style"></span>
                </div>
                <div class="me_leval"><span class="con_left" :class="{'left_show':lvNow||lvNow==0}">Lv.{{lvNow?lvNow:'0'}}</span><span class="con_left" :class="{'left_show':lvNext}">Lv.{{lvNext?lvNext:'0'}}</span></div>
            </div>
        </div>
        <div class="content">
            <div class="howToUpgrade">
                <p>{{medal_text.how}}</p>
                <img src="/img/level/pic_upgrade.png" alt="">
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
                    how: 'レベルアップのヒントは？'
                },
                lvNow: '',
                lvNext: '',
                score:'',
                style: 'width: calc(320px * 0)'
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
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
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
            }
        },
        created() {
            var self = this;
            self.getLevel();
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(_lan === 'zh-cn') {
                 self.medal_text= {
                    title: 'Groupy等级',
                    desc: 'level是根据粉丝在Groupy平台所送的人气划分的。送出人气和礼物越多，代表该粉丝是越资深的用户，level也会越高。<br><br>在Groupy里面也会更有机会与爱豆直接互动，邀请进入VIP社群等福利!',
                    how: '如何可以快速升级？'

                }
            } else {
                self.medal_text= {
                    title: '成長レベル',
                    desc: 'ファンがGroupyでの総合応援アクションを表現したものです。アイドルを応援すればするほど、レベルアップを達成できます。<br><br>高レベルのファンに特典（無料会員体験など）もご用意していますので、ぜひレベルアップを！',
                    how: 'レベルアップのヒントは？'
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .header {
        font-size: 18px;
        color: #fff;
        background: #00B4BC;
        font-weight: 100;
        .detail {
            height: 44px;
            line-height: 44px;
            .back {
                top: (44px-22px)/2;
            }
            span {
                letter-spacing: 1.2px;
            }
        }
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
        top: 173.5px;
        color: #666;
        height: calc(100vh - 173.5px);
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
