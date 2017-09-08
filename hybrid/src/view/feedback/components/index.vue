<template>
    <div class="main">
        <textarea class="feedback_content" v-model="content" placeholder="お問い合わせ内容"></textarea>
        <div class="feedback" @click="feedback()">送&nbsp;&nbsp;&nbsp;&nbsp;信</div>
        <div class="feedback_success" v-if="feedbackSuccess">お問い合わせを受け付けました。ありがとうございます。</div>
    </div>
</template>
<script>
    require('@api/js/common.js');
    import http from '@api/js/http.js';
    export default {
        data() {
          return {
            feedbackSuccess: false,
            content: ''
          }
        },
        methods: {
            feedback() {
                var self = this;
                if(self.content) {
                    http.defaults.headers.common['Authorization'] = 'Token '+ getParams('token');
                    http.post('groupyuser/feedback',{
                        content: self.content
                    }).then(function(res){
                        if(res.status) {
                            self.feedbackSuccess = true;
                        }else {
                            window.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                            })
                        }

                    }).catch(function(err) {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                        })
                    })
                }
            }
        },
        created() {
            // if(getParams('version') == '1.2') {
            //     this.review = true;
            // }
        }
      }
</script>

<style scoped lang="scss">
    .main {
        background: #eee;
        height: 100vh;
    }
    .feedback_content {
        width: 100%;
        height: 250px;
        border: none;
        box-sizing: border-box;
        margin-top: 8px;
        padding: 12px;
        font-size: 14px;
    }
    .feedback {
        width: 100%;
        height: 45px;
        line-height: 45px;
        background: #fff;
        margin-top: 12px;
        text-align: center;
        font-size: 18px;
    }
    .feedback_success {
        position: absolute;
        left: 0;top:0;bottom:0;
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
        font-size: 14px;
        background: #eee;
    }
</style>