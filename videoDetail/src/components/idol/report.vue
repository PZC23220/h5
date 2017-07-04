<template>
    <div class="main">
        <div class="header">
            <img src="../../images/close.png" alt="" @click="close()">
            <span>举报</span>
            <p @click="publish()">提交</p>
        </div>
         <div class="content">
            <textarea v-model="content" name="" placeholder="请输入..."></textarea>
         </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import http from '@/utils/http.js';
    export default {
        data() {
            return {
                content: ''
            }
        },
        methods: {
          publish(token) {
                let self = this;
                if(self.content !=""){
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                    }
                    let _data = {
                        msg:self.content,
                    }
                    http.post('/interact/fbsumit',JSON.stringify(_data)).then(function(res){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('makeToast', '举报成功！');
                            setTimeout(function(){
                                self.close();
                            },1500)
                        })
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                        })
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
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
    .header {
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 43px;
        position: absolute;
        top: 11px;
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
        top:55px;height: calc(100vh -11px - 44px);
        background: #eee;
    }
</style>