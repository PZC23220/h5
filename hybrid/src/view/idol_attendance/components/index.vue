<template>
    <div class="main">
         <div class="content">
            <img src="http://h2.groupy.vip/groupy_h5/attendance/bg.jpg" class="content_bg">
            <div class="main_content">
                <div class="banner_content">
                    <img src="http://h3.groupy.vip/groupy_h5/attendance/pic_reward.png" class="banner">
                    <span>{{idols.length>0?idols[1].episode:'-'}}月皆勤</span>
                </div>
                <ul class="idolList">
                    <div class="none_loading" :class="{'none_loading_show':idols.length>0}">
                        <li>
                            <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" class="idol_avatar">
                            <img src="http://h3.groupy.vip/groupy_h5/attendance/attendance.png" class="attendance fans">
                            <h3>idolName</h3>
                            <p>idol Introduction</p>
                        </li>
                        <li>
                            <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" class="idol_avatar">
                            <img src="http://h3.groupy.vip/groupy_h5/attendance/attendance.png" class="attendance">
                            <h3>idolName</h3>
                            <p>idol Introduction</p>
                        </li>
                        <li>
                            <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" class="idol_avatar">
                            <img src="http://h3.groupy.vip/groupy_h5/attendance/attendance.png" class="attendance">
                            <h3>idolName</h3>
                            <p>idol Introduction</p>
                        </li>
                        <li>
                            <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" class="idol_avatar">
                            <img src="http://h3.groupy.vip/groupy_h5/attendance/attendance.png" class="attendance">
                            <h3>idolName</h3>
                            <p>idol Introduction</p>
                        </li>
                    </div>
                    <li v-for="idol in idols">
                        <img v-lazy="idol.avatar" class="idol_avatar">
                        <img src="http://h3.groupy.vip/groupy_h5/attendance/attendance.png" class="attendance">
                        <h3>{{idol.nickname?idol.nickname:'...'}}</h3>
                        <p>{{idol.introduce?idol.introduce:'...'}}</p>
                        <span class="idolPage" v-if="isFans">プロフィールへ</span>
                    </li>
                </ul>
            </div>
         </div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js');
    export default {
        data() {
            return {
                idols: [],
                idx: 0,
                isFans: false
            }
        },
        methods: {
          getIdols(token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
                http.get('/ranking/idolAttendance').then(function(res){
                    self.idols = res.data;
                    console.log(self.idols);
                }).catch(function(){
                    self.idx++;
                    self.getIdols();
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
        mounted() {
        },
        created() {
            if(this.$route.query.isFans == 1) {
                this.isFans = true;
            }
            this.getIdols();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        // background-image: url(/img/Attendance/bg.jpg);
        // background-size: cover;
        // background-position: center center;
        // background-repeat: no-repeat; 
        top: 0;
        height: 100vh;       
    }
    .content_bg {
        width: 100%;
        height: 100vh;
        display: block;
    }
    .main_content {
        position: absolute;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        overflow: hidden;
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
                bottom: 66px;
                right: 10px;
            }
            img.attendance.fans {
                bottom: 46px;
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
    .none_loading {
        opacity: 0.7;
        overflow:hidden;
    }
    .none_loading_show {
        opacity: 0;
        height: 0;     
        transition: all 0.3s;
    }
</style>