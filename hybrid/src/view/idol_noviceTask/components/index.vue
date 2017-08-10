<template>
    <div class="main">
         <div class="content">
            <div class="page_loading" :class="{'page_loading_show':tasks.length > 0}">
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="/img/task/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="/img/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="/img/task/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="/img/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="/img/task/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="/img/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="/img/task/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="/img/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
            </div>
            <div class="task" v-for="task in tasks">
                <div class="task_content">
                    <h5>{{task.title?task.title:'...'}}</h5>
                    <p>{{task.description?task.description:'...'}}</p>
                    <div class="progress_content">
                        <div class="progress"><span :style="'width:calc(100% * '+task.currentCount/task.targetCount+')'"></span></div>
                        <span>{{task_test.current}}<i>{{task.currentCount>task.targetCount?task.targetCount:task.currentCount}}</i></span>
                    </div>
                    <img src="/img/task/icon_finish.png" v-show="task.complete>0">
                </div>
                <div class="reward"><i>{{task_test.reward}}</i><span><img src="/img/timeline_icon_coins.png">{{task.gprice}}</span><span :class="{'finish':(task.complete>0 && task.accepted<1)}" @click="(task.complete>0 && task.accepted<1)?accept(task.id,task.gprice,$event):false">{{status(task.accepted)}}</span></div>
            </div>
         </div>
         <div class="receive_coin" :class="{'receive_coin_show':receiveShow}">
             <div class="coin_num"><p>{{task_test.receive1}}</p><p>+ {{Gcoins}} {{task_test.receive2}}</p></div>
             <img src="/img/timeline_icon_coins.png">
         </div>
    </div>
</template>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                tasks: [],
                idx: 0,
                idx2: 0,
                receiveShow: false,
                Gcoins: 10,
                task_test: {
                    reward: '報酬',
                    receive: '受け取る',
                    current: '達成数',
                    receive1: '受け取りました！',
                    receive2: 'コイン'
                }
            }
        },
        methods: {
          getList(_val,token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/mission/list',{
                    params: {
                        language: _val
                    }
                }).then(function(res){
                    self.tasks = res.data;
                    console.log(self.tasks);
                }).catch(function(){
                    self.idx++;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getList(_val,responseData.token);
                        })
                    })
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          accept(val,gprice,e,token) {
            let self = this;
            self.Gcoins = gprice;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx2 < 2) {
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/mission/accept',{
                    params: {
                        id: val
                    }
                }).then(function(res){
                    console.log(res)
                    if(res) {
                        if(_lan === 'zh-cn') {
                            e.target.innerHTML = '已领取';
                        }else {
                            e.target.innerHTML = '受取済';
                        }
                        self.receiveShow = true;
                        setTimeout( function() {
                            self.receiveShow = false;
                        },1500);
                        e.target.classList.remove('finish');
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            if(_lan === 'zh-cn') {
                                bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                             }else {
                                bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                             }
                        })
                    }
                }).catch(function(){
                    self.idx2++;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getList(responseData.token);
                        })
                    })
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          },
          status(val) {
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(val == '1') {
                if(_lan === 'zh-cn') {
                    return '已领取';
                }else {
                    return '受取済';
                }
            }else {
                if(_lan === 'zh-cn') {
                    return '领取';
                }else {
                    return '受け取る';
                }
            }
          },
        },
        mounted() {
        },
        created() {
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            let _val;
            if(_lan === 'zh-cn') {
                 this.task_test= {
                    reward: '奖励',
                    receive: '领取',
                    current: '已完成',
                    receive1: '领取成功！',
                    receive2: 'G币'
                }
                _val = 'cn';
              } else {
                this.task_test= {
                    reward: '報酬',
                    receive: '受け取る',
                    current: '達成数',
                    receive1: '受け取りました！',
                    receive2: 'コイン'
                }
                _val = 'jp';
              }
            this.getList(_val);
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    textarea {
        width: 100%;
        border: none;
        height: 150px;
        padding: 16px 12px;
        box-sizing: border-box;
        color: #333;
        overflow: auto;
        font-size: 14px;
    }
    .content {
        background: #fff;
        top: 0;
        height: 100vh;
        .task {
            border-top: 12px #eee solid;
            background: #fff;
            .task_content {
                border-left: 3px solid #00B4BC;
                padding: 8px 8px 5px;
                box-sizing: border-box;
                position: relative;
                h5 {
                    color: #999;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 16px;
                }
                .progress_content {
                    overflow: hidden;
                    .progress {
                        margin-top: 10px;
                        float: left;
                        width: calc(100vw * 0.68);
                        height: 4px;
                        margin-right: calc(0.04 * 100vw);
                        background: #DDDDDD;
                        border-radius: 50px;
                        position: relative;
                        overflow: hidden;
                        span {
                            display: block;
                            height: 4px;
                            background-image: linear-gradient(150deg, #FF8550 0%, #FF2E79 100%);
                            border-radius: 50px;
                            transition: all 0.3s;
                            width: 0;
                        }
                    }
                    >span {
                        float: left;
                        margin-top: 3px;
                        color: #999;
                        i {
                            color: #333;
                            margin-left: 8px;
                        }
                    }
                }
                img {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 72.5px;
                }
            }
            .reward {
                padding: 8px 12px;
                box-sizing: border-box;
                border-top: 1px solid #eee;
                overflow: hidden;
                i {
                    float: left;
                    color: #999;
                    margin-right: 8px;
                    margin-top: 5px;
                }
                span:nth-child(2) {
                    background: #FFF5D6;
                    border-radius: 50px;
                    padding-right: 16px;
                    float: left;
                    color: #F3B714;
                    height: 20px;
                    font-weight: 600;
                    line-height: 20px;
                    font-size: 16px;
                    overflow: hidden;
                    margin-top: 4px;
                    img {
                        width: 20px;
                        float: left;
                        margin-right: 7px;
                    }
                }
                span:last-child {
                    float: right;
                    background: #CCCCCC;
                    border-radius: 50px;
                    width: 80px;
                    height: 28px;
                    line-height: 28px;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                }
                span.finish {
                    background: #00B4BC;
                }
            }
        }
    }
    .page_loading {
        transition: all 0.3s;
        opacity: 0.6;
        // height: 572px;
        overflow: hidden;
        h5 {
            width: 50vw;
            background: #eee;
            height: 18px;
        }
        p {
            width: 80vw;
            background: #eee;
            height: 24px;
        }
    }
    .page_loading_show {
        opacity: 0;
        height: 0;
    }
    .receive_coin {
        position: absolute;
        left: 50%;
        // top: 114.5px;
        top: 87px;
        margin-left: -100px;
        // margin-left: 0;
        // margin-top: 0;
        width: 200px;
        padding-left: 12px;
        box-sizing: border-box;
        z-index: 2;
        height: 55px;
        transition: all 0.3s;
        transform: scale(0);
        overflow: hidden;
        >img {
            position: absolute;
            left: 0;
            top: 7.5px;
            width: 41px;
            z-index: 3;
        }
        .coin_num {
            width: 100%;
            height: 55px;
            line-height: 21px;
            padding-top: 6.5px;
            box-sizing: border-box;
            text-align: center;
            font-size: 14px;
            color: #fff;
            font-weight: 600;
            // opacity: 0.8;
            background: #FF8D36;
            box-shadow: 0 1px 6.5px 0 rgba(242,120,8,0.70);
            border-radius: 50px;
        }
    }
    .receive_coin_show {
        transform: scale(1);
        // width: 200px;
        // height: 55px;
        // margin-left: -100px;
        // margin-top: -27.5px;
    }
</style>