<!-- 下拉刷新 上拉加载更多 组件 -->
<template>
  <div
    class="yo-scroll"
    :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <!-- 顶部提示语(刷新) -->
      <header class="pull-refresh">
        <slot name="pull-refresh">
          <span class="down-tip loadingImg"><i></i>{{scroll_text.down}}</span>
          <span class="up-tip loadingImg"><i></i>{{scroll_text.up}}</span>
          <span class="refresh-tip loadingImg"><i></i>{{scroll_text.refresh}}</span>
        </slot>
      </header>
      <!-- 父组件 列表部分 -->
      <slot>
      </slot>
      <!-- 底部提示语(加载更多) -->
      <footer class="load-more">
        <slot name="load-more">
          <span v-show="downFlag === false">{{scroll_text.load}}</span>
          <span v-show="downFlag === true">{{scroll_text.loadMore}}</span>
        </slot>
      </footer>
      <!-- 暂无数据提示语 -->
      <div class="nullData" v-show="dataList.noFlag">{{scroll_text.loadEnd}}</div>
    </section>
  </div>
</template>

<script>
  require('@api/js/common.js')
  export default {
    // 接收父组件参数
    props: {
      marginTop: {
        default: "margin-top:40px;"
      },
      // 默认高度
      offset: {
        type: Number,
        default: 100
      },
      // 是否支持加载更多
      enableInfinite: {
        type: Boolean,
        default: true
      },
      // 是否支持刷新
      enableRefresh: {
        type: Boolean,
        default: true
      },
      // 是否显示'暂无数据'
      dataList: {
        default: false,
        required: false
      },
      // 刷新方法
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      // 加载更多方法
      onInfinite: {
        type: Function,
        default: undefined,
        required: false
      }
    },
    data() {
      return {
        top: 0, // 下拉高度
        state: 0, // 状态: 0 下拉/ 1 上拉 / 2 刷新
        startX: 0, // 手指滑动起始位置 X轴
        startY: 0, // 手指滑动起始位置 Y轴
        touching: false, // -webkit-overflow-scrolling
        infiniteLoading: false, // 加载更多效果
        downFlag: false, //用来显示是否加载中
        scroll_text: {
          down: '引き上げて更新',
          up: 'はなして更新',
          refresh: '更新中...',
          loadMore: '読み込み中...',
          loadEnd: '全て表示されました',
          load: '上にスライドしてもっと見る',
        }
      }
    },
    methods: {
      // 手指刚开始滑动
      touchStart(e) {
        this.startY = e.targetTouches[0].pageY;
        this.startX = e.targetTouches[0].pageX;
        this.startScroll = this.$el.scrollTop || 0;
        this.touching = true; //留着有用，不能删除
        this.dataList.noFlag = false; // 默认 不显示'暂无数据'
        this.$el.querySelector('.load-more').style.display = 'block';// 实体化加载更多
      },
      // 手指移动中
      touchMove(e) {
        if(!this.enableRefresh || this.dataList.noFlag || !this.touching) {
          return
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if(diff > 0) e.preventDefault()
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
        if(this.state === 2) { // 刷新中
          return
        }
        if(this.top >= this.offset) {
          this.state = 1
        } else {
          this.state = 0
        }
        let more = this.$el.querySelector('.load-more');
        if(!this.top && this.state === 0) {
          more.style.display = 'block';
        } else {
          more.style.display = 'none';
        }
      },
      // 手指结束滑动
      touchEnd(e) {
        if(!this.enableRefresh) {
          return
        }
        this.touching = false
        if(this.state === 2) { // 刷新中
          this.state = 2
          this.top = this.offset
          return
        }
        if(this.top >= this.offset) { // 进行刷新
          this.refresh()
        } else { // 取消刷新
          this.state = 0
          this.top = 0
        }
        //用于判断滑动是否在原地 ----begin
        let endX = e.changedTouches[0].pageX,
          endY = e.changedTouches[0].pageY,
          dy = this.startY - endY,
          dx = endX - this.startX;
        //如果滑动距离太短
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          return;
        }
        //--------end--------
        if(!this.enableInfinite || this.infiniteLoading) {
          return
        }
        let outerHeight = this.$el.clientHeight,
          innerHeight = this.$el.querySelector('.inner').clientHeight,
          scrollTop = this.$el.scrollTop,
          ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
          bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
        if(bottom <= this.offset && this.state === 0) {
          this.downFlag = true;
          this.infinite();
        } else {
          this.$el.querySelector('.load-more').style.display = 'none';
          this.downFlag = false;
        }
      },
      // 刷新
      refresh() {
        this.state = 2;
        this.top = this.offset;
        setTimeout(() => {
          this.onRefresh(this.refreshDone)
        }, 300);
      },
      // 结束刷新
      refreshDone() {
        this.state = 0
        this.top = 0
      },
      // 加载更多
      infinite() {
        this.infiniteLoading = true
        setTimeout(() => {
          this.onInfinite(this.infiniteDone);
        }, 500);
      },
      // 结束加载更多
      infiniteDone() {
        this.infiniteLoading = false
      }
    },
    created() {
    var self = this;
    if(getParams('language') == 'cn') {
         self.scroll_text=  {
            down: '下拉可以刷新',
            up: '松开立即刷新',
            refresh: '更新中...',
            loadMore: '加载中...',
            loadEnd: ' 已加载全部内容',
            load: '上拉加载更多',
         }
      } else {
        self.scroll_text = {
          down: '引き上げて更新',
          up: 'はなして更新',
          refresh: '更新中...',
          loadMore: '読み込み中...',
          loadEnd: '全て表示されました',
          load: '上にスライドしてもっと見る',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .yo-scroll {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #eee;
  }
  .yo-scroll .inner {
    position: absolute;
    top: -47.5px;
    width: 100%;
    transition-duration: 300ms;
  }
  .yo-scroll .pull-refresh {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 47.5px;
    display: flex;
    align-items: left;
    justify-content: left;
  }
  .yo-scroll.touch .inner {
    transition-duration: 0ms;
  }
  .yo-scroll.down .down-tip {
    display: block;
  }
  .yo-scroll.up .up-tip {
    display: block;
  }
  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
  .yo-scroll .down-tip,
  .yo-scroll .refresh-tip,
  .yo-scroll .up-tip {
    display: none;
  }
  .yo-scroll .load-more {
    /* height: 80px; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yo-scroll .loadingImg {
    padding: 0 12px;
    color: #666;
  }
  .yo-scroll .loadingImg i {
      background-image: url(https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/loading.gif);
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% auto;
      width:  90.5px !important;
      height: 47.5px !important;
      /*transition: all .15s linear;*/
      /*animation: changebg 1s linear infinite;*/
  }
  .nullData,.load-more {
    text-align: center;
    color: #999;
  }
  // .yo-scroll {
  //   // margin-top: 40px; // 解决有标题栏的bug
  //   font-size: 16px;
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  //   overflow: auto;
  //   z-index: 100;
  //   height: auto;
  //   -webkit-overflow-scrolling: touch;
  //   .inner {
  //     position: absolute;
  //     top: -50px;
  //     width: 100%;
  //     height: auto;
  //     transition-duration: 300ms;
  //     .pull-refresh {
  //       position: relative;
  //       left: 0;
  //       top: 0;
  //       width: 100%;
  //       height: 50px;
  //       display: flex;
  //       display: -webkit-flex;
  //       align-items: center;
  //       justify-content: center;
  //     }
  //     .load-more {
  //       height: 50px;
  //       line-height: 50px;
  //       display: flex;
  //       text-align: center;
  //       align-items: center;
  //       justify-content: center;
  //       display: none;
  //     }
  //     .nullData { //暂无更多数据样式
  //       font-size: 16px;
  //       color: #999999;
  //       height: 50px;
  //       line-height: 60px;
  //       text-align: center;
  //     }
  //     .down-tip,
  //     .refresh-tip,
  //     .up-tip {
  //       display: none;
  //     }
  //     .up-tip:before,
  //     .refresh-tip:before {
  //       content: '';
  //       display: inline-block;
  //       width: 110px;
  //       height: 40px;
  //       font-size: 16px;
  //       background-size: 70% !important;
  //       position: absolute;
  //       top: 0;
  //       left: 20%;
  //     }
  //     .up-tip:before {
  //       background: url(https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/loading.gif) no-repeat left;
  //     }
  //     .refresh-tip:before {
  //       background: url(https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/loading.gif) no-repeat left;
  //     }
  //   }
  // }

  // .yo-scroll.touch .inner {
  //   transition-duration: 0;
  // }

  // .yo-scroll.down .down-tip {
  //   display: block;
  // }

  // .yo-scroll.up .up-tip {
  //   display: block;
  // }

  // .yo-scroll.refresh .refresh-tip {
  //   display: block;
  // }
</style>
