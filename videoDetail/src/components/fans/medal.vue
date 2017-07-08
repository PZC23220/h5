<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <div class="back" @click="close()">
                    <img src="../../../static/images/icon_arrow_back_black.png" alt="">
                </div>
                <span>{{medal_text.title}}</span>
            </div>
            <div class="header_banner">
                <div class="level_bg">
                    <span>Lv1</span>
                    <img src="../../images/bg_level.png" alt="">
                </div>
                <p class="score">102/300</p>
                <div class="progress">
                    <span class="active"></span>
                </div>
                <div class="me_leval"><span>Lv.1</span><span>Lv.2</span></div>
            </div>
        </div>
        <div class="content">
            <div class="howToUpgrade">
                <p>{{medal_text.how}}</p>
                <img src="../../images/pic_upgrade.png" alt="">
                <p v-html="medal_text.desc"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                medal_text: {
                    title: '成長レベル',
                    desc: 'ファンがGroupyでの総合応援アクションを表現したものです。アイドルを応援すればするほど、レベルアップを達成できます。<br><br>高レベルのファンに特典（無料会員体験など）もご用意していますので、ぜひレベルアップを！',
                    how: 'レベルアップのヒントは？'
                }
            }
        },
        methods: {
            close() {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('close');
                });
            }
        },
        created() {
            var self = this;
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
        top: 11px;
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
        top: 228.5px;
        color: #666;
        height: calc(100vh - 228.5px);
        font-weight: 200;
        background: #eee;
        .howToUpgrade {
            background: #FCFCFC;
            margin: 14px 12px 0;
            padding-top: 11px;
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
</style>
