<template>
    <div class="main">
        <div class="content" ref="viewBox" style="top: 0">
            <ul class="comment_list dynamic">
                <div class="loading_top" :class="{'loading_top_show': showLoading2}">
                    <p>読み込み中</p>
                    <span></span>
                </div>
                <li v-for="(comment,key) in commentList" :class="[{'idol_comment' : comment.userType == 'idol'},{'lastLi' : key == commentList.length-1},{'firstLi' : key == 0}]">
                    <div class="userinfo">
                        <img :src="comment.avatar" alt="">
                        <span>{{comment.nickname}}</span>
                        <img :src="comment.level" alt="" v-if="comment.userType == 'fans'">
                        <i v-html="formatTime(comment.createTime)"></i>               
                    </div>
                    <div class="comment_content">
                        <p>{{comment.content}}</p>
                        <div class="comment_img" v-if="comment.imgs?comment.imgs.length > 0:false">
                            <span :class="{'oneImg' : JSON.parse(comment.imgs).length == 1}" v-for="img in JSON.parse(comment.imgs)"><img :src="img" alt="" class="autoHeight" @click="showBigImg(img)"></span>
                        </div>                      
                    </div>
                </li>
                <div class="default_page" v-show="commentList.length == 0">
                    <img src="../../images/default_no message.png" alt="">
                    <p>まだ書き込みはないようです<br>さっそくファンにメッセージを書き込もう</p>
                </div>
                <div class="loading" :class="{'loading_show': showLoading}"><p><img src="../../images/loading_1.png" alt="">読み込み中</p><p v-show="havedlast">全て表示されました</p></div>
            </ul>
        </div>
        <div class="publich_comment" @click="publishComment()"><img src="../../images/timeline_icon_edit.png" alt=""><span>投稿</span></div>
        <div class="publich_tips" v-show="commentList.length == 0"><img src="../../images/tips_edit.png" alt="">投稿して<br>盛り上がろう</div>
        <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div>
    </div>
</template>

<!-- <script src="../../utils/common.js"></script> -->
<script>
    import http from '@/utils/http.js';
    require('../../utils/common.js')
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
                publishLink: ''
            }
        },
        methods: {
            getComments() {
                let self = this;
                http.get('/post/list',{
                    params: {
                        targetType: 3,
                        targetId: self.$route.query.groupId,
                        from: self.start,
                        rows: self.num
                    }
                }).then(function(res){
                    self.loadingBig = false;
                    self.showLoading = false;
                    console.log(self.loadingBig)
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

                });
            },
            formatTime(key) {
                let timer = new Date(key);
                return timer.Format('MM.dd') + '&nbsp;' + timer.Format('hh:mm');
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
            publishComment() {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('toPublish',{'url':'http://192.168.1.152:8020/#/idol/publishComment'})
                })
            },
            showBigImg(url) {
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showImage', {'url': url})
                })
            }
        },
        mounted() {
            var self = this;
          self.box = self.$refs.viewBox
          self.box.addEventListener('scroll', () => {
            if(document.querySelector('.firstLi')) {
                  if(parseInt(document.querySelector('.lastLi').getBoundingClientRect().bottom)  == parseInt(document.querySelector('.content').getBoundingClientRect().bottom)) {
                    if(self.havedlast == true) {
                        self.showLoading = true;
                        setTimeout(() => {
                            self.showLoading = false;
                        },1500)
                    }else {
                        self.showLoading = true;
                        setTimeout(() => {
                            self.start = self.start + self.num;
                            self.getComments();
                        },500)
                    }                    
                  }
                  if(parseInt(document.querySelector('.firstLi').getBoundingClientRect().top)  == parseInt(document.querySelector('.content').getBoundingClientRect().top)) {
                    self.showLoading2 = true;
                    setTimeout(() => {
                        http.get('/post/list',{
                            params: {
                                targetType: 3,
                                targetId: self.$route.query.groupId,
                                from: 0,
                                rows: self.num
                            }
                        }).then(function(res){
                            self.showLoading2 = false;
                             self.commentList = res.data;                  
                            console.log(self.commentList);
                        }).catch(function(){

                        });
                    },500)
                  }
            }else {

              if(parseInt(document.querySelector('.default_page').getBoundingClientRect().top)  == parseInt(document.querySelector('.content').getBoundingClientRect().top)) {
                self.showLoading2 = true;
                setTimeout(() => {
                    http.get('/post/list',{
                        params: {
                            targetType: 3,
                            targetId: self.$route.query.groupId,
                            from: 0,
                            rows: self.num
                        }
                    }).then(function(res){
                        self.showLoading2 = false;
                         self.commentList = res.data;
                    }).catch(function(){

                    });
                },500)
              }
            }
           }, false)
        },
        created() {
            var self = this;
            // alert(self.$route.query.groupId)
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
        bottom: 18px;
        opacity: 0.9;
        background: #00B4BC;
        border-radius: 29px;
        // width: 93.5px;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        color: #fff;
        font-size: 16px;
        img {
            vertical-align: middle;
            margin-right: 6px;
            margin-bottom: 3px;
            width: 25px;
        }
    }
    i {
        text-align: right;
    }
    .publich_tips {
        position: fixed;
        right: 126px;
        bottom: 11px;
        color: #fff;
        font-size: 16px;
        width: 153.5px;
        height: 54px;
        line-height: 27px;
        text-align: center;
        img {
            position: absolute;
            left:0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 54px;
        }
    }
    .default_page {
        height: 100vh;
        background: #eee;
    }
    .loading_top span {
        background: url(../../images/pic_loading_1.png);
        background-size: 100% auto;
    }
    .loading_top_show span {
        animation: changebg 1s linear infinite;
    }
    .loading_top_show {
        height: 80px;
    }
    @keyframes changebg{
        from {background: url(../../images/pic_loading_1.png);background-size: 100% auto;}
        to {background: url(../../images/pic_loading_2.png);background-size: 100% auto;}
    }
    .comment_list {
        height: calc(100vh + 10px;)
    }
    
</style>