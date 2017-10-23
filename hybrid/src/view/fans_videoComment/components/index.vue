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
                                <img class="avatar"  v-lazy="comment.avatar" alt="">
                                <span class="name">{{comment.nickname?comment.nickname:'...'}}</span>
                                <span class="level" style="margin-top: 11px;">Lv.{{comment.levelPlatform}}</span>
                                <img class="medal_level" style="margin-top: 11px;" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/medal/icon_medal_'+(comment.medal)+'.png'" v-if="comment.medal&&comment.medal>0" alt="">
                            </div>
                            <div class="comment_content" v-html="TransferString(comment.content)"></div>
                            <div class="comment_reply" v-if="comment.referencePostView"><span>{{comment.referencePostView.nickname}}</span> <p v-html="TransferString(comment.referencePostView.content)"></p></div>
                            <div class="reply"><span v-html="formatTime(comment.createTime)"></span><span @click="autoFocus(comment)" v-if="isIdol"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/icon_comment_blue.png"><em>リプライ</em></span></div>
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
            <div class="comment_desc"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/close/close.png" alt="" @click="isClose()"><i>{{video_text.pubMsg}}({{commentList.length}})</i><span @click="publish()">{{video_text.load}}</span></div>
            <div class="reply_comment_content" v-if="reply_comment_content"><span>{{reply_comment_content_fans}}</span>{{reply_comment_content}}</div>
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
                android: false,
                isIdol: false,
                reply_content: '',
                reply_comment_content: '',
                reply_comment_content_fans: '',
                commentId: ''
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
            autoFocus(obj) {
                let self = this;
                if(obj) {
                    this.reply_comment_content = obj.content;
                    this.reply_comment_content_fans = obj.nickname;
                    this.commentId = obj.id;
                }else {
                    this.reply_comment_content = '';
                    this.reply_comment_content_fans = '';
                    this.commentId = '';
                }
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('can_post', function(res){
                        if(res) {
                            self.win_show = true;
                            setTimeout(function(){
                                document.querySelector('textarea').focus();
                            },0);
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
                        if(!self.token_) {
                            self.token_ = getParams('token');
                        }
                        if(self.token_!='(null)' && self.token_!='') {
                            http.defaults.headers.common['Authorization'] = 'Token '+self.token_;
                        }
                        let _data = {
                            content:self.comment_text,
                            targetType: 1,
                            targetId: getParams('videoId'),
                            reference: self.commentId?self.commentId:'-1'
                        }

                        http.post(`/post/add?type=${self.isIdol?'idol':'fans'}`,JSON.stringify(_data)).then(function(res){
                            if(res.status) {

                                self.refresh();
                                self.comment_text = '';
                                self.reply_comment_content = '';
                                self.reply_comment_content_fans = '';
                                self.commentId = '';
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
                let timer = new Date(key - 1*60*60*1000);
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
            isClose() {
                if(getParams('addComment') ==1) {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('close');
                    })
                }else {
                    this.win_show=false;
                }
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
                    self.reply_comment_content = '';
                    self.reply_comment_content_fans = '';
                    self.commentId = '';                  
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
            if(getParams('idolId') && (getParams('idolId') == getParams('videoIdolId'))) {
                self.isIdol = true;
            }else {
                self.isIdol = false;
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

