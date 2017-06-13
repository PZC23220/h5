<template>
  <div id="app">
    <header class="header">
      <a href="#" class="logo"><img src="./images/logo.png" height="50" width="50" alt=""></a>
      <ul class="menuList">
        <li @click="toView(1)">产品介绍</li>
        <li @click="toView(2)">爱豆招募</li>
        <li  @click="toView(3)">公司介绍</li>
      </ul>
      <select name="" id="">
        <option value="english">English</option>
        <option value="chinese">繁体中文</option>
      </select>
    </header>
    <div class="main">
      <router-view></router-view>
    </div>
    <footer class="footer">
      <div class="download">
        <div class="left">
          <a href="#"><img src="./images/logo.png" alt=""></a>
          <ul class="pages">
            <li><a href="">爱豆列表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</a></li>
            <li><a href="">进驻视频&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</a></li>
            <li><a href="">利用规约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</a></li>
            <li><a href="">privacy policy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</a></li>
          </ul>
        </div>
        <div class="right">
          <a href=""><img src="" alt="" class="downloadlink"></a>
        </div>
      </div>
      <div class="desc">Copyright  2017 Groupy Inc. All rights reserved.&nbsp;&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn/">粤ICP备17068981号</a></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    toView: function (val) {
      var anchor
      switch (val) {
        case 1:
          anchor = this.$el.querySelector('.product_description')
          break
        case 2:
          anchor = this.$el.querySelector('.joinUs')
          break
        case 3:
          anchor = this.$el.querySelector('.company_profile')
          break
      }
      anchor.scrollIntoView()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import './styles/reset.css';
  .header {
    overflow: hidden;
    padding: 0 12px;
    background: -webkit-linear-gradient(0deg,#fe5187,#8782c4,#16d4ac);
    background: linear-gradient(90deg,#fe5187,#8782c4,#16d4ac);
    box-shadow: 0 2px 5px 1px rgba(39,50,58,.3);
    height: 50px;
    .logo {
      float: left;
      margin-right: 20px;
    }
    ul {
      float: left;
      color: #fff;
      cursor: pointer;
      padding: 10px 20px; 
      margin-top: 3px;
      li {
        float: left;
        padding: 0 20px;
        a {
          display: block;
          color: #fff;
        }
        &:not(:first-child) {
          border-left: 1px solid #fff;
        }
      }
    }
     select {
      float: right;
      display: none;
     }
  }
  .footer {
    .download {
      overflow: hidden;
      padding: 20px 0;
      display: flex;
      background: #C7D9E8;
      div {
        flex: 1;
        width: 300px;
        box-sizing: border-box;
        padding: 0 calc((50vw - 300px)/2);
        a {
          display: inline-block;
          color: #3d505f;
          img.downloadlink {
            width: 300px;
            height: 300px * 3/4;
          }
        }
      }
     .left {
      border-right: 1px solid #7b8994;
      li:not(:first-child) {
        margin-top: 10px;
      }
     }
    }
    .desc {
      color: #7b8994;
      background: #27323A;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      a {
        color: #7b8994;
      }
    }
  }
  .main {
    text-align: center;
  }
</style>
