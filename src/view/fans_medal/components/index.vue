<template>
    <div class="main">
        <div class="header" v-if="android">
            <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/arrow/nav_icon_arrow_black.png" alt="" @click="close()">
            <span>{{medal_text.pubMsg}}</span>
        </div>
        <div class="content" :class="{'ios': android == false}">
           <div class="desc">
               <h5 style="color: #333;">{{medal_text.desc}}</h5>
               <ul>
                   <li><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/big_medal/icon_medal_1.png" alt=""><span>{{medal_text.medal1}}</span><i v-if="medal_text.value=='Like数'">ブロンズキュウシュゴ</i><div><span>{{medal_text.value}}</span><i>2000</i></div></li>
                   <li><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/big_medal/icon_medal_2.png" alt=""><span>{{medal_text.medal2}}</span><i v-if="medal_text.value=='Like数'">シルバーキュウシュゴ</i><div><span>{{medal_text.value}}</span><i>5000</i></div></li>
                   <li><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/big_medal/icon_medal_3.png" alt=""><span>{{medal_text.medal3}}</span><i v-if="medal_text.value=='Like数'">ゴールドキュウシュゴ</i><div><span>{{medal_text.value}}</span><i>15000</i></div></li>
                   <li><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/big_medal/icon_medal_4.png" alt=""><span>{{medal_text.medal4}}</span><i v-if="medal_text.value=='Like数'">ダイヤモンドキュウシュゴ</i><div><span>{{medal_text.value}}</span><i>30000</i></div></li>
                   <li><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/big_medal/icon_medal_5.png" alt=""><span>{{medal_text.medal5}}</span><i v-if="medal_text.value=='Like数'">キングキュウシュゴ</i><div><span>{{medal_text.value}}</span><i>50000</i></div></li>
               </ul>
               <h5 style="padding-bottom: 10px;">{{medal_text.title}}</h5>
           </div>
        </div>
    </div>
</template>

<script>
    require('@api/js/common.js')
   export default {
        data() {
            return {
                medal_text: {
                    title: 'ファンがGroupyでの総合応援アクションを表現したものです。アイドルを応援すればするほど、レベルアップを達成できます。',
                    medal1: '青銅級守護',
                    medal2: '白銀級守護',
                    medal3: '黄金級守護',
                    medal4: '金剛級守護',
                    medal5: '王者級守護',
                    value: 'Like数',
                    desc: 'アイドルごとに一定の応援をすると獲得できます。',
                    pubMsg: ' 貢献バッジ'
                },
                android: false
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
            if(getParams('platform') == 'android') {
                self.android = true;
            }
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                 self.medal_text= {
                    title: '守护勋章是每个守护者都有的独立等级，按照为守护中的爱豆应援的总Like计算。勋章共有五个等级：青铜守护，白银守护，黄金守护，钻石守护以及王者守护。勋章等级越高的，在爱豆的贡献排行中出现的机会越大，被爱豆和其他粉丝看见的几率就越大。',
                    medal1: '青铜守护',
                    medal2: '白金守护',
                    medal3: '黄金守护',
                    medal4: '钻石守护',
                    medal5: '王者守护',
                    value: '价值满',
                    desc: '为单个爱豆或组合送出Like',
                    pubMsg: '  爱豆勋章'

                }
            } else {
                self.medal_text= {
                    title: 'ファンがGroupyでの総合応援アクションを表現したものです。アイドルを応援すればするほど、レベルアップを達成できます。',
                    medal1: '青銅級守護',
                    medal2: '白銀級守護',
                    medal3: '黄金級守護',
                    medal4: '金剛級守護',
                    medal5: '王者級守護',
                    value: 'Like数',
                    desc: 'アイドルごとに一定の応援をすると獲得できます。',
                    pubMsg: ' 貢献バッジ'
                }
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
        background: #fafafa;
        color: #666;
        border-bottom: 1px solid rgba(0,0,0,0.1);
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
        padding-top: 0;
        min-height: 100vh;
    }
    .content {
        color: #666;
        // font-weight: 200;
        background: #eee;
        .desc {
            padding: 8px 12px;
            h5 {
                color: #999;
                font-size: 14px;
            }
            ul {
                overflow: hidden;
                padding-top: 8.5px;
                li {
                    float: left;
                    box-sizing: border-box;
                    width: calc(50% - 6px);
                    background: #FCFCFC;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
                    border-radius: 4px;
                    margin-bottom: 12px;
                    &:nth-child(2n) {
                        margin-left: 12px;
                    }
                    text-align: center;
                    padding-top: 19.5px;
                    padding-bottom: 5px;
                    >img {
                        width: 105px;
                        display: block;
                        margin: 0 auto 15px;
                    }
                    >span {
                        font-size: 14px;
                    }
                    >i {
                        display: block;
                        color: #999;
                        font-size: 11px;
                        -webkit-transform: scale(0.92);
                    }
                    >div {
                        padding-top: 5px;
                        span {
                            display: inline-block;
                            width: 58px;
                            height: 16px;
                            line-height: 16px;
                            background: url(https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/medal/big_medal/bg_medal.png) no-repeat;
                            background-size: 100% 100%;
                            color: #fff;
                            font-size: 11px;
                            -webkit-transform: scale(0.92);
                        }
                        i {
                            font-family: 'Helvetica Condensed Bold Italic';
                            font-size: 18px;
                            color: #333;
                        }
                    }
                    >p {
                        color: #999;
                        font-size: 11px;
                        -webkit-transform: scale(0.92);
                    }
                    &:last-child {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
