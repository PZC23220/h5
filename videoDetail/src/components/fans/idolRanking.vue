<template>
    <div class="main">
        <div class="content">
            <scroller ref="my_scroller" class="my-scroller"
              :on-refresh="refresh"
              :on-infinite="infinite"
              :noDataText="rakingList.length>0? '全て表示されました':''">
                <div class="not_concerned" v-if="me.length==0"><img src="../../images/banner.png" alt=""></div>
                <div class="concerned" v-if="me.length > 0">
                    <h3 class="title">{{idol_text.me}}</h3>
                    <div class="idol_detail" v-for="(idol,key) in me" @click="idol.idolId?showIdolPage(idol.idolId):false">
                        <div class="idol_content">
                            <i :class="[{'sizeTwo': idol.position > 8},{'sizeThree': idol.position > 98}]">{{idol.position}}</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="idol.avatar?idol.avatar:'/static/images/default_img.png'" class="avatar" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                    <img v-if="idol.position < 4" :src="'/static/images/icon_crown_'+idol.position+'.png'" class="crown" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{idol.name?idol.name:'...'}}</p>
                                    <p class="signature">{{idol.introduce?idol.introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{Number(idol.popularity).toLocaleString()}}</span><span><img src="../../images/icon_fans.png" alt="">{{Number(idol.fansNums).toLocaleString()}}</span></p>
                                </div>
                                <div class="support" @click="idol.idolId?support(idol.idolId):false">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list fans_show" :class="{'fans_none': meFans.length>0}">{{idol_text.fans}}<div class="no_fans">{{idol_text.no1}}</div></div>
                        <div class="fans_list"  v-for="fans in meFans" v-if="fans.id == idol.idolId">{{idol_text.fans}}<div class="fans_imgList"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in fans.topFans"></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                        <div class="border_bottom" v-if="key < me.length-1"></div>
                    </div>
                </div>
                <div class="idol_all" v-if="top3None ==false">
                    <h3 class="title" v-if="me.length>0">{{idol_text.all}}</h3>
                    <div class="page_none con_left" :class="{'fans_none': rakingList.length>0}">
                        <div class="idol_detail">
                            <div class="idol_content">
                                <i class="_fir">1</i>
                                <div class="idol_border">
                                    <div class="avatar_content">
                                        <img src="/static/images/default_img.png" class="avatar" alt="">
                                        <img src="../../images/icon_crown_1.png" class="crown" alt="">
                                    </div>
                                    <div class="introduction">
                                        <p class="name">...</p>
                                        <p class="signature">{{idol_text.none}}</p>
                                        <p class="detail"><span><img src="../../images/icon_likes.png" alt="">0</span><span><img src="../../images/icon_fans.png" alt="">0</span></p>
                                    </div>
                                    <div class="support">{{idol_text.support}}</div>
                                </div>
                            </div>
                            <div class="fans_list">{{idol_text.fans}}<div class="no_fans">{{idol_text.no1}}</div></div>
                        </div>
                        <div class="idol_detail">
                            <div class="idol_content">
                                <i class="_sec">2</i>
                                <div class="idol_border">
                                    <div class="avatar_content">
                                        <img src="/static/images/default_img.png" class="avatar" alt="">
                                        <img src="../../images/icon_crown_2.png" class="crown" alt="">
                                    </div>
                                    <div class="introduction">
                                        <p class="name">...</p>
                                        <p class="signature">{{idol_text.none}}</p>
                                        <p class="detail"><span><img src="../../images/icon_likes.png" alt="">0</span><span><img src="../../images/icon_fans.png" alt="">0</span></p>
                                    </div>
                                    <div class="support">{{idol_text.support}}</div>
                                </div>
                            </div>
                            <div class="fans_list">{{idol_text.fans}}<div class="no_fans">{{idol_text.no1}}</div></div>
                        </div>
                        <div class="idol_detail">
                            <div class="idol_content">
                                <i class="_thr">3</i>
                                <div class="idol_border">
                                    <div class="avatar_content">
                                        <img src="/static/images/default_img.png" class="avatar" alt="">
                                        <img src="../../images/icon_crown_3.png" class="crown" alt="">
                                    </div>
                                    <div class="introduction">
                                        <p class="name">...</p>
                                        <p class="signature">{{idol_text.none}}</p>
                                        <p class="detail"><span><img src="../../images/icon_likes.png" alt="">0</span><span><img src="../../images/icon_fans.png" alt="">0</span></p>
                                    </div>
                                    <div class="support">{{idol_text.support}}</div>
                                </div>
                            </div>
                            <div class="fans_list">{{idol_text.fans}}<div class="no_fans">{{idol_text.no1}}</div></div>
                        </div>
                    </div>
                    <div class="idol_detail" v-for="(idol,key) in rakingList" v-if="rakingList.length>0?key < len: false" @click="idol.idolId?showIdolPage(idol.idolId):false">
                        <div class="idol_content">
                            <i :class="[{'sizeTwo': key > 8},{'sizeThree': key > 98},{'_fir': key == 0},{'_sec': key == 1},{'_thr': key == 2}]">{{idol.position}}</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="idol.avatar?idol.avatar:'/static/images/default_img.png'" class="avatar" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                    <img src="../../images/icon_crown_1.png" class="crown" v-if="key == 0" alt="">
                                    <img src="../../images/icon_crown_2.png" class="crown" v-if="key == 1" alt="">
                                    <img src="../../images/icon_crown_3.png" class="crown" v-if="key == 2" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{idol.name?idol.name:'...'}}</p>
                                    <p class="signature">{{idol.introduce?idol.introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{idol.popularity?Number(idol.popularity).toLocaleString():'3'}}</span><span><img src="../../images/icon_fans.png" alt="">{{idol.fansNums?Number(idol.fansNums).toLocaleString():'0'}}</span></p>
                                </div>
                                <div class="support" @click="support(idol.idolId?idol.idolId:'')">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list fans_show" :class="{'fans_none': allFans.length>0}">{{idol_text.fans}}<div class="no_fans">{{idol_text.no1}}</div></div>
                        <div class="fans_list"  v-for="fans in allFans" v-if="fans.id == idol.idolId">{{idol_text.fans}}<div class="fans_imgList"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in fans.topFans"></div><div class="no_fans" v-if="fans.topFans.length == 0">{{idol_text.no1}}</div></div>
                        <div class="border_bottom"></div>
                    </div>
                </div>
                <div class="default_page" v-if="top3None">
                    <img src="../../images/default_no message.png" alt="">
                    <p v-html="idol_text.noneIdol"></p>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import VueScroller from 'vue-scroller';
    import http from '@env/http.js';
    export default {
        data() {
            return {
                rakingList: [],
                me: [],
                loadingBig: true,
                len:20,
                start: 0,
                num: 20,
                idol_text: {
                    me: 'お気に入り',
                    all: '全体ランキング',
                    fans: 'ファンランキング',
                    support: '応援',
                    no1: 'No.1になって目立とう！',
                    none: 'Groupyで待ってまーす。',
                    noneIdol: 'ただ今集計中です'
                },
                top3None: false,
                allFans: [],
                meFans: []
            }
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active')
            this.swiper.slideTo(val, 500, false)
          },
          showIdolPage(val) {
            console.log(val)
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showIdolPage', {'idolId': val})
            })
          },
          formatTime(key) {
              let timer = new Date(key);
              return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
          },
          getRanking() {
            let self = this;
            if(self.$route.query.token) {
                http.defaults.headers.common['Authorization'] = 'Token ' + self.$route.query.token;
            }
            http.get('/ranking/idolsFromFans',{
                params: {
                    filter: this.$route.query.filter
                }
            }).then(function(res){
                self.loadingBig = false;
                let allFansList = [],meFansList = [];
                if(res.data) {
                    if(!res.data.rankingList) {
                        self.top3None = true;
                    }else {
                        self.rakingList = res.data.rankingList;
                        for(var i=0;i<self.rakingList.length;i++) {
                            allFansList.push(self.rakingList[i].idolId);
                        }
                        self.getFansList(allFansList,'all')
                    }
                    if(res.data.me) {
                        self.me = res.data.me;
                        for(var j=0;j<self.me.length;j++) {
                            meFansList.push(self.me[j].idolId);
                        }
                        self.getFansList(meFansList,'me')
                    }
                    console.log(self.rakingList);
                    console.log(self.me);
                }
            })
          },
          getFansList(_val,arr) {
            let self = this;
            http.post('/groupyuser/idolTopFans',{
                idolIds: _val
            }).then(function(res){
                if(res.data.length > 0) {
                    if(arr == 'all') {
                        self.allFans = res.data;
                        console.log(self.allFans);
                    }else {
                        self.meFans = res.data;
                        console.log(self.allFans);
                    }
                }
            })
          },
          refresh (done) {
            var self = this;
            setTimeout(() => {
              self.getRanking();
              done()
            }, 500)
          },

          infinite (done) {
            var self = this;
            if(self.rakingList) {
               if (self.rakingList.length < self.len) {
                  setTimeout(() => {
                    done(true)
                  }, 500)
                  return;
                } else {
                    setTimeout(() => {
                      self.len += 20;
                      done()
                    }, 500)
                }
            }else {
              setTimeout(() => {
                done(true)
              }, 500)
              return;
            }
          },
          support(val) {
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('send_gift', {'context':'0','idol_id':val}, function responseCallback(responseData) {
                    self.getRanking();
                })
            })
            return;
          }
        },
        mounted() {
            var self = this;
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('ranking_refresh', function() {
                    self.getRanking();
                })
            });
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 this.idol_text= {
                    me: '我关注的爱豆',
                    all: ' 全部爱豆',
                    fans: ' 粉丝排行',
                    support: '应援',
                    no1: '赶紧来抢占第一位吧！',
                    none: '我在groupy等你哦!',
                    noneIdol: '还没有爱豆的排名'
                }
              } else {
                this.idol_text= {
                    me: 'お気に入り',
                    all: '全体ランキング',
                    fans: 'ファンランキング',
                    support: '応援',
                    no1: 'No.1になって目立とう！',
                    none: 'Groupyで待ってまーす。',
                    noneIdol: 'ただ今集計中です'
                }
              }
            this.getRanking();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   @font-face {
      font-family: 'Helvetica Condensed Bold Italic';
      src: url('../../font/Helvetica Condensed Bold Italic.eot');
      src: url('../../font/Helvetica Condensed Bold Italic.woff2') format('woff2'),
           url('../../font/Helvetica Condensed Bold Italic.eot?#iefix') format('embedded-opentype');
    }
    .content {
        top: 0;
        height: 100vh;
    }
    h3.title {
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        color: #999999;
        background: #eee;
        padding-left: 12px;
        box-sizing: border-box;
    }
    .not_concerned {
        width: 100%;
        border-bottom: 4px #eee solid;
        box-sizing: border-box;
        img {
            width: 100%;
            display: block;
        }
    }
    .border_bottom {
        border-bottom: 4px #eee solid;
    }
    .idol_detail {
        color: #666;
    }
    .avatar_content {
        overflow: hidden;
        float: left;
        position: relative;
        padding: 8px 0 0 4px;
        .crown {
            position: absolute;
            left: 0;
            top: 0;
            width: 25px;
        }
    }
    .idol_content {
        margin: 12px 0 0 12px;
        box-sizing: border-box;
        overflow: hidden;
        >* {
            float: left;
        }
        i {
            font-family: 'Helvetica Condensed Bold Italic';
            font-size: 24px;
            color: #BBBBBB;
            margin-top: 14px;
            width: 20px;
            text-align: left;
        }
        ._fir {
            color: #F3B714;
        }
        ._sec {
            color: #888;
        }
        ._thr {
            color: #FF8500;
        }
        .sizeTwo {
            font-size: 18px;
        }
        .sizeThree {
            font-size: 10px;
            -webkit-transform: scalc(0.8);
            margin-top: 24px;
        }
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 6px;
            float: left;
            display: block;
        }
        .idol_border {
            border-bottom: 1px #eee solid;
            overflow: hidden;
            // padding-right: 12px;
            width: calc(100vw - 44px);
            padding-bottom: 5px;
        }
        .introduction {
            width: calc(100vw - 204px);
            float: left;
            .name {
                font-size: 14px;
                text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
            }
            .signature {
                font-size: 10.5px;
                -webkit-transform: scale(0.8);
                margin-left: -18px;
                text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
            }
            .detail {
                font-size: 12px;
                span {
                    img {
                        width: 20px;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                }
                span:first-child {
                    margin-right: 22.4%;
                }
            }
        }
        .support {
            float: left;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #00B4BC;
            float: right;
            border: 1.5px solid #00B4BC;
            border-radius: 27px;
            margin-top: 8px;
        }
    }
    .fans_list {
        padding: 8px 0 8px 34px;
        img {
            margin-left: 4px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            vertical-align: middle;
        }
        img:nth-child(1) {
            margin-left: 9px;
        }
        .no_fans {
            font-size: 10px;
            -webkit-transform: scale(0.8);
            display: inline-block;
        }
        .fans_imgList {
            display: inline-block;
        }
    }
    .con_left {
        opacity: 0.2;
        transition: opacity 0.3s;
     }
    .left_show {
        opacity: 1;
    }
    .fans_show {
        padding: 0;
        padding-left: 34px;
        height: 41px;
        transition: opacity 0.3s;
        opacity: 0.2;
        line-height: 41px;
    }
    .fans_none {
        opacity: 0;
        height: 0;
    }
</style>