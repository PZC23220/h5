<template>
    <div class="main">
        <div class="content">
            <div class="income eBorder">
                <p>
                    <span class="detail_title">{{income_text.today}}</span>
                    <span class="detail_gcoin" style="height: 27px;overflow: hidden;"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="" class="icon"><i class="video_money left" :class="{'left_show':incomeList.incomeCurrentMonth || incomeList.incomeCurrentMonth == 0}">{{incomeList.incomeCurrentMonth?Number(incomeList.incomeCurrentMonth).toLocaleString():0}}</i></span>
                </p>
                <p>
                    <span class="detail_title">{{income_text.yesterday}}</span>
                    <span class="detail_gcoin" style="height: 27px;overflow: hidden;"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" alt="" class="icon"><i class="video_money left" :class="{'left_show':incomeList.incomeYesterday || incomeList.incomeYesterday == 0}">{{incomeList.incomeYesterday?Number(incomeList.incomeYesterday).toLocaleString():0}}</i></span>
                </p>
            </div>
            <div class="income_details eBorder" v-if="incomeList.liveMeetingIncomes">
                <p class="detail_title">{{income_text.meeting}}</p>
                <ul class="income_img income_img_vip">
                    <li v-for="meeting in incomeList.liveMeetingIncomes">
                        <div class="meeting_content">
                            <div class="meeting_tips"><span></span><em>{{income_text.meeting1}}</em><span></span></div>
                            <div class="meeting_gcoins"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{meeting.gcoins?meeting.gcoins:0}}</em></div>
                        </div>
                        <p><span class="left maxWidth left_show">&times;{{Number(meeting.count?meeting.count:0).toLocaleString()}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">{{income_text.detail}}</p>
                <ul class="income_img">
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_heart.png" style="background-color: #ffe7ea;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[1].numbers?incomeList.giftList[1].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_star.png" style="background-color: #fffddd;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[0].numbers?incomeList.giftList[0].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_rose.png" style="background-color: #ffe9ec;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[2].numbers?incomeList.giftList[2].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_diamond.png" style="background-color: #e1eff2;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[3].numbers?incomeList.giftList[3].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ lollipop.png" style="background-color: #ffedef;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[4].numbers?incomeList.giftList[4].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ sushi.png" style="background-color: #fff5e5;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[5].numbers?incomeList.giftList[5].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_bear.png" style="background-color: #fff1e2;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[6].numbers?incomeList.giftList[6].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ noodles.png" style="background-color: #ffefe9;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[7].numbers?incomeList.giftList[7].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_tree.png" style="background-color: #ffedfe;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[8].numbers?incomeList.giftList[8].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_tower.png" style="background-color: #ffe9ea;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[9].numbers?incomeList.giftList[9].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/pic_castle.png" style="background-color: #dbe6f6;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[10].numbers?incomeList.giftList[10].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_firework.png" style="background-color: #e8fdff;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[11].numbers?incomeList.giftList[11].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ maple.png" style="background-color: #fef4e8;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[12].numbers?incomeList.giftList[12].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ island.png" style="background-color: #ffeced;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[13].numbers?incomeList.giftList[13].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_ meteor.png" style="background-color: #f3f1ff;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[14].numbers?incomeList.giftList[14].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/gift/gift_fuji.png" style="background-color: #e5f2ff;" alt="">
                        <p><span class="left maxWidth" :class="{'left_show':incomeList.giftList}">&times;{{Number(incomeList.giftList?(incomeList.giftList[15].numbers?incomeList.giftList[15].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                </ul>
                <div class="coinsTotal"><span>{{income_text.coins}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><i class="totalNum">{{incomeList.giftsIncome?Number(incomeList.giftsIncome).toLocaleString():0}}</i></div>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">{{income_text.vip}}</p>
                <ul class="income_img income_img_vip">
                    <li>
                        <img class="gift" :src="income_text.free" alt="">
                        <p><span class="left maxWidth" :class="{'left_show': incomeList.groupFeeList}">&times;{{Number(incomeList.groupFeeList?(incomeList.groupFeeList[0].numbers?incomeList.groupFeeList[0].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                    <li>
                        <img class="gift" :src="income_text.month" alt="">
                        <p><span class="left maxWidth" :class="{'left_show': incomeList.groupFeeList}">&times;{{Number(incomeList.groupFeeList?(incomeList.groupFeeList[1].numbers?incomeList.groupFeeList[1].numbers:0):0).toLocaleString()}}</span></p>
                    </li>
                </ul>
                <div class="coinsTotal"><span>{{income_text.coins}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><i class="totalNum">{{incomeList.groupIncome?Number(incomeList.groupIncome).toLocaleString():0}}</i></div>
            </div>
            <div class="income_details eBorder">
                <p class="detail_title">{{income_text.task}}</p>
                <div class="coinsTotal"><span>{{income_text.coins}}</span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><i class="totalNum">{{incomeList.incomeMission?Number(incomeList.incomeMission).toLocaleString():0}}</i></div>
            </div>
            <p v-html="income_text.desc" class="income_desc"></p>
             <div class="mention_details">
                <p class="detail_title">{{income_text.record}}</p>
                <ul class="mention_list">
                    <li>
                        <p>{{income_text.records.time}}</p>
                        <p>{{income_text.records.num}}</p>
                        <!-- <p>{{income_text.records.status}}</p> -->
                    </li>
                    <li v-for="(record,key) in incomeList.monthRecordList">
                        <p>{{formatTime(record.month)}}</p>
                        <p><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png" class="icon" alt=""><b>{{Number(record.gcoins).toLocaleString()}}</b></p>
                        <!-- <p>{{changeStatus(record.status)}}</p> -->
                    </li>
                </ul>
                <div class="default_page" v-show="!incomeList.monthRecordList" style="padding-top:32px;">
                    <img src="/img/default_no income.png" alt="">
                    <p>{{income_text.records.none}}</p>
                </div>
            </div>
            <!-- <router-link to="/idol/ExchangeAndWithdrawals" class="reflect_desc">{{income_text.records.exchange}}</router-link> -->
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
                    vip: '守護者人数',
                    meeting: 'チケット枚数',
                    meeting1: '1V1生配信',
                    detail: 'ギフトリスト',
                    task: '新規応援ミッション',
                    record: 'コイン履歴',
                    desc: 'コインとは、ギフティング・メンバーシップ登録等に使うGroupyの仮想通貨です。',
                    coins: '獲得コイン数',
                    free: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/member/pic_vip_free_jp.png',
                    month: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/member/pic_vip_month_jp.png',
                    records: {
                        time: '時間',
                        num :'コイン数',
                        status: '状態',
                        none: 'コインがありません',
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
                    let token_ = getParams('token');
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else if(token_!='(null)' && token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token ' + token_;
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
                        if(getParams('language') == 'cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                         }
                    })
                }
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('yyyy.MM');
            },
            changeStatus(val) {
                let _html;
                if(getParams('language') == 'cn') {
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
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                self.income_text= {
                    today:' 本月G币',
                    yesterday: '昨日G币',
                    vip: '守护者数',
                    meeting: '见面券',
                    meeting1: '见面会',
                    detail: '礼物数量',
                    task: '新手任务',
                    record: 'G币记录',
                    coins: '金币总数',
                    desc: 'G币是Groupy平台上使用的虚拟货币，并不代表真实货币',
                    free: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/member/pic_vip_free_cn.png',
                    month: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/member/pic_vip_month_cn.png',
                    records: {
                        time: '时间',
                        num :'G币值',
                        status: '状态',
                        none: '还没有G币收入',
                        exchange: '汇率和提现说明'
                    }

                }
              } else {
                self.income_text= {
                    today:'今月獲得コイン数',
                    yesterday: '昨日獲得コイン数',
                    vip: '守護者人数',
                    meeting: 'チケット枚数',
                    meeting1: '1V1生配信',
                    detail: 'ギフトリスト',
                    task: '新規応援ミッション',
                    record: 'コイン履歴',
                    coins: '獲得コイン数',
                    desc: 'コインとは、ギフティング・メンバーシップ登録等に使うGroupyの仮想通貨です。',
                    free: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/member/pic_vip_free_jp.png',
                    month: 'https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/member/pic_vip_month_jp.png',
                    records: {
                        time: '時間',
                        num :'コイン数',
                        status: '状態',
                        none: 'コインがありません',
                        exchange: '換金・振込みについて'
                    }

                }
              }
            self.getIncome();

        }
    }
</script>
