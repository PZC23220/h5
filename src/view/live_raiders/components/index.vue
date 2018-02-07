<template>
    <div class="main">
        <div class="content">
            <img :src="meeting_text.banner" class="live_banner">
            <h2 class="live_title">{{meeting_text.what}}</h2>
            <span class="live_border_bottom"></span>
            <p class="live_desc">{{meeting_text.what_desc}}</p>
            <h2 class="live_title">{{meeting_text.how}}</h2>
            <span class="live_border_bottom"></span>
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_step_1.png" class="live_step">
            <p class="live_desc">{{meeting_text.live}}</p>
            <div class="live_process"><span class="process_tips">{{meeting_text.entrance}}</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips">{{meeting_text.tickets}}</span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips two" v-html="meeting_text.numbers"></span></div>
            <div class="live_imgs"><img src=""><img src=""><img src=""></div>
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_step_2.png" class="live_step">
            <p class="live_desc">{{meeting_text.videos}}</p>
            <div class="live_process live_process_blue"><span class="process_tips" :class="{'two': meeting_text.coming != '进入'}" v-html="meeting_text.coming"></span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips" :class="{'two': meeting_text.waitng != '等候'}" v-html="meeting_text.waitng"></span><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/arrow.jpg" class="process_img"><span class="process_tips" :class="{'two': meeting_text.meet != '见面'}" v-html="meeting_text.meet"></span></div>
            <div class="live_imgs"><img src=""><img src=""><img src=""></div>
        </div>
    </div>
</template>

<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                meeting_text: {
                    what: '1V1生配信とは？',
                    what_desc: '1V1生配信とは、アイドルがオンラインでファンミーティングを開催することができるGroupyの絶賛新機能です。1対1生配信にて、アイドルとファンは1対1ビデオチャットすることができます。',
                    how: '参加方法',
                    live: 'チケットを購入  Groupy-【LIVE】画面にアイドルの1V1生配信チケットを購入してください。整理番号順に配信していただきます',
                    entrance: '選択',
                    tickets: '購入',
                    numbers: '番号を<br>入手',
                    videos: 'アイドルと生配信  配信当日にホームからお早めに入室してお待ちください。順番になると、自動的にアイドル側との接続を行います。配信の終了時間になると、接続が自動的に切断されます。',
                    coming: '入室<br>する',
                    waitng: '順番を<br>待つ',
                    meet: '生配信<br>開始',
                    banner: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_jp.jpg'
                },
            }
        },
        methods: {
        },
        created() {
            var self = this;
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                 self.meeting_text= {
                    what: '是什么',
                    what_desc: '1V1见面会是Groupy推出的偶像粉丝互动新模式：偶像进行线上直播，与粉丝一对一视频连线，即可单独见面。',
                    how: '怎么参加',
                    live: '购买见面券   在Groupy-【LIVE】发现偶像的见面会，购买见面券获得入场番号，当天根据番号进行见面',
                    entrance: '入口',
                    tickets: '购票',
                    numbers: '获得<br>番号',
                    videos: '视频连线见面   见面会当天，从首页进入直播间等候，到了番号即自动与偶像进行视频连线。见面时间结束后，将自动断开连接。',
                    coming: '进入',
                    waitng: '等候',
                    meet: '见面',
                    banner: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_cn.jpg'
                }
            } else {
                self.meeting_text= {
                    what: '1V1生配信とは？',
                    what_desc: '1V1生配信とは、アイドルがオンラインでファンミーティングを開催することができるGroupyの絶賛新機能です。1対1生配信にて、アイドルとファンは1対1ビデオチャットすることができます。',
                    how: '参加方法',
                    live: 'チケットを購入  Groupy-【LIVE】画面にアイドルの1V1生配信チケットを購入してください。整理番号順に配信していただきます',
                    entrance: '選択',
                    tickets: '購入',
                    numbers: '番号を<br>入手',
                    videos: 'アイドルと生配信  配信当日にホームからお早めに入室してお待ちください。順番になると、自動的にアイドル側との接続を行います。配信の終了時間になると、接続が自動的に切断されます。',
                    coming: '入室<br>する',
                    waitng: '順番を<br>待つ',
                    meet: '生配信<br>開始',
                    banner: 'http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/Live/pic_jp.jpg'
                }
            }
        }
    }
</script>
