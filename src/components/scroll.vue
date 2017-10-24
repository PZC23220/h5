<template lang="html">
  <div class="yo-scroll"
  :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
  @touchstart="touchStart($event)"
  @touchmove="touchMove($event)"
  @touchend="touchEnd($event)"
  @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
           <span class="down-tip loadingImg"><i></i>引き上げて更新</span>
           <span class="up-tip loadingImg"><i></i>はなして更新</span>
           <span class="refresh-tip loadingImg"><i></i>更新中...</span>
        </slot>
      </header>
      <slot></slot>
      <footer class="load-more" v-show="more_true">
        <slot name="load-more">
          <span class="loadMore loadingImg" v-if="loading">読み込み中...</span>
          <span class="loadEnd loadingImg" v-if="loading == false">全て表示されました</span>
        </slot>
      </footer>
    </section>
  </div>
</template>

<script>
// require('@api/js/vconsole.min.js')
export default {
  props: {
    offset: {
      type: Number,
      default: 90
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false,
      loading: true,
      more_true: false,
      scroll_text: {
        down: '引き上げて更新',
        up: 'はなして更新',
        refresh: '更新中...',
        loadMore: '読み込み中...',
        loadEnd: '全て表示されました'
      }
    }
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true
      // e.preventDefault()
    },
    touchMove(e) {
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    touchEnd(e) {
      if (!this.enableRefresh) return
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    refresh() {
      this.state = 2
      this.top = this.offset
      this.onRefresh(this.refreshDone)
    },
    refreshDone() {
      this.state = 0
      this.top = 0
    },

    infinite() {
      this.infiniteLoading = true
      this.more_true = true
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone() {
      var self = this;
      this.infiniteLoading = false
      setTimeout(function(){
        self.loading = false
      },500)
    },

    onScroll(e) {
      if (!this.enableInfinite || this.infiniteLoading) {
        return
      }
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$el.scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
      if (bottom < infiniteHeight) this.infinite()
    }
  }
}
</script>
<style scoped>
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
  top: -71.5px;
  width: 100%;
  transition-duration: 300ms;
}
.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 71.5px;
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
  padding: 12px;
  color: #666;
}
.yo-scroll .loadingImg i {
    background-image: url(/img/pic_loading_1.png);
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
    width:  90.5px !important;
    height: 47.5px !important;
    transition: all .15s linear;
    animation: changebg 1s linear infinite;
    margin-bottom: 5px;
}
@keyframes changebg{
  from {background-image: url(/img/pic_loading_1.png);}
  to {background-image: url(/img/pic_loading_2.png);}
}  
</style>