<template>
    <div class="main">
        <div class="content" style=" top: 0;">
            <div class="income eBorder">
                <p>
                    <span class="detail_title">今月の収入</span>
                    <span class="detail_gcoin"><img src="../../images/timeline_icon_coins.png" alt="" class="icon"><i class="video_money">{{Number(incomeList.incomeCurrentMonth).toLocaleString()}}</i></span>
                </p>
                <p>
                    <span class="detail_title">昨日の収入</span>
                    <span class="detail_gcoin"><img src="../../images/timeline_icon_coins.png" alt="" class="icon"><i class="video_money">{{Number(incomeList.incomeYesterday).toLocaleString()}}</i></span>
                </p>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">会員費</p>
                <ul class="income_img">
                    <li>
                        <img class="gift" src="../../images/pic_vip_free.png" alt="">
                        <p><span class="left">&times;{{Number(incomeList.groupFeeList[0].numbers).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="../../images/pic_vip_1 month.png" alt="">
                        <p><span class="left">&times;{{Number(incomeList.groupFeeList[1].numbers).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="../../images/pic_vip_3 month.png" alt="">
                        <p><span class="left">&times;{{Number(incomeList.groupFeeList[2].numbers).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="../../images/pic_vip_6 month.png" alt="">
                        <p><span class="left">&times;{{Number(incomeList.groupFeeList[3].numbers).toLocaleString()}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">ギフト総数</p>
                <ul class="income_img">
                    <li v-for="(gift,key) in incomeList.giftList">
                        <img class="gift" :src="gift.img" alt="">
                        <p><span class="left">&times;{{gift.numbers}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="mention_details">
                <p class="detail_title">換金履歴</p>
                <ul class="mention_list">
                    <li>
                        <p>時間</p>
                        <p>コイン数</p>
                        <p>状態</p>
                    </li>
                    <li v-for="(record,key) in incomeList.monthRecordList">
                        <p>{{formatTime(record.month)}}</p>
                        <p><img src="../../images/timeline_icon_coins.png" class="icon" alt=""><b>{{Number(record.gCoins).toLocaleString()}}</b></p>
                        <p>{{changeStatus(record.status)}}</p>
                    </li>
                </ul>
                <div class="default_page" v-show="!incomeList.monthRecordList" style="padding-top:32px;">
                    <img src="../../images/default_no income.png" alt="">
                    <p>まだ換金履歴はありません</p>
                </div>
            </div>
            <router-link to="/idol/ExchangeAndWithdrawals" class="reflect_desc">換金・振込みについて</router-link>
        </div>
        <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div>
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
<script>
    import http from '@/utils/http.js';
    require('../../utils/common.js')
    export default {
        data() {
            return {
                incomeList: {
                    groupFeeList:[{totalNums: '',numbers: ''},{totalNums: '',numbers: ''},{totalNums: '',numbers: ''},{totalNums: '',numbers: ''}],
                    monthRecordList: [],
                    incomeCurrentMonth: '',
                    incomeYesterday: ''
                },
                loadingBig: true
            }
        },
        methods: {
            getIncome(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/group/income').then(function(res){
                    self.loadingBig = false;
                    self.incomeList = res.data;
                    console.log(self.incomeList);
                }).catch(function(){

                });
            },
            formatTime(key) {
                let timer = new Date(key*1000);
                return timer.Format('MM.dd');
            },
            changeStatus(val) {
                let _html;
                switch(val) {
                    case 0:
                        _html = '未提现'
                        break;
                    case 1:
                        _html = '已提现'
                        break;
                    case 2:
                        _html = '待处理'
                        break;
                }
                return _html;
            }
        },
        created() {
            var self = this;
                self.getIncome();

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        height: 100vh;
    }
 .mention_details {
    .detail_title {
        margin-left:12px;
    }
    .mention_list {
        overflow: hidden;
        line-height: 36px;
        li {
            margin: 0 12px;
            padding: 16px 0 14px;
            overflow: hidden;
            display: flex;
            box-sizing: border-box;
            font-size: 14px;
            color: #666;
            
            &:first-child {
                color: #FC4083;
                font-size: 12px;
                border-bottom: 1px solid #FC4083;
            }
            &:not(:first-child) {
                border-bottom: 1px solid #e2e2e2;
            }
            p {
                flex: 1;
                height: 20px;
                line-height: 20px;
                text-align: center;
                &:nth-child(2) {
                    flex: 2;
                }
            }
            img {
                width: 14px;
                margin-right: 6px;
                vertical-align: middle;
            }
        }
    }
 }
 .reflect_desc {
    display: block;
    margin: 14px auto 29px;
    width: 150px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #999999;
    border-radius: 50px;
    color: #666;
    text-align: center;
 }
 .income_img {
    img {
        width: 78px;
        height: 78px;
    }
 }
</style>