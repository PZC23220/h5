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
                    <li v-for="(comment,key) in commentList" :class="[{'idol_comment' : comment.userType == 'idol'},{'lastLi' : key == commentList.length-1},{'firstLi' : key == 0}]">
                        <div class="comment_info">
                            <img v-lazy="comment.avatar" alt="" class="avatar">
                            <span class="name">{{comment.nickname?comment.nickname:'...'}}</span>
                            <span class="level" style="margin-top: 11px;" v-if="comment.userType == 'fans'">Lv.{{comment.levelPlatform}}</span>
                            <img class="medal_level" :src="'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_metal_'+(comment.medal)+'.png'" style="margin-top: 11px;" v-if="comment.medal&&comment.medal>0" alt="">
                        </div>
                        <div class="comment_content">
                            <p v-html="TransferString(comment.content)"></p>
                            <div class="comment_img" v-if="comment.imgs?comment.imgs.length > 0:false">
                                <span :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="(img,idx) in JSON.parse(comment.imgs)"><img v-lazy="img" alt="" class="autoHeight" @click="showBigImg(JSON.parse(comment.imgs),idx)"></span>
                            </div>
                            <div class="comment_reply" v-if="comment.referencePostView">
                                <p class="comment_reply_content"><em>{{comment.referencePostView.nickname}}</em> <p v-html="TransferString(comment.referencePostView.content)"></p></p>
                                <div class="comment_img" v-if="comment.referencePostView.imgs?comment.referencePostView.imgs.length > 0:false">
                                    <span :class="{'oneImg' : JSON.parse(comment.referencePostView.imgs).length == 1}" v-for="(img2,idx2) in JSON.parse(comment.referencePostView.imgs)"><img v-lazy="img2" alt="" class="autoHeight" @click="showBigImg(JSON.parse(comment.referencePostView.imgs),idx2)"></span>
                                </div>
                            </div>
                            <div class="reply"><span v-html="formatTime(comment.createTime)"></span><span @click="publishComment(comment)"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/icon_comment_blue.png"><em>リプライ</em></span></div>
                        </div>
                    </li>
                    <div class="default_page" v-show="commentList.length == 0 && idx!=0">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_no message.png" alt="">
                        <p v-html="msg_text.noneComment"></p>
                    </div>
                </ul>
            <!-- </scroller> -->
            </v-scroll>
        </div>
        <div class="publich_comment" @click="publishComment()"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/edit/timeline_icon_edit.png" alt=""><span>{{msg_text.publish}}</span></div>
        <div class="publich_tips" @click="publishComment()" :class="{'Lheight':msg_text.pubMsg == '发表评论'}" v-show="commentList.length == 0 && idx!=0"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/edit/tips_edit.png" alt=""><em v-html="msg_text.pubMsg"></em></div>
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
                let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
                http.get('/post/list',{
                    params: {
                        targetType: 3,
                        targetId: getParams('targetId'),
                        from: self.start,
                        rows: self.num
                    }
                }).then(function(res){
                    console.log(res)
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
                            bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                         }
                    })
                });
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd') + '&nbsp;' + timer.Format('hh:mm');
            },
            publishComment(obj) {
                console.log(obj)
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('toPublish',obj)
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