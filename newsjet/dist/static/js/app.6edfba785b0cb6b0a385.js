webpackJsonp([0],[,,,,function(t,e,s){"use strict";var i=s(2),n=s(36),r=s(28),a=s.n(r),o=s(29),l=s.n(o),c=s(27),_=s.n(c);i.a.use(n.a);var p=function(t,e,s){if(s)return s;var i={};return t.hash&&(i.selector=t.hash),t.matched.some(function(t){return t.meta.scrollToTop})&&(i.x=0,i.y=0),i};e.a=new n.a({routes:[{path:"/",redirect:"/index"},{path:"/index",component:a.a},{path:"/list",component:l.a},{path:"/detail",component:_.a}],mode:"history",scrollBehavior:p})},function(t,e,s){function i(t){s(17)}var n=s(0)(s(8),s(33),i,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"swiper-slide",data:function(){return{slideClass:"swiper-slide"}},ready:function(){this.update()},mounted:function(){this.update(),this.$parent.options.slideClass&&(this.slideClass=this.$parent.options.slideClass)},updated:function(){this.update()},attached:function(){this.update()},methods:{update:function(){this.$parent&&this.$parent.swiper&&this.$parent.swiper.update&&(this.$parent.swiper.update(!0),this.$parent.options.loop&&this.$parent.swiper.reLoop())}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="undefined"!=typeof window;i&&(window.Swiper=s(3),s(12)),e.default={name:"swiper",props:{options:{type:Object,default:function(){return{autoplay:3500}}}},data:function(){return{defaultSwiperClasses:{wrapperClass:"swiper-wrapper"}}},ready:function(){!this.swiper&&i&&(this.swiper=new Swiper(this.$el,this.options))},mounted:function(){var t=this,e=function(){if(!t.swiper&&i){delete t.options.notNextTick;var e=!1;for(var s in t.defaultSwiperClasses)t.defaultSwiperClasses.hasOwnProperty(s)&&t.options[s]&&(e=!0,t.defaultSwiperClasses[s]=t.options[s]);var n=function(){t.swiper=new Swiper(t.$el,t.options)};e?t.$nextTick(n):n()}};this.options.notNextTick?e():this.$nextTick(e)},updated:function(){this.swiper&&this.swiper.update()},beforeDestroy:function(){this.swiper&&(this.swiper.destroy(),delete this.swiper)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{to_maoPoint:function(){if(!this.$route.path||"/index"==this.$route.path||"/"==this.$route.path)return void console.log(this.$route.path);location.href="http://"+location.host}},created:function(){}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{article:{title:"NewsJetのメディア連携数が100媒体を突破！",time:"2017.07.01",content:"<p>グローバルにソフトウェア開発サービスを展開する株式会社 GNT(本社：東京都渋谷区、代表取締役：ホー・トゥン・ラム、以下 GNT)は、WEB サービスの企画・開発、およびスマートフォンゲーム向けサポートサービスを展開するアディッシュプラス株式会社（本社：沖縄県那覇市、代表取締役：石川琢磨、以下アディッシュプラス）と CS ソリューション事業で業務提携をしたことを発表致します。</p><br><p>昨今のスマートフォンゲーム市場の爆発的な成長に伴い、サービス運用におけるカスタマーサポートの重要性が益々高まってきております。このカスタマーサービスと運用を切り離さずサービスの一部として設計することが最近のゲームシステム開発のトレンドになってきております。  そこで２００６年からスマートフォン向けゲーム開発をベトナムで行ってきた当社と沖縄でのスマートフォン向けカスタマーサービス業務代行で現在急成長中のアディッシプラスとの互いの強みを生かした連携を行い、一貫したカスタマーサポート向けソリュー</p><br><p>ション事業を提供いたします。 </p><br><p>グローバルにソフトウェア開発サービスを展開する株式会社 GNT(本社：東京都渋谷区、代表取締役：ホー・トゥン・ラム、以下 GNT)は、WEB サービスの企画・開発、およびスマートフォンゲーム向けサポートサービスを展開するアディッシュプラス株式会社（本社：沖縄県那覇市、代表取締役：石川琢磨、以下アディッシュプラス）と CS ソリューション事業で業務提携をしたことを発表致します。  </p><br><p>昨今のスマートフォンゲーム市場の爆発的な成長に伴い、サービス運用におけるカスタマーサポートの重要性が益々高まってきております。このカスタマーサービスと運用を切り離さずサービスの一部として設計することが最近のゲームシステム開発のトレンドになってきております。  そこで２００６年からスマートフォン向けゲーム開発をベトナムで行ってきた当社と沖縄でのスマートフォン向けカスタマーサービス業務代行で現在急成長中のアディッシプラスとの互いの強みを生かした連携を行い、一貫したカスタマーサポート向けソリュー</p><br><p>ション事業を提供いたします。  </p>"}}},created:function(){var t=parseInt(this.$route.query.id);switch(console.log(t),t){case 1:this.article={title:"キュレーションサービス「NewsJet」android版先行リリース決定！",time:"2016.10.20",content:"「NewsJet」はたった一分でトップニュースを一瞬チェックできる 無料のニュースアプリです。<br><br>エンタメ・スポーツ・政治・経済など多くの分野の最新ニュースをお届けします。<br><br>Android版を明日（10月21日）に先行リリース決定！<br><br>明日の10時以降は、グーグルプレイからダウンロードできますので、お楽しみにしてください。<br><br>なお、ios版は10月26日にもリリースする予定です。"};break;case 2:this.article={title:"いよいよ「NewsJet」版もリリース！",time:"2016.10.25",content:"NewsJet」はたった一分でトップニュースを一瞬チェックできる 無料のニュースアプリです。<br><br>エンタメ・スポーツ・政治・経済など多くの分野の最新ニュースをお届けします。<br><br>明日（10月26日）の10時以降は、app storeからダウンロードできますので、お楽しみにしてください。"};break;case 3:this.article={title:"「NewsJet」の提携メディアが100媒体突破！",time:"2017.01.25",content:"NewsJet はリリースして以来、多くのメディア様やユーザー様にご支持をいただきました。おかげさまで、2017年１月20日、NewsJetの提携メディアが100媒体を突破しました。<br><br>ノアドット株式会社との連携によって、共同通信47ニュース、MANTAN WEB、full countなど数多くの媒体のニュースが配信できるようになりました。さらに、韓国の大手新聞社である聯合ニュースや中国の大手新聞社であるChina netも加入することになりました。<br><br>一つのアプリで、世の中がわかります！<br><br>今後も、いろいろなメディアを入れる予定です。<br><br>これからも、NewsJetを宜しくお願い致します。"};break;case 4:this.article={title:"新規アプリ「Groupy」開発開始！",time:"2017.06.06",content:"アイドル・アイドルファン向けの新規アプリ「Groupy」の開発が決定しました。<br><br>Groupyはアイドルとアイドルファンを親密につなぐプラットフォームとして、動画・ライブ配信・掲示板・限定コンテンツ販売などのインターネット時代ならではの機能を搭載します。<br><br>いつでも、どこでも、マイアイドルを応援できるようになります。マイアイドルを身近に守りましょう。<br><br>しかも、日中同時配信予定！<br><br>開発期間は2ヶ月を予定しています。ぜひお楽しみにしてください。"};break;case 5:this.article={title:"「NewsJet」サービス一時停止のお知らせ！",time:"2017.07.01",content:"いつも、NewsJetをご利用いただき、誠にありがとうございます。<br><br>ニュースキュレーションサービス「newsjet」は、技術的・戦略的調整のため、２ヶ月程度サービス停止をさせていただきます。<br><br>サービス停止期間は7月1日〜9月1日を予定しております。<br><br>サービス停止期間はアプリストアにて非公開し、記事も更新されませんので、ご了承ください。<br><br>なお、サービス再開の日時が決まりましたら、改めてご連絡させていただきます。<br><br>大変ご迷惑をおかけして、誠に申し訳ございません。<br><br>今後とも、何卒宜しくお願い申し上げます。"};break;case 6:this.article={title:"「Groupy」ホームページリリースのお知らせ",time:"2017.07.02",content:'アイドル・アイドルファン向けサービス「Groupy」の開発に伴い、ホームページも本日から、初公開させていただきます。<br><br>URLはこちらです。<a style="color:#fc6b9f;" href="http://groupy.vip/" target="_blank">http://groupy.vip</a><br><br>アプリは日中配信のため、ホームページの言語も中国語と日本語二つを用意しました。<br><br>Groupyに関する情報や参加するアイドルの動画を定期的に更新しますので、ぜひご覧ください。'};break;default:console.log(this.article)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(1);s.n(i);e.default={data:function(){return{swiperOption:{notNextTick:!0,autoplay:3e3,setWrapperSize:!0,pagination:".swiper-pagination",paginationClickable:!0,loop:!0,observeParents:!0,debugger:!0}}},components:{swiper:i.swiper,swiperSlide:i.swiperSlide}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2),n=s(5),r=s.n(n),a=s(4),o=s(1),l=s.n(o);i.a.config.productionTip=!1,i.a.use(l.a),new i.a({el:"#app",router:a.a,render:function(t){return t(r.a)}})},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,s){t.exports=s.p+"static/img/Banner_2(1).f831115.png"},function(t,e,s){t.exports=s.p+"static/img/Groupy.a24d641.png"},function(t,e,s){t.exports=s.p+"static/img/NewsJet.5c72c31.png"},function(t,e,s){t.exports=s.p+"static/img/banner_1.8415077.png"},function(t,e,s){t.exports=s.p+"static/img/banner_2.42699c7.png"},function(t,e,s){t.exports=s.p+"static/img/banner_3.00eb72b.png"},function(t,e,s){t.exports=s.p+"static/img/pic_map.89c2df7.png"},function(t,e,s){var i=s(0)(s(6),s(34),null,null,null);t.exports=i.exports},function(t,e,s){var i=s(0)(s(7),s(35),null,null,null);t.exports=i.exports},function(t,e,s){function i(t){s(13)}var n=s(0)(s(9),s(30),i,"data-v-19b71c10",null);t.exports=n.exports},function(t,e,s){function i(t){s(14),s(15)}var n=s(0)(s(10),s(31),i,null,null);t.exports=n.exports},function(t,e,s){function i(t){s(16)}var n=s(0)(null,s(32),i,"data-v-3a14b385",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detail"},[s("div",{staticClass:"news_content"},[s("p",[s("router-link",{attrs:{to:"/index"}},[t._v("ホーム")]),t._v(" > "),s("router-link",{attrs:{to:"/list"}},[t._v("お知らせ")]),t._v(" > "),s("i",[t._v("詳細")])],1),t._v(" "),s("article",[s("h2",[t._v(t._s(t.article.title))]),t._v(" "),s("span",[s("i"),t._v(t._s(t.article.time))]),t._v(" "),s("div",{staticClass:"article_content",domProps:{innerHTML:t._s(t.article.content)}})])]),t._v(" "),s("footer",{staticClass:"footer"},[t._v("Powered by Newsjet Inc. .")])])},staticRenderFns:[]}},function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index"},[i("swiper",{ref:"mySwiper",staticClass:"banner_container",attrs:{options:t.swiperOption,id:"home"}},[i("swiper-slide",[i("img",{staticClass:"banner",attrs:{src:s(22),alt:""}})]),t._v(" "),i("swiper-slide",[i("img",{staticClass:"banner",attrs:{src:s(21),alt:""}})]),t._v(" "),i("swiper-slide",[i("img",{staticClass:"banner",attrs:{src:s(23),alt:""}})]),t._v(" "),i("div",{staticClass:"swiper-pagination",slot:"pagination"})],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"news",attrs:{id:"news"}},[i("h3",{staticClass:"title"}),t._v(" "),i("h4",{staticClass:"subtitle"},[t._v("お知らせ")]),t._v(" "),i("ul",{staticClass:"news_list"},[i("li",[t._m(2),t._v(" "),i("h3",[i("router-link",{attrs:{to:"/detail?id=6"}},[t._v("「Groupy」ホームページリリースのお知らせ")])],1)]),t._v(" "),i("li",[t._m(3),t._v(" "),i("h3",[i("router-link",{attrs:{to:"/detail?id=5"}},[t._v("「NewsJet」サービス一時停止のお知らせ！")])],1)]),t._v(" "),i("li",[t._m(4),t._v(" "),i("h3",[i("router-link",{attrs:{to:"/detail?id=4"}},[t._v("新規アプリ「Groupy」開発開始！")])],1)]),t._v(" "),i("li",[t._m(5),t._v(" "),i("h3",[i("router-link",{attrs:{to:"/detail?id=3"}},[t._v("「NewsJet」の提携メディアが100媒体突破！")])],1)]),t._v(" "),i("li",[t._m(6),t._v(" "),i("h3",[i("router-link",{attrs:{to:"/detail?id=2"}},[t._v("いよいよ「NewsJet」版もリリース！")])],1)])]),t._v(" "),i("router-link",{staticClass:"btn",attrs:{to:"/list"}},[t._v("もっと見る"),i("span")])],1),t._v(" "),t._m(7),t._v(" "),i("footer",{staticClass:"footer"},[t._v("Powered by Newsjet Inc. .")])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"product"}},[i("h3",{staticClass:"title"}),t._v(" "),i("h4",{staticClass:"subtitle"},[t._v("サービス")]),t._v(" "),i("div",{staticClass:"left"},[i("img",{attrs:{src:s(20),alt:""}}),t._v(" "),i("div",{staticClass:"logo"}),t._v(" "),i("p",[t._v("たった一分でトップニュースを"),i("i",{staticStyle:{color:"#F3BB23"}},[t._v("一瞬チェック")]),t._v("できる"),i("br"),i("i",{staticStyle:{color:"#FF9600"}},[t._v("無料")]),t._v("のニュースアプリ")])]),t._v(" "),i("div",{staticClass:"border"},[i("span",{staticStyle:{left:"0",top:"0"}},[t._v("2016.08"),i("i",{staticStyle:{"margin-left":"13px"}})]),i("p"),i("span",{staticStyle:{right:"0",bottom:"0"}},[i("i",{staticStyle:{"margin-right":"14.5px","margin-left":"0.5px"}}),t._v("2017.06")])]),t._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"logo"}),t._v(" "),i("p",[t._v("ファンが共にアイドルを"),i("i",{staticStyle:{color:"#FC6B9F"}},[t._v("応援")]),t._v("できる"),i("br"),i("i",{staticStyle:{color:"#00B4BC"}},[t._v("メンバシップ制")]),t._v("アプリ")]),t._v(" "),i("a",{staticClass:"btn",attrs:{href:"http://groupy.vip/index_japanese/japanese",target:"_blank"}},[t._v("公式サイト"),i("span")]),t._v(" "),i("img",{attrs:{src:s(19),alt:""}})])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"introduction"}},[i("div",{staticClass:"introduction_content"},[i("h3",{staticClass:"title"}),t._v(" "),i("h4",{staticClass:"subtitle"},[t._v("会社概要")]),t._v(" "),i("div",{staticClass:"left"},[i("ul",{staticClass:"introduction_list"},[i("li",[i("h5",[i("span"),t._v("社名")]),i("p",[t._v("株式会社NewsJet")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("設立日")]),i("p",[t._v("2017年3月29日")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("資本金")]),i("p",[t._v("500万円")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("事業内容")]),i("p",[t._v("アプリケーションの開発・運営")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("所在地")]),i("p",[t._v("東京都墨田区両国2丁目2-10")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("本社名")]),i("p",[t._v("広州市雲動科技有限公司")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("所在地")]),i("p",[t._v("中国広東省広州市天河区中山大道西89番天河ソフトウェアパークA#16F北9-12")])]),t._v(" "),i("li",[i("h5",[i("span"),t._v("提携パートナー")]),i("p",[t._v("共同通信、ノアドット株式会社、株式会社ワードリーフ、聯合ニュース、他")])])])]),t._v(" "),i("div",{staticClass:"right"},[i("div",[t._v("(支社)株式会社NewsJet"),i("span")]),t._v(" "),i("img",{attrs:{src:s(24),alt:""}}),t._v(" "),i("div",[i("span"),t._v("(本社)広州市雲動科技有限公司")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.07.02")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.07.01")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.06.06")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.01.25")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2016.10.25")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"contact"}},[s("div",{staticClass:"contact_content"},[s("h3",{staticClass:"title"}),t._v(" "),s("h4",{staticClass:"subtitle"},[t._v("お問合せ")]),t._v(" "),s("p",[t._v("ご意見、ご質問のお申出は、下記の窓口までお願い致します。")]),t._v(" "),s("p",{staticStyle:{"font-size":"22px","margin-top":"38px"}},[t._v("E-mail：contact@newsjet-inc.com"),s("br"),s("br"),s("i",{staticStyle:{"font-size":"18px"}},[t._v("業務提携･お仕事の依頼等はこちらの専用窓口までお願い致します。")]),s("br"),s("br"),t._v("Business: business@newsjet-inc.com")]),t._v(" "),s("p",{staticStyle:{background:"#FFFFFF",width:"88px",height:"6px",margin:"56px auto 0"}})])])}]}},function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"list"},[t._m(0),t._v(" "),s("div",{staticClass:"news"},[s("p",[s("router-link",{attrs:{to:"/index"}},[t._v("ホーム")]),t._v(" > "),s("i",[t._v("お知らせ")])],1),t._v(" "),s("h3",{staticClass:"title"}),t._v(" "),s("h4",{staticClass:"subtitle"},[t._v("お知らせ")]),t._v(" "),s("ul",{staticClass:"news_list"},[s("li",[t._m(1),t._v(" "),s("h3",[s("router-link",{attrs:{to:"/detail?id=6"}},[t._v("「Groupy」ホームページリリースのお知らせ")])],1)]),t._v(" "),s("li",[t._m(2),t._v(" "),s("h3",[s("router-link",{attrs:{to:"/detail?id=5"}},[t._v("「NewsJet」サービス一時停止のお知らせ！")])],1)]),t._v(" "),s("li",[t._m(3),t._v(" "),s("h3",[s("router-link",{attrs:{to:"/detail?id=4"}},[t._v("新規アプリ「Groupy」開発開始！")])],1)]),t._v(" "),s("li",[t._m(4),t._v(" "),s("h3",[s("router-link",{attrs:{to:"/detail?id=3"}},[t._v("「NewsJet」の提携メディアが100媒体突破！")])],1)]),t._v(" "),s("li",[t._m(5),t._v(" "),s("h3",[s("router-link",{attrs:{to:"/detail?id=2"}},[t._v("いよいよ「NewsJet」版もリリース！")])],1)]),t._v(" "),s("li",[t._m(6),t._v(" "),s("h3",[s("router-link",{attrs:{to:"/detail?id=1"}},[t._v("キュレーションサービス「NewsJet」android版先行リリース決定！")])],1)])])]),t._v(" "),s("footer",{staticClass:"footer"},[t._v("Powered by Newsjet Inc. .")])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list_banner"},[i("img",{attrs:{src:s(18),alt:""}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.07.02")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.07.01")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.06.06")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2017.01.25")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2016.10.25")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("span"),t._v("2016.10.20")])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("header",{staticClass:"header"},[s("div",{staticClass:"header_content"},[s("div",{staticClass:"logo"}),t._v(" "),s("div",{staticClass:"list"},[s("a",{attrs:{href:"#home"},on:{click:function(e){t.to_maoPoint()}}},[s("h3",[t._v("ホーム")]),t._v(" "),s("span",[t._v("HOME")])]),t._v(" "),s("a",{attrs:{href:"#product"},on:{click:function(e){t.to_maoPoint()}}},[s("h3",[t._v("サービス")]),t._v(" "),s("span",[t._v("PRODUCT")])]),t._v(" "),s("a",{attrs:{href:"#introduction"},on:{click:function(e){t.to_maoPoint()}}},[s("h3",[t._v("会社概要")]),t._v(" "),s("span",[t._v("INTRODUCTION")])]),t._v(" "),s("a",{attrs:{href:"#news"},on:{click:function(e){t.to_maoPoint()}}},[s("h3",[t._v("お知らせ")]),t._v(" "),s("span",[t._v("NEWS")])]),t._v(" "),s("a",{staticClass:"last",attrs:{href:"#contact"},on:{click:function(e){t.to_maoPoint()}}},[s("h3",[t._v("お問合せ")]),t._v(" "),s("span",[t._v("CONTACT")])])])])]),t._v(" "),s("div",{staticClass:"content"},[s("router-view")],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.slideClass},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"swiper-container"},[t._t("parallax-bg"),t._v(" "),s("div",{class:t.defaultSwiperClasses.wrapperClass},[t._t("default")],2),t._v(" "),t._t("pagination"),t._v(" "),t._t("button-prev"),t._v(" "),t._t("button-next"),t._v(" "),t._t("scrollbar")],2)},staticRenderFns:[]}}],[11]);
//# sourceMappingURL=app.6edfba785b0cb6b0a385.js.map