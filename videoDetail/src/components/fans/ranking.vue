<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../../static/images/icon_arrow_back_black.png" alt="">
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
  .content {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
  }
</style>
