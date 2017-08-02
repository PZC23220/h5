<template>
    <div class="main">
        <div class="header" style="border-bottom: 1px solid #eee;">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">今日のランキング</a>
                <a class="tabs" @click="changePages(1)">総合ランキング</a>
                <span class="bgActive" style="width: 144px;margin-left: calc((100vw - 24px)* 1/4 - 72px);"></span>
            </div>
        </div>
         <div class="content">
            <swiper :options="swiperOption" ref="mySwiper" class="banner_container">
                <!-- slides -->
                <swiper-slide id="swiper1">
                    <ul class="top3" v-if="top3NoneToday == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="/img/idol_ranking/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>1?rakingListToday[1].avatar:false}" :src="rakingListToday.length>1?(rakingListToday[1].avatar?rakingListToday[1].avatar:'/img/default_img.png'):'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>1?rakingListToday[1].name:false}">{{rakingListToday.length>1?(rakingListToday[1].name?rakingListToday[1].name:'...'):'...'}}</p>
                             <span><img src="/img/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>1?rakingListToday[1].score || rakingListToday[1].score==0:false}">{{Number(rakingListToday.length>1?(rakingListToday[1].score?rakingListToday[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="/img/idol_ranking/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>0?rakingListToday[0].avatar:false}" :src="rakingListToday.length>0?(rakingListToday[0].avatar?rakingListToday[0].avatar:'/img/default_img.png'):'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>0?rakingListToday[0].name:false}">{{rakingListToday.length>0?(rakingListToday[0].name?rakingListToday[0].name:'...'):'...'}}</p>
                             <span><img src="/img/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>0?rakingListToday[0].score || rakingListToday[0].score==0:false}">{{Number(rakingListToday.length>0?(rakingListToday[0].score?rakingListToday[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="/img/idol_ranking/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingListToday.length>2?(rakingListToday[2].avatar?rakingListToday[2].avatar:'/img/default_img.png'):false}" :src="rakingListToday.length>2?(rakingListToday[2].avatar?rakingListToday[2].avatar:'/img/default_img.png'):'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.length>2?rakingListToday[2].name:false}">{{rakingListToday.length>2?(rakingListToday[2].name?rakingListToday[2].name:'...'):'...'}}</p>
                             <span><img src="/img/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.length>2?rakingListToday[2].score || rakingListToday[2].score==0:false}">{{Number(rakingListToday.length>2?(rakingListToday[2].score?rakingListToday[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <router-link :to="'/allRanking?type=today'" class="all_ranking" v-if="top3NoneToday == false">すべて表示</router-link>
                     <div class="line_20"></div>
                     <div class="default_page" v-show="top3NoneToday">
                        <img src="/img/default_no message.png" alt="">
                        <p>ただいまランキング集計中！</p>
                    </div>
                    <div class="integral con_left" :class="{'left_hide':rakingListTodaymeShow}">
                        <p style="text-align: left;padding: 0;"><span>自分の順位</span><span><i>-位</i><img src="/img/timeline_icon_likes.png" alt=""><i>0</i></span></p>
                    </div>
                    <div class="integral" v-if="rakingListTodayme.length>0">
                       <p><span>自分の順位</span><span><i>{{rakingListTodayme.length>0?rakingListTodayme[0].position:'-'}}位</i><img src="/img/timeline_icon_likes.png" alt=""><i>{{Number(rakingListTodayme.length>0?rakingListTodayme[0].score:'0').toLocaleString()}}</i></span></p>
                        <p v-show="rakingListTodayme.length>0 && (rakingListTodayme[0].position > 1)">（あと<i>{{Number(rakingListTodayme.length>0?rakingListTodayme[0].gapToNext:'').toLocaleString()}}</i>Likeでランクアップ！）</p>
                    </div>
                    <div class="integral" v-if="rakingListTodayme.length<=0&&rakingListTodaymeShow">
                        <p style="text-align: left;padding: 0;"><span>自分の順位</span><span>惜しい！もう少しでランクイン</span></p>
                    </div>

                    <div class="help">
                        <h4>Groupyの人気者になる秘訣を今キャッチ！</h4>
                        <div class="rule_content">
                            <h4 @click="tottleFloor(1)"><span></span><em>Groupy for Idol APPでは、どうやって動画を投稿しますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 1">動画を投稿するのは、アイドルの専用機能です。<b>投稿は録画して投稿するとギャラリーから動画を選んでアップロードするという二つの方法があります。ギャラリーからアップロードの場合は、10分以内の動画しか投稿できません。</b><br><br>また、投稿する際は、「公開」か「会員のみ」かを設定できます。</p>


                            <h4 @click="tottleFloor(2)"><span></span><em>Groupyとは何ですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 2"><b>Groupyは、動画・掲示板など様々な機能を通じて濃いファンをマネジメントし、オンラインでマネタイズできるアプリです。</b><br>動画をたくさん投稿することで、注目を集め、入会してもらい、さらに掲示板・生配信・ストアなどを通じて会員と交流し、いっぱい応援もらいます。<br><br> <b>中国のファンに配信できる唯一のアプリです。</b><br>Groupyは日本だけではなく、中国・香港・台湾にも配信します。海外のファンと交流できる唯一のアプリであり、中国でライブすることも実現できるかもよ。<br><br>Groupyで注目を集め、ファンたちとのコミュニティーを作り、いっぱい応援してもらって、そこからたくさんの可能性が生まれてきます。ぜひ夢を叶えるプラットフォームとしてご活用ください。</p>


                            <h4 @click="tottleFloor(3)"><span></span><em>ランキング上位に入るコツは何ですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 3">Groupyの「今日のランキング」はアイドルの人気順によるものです。<br>「今日のランキング」の上位に入るには、以下の方法がおすすめです。<br><b>1.できるだけ多く投稿すること</b><br><b>2.できるだけファンと交流し、「いいね」や「ギフト」をしてもらうこと</b><br><b>3.できるだけ多くのファンを集めること</b><br><b>4.投稿した動画をsnsに共有し、ファンに応援をお願いすること</b><br><br>ランキング上位に入ったメリット<br><b>1.ランキングの上位に入ったアイドルの投稿はGroupyのスタッフが中国語字幕をつけて中国のSNSで拡散する可能性がある</b><br><b>2.ランキング上位に入ったら、新規ファンの獲得もし安くなる</b><br><b>3.雑誌・MC・ライブに参加する権利</b><br><br>詳しくは<i>「idol@groupy.vip」</i>ご連絡ください～何か質問がありましたらもお気軽に！</p>


                            <h4 @click="tottleFloor(4)"><span></span><em>投稿した動画はどうすればホームページの上に行きますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 4">
                                Groupyは、ホームページにアイドルの投稿した動画を載せます。より多く見られ、「いいね」「ギフティング」される動画が上に行きますので、下記の方法がオススメです。<br><br><b>1.積極的に動画を投稿し、ファンの応援をお願いする</b><br><b>2.工夫した動画ほど、「いいね」「ギフティング」されやすい</b><br><br>＃動画の並び順番は投稿時間、人気度、ギフト数などで決まります。<br><br>詳しくは公式サイトからご覧下さい～<a href="http://groupy.vip" target="_blank"> --- <i>http://groupy.vip</i></a>
                            </p>
                            <h4 @click="tottleFloor(5)"><span></span><em>何を投稿すればいいますか。/どんな投稿がおすすめですか</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 5">
                                SNSでは公開しない一面を表現した動画がオススメです。<br>なお、ファンたちはどうのような動画が好きかは下記の方法で調べておこう。<br>1.<b>掲示板</b>を活用して投票を行い、ファンに直接聞く。<br>2.<b>ホームページ</b>上位の人気動画を参考する<br>3.自分の投稿をTwitter，Ameba等の<b>SNSに共有し</b>、コメントをもらう！</p>


                            <h4 @click="tottleFloor(6)"><span></span><em>Groupyで稼いだコインは換金できますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 6">
                                できます。<br>Groupyは、アイドルの稼いだコインを一定の比率で還元しています。<br><br>詳しくはアイドル専用のGroupy-idol アプリの決済詳細ページをご覧下さい～<br>詳しくは「idol@groupy.vip」までお問い合わせください。
                            </p>


                            <h4 @click="tottleFloor(7)"><span></span><em>Groupyでコインを結構貯めたが、現金に換金できますかな。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 7">
                                こんにちは、Groupyです。<br>コインをいっぱい貯められて、誠におめでとうございまーす。<br><br><b>Groupyは、アイドルのコインの獲得数によって予め約束した割合で金額決済を行い、決まった日にアイドルの口座に振込みます。</b><br><br>詳しくはアイドル専用のGroupy-idol アプリの収入詳細の説明ページをご覧下さい～
                            </p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide id="swiper2">
                    <ul class="top3" v-if="top3None == false">
                        <li>
                             <p class="idol_num" style="color: #A0A0A0;">2</p>
                             <div>
                                 <img src="/img/idol_ranking/bg_2.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>1?rakingList[1].avatar:false}" :src="rakingList.length>1?(rakingList[1].avatar?rakingList[1].avatar:'/img/default_img.png'):'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>1?rakingList[1].name:false}">{{rakingList.length>1?(rakingList[1].name?rakingList[1].name:'...'):'...'}}</p>
                             <span><img src="/img/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>1?rakingList[1].score || rakingList[1].score==0:false}">{{Number(rakingList.length>1?(rakingList[1].score?rakingList[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="/img/idol_ranking/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>0?rakingList[0].avatar:false}" :src="rakingList.length>0?(rakingList[0].avatar?rakingList[0].avatar:'/img/default_img.png'):'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>0?rakingList[0].name:false}">{{rakingList.length>0?(rakingList[0].name?rakingList[0].name:'...'):'...'}}</p>
                             <span><img src="/img/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>0?rakingList[0].score || rakingList[0].score==0:false}">{{Number(rakingList.length>0?(rakingList[0].score?rakingList[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="/img/idol_ranking/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.length>2?rakingList[2].avatar:false}" :src="rakingList.length>2?(rakingList[2].avatar?rakingList[2].avatar:'/img/default_img.png'):'/img/default_img.png'" onerror="this.src='http://h5.groupy.vip/img/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.length>2?rakingList[2].name:false}">{{rakingList.length>2?(rakingList[2].name?rakingList[2].name:'...'):'...'}}</p>
                             <span><img src="/img/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.length>2?rakingList[2].score || rakingList[2].score==0:false}">{{Number(rakingList.length>2?(rakingList[2].score?rakingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <router-link :to="'/allRanking?type=all'" class="all_ranking">すべて表示</router-link>
                     <div class="line_20"></div>
                     <div class="default_page" v-show="top3None">
                        <img src="/img/default_no message.png" alt="">
                        <p>ただいまランキング集計中！</p>
                    </div>
                    <div class="integral con_left" :class="{'left_hide':rakingListmeShow}">
                        <p style="text-align: left;padding: 0;"><span>自分の順位</span><span><i>-位</i><img src="/img/timeline_icon_likes.png" alt=""><i>0</i></span></p>
                    </div>
                    <div class="integral" v-if="rakingListme.length>0">
                       <p><span>自分の順位</span><span><i>{{rakingListme.length>0?rakingListme[0].position:'-'}}位</i><img src="/img/timeline_icon_likes.png" alt=""><i>{{Number(rakingListme.length>0?rakingListme[0].score:'0').toLocaleString()}}</i></span></p>
                        <p v-show="rakingListme.length>0 && (rakingListme[0].position > 1)">（あと<i>{{Number(rakingListme.length>0?rakingListme[0].gapToNext:'').toLocaleString()}}</i>Likeでランクアップ！）</p>
                    </div>
                    <div class="integral" v-if="rakingListme.length<=0&&rakingListmeShow">
                        <p style="text-align: left;padding: 0;"><span>自分の順位</span><span>惜しい！もう少しでランクイン</span></p>
                    </div>

                    <div class="help">
                        <h4>Groupyの人気者になる秘訣を今キャッチ！</h4>
                        <div class="rule_content">
                            <h4 @click="tottleFloor(11)"><span></span><em>Groupy for Idol APPでは、どうやって動画を投稿しますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 11">動画を投稿するのは、アイドルの専用機能です。<b>投稿は録画して投稿するとギャラリーから動画を選んでアップロードするという二つの方法があります。ギャラリーからアップロードの場合は、10分以内の動画しか投稿できません。</b><br><br>また、投稿する際は、「公開」か「会員のみ」かを設定できます。</p>


                            <h4 @click="tottleFloor(22)"><span></span><em>Groupyとは何ですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 22"><b>Groupyは、動画・掲示板など様々な機能を通じて濃いファンをマネジメントし、オンラインでマネタイズできるアプリです。</b><br>動画をたくさん投稿することで、注目を集め、入会してもらい、さらに掲示板・生配信・ストアなどを通じて会員と交流し、いっぱい応援もらいます。<br><br> <b>中国のファンに配信できる唯一のアプリです。</b><br>Groupyは日本だけではなく、中国・香港・台湾にも配信します。海外のファンと交流できる唯一のアプリであり、中国でライブすることも実現できるかもよ。<br><br>Groupyで注目を集め、ファンたちとのコミュニティーを作り、いっぱい応援してもらって、そこからたくさんの可能性が生まれてきます。ぜひ夢を叶えるプラットフォームとしてご活用ください。</p>


                            <h4 @click="tottleFloor(33)"><span></span><em>ランキング上位に入るコツは何ですか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 33">Groupyの「今日のランキング」はアイドルの人気順によるものです。<br>「今日のランキング」の上位に入るには、以下の方法がおすすめです。<br><b>1.できるだけ多く投稿すること</b><br><b>2.できるだけファンと交流し、「いいね」や「ギフト」をしてもらうこと</b><br><b>3.できるだけ多くのファンを集めること</b><br><b>4.投稿した動画をsnsに共有し、ファンに応援をお願いすること</b><br><br>ランキング上位に入ったメリット<br><b>1.ランキングの上位に入ったアイドルの投稿はGroupyのスタッフが中国語字幕をつけて中国のSNSで拡散する可能性がある</b><br><b>2.ランキング上位に入ったら、新規ファンの獲得もし安くなる</b><br><b>3.雑誌・MC・ライブに参加する権利</b><br><br>詳しくは<i>「idol@groupy.vip」</i>ご連絡ください～何か質問がありましたらもお気軽に！</p>


                            <h4 @click="tottleFloor(44)"><span></span><em>投稿した動画はどうすればホームページの上に行きますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 44">
                                Groupyは、ホームページにアイドルの投稿した動画を載せます。より多く見られ、「いいね」「ギフティング」される動画が上に行きますので、下記の方法がオススメです。<br><br><b>1.積極的に動画を投稿し、ファンの応援をお願いする</b><br><b>2.工夫した動画ほど、「いいね」「ギフティング」されやすい</b><br><br>＃動画の並び順番は投稿時間、人気度、ギフト数などで決まります。<br><br>詳しくは公式サイトからご覧下さい～<a href="http://groupy.vip" target="_blank"> --- <i>http://groupy.vip</i></a>
                            </p>
                            <h4 @click="tottleFloor(55)"><span></span><em>何を投稿すればいいますか。/どんな投稿がおすすめですか</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 55">
                                SNSでは公開しない一面を表現した動画がオススメです。<br>なお、ファンたちはどうのような動画が好きかは下記の方法で調べておこう。<br>1.<b>掲示板</b>を活用して投票を行い、ファンに直接聞く。<br>2.<b>ホームページ</b>上位の人気動画を参考する<br>3.自分の投稿をTwitter，Ameba等の<b>SNSに共有し</b>、コメントをもらう！</p>


                            <h4 @click="tottleFloor(66)"><span></span><em>Groupyで稼いだコインは換金できますか。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 66">
                                できます。<br>Groupyは、アイドルの稼いだコインを一定の比率で還元しています。<br><br>詳しくはアイドル専用のGroupy-idol アプリの決済詳細ページをご覧下さい～<br>詳しくは「idol@groupy.vip」までお問い合わせください。
                            </p>


                            <h4 @click="tottleFloor(77)"><span></span><em>Groupyでコインを結構貯めたが、現金に換金できますかな。</em><img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 77">
                                こんにちは、Groupyです。<br>コインをいっぱい貯められて、誠におめでとうございまーす。<br><br><b>Groupyは、アイドルのコインの獲得数によって予め約束した割合で金額決済を行い、決まった日にアイドルの口座に振込みます。</b><br><br>詳しくはアイドル専用のGroupy-idol アプリの収入詳細の説明ページをご覧下さい～
                            </p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="Forbidden"></div>
         </div>
         <!-- <div class="bigLoading" v-show="loadingBig">
            <img src="/img/loading_2.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import $ from 'n-zepto';
    import http from '@api/js/http.js';
    require('@api/js/common.js')
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
                  iOSEdgeSwipeDetection : true,
                  //loop : true,
                  observeParents:true,
                  debugger: true,
                  onTransitionStart(swiper){
                    $('.tabs').removeClass('active')
                    $('.tabs').eq(swiper.activeIndex).addClass('active');
                    $('.bgActive').css('left','calc((100vw - 24px)* '+ (swiper.activeIndex) +'/2)');
                  },
                },
                rakingList: [],
                rakingListme: [],
                rakingListmeShow: false,
                rakingListToday: [],
                rakingListTodayme: [],
                rakingListTodaymeShow: false,
                isShow: false,
                tottleImg: '/img/idol_ranking/icon_arrow_gray_down.png',
                tokens: '',
                // loadingBig: true,
                top3None: false,
                top3NoneToday: false,
                idx: 0
            }
        },
        methods: {
          changePages(val) {
            let tabs = $('.tabs');
            tabs.removeClass('active');
            tabs.eq(val).addClass('active');
            $('.bgActive').css('left','calc((100vw - 24px)* '+ (val) +'/2)');
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
                    http.defaults.headers.common['Authorization'] = 'Token '+getParams('token');
                }
                http.get('ranking/idols',{
                    params: {
                        filter: val
                    }
                }).then(function(res){
                    if(res.status == 200) {
                        // self.loadingBig = false;
                        if(val == 'all') {
                            if(!res.data.rankingList) {
                              self.top3None = true;   
                            }else {

                                self.rakingList = res.data.rankingList;
                            }
                            if(res.data.me) {
                                self.rakingListme = res.data.me;
                            }
                            self.rakingListmeShow = true;
                        }else {
                            if(res.data.rankingList) {
                                self.rakingListToday = res.data.rankingList;
                            }else {
                                self.top3NoneToday = true;
                            }
                            if(res.data.me) {
                                self.rakingListTodayme = res.data.me;
                            }
                            self.rakingListTodaymeShow = true;
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
                    bridge.callHandler('makeToast', 'エラーが発生しました\\nしばらくしてからもう一度お試しください');
                })
            }
          },
          tottleFloor(val) {
            if(this.isShow == val) {
                this.isShow = false;
                this.tottleImg = '/img/idol_ranking/icon_arrow_gray_down.png';
            }else {
                this.isShow = val;
                this.tottleImg = '/img/idol_ranking/icon_arrow_gray_up.png';
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
            self.tokens = getParams('token');
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
    .left_hide {
        opacity: 0;
        overflow: hidden;
        height: 0;
        padding: 0;
        border: 0;

    }
</style>