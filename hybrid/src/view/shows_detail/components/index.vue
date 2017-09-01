<template>
    <div class="main">
        <div class="content" :class="{'bottom':applyInfo.id}">
            <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                <div class="idolInfo eBorder">
                    <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" class="avatar">
                    <p>
                        <span><i class="idol_name">...</i>  がイベントを登録した</span>
                        <span>@Groupy</span>
                    </p>
                </div>
                <ul class="shows_detail">
                    <li>
                        <p class="shows_name">@Groupy</p>
                        <p class="shows_time"><span>--.-- --</span><span><img src="http://h2.groupy.vip/groupy_h5/icon/icon_time.png">開場--:--/開演--:--</span></p>
                    </li>
                    <li>
                        <h5 class="li_title">出演者</h5>
                        <p class="show_groups">@Groupy</p>
                    </li>
                    <li>
                        <h5 class="li_title">料金</h5>
                        <p>Groupyで予約 <i>0</i>円/当日 0円(+1D)</p>
                    </li>
                    <li>
                        <h5 class="li_title">会場</h5>
                        <p>@Groupy</p>
                    </li>
                    <li>
                        <h5 class="li_title">説明</h5>
                        <div class="shows_info">
                            <span>@Groupy</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="idolInfo eBorder" v-if="loadingBig == false">
                <img v-lazy="idolInfo.avatar" class="avatar">
                <p>
                    <span :class="{'once': !organization.name}"><i class="idol_name">{{idolInfo.nickname?idolInfo.nickname:'...'}}</i>  がイベントを登録した</span>
                    <span v-show="organization.name">{{organization.name}}</span>
                </p>
            </div>
            <div class="mine_info" v-if="applyInfo.id">
                <div class="info_content">
                    <h5 class="li_title">Groupyで予約</h5>
                    <p>{{applyInfo.firstName}}  {{applyInfo.lastName}}</p>
                    <span><i>{{applyInfo.nums}}</i>枚予約した | {{applyInfo.email}}</span>
                </div>
                <img src="http://h3.groupy.vip/groupy_h5/banner_bg/bg_booked_750.png">
            </div>
            <ul class="shows_detail" v-if="loadingBig == false">
                <li>
                    <p class="shows_name">{{showsInfo.title}}</p>
                    <p class="shows_time"><span>{{showsInfo.startTime?formatTime(showsInfo.startTime,'MM.dd'):'--.--'}} {{showsInfo.startTime?formatDay(showsInfo.startTime):'--'}}</span><span><img src="http://h2.groupy.vip/groupy_h5/icon/icon_time.png">開場{{showsInfo.startTime?formatTime(showsInfo.startTime,'hh:mm'):'--:--'}}/開演{{showsInfo.showTime?formatTime(showsInfo.showTime,'hh:mm'):'--:--'}}</span></p>
                </li>
                <li v-if="showsInfo.groups">
                    <h5 class="li_title">出演者</h5>
                    <p class="show_groups">{{showsInfo.groups}}</p>
                </li>
                <li>
                    <h5 class="li_title">料金</h5>
                    <p>Groupyで予約 <i>{{Number(showsInfo.presellPrice?showsInfo.presellPrice:0).toLocaleString()}}</i>円/当日 {{Number(showsInfo.officialPrice?showsInfo.officialPrice:0).toLocaleString()}}円<em v-if="showsInfo.drinkNums">(+{{showsInfo.drinkNums}}D)</em></p>
                </li>
                <li v-if="showsInfo.location">
                    <h5 class="li_title">会場</h5>
                    <p>{{showsInfo.location}}</p>
                </li>
                <li v-if="showsInfo.introduce">
                    <h5 class="li_title">説明</h5>
                    <div class="shows_info">
                        <span>{{showsInfo.introduce}}</span>
                        <p v-if="showsInfo.imgs">
                            <span v-for="(img,idx) in changeURL(showsInfo.imgs)" :class="{'once':showsInfo.imgs.length == 1}"><img :src="img" @click="showBigImg(showsInfo.imgs,idx)"></span>
                            <!-- <span><img src=""></span>
                            <span><img src=""></span> -->
                        </p>
                    </div>
                </li>
                <li>
                    <h5 class="li_title">{{fansList.length}}人予約した</h5>
                    <div class="fans_list">
                        <p v-for="fans in fansList">
                            <img v-lazy="fans.avatar" class="avatar">
                            <span class="idol_name">{{fans.nickname?fans.nickname:'...'}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer" @click="reservationShow_fun()" v-if="!applyInfo.id && loadingBig ==false && appIdol == false">予約する</div>
        <div class="footer" @click="editShow()" v-if="!applyInfo.id && loadingBig ==false && appIdol">編集</div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            reservationShow: false,
            toastShow: false,
            appIdol: false,
            loadingBig: true,
            forms: {
               firstName: '',
               lastName: '',
               email: '',
               nums: '',
               showsId:''
            },
            fansList: [],
            applyInfo: {},
            showsInfo: {},
            organization: {},
            idolInfo: {},
            canPush: false,
            idx: 0,
          }
        },
        methods: {
            formatTime(key,type) {
                let timer = new Date(key);
                return timer.Format(type);
            },
            formatDay(key) {
                let timer = new Date(key).getDay();
                var str;
                switch (timer) {  
                    case 0 :  
                            str = "日";  
                            break;  
                    case 1 :  
                            str = "月";  
                            break;  
                    case 2 :  
                            str = "火";  
                            break;  
                    case 3 :  
                            str = "水";  
                            break;  
                    case 4 :  
                            str = "木";  
                            break;  
                    case 5 :  
                            str = "金";  
                            break;  
                    case 6 :  
                            str = "土";  
                            break;  
                }
                return  str;
            },
            showBigImg(val,idx) {
                var url = this.changeURL(val);
                console.log(url,idx)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showImage', {'urls': url,selectedIndex :idx})
                })
            },
            changeURL(val) {
                if(val) {
                    var str = JSON.stringify(val);
                    var len = str.length;
                    var str2 = str.slice(1,len-1);
                    let arr = [];
                    arr = str2.split(',');
                    return arr;
                }
            },
            getShows() {
                var self = this;
                let token_ = getParams('token');
                if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token '+token_;
                }
                http.get('/shows/detail',{
                    params: {
                        showsId: getParams('showsId')
                    }
                }).then(function(res){
                    console.log(res.data);
                    self.loadingBig = false;
                    self.showsInfo = res.data;
                    if(res.data.fansList){
                        self.fansList = res.data.fansList;
                    }
                    if(res.data.applyInfo) {
                        self.applyInfo = res.data.applyInfo;
                    }
                    if(res.data.idolInfo) {
                        self.idolInfo = res.data.idolInfo;
                        if(res.data.idolInfo.organization) {
                            self.organization = res.data.idolInfo.organization;
                        }
                    }
                }).catch(function(err){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                         if(_lan === 'zh-cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                         }
                    })
                });
            },
            updateStyle() {
                if(this.forms.firstName && this.forms.lastName && this.forms.email && this.forms.nums) {
                    return this.canPush = true;
                }else {
                    return this.canPush = false;
                }
            },
            pushOrder(token) {
                var self = this;
                console.log(self.canPush)
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                    self.tokens = token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token '+token_;
                }
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                self.forms.showsId = self.showsInfo.id;
                if(self.canPush) {
                    if(self.idx < 2) {
                        http.post('/shows/apply',JSON.stringify(self.forms)).then(function(res){
                            console.log(res);
                            if(res.status == 200) {
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                    if(_lan === 'zh-cn') {
                                        bridge.callHandler('makeToast', '预约成功');
                                     }else {
                                        bridge.callHandler('makeToast', '预约成功');
                                     }
                                })
                            }else {
                                self.idx++;
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                    bridge.callHandler('getToken', {'targetType':'1','targetId':'1'}, function responseCallback(responseData) {
                                        self.pushOrder(responseData.token);
                                    })
                                })
                            }
                        }).catch(function(err){
                            self.idx++;
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                    bridge.callHandler('getToken', {'targetType':'1','targetId':'1'}, function responseCallback(responseData) {
                                        self.pushOrder(responseData.token);
                                    })
                                })
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
                }
            },
            reservationShow_fun() {
                var self = this;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('book', {'showsId':self.showsInfo.id})
                })
            },
            editShow() {
                var self = this;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('editShow', {'showsInfo':self.showsInfo})
                })
            }
        },
        mounted() {
        },
        computed: {
        },
        created() {
            this.getShows();
            if(getParams('app') == 'idol') {
                this.appIdol = true;
            }
        }
      }
</script>

<style scoped lang="scss">
    .page_defalt {
        opacity: 0.4;
        transition: all 0.3s;
        overflow:hidden;
        width: 100%;
        height: 100vh;
    }
    .page_defalt_none {
        opacity:0;
        height: 0;
        border: none;
    }

    .footer {
        background: #00B4BB;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        height: 48px;
        font-weight: 600;
        line-height: 48px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .reservation {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: #fff;
        z-index: 3;
        .r_header {
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #eee;
            font-size: 16px;
            color: #666;
            text-align: center;
            >img {
                float: left;
                width: 25px;
                padding: 12px;
            }
            >span {
                float: right;
                padding-right: 12px;
                padding-left: 20px;
                color: #FC4083;
                opacity: 0.5;
            }
            span.active {
                opacity: 1;
            }
        }
        >p {
            height: 60px;
            line-height: 60px;
            border-bottom: 1px #eee solid;
            padding: 0 12px;
            font-size: 16px;
            >span {
                font-weight: 600;
            }
            input {
                float: right;
                height: 60px;
                line-height: 60px;
                width: calc(100vw - 70px);
                max-width: calc(500px - 70px);
                text-align: right;
                font-size: 16px;
            }
            >i {
                float: right;
                color: #999;
                margin-left: 20px;
            }
        }
    }
    .content {
        top: 0;
        height: calc(100vh - 48px);
    }
    .content.bottom {
        height: 100vh;
    }
    .li_title {
        background: #FC4083;
        border: 1px solid #FC4083;
        border-radius: 3px;
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 300;
        display: inline-block;
        padding: 1.5px 5px;
        margin: 12px 0 8px 12px;
    }
    .idol_name {
        font-weight: 600;
        display: inline-block;
        max-width: calc(100vw - 180px);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .avatar {
        width: 40px;
        height: 40px;
    }
    @media screen and (min-width: 500px) {
        .idol_name {
            max-width: calc(500px - 180px);
        }
    }
    .shows_detail li >p {
        border-bottom: 1px solid #eee;
        padding: 0 12px 12px;
        font-weight: 600;
        font-size: 14px;
        display: block;
        overflow: hidden;
        line-height: 20px;
        >i {
            color: #fc3878;
            vertical-align: inherit;
        }
    }
    .idolInfo {
        overflow: hidden;
        padding: 6px 12px;
        >p {
            float: left;
            width: calc(100vw - 80px);
            max-width: calc(500px - 90px);
            >* {
                display: block;
            }
            >span:first-child {
                font-size: 14px;
            }
            span.once {
                line-height: 40px;
            }
            >span:last-child {
                color: #999;
            }
        }
    }
    .shows_name {
        border: none !important;
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 7.5px !important;
        color: #00B4BB;
    }
    .shows_time {
        font-weight: 500 !important;
        overflow: hidden;
        span {
            display: block;
            overflow: hidden;
            float: left;
        }
        >span:first-child {
            margin-right: 17px;
        }
        >span:last-child {
            color: #666;
            img {
                width: 15px;
                float: left;
                margin-top: 2px;
                margin-right: 5px;
            }
        }
    }
    .fans_list {
        >p {
            overflow: hidden;
            padding-left: 12px;
        }
        .idol_name {
            border-bottom: 1px solid #eee;
            height: 40px;
            line-height: 40px;
            padding: 3px 0;
            width: calc(100vw - 60px);
            max-width: calc(100vw - 60px);
            font-size: 14px;
        }
        @media screen and (min-width: 500px) {
            .idol_name {
                width: calc(500px - 60px);
                max-width: calc(500px - 60px);
            }
        }
    }
    .shows_info {
        padding: 0 12px;
        border-bottom: 1px solid #eee;
        >span {
            display: block;
            padding-bottom: 8px;
            font-weight: 600;
            font-size: 14px;
        }
        p {
            overflow: hidden;
            padding-bottom: 12px;
            span {
                display: inline-block;
                width: 30%;
                height: calc((100vw - 60px) * 1/3);
                max-height: calc((500px - 60px) * 1/3);
                border-radius: 3px;
                >img {
                    width: 100%;
                    min-height: calc((100vw - 60px) * 1/3);
                    display: block;
                }
                @media screen and (min-width: 500px) {
                    >img {
                        min-height: calc((500px - 60px) * 1/3);
                    }
                }
            }
            span.once {
                width: 100%;
                height: calc((100vw - 24px));
                max-height: calc((500px - 24px));
            }
            span:not(:last-child) {
                margin-right: 3%;
            }
        }
    }
    .mine_info {
        position: relative;
        .info_content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            >p {
                padding: 0 12px;
                padding-bottom: calc(100vw * 0.026);
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            >span {
                padding: 0 12px;
                color: #666;
                display: block;
                font-size: 14px;
                i {
                    color: #fc3878;
                    vertical-align: inherit;
                }
            }
        }
        >img {
            width: 100%;
            background-color: #eee;
        }
    }
</style>