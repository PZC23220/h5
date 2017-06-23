<template>
    <div class="main">
        <div class="content" style=" top: 0;">
            <ul class="comment_list dynamic">
                <li v-for="(comment,key) in commentList" :class="{'idol_comment' : comment.userType == 'idol'}">
                    <div class="userinfo">
                        <img :src="comment.avatar" alt="">
                        <span>{{comment.nickname}}</span>
                        <img :src="comment.level" alt="" v-if="comment.userType == 'fans'">
                        <i v-html="formatTime(comment.createTime)"></i>               
                    </div>
                    <div class="comment_content">
                        <p>{{comment.content}}</p>
                        <div class="comment_img" v-if="comment.imgs.length > 0">
                            <span :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="img in JSON.parse(comment.imgs)"><img :src="img" alt="" class="autoHeight" @click="showBigImg(img)"></span>
                        </div>                      
                    </div>
                    <!-- <div class="comment_desc">
                        <span><img src="" alt="">274,223</span>
                        <span><img src="" alt="">3434</span>
                        <span><img src="" alt=""><img src="" alt=""></span>
                    </div> -->
                </li>
            </ul>
            <div class="default_page" v-show="commentList.length == 0">
                <img src="../../images/default_no message.png" alt="">
                <p>还没有留言<br>去发布留言，让粉丝来互动吧！</p>
            </div>
            <div class="publich_comment"><img src="../../images/timeline_icon_edit.png" alt=""><span>发表</span></div>
            <div class="publich_tips" v-show="commentList.length == 0"><img src="../../images/tips_edit.png" alt="">发表评论</div>
        </div>
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import http from '@/utils/http.js';
    export default {
        data() {
            return {
                commentList: []
            }
        },
        methods: {
            getComments() {
                let self = this;
                http.get('/post/list',{
                    params: {
                        targetType: self.$route.query.targetType,
                        targetId: self.$route.query.targetId
                    }
                }).then(function(res){
                    self.commentList = res.data;
                    console.log(res);
                }).catch(function(){

                });
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd') + '&nbsp;&nbsp;' + timer.Format('hh:mm');
            },
            changeStatus(val) {
                let _html;
                switch(val) {
                    case 0:
                        _html = '未提现'
                        break;
                    case 1:
                        _html = '已提现'
                        break;
                    case 2:
                        _html = '待处理'
                        break;
                }
                return _html;
            },
            showBigImg(url) {
                WebViewJavascriptBridge.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showImage', {'url': url})
                })
            }
        },
        created() {
            var self = this;
                self.getComments();

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        height: 100vh;
    }
    .publich_comment {
        position: fixed;
        right: 12px;
        bottom: 24px;
        opacity: 0.9;
        background: #00B4BC;
        border-radius: 29px;
        // width: 93.5px;
        height: 40px;
        line-height: 40px;
        padding: 0 19px;
        color: #fff;
        font-size: 16px;
        img {
            vertical-align: middle;
            margin-right: 6px;
            margin-bottom: 3px;
        }
    }
    .publich_tips {
        position: fixed;
        right: 126px;
        bottom: 24px;
        color: #fff;
        font-size: 16px;
        width: 153.5px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        img {
            position: absolute;
            left:0;
            top: 0;
            z-index: -1;
        }
    }
    .default_page {
        height: 100vh;
        background: #eee;
    }
</style>