<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../images/icon_arrow_back_black.png" alt="">
                </a>
                <span>爱豆排行</span>
            </div>
        </div>
         <div class="content" style="top:54px;">
             <ul class="top3">
                 <li>
                     <p class="idol_num">2位</p>
                     <div>
                         <img src="" alt="" class="crown">
                         <img src="" alt="" class="idol_img">
                         <img src="" alt="" class="level">
                     </div>
                     <p class="idol_name">結月 みおな</p>
                     <span>积分: 451,689</span>
                     <span>粉丝数: 1,267</span>
                 </li>
                 <li>
                     <p class="idol_num">1位</p>
                     <div>
                         <img src="" alt="" class="crown">
                         <img src="" alt="" class="idol_img">
                         <img src="" alt="" class="level">
                     </div>
                     <p class="idol_name">結月 みおな</p>
                     <span>积分: 451,689</span>
                     <span>粉丝数: 1,267</span>
                 </li>
                 <li>
                     <p class="idol_num">3位</p>
                     <div>
                         <img src="" alt="" class="crown">
                         <img src="" alt="" class="idol_img">
                         <img src="" alt="" class="level">
                     </div>
                     <p class="idol_name">結月 みおな</p>
                     <span>积分: 451,689</span>
                     <span>粉丝数: 1,267</span>
                 </li>
             </ul>
            <div class="integral">
                <div>
                     <div class="left">
                         <p><span>我的积分：231,3455</span><i>25位</i></p>
                         <p>与前一位idol相差328积分</p>
                     </div>
                     <div class="right"><a href="#">所有排名 &gt;</a></div>
                </div>
            </div>

            <div class="help">
                <h4>怎样提升排名</h4>
                <ul class="help_list">
                    <li><span>1</span> Level 成长体系</li>
                    <li><span>2</span> Level 成长体系</li>
                    <li><span>3</span> Level 成长体系</li>
                </ul>
            </div>
         </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        color: #666;
    }
    .top3 {
        background: #f9f9f9;
        display: flex;
        padding: 7.5px 12px 15px;
        box-sizing: border-box;
        li {
            flex: 1;
            text-align: center;
            font-size: 14px;
            div {
                padding: 18px 0 8px;
            }
            .idol_img {
                 width: 60px;
                 height: 60px;
                 border-radius: 50%; 
            } 
            &:not(:nth-child(2)) {
                .idol_num {
                    padding-top: 3px;
                }
                .idol_img {
                     width: 45px;
                     height: 45px; 
                }
                div {
                    padding-top: 30px;
                }  
            }
            .idol_name {
                margin-bottom: 9.5px;
            }
            span {
                font-size: 10px;
                -webkit-transform:scale(0.8);
                text-align: left;
                display: block;
            }
        }
    }
    .integral {
        background: #f9f9f9;
        padding: 0 12px;
        a {
            color: #666;
        }
        >div{
            padding-top: 13px;
            padding-bottom: 5.5px;
            border-top: 1px solid #DDDDDD;
            overflow: hidden;
            .left {
                float: left;
                p:first-child {
                    font-size: 14px;
                    span {
                        margin-right: 8px;
                    }
                    i {
                        display: inline-block;
                        width: 35px;
                        height: 18px;
                        line-height: 18px;
                        font-size: 10px;
                        -webkit-transform:scale(0.8);
                        background: #585858;
                        border-radius: 4px;
                        color: #fff;
                        text-align: center;
                    }
                }
                p:last-child {
                  color: #999999;
                }
            }
            .right {
                float: right;
            }
        }
    }
    .help {
        padding: 24px 12px 0;
        h4 {
            font-size:14px;
        }
        .help_list {
            li {
                font-size: 14px;
                padding: 16px 0;
                span {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background: #ebebeb;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 24px;
                    margin-right: 18px;
                }
            }
        }
    }
</style>