<template>
    <div class="main">
        <div class="content" style=" padding-top: 0;min-height: 100vh;">
            <h3 class="rule_tile">爱豆报名，审核与入驻</h3>
            <div class="rule_content">
                <h4><span></span>App里直接报名方式</h4>
                <p>请进入APP报名页面，填写个人电话，邮箱和Twitter账号提交申请。</p>
                <h4><span></span>其他报名方式</h4>
                <div class="apply_methods">
                    <p>请将</p>
                    <p>
                        <span><b></b>联系邮箱，电话，简单个人介绍</span>
                        <span><b></b>Twitter/SNS账号</span>
                        <span><b></b>Twitter/SNSのアカウント</span>
                        <span><b></b>30秒以内的短视频</span>
                        <span>发送至<i>wanted@groupy.vip</i></span>
                    </p>
                </div>
            </div>
            <h3 class="rule_tile">审核与入驻</h3>
            <div class="rule_content">
                <p style="color: #333;padding-bottom: 20px;">      Groupy团队会在24小时以内审核资料并通过邮件通知爱豆入驻成功。</p>
                <p style="color: #333;text-indent: 14px;">成功入驻的爱豆，可用通知邮箱内预设的账号密码Groupy for idol APP，可修改个人密码以及关联Twitter账户，后续可直接用Twitter登陆Groupy for idol APP 。</p>
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