<template>
    <div class="main">
        <div class="content">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/acticity_banner/banner-coke.jpg" class="banner">
            <h2><span style="left: 0;"></span>{{activity.theme}}<span style="right: 0;"></span></h2>
            <ul class="ranking_list">
                <li>
                    <div class="img_content">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown">
                        <img v-lazy="ranking.length>0?ranking[0].avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" class="avatar">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_ranking_1.png" class="ranking_pic">
                        <span class="idol_level">NO.1</span>
                    </div>
                    <div class="name">{{ranking.length>0?(ranking[0].nickname?ranking[0].nickname:'...'):'...'}}</div>
                    <div class="idol_desc">
                        <!-- <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(ranking.length>0?(ranking[0].gcoin?ranking[0].gcoin:0):0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p> -->
                        <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(ranking.length>0?(ranking[0].popularity?ranking[0].popularity:0):0).toLocaleString()}}</em></span></p>
                        <p><span><em>{{Number(ranking.length>0?(ranking[0].videoCount?ranking[0].videoCount:0):0).toLocaleString()}}</em></span><i>{{activity.works}}</i></p>
                    </div>
                    <div class="reard_moer" v-if="isFans" @click="ranking.length>0?(ranking[0].idol_id?showIdolPage(ranking[0].idol_id):false):false">{{activity.idolPage}}</div>
                </li>
                <!-- <li>
                    <div class="idolranking_content">
                        <div class="img_content">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown">
                            <img v-lazy="ranking.length>1?ranking[1].avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png'" class="avatar">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_ranking_2.png" class="ranking_pic">
                            <span class="idol_level">NO.2</span>
                        </div>
                        <div class="idol_content">
                            <div class="name">{{ranking.length>1?(ranking[1].nickname?ranking[1].nickname:'...'):'...'}}</div>
                            <div class="idol_desc">
                                <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(ranking.length>1?(ranking[1].popularity?ranking[1].popularity:0):0).toLocaleString()}}</em></span></p>
                                <p><span><em>{{Number(ranking.length>1?(ranking[1].videoCount?ranking[1].videoCount:0):0).toLocaleString()}}</em></span><i>{{activity.works}}</i></p>
                            </div>
                        </div>
                    </div>
                    <div class="reard_moer" v-if="isFans" @click="ranking.length>1?(ranking[1].idol_id?showIdolPage(ranking[1].idol_id):false):false">{{activity.idolPage}}</div>
                </li> -->
                <li v-for="(idol,key) in ranking" v-if="isOver?(key>0&key<3):key>0">
                    <div class="idolranking_content">
                        <div class="img_content">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown">
                            <img v-lazy="idol.avatar" class="avatar">
                            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_ranking_2.png" class="ranking_pic">
                            <span class="idol_level">NO.{{key+1}}</span>
                        </div>
                        <div class="idol_content">
                            <div class="name">{{idol.nickname?idol.nickname:'...'}}</div>
                            <div class="idol_desc">
                                <!-- <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(idol.gcoin?idol.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p> -->
                                <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</em></span></p>
                                <p><span><em>{{Number(idol.videoCount?idol.videoCount:0).toLocaleString()}}</em></span><i>{{activity.works}}</i></p>
                            </div>
                        </div>
                    </div>
                    <div class="reard_moer" v-if="isFans" @click="idol.idol_id?showIdolPage(idol.idol_id):false">{{activity.idolPage}}</div>
                </li>
            </ul>
            <div class="read_videos" v-if="isFans && isOver" @click="toVideoList()">{{activity.videos}}</div>
        </div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                ranking: [],
                idx: 0,
                idx2: 0,
                isFans: false,
                isOver: false,
                activity: {
                    theme: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    idolPage: 'プロフィールへ'
                },
                activityInfo:{}
            }
        },
        methods: {
          toVideoList() {
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('activity_videos', {'activityId':self.activityInfo.id,'activityName':self.activityInfo.title})
            })
          },
          getList() {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
                http.get('/video/activityIdols',{
                    params: {
                        activityId:getParams('activityId'),
                        rows: 10
                    }
                }).then(function(res){
                    console.log(res)
                    self.ranking = res.data.ranking;
                    self.me = res.data.self;
                    self.loadingShow = true;
                    var timeString = Date.parse(new Date());
                    self.activityInfo = res.data.activityInfo;
                    if(res.data.activityInfo.startTime > timeString || res.data.activityInfo.endTime < timeString) {
                        self.isOver = true;
                    }else {
                        self.isOver = false;
                    }
                }).catch(function(){
                    self.idx++;
                    self.getList();
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          showIdolPage(val) {
            console.log(val)
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showIdolPage', {'idolId': val})
            })
          },
        },
        mounted() {
        },
        created() {
            let isFans = getParams('isFans');
            if(isFans) {
                this.isFans = true;
            }
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             // if(_lan === 'zh-cn') {
             //     this.activity= {
             //        theme: '当前排名',
             //        works: '参赛视频',
             //        Gcoin: '获得G币',
             //        like: '获得Like',
             //        videos: '查看参赛视频',
             //        idolPage: '查看主页'
             //    }
             //  } else {
             //    this.activity= {
             //        theme: 'ランキング',
             //        works: '作品',
             //        Gcoin: 'コイン',
             //        like: 'Like',
             //        videos: '参加作品一覧',
             //        idolPage: 'プロフィールへ'
             //    }
             //  }
            this.getList();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        background-image: linear-gradient(140deg, #FFCC54 6%, #FF927C 100%);   
    }
    h2 {
        font-size: 16px;
        color: #fff;
        background: none;
        text-align: center;
        font-weight: 300;
        width: 143px;
        margin: 0 auto;
        position: relative;
        margin-top: 5px;
        span {
            position: absolute;
            width: 30px;
            height: 1px;
            background-color: #fff;
            top: 50%;
        }
    }
    .ranking_list {
        padding: 12px 12px 0;
        li {
            overflow: hidden;
            text-align: center;
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
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .idol_content {
                overflow: hidden;
                width: calc(100% - 90px);
                max-width: 305px;
            }
            .idol_desc {
                display: flex;
                overflow: hidden;
                margin-top: 8px;
                width: 100%;
                p {
                    flex: 1.5;
                    text-align: left;
                    overflow: hidden;
                    line-height: 24px;
                    >span {
                        display: inline-block;
                        text-align: center;
                        overflow: hidden;
                        float: left;
                        vertical-align: middle;
                        img {
                            width: 12px;
                            float: left;
                            margin-top: 6px;
                            margin-right: 5.5px;
                        }
                        em {
                            display: inline-block;
                            font-size: 16px;
                            float: left;
                            font-weight: 600;
                            color: #333;
                            max-width: calc(22vw - 31px);
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    i {
                        display: inline-block;
                        float: left;
                        color: #333;
                        font-size: 12px;
                        margin-left: 8px
                    }
                }
                p:first-child {
                    flex: 2.5;
                    >span {
                        em {
                            max-width: calc(34vw - 16px);
                            color: #FB0730;
                        }
                    }
                }
            }
        }
        li:first-child {
            background-image: url(http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/pic_1.png);
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
                   flex: 1;
                    span,em,i {
                        float: none;
                    }
                 }
            }
        }
        .reard_moer {
            text-align: center;
            text-decoration: underline;
            color: #666;
            font-size: 14px;
            display: inline-block;
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