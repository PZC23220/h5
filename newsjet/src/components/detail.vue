<template>
  <div class="detail">
    <div class="news_content">
      <p><router-link to="/index">ホーム</router-link> > <router-link to="/list">お知らせ</router-link> > <i>詳細</i></p>
      <article>
        <h2>{{article.title}}</h2>
        <span><i></i>{{article.time}}</span>
        <div class="article_content" v-html="article.content"></div>
      </article>
    </div>
    <footer class="footer">Powered by Newsjet Inc. .</footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          article: {
            title: 'NewsJetのメディア連携数が100媒体を突破！',
            time: '2017.07.01',
            content: '<p>グローバルにソフトウェア開発サービスを展開する株式会社 GNT(本社：東京都渋谷区、代表取締役：ホー・トゥン・ラム、以下 GNT)は、WEB サービスの企画・開発、およびスマートフォンゲーム向けサポートサービスを展開するアディッシュプラス株式会社（本社：沖縄県那覇市、代表取締役：石川琢磨、以下アディッシュプラス）と CS ソリューション事業で業務提携をしたことを発表致します。</p><br><p>昨今のスマートフォンゲーム市場の爆発的な成長に伴い、サービス運用におけるカスタマーサポートの重要性が益々高まってきております。このカスタマーサービスと運用を切り離さずサービスの一部として設計することが最近のゲームシステム開発のトレンドになってきております。  そこで２００６年からスマートフォン向けゲーム開発をベトナムで行ってきた当社と沖縄でのスマートフォン向けカスタマーサービス業務代行で現在急成長中のアディッシプラスとの互いの強みを生かした連携を行い、一貫したカスタマーサポート向けソリュー</p><br><p>ション事業を提供いたします。 </p><br><p>グローバルにソフトウェア開発サービスを展開する株式会社 GNT(本社：東京都渋谷区、代表取締役：ホー・トゥン・ラム、以下 GNT)は、WEB サービスの企画・開発、およびスマートフォンゲーム向けサポートサービスを展開するアディッシュプラス株式会社（本社：沖縄県那覇市、代表取締役：石川琢磨、以下アディッシュプラス）と CS ソリューション事業で業務提携をしたことを発表致します。  </p><br><p>昨今のスマートフォンゲーム市場の爆発的な成長に伴い、サービス運用におけるカスタマーサポートの重要性が益々高まってきております。このカスタマーサービスと運用を切り離さずサービスの一部として設計することが最近のゲームシステム開発のトレンドになってきております。  そこで２００６年からスマートフォン向けゲーム開発をベトナムで行ってきた当社と沖縄でのスマートフォン向けカスタマーサービス業務代行で現在急成長中のアディッシプラスとの互いの強みを生かした連携を行い、一貫したカスタマーサポート向けソリュー</p><br><p>ション事業を提供いたします。  </p>'
          }
      }
    },
    created() {
        let _num = parseInt(this.$route.query.id);
        console.log(_num);
        switch(_num) {
          case 1:
            this.article = {
              title: 'キュレーションサービス「NewsJet」android版先行リリース決定！',
              time: '2016.10.20',
              content: '「NewsJet」はたった一分でトップニュースを一瞬チェックできる 無料のニュースアプリです。<br><br>エンタメ・スポーツ・政治・経済など多くの分野の最新ニュースをお届けします。<br><br>Android版を明日（10月21日）に先行リリース決定！<br><br>明日の10時以降は、グーグルプレイからダウンロードできますので、お楽しみにしてください。<br><br>なお、ios版は10月26日にもリリースする予定です。'
            }
            break;
          case 2:
            this.article = {
              title: 'いよいよ「NewsJet」版もリリース！',
              time: '2016.10.25',
              content: 'NewsJet」はたった一分でトップニュースを一瞬チェックできる 無料のニュースアプリです。<br><br>エンタメ・スポーツ・政治・経済など多くの分野の最新ニュースをお届けします。<br><br>明日（10月26日）の10時以降は、app storeからダウンロードできますので、お楽しみにしてください。'
            }
            break;
          case 3:
            this.article = {
              title: '「NewsJet」の提携メディアが100媒体突破！',
              time: '2017.01.25',
              content: 'NewsJet はリリースして以来、多くのメディア様やユーザー様にご支持をいただきました。おかげさまで、2017年１月20日、NewsJetの提携メディアが100媒体を突破しました。<br><br>ノアドット株式会社との連携によって、共同通信47ニュース、MANTAN WEB、full countなど数多くの媒体のニュースが配信できるようになりました。さらに、韓国の大手新聞社である聯合ニュースや中国の大手新聞社であるChina netも加入することになりました。<br><br>一つのアプリで、世の中がわかります！<br><br>今後も、いろいろなメディアを入れる予定です。<br><br>これからも、NewsJetを宜しくお願い致します。'
            }
            break;
          case 4:
            this.article = {
              title: '新規アプリ「Groupy」開発開始！',
              time: '2017.06.06',
              content: 'アイドル・アイドルファン向けの新規アプリ「Groupy」の開発が決定しました。<br><br>Groupyはアイドルとアイドルファンを親密につなぐプラットフォームとして、動画・ライブ配信・掲示板・限定コンテンツ販売などのインターネット時代ならではの機能を搭載します。<br><br>いつでも、どこでも、マイアイドルを応援できるようになります。マイアイドルを身近に守りましょう。<br><br>しかも、日中同時配信予定！<br><br>開発期間は2ヶ月を予定しています。ぜひお楽しみにしてください。'
            }
            break;
          case 5:
            this.article = {
              title: '「NewsJet」サービス一時停止のお知らせ！',
              time: '2017.07.01',
              content: 'いつも、NewsJetをご利用いただき、誠にありがとうございます。<br><br>ニュースキュレーションサービス「newsjet」は、技術的・戦略的調整のため、２ヶ月程度サービス停止をさせていただきます。<br><br>サービス停止期間は7月1日〜9月1日を予定しております。<br><br>サービス停止期間はアプリストアにて非公開し、記事も更新されませんので、ご了承ください。<br><br>なお、サービス再開の日時が決まりましたら、改めてご連絡させていただきます。<br><br>大変ご迷惑をおかけして、誠に申し訳ございません。<br><br>今後とも、何卒宜しくお願い申し上げます。'
            }
            break;
          case 6:
            this.article = {
              title: '「Groupy」ホームページリリースのお知らせ',
              time: '2017.07.02',
              content: 'アイドル・アイドルファン向けサービス「Groupy」の開発に伴い、ホームページも本日から、初公開させていただきます。<br><br>URLはこちらです。<a style="color:#fc6b9f;" href="http://groupy.vip/" target="_blank">http://groupy.vip</a><br><br>アプリは日中配信のため、ホームページの言語も中国語と日本語二つを用意しました。<br><br>Groupyに関する情報や参加するアイドルの動画を定期的に更新しますので、ぜひご覧ください。'
            }
            break;
          default:
            console.log(this.article);
            break;
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .news_content {
    max-width: 1200px;
    margin: 0 auto;
    min-height: calc(100vh - 236px);
    >p:first-child {
        font-size: 14px;
        color: #666666;
        margin: 25px 0 45px;
        i {
            color: #151515;
        }
        a:link {
            color: #666666;
        }
        a:visited {
            color: #666666;
        }
        a:hover {
            color: #666666;
        }
        a:active {
            color: #666666;
        }
    }
    article {
      h2 {
        font-size: 24px;
        color: #333333;
        text-align: center;
      }
      span {
        display: block;
        font-size: 18px;
        color: #999999;
        text-align: center;
        margin-bottom: 29px;
        margin-top: 15px;
        i {
          background: #999999;
          width: 9px;
          height: 9px;
          margin-right: 8px;
          display: inline-block;
        }
      }
    }
  }
  @media screen and (max-width: 980px) {
    .news_content {
      max-width: 980px;
      padding: 0 12px;
      box-sizing: border-box;
    }
  }
  .footer {
    background: #22252D;
    font-size: 20px;
    color: #FFFFFF;
    height: 112px;
    line-height: 112px;
    text-align: center;
}
</style>
