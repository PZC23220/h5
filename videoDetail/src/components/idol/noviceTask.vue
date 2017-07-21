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
                        <img src="../../images/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="../../images/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="../../images/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="../../images/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="../../images/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="../../images/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
                <div class="task">
                    <div class="task_content">
                        <h5></h5>
                        <p></p>
                        <div class="progress_content">
                            <div class="progress"><span :style="'width:calc(100% * 0)'"></span></div>
                            <span>{{task_test.current}}<i>0</i></span>
                        </div>
                        <img src="../../images/icon_finish.png" v-show="false">
                    </div>
                    <div class="reward"><i>{{task_test.reward}}</i><span><img src="../../images/timeline_icon_coins.png">0</span><span>{{task_test.receive}}</span></div>
                </div>
            </div>
            <div class="task" v-for="task in tasks">
                <div class="task_content">
                    <h5>{{task.title}}</h5>
                    <p>{{task.description}}</p>
                    <div class="progress_content">
                        <div class="progress"><span :style="'width:calc(100% * '+task.currentCount/task.targetCount+')'"></span></div>
                        <span>{{task_test.current}}<i>{{task.currentCount>task.targetCount?task.targetCount:task.currentCount}}</i></span>
                    </div>
                    <img src="../../images/icon_finish.png" v-show="task.complete>0">
                </div>
                <div class="reward"><i>{{task_test.reward}}</i><span><img src="../../images/timeline_icon_coins.png">{{task.gprice}}</span><span :class="{'finish':(task.complete>0 && task.accepted<1)}" @click="(task.complete>0 && task.accepted<1)?accept(task.id,$event):false">{{status(task.accepted)}}</span></div>
            </div>
         </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import http from '@env/http.js';
    export default {
        data() {
            return {
                tasks: [],
                idx: 0,
                idx2: 0,
                task_test: {
                    reward: '報酬',
                    receive: '受け取る',
                    current: '達成度'
                }
            }
        },
        methods: {
          getList(_val,token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
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
          accept(val,e,token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx2 < 2) {
                console.log(e.target.innerHTML);
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/mission/accept',{
                    params: {
                        id: val
                    }
                }).then(function(res){
                    if(_lan === 'zh-cn') {
                        e.target.innerHTML = '已领取';
                    }else {
                        e.target.innerHTML = '受取済';
                    }
                    e.target.classList.remove('finish');
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
                    current: '已完成'
                }
                _val = 'cn';
              } else {
                this.task_test= {
                    reward: '報酬',
                    receive: '受け取る',
                    current: '達成度'
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
                        margin-right: calc(0.08 * 100vw);
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
        height: 572px;
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
</style>