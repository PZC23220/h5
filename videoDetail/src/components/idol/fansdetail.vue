<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../../static/images/icon_arrow_back_black.png" alt="">
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
