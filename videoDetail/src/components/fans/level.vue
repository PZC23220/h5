<template>
    <div class="main">
        <div class="content">
           <div class="desc">
               <h5>粉丝的勋章是针对每个爱豆都有独立等级的按照为爱豆应援打赏的总人气计算</h5>
               <ul>
                   <li><img src="../../images/icon_medal_1.png" alt=""><span>青铜守护</span><i>ブロンズキュウシュゴ</i><div><span>价值满</span><i>2000</i></div><p>为单个爱豆或组合送出</p></li>
                   <li><img src="../../images/icon_medal_2.png" alt=""><span>白金守护</span><i>シルバーキュウシュゴ</i><div><span>价值满</span><i>5000</i></div><p>为单个爱豆或组合送出</p></li>
                   <li><img src="../../images/icon_medal_3.png" alt=""><span>黄金守护</span><i>ゴールドキュウシュゴ</i><div><span>价值满</span><i>15000</i></div><p>为单个爱豆或组合送出</p></li>
                   <li><img src="../../images/icon_medal_4.png" alt=""><span>钻石守护</span><i>ダイヤモンドキュウシュゴ</i><div><span>价值满</span><i>30000</i></div><p>为单个爱豆或组合送出</p></li>
                   <li><img src="../../images/icon_medal_5.png" alt=""><span>王者守护</span><i>キングキュウシュゴ</i><div><span>价值满</span><i>50000</i></div><p>为单个爱豆或组合送出</p></li>
               </ul>
           </div>
        </div>
    </div>
</template>

<script>
    
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        top: 0;
        color: #666;
        height: 100vh;
        font-weight: 200;
        background: #eee;
        .desc {
            padding: 8px 12px;
            h5 {
                color: #999;
            }
            ul {
                overflow: hidden;
                padding-top: 8.5px;
                li {
                    float: left;
                    box-sizing: border-box;
                    width: calc(50% - 6px);
                    background: #FCFCFC;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
                    border-radius: 4px;
                    margin-bottom: 12px;
                    &:nth-child(2n) {
                        margin-left: 12px;
                    }
                    text-align: center;
                    padding-top: 19.5px;
                    padding-bottom: 5px;
                    >img {
                        width: 105px;
                        display: block;
                        margin: 0 auto 15px;
                    }
                    >span {
                        font-size: 14px;
                    }
                    >i {
                        display: block;
                        color: #999;
                        font-size: 10px;
                        -webkit-transform: scale(0.8);
                    }
                    >div {
                        padding-top: 5px;
                        span {
                            display: inline-block;
                            width: 58px;
                            height: 16px;
                            line-height: 16px;
                            background: url(../../images/bg_medal.png) no-repeat;
                            background-size: 100% 100%;
                            color: #fff;
                            font-size: 9px;
                            -webkit-transform: scale(0.75);
                        }
                        i {
                            font-family: 'Helvetica Condensed Bold Italic';
                            font-size: 18px;
                            color: #333;
                        }
                    }
                    >p {
                        color: #999;
                        font-size: 10px;
                        -webkit-transform: scale(0.8);
                    }
                    &:last-child {
                        width: 100%;
                    }
                }
            }
        }
    }
    @font-face {
      font-family: 'Helvetica Condensed Bold Italic';
      src: url('../../font/Helvetica Condensed Bold Italic.eot');
      src: url('../../font/Helvetica Condensed Bold Italic.woff2') format('woff2'),
           url('../../font/Helvetica Condensed Bold Italic.eot?#iefix') format('embedded-opentype');
    }
</style>
