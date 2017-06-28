<template>
    <div class="main">
         <div class="content" style="top:0;">
            <textarea v-model="content" name="" placeholder="和粉丝互动..."></textarea>
         </div>
        <div class="addImg">
            <p @click="publish()"><img src="../../images/timeline_icon_photo.png" alt=""><span>添加图片</span></p>
            <p v-show="img1 != ''"><img :src="img1" alt=""><img src="../../images/timeline_icon_delete photo.png" alt=""></p>
            <p v-show="img2 != ''"><img :src="img2" alt=""><img src="../../images/timeline_icon_delete photo.png" alt=""></p>
            <p v-show="img3 != ''"><img :src="img3" alt=""><img src="../../images/timeline_icon_delete photo.png" alt=""></p>
        </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import $ from 'n-zepto';
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
            let _data = {
                    targetType: 3,
                    targetId:1,
                    content: self.content,
                    imgs: self.imgs
            }
            console.log(_data)
            if(token) {
                http.defaults.headers.common['Authorization'] = 'Token '+token;
            }else {
                http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
            }
            http.post('/post/add',JSON.stringify(_data)).then(function(res){
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('getToken', '评论成功！', function responseCallback(responseData) {
                        self.publish(responseData.token);
                    })
                })
            }).catch(function(err){
                console.log(err);
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('makeToast', {'targetType':'1','targetId':'1'}, function responseCallback(responseData) {
                        self.publish(responseData.token);
                    })
                })
            });
          }
        },
        mounted() {
            var self = this;
            window._publish =(function(){
                self.publish();
            }) 
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    textarea {
        width: 100%;
        border: none;
        height: calc(100vh - 75px);
        padding: 16px 12px;
        color: #333;
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
        border-top: 1px solid rgba(0,0,0,0.2);
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
</style>