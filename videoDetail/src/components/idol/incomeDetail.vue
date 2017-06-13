<template>
    <div class="main">
         <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../images/icon_arrow_back_black.png" alt="">
                </a>
                <span>收入详情</span>
            </div>
        </div>
        <div class="content" style=" top: 54px;">
            <div class="income">
                <p>
                    <span class="detail_title">本月收入</span>
                    <span><img src="" alt="" class="icon"><i class="video_money">31,256</i></span>
                </p>
                <p>
                    <span class="detail_title">昨日收入</span>
                    <span><img src="" alt="" class="icon"><i class="video_money">31,256</i></span>
                </p>
            </div>
            <div class="income_details">
                <p class="detail_title">收入详情</p>
                <ul class="income_img">
                    <li>
                        <img class="gift" src="" alt="">
                        <p><span class="left"><img src="" alt="" class="icon">20</span><span class="right">&times;100</span></p>
                    </li>
                    <li>
                        <img class="gift" src="" alt="">
                        <p><span class="left"><img src="" alt="" class="icon">20</span><span class="right">&times;100</span></p>
                    </li>
                    <li>
                        <img class="gift" src="" alt="">
                        <p><span class="left"><img src="" alt="" class="icon">30</span><span class="right">&times;300</span></p>
                    </li>
                    <li>
                        <img class="gift" src="" alt="">
                        <p><span class="left"><img src="" alt="" class="icon">50</span><span class="right">&times;300</span></p>
                    </li>
                </ul>
            </div>
            <div class="mention_details">
                <p class="detail_title">提现详情</p>
                <ul class="mention_list">
                    <li>
                        <p>月份</p>
                        <p>G币值</p>
                        <p>状态</p>
                    </li>
                    <li>
                        <p>2017.03</p>
                        <p><img src="" class="icon" alt="">31,257</p>
                        <p>已支付</p>
                    </li>
                    <li>
                        <p>2017.03</p>
                        <p><img src="" class="icon" alt="">31,257</p>
                        <p>已支付</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
 .income {
    display: flex;
    p{
         flex: 1;
         &:first-child {
            border-right: 1px solid #e0e0e0;
         }
         &:last-child {
            text-align: right;
         }
    }
 }
 .mention_details {
    .detail_title {
        padding: 0 12px;
    }
    .mention_list {
        padding-top: 12px;
        height: 36px;
        line-height: 36px;
        li {
            margin: 0 12px;
            padding: 5px 0;
            overflow: hidden;
            display: flex;
            box-sizing: border-box;
            font-size: 14px;
            color: #A5A5A5;
            border-top: 1px solid #E7E7E7;
            &:first-child {
                background: #f0f0f0;
                border-top: none;
                padding: 0 12px;
                margin: 0;
            }
            &:nth-child(2) {
                border-top: none;
            }
            p {
                flex: 1;
            }
        }
    }
 }
</style>