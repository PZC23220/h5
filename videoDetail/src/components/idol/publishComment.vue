<template>
    <div class="main">
        <div class="header">
            <img src="../../images/close.png" alt="" @click="close()">
            <span>留言板</span>
            <p @click="publish()">发布</p>
        </div>
         <div class="content" style="top:55px;height: calc(100vh -11px - 44px)">
            <textarea v-model="content" name="" placeholder="和粉丝互动..."></textarea>
            <div class="addImg">
                <p @click="pickImage()"><img src="../../images/timeline_icon_photo.png" alt=""><span>添加图片</span></p>
                <p v-show="img1 != ''"><img :src="img1" alt=""><img @click="delImg(1)" src="../../images/timeline_icon_delete photo.png" alt=""></p>
                <p v-show="img2 != ''"><img :src="img2" alt=""><img @click="delImg(2)" src="../../images/timeline_icon_delete photo.png" alt=""></p>
                <p v-show="img3 != ''"><img :src="img3" alt=""><img @click="delImg(3)" src="../../images/timeline_icon_delete photo.png" alt=""></p>
            </div>
         </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import http from '@/utils/http.js';
    export default {
        data() {
            return {
                content: '',
                img1: '',
                img2: '',
                img3: '',
                imgs: []
            }
        },
        methods: {
          publish(token) {
                let self = this;
                if(self.img1 != '') {
                    self.imgs.push(self.img1)
                }
                if(self.img2 != '') {
                    self.imgs.push(self.img2)
                }
                if(self.img3 != '') {
                    self.imgs.push(self.img3)
                }
                if(self.content != '' || self.imgs.length > 0) {

                    let _data = {
                            targetType: 3,
                            targetId:self.$route.query.groupId,
                            content: self.content,
                            imgs: self.imgs
                    }
                    alert(JSON.stringify(_data))
                    if(token) {
                        http.defaults.headers.common['Authorization'] = 'Token '+token;
                    }else {
                        http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                    }
                    http.post('/post/add',JSON.stringify(_data)).then(function(res){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('comment_publish_result', {"status": true})
                        })
                    }).catch(function(err){
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                        })
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'3','targetId':self.$route.query.targetId}, function responseCallback(responseData) {
                                self.$route.query.token = responseData.token;
                            })
                        })
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', '请添加文字或图片');
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
          delImg(val) {
            if(val == 1) {
                this.img1 = '';
            }
            if(val == 2) {
                this.img1 = '';
            }
            if(val == 3) {
                this.img1 = '';
            }
          },
          autoHeight(val) {
            let _body = document.querySelector('body');
            _body.style.height = 'calc(100vh - 22px - ' + val/2 + 'px)';
            let _bottom = document.querySelector('.addImg');
            _bottom.style.height = 'calc(20px + ' + val/2 + 'px)';
            let _tex = document.querySelector('textarea');
            _tex.style.height = 'calc(100vh - 130px - ' + val/2 + 'px)';
          }
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
        height: calc(100vh - 130px);
        padding: 16px 12px;
        box-sizing: border-box;
        color: #333;
        overflow: auto;
    }
    .addImg {
        height: 75px;
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 0;
        left:0;
        opacity: 0.9;
        background: #F9F9F9;
        border-top: 1px solid rgba(0,0,0,0.1);
        p {
            float: left;
            padding: 12.5px;
            position: relative;
            >img:last-child {
                width: 30px;
                height: 30px;
                position:absolute;
                left: 0;
                top: 0;
            }
            >img:first-child {
                width: 50px;
                height: 50px;
                border-radius: 2px;
            }
        }
        p:first-child {
            padding: 16px 0 0 19px;
            color: #00B4BC;
            img {
                display:block;
                width: 25px;
                height: 25px;
                margin: 0 auto;
            }
        }
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
</style>