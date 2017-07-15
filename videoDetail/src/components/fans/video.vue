<template>
    <div class="main">
        <div class="header">
            <img src="../../images/close.png" alt="" @click="close()">
            <span>评论({{commentList.length}})</span>
        </div>
        <div class="content" ref="viewBox" :style="autoContent">
            <scroller ref="my_scroller" class="my-scroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
                <ul class="comment_list dynamic">
                    <!-- <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                        <p>{{msg_text.load}}</p>
                        <span></span>
                    </div> -->
                    <div class="page_defalt" :class="{'page_defalt_none': loadingBig ==false}">
                        <li class="defalt_msg" :class="{'firstLi':loadingBig}">
                            <div class="userinfo">
                                <img :src="'/static/images/default_img.png'" alt="" class="avatar">
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
                                <img :src="'/static/images/default_img.png'" alt="" class="avatar">
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
                                <img :src="'/static/images/default_img.png'" alt="" class="avatar">
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
                                <img :src="'/static/images/default_img.png'" alt="" class="avatar">
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
                            <img class="avatar" :src="comment.avatar?comment.avatar:'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="">
                            <span>{{comment.nickname?comment.nickname:'...'}}</span>
                            <img class="level" :src="comment.levelPlatform?'/static/images/icon_level_'+(comment.levelPlatform)+'.png':'http://h5.groupy.vip/static/images/icon_level_0.png'"  onerror="this.src='http://h5.groupy.vip/static/images/icon_level_0.png'" alt="">
                            <!-- <img class="level" :src="'/static/images/icon_level_'+(comment.medal+1)+'.png'" alt=""> -->
                            <i v-html="formatTime(comment.createTime)"></i>
                        </div>
                        <div class="comment_content" v-html="TransferString(comment.content)"></div>
                    </li>
                    <div class="default_page default_page3" v-show="commentList.length == 0">
                        <img src="../../images/default_no comment.png" alt="">
                        <p v-html="video_text.noneComment"></p>
                    </div>
                </ul>
            </scroller>
        </div>
        <div class="footer">
            <input type="" name="" placeholder="添加评论" v-model="comment_text"  v-on:focus="changeCount()">
            <img src="../../images/timeline_icon_edit 2.png">
            <span @click="publish()">发布</span>
        </div>
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
<script>
    import http from '@env/http.js';
    import VueScroller from 'vue-scroller';
    import VueLazyload from 'vue-lazyload'
    require('../../utils/common.js')
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
                autoContent: 'top:66px;height: calc(100vh -114px);',
                video_text: {
                    Gcoin: 'コイン',
                    like: 'Like',
                    comment: 'コメント',
                    income: '獲得コイン数',
                    gift: 'ギフトリスト',
                    fans: '貢献ランキング',
                    noneGcoin: 'まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう'
                },
            }
        },
        methods: {
            changeCount() {
                setTimeout(function(){
                    document.querySelector('.header').scrollIntoView(false);
                    // document.querySelector('body').style.height = window.innerHeight + 'px';
                    // document.querySelector('html').style.height = window.innerHeight + 'px';
                },0)
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
                http.get('/post/list',{
                    params: {
                        targetType: 1,
                        targetId: self.$route.query.videoId,
                        from: self.start,
                        rows: self.num
                    }
                }).then(function(res){
                    self.idx++;
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
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        if(_lan === 'zh-cn') {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                         }else {
                            bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                         }
                    })
                });
            },
            publish(token) {
                let self = this;
                if(self.$route.query.token == '') {
                    alert('请先登录');
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', '请先登录');
                    })
                    return;
                }
                if(self.comment_text !=""){
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                    }
                    let _data = {
                        content:self.comment_text,
                        targetType: 1,
                        targetId: self.$route.query.videoId
                    }
                    http.post('/post/add',JSON.stringify(_data)).then(function(res){
                        self.refresh();
                        self.comment_text = '';
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('makeToast', '发表评论成功');
                        })
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                        })
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':self.$route.query.videoId}, function responseCallback(responseData) {
                                self.$route.query.token = responseData.token;
                            })
                        })
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', '请输入内容');
                    })
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
                        targetId: self.$route.query.videoId,
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
            }) 
        },
        created() {
            var self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(_lan === 'zh-cn') {
                 self.video_text= {
                    Gcoin: 'G币',
                    like: '人气',
                    comment: '评论',
                    income: '本视频G币',
                    gift: '礼物数量',
                    fans: '粉丝排行',
                    noneGcoin: '还没有收到粉丝的G币<br>分享视频能让更多粉丝关注',
                    noneLike: '还没有收到粉丝的点赞人气<br>分享视频能让更多粉丝关注',
                    noneComment: '还没有评论<br>快来和爱豆互动吧'

                }
              } else {
                self.video_text= {
                    Gcoin: 'コイン',
                    like: 'Like',
                    comment: 'コメント',
                    income: '獲得コイン数',
                    gift: 'ギフトリスト',
                    fans: '貢献ランキング',
                    noneGcoin: 'まだコインはないようです<br>動画を投稿・シェアしてギフトを貰っちゃおう',
                    noneLike: 'まだLikeはないようです<br>動画を投稿・シェアしてLikeを貰っちゃおう',
                    noneComment: 'まだコメントはないようです<br>動画を投稿・シェアしてファンを増やしちゃおう'
                }
              }
            self.getComments();

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .header {
        padding: 22px 12px 0;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 43px;
        background: #fafafa;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        img {
            float: left;
            width: 22px;
            padding: 10.5px 5px;
        }
        p {
            float: right;
            border: 1px solid #FC4083;
            border-radius: 50px;
            font-size: 16px;
            color: #FC4083;
            width: 72px;
            height: 32px;
            line-height: 32px;
            margin-top: 3px;
        }
    }
    .content {
        height: calc(100vh - 114px);
        top: 66px;
        background: #eee;
    }
    i {
        text-align: right;
    }
    .Lheight {
        line-height: 54px;
    }
    .default_page {
        height: calc(100vh - 66px);
        background: #eee;
    }
    .loading_top span {
        background: url(../../images/pic_loading_1.png);
        background-size: 100% auto;
    }
    .loading_top_show span {
        animation: changebg 1s linear infinite;
    }
    .loading_top_show {
        height: 80px;
    }
    @keyframes changebg{
        from {background: url(../../images/pic_loading_1.png);background-size: 100% auto;}
        to {background: url(../../images/pic_loading_2.png);background-size: 100% auto;}
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
    .footer {
        position: absolute;
        left: 0;
        width: 100%;
        // top: calc(100vh - 50px);
        bottom: 0;
        z-index: 100;
        background: #fff;
        box-shadow: 0 -2px 2px 0 rgba(0,0,0,0.07);
        height: 48px;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 12px;
        img {
            position: absolute;
            width: 18px;
            left: 12px;
            top: 13px;
            z-index: 1000;
        }
        input {
            width: calc(100vw - 108px);
            font-size: 18px;
            height: 32px;
            line-height: 32px;
            margin-top: 6px;
            padding-left: 25px;
            box-sizing: border-box;
        }
        span {
            float: right;
            display: block;
            width: 72px;
            height: 32px;
            line-height: 32px;
            opacity: 0.5;
            border: 1px solid #FC4083;
            margin-top: 6px;
            border-radius: 50px;
            font-size: 16px;
            color: #FC4083;
            text-align: center;
            z-index: 1000;
        }
    }
</style>