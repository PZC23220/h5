<template>
    <div class="main">
         <div class="content">
            <img src="/img/activity/banner.jpg" class="banner">
            <h2>{{activity.theme}}</h2>
            <div class="activity_time">
                <h4>{{activity.time}}</h4>
                <div class="duration_time">
                    <p><span>{{activity.start}}</span><i>7月6日</i></p>
                    <p><span>{{activity.end}}</span><i>7月13日</i></p>
                </div>
            </div>
            <div class="activity_rule">
                <h4>{{activity.rule.title}}</h4>
                <p v-html="activity.rule.p1"></p>
                <p v-html="activity.rule.p2"></p>
                <p v-html="activity.rule.p3"></p>
                <p v-html="activity.rule.p4"></p>
            </div>
            <div class="activity_ranking">
                <h4>{{activity.rewardList}}</h4>
                <p class="no_ranking" v-if="ranking.length<0 && loadingShow">{{activity.noRanking}}</p>
                <ul class="ranking_list">
                    <div class="none_loading" :class="{'none_loading_show': loadingShow}">
                        <li>
                            <span class="first">1</span>
                            <div class="img_content"><img src="/img/default_img.png" class="avatar"><img src="/img/icon_crown_1.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <p><span style="text-align: left;margin-left: 10px;"><em>0</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                    <p><span><img src="/img/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p>
                                    <p><span><img src="/img/timeline_icon_likes.png"><em>0</em></span><i>{{activity.like}}</i></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="second">2</span>
                            <div class="img_content"><img src="/img/default_img.png" class="avatar"><img src="/img/icon_crown_2.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <p><span style="text-align: left;margin-left: 10px;"><em>0</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                    <p><span><img src="/img/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p>
                                    <p><span><img src="/img/timeline_icon_likes.png"><em>0</em></span><i>{{activity.like}}</i></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="second">3</span>
                            <div class="img_content"><img src="/img/default_img.png" class="avatar"><img src="/img/icon_crown_3.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <p><span style="text-align: left;margin-left: 10px;"><em>0</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                    <p><span><img src="/img/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p>
                                    <p><span><img src="/img/timeline_icon_likes.png"><em>0</em></span><i>{{activity.like}}</i></p>
                                </div>
                            </div>
                        </li>
                    </div>
                    <h5 v-if="me.ranking">{{activity.me}}</h5>
                    <li v-if="me.ranking">
                        <span :class="[{'first':me.ranking == 0},{'second':me.ranking == 1},{'three':me.ranking > 1},{'ten':me.ranking > 9}]">{{me.ranking?me.ranking:'-'}}</span>
                        <div class="img_content"><img :src="me.avatar?me.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" class="avatar"><img src="/img/icon_crown_1.png" class="crown" v-if="me.ranking?me.ranking==1:false"><img src="/img/icon_crown_2.png" class="crown" v-if="me.ranking?me.ranking==2:false"><img src="/img/icon_crown_3.png" class="crown" v-if="me.ranking?me.ranking>2:false"></div>
                        <div class="idol_content">
                            <span>{{me.nickname?me.nickname:'...'}}</span>
                            <div class="idol_desc">
                                <p><span style="text-align: left;margin-left: 10px;"><em>{{Number(me.videoCount?me.videoCount:0).toLocaleString()}}</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                <p><span><img src="/img/timeline_icon_coins.png"><em>{{Number(me.gcoin?me.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p>
                                <p><span><img src="/img/timeline_icon_likes.png"><em>{{Number(me.popularity?me.popularity:0).toLocaleString()}}</em></span><i>{{activity.like}}</i></p>
                            </div>
                        </div>
                    </li>
                    <h5>{{activity.all}}</h5>
                    <li v-for="(idol,key) in ranking" v-if="key < 3">
                        <span :class="[{'first':key == 0},{'second':key == 1},{'three':key > 1}]">{{key+1}}</span>
                        <div class="img_content"><img :src="idol.avatar?idol.avatar:'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" class="avatar"><img src="/img/icon_crown_1.png" class="crown" v-if="idol.ranking?idol.ranking==1:false"><img src="/img/icon_crown_2.png" class="crown" v-if="idol.ranking?idol.ranking==2:false"><img src="/img/icon_crown_3.png" class="crown" v-if="idol.ranking?idol.ranking>2:false"></div>
                        <div class="idol_content">
                            <span>{{idol.nickname?idol.nickname:'...'}}</span>
                            <div class="idol_desc">
                                <p><span style="text-align: left;margin-left: 10px;"><em>{{Number(idol.videoCount?idol.videoCount:0).toLocaleString()}}</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                <p><span><img src="/img/timeline_icon_coins.png"><em>{{Number(idol.gcoin?idol.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p>
                                <p><span><img src="/img/timeline_icon_likes.png"><em>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</em></span><i>{{activity.like}}</i></p>
                            </div>
                        </div>
                    </li>
                    <router-link to="/top10" class="reard_more">{{activity.more}}</router-link>
                </ul>
            </div>
            <ul class="activity_reward">
                <h4>{{activity.award}}</h4>
                <li>
                    <img src="/img/activity/icon_1.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[0].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p5}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p6}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p7}}</i></p>
                    </div>
                </li>
                <li>
                    <img src="/img/activity/icon_2.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[1].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p5}}</i></p>
                    </div>
                </li>
                <li>
                    <img src="/img/activity/icon_3.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[2].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p5}}</i></p>
                    </div>
                </li>
            </ul>
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
                me: {},
                idx: 0,
                idx2: 0,
                loadingShow: false,
                activity: {
                    theme:' ＃cosplayが大好き＃',
                    time: 'イベント期間',
                    start: '開始日時',
                    end: '終了日時',
                    rewardList: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    noRanking: '集計中',
                    award: '特典',
                    me: '自分の順位',
                    all: '全体ランキング',
                    more: 'もっと見る',
                    rule: {
                        title: 'ルール',
                        p1: '1.イベント期間自分の動画タイトルに、<i style="color: #fc4c86;">「＃cosplayが大好き」</i>をつけて、投稿しましょう。',
                        p2: '2.イベント期間に過ぎると、投稿に「＃cosplayが大好き」をつけても無効となります。',
                        p3: '3.イベント期間にアイドル1人は何回動画を投稿してもOK。',
                        p4: '4.参加アイドルが期間内、企画に動画を投稿し、全部の参加作品から獲得したLike、ギフティング等によって順位が決まります。'
                    },
                    rewards: [{
                        p1: '賞金20000円の贈呈。',
                        p2: '次の限定カテゴリキャンペーンのイメージキャラクターに起用されます。',
                        p3: 'アプリの起動画面に掲載されます（掲載期間は2日間となります）。',
                        p4: 'アプリのトップバナーに掲載されます。',
                        p5: 'Twitter、weibo公式アカウントに1位が発表されます。',
                        p6: '中国の人気サイトweiboで一番好評の参加投稿をトップに固定表示されます。さらにweiboやbilibiliに人気参加作品は発表されます。',
                        p7: '一番好評の参加投稿をGroupyのホームページのトップに掲載されます。'
                    }, {
                        p1: '賞金10000円の贈呈。',
                        p2: 'アプリの起動画面に掲載されます（掲載期間は1日となります）。',
                        p3: 'アプリのトップバナーに掲載されます。',
                        p4: 'Twitter、weibo公式アカウントに2位が発表されます。',
                        p5: '中国の人気サイトweibo、bilibiliに人気参加作品は発表されます。'
                    }, {
                        p1: '賞金5000円の贈呈。',
                        p2: 'アプリの起動画面に掲載されます（掲載期間は1日となります）。',
                        p3: 'アプリのトップバナーに掲載されます。',
                        p4: 'Twitter、weibo公式アカウントに3位が発表されます。',
                        p5: '中国の人気サイトweibo、bilibiliに人気参加作品は発表されます。'
                    }]
                }
            }
        },
        methods: {
          getList(token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/video/activityIdols',{
                    params: {
                        activityId:1000,
                        rows: 10
                    }
                }).then(function(res){
                    self.ranking = res.data.ranking;
                    self.me = res.data.self;
                    self.loadingShow = true;
                    console.log(self.ranking);
                    console.log(self.me);
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
          }
        },
        mounted() {
        },
        created() {
             let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 this.activity= {
                    theme:' #我爱装扮#',
                    time: '活动时间',
                    start: '开始',
                    end: '结束',
                    rewardList: ' 活动排名',
                    works: '参赛视频',
                    Gcoin: '获得G币',
                    like: '获得Like',
                    videos: '参加作品一覧',
                    noRanking: '暂无排名',
                    award: '活动奖励',
                    me: ' 我的排名',
                    all: '全部排名',
                    more: '查看更多',
                    rule: {
                        title: '参赛规则',
                        p1: '1.爱豆发布视频的时候，给视频手动填写标签#我爱装扮 即可参赛',
                        p2: '2.一个主题结束以后，即使爱豆添加该主题标签，也无法参赛，分数统计只在活动期间计算',
                        p3: '3.活动期间，爱豆可发布多个参赛视频',
                        p4: '4.活动根据爱豆参与活动的所有参赛视频的收获的人气汇总排名'
                    },
                    rewards: [{
                        p1: '获得奖励20000日元；',
                        p2: '代言下一个主题活动；',
                        p3: '在闪屏曝光2天；',
                        p4: '顶部Banner公布冠军曝光；',
                        p5: 'Twitter，weibo公布冠军曝光；',
                        p6: '微博置顶最高人气视频，微博，bilibili发布活动期间人气参赛视频；',
                        p7: '最高人气视频在Groupy置顶'
                    }, {
                        p1: '获得奖励10000日元；',
                        p2: '闪屏曝光1天',
                        p3: '顶部banner亚军公布曝光；',
                        p4: '微博，Twitter公布亚军曝光；',
                        p5: '微博，bilibili发布人气参赛视频'
                    }, {
                        p1: '获得奖励5000日元；',
                        p2: '闪屏曝光1天；',
                        p3: '顶部banner季军公布；',
                        p4: '微博，Twitter季军公布；',
                        p5: '微博，bilibili高人气参赛视频；'
                    }]
                }
              } else {
                this.activity= {
                    theme:' ＃cosplayが大好き＃',
                    time: 'イベント期間',
                    start: '開始日時',
                    end: '終了日時',
                    rewardList: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    noRanking: '集計中',
                    award: '特典',
                    me: '自分の順位',
                    all: '全体ランキング',
                    more: 'もっと見る',
                    rule: {
                        title: 'ルール',
                        p1: '1.イベント期間自分の動画タイトルに、<i style="color: #fc4c86;">「＃cosplayが大好き」</i>をつけて、投稿しましょう。',
                        p2: '2.イベント期間に過ぎると、投稿に「＃cosplayが大好き」をつけても無効となります。',
                        p3: '3.イベント期間にアイドル1人は何回動画を投稿してもOK。',
                        p4: '4.参加アイドルが期間内、企画に動画を投稿し、全部の参加作品から獲得したLike、ギフティング等によって順位が決まります。'
                    },
                    rewards: [{
                        p1: '賞金20000円の贈呈。',
                        p2: '次の限定カテゴリキャンペーンのイメージキャラクターに起用されます。',
                        p3: 'アプリの起動画面に掲載されます（掲載期間は2日間となります）。',
                        p4: 'アプリのトップバナーに掲載されます。',
                        p5: 'Twitter、weibo公式アカウントに1位が発表されます。',
                        p6: '中国の人気サイトweiboで一番好評の参加投稿をトップに固定表示されます。さらにweiboやbilibiliに人気参加作品は発表されます。',
                        p7: '一番好評の参加投稿をGroupyのホームページのトップに掲載されます。'
                    }, {
                        p1: '賞金10000円の贈呈。',
                        p2: 'アプリの起動画面に掲載されます（掲載期間は1日となります）。',
                        p3: 'アプリのトップバナーに掲載されます。',
                        p4: 'Twitter、weibo公式アカウントに2位が発表されます。',
                        p5: '中国の人気サイトweibo、bilibiliに人気参加作品は発表されます。'
                    }, {
                        p1: '賞金5000円の贈呈。',
                        p2: 'アプリの起動画面に掲載されます（掲載期間は1日となります）。',
                        p3: 'アプリのトップバナーに掲載されます。',
                        p4: 'Twitter、weibo公式アカウントに3位が発表されます。',
                        p5: '中国の人気サイトweibo、bilibiliに人気参加作品は発表されます。'
                    }]
                }
              }
            this.getList();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        background: #fff3f6;
        top: 0;
        height: 100vh;
        box-sizing: border-box;
        padding-bottom: 20px;       
    }
    .banner {
        width: 100%;
        display: block;
    }
    h2 {
        background: #E493A5;
        color: #fff;
        font-size: 16px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-weight: 100;
    }
    h4 {
        display: inline-block;
        background-image: linear-gradient(150deg, #FF92AA 0%, #EE538A 100%);
        border-radius: 1px 35px 35px 1px;
        line-height: 27px;
        color: #fff;
        padding-left: 12px;
        padding-right: 19px;
        margin-top: 13.5px;
    }
    .duration_time {
        overflow: hidden;
        display: flex;
        box-sizing: border-box;
        margin: 0 12px;
        padding: 13px 0;
        opacity: 0.8;
        border-bottom: #FC4083 solid 1px;
        p {
            flex: 1;
            span {
                font-size: 10px;
                display: inline-block;
                padding: 0 3px;
                font-weight: 100;
                -webkit-transform: scale(0.8);
                color: #fff;
                background: #42C8E4;
                border-radius: 2px;
                margin-right: 28px;
                vertical-align: middle;
            }
            i {
                font-size: 16px;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    .activity_rule {
        padding-bottom: 8px;
        p {
            padding: 12px 12px 0;
            box-sizing: border-box;
            font-size: 14px;
            line-height: 20px;
            i {
                color: #fc4c86;
            }
        }
    }
    .activity_ranking {
        font-size: 14px;
        >p {
            padding-left: 12px;
            padding-top: 12px;
            color: #999;
        }
        .ranking_list {
            padding: 12px 12px 0;
            text-align: center;
            h5 {
                color: #999;
                text-align: left;
            }
            li {
                text-align: left;
                overflow: hidden;
                border-bottom: 1px solid #eee;
                padding: 10px 0;
                >* {
                    float: left;
                }
                >span {
                    font-family: 'Helvetica Condensed Bold Italic';
                    font-size: 24px;
                    margin-top: 15px;
                    display: inline-block;
                    width: 28px;
                    // text-align: center;
                }
                >span.first {
                    color: #F3B714;
                }
                >span.second {
                    color: #888;
                }
                >span.three {
                    color: #FF8500;
                }
                >.img_content {
                    width: 50px;
                    position: relative;
                    padding-top: 9px;
                    padding-left: 4px;
                    margin-right: calc(100vw * 0.04);
                    img.avatar {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        border: 1px solid #888;
                    }
                    img.crown {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 25px;
                    }

                }
                .idol_content {
                    overflow: hidden;
                    width: 63vw;
                    >span {
                        display: block;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        font-weight: 600;
                        color: #666;
                    }
                    .idol_desc {
                        display: flex;
                        p {
                            flex: 1;
                            text-align: left;
                            >span {
                                display: block;
                                text-align: center;
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
                                    max-width: calc(100% - 18px);
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                            }
                            i {
                                color: #999;
                                display: block;
                                font-size: 10px;
                                text-align: center;
                                -webkit-transform: scale(0.8);
                            }
                        }
                    }
                }
            }
            .reard_more {
                text-align: center;
                text-decoration: underline;
                color: #666;
                font-size: 14px;
                display: inline-block;
                padding: 12px 0 0;
            }
        }
    }
    .activity_reward {
        li {
            overflow: hidden;
            background: #F9EDEF;
            border: 1px solid #F5D9DE;
            border-radius: 2px;
            margin: 12px 12px 0;
            padding: 12px;
            >img {
                vertical-align: middle;
                width: 54px;
            }
            .reward_desc {
                display: inline-block;
                vertical-align: middle;
                margin-left: 3px;
                width: calc(100% - 62px);
                p {
                    overflow: hidden;
                    line-height: 20px;
                    span {
                        display: inline-block;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background: #FABC01;
                        float: left;
                        margin-right: 8px;
                        margin-top: 8px;
                    }
                    i {
                        float: left;
                        display: inline-block;
                        width: calc(100% - 12px);
                    }
                }
            }
        }
        li:nth-child(3) {
            .reward_desc p span {
                background: #BBBBBB;
            }
        }
        li:nth-child(4) {
            .reward_desc p span {
                background: #F5966D;
            }
        }
    }
    .none_loading {
        transition: all 0.3s;
        opacity: 0.7;
        overflow: hidden;
    }
    .none_loading_show {
        opacity: 0;
        height: 0;
    }
</style>