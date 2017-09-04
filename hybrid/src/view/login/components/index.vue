<template>
    <div class="main">
        <img src="/img/login/login_bg_750.jpg" class="bg_750">
        <div class="main_content" v-if="review">
            <img src="/img/login/icon_groupy.png" class="groupy">
            <div class="inputs inputs_first"><img src="/img/login/login_icon_account.png"><input type="text" v-model="user" name="" placeholder="アカウント"></div>
            <div class="inputs"><img src="/img/login/login_icon_password.png"><input type="password" v-model="pw" name="" placeholder="パスワード"></div>
            <div class="protocol"><img :src="protocol_img"  @click="change_protocol()"><a href="http://h5.groupy.vip/rules/index.html#/rule">参加アイドル向け利用規約</a></div>

            <div class="login" @click="login_pw()">ログイン</div>
        </div>
        <div class="main_content" v-if="review == false">
            <img src="/img/login/icon_groupy.png" class="groupy">
            <div class="api_login" @click="login_tw()"><img src="/img/login/icon_twitter.png"><span>Twitterでログイン</span></div>
            <div class="api_login facebook" @click="login_fb()"><img src="/img/login/icon_facebook.png"><span>Facebookでログイン</span></div>
            <div class="protocol protocol_bottom"><img :src="protocol_img"  @click="change_protocol()"><a href="http://h5.groupy.vip/rules/index.html#/rule">参加アイドル向け利用規約</a></div>
        </div>
    </div>
</template>
<script>
    require('@api/js/common.js');
    export default {
        data() {
          return {
            review: false,
            user: '',
            pw: '',
            protocol: true,
            protocol_img: '/img/login/login_icon_agreement.png'
          }
        },
        methods: {
            login_pw() {
                var self = this;
                if(this.user && this.pw && this.protocol) {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('login_pw',{user: self.user,pw: self.pw});
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        if(!self.protocol) {
                            bridge.callHandler('makeToast', '「参加アイドル向け利用規約」への\n同意が必要です。');
                        }else {
                            bridge.callHandler('makeToast', 'アカウント・パスワードが間違っています\n再入力してください');
                        }
                    });
                }
            },
            login_fb() {
                if(this.protocol) {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('login_fb');
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', '「参加アイドル向け利用規約」への\n同意が必要です。');
                    });
                }
            },
            login_tw() {
                if(this.protocol) {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('login_tw');
                    });
                }else {
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('makeToast', '「参加アイドル向け利用規約」への\n同意が必要です。');
                    });
                }
            },
            change_protocol() {
                this.protocol = !this.protocol;
                if(this.protocol == true) {
                    this.protocol_img= '/img/login/login_icon_agreement.png'
                }else {
                    this.protocol_img= '/img/login/login_icon_agreement_1.png'
                }
            }
        },
        created() {
            // if(getParams('version') == '1.0.9') {
            //     this.review = true;
            // }
        }
      }
</script>

<style scoped lang="scss">
    .main {
        position: relative;
    }
   .bg_750 {
        width: 100%;
   }
   .main_content {
        position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;
   }
   .groupy {
        width: 34vw;
        display: block;margin: 12vh auto;
   }
   .inputs_first {
        margin-top: 7vh;

   }
   .inputs {
        width:73vw;
        margin: 12px auto;
        padding: 10.5px 23px;
        opacity: 0.9;
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        border-radius: 50px;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 22px;
        color: #666;
        font-weight: 400;
        overflow: hidden;
        >* {
            float: left;
            display: block;
        }
        img {
            width: 25px;
            margin-right: 3px;
        }
        input {
            width: calc(73vw - 83px);
            height: 22px;
            font-size: 16px;
            margin-top: 1.5px;
        }
   }
   .protocol {
        width:73vw;
        margin: 0 auto;
        overflow: hidden;
        font-size: 10px;
        -webkit-transform:scale(0.8);
        padding-left: 10px;
        img {
            width: 12px;
            float: left;
            margin-top: 3px;
        }
        a {
            display: block;
            float: left;
            color: #FFFFFF;
            padding-left: 5px;
            text-decoration: underline;
        }
   }
   .login {
        background-image: linear-gradient(150deg, #FF8550 0%, #FF2E79 100%);
        border-radius: 39px;
        height: 50px;line-height: 50px;color: #fff;font-size: 18px;font-weight: 300;text-align: center;
        width:73vw;
        margin: 30px auto;
   }
   .api_login {
        width:73vw;
        margin: 30px auto;
        height: 25px;line-height: 25px;color: #fff;background: #009EF4;font-size: 18px;font-weight: 300;text-align: center;padding: 12px 0 13px;
        border-radius: 39px;
        img {
            width: 25px;
        }
        span {
            display: inline-block;vertical-align: middle;
        }
   }
   .facebook {
    background: #33589D;
   }
   .protocol_bottom {
        position: absolute;
        bottom: 30px;
        width: 180px;
        left: 50%;
        margin-left: -90px;
   }
</style>