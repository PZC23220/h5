<template>
    <div class="main">
        <div class="content">
            <img src="../../images/activity/banner.jpg" class="banner">
            <h2><span style="left: 0;"></span>当前排名<span style="right: 0;"></span></h2>
            <ul class="ranking_list">
                <li>
                    <div class="img_content">
                        <img src="../../images/icon_crown_1.png" class="crown">
                        <img src="../../images/default_img.png" class="avatar">
                        <img src="../../images/activity/pic_ranking_1.png" class="ranking_pic">
                        <span class="idol_level">NO.1</span>
                    </div>
                    <div class="name">idolName</div>
                    <div class="idol_desc">
                        <p><span><em>9</em></span><i>参赛视频</i></p>
                        <p><span><img src="../../images/timeline_icon_coins.png"><em>6,490</em></span><i>获得G币</i></p>
                        <p><span><img src="../../images/timeline_icon_likes.png"><em>25,496</em></span><i>获得Like</i></p>
                    </div>
                    <div class="reard_moer">查看主页</div>
                </li>
                <li>
                    <div class="idolranking_content">
                        <div class="img_content">
                            <img src="../../images/icon_crown_2.png" class="crown">
                            <img src="../../images/default_img.png" class="avatar">
                            <img src="../../images/activity/pic_ranking_2.png" class="ranking_pic">
                            <span class="idol_level">NO.2</span>
                        </div>
                        <div class="idol_content">
                            <div class="name">idolName</div>
                            <div class="idol_desc">
                                <p style="text-align: left;"><span style="margin-left: 18px;"><em>9</em></span><i style="margin-left: -5px;">参赛视频</i></p>
                                <p><span><img src="../../images/timeline_icon_coins.png"><em>6,490</em></span><i>获得G币</i></p>
                                <p><span><img src="../../images/timeline_icon_likes.png"><em>25,496</em></span><i>获得Like</i></p>
                            </div>
                        </div>
                    </div>
                    <div class="reard_moer">查看主页</div>
                </li>
                <li>
                    <div class="idolranking_content">
                        <div class="img_content">
                            <img src="../../images/icon_crown_3.png" class="crown">
                            <img src="../../images/default_img.png" class="avatar">
                            <img src="../../images/activity/pic_ranking_2.png" class="ranking_pic">
                            <span class="idol_level">NO.3</span>
                        </div>
                        <div class="idol_content">
                            <div class="name">idolName</div>
                            <div class="idol_desc">
                                <p style="text-align: left;"><span style="margin-left: 18px;"><em>9</em></span><i style="margin-left: -5px;">参赛视频</i></p>
                                <p><span><img src="../../images/timeline_icon_coins.png"><em>6,490</em></span><i>获得G币</i></p>
                                <p><span><img src="../../images/timeline_icon_likes.png"><em>25,496</em></span><i>获得Like</i></p>
                            </div>
                        </div>
                    </div>
                    <div class="reard_moer">查看主页</div>
                </li>
                <li>
                    <div class="idolranking_content">
                        <div class="img_content">
                            <img src="../../images/icon_crown_3.png" class="crown">
                            <img src="../../images/default_img.png" class="avatar">
                            <img src="../../images/activity/pic_ranking_2.png" class="ranking_pic">
                            <span class="idol_level">NO.4</span>
                        </div>
                        <div class="idol_content">
                            <div class="name">idolName</div>
                            <div class="idol_desc">
                                <p style="text-align: left;"><span style="margin-left: 18px;"><em>9</em></span><i style="margin-left: -5px;">参赛视频</i></p>
                                <p><span><img src="../../images/timeline_icon_coins.png"><em>6,490</em></span><i>获得G币</i></p>
                                <p><span><img src="../../images/timeline_icon_likes.png"><em>25,496</em></span><i>获得Like</i></p>
                            </div>
                        </div>
                    </div>
                    <div class="reard_moer">查看主页</div>
                </li>
            </ul>
            <div class="read_videos">查看参赛视频</div>    
        </div>
    </div>
</template>
<script>
    import http from '@env/http.js';
    require('../../utils/common.js')
    export default {
        data() {
            return {
                tasks: [],
                idx: 0,
                idx2: 0
            }
        },
        methods: {
          getList(token) {
            let self = this;
            if(self.idx < 2) {
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/mission/list ').then(function(res){
                    self.tasks = res.data;
                    console.log(self.tasks);
                }).catch(function(){
                    self.idx++;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getList(responseData.token);
                        })
                    })
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          accept(val,e,token) {
            let self = this;
            if(self.idx2 < 2) {
                console.log(e.target.innerHTML);
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/mission/accept',{
                    params: {
                        id: val
                    }
                }).then(function(res){
                    e.target.innerHTML = '已领取';
                    e.target.classList.remove('finish');
                }).catch(function(){
                    self.idx2++;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getList(responseData.token);
                        })
                    })
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          status(val) {
            if(val == '0') {
                return '领取';
            }else {
                return '已领取';
            }
          },
        },
        mounted() {
        },
        created() {
            // this.getList();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        background-image: url(../../images/activity/bg.jpg);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat; 
        top: 0;
        height: 100vh;
        box-sizing: border-box;
        padding-bottom: 20px;       
    }
    .banner {
        display: block;
        width: 100%;
    }
    h2 {
        font-size: 16px;
        color: #fff;
        text-align: center;
        font-weight: 300;
        width: 143px;
        margin: 0 auto;
        position: relative;
        margin-top: 14.5px;
        span {
            position: absolute;
            width: 30px;
            height: 1px;
            background-color: #fff;
            top: 13.5px;
        }
    }
    .ranking_list {
        padding: 12px 12px 0;
        li {
            overflow: hidden;
            border-bottom: 1px solid #eee;
            padding: 10px 12px;
            background-color: #FFF5F7;
            border: 2px solid #FFB2C7;
            border-radius: 8px;
            margin-bottom: 10px;
            .idolranking_content {
                overflow: hidden;
            }
            .idolranking_content >* {
                float: left;
            }
            .img_content {
                width: 71.5px;
                height: 68px;
                position: relative;
                padding-top: 8.5px;
                margin-right: calc(100vw * 0.04);
                img.avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: block;
                    margin: 0 auto;
                    float: none;
                    border: 1px solid #888;
                }
                img.crown {
                    position: absolute;
                    left: 7px;
                    top: 0;
                    width: 25px;
                }
                span.idol_level {
                    width: 71.5px;
                    height: 20px;
                    line-height: 20px;
                    position: absolute;
                    left: 0;
                    bottom: 10px;
                    text-align: center;
                    font-size: 11px;
                    -webkit-transform: scale(0.85);
                    color: #FFFFFF;
                    font-weight: 600;
                }
                img.ranking_pic {
                    width: 71.5px;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }

            }
            .name {
                font-size: 16px;
                font-weight: 600;
                text-align: left;
                margin-top: 8px;
            }
            .idol_content {
                overflow: hidden;
                width: 63vw;
            }
            .idol_desc {
                display: flex;
                overflow: hidden;
                margin-top: 8px;
                p {
                    flex: 1;
                    text-align: left;
                    >span {
                        display: block;
                        img {
                            width: 12px;
                            vertical-align: middle;
                            margin-right: 5.5px;
                        }
                        em {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: 14px;
                            font-weight: 600;
                            color: #333;
                        }
                    }
                    i {
                        color: #999;
                        display: block;
                        font-size: 10px;
                        margin-left: 10px;
                        -webkit-transform: scale(0.8);
                    }
                }
            }
        }
        li:first-child {
            background-image: url(../../images/activity/pic_1.png);
            background-size: 100% auto;
            background-position: center center;
            background-repeat: no-repeat;
            .img_content {
                width: 103.5px;
                height: 114px;
                padding-left: 0;
                padding-top: 12px;
                float: none;
                margin: 0 auto;
                img.avatar {
                    width: 90px;
                    height: 90px;
                    border: 2px solid #f8a50d;
                }
                img.ranking_pic {
                    width: 103.5px;
                }
                img.crown {
                    width: 38px;
                    left: 3px;
                }
                span.idol_level {
                    bottom: 17px;
                    width: 103.5px;
                    font-size: 14px;
                    -webkit-transform: scale(1);
                }
            } 
            .name {
                float: none;
                text-align: center;
            }
            .idol_desc {
                float: none;
                 p {
                    text-align: center;
                    i {
                        margin-left: 0px;
                    }
                 }
            }
        }
        .reard_moer {
            text-align: center;
            text-decoration: underline;
            color: #666;
            font-size: 14px;
            width: 60px;
            margin: 0 auto;
            padding: 12px 0 0;
            float: none;
            color: #999;
        }
    }
    .read_videos {
        background: #FFFFFF;
        border-radius: 69px;
        height: 36px;
        line-height: 36px;
        width: 136.5px;
        margin: 0 atuo;
        font-size: 14px;
        color: #666;
        margin: 15px auto;
        text-align: center;
    }
</style>