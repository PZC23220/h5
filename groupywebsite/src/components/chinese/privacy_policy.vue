<template>
  <div class="privacy_policy">
    <div class="pages_tips">首页&nbsp;&gt;&nbsp;<b>Groupy软件（网站）隐私政策</b></div>
    <div class="rules_desc">
      <h3>Groupy软件（网站）隐私政策</h3><br>
      <h4>一、请用户注意勿在使用Groupy服务中透露自己的各类财产帐户、银行卡、信用卡、第三方支付账户及对应密码等重要资料，否则由此带来的任何损失由用户自行承担。 </h4>
      <h4>二 、用户在使用Groupy服务时不可将自认为隐私的信息发表、上传至Groupy软件及网站，也不可将该等信息通过Groupy的服务传播给其他人，若用户的行为引起的隐私泄漏，由用户承担责任。</h4>
      <h4>三、Groupy在提供服务时可能会搜集用户信息，云动公司会明确告知用户，通常信息仅限于用户姓名、性别、年龄、出生日期、身份证号、家庭住址、教育程度、公司情况、所属行业、兴趣爱好等。</h4>
      <h4>四、 就下列相关事宜的发生，Groupy不承担任何法律责任：</h4>
      <p>1. 云动公司根据法律规定或相关政府、司法机关的要求提供您的个人信息；</p>
      <p>2. 由于用户将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人信息的泄漏，或其他非因云动公司原因导致的个人信息的泄漏；</p>
      <p>3.  任何由于黑客攻击、电脑病毒侵入造成的信息泄漏；</p>
      <p>4.  因不可抗力导致的信息泄漏；</p>
    </div>
</div>
  </div>
</template>

<script>
  export default {
    created: function() {
      let self = this;
        setTimeout(function() {
            let ele = document.querySelector('.privacy_policy');
            ele.scrollIntoView();
        },500);
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .privacy_policy {
    background: #f7f7f7;
    text-align: left;
    color: #666666;
  }
  .pages_tips {
    font-size: 16px;
    padding: 26px 0;
    max-width: 1200px;
    margin: 0 auto;
    border-bottom: 1px solid #D9D9D9;
  }
  .rules_desc {
    padding-top: 30px;
    padding-bottom: 35px;
    max-width: 1200px;
    margin: 0 auto;
    h3 {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }
    h4 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    p {
      font-size: 14px;
      margin-bottom: 20px;
    }
    p.last {
      padding-left: 40px;
    }
  }
  .responsible {
    font-size: 14px;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 60px;
  }
</style>
