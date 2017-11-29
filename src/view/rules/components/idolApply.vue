<template>
    <div class="main">
        <div class="content" style=" padding-top: 0;min-height: 100vh;">
            <h3 class="rule_tile">応募方法</h3>
            <div class="rule_content">
                <h4><span></span>アプリでの応募方法</h4>
                <p>アプリの応募画面に、電話番号、メールアドレスとTwitterアカウントをご記入の上、ご提出願います。</p>
                <h4><span></span>その他の応募方法</h4>
                <div class="apply_methods">
                    <p>&nbsp;&nbsp;</p>
                    <p>
                        <span><b></b>メールアドレス、電話番号</span>
                        <span><b></b>推薦コメント（他薦）か自己紹介（自薦）</span>
                        <span><b></b>Twitter/SNSのアカウント</span>
                        <span><b></b>30秒以内のファンへの招待動画（自薦の場合必須）</span>
                        <span>上記の応募資料を <i>wanted@groupy.vip</i>までご送付願います。</span>
                    </p>
                </div>
            </div>
            <h3 class="rule_tile">審査・登場</h3>
            <div class="rule_content">
                <p style="color: #333;padding-bottom: 20px;">      ご提出して頂いた応募資料を24時間以内審査した上で、結果をメールにてお知らせさせて頂きます。</p>
                <p style="color: #333;text-indent: 14px;">合格のアイドルは、メールでお伝えするアカウントとパスワードでGroupy for idol APPにログインしてお願いします。ログイン後、パスワードの変更、Twitterとの連携、またTwitterでログインできます。</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .apply_methods {
        overflow: hidden;
        >p:first-child{
            float: left;
            width: 50px;   
        }
        >p:nth-child(2){
            float: left;
            width: calc(100% - 50px); 
            span {
                display: block;
                height: 28px;
                line-height: 28px;
                overflow: hidden;
                b {
                    display: block;
                    float: left;
                    margin-top: 12px;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #666;
                    margin-right: 7.5px;
                }
            }
        }
    }
</style>