<template>
    <div class="main">
        <div class="header">
        <div class="detail">
            <a href="#" class="back">
                <img src="../../images/icon_arrow_back_black.png" alt="">
            </a>
            <span>详情</span>
        </div>
            <div class="detailPages">
                <router-link to="/fans/ranking/GcoinsContribution">G币贡献</router-link>
                <router-link to="/fans/ranking/popularity">人气</router-link>
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
  }
  .content {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
  }
</style>
