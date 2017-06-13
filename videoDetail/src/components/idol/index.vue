<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../images/icon_arrow_back_black.png" alt="">
                </a>
                <span class="right">
                    <a href="#"><img src="" alt=""></a>
                    <a href="#"><img src="" alt=""></a>
                    <a href="#"><img src="" alt=""></a>
                </span>
            </div>
            <div class="idol_info">
                <img src="" alt="">
                <div>
                    <p class="idol_name">メロメロン</p>
                    <p>SUPER☆GIRLS/PASSPO☆</p>
                    <p class="nums"><i>人气值</i><em>34,251(362)</em></p>
                    <p class="nums"><i>粉丝数</i><em>1,251</em></p>
                </div>
                <a href="#">应援</a>
            </div>
            <div class="fans_ranking">
                <a href="">
                    粉丝排行
                    <span><img src="" alt=""><img src="" alt=""><img src="" alt="">&gt;</span>
                </a>
            </div>
            <a href="" class="joinin"><img src="" alt=""></a>
            <div class="detailPages">
                <router-link to="/idol/index/dynamic">动态</router-link>
                <router-link to="/idol/index/comment">揭示板</router-link>
            </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    .detail {
        background: #494949;
    }
    .right {
        float: right;
        a {
            display: inline-block;
            &:not(:first-child) {
                margin-left: 10px;
            }
            img {
                width: 22px;
                height: 22px;
                border-radius: 22px;
            }
        }
    }
    .idol_info {
        background: #494949;
        padding: 10px 21px;
        overflow: hidden;
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            float: left;
        }
        div {
            float: left;
            text-align: left;
            margin-left: 16px;
            .nums {
                line-height: 20px;
                i {
                    font-size: 10px;
                    -webkit-transform: scale(0.8);
                    margin-right: 11.5px;
                }
                em {
                    font-size: 14px;
                }
            }
            .idol_name {
                font-size: 18px;
                line-height: 18px;
            }
            p:nth-child(2) {
                font-size: 10px;
                 -webkit-transform: scale(0.8);
                 margin-left: -10px;
                 margin-bottom: 5px;
            }
        }
        a {
            background: #323232;
            border: 2px solid #FFFFFF;
            border-radius: 48.5px;
            color: #fff;
            float: left;
            display: block;
            font-size: 16px;
            margin-left: 18px;
            width: 105px;
            height: 31px;
            line-height: 31px;
            text-align: center;
        }
    }
    .fans_ranking {
        background: #EBEBEB;
        font-size: 12px;
        a {
            height: 25px;
            line-height: 25px;
            padding: 6.5px 12px;
            color: #999;
            display: block; 
            overflow: hidden;
        }
        text-align: left;
        span {
            float: right;
            overflow: hidden;
            img {
                width: 25px;
                height: 25px;
                float: left;
                border-radius: 50%;
                margin-right: 8.5px;
            }
        }
    }
    .joinin {
        display: block;
        padding: 10px 12px;
        img {
            width: 100%;
            height: 55px;
        }
    }
  }
  .content {
    top: (54px + 105px + 38px + 75px + 36px);
  }
</style>
