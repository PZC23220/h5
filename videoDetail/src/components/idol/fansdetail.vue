<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../images/icon_arrow_back_black.png" alt="">
                </a>
                <span>粉丝详情</span>
            </div>
            <div class="fans_num">
                <p><span>粉丝数</span><i>1,265</i></p>
                <p><span>应援数</span><i>1,265</i></p>
            </div>
            <div class="detailPages">
                <router-link to="/idol/fansdetail/totalContribution">总贡献值</router-link>
                <router-link to="/idol/fansdetail/cheerNumber">应援数</router-link>
                <router-link to="/idol/fansdetail/admissionTime">入会时间</router-link>
            </div>
        </div>
        <div class="content" style="top: 142px;">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    font-size: 17px;
    color: #fff;
    overflow: hidden;
    .detail {
        background: #9C9C9C;
        padding: 0 12px;
        height: 54px;
        line-height: 54px;
        .back {        
            position: absolute;
            display: block;
            left: 12px;
            height: 12px;
            top: (54px-22px)/2;
            img {
              width: 22px;
              display: block;  
            }
        }
    }
    .detailPages {
        background: #AAAAAA;
        padding: 0 12px;
        overflow: hidden;
        display: flex;
        a {
            height: 36px;
            line-height:36px;
            color: #fff;
            display: block;
            flex: 1;
            box-sizing: border-box;
            margin: 0 5%;
        }
        .router-link-exact-active.router-link-active {
            border-bottom: 2.5px solid #fff;
        }
    }
    .fans_num {
        background: #f9f9f9;
        display: flex;
        padding: 10px 12px 8px;
        box-sizing: border-box;
        p {
            flex: 1;
            height: 34px;
            line-height: 34px;
            overflow: hidden;
            span {
                color: #A5A5A5;
                float: left;
                font-size: 12px;
            }
            i {
                font-style: normal;
                color: #666;
                font-size: 16px;
                float: right;
            }
            &:first-child {
                padding-right: 12px;
                border-right: 1px solid #979797;
            }
            &:last-child {
                padding-left: 12px;
            }
        }
    }
  }
  .content {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
  }
</style>
