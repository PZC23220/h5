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
                <router-link to="/idol/community/dynamic">动态</router-link>
                <router-link to="/idol/community/comment">揭示板</router-link>
            </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    
</script>
