<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="zIndex"  @click.prevent="deleteItem(index)"><img src="../images/video_icon_report.png" width="18px" style="float: left;margin-top: 17.5px;margin-right: 5px;" alt="">举报</div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number
        },
        data() {
            return {
                startX: 0,       //触摸位置
                  moveX: 0,       //滑动时的位置
                  disX: 0,       //移动距离
                  txtStyle: '',
                delWidth: 583,
                top: '',
                zIndex: 'right:-70px;',
            }
        },
        methods: {
            _touchStart: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    // console.log(this.startX)
                }
                ev.preventDefault();
                 ev.stopPropagation();
            },
            _touchMove: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0rem)";
                        this.zIndex = "right:-70px;";
                    }else if (this.disX > 0) {
                    //如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        // this.txtStyle = "transform:translateX(-" + this.disX/100 + "rem)";
                        if (this.disX >= this.delWidth/100) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth/100 + "rem)";
                            this.zIndex = "right:0;";
                        }
                    }
                }
                ev.preventDefault();
                ev.stopPropagation();
            },
            _touchEnd: function(ev) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    // this.zIndex = "right:-70px;";
                    // console.log(event.changedTouches[0].clientX)
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮

                }
                ev.preventDefault();
                ev.stopPropagation();
            },
            deleteItem: function(index) {
                // console.log(index)
                this.txtStyle = "transform:translateX(0rem)";
                this.zIndex = "right:-70px;";
                this.$emit('deleteItem', index);
                // window.setupWebViewJavascriptBridge(function(bridge) {
                //     let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                //      if(_lan === 'zh-cn') {
                //         bridge.callHandler('makeToast', '举报成功，我们将尽快审核');
                //      }else {
                //         bridge.callHandler('makeToast', '举报成功，我们将尽快审核');
                //      }
                // })
            }
        }
    }
</script>

<style>
    .left-delete{
        width:100%;
        height:100%;
        position:relative;
        overflow: hidden;
        box-sizing: border-box;
        padding: 12px 12px;
    }
    .move{
        /* position: relative; */
        overflow: hidden;
        transition: all 0.3s;
    }
    .deleteIcon{
        width: 50px;
        padding-left: 12px; 
        padding-right: 8px;
        background: #ff2955;
        position: absolute;
        color: #fff;
        height: 55px;
        line-height: 55px;
        overflow: hidden;
        top:0;
        transition: all 0.3s;
    }
</style>