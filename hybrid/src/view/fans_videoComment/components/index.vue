<template>
    <div class="main">
        <div class="header" :class="{'ios': android == false}">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/close/close.png" alt="" @click="close()">
            <span>{{video_text.pubMsg}}({{commentList.length}})</span>
        </div>
        <div class="content" :class="{'ios': android == false}" ref="viewBox">
            <!-- <scroller ref="my_scroller" class="my-scroller"
              :on-refresh="refresh"
              :on-infinite="infinite" 
              :noDataText="''"> -->
            <v-scroll :on-refresh="refresh" :on-infinite="infinite">
                <ul class="comment_list dynamic">
                    <!-- <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                        <p>{{msg_text.load}}</p>
                        <span></span>
                    </div> -->
                    <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                        <li class="defalt_msg" :class="{'firstLi':loadingBig}">
                            <div class="userinfo">
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
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
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
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
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
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
                                <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" alt="" class="avatar">
                                <span></span>
                                <i></i>
                            </div>
                            <div class="comment_content">
                                <p></p>
                                <div class="comment_img"></div>
                            </div>
                        </li>
                    </div>
                    <li v-for="(comment,key) in commentList" :class="[{'lastLi' : commentList.length > 5 && key == commentList.length-1},{'firstLi' : key == 0}]">
                        <div class="comment_info">
                            <img class="avatar" v-lazy="comment.avatar" alt="">
                            <span class="name">{{comment.nickname?comment.nickname:'...'}}</span>
                            <span class="level" style="margin-top: 1px;">Lv.{{comment.levelPlatform?comment.levelPlatform:0}}</span>
                            <img class="medal_level" style="margin-top: 2px;" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/medal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt="">
                            <i v-html="formatTime(comment.createTime)" style="width: calc(100% - 40px);margin-left: calc(100vw * -0.083333);"></i>
                        </div>
                        <div class="comment_content" v-html="TransferString(comment.content)"></div>
                    </li>
                    <div class="default_page default_page3" v-show="commentList.length == 0 && loadingBig == false">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no comment.png" alt="">
                        <p v-html="video_text.noneComment"></p>
                    </div>
                </ul>
            <!-- </scroller> -->
            </v-scroll>
        </div>
        <!-- <div class="publich_comment" @click="publishComment()"><img src="/img/timeline_icon_edit.png" alt=""><span>{{msg_text.publish}}</span></div> -->
        <div class="publich_comment" @click="autoFocus()"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/edit/timeline_icon_edit.png" alt=""><span>{{video_text.publish}}</span></div>
        <div class="comment_view" v-show="win_show" @touchmove.prevent>
            <div class="comment_desc"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/close/close.png" alt="" @click="win_show=false"><i>{{video_text.pubMsg}}({{commentList.length}})</i><span @click="publish()">{{video_text.load}}</span></div>
            <textarea :placeholder="video_text.pla" autofocus v-model="comment_text"></textarea>
            <!-- <div class="publish" @click="publish()">发表</div> -->
        </div>
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
<script>
    // import VueLazyload from 'vue-lazyload'
    // import VueScroller from 'vue-scroller';
    import Scroll from '../../../components/scroll.vue';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    // require('@api/js/vconsole.min.js')
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
                comment_text: '',
                autoHeight: 'bottom:0',
                autoHarder: 'top:0',
                token_:'',
                autoContent: 'top:66px;height: calc(100vh -114px);',
                video_text: {
                    publish: 'コメントする',
                    pubMsg: 'コメント',
                    noneComment: 'まだ書き込みはないようです',
                    load: '送信',
                    pla: 'アイドルにあなたの大切な想いを届けよう...'
                },
                win_show: false,
                can_publish: true,
                android: false
            }
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            changeCount() {
                setTimeout(function(){
                    document.querySelector('.header').scrollIntoView(false);
                    // document.querySelector('body').style.height = window.innerHeight + 'px';
                    // document.querySelector('html').style.height = window.innerHeight + 'px';
                },0)
            },
            autoFocus() {
                let self = this;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('can_post', function(res){
                        if(res) {
                            self.win_show = true;
                            setTimeout(function(){
                                document.querySelector('textarea').focus();
                            },10);
                        }
                    });
                })
            },
            TransferString(content) {
                 let string = content;    
                 try{    
                    string=string.replace(/\r\n/g,"<br>")    
                    string=string.replace(/\n/g,"<br>");    
                 }catch(e) {    
                    console.log(e.message);    
                 }
                 return string;    
            },
            getComments() {
                let self = this;
                if(self.idx < 2) {
                    self.idx++;
                    http.get('/post/list',{
                        params: {
                            targetType: 1,
                            targetId: getParams('videoId'),
                            from: self.start,
                            rows: self.num
                        }
                    }).then(function(res){
                        self.loadingBig = false;
                        self.showLoading = false;
                        console.log(res.data);
                        if(res.data.length > 0 ) {
                            for(var i=0;i<res.data.length;i++){
                                self.commentList.push(res.data[i]);
                            }                    
                        }else {
                            self.havedlast = true;
                        }
                        console.log(self.commentList);
                    }).catch(function(){
                        self.loadingBig = false;
                        self.getComments();
                    });
                }else {  
                    // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        // if(_lan === 'zh-cn') {
                        //     bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                        //  }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                         // }
                    })
                }
            },
            publish() {
                let self = this;
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                if(self.can_publish) {
                    if(self.comment_text !=""){
                        self.can_publish = false;
                        self.token_ = getParams('token');
                        if(self.token_!='(null)' && self.token_!='') {
                            http.defaults.headers.common['Authorization'] = 'Token '+self.token_;
                        }
                        let _data = {
                            content:self.comment_text,
                            targetType: 1,
                            targetId: getParams('videoId')
                        }
                        http.post('/post/add',JSON.stringify(_data)).then(function(res){
                            if(res.status) {

                                self.refresh();
                                self.comment_text = '';
                                console.log(res)
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                    bridge.callHandler('makeToast', 'コメント投稿が完了しました。');
                                });
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('did_post',{'post':res});
                                })
                            }else {
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                    // if(_lan === 'zh-cn') {
                                    //     bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                                    //  }else {
                                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                                     // }
                                });
                                window.setupWebViewJavascriptBridge(function(bridge) {
                                    bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                        self.token_ = responseData.token;
                                    })
                                })
                            }
                            self.win_show = false;
                            self.can_publish = true;
                        }).catch(function(err){
                            self.can_publish = true;
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                // if(_lan === 'zh-cn') {
                                //     bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                                //  }else {
                                    bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                                 // }
                            })
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                    self.token_ = responseData.token;
                                })
                            })
                        });
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            // if(_lan === 'zh-cn') {
                            //         bridge.callHandler('makeToast', '请添加内容');
                            //      }else {
                                    bridge.callHandler('makeToast', 'コメントを入力してください');
                                 // }
                        })
                    }
                }
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
            showBigImg(url) {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showImage', {'url': url})
                })
            },
            close() {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('close');
                })
            },
            refresh (done) {
                var self = this;
                http.get('/post/list',{
                    params: {
                        targetType: 1,
                        targetId: getParams('videoId'),
                        from: 0,
                        rows: self.num
                    }
                }).then(function(res){
                    self.start = 0;
                    self.havedlast = false;
                    self.showLoading2 = false;
                     self.commentList = res.data;                  
                    console.log(self.commentList);
                }).catch(function(){
                    self.showLoading2 = false;
                });
                setTimeout(() => {
                  done()
                }, 500)
          },
          infinite (done) {
            var self = this;
            self.idx = 0;
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
          window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('keyboard_status_changed', function(data) {
                    // self.autoHeight='bottom:'+(data.height)+ 'px;transition: all '+ data.duration +'s;';
                    // self.autoHarder='top:'+(data.height)+ 'px;transition: all '+ data.duration +'s;';
                    // self.autoContent='top:'+(data.height+66)+ 'px;height:calc(100vh - '+(data.height+66)+'px);transition: all '+ data.duration +'s;';
                })
            });
          window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('addComment', function() {
                    self.autoFocus()
                })
          });
        },
        created() {
            var self = this;
            if(getParams('addComment') ==1) {
                self.win_show = true;
            }
            if(getParams('platform') == 'android') {
                self.android = true;
            }
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            //  if(_lan === 'zh-cn') {
            //      self.video_text= {
            //         publish: '添加评论',
            //         pubMsg: '评论',
            //         noneComment: '还没有留言',
            //         load: '发布',
            //         pla: '添加评论...'
            //     }
            //   } else {
            //     self.video_text= {
            //         publish: 'コメントする',
            //         pubMsg: 'コメント',
            //         noneComment: 'まだ書き込みはないようです',
            //         load: '送信',
            //         pla: 'アイドルにあなたの大切な想いを届けよう...'
            //     }
            //   }
            self.getComments();

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .header {
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 43px;
        img {
            position: absolute;
            left: 12px;
            width: 22px;
            padding: 10.5px 5px;
        }
    }
    .header.ios {
        padding-top: 22px;
    }
    .content {
        background: #eee;
    }
    .content.ios {
        height: calc(100vh - 66px);
        top: 66px;
    }
    i {
        text-align: right;
    }
    .comment_info {
        .avatar {
            width: 40px;
            height: 40px;
        }
    }
    .name {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        max-width: calc(100vw - 140px);
    }
    .Lheight {
        line-height: 54px;
    }
    .default_page {
        height: calc(100vh - 66px);
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
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 10;
            -webkit-box-orient: vertical;
        }
    }
    .page_defalt {
        opacity: 0.8;
        transition: all 0.3s;
        overflow:hidden;
        height: 240px;
        width: 100%;
    }
    .page_defalt_none {
        opacity:0;
        height: 0;
        border: none;
    }
    .publich_comment {
        position: absolute;
        right: 12px;
        bottom: 18px;
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
    .comment_view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: #fff;
        z-index: 200;
        overflow: hidden;
        .comment_desc {
            padding: 22px 12px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            text-align: center;
            overflow: hidden;
            line-height: 46px;
            font-size: 18px;
            img {
                width: 22px;
                padding: 13.5px 5px 10.5px;
                float: left;
            }
            span {
                font-size: 14px;
                padding: 5px;
                color: #FC4083;
                border: 1px solid #FC4083;
                border-radius: 50px;
                float: right;
                // opacity: 0.5;
                width: 60px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                margin-top: 8px;
            }
        }
        textarea {
            width: 100%;
            height: 220px;
            box-sizing: border-box;
            border: none;
            padding: 5px 12px;
            font-size: 16px;
            line-height: 24px;
        }
    }
</style>