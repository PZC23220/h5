<template>
    <div class="main">
        <div class="content" style="top: 0">
           <!--  <scroller ref="my_scroller" class="my-scroller"
              :on-refresh="refresh"
              :on-infinite="infinite" 
              :noDataText="noDataText"> -->
              <v-scroll :on-refresh="refresh" :on-infinite="infinite">
                <ul class="comment_list dynamic">
                    <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                        <li class="defalt_msg" :class="{'firstLi':loadingBig}">
                            <div class="userinfo">
                                <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" alt="" class="avatar">
                                <span></span>
                                <i></i>
                            </div>
                            <div class="comment_content">
                                <p></p>
                                <div class="comment_img"></div>
                            </div>
                        </li>
                        <li class="defalt_msg">
                            <div class="userinfo">
                                <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" alt="" class="avatar">
                                <span></span>
                                <i></i>
                            </div>
                            <div class="comment_content">
                                <p></p>
                                <div class="comment_img"></div>
                            </div>
                        </li>
                        <li class="defalt_msg">
                            <div class="userinfo">
                                <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" alt="" class="avatar">
                                <span></span>
                                <i></i>
                            </div>
                            <div class="comment_content">
                                <p></p>
                                <div class="comment_img"></div>
                            </div>
                        </li>
                        <li class="defalt_msg">
                            <div class="userinfo">
                                <img src="http://h1.groupy.vip/groupy_h5/default_img/default_img.png" alt="" class="avatar">
                                <span></span>
                                <i></i>
                            </div>
                            <div class="comment_content">
                                <p></p>
                                <div class="comment_img"></div>
                            </div>
                        </li>
                    </div>
                    <li v-for="(comment,key) in commentList" :class="[{'idol_comment' : comment.userType == 'idol'},{'lastLi' : key == commentList.length-1},{'firstLi' : key == 0}]">
                        <div class="comment_info">
                            <img v-lazy="comment.avatar" alt="" class="avatar">
                            <span class="name">{{comment.nickname?comment.nickname:'...'}}</span>
                            <span class="level" style="margin-top: 1px;" v-if="comment.userType == 'fans'">Lv.{{comment.levelPlatform}}</span>
                            <img class="medal_level" :src="'http://h3.groupy.vip/groupy_h5/crown_metal/icon_metal_'+(comment.medal)+'.png'" style="margin-top: 0px;" v-if="comment.medal&&comment.medal>0" alt="">
                            <i v-html="formatTime(comment.createTime)" style="width: calc(100% - 40px);margin-left: calc(100vw * -0.083333);"></i>
                        </div>
                        <div class="comment_content">
                            <p>{{comment.content}}</p>
                            <div class="comment_img" v-if="comment.imgs?comment.imgs.length > 0:false">
                                <span :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="(img,idx) in JSON.parse(comment.imgs)"><img v-lazy="img" alt="" class="autoHeight" @click="showBigImg(JSON.parse(comment.imgs),idx)"></span>
                            </div>
                        </div>
                    </li>
                    <div class="default_page" v-show="commentList.length == 0 && idx!=0">
                        <img src="http://h1.groupy.vip/groupy_h5/default_img/default_no message.png" alt="">
                        <p v-html="msg_text.noneComment"></p>
                    </div>
                </ul>
            <!-- </scroller> -->
            </v-scroll>
        </div>
        <div class="publich_comment" @click="publishComment()"><img src="http://h2.groupy.vip/groupy_h5/edit/timeline_icon_edit.png" alt=""><span>{{msg_text.publish}}</span></div>
        <div class="publich_tips" @click="publishComment()" :class="{'Lheight':msg_text.pubMsg == '发表评论'}" v-show="commentList.length == 0 && idx!=0"><img src="http://h2.groupy.vip/groupy_h5/edit/tips_edit.png" alt=""><em v-html="msg_text.pubMsg"></em></div>
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
<script>
    import http from '@api/js/http.js';
    // import VueScroller from 'vue-scroller';
    import VueLazyload from 'vue-lazyload'
    require('@api/js/common.js')
    // require('@api/js/vconsole.min.js')
    import Scroll from '../../../components/scroll.vue';
    export default {
        data() {
            return {
                commentList: [],
                // 选择滚动事件的监听对象
                scroll: '',
                start: 0,
                num: 20,
                showLoading: false,
                showLoading2: false,
                loadingBig: true,
                havedlast: false,
                publishLink: '',
                idx:0,
                msg_text: {
                    publish: '投稿',
                    pubMsg: '投稿して<br>盛り上がろう',
                    noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                    load: '読み込み中',
                    loadAll: '全て表示されました'

                },
                noDataText: '全て表示されました'
            }
        },
        components : {
        'v-scroll': Scroll
        },
        methods: {
            getComments() {
                let self = this;
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                http.get('/post/list',{
                    params: {
                        targetType: 3,
                        targetId: getParams('targetId'),
                        from: self.start,
                        rows: self.num
                    }
                }).then(function(res){
                    self.idx++;
                    self.loadingBig = false;
                    self.showLoading = false;
                    // console.log(res.data);
                    if(res.data.length > 0 ) {
                        for(var i=0;i<res.data.length;i++){
                            self.commentList.push(res.data[i]);
                        }                    
                    }else {
                        self.havedlast = true;
                    }
                    // console.log(self.commentList);
                }).catch(function(){
                    self.loadingBig = false;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        if(_lan === 'zh-cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                         }
                    })
                });
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd') + '&nbsp;' + timer.Format('hh:mm');
            },
            publishComment() {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('toPublish')
                })
            },
            showBigImg(url,idx) {
                console.log(url,idx)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showImage', {'urls': url,selectedIndex :idx})
                })
            },
            refresh (done) {
                // console.log(done);
                var self = this;
                http.get('/post/list',{
                    params: {
                        targetType: 3,
                        targetId: getParams('targetId'),
                        from: 0,
                        rows: self.num
                    }
                }).then(function(res){
                    self.start = 0;
                    self.havedlast = false;
                    self.showLoading2 = false;
                     self.commentList = res.data;                  
                    // console.log(self.commentList);
                }).catch(function(){
                    self.showLoading2 = false;
                });
                setTimeout(() => {
                    done(true);
                    // console.log(document.querySelector('._v-content'));
                    // document.querySelector('._v-content').style.transform = 'translate3d(0px, 0px, 0px) scale(1) !important';
                }, 500)
          },
          infinite (done) {
            var self = this;
            if(self.commentList.length>0) {
               if (self.havedlast) {
                  setTimeout(() => {
                    done(true)
                  }, 500)
                  return;
                } else {
                    setTimeout(() => {
                      self.start = self.start + self.num;
                      self.getComments();
                      done()
                    }, 500)
                }
            }else {
              setTimeout(() => {
                done(true)
              }, 1500)
              return;
            }
          }
        },
        mounted() {
            var self = this;
          window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('comment_refresh', function() {
                    self.refresh();
                })
          });
        },
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 self.msg_text= {
                    publish: '发表',
                    pubMsg: '发表评论',
                    noneComment: '还没有留言<br>去发布留言，让粉丝来互动吧！',
                    load: '加载中',
                    loadAll: '已加载全部内容'

                }
              } else {
                self.msg_text= {
                    publish: '投稿',
                    pubMsg: '投稿して<br>盛り上がろう',
                    noneComment: 'まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう',
                    load: '読み込み中',
                    loadAll: '全て表示されました'
                }
              }
            self.getComments();

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        height: 100vh;
    }
    .name {
        max-width: calc(100vw - 140px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
    }
    img.avatar {
        width: 40px;
        height: 40px;
    }
    .publich_comment {
        position: fixed;
        right: 12px;
        bottom: 62px;
        opacity: 0.9;
        background: #00B4BC;
        border-radius: 29px;
        // width: 93.5px;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        color: #fff;
        font-size: 16px;
        img {
            vertical-align: middle;
            margin-right: 6px;
            margin-bottom: 3px;
            width: 25px;
        }
    }
    .publich_tips {
        position: fixed;
        right: 126px;
        bottom: 54px;
        color: #fff;
        font-size: 16px;
        width: 153.5px;
        height: 54px;
        line-height: 27px;
        text-align: center;
        img {
            position: absolute;
            left:0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 54px;
        }
    }
    .Lheight {
        line-height: 54px;
    }
    .default_page {
        height: 100vh;
        background: #eee;
    }
    .loading_top span {
        background: url(/img/pic_loading_1.png);
        background-size: 100% auto;
    }
    .loading_top_show span {
        animation: changebg 1s linear infinite;
    }
    .loading_top_show {
        height: 80px;
    }
    .comment_content p {
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        width: 100%;
    }
    @keyframes changebg{
        from {background: url(/img/pic_loading_1.png);background-size: 100% auto;}
        to {background: url(/img/pic_loading_2.png);background-size: 100% auto;}
    }
    .defalt_msg {
        .userinfo {
            span {
                width: 50px;
                height: 14px;
                background: #eee;
                margin-top:8px;
            }
        }
        .comment_content {
            >* {

                margin-top:10px;
                background: #eee;
                height: 14px;
            }
        }
    }
    .page_defalt {
        height: auto;
        opacity: 0.8;
        transition: all 0.3s;
        overflow:hidden;
    }
    .page_defalt_none {
        height: 0;
        padding:0;
        opacity: 0;
        border: none;
    }
</style>