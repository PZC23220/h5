<template>
    <div class="main">
        <img src="/img/login/login_bg_750.jpg" class="bg_750">
        <div class="main_content">
            <img src="/img/login/icon_groupy.png">
        </div>
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
                            bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
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
                                bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                             }
                        })
                    }
                }
            },
            reservationShow() {
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
    .main {
        position: relative;
    }
   .bg_750 {
        width: 100%;
   }
   .main_content {
        position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;
   }
</style>