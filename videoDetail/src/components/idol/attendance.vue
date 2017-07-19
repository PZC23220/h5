<template>
    <div class="main">
         <div class="content">
            <div class="banner_content">
                <img src="../../images/Attendance/pic_reward.png" class="banner">
                <span>12月皆勤</span>
            </div>
            <ul class="idolList">
                <li>
                    <img src="../../images/default_img.png" class="idol_avatar">
                    <img src="../../images/Attendance/attendance.png" class="attendance fans">   
                    <h3>idolNameidolNameidolNameidolNameidolName</h3>
                    <p>idol IntroductionidolNameidolNameidolNameidolNameidolNameidolName</p>
                    <span class="idolPage">查看主页</span>
                </li>
                <li>
                    <img src="../../images/default_img.png" class="idol_avatar">
                    <img src="../../images/Attendance/attendance.png" class="attendance">   
                    <h3>idolName</h3>
                    <p>idol Introduction</p>
                    <span class="idolPage">查看主页</span>
                </li>
                <li>
                    <img src="../../images/default_img.png" class="idol_avatar">
                    <img src="../../images/Attendance/attendance.png" class="attendance">   
                    <h3>idolName</h3>
                    <p>idol Introduction</p>
                    <span class="idolPage">查看主页</span>
                </li>
                <li>
                    <img src="../../images/default_img.png" class="idol_avatar">
                    <img src="../../images/Attendance/attendance.png" class="attendance">   
                    <h3>idolName</h3>
                    <p>idol Introduction</p>
                    <span class="idolPage">查看主页</span>
                </li>
            </ul>
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
        background-image: url(../../images/Attendance/bg.jpg);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat; 
        top: 0;
        height: 100vh;       
    }
    .banner_content {
        width: 272px;
        display: block;
        margin: -50px auto 0;
        position: relative;
        font-size: 15.55px;
        color: #fff;
        line-height: 18.5px;
        height: 230px;
        overflow: hidden;
        img {
            width: 100%;
        }
        span {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -35px;
            margin-top: 40px;
            width: 70px;
            text-align: center;
        }
    }
    .idolList {
        overflow: hidden;
        li {
            float: left;
            width: 40vw;
            margin-left: 6.66%;
            overflow: hidden;
            position: relative;
            background: #fff;
            box-shadow: 0 1px 2px 0 rgba(255,255,255,0.50);
            border-radius: 6px;
            margin-bottom: 16px;
            padding-bottom: 10px;
            img.idol_avatar {
                width: 100%;
            }
            img.attendance {
                width: 37px;
                position: absolute;
                bottom: 46px;
                right: 10px;
            }
            img.attendance.fans {
                bottom: 66px;
            }
            h3 {
                font-size: 14px;
                font-weight: 600;
                padding-left: 12px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            p {
                font-size: 10px;
                -webkit-transform: scale(0.85);
                color: #666;
                font-weight: 100;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            span {
                color: #999;
                text-align: center;
                display: block;
                text-decoration: underline;
                padding-top: 5px;
            }
        }
    }
</style>