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
                win_show: true,
                can_publish: true,
                android: false,
                isIdol: false,
                reply: false,
                reply_content: '',
                reply_comment_content: '',
                reply_comment_content_fans: '',
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
                    http.get('http://h5.groupy.vip/japi/post/list',{
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
            add_reply(obj) {
                if(obj) {
                    this.reply_comment_content = obj.content;
                    this.reply_comment_content_fans = obj.nickname;
                    this.commentId = obj.id;
                }
                this.reply = true;
                setTimeout(function(){
                    document.querySelector('textarea').focus();
                },0);
            },
            reply_submit() {
                let self = this;
                if(self.reply_content !=""){
                    if(!self.token_) {
                        self.token_ = getParams('token');
                    }
                    if(self.token_!='(null)' && self.token_!='') {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.token_;
                    }
                    let _data = {
                        content:self.reply_content,
                        targetType: 1,
                        targetId: getParams('videoId'),
                        reference: self.commentId
                    }
                    console.log(_data);
                    http.post('/post/add?type=idol',JSON.stringify(_data)).then(function(res){
                        if(res.status) {
                            self.refresh();
                            self.reply_content = '';
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('makeToast', 'リプライしました！');
                            });
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                            });
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                    self.token_ = responseData.token;
                                })
                            })
                        }
                        self.reply = false;
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                        })
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'1','targetId':getParams('videoId')}, function responseCallback(responseData) {
                                self.token_ = responseData.token;
                            })
                        })
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', 'コメントを入力してください');
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
                            targetId: getParams('videoId')
                        }
                        http.post('/post/add?type=fans',JSON.stringify(_data)).then(function(res){
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