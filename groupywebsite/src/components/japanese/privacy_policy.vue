<template>
  <div class="privacy_policy">
    <div class="pages_tips">ホーム&nbsp;&gt;&nbsp;<b>プライバシーポリシー</b></div>
    <div class="rules_desc">
      <h3>プライバシーポリシー</h3>
      <h4>１．個人情報の利用目的について </h4>
      <p>当社は、お客様からご提供いただいた個人情報を以下の目的のために利用いたします。</p>
      <p class="last">（1）本サービス実施、提供のため<br>
       a.本サービスの拡充、改善、新規開発のための調査・分析のため<br>
       b.お問い合わせ、コイン対応のため<br>
       c.その他、お客様の同意を得た利用目的のため</p>
       <p class="last">（2）本サービスの利用状況等に係る統計情報の作成、本サービスまたは当社の運営するウェブサイト等における公表のため。</p>
      <h4>２．個人情報の提供について</h4>
      <p>当社は、以下に該当する場合、お客様の個人情報を第三者に提供することがあります。</p>
      <p class="last"><b>（1）法令に基づく場合など個人情報保護法に定める場合や、裁判所・警察等の公的機関から法律に基づく要請を受けた場合。</b></p>
      <p class="last"><b>（2）ユーザーの事前の承認、同意を得た場合。</b></p>
      <p class="last"><b>（3）本サービスを提供する上で必要となる業務委託先に開示する場合。</b></p>
      <p class="last"><b>（4）当社の合併、分社化、事業譲渡により事業が継承されユーザー情報を引き継ぐ場合。</b></p>
      <h4>３．個人情報の委託について</h4>
      <p>当社では、業務上必要な範囲で個人情報の取扱いを委託先へ委託することがあります。委託にあたり、十分な個人情報の保護水準を満たす委託先を選定、守秘義務を含む契約を締結いたします。<br>なお、現時点においては、個人情報の取扱いを委託先に委託しておりませんが、今後変更のある場合には、本案内にて開示してまいります。</p>
      <h4>４．個人情報の提供に関する任意性について</h4>
      <p>個人情報を当社にご提供いただくか否かは、お客様ご自身の任意です。ただし、当社が提供をお願いする個人情報をご提供いただけない場合や、ご提供いただいた個人情報に不備があった場合には、個人情報の取得目的通りのサービスがご提供できない場合があります。</p>
      <h4>５．個人情報の開示等について</h4>
      <p>当社は、お客様からご提供いただいた個人情報の利用目的の通知、開示、訂正、追加、削除、利用停止または第三者提供停止（以下、「開示等」という。）の請求に対応いたします。ご希望があるお客様は、本案内下部記載のGroupyユーザーサポート担当まで、ご連絡ください。</p>
      <h4>６．アクセス情報の収集について</h4>
      <p>本サービスにアクセスされた際に、インターネットに接続するときに使用されるIPアドレス、コンピュータに関する情報と接続情報（ブラウザの種類とバージョン、オペレーティングシステム、プラットフォームなど）、本サービスへのアクセス、ならびに当社サイトからのアクセスに関する、完全なURLの日付と時間を含む記録、表示した当社サイト内のページ情報を収集いたします。これらの情報は統計的に処理され、本サービスの各ページに表示する情報の制御や当社サイトの利便性の向上に利用いたします。</p>
      <h4>７．クッキーについて</h4>
      <p>本サービスでは、クッキーを使用する場合があります。これは本サービスの改善や利用状況の解析のため、ユーザーによるWEBサイト、アプリ、広告の閲覧状況を確認するもので、統計的なマーケティング情報として利用いたします。クッキー内に個人情報が含まれることはございません。また、個人情報の取得およびユーザー情報との関連付けを行うものではありません。</p>
      <h4>８．個人情報の開示等およびお問い合わせについて</h4>
      <p>個人情報の取り扱いに関するお問い合わせ、苦情などは以下のお問い合わせ先までお願いいたします。</p>
    </div>
    <div class="responsible">ニュースジェット株式会社<br>〒130-0026　東京都墨田区両国2丁目2-10  702室<br>メール：contact@groupy.vip<br>個人情報保護管理者：Groupyユーザーサポート担当<br><br><br>制定日：平成29年06月10日
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
        },0);
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
