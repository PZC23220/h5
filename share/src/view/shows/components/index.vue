<template>
    <div class="main">
        <div class="header">
            <img src="/img/icon_groupy_128.png" alt="">
            <p>アイドルの成長をより身近に守れるアプリ。更にプライベート情報もGET!</p>
            <a @click="p_log('share_h5_download_groupy')" target="_blank" :href="hrefs">インストール</a>
        </div>
        <div class="content">
            <div class="idolInfo eBorder">
                <img src="/img/default_img.png" class="avatar">
                <p>
                    <span><i class="idol_name">idolNameidolNameidolNameidolNameidolNameidolNameidolNameidolNameidolName</i>发布活动</span>
                    <span>团体</span>
                </p>
            </div>
            <ul class="shows_detail">
                <li>
                    <p class="shows_name">shows_name</p>
                    <p class="shows_time"><span>08.12 金</span><span><img src="/img/shows/icon_time.png">開場10:30/開演11:00</span></p>
                </li>
                <li>
                    <h5 class="li_title">演出团体</h5>
                    <p class="show_groups">POPCANDY/~永遠少女症候群~ゆゆ/GINGANEKO/PopPopping Emo/FRAGRANCE/渡良瀬橋43/花言葉はイノセンス/seeDream</p>
                </li>
                <li>
                    <h5 class="li_title">门票价格</h5>
                    <p>Groupy预约 <i>1,800</i>円/当日 2,500円(+1D)</p>
                </li>
                <li>
                    <h5 class="li_title">活动场地</h5>
                    <p>SHIBUYA DESEO</p>
                </li>
                <li>
                    <h5 class="li_title">活动信息</h5>
                    <div class="shows_info">
                        <span>リストバンド交換時ドリンク代別途必要、オールスタンディング</span>
                        <p>
                            <span class="once"><img src=""></span>
                            <!-- <span><img src=""></span>
                            <span><img src=""></span> -->
                        </p>
                    </div>
                </li>
                <li>
                    <h5 class="li_title">19人预约</h5>
                    <div class="fans_list">
                        <p>
                            <img src="/img/default_img.png" class="avatar">
                            <span class="idol_name">idol_name</span>
                        </p>
                        <p>
                            <img src="/img/default_img.png" class="avatar">
                            <span class="idol_name">idol_name</span>
                        </p>
                        <p>
                            <img src="/img/default_img.png" class="avatar">
                            <span class="idol_name">idol_name</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer" @click="reservationShow = true">立即预约</div>
        <div class="footer" v-if="false">下载Groupy接受活动通知</div>
        <!-- 预约弹窗 -->
        <div class="reservation" v-if="reservationShow">
            <div class="r_header">
                <img src="/img/shows/icon_cancel_2.png" @click="reservationShow = false">
                预约活动
                <span>提交</span>
            </div>
            <p><span>姓</span><input type="text" name="" :modal="last_name" placeholder="请输入"></p>
            <p><span>名</span><input type="text" name="" :modal="first_name" placeholder="请输入"></p>
            <p><span>邮箱</span><input type="email" name="" :modal="email" placeholder="请输入"></p>
            <p><span>数量</span><i>张</i><input style="width: calc(100vw - 100px);max-width: calc(500px - 100px);" :modal="nums" type="tel" name="" placeholder="1"></p>
        </div>
        <!-- toast -->
        <div class="toast" :class="{'active':toastShow}">预约成功</div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    import $ from 'n-zepto';
    export default {
        data() {
          return {
            hrefs: 'itms-apps://itunes.apple.com/app/id1251249933',
            reservationShow: false,
            toastShow: false,
            first_name: '',
            last_name: '',
            email: '',
            nums: ''
          }
        },
        methods: {
            p_log(val) {
                // var _data = {
                //     topic: "groupy",
                //     app: "groupyIdol",
                //     platform: "h5",
                //     system: navigator.userAgent,
                //     version: "1.0.0",
                //     action: val,
                //     result: "success",
                //     idolId: location.href.split('?idolId=')[1].split('#/')[0]
                // }
                // http.post('http://log.groupy.cn:31311',JSON.stringify(_data)).then(function(res){
                //     console.log('success');
                // }).catch(function(){

                // })
            }
        },
        mounted() {
        },
        computed: {
        },
        created() {
        }
      }
</script>

<style scoped lang="scss">
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
    .toast {
        opacity: 0.7;
        background: #000000;
        border-radius: 5px;
        font-size: 14px;
        padding: 12px 28px;
        color: #FFFFFF;
        position: fixed;
        bottom: 100px;
        left: 50%;
        z-index: 4;
        margin-left: -57px;
        transition: all 0.3s;
        transform: scale(0);        
    }
    .toast.active {
        transform: scale(1);
    }
    .content {
        height: calc(100vh - 112px);
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
        padding: 0 12px 12px;
        border-bottom: 1px solid #eee;
        >span {
            display: block;
            padding-bottom: 8px;
        }
        p {
            overflow: hidden;
            span {
                display: inline-block;
                width: 30%;
                height: calc((100vw - 60px) * 1/3);
                max-height: calc((500px - 60px) * 1/3);
                border-radius: 3px;
                >img {
                    width: 100%;
                    display: block;
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
</style>