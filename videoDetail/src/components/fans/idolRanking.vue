<template>
    <div class="main">
        <div class="content">
            <scroller ref="my_scroller" class="my-scroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
                <div class="not_concerned" v-if="!rakingList.me"><img src="../../images/banner.png" alt=""></div>
                <div class="concerned" v-if="rakingList.me">
                    <h3 class="title">{{idol_text.me}}</h3>
                    <div class="idol_detail" v-for="(idol,key) in rakingList.me">
                        <div class="idol_content">
                            <i :class="[{'sizeTwo': idol.position > 8},{'sizeThree': idol.position > 98}]">{{idol.position}}</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="idol.avatar?idol.avatar:'/static/images/default_img.png'" class="avatar" @click="idol.idolId?showIdolPage(idol.idolId):false" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                    <img v-if="idol.position < 4" :src="'/static/images/icon_crown_'+idol.position+'.png'" class="crown" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{idol.name?idol.name:'...'}}</p>
                                    <p class="signature">{{idol.introduce?idol.introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{Number(idol.popularity).toLocaleString()}}</span><span><img src="../../images/icon_fans.png" alt="">{{Number(idol.fansNums).toLocaleString()}}</span></p>
                                </div>
                                <div class="support" @click="support(idol.idolId)">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list">{{idol_text.fans}}<div class="fans_imgList" v-if="idol.fansList?idol.fansList.length>0:false"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in idol.fansList"></div><div class="no_fans" v-if="!idol.fansList">{{idol_text.no1}}</div></div>
                        <div class="border_bottom" v-if="key < rakingList.me.length-1"></div>
                    </div>
                </div>
                <div class="idol_all">
                    <h3 class="title" v-if="rakingList.me">{{idol_text.all}}</h3>
                    <div class="idol_detail con_left" :class="{'left_show': rakingList.rankingList?rakingList.rankingList.length>0:false}">
                        <div class="idol_content">
                            <i class="_fir">1</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="rakingList.rankingList?(rakingList.rankingList[0].avatar?rakingList.rankingList[0].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" class="avatar" @click="rakingList.rankingList?(rakingList.rankingList[0].idolId?showIdolPage(rakingList.rankingList[0].idolId):false):false" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                    <img src="../../images/icon_crown_1.png" class="crown" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{rakingList.rankingList?rakingList.rankingList[0].name:'...'}}</p>
                                    <p class="signature">{{rakingList.rankingList?rakingList.rankingList[0].introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[0].popularity).toLocaleString():'0'}}</span><span><img src="../../images/icon_fans.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[0].fansNums).toLocaleString():'0'}}</span></p>
                                </div>
                                <div class="support" @click="support(rakingList.rankingList?rakingList.rankingList[0].idolId:'')">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list">{{idol_text.fans}}<div class="fans_imgList" v-if="rakingList.rankingList?rakingList.rankingList[0].fansList:false"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in rakingList.rankingList[0].fansList"></div><div class="no_fans" v-if="rakingList.rankingList?(!rakingList.rankingList[0].fansList || rakingList.rankingList[0].fansList.length < 1):true">{{idol_text.no1}}</div></div>
                        <div class="border_bottom"></div>
                    </div>
                    <div class="idol_detail con_left" :class="{'left_show': rakingList.rankingList?rakingList.rankingList.length>1:false}">
                        <div class="idol_content">
                            <i class="_sec">2</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="rakingList.rankingList?(rakingList.rankingList[1].avatar?rakingList.rankingList[1].avatar:'http://h5.groupy.vip/static/images/default_img.png'):'/static/images/default_img.png'" class="avatar"  @click="rakingList.rankingList?(rakingList.rankingList[1].idolId?showIdolPage(rakingList.rankingList[1].idolId):false):false" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                    <img src="../../images/icon_crown_2.png" class="crown" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{rakingList.rankingList?rakingList.rankingList[1].name:'...'}}</p>
                                    <p class="signature">{{rakingList.rankingList?rakingList.rankingList[1].introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[1].popularity).toLocaleString():'0'}}</span><span><img src="../../images/icon_fans.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[1].fansNums).toLocaleString():'0'}}</span></p>
                                </div>
                                <div class="support" @click="support(rakingList.rankingList?rakingList.rankingList[1].idolId:'')">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list">{{idol_text.fans}}<div class="fans_imgList" v-if="rakingList.rankingList?rakingList.rankingList[1].fansList:false"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in rakingList.rankingList[1].fansList"></div><div class="no_fans" v-if="rakingList.rankingList?(!rakingList.rankingList[1].fansList || rakingList.rankingList[1].fansList.length <1):true">{{idol_text.no1}}</div></div>
                        <div class="border_bottom"></div>
                    </div>
                    <div class="idol_detail con_left" :class="{'left_show': rakingList.rankingList?rakingList.rankingList.length>2:false}">
                        <div class="idol_content">
                            <i class="_thr">3</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="rakingList.rankingList?(rakingList.rankingList[2].avatar?rakingList.rankingList[2].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" class="avatar"  @click="rakingList.rankingList?(rakingList.rankingList[2].idolId?showIdolPage(rakingList.rankingList[2].idolId):false):false" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                    <img src="../../images/icon_crown_3.png" class="crown" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{rakingList.rankingList?rakingList.rankingList[2].name:'...'}}</p>
                                    <p class="signature">{{rakingList.rankingList?rakingList.rankingList[2].introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[2].popularity).toLocaleString():'0'}}</span><span><img src="../../images/icon_fans.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[2].fansNums).toLocaleString():'0'}}</span></p>
                                </div>
                                <div class="support" @click="support(rakingList.rankingList?rakingList.rankingList[2].idolId:'')">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list">{{idol_text.fans}}<div class="fans_imgList" v-if="rakingList.rankingList?rakingList.rankingList[2].fansList:false"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in rakingList.rankingList[2].fansList"></div><div class="no_fans" v-if="rakingList.rankingList?(!rakingList.rankingList[2].fansList || rakingList.rankingList[2].fansList.length <1):true">{{idol_text.no1}}</div></div>
                        <div class="border_bottom"></div>
                    </div>
                    <div class="idol_detail con_left" :class="{'left_show': rakingList.rankingList?rakingList.rankingList.length>3:false}">
                        <div class="idol_content">
                            <i>4</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="rakingList.rankingList?(rakingList.rankingList[3].avatar?rakingList.rankingList[3].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" class="avatar"  @click="rakingList.rankingList?(rakingList.rankingList[3].idolId?showIdolPage(rakingList.rankingList[3].idolId):false):false" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{rakingList.rankingList?rakingList.rankingList[3].name:'...'}}</p>
                                    <p class="signature">{{rakingList.rankingList?rakingList.rankingList[3].introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[3].popularity).toLocaleString():'0'}}</span><span><img src="../../images/icon_fans.png" alt="">{{rakingList.rankingList?Number(rakingList.rankingList[3].fansNums).toLocaleString():'0'}}</span></p>
                                </div>
                                <div class="support" @click="support(rakingList.rankingList?rakingList.rankingList[3].idolId:'')">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list">{{idol_text.fans}}<div class="fans_imgList" v-if="rakingList.rankingList?rakingList.rankingList[3].fansList:false"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in rakingList.rankingList[3].fansList"></div><div class="no_fans" v-if="rakingList.rankingList?(!rakingList.rankingList[3].fansList || rakingList.rankingList[3].fansList.length < 1):true">{{idol_text.no1}}</div></div>
                        <div class="border_bottom"></div>
                    </div>
                    <div class="idol_detail" v-for="(idol,key) in rakingList.rankingList" v-if="rakingList.rankingList?key > 3 && key < len: false">
                        <div class="idol_content">
                            <i :class="[{'sizeTwo': key > 8},{'sizeThree': key > 98}]">{{idol.position}}</i>
                            <div class="idol_border">
                                <div class="avatar_content">
                                    <img :src="idol.avatar?idol.avatar:'/static/images/default_img.png'" class="avatar" @click="idol.idolId?showIdolPage(idol.idolId):false" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                                </div>
                                <div class="introduction">
                                    <p class="name">{{idol.name?idol.name:'...'}}</p>
                                    <p class="signature">{{idol.introduce?idol.introduce:idol_text.none}}</p>
                                    <p class="detail"><span><img src="../../images/icon_likes.png" alt="">{{idol.popularity?Number(idol.popularity).toLocaleString():'3'}}</span><span><img src="../../images/icon_fans.png" alt="">{{idol.fansNums?Number(idol.fansNums).toLocaleString():'0'}}</span></p>
                                </div>
                                <div class="support" @click="support(idol.idolId?idol.idolId:'')">{{idol_text.support}}</div>
                            </div>
                        </div>
                        <div class="fans_list">{{idol_text.fans}}<div class="fans_imgList" v-if="idol.fansList?idol.fansList.length>0:false"><img :src="img.avatar?img.avatar:'http://h5.groupy.vip/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" v-for="img in idol.fansList"></div><div class="no_fans" v-if="(!idol.fansList || idol.fansList.length < 1)">{{idol_text.no1}}</div></div>
                        <div class="border_bottom"></div>
                    </div>
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
                rakingList: {},
                loadingBig: true,
                len:20,
                idol_text: {
                    me: 'お気に入り',
                    all: '全体ランキング',
                    fans: 'ファンランキング',
                    support: '応援',
                    no1: 'No.1になって目立とう！',
                    none: 'Groupyで待ってまーす。'
                },
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
          getRanking(token) {
            let self = this;
            // if(token) {
            //     http.defaults.headers.common['Authorization'] = 'Token '+token;
            // }else {
            //     http.defaults.headers.common['Authorization'] = 'Token ' + self.$route.query.token;
            // }
            http.get('/ranking/idolsFromFans',{
                params: {
                    filter: this.$route.query.filter
                }
            }).then(function(res){
                self.loadingBig = false;
                if(res.status == 200) {
                    self.rakingList = res.data;
                    console.log(self.rakingList)
                }
                // else {
                //     window.setupWebViewJavascriptBridge(function(bridge) {
                //         bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                //             self.getRanking(responseData.token);
                //         })
                //     })
                // }
            })
            // .catch(function(err){
            //     window.setupWebViewJavascriptBridge(function(bridge) {
            //         bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
            //             self.getRanking(responseData.token);
            //         })
            //     })
            // });
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
            if(self.rakingList.rankingList) {
               if (self.rakingList.rankingList.length < self.len) {
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
          support() {
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('send_gift', {'context':'0','idol_id':1}, function responseCallback(responseData) {
                    self.getRanking();
                })
            })
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
                    none: '我在groupy等你哦!'
                }
              } else {
                this.idol_text= {
                    me: 'お気に入り',
                    all: '全体ランキング',
                    fans: 'ファンランキング',
                    support: '応援',
                    no1: 'No.1になって目立とう！',
                    none: 'Groupyで待ってまーす。'
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
            text-align: center;
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
</style>