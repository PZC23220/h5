<template>
    <div class="main">
         <div class="content">
            <div class="task">
                <div class="task_content" v-for="(task,key) in tasks">
                    <h5>{{task.description}}</h5>
                    <p>{{task.title}}</p>
                    <div class="progress_content" v-if="task.targetCount?task.targetCount>1:false">
                        <div class="progress"><span :style="'width:calc(100% * '+task.currentCount/task.targetCount+')'"></span></div>
                        <span>已完成<i>{{task.currentCount}}</i></span>
                    </div>
                    <img src="../../images/icon_finish.png">
                </div>
                <div class="reward"><i>奖励</i><span><img src="../../images/timeline_icon_coins.png">{{task.gprice}}</span><span :class="{'finish':task.complete>0}">{{status(task.accepted)}}</span></div>
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
                tasks: []
            }
        },
        methods: {
          getList(token) {
                let self = this;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/mission/list ').then(function(err){
                    self.tasks = res.data;
                }).catch(function(){
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getList(responseData.token);
                        })
                    })
                });
          },
          status(val) {
            if(val == '0') {
                return '领取';
            }else {
                return '已领取';
            }
          },
          pickImage() {
            var self = this;
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('pickImage', function responseCallback(responseData) {

                    if(responseData.length == 1) {
                        self.img1 = responseData[0]
                    }
                    if(responseData.length == 2) {
                        self.img1 = responseData[1]
                    }
                    if(responseData.length == 3) {
                        self.img1 = responseData[2]
                    }
                })
            })
          },
          close() {
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('close');
            })
          },
        },
        mounted() {
            var self = this;
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('keyboard_status_changed', function(data) {
                    self.autoHeight(data.height);
                })
            })  
        },
        created() {
            this.getList();
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
        background: #eee;
        top: 0;
        height: 100vh;
        .task {
            border-top: 12px #eee solid;
            background: #fff;
            .task_content {
                border-left: 3px solid #00B4BC;
                padding: 12px 8px;
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
</style>