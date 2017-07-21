<template>
    <div class="main">
        <div class="header">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">今日のランキング</a>
                <a class="tabs" @click="changePages(1)">総合ランキング</a>
            </div>
        </div>
         <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                    <ul class="top3" v-if="top3None == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="../../images/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[1].avatar:false}" :src="rakingListToday.rankingList?(rakingListToday.rankingList[1].avatar?rakingListToday.rankingList[1].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[1].name:false}">{{rakingListToday.rankingList?(rakingListToday.rankingList[1].name?rakingListToday.rankingList[1].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[1].score || rakingListToday.rankingList[1].score==0:false}">{{Number(rakingListToday.rankingList?(rakingListToday.rankingList[1].score?rakingListToday.rankingList[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="../../images/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[0].avatar:false}" :src="rakingListToday.rankingList?(rakingListToday.rankingList[0].avatar?rakingListToday.rankingList[0].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[0].name:false}">{{rakingListToday.rankingList?(rakingListToday.rankingList[0].name?rakingListToday.rankingList[0].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[0].score || rakingListToday.rankingList[0].score==0:false}">{{Number(rakingListToday.rankingList?(rakingListToday.rankingList[0].score?rakingListToday.rankingList[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="../../images/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.rankingList?(rakingListToday.rankingList[2].avatar?rakingListToday.rankingList[2].avatar:'/static/images/default_img.png'):false}" :src="rakingListToday.rankingList?(rakingListToday.rankingList[2].avatar?rakingListToday.rankingList[2].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[2].name:false}">{{rakingListToday.rankingList?(rakingListToday.rankingList[2].name?rakingListToday.rankingList[2].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[2].score || rakingListToday.rankingList[2].score==0:false}">{{Number(rakingListToday.rankingList?(rakingListToday.rankingList[2].score?rakingListToday.rankingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <router-link :to="'/idol/allRanking?type=today&token='+tokens" class="all_ranking">すべて表示</router-link>
                     <div class="default_page" v-show="top3None">
                        <img src="../../images/default_no message.png" alt="">
                        <p>ただ今集計中です</p>
                    </div>
                    <div class="integral">
                        <p><span>自分の順位</span><span><i class="con_left" :class="{'left_show':rakingListToday.me?rakingListToday.me[0].position:false}">{{rakingListToday.me?rakingListToday.me[0].position:'-'}}位</i><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.me?rakingListToday.me[0].position:false}">{{Number(rakingListToday.me?rakingListToday.me[0].score:'0').toLocaleString()}}</i></span></p>
                        <p v-show="rakingListToday.me && (rakingListToday.me[0].position > 1)">（あと<i class="con_left" :class="{'left_show':rakingListToday.me?rakingListToday.me[0].position:false}">{{Number(rakingListToday.me?rakingListToday.me[0].gapToNext:'').toLocaleString()}}</i>Likeでランクアップ！）</p>
                    </div>

                    <div class="help">
                        <h4>Groupyの人気者になる秘訣を今キャッチ！</h4>
                        <div class="rule_content">
                            <h4 @click="tottleFloor(1)"><span></span><em>Groupy for Idol APPでは、どうやってビデオを投稿できますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 1">こんにちは、Groupyです。<br><br>いつもご利用頂き、誠にありがとうございます。<br><br><b>Groupy for Idol Appで動画を投稿することは、アイドルの専用機能です。アイドルは、アイドル専用のGroupy-idol アプリをダウンロードして、Groupyに応募してから、アプリで録画して投稿することができます。</b><br><br>また、Groupyではメンバーシップ制がありますので、アイドルが自分の動画に「公開」と「会員のみ」の二つのプライバシー設定を選べます。しかし、ギャラリーからアップロードした動画の再生時間は10分までという制限がありますので、気をつけてください。</p>
                            <h4 @click="tottleFloor(2)"><span></span><em>Groupyとは何ですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 2">こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br> <b>Groupyは、ファンが共にアイドルを応援できるメンバーシップ制アプリです。</b><br>ひと押しだけで応援できて、アイドルの成長をより身近に見守れて、更にメンバーのみの限定情報をいっぱい入手できます。アイドルとファンを親密につなぐプラットフォームを作ろうとしています。<br><br><b>ファンが、アイドル自身のスマホから投稿した面白い動画をリアルタイムでチェックできます。</b><br>アイドルの会員になって、掲示板で応援メッセージが送信できます。更に、最新オフ会情報やアイドルの日常、オフショットをいち早く入手！<br><br>アイドルは、ファンを集めるコミュニティを作って夢を叶えます！Groupyで動画を投稿して、「公開」か「会員のみ」のプライバシー設定してファンにシェアできます。ファンから有力な応援をもらい、ランキングの上位に入って注目度を上げましょう！</p>
                            <h4 @click="tottleFloor(3)"><span></span><em>アイドルはどうすればGroupyのランキングに入れますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 3">こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br> Groupyの「今日のランキング」はアイドルの人気順によるものです。<br>「今日のランキング」の上位に入るには、以下の方法がおすすめです。<br><b>1.たくさんのファンが投稿にLikeしてくれるほど、人気がアップします。</b><br><b>2.たくさんのファンがLikeを購入してくれるほど、人気がアップします。</b><br><b>3.掲示板か面白いビデオで盛り上がって、ギフトや応援がたくさんもらえます。</b><br>ランキングの上位に入ったアイドルはアプリの固定な画面で表示されます。更に総合ランキングもチェックできます。<br>簡単に言えば、アイドルはランキングの上位に入れるかどうかはファンからの貢献力から決まります。応援すればするほど、ランクアップしやすくなります。<br><br>Groupyの人気ランキングに入ったら何ができますか。<br><b>1.ランキングの上位に入ったアイドルの投稿はGroupyより中国市場に導入される可能性が高くなります！</b><br><b>2.日本や中国のオタクやファンの集まり（Weibo,Blibli,Toutiao等）に注目度が高まります！</b><br><b>3.注目度が高くなって、新規ファンも増やしやすいです！</b><br><br>詳しくは<i>idol@groupy.vip</i>ご連絡ください～何か質問がありましたらもお気軽に！</p>
                            <h4 @click="tottleFloor(4)"><span></span><em>どうすればホームで自分の投稿が見れますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 4">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyは、ホームページにアイドルの投稿した動画を載せます。最新で、人気な内容をファンに届こうとしますので、動画の並び順番は投稿時間、人気度、ギフト数などで決まります。<br>自分の投稿もホームに載せたい？以下の方法がおすすめです。<br><b>1..積極的に面白いビデオを投稿して、ギフトや応援をいっぱいもらって人気度を高めよう！</b><br><b>2.ファンをGroupyのメンバーシップ登録に招待して、 掲示板で盛り上がって、ファンの有力な応援でランクアップしよう！</b><br>まだGroupyに参加していないアイドルは今すぐ応募して、より多くのファンの応援で夢を叶えよう！<br><br>詳しくは公式サイトからご覧下さい～<a href="http://groupy.vip" target="_blank"> --- <i>http://groupy.vip</i></a>
                            </p>
                            <h4 @click="tottleFloor(5)"><span></span><em>何を投稿すれば人気者になれますか。/どんな投稿がおすすめですか</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 5">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyは、ホームページにアイドルの投稿した動画を載せます。最新で、人気な内容をファンに届けようとしますので、動画の並び順番は投稿時間、人気度、ギフト数などで決まります。<br>自分のファンはどんな投稿が好きのか知りたい？以下の方法がおすすめです。<br>1.<b>掲示板</b>を活用して投票を行い、ファンに直接聞きましょう。<br>2.Groupyの調査によると、多くのファンは、アイドルに<b>自分のスケジュールやオフショットをリアルタイムに更新したり、メッセージに返事したり</b>してほしいようです。また、<b>自分の努力や成績をファンにシェアする</b>のもファンにとって大事なことです。<br>3.ホームでの動画は、投稿にウルサイ編集部から動画の投稿時間、人気度、ギフト数などに基づいて選んだものです。参考にしてください～<br>また、自分の投稿をTwitter，Ameba等の<b>ソーシャルアカウントでシェアする</b>と、多くのファンから意見がいっぱいもらえるでしょう！<br>面白い動画をもっと投稿して、ファンから応援をどんどんもらって、人気ランキングの上位に入って夢が叶いますように！</p>
                            <h4 @click="tottleFloor(6)"><span></span><em>Groupyでどうやってファンを増やすのですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 6">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br><br>いろんな方法がありますよ。以下の方法がおすすめです<br>1.掲示板か面白いビデオで盛り上がって、ファンから有力な応援でGroupyの人気ランキングの上位に入ること（ファンを増やすのに一番効果があるそうです）<br>2.Twitter，Line，Facebook等のSNSアカウントで、Groupyでの登場をファンに知らせて、ファンを招待すること。（一番直接な方法）<br>3. Ameba等で定期的にブログを書いて、投稿情報を更新すること（より多くのガチヲタができるそうですよ）<br>4.Groupyも、登場しているアイドルを公式アカウントやブログで紹介します。（Groupyもアイドルのために必死に頑張ります！）
                            </p>
                            <h4 @click="tottleFloor(7)"><span></span><em>Groupyでどうやって自分の注目度を高めるのですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 7">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyでは、多くのアイドルは自身の努力やファンの支援の下に、注目度をどんどん上げて、新規ファンを増やせます。以下の方法はおすすめです～<br><br>1.自分の公開動画をSNSアカウントにシェアして、ファンをGroupyに招待すること。<br>2.積極的に面白い動画を投稿するなどして、より多くの応援を獲得して、人気ランキングの上位に入って人気者になりましょう。<br>3.掲示板を活用して投票にてファンに意見を聞いたり、面白いビデオで盛り上がったりして、ファンから有力な応援をもらい、Groupyの人気ランキングの上位に入ろう。<br>4.Groupyは、10億人超えの中国市場の「欲しい」を喚起し、人気アイドルの動画をオタクやファンの集まり（Weibo,Blibli,Toutiao,WeChat公式アカウント及び各動画配信アプリ等）に導入しようとしています。<br><br>Groupyで、より多くのファンの応援で夢が叶いますように！
                            </p>
                            <h4 @click="tottleFloor(8)"><span></span><em>コインを現金に換金したいが、どうすればいいでしょうか</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 8">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyは、アイドルのコインの獲得数によって予め約束した割合で金額決済を行い、決まった日にアイドルの口座に振込みます。<br><br>詳しくはアイドル専用のGroupy-idol アプリの決済詳細ページをご覧下さい～<br>その他何か問題ありましたら、お気軽にidol@groupy.vipまでご連絡ください～
                            </p>
                            <h4 @click="tottleFloor(9)"><span></span><em>Groupyでコインを結構貯めたが、現金に換金できますかな。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 9">
                                こんにちは、Groupyです。<br>コインをいっぱい貯められて、誠におめでとうございまーす。<br><br>Groupyは、アイドルのコインの獲得数によって予め約束した割合で金額決済を行い、決まった日にアイドルの口座に振込みます。<br><br>詳しくはアイドル専用のGroupy-idol アプリの収入詳細の説明ページをご覧下さい～
                            </p>
                            <h4 @click="tottleFloor(10)"><span></span><em>無所属のアイドルですが、Groupyに参加できますかな？</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 10">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>アイドルがファンのより親密な応援で夢を叶えるプラットフォームを作ろうとしていますので、事務所の所属なしのアイドルでも、Groupyはみんな大歓迎です！<br>具体的な流れは以下のようになっています。<br><br>アプリでの応募方法：<br>アプリの応募画面に、電話番号、メールアドレスとTwitterアカウントをご記入の上、ご提出願います。<br><br>その他の応援方法：<br>・メールアドレスや電話番号<br>・自己紹介<br>・Twitter/SNSのアカウント<br>・30秒以内のファンへの招待動画<br>上記の応募資料をwanted@groupy.vipまでご送付願います。<br><br>詳しくは 公式サイトからチェックしてください～<br><a href="http://groupy.vip" target="_blank"></a>http://groupy.vip<br>Groupyでの登場を楽しみにしています！
                            </p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="top3">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="../../images/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.rankingList?rakingList.rankingList[1].avatar:false}" :src="rakingList.rankingList?(rakingList.rankingList[1].avatar?rakingList.rankingList[1].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[1].name:false}">{{rakingList.rankingList?(rakingList.rankingList[1].name?rakingList.rankingList[1].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[1].score || rakingList.rankingList[1].score==0:false}">{{Number(rakingList.rankingList?(rakingList.rankingList[1].score?rakingList.rankingList[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="../../images/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.rankingList?rakingList.rankingList[0].avatar:false}" :src="rakingList.rankingList?(rakingList.rankingList[0].avatar?rakingList.rankingList[0].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[0].name:false}">{{rakingList.rankingList?(rakingList.rankingList[0].name?rakingList.rankingList[0].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[0].score || rakingList.rankingList[0].score==0:false}">{{Number(rakingList.rankingList?(rakingList.rankingList[0].score?rakingList.rankingList[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="../../images/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.rankingList?rakingList.rankingList[2].avatar:false}" :src="rakingList.rankingList?(rakingList.rankingList[2].avatar?rakingList.rankingList[2].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[2].name:false}">{{rakingList.rankingList?(rakingList.rankingList[2].name?rakingList.rankingList[2].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[2].score || rakingList.rankingList[2].score==0:false}">{{Number(rakingList.rankingList?(rakingList.rankingList[2].score?rakingList.rankingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <router-link :to="'/idol/allRanking?type=all&token='+tokens" class="all_ranking">すべて表示</router-link>
                     <div class="default_page" v-show="top3None">
                        <img src="../../images/default_no message.png" alt="">
                        <p>ただ今集計中です</p>
                    </div>
                    <div class="integral">
                        <p><span>自分の順位</span><span><i class="con_left" :class="{'left_show':rakingList.me?rakingList.me[0].position:false}">{{rakingList.me?rakingList.me[0].position:'-'}}位</i><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.me?rakingList.me[0].position:false}">{{Number(rakingList.me?rakingList.me[0].score:'0').toLocaleString()}}</i></span></p>
                        <p v-show="rakingList.me && (rakingList.me[0].position > 1)">（あと<i class="con_left" :class="{'left_show':rakingList.me?rakingList.me[0].position:false}">{{Number(rakingList.me?rakingList.me[0].gapToNext:'').toLocaleString()}}</i>Likeでランクアップ！）</p>
                    </div>

                    <div class="help">
                        <h4>Groupyの人気者になる秘訣を今キャッチ！</h4>
                        <div class="rule_content">
                            <h4 @click="tottleFloor(11)"><span></span><em>Groupy for Idol APPでは、どうやってビデオを投稿できますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 11">こんにちは、Groupyです。<br><br>いつもご利用頂き、誠にありがとうございます。<br><br><b>Groupy for Idol Appで動画を投稿することは、アイドルの専用機能です。アイドルは、アイドル専用のGroupy-idol アプリをダウンロードして、Groupyに応募してから、アプリで録画して投稿することができます。</b><br><br>また、Groupyではメンバーシップ制がありますので、アイドルが自分の動画に「公開」と「会員のみ」の二つのプライバシー設定を選べます。しかし、ギャラリーからアップロードした動画の再生時間は10分までという制限がありますので、気をつけてください。</p>
                            <h4 @click="tottleFloor(22)"><span></span><em>Groupyとは何ですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 22">こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br> <b>Groupyは、ファンが共にアイドルを応援できるメンバーシップ制アプリです。</b><br>ひと押しだけで応援できて、アイドルの成長をより身近に見守れて、更にメンバーのみの限定情報をいっぱい入手できます。アイドルとファンを親密につなぐプラットフォームを作ろうとしています。<br><br><b>ファンが、アイドル自身のスマホから投稿した面白い動画をリアルタイムでチェックできます。</b><br>アイドルの会員になって、掲示板で応援メッセージが送信できます。更に、最新オフ会情報やアイドルの日常、オフショットをいち早く入手！<br><br>アイドルは、ファンを集めるコミュニティを作って夢を叶えます！Groupyで動画を投稿して、「公開」か「会員のみ」のプライバシー設定してファンにシェアできます。ファンから有力な応援をもらい、ランキングの上位に入って注目度を上げましょう！</p>
                            <h4 @click="tottleFloor(33)"><span></span><em>アイドルはどうすればGroupyのランキングに入れますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 33">こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br> Groupyの「今日のランキング」はアイドルの人気順によるものです。<br>「今日のランキング」の上位に入るには、以下の方法がおすすめです。<br><b>1.たくさんのファンが投稿にLikeしてくれるほど、人気がアップします。</b><br><b>2.たくさんのファンがLikeを購入してくれるほど、人気がアップします。</b><br><b>3.掲示板か面白いビデオで盛り上がって、ギフトや応援がたくさんもらえます。</b><br>ランキングの上位に入ったアイドルはアプリの固定な画面で表示されます。更に総合ランキングもチェックできます。<br>簡単に言えば、アイドルはランキングの上位に入れるかどうかはファンからの貢献力から決まります。応援すればするほど、ランクアップしやすくなります。<br><br>Groupyの人気ランキングに入ったら何ができますか。<br><b>1.ランキングの上位に入ったアイドルの投稿はGroupyより中国市場に導入される可能性が高くなります！</b><br><b>2.日本や中国のオタクやファンの集まり（Weibo,Blibli,Toutiao等）に注目度が高まります！</b><br><b>3.注目度が高くなって、新規ファンも増やしやすいです！</b><br><br>詳しくは<i>idol@groupy.vip</i>ご連絡ください～何か質問がありましたらもお気軽に！</p>
                            <h4 @click="tottleFloor(44)"><span></span><em>どうすればホームで’自分の投稿が見れますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 44">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyは、ホームページにアイドルの投稿した動画を載せます。最新で、人気な内容をファンに届こうとしますので、動画の並び順番は投稿時間、人気度、ギフト数などで決まります。<br>自分の投稿もホームに載せたい？以下の方法がおすすめです。<br>1.積極的に面白いビデオを投稿して、ギフトや応援をいっぱいもらって人気度を高めよう！<br>2.ファンをGroupyのメンバーシップ登録に招待して、 掲示板で盛り上がって、ファンの有力な応援でランクアップしよう！<br>まだGroupyに参加していないアイドルは今すぐ応募して、より多くのファンの応援で夢を叶えよう！<br><br>1. 主动直接发起投票让粉丝选择想要看到的内容，吸引更多爱豆来应援自己，收货更多高级的铁杆粉丝。<br><br>詳しくは公式サイトからご覧下さい～<a href="http://groupy.vip" target="_blank"> --- <i>http://groupy.vip</i></a>
                            </p>
                            <h4 @click="tottleFloor(55)"><span></span><em>何を投稿すれば人気者になれますか。/どんな投稿がおすすめですか</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 55">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyは、ホームページにアイドルの投稿した動画を載せます。最新で、人気な内容をファンに届けようとしますので、動画の並び順番は投稿時間、人気度、ギフト数などで決まります。<br>自分のファンはどんな投稿が好きのか知りたい？以下の方法がおすすめです。<br>1.<b>掲示板</b>を活用して投票を行い、ファンに直接聞きましょう。<br>2.Groupyの調査によると、多くのファンは、アイドルに<b>自分のスケジュールやオフショットをリアルタイムに更新したり、メッセージに返事したり</b>してほしいようです。また、<b>自分の努力や成績をファンにシェアする</b>のもファンにとって大事なことです。<br>3.ホームでの動画は、投稿にウルサイ編集部から動画の投稿時間、人気度、ギフト数などに基づいて選んだものです。参考にしてください～<br>また、自分の投稿をTwitter，Ameba等の<b>ソーシャルアカウントでシェアする</b>と、多くのファンから意見がいっぱいもらえるでしょう！<br>面白い動画をもっと投稿して、ファンから応援をどんどんもらって、人気ランキングの上位に入って夢が叶いますように！</p>
                            <h4 @click="tottleFloor(66)"><span></span><em>Groupyでどうやってファンを増やすのですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 66">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br><br>いろんな方法がありますよ。以下の方法がおすすめです<br>1.掲示板か面白いビデオで盛り上がって、ファンから有力な応援でGroupyの人気ランキングの上位に入ること（ファンを増やすのに一番効果があるそうです）<br>2.Twitter，Line，Facebook等のSNSアカウントで、Groupyでの登場をファンに知らせて、ファンを招待すること。（一番直接な方法）<br>3. Ameba等で定期的にブログを書いて、投稿情報を更新すること（より多くのガチヲタができるそうですよ）<br>4.Groupyも、登場しているアイドルを公式アカウントやブログで紹介します。（Groupyもアイドルのために必死に頑張ります！）
                            </p>
                            <h4 @click="tottleFloor(77)"><span></span><em>Groupyでどうやって自分の注目度を高めるのですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 77">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyでは、多くのアイドルは自身の努力やファンの支援の下に、注目度をどんどん上げて、新規ファンを増やせます。以下の方法はおすすめです～<br><br>1.自分の公開動画をSNSアカウントにシェアして、ファンをGroupyに招待すること。<br>2.積極的に面白い動画を投稿するなどして、より多くの応援を獲得して、人気ランキングの上位に入って人気者になりましょう。<br>3.掲示板を活用して投票にてファンに意見を聞いたり、面白いビデオで盛り上がったりして、ファンから有力な応援をもらい、Groupyの人気ランキングの上位に入ろう。<br>4.Groupyは、10億人超えの中国市場の「欲しい」を喚起し、人気アイドルの動画をオタクやファンの集まり（Weibo,Blibli,Toutiao,WeChat公式アカウント及び各動画配信アプリ等）に導入しようとしています。<br><br>Groupyで、より多くのファンの応援で夢が叶いますように！
                            </p>
                            <h4 @click="tottleFloor(88)"><span></span><em>コインを現金に換金したいが、どうすればいいでしょうか</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 88">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>Groupyは、アイドルのコインの獲得数によって予め約束した割合で金額決済を行い、決まった日にアイドルの口座に振込みます。<br><br>詳しくはアイドル専用のGroupy-idol アプリの決済詳細ページをご覧下さい～<br>その他何か問題ありましたら、お気軽にidol@groupy.vipまでご連絡ください～
                            </p>
                            <h4 @click="tottleFloor(99)"><span></span><em>Groupyでコインを結構貯めたが、現金に換金できますかな。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 99">
                                こんにちは、Groupyです。<br>コインをいっぱい貯められて、誠におめでとうございまーす。<br><br>Groupyは、アイドルのコインの獲得数によって予め約束した割合で金額決済を行い、決まった日にアイドルの口座に振込みます。<br><br>詳しくはアイドル専用のGroupy-idol アプリの収入詳細の説明ページをご覧下さい～
                            </p>
                            <h4 @click="tottleFloor(100)"><span></span><em>無所属のアイドルですが、Groupyに参加できますかな？</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 100">
                                こんにちは、Groupyです。<br>いつもご利用頂き、誠にありがとうございます。<br><br>アイドルがファンのより親密な応援で夢を叶えるプラットフォームを作ろうとしていますので、事務所の所属なしのアイドルでも、Groupyはみんな大歓迎です！<br>具体的な流れは以下のようになっています。<br><br>アプリでの応募方法：<br>アプリの応募画面に、電話番号、メールアドレスとTwitterアカウントをご記入の上、ご提出願います。<br><br>その他の応援方法：<br>・メールアドレスや電話番号<br>・自己紹介<br>・Twitter/SNSのアカウント<br>・30秒以内のファンへの招待動画<br>上記の応募資料をwanted@groupy.vipまでご送付願います。<br><br>詳しくは 公式サイトからチェックしてください～<br><a href="http://groupy.vip" target="_blank"></a>http://groupy.vip<br>Groupyでの登場を楽しみにしています！
                            </p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
         </div>
         <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="../../images/loading_2.png" alt="">
        </div> -->
    </div>
</template>

<script src="../../utils/common.js"></script>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import $ from 'n-zepto';
    import http from '@env/http.js';
    export default {
        data() {
            return {
                swiperOption: {
                  notNextTick: true,
                  // grabCursor : true,
                  setWrapperSize :true,
                  // autoHeight: true,
                  pagination : '.swiper-pagination',
                  paginationClickable :true,
                  resistanceRatio : 0,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                  },
                },
                rakingList: [],
                rakingListToday: [],
                isShow: false,
                tottleImg: './static/images/icon_arrow_gray_down.png',
                tokens: '',
                // loadingBig: true,
                top3None: false,
                idx: 0
            }
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active')
            this.swiper.slideTo(val, 500, false)
          },
          formatTime(key) {
              let timer = new Date(key*1000);
              return timer.Format('MM.dd')+ '&nbsp;&nbsp;&nbsp;&nbsp;' + timer.Format('hh:mm')
          },
          getRanking(val,token) {
            let self = this;
            if(self.idx < 4) {
                self.idx++;
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                    self.tokens = token;
                }else {
                    http.defaults.headers.common['Authorization'] = 'Token '+self.$route.query.token;
                }
                http.get('/ranking/idols',{
                    params: {
                        filter: val
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        // self.loadingBig = false;
                        if(val == 'all') {
                            if(!res.data.rankingList) {
                              self.top3None = true;   
                            }
                            self.rakingList = res.data;
                        }else {
                            self.rakingListToday = res.data;
                        }
                        
                        console.log(self.rakingList)
                        console.log(self.rakingListToday)
                    }else {
                        window.setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                                self.getRanking(responseData.token);
                            })
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getRanking(responseData.token);
                        })
                    })
                });
            }else {
                self.top3None = true;
                // self.loadingBig = false;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                })
            }
          },
          tottleFloor(val) {
            if(this.isShow == val) {
                this.isShow = false;
                this.tottleImg = './static/images/icon_arrow_gray_down.png';
            }else {
                this.isShow = val;
                this.tottleImg = './static/images/icon_arrow_gray_up.png';
            } 
          },
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {
            var self = this;
            self.tokens = self.$route.query.token;
            self.getRanking('today');
            self.getRanking('all');
        }
    }
</script>

<style lang="scss" scoped>
    .help p {
        background: #FAFAFA;
        border-bottom: 1px solid #e2e2e2;
        
    }
    .help {
        padding: 15px 0;
        h4 {
            padding: 0 12px;
        }
        .rule_content {
            padding: 15px 0 8px;
            h4 {
                line-height: 26px;
                padding: 5px 12px;
                border-bottom: 1px solid #e2e2e2;
                font-weight:500;
                overflow: hidden;
                img {
                    float: right;
                    margin-top: 17.5px;
                }
                em {
                    display: inline-block;
                    max-width: 85%;
                    float: left;
                }
                span {
                    float: left;
                    margin-top: 6px;
                }
            }
        }
        p {
            padding: 8px 12px;
            line-height: 20px;
            color: #666;
            b{
                color: #2A2A2A;
            }
        }
    }
    .con_left {
        opacity: 0.2;
        transition: opacity 0.3s;
     }
    .left_show {
        opacity: 1;
    }
</style>