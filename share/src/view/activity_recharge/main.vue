<!-- 基础目录组件，用于渲染路由页面 -->
<template>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <!--实际页面内容-->
        <router-view></router-view>
</template>

<style lang="scss">
/*  style标签之内会被作为css进行处理，所以需要使用css的注释形式   */
/*  加上scoped可以将css的作用效果限定在该组件之内 */
 @import "../../css/reset.css";
 @import "../../css/common.scss";
 @import "../../css/idol_activity.scss";
</style>

