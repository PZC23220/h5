<template>
    <div class="main">
        <div class="content" style=" top: 0;">
            <div class="income eBorder">
                <p>
                    <span class="detail_title">{{income_text.today}}</span>
                    <span class="detail_gcoin" style="height: 27px;overflow: hidden;"><img src="/img/timeline_icon_coins.png" alt="" class="icon"><i class="video_money left" :class="{'left_show':incomeList.incomeCurrentMonth || incomeList.incomeCurrentMonth == 0}">{{incomeList.incomeCurrentMonth?Number(incomeList.incomeCurrentMonth).toLocaleString():0}}</i></span>
                </p>
                <p>
                    <span class="detail_title">{{income_text.yesterday}}</span>
                    <span class="detail_gcoin" style="height: 27px;overflow: hidden;"><img src="/img/timeline_icon_coins.png" alt="" class="icon"><i class="video_money left" :class="{'left_show':incomeList.incomeYesterday || incomeList.incomeYesterday == 0}">{{incomeList.incomeYesterday?Number(incomeList.incomeYesterday).toLocaleString():0}}</i></span>
                </p>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">{{income_text.vip}}</p>
                <ul class="income_img">
                    <li>
                        <img class="gift" src="/img/pic_vip_free.png" alt="">
                        <p><span class="left" :class="{'left_show': incomeList.groupFeeList}">&times;{{Number(incomeList.groupFeeList?(incomeList.groupFeeList[0].numbers?incomeList.groupFeeList[0].numbers:'0'):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/pic_vip_1 month.png" alt="">
                        <p><span class="left" :class="{'left_show': incomeList.groupFeeList}">&times;{{Number(incomeList.groupFeeList?(incomeList.groupFeeList[1].numbers?incomeList.groupFeeList[1].numbers:'0'):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/pic_vip_3 month.png" alt="">
                        <p><span class="left" :class="{'left_show': incomeList.groupFeeList}">&times;{{Number(incomeList.groupFeeList?(incomeList.groupFeeList[2].numbers?incomeList.groupFeeList[2].numbers:'0'):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/pic_vip_6 month.png" alt="">
                        <p><span class="left" :class="{'left_show': incomeList.groupFeeList}">&times;{{Number(incomeList.groupFeeList?(incomeList.groupFeeList[3].numbers?incomeList.groupFeeList[3].numbers:'0'):0).toLocaleString()}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">{{income_text.detail}}</p>
                <ul class="income_img">
                    <li>
                        <img class="gift" src="/img/gift/pic_star.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[0].numbers?incomeList.giftList[0].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_heart.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[1].numbers?incomeList.giftList[1].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_rose.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[2].numbers?incomeList.giftList[2].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_diamond.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[3].numbers?incomeList.giftList[3].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_bear.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[4].numbers?incomeList.giftList[4].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_tree.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[5].numbers?incomeList.giftList[5].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_tower.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[6].numbers?incomeList.giftList[6].numbers:'0'):0}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="/img/gift/pic_castle.png" alt="">
                        <p><span class="left" :class="{'left_show':incomeList.giftList}">&times;{{incomeList.giftList?(incomeList.giftList[7].numbers?incomeList.giftList[7].numbers:'0'):0}}</span></p>
                    </li>
                </ul>
            </div>
            <p v-html="income_text.desc" class="income_desc"></p>
           <!--  <div class="mention_details">
                <p class="detail_title">{{income_text.record}}</p>
                <ul class="mention_list">
                    <li>
                        <p>{{income_text.records.time}}</p>
                        <p>{{income_text.records.num}}</p>
                        <p>{{income_text.records.status}}</p>
                    </li>
                    <li v-for="(record,key) in incomeList.monthRecordList">
                        <p>{{formatTime(record.month)}}</p>
                        <p><img src="/img/timeline_icon_coins.png" class="icon" alt=""><b>{{Number(record.gCoins).toLocaleString()}}</b></p>
                        <p>{{changeStatus(record.status)}}</p>
                    </li>
                </ul>
                <div class="default_page" v-show="!incomeList.monthRecordList" style="padding-top:32px;">
                    <img src="/img/default_no income.png" alt="">
                    <p>{{income_text.records.none}}</p>
                </div>
            </div>
            <router-link to="/idol/ExchangeAndWithdrawals" class="reflect_desc">{{income_text.records.exchange}}</router-link> -->
        </div>
        <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                incomeList: {},
                // loadingBig: true,
                idx: 0,
                income_text: {
                    today:'今月獲得コイン数',
                    yesterday: '昨日獲得コイン数',
                    vip: '会員人数',
                    detail: 'ギフトリスト',
                    record: '換金履歴',
                    desc: 'コインとは、ギフティング・メンバーシップ登録等に使うGroupyの仮想通貨です。',
                    records: {
                        time: '時間',
                        num :'コイン数',
                        status: '状態',
                        none: 'まだ換金履歴はありません',
                        exchange: '換金・振込みについて'
                    }

                }
            }
        },
        methods: {
            getIncome(token) {
                let self = this;
                if(self.idx < 2) {
                    self.idx++;
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                    }
                    http.get('/group/income').then(function(res){
                        // self.loadingBig = false;
                        if(res.status == 200) {
                            self.incomeList = res.data;
                            console.log(self.incomeList);
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                    self.getIncome(responseData.token);
                                })
                            })
                        }
                    }).catch(function(){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getIncome(responseData.token);
                            })
                        })
                    });
                }else {
                    // self.loadingBig = false;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                         if(_lan === 'zh-cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                         }
                    })
                }
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd');
            },
            changeStatus(val) {
                let _html;
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                 if(_lan === 'zh-cn') {
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
                  } else {
                     switch(val) {
                        case 0:
                            _html = '未換金'
                            break;
                        case 1:
                            _html = '換金完了'
                            break;
                        case 2:
                            _html = '処理中'
                            break;
                    }
                  }
                return _html;
            }
        },
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                self.income_text= {
                    today:' 本月G币',
                    yesterday: '昨日G币',
                    vip: '会员数量',
                    detail: '礼物数量',
                    record: '提现记录',
                    desc: 'G币是Groupy平台上使用的虚拟货币，并不代表真实货币',
                    records: {
                        time: '时间',
                        num :'G币值',
                        status: '状态',
                        none: '还没有提现记录',
                        exchange: '汇率和提现说明'
                    }

                }
              } else {
                self.income_text= {
                    today:'今月獲得コイン数',
                    yesterday: '昨日獲得コイン数',
                    vip: '会員人数',
                    detail: 'ギフトリスト',
                    record: '換金履歴',
                    desc: 'コインとは、ギフティング・メンバーシップ登録等に使うGroupyの仮想通貨です。',
                    records: {
                        time: '時間',
                        num :'コイン数',
                        status: '状態',
                        none: 'まだ換金履歴はありません',
                        exchange: '換金・振込みについて'
                    }

                }
              }
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
 .income_desc {
    background: #eee;
    color: #999;
    padding: 3px 12px;
    line-height: 20px;
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
 .left {
    opacity: 0.2;
    transition: opacity 0.3s;
 }
.left_show {
    opacity: 1 !important;
}
</style>