<template>
  <div class="video">
    <div class="videos">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h2 class="titles"><i></i><span >メッセージ動画</span></h2>
      <h4 class="desc">アイドルからあなたにメッセージを残したって？さっさとチェックしよう！</h4>
      <ul class="videos_list">
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=12901806&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">夏芽優李</p>
          <p class="video_desc">夏芽優李がGroupyに参加決定！</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=11752211&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">CAST</p>
          <p class="video_desc">CastがGroupyに参加決定！</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=11752188&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">KUNO1</p>
          <p class="video_desc">KUNO1がGroupyに参加決定！</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=13709374&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">小林葉月</p>
          <p class="video_desc">「舞衆一ノ太刀」の小林葉月がgroupyに参加決定</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=13711509&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">「舞宮」「愛音」</p>
          <p class="video_desc">すうぃんぐぱれーどの「舞宮」「愛音」がgroupyに参加決定</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=13709343&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">Ns.aoi</p>
          <p class="video_desc">Ns.aoiがgroupyに参加決定</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=13710331&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">有栖沙</p>
          <p class="video_desc">声優・アニソン歌手である有栖沙がgroupyに参加決定</p>
        </li>
        <li>
          <embed quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=13711414&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
          <p class="video_title">北河杏菜</p>
          <p class="video_desc">アイドル北河杏菜がgroupyに参加決定</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    created: function() {
      let self = this;
        setTimeout(function() {
            let ele = document.querySelector('.videos');
            ele.scrollIntoView();
        },0);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .titles {
    font-size: 26px;
    color: #FB0730;
    height: 36px;
      line-height: 36px;
      position: relative;
      margin: 0 auto 10px;
      width: 190px;
      border-bottom: none;
      span {
        position: absolute;
        display: block;
        width: 100%;
        left: 0;
        top: 12px;
      }
      i {
        position: absolute;
        display: block;
        width: 100%;margin-left:-95px;
        height: 6px;
        left: 50%;
        top: 35px;
        background: #FF8500;
        opacity: 0.5;
      }
  }
    .desc {
      margin-bottom: 52px;
      font-size: 20px;
      color: #FC4083;
    }
  .videos {
    position: relative;
    background: #FFF6FA;
    padding: 42px 0;
    >span {
      position: absolute;
    }
    >span:first-child {
        left: 50%;
        top: 90px;
        width: 58px;
        height: 21px;
        margin-left: 600px;
        background-image: url(../../images/index.png);
        background-position: 0 -1353px;
    }
    >span:nth-child(2) {
        left: 50%;
        top: 750px;
        width: 58px;
        height: 21px;
        margin-left: -750px;
        background-image: url(../../images/index.png);
        background-position: 0 -1353px;
    }
    >span:nth-child(3) {
        left: 50%;
        top: 90px;
        width: 60px;
        height: 32px;
        margin-left: -680px;
        background-image: url(../../images/index.png);
        background-position: 0 -1438px;
    }
    >span:nth-child(4) {
        left: 50%;
        top: 850px;
        width: 60px;
        height: 32px;
        margin-left: 650px;
        background-image: url(../../images/index.png);
        background-position: 0 -1438px;
    }
    h4 {
      color: #00B4BC;
    }
    .videos_list {
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      li {
        float: left;
        padding-bottom: 42px;
        width: 45% ;
        text-align: left;
        embed {
          width: 544px;
          height: 415px;
        }
        &:nth-child(2n - 1) {
          margin-right: 5%;
        }
      }
    }
  }
  @media screen and (max-width: 980px) {
    .videos .videos_list {
      max-width: 1200px;
      li {
        &:not(:nth-child(3n - 2)) {
          margin-left: 40px;
        }
        a {
          width: 300px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
