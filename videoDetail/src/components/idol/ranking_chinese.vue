<template>
    <div class="main">
        <div class="header">
            <div class="detailPages">
                <a class="tabs active" @click="changePages(0)">今日排名</a>
                <a class="tabs" @click="changePages(1)">总排名</a>
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
                                 <img :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[2].avatar:false}" :src="rakingListToday.rankingList?(rakingListToday.rankingList[2].avatar?rakingListToday.rankingList[2].avatar:'/static/images/default_img.png'):'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[2].name:false}">{{rakingListToday.rankingList?(rakingListToday.rankingList[2].name?rakingListToday.rankingList[2].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.rankingList?rakingListToday.rankingList[2].score || rakingListToday.rankingList[2].score==0:false}">{{Number(rakingListToday.rankingList?(rakingListToday.rankingList[2].score?rakingListToday.rankingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <router-link :to="'/idol/allRanking?type=today&token='+tokens" class="all_ranking">全部排名</router-link>
                     <div class="default_page" v-show="top3None">
                        <img src="../../images/default_no message.png" alt="">
                        <p>还没有爱豆的排名</p>
                    </div>
                    <div class="integral">
                        <p><span>我的排名</span><span><i class="con_left" :class="{'left_show':rakingListToday.me?rakingListToday.me[0].position:false}">{{rakingListToday.me?rakingListToday.me[0].position:'-'}}位</i><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingListToday.me?rakingListToday.me[0].position:false}">{{Number(rakingListToday.me?rakingListToday.me[0].score:'').toLocaleString()}}</i></span></p>
                        <p v-show="rakingListToday.me && (rakingListToday.me[0].position > 1)">（与前一位爱豆相差<i class="con_left" :class="{'left_show':rakingListToday.me?rakingListToday.me[0].position:false}">{{Number(rakingListToday.me?rakingListToday.me[0].gapToNext:'').toLocaleString()}}</i>人气）</p>
                    </div>

                    <div class="help">
                        <h4>Groupy攻略</h4>
                        <div class="rule_content">
                            <h4 @click="tottleFloor(1)"><span></span>如何使用Groupy for Idol APP发精彩视频？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 1">您好，Groupy小助理很高兴能为您解答。<br><br><b>在Groupy for Idol App发布视频是爱豆的专属功能。</b><br><br>爱豆下载Groupy-idol的专用app以后可以在App里面使用直接录制和上传视频的功能。录制视频，经过简单的编辑后可以发布给粉丝查看。<br><br><b>爱豆还可以给自己的视频设置任何人可见和仅会员可见两种权限。</b><br><br>另外，如果是自己上传的视频，请注意视频的长度不能超过10分钟。</p>
                            <h4 @click="tottleFloor(2)"><span></span>Groupy是什么？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 2">您好，Groupy小助理很高兴能为您解答。<br><br>Groupy是一个基于视频的，让粉丝线上应援爱豆的会员制社群。<br>也是一个粉丝与爱豆亲密互动的平台，会员仅有的私密状态查看，一键应援。Groupy为广大粉丝提供一个共同守护爱豆成长的平台。<br><br>作为粉丝，Groupy让你随时查看爱豆的即时状态和由爱豆亲自拍摄的各种精彩短视频。<br>你可以在这里找到心目中的爱豆，加入他们的社群，观看直播，及时聊天，优先获得参与线下活动资格以及查看更多私密内容。<br><br>作为爱豆，Groupy让你聚集所有粉丝让他们一起帮助你实现梦想，录制可设置观看权限的短视频，发布动态，号召粉丝成为自己的会员，通过粉丝的应援积累人气，登顶人气榜获得知名度</p>
                            <h4 @click="tottleFloor(3)"><span></span>爱豆要怎么上Groupy的人气榜？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 3">您好，Groupy小助理很高兴能为您解答。<br><br>Groupy的每日人气榜是根据爱豆每天当时的人气情况，从高到低排行。<br>可以有好多办法帮助提高人气：<br><br>1. 鼓励粉丝看视频不断点赞送人气 <br><br>2. 鼓励粉丝直接购买人气送给自己<br><br>3. 积极与粉丝互动，以及积极发布精彩视频，让粉丝应援和送礼物提高个人的人气值。<br>人气值最高的几位爱豆就可以登顶每日的人气top banner位置，另外还有历史最高排名可以查询。<br>总的来说，爱豆的每日人气都是根据粉丝的应援数决定的。应援越多，爱豆出现在人气榜上的可能性越大。<br><br><br>登顶Groupy人气榜可以得到什么呢？<br>1. 优先获得Groupy团队编辑筛选精彩视频发布到中国市场的机会。<br>2. 更多机会在日本和中国各大著名的粉丝宅男聚集地曝光宣传，如微博，bilibili，今日头条等平台。<br>3. 获得更多曝光和粉丝的应援。<br>想要了解更多，有问题也可以联系<i>idol@groupy.vip</i>邮箱哦</p>
                            <h4 @click="tottleFloor(4)"><span></span>我如何在Groupy上首页？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 4">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy的首页会展示爱豆上传的视频，视频的排行受上传的时间，人气情况，热度，打赏情况等影响，目的是给粉丝优先展示更新更受欢迎的视频。<br>所以如果想要获得Groupy首页的曝光，有好多方法可以实现的！<br><br>1. 积极更新免费和付费内容，通过发布精彩有趣的短视频，让Groupy的用户和粉丝为自己点赞送人气和礼物，越受欢迎的视频，就会优先排在首页上曝光<br><br>2.另一方面号召更多粉丝加入Groupy成为自己的会员，每天查看自己的最新动态，积累更多礼物和人气，让自己登顶人气榜<br><br>想要了解更多，马上加入Groupy申请成为爱豆，获得更多粉丝更多应援，实现自己的梦想吧！<br><br><a href="http://groupy.vip" target="_blank"> http://groupy.vip</a>
                            </p>
                            <h4 @click="tottleFloor(5)"><span></span>在Groupy发什么内容比较有趣受粉丝欢迎？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 5">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy首页的视频内容都是按照热度和粉丝的喜欢程度来排序的，越受欢迎的视频会优先展示给粉丝看到。要知道自己粉丝喜欢的内容可以通过几个方法实现：<br><br>1. 主动直接发起投票让粉丝选择想要看到的内容，吸引更多爱豆来应援自己，收货更多高级的铁杆粉丝。<br><br>2. 经过Groupy对粉丝的调研，发现粉丝会希望爱豆们定时更新自己的最新状态和行程以及能定时回复他们的留言，同步最近一些努力的成果，会让粉丝更加坚持地守护自己。<br><br>3.  首页上是根据发布时间，人气度，收获的礼物数量等经过编辑部筛选的精彩视频，可作参考<br><br>另外还可以经自己的更新内容分享至各大社交账号。只要内容被粉丝发现，就会被讨论，可以根据他们的意见来不断改进~希望爱豆可以早日发现有趣的内容，获得更多的应援，登上groupy的人气榜实现梦想！
                            </p>
                            <h4 @click="tottleFloor(6)"><span></span>加入Groupy以后我要如何获得粉丝?<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 6">
                                加入Groupy以后可以通过各种方法获得自己的粉丝：<br><br>1. 积极更新免费和付费内容，通过精彩的视频内容吸引Groupy的用户成为自己的粉丝，获得更多的人气，登顶人气榜（吸引更多新粉丝的非常非常有效的方法！）<br><br>2. 在自有的社交媒体Twitter和Facebook上宣传，让粉丝到Groupy关注和应援自己（最直接的方法！）<br><br>3. 在ameblo等博客网站发文吸引粉丝进驻（长期可积累更多忠实粉丝呢！）<br><br>4. Groupy会为每个进驻的爱豆在SNS上宣传以及在其他博客媒体告知粉丝的（Groupy会尽力为每位爱豆提高粉丝量的！）
                            </p>
                            <h4 @click="tottleFloor(7)"><span></span>如何通过Groupy迅速提高自己的知名度?<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 7">
                                您好，Groupy小助理很高兴能为您服务。<br><br>我们已经有很多爱豆在Groupy上经过自己的努力收获了大量粉丝，成为Groupy的明星爱豆，人气满满，希望你也能早日获得更高人气哦！现在为您分享一下如何通过Groupy迅速提高自己知名度的经验。<br><br>1. 一直一直一直强调也是最有效的方法就是：通过积极跟粉丝互动，了解他们的意愿，希望自己更新的内容种类和视频。积极发布能与粉丝互动性强的视频内容可以获得高价值的打赏和应援。不断收获粉丝的人气还可以竞争登上Groupy的每日人气榜，成为人气爱豆！<b>精彩视频还会通过Groupy官方编辑挑选发布到超过10亿用户的中国用户市场，包括宅男和粉丝最大的聚集地：微博，Bilibli，今日头条，微信公众号以及各大短视频相关的网站平台</b><br><br>2. 能够连续成为人气最高的爱豆，可以在极短的时间把Groupy的粉丝招揽成为自己的会员，支持和应援自己。<br><br>3. 每次在Groupy更新的免费内容都可以分享到社交媒体，借助Twitter，youtube和ameblo的社交力量，可以获得更多曝光，并且鼓励粉丝加入成为自己的会员可以迅速提高自己的知名度的！<br><br>以上是收集了明星爱豆的成长经验给大家分享，希望能够帮助爱豆们找到属于自己的舞台，达成自己的梦想！
                            </p>
                            <h4 @click="tottleFloor(8)"><span></span>我在Groupy上的钱怎么提现？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 8">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy是每月固定时间会按照合约条款的分成数目给个人爱豆结算打款。在爱豆加入的时候会提交自己的银行信息，Groupy的财务小组会及时给爱豆结算的。具体详情可以查看Groupy的爱豆专用App里面的结算详情。另外如果还有其他问题的话可以随时联系Groupy的工作人员哦<i>idol@groupy.vip</i>
                            </p>
                            <h4 @click="tottleFloor(9)"><span></span>我在Groupy获得了G币，怎么兑换成现金呢？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 9">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy给爱豆明确有一定的G币兑换规则， 受G币的汇率影响，每个月实时G币可兑换的实际日元可能会因为汇率波动而波动呢。具体细节可以在Groupy for idol的收入详情页查看相关说明！
                            </p>
                            <h4 @click="tottleFloor(10)"><span></span>我是个人偶像！如何加入Groupy？？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 10">
                                您好，Groupy小助理很高兴能为您解答。<br><br>个人偶像可以通过自荐的方式加入Groupy的报名方式：<br>请将自我介绍、Twitter/SNS账号，30秒以内的短视频发送至groupyinc@gmail.com<br>详情还可以进入Groupy官网了解更多哦！期待您的加入，这里有众多粉丝在等你！<br><a href="http://groupy.vip" target="_blank">http://groupy.vip</a>
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
                                 <img :class="{'left_show':rakingList.rankingList?rakingList.rankingList[1].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[1].avatar:'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[1].name:false}">{{rakingList.rankingList?(rakingList.rankingList[1].name?rakingList.rankingList[1].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[1].score || rakingList.rankingList[1].score==0:false}">{{Number(rakingList.rankingList?(rakingList.rankingList[1].score?rakingList.rankingList[1].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="font-size: 28px;font-weight: 600;color: #FABC01;">1</p>
                             <div>
                                 <img src="../../images/bg_1.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.rankingList?rakingList.rankingList[0].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[0].avatar:'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[0].name:false}">{{rakingList.rankingList?(rakingList.rankingList[0].name?rakingList.rankingList[0].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[0].score || rakingList.rankingList[0].score==0:false}">{{Number(rakingList.rankingList?(rakingList.rankingList[0].score?rakingList.rankingList[0].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                         <li>
                             <p class="idol_num" style="color: #FA8505;">3</p>
                             <div>
                                 <img src="../../images/bg_3.png" alt="" class="crown">
                                 <img :class="{'left_show':rakingList.rankingList?rakingList.rankingList[2].avatar:false}" :src="rakingList.rankingList?rakingList.rankingList[2].avatar:'/static/images/default_img.png'" onerror="this.src='http://h5.groupy.vip/static/images/default_img.png'" alt="" class="idol_img con_left">
                             </div>
                             <p class="idol_name con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[2].name:false}">{{rakingList.rankingList?(rakingList.rankingList[2].name?rakingList.rankingList[2].name:'...'):'...'}}</p>
                             <span><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.rankingList?rakingList.rankingList[2].score || rakingList.rankingList[2].score==0:false}">{{Number(rakingList.rankingList?(rakingList.rankingList[2].score?rakingList.rankingList[2].score:'0'):'0').toLocaleString()}}</i></span>
                         </li>
                     </ul>
                     <router-link :to="'/idol/allRanking?type=all&token='+tokens" class="all_ranking">全部排名</router-link>
                     <div class="default_page" v-show="top3None">
                        <img src="../../images/default_no message.png" alt="">
                        <p>还没有爱豆的排名</p>
                    </div>
                    <div class="integral">
                        <p><span>我的排名</span><span><i class="con_left" :class="{'left_show':rakingList.me?rakingList.me[0].position:false}">{{rakingList.me?rakingList.me[0].position:'-'}}位</i><img src="../../images/timeline_icon_likes.png" alt=""><i class="con_left" :class="{'left_show':rakingList.me?rakingList.me[0].position:false}">{{Number(rakingList.me?rakingList.me[0].score:'0').toLocaleString()}}</i></span></p>
                        <p v-show="rakingList.me && (rakingList.me[0].position > 1)">（与前一位爱豆相差<i class="con_left" :class="{'left_show':rakingList.me?rakingList.me[0].position:false}">{{Number(rakingList.me?rakingList.me[0].gapToNext:'').toLocaleString()}}</i>人气）</p>
                    </div>

                    <div class="help">
                        <h4>Groupy攻略</h4>
                        <div class="rule_content">
                            <h4 @click="tottleFloor(11)"><span></span>如何使用Groupy for Idol APP发精彩视频？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 11">您好，Groupy小助理很高兴能为您解答。<br><br><b>在Groupy for Idol App发布视频是爱豆的专属功能。</b><br><br>爱豆下载Groupy-idol的专用app以后可以在App里面使用直接录制和上传视频的功能。录制视频，经过简单的编辑后可以发布给粉丝查看。<br><br><b>爱豆还可以给自己的视频设置任何人可见和仅会员可见两种权限。</b><br><br>另外，如果是自己上传的视频，请注意视频的长度不能超过10分钟。</p>
                            <h4 @click="tottleFloor(22)"><span></span>Groupy是什么？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 22">您好，Groupy小助理很高兴能为您解答。<br><br>Groupy是一个基于视频的，让粉丝线上应援爱豆的会员制社群。<br>也是一个粉丝与爱豆亲密互动的平台，会员仅有的私密状态查看，一键应援。Groupy为广大粉丝提供一个共同守护爱豆成长的平台。<br><br>作为粉丝，Groupy让你随时查看爱豆的即时状态和由爱豆亲自拍摄的各种精彩短视频。<br>你可以在这里找到心目中的爱豆，加入他们的社群，观看直播，及时聊天，优先获得参与线下活动资格以及查看更多私密内容。<br><br>作为爱豆，Groupy让你聚集所有粉丝让他们一起帮助你实现梦想，录制可设置观看权限的短视频，发布动态，号召粉丝成为自己的会员，通过粉丝的应援积累人气，登顶人气榜获得知名度</p>
                            <h4 @click="tottleFloor(33)"><span></span>爱豆要怎么上Groupy的人气榜？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 33">您好，Groupy小助理很高兴能为您解答。<br><br>Groupy的每日人气榜是根据爱豆每天当时的人气情况，从高到低排行。<br>可以有好多办法帮助提高人气：<br><br>1. 鼓励粉丝看视频不断点赞送人气 <br><br>2. 鼓励粉丝直接购买人气送给自己<br><br>3. 积极与粉丝互动，以及积极发布精彩视频，让粉丝应援和送礼物提高个人的人气值。<br>人气值最高的几位爱豆就可以登顶每日的人气top banner位置，另外还有历史最高排名可以查询。<br>总的来说，爱豆的每日人气都是根据粉丝的应援数决定的。应援越多，爱豆出现在人气榜上的可能性越大。<br><br><br>登顶Groupy人气榜可以得到什么呢？<br>1. 优先获得Groupy团队编辑筛选精彩视频发布到中国市场的机会。<br>2. 更多机会在日本和中国各大著名的粉丝宅男聚集地曝光宣传，如微博，bilibili，今日头条等平台。<br>3. 获得更多曝光和粉丝的应援。<br>想要了解更多，有问题也可以联系<i>idol@groupy.vip</i>邮箱哦</p>
                            <h4 @click="tottleFloor(44)"><span></span>我如何在Groupy上首页？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 44">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy的首页会展示爱豆上传的视频，视频的排行受上传的时间，人气情况，热度，打赏情况等影响，目的是给粉丝优先展示更新更受欢迎的视频。<br>所以如果想要获得Groupy首页的曝光，有好多方法可以实现的！<br><br>1. 积极更新免费和付费内容，通过发布精彩有趣的短视频，让Groupy的用户和粉丝为自己点赞送人气和礼物，越受欢迎的视频，就会优先排在首页上曝光<br><br>2.另一方面号召更多粉丝加入Groupy成为自己的会员，每天查看自己的最新动态，积累更多礼物和人气，让自己登顶人气榜<br><br>想要了解更多，马上加入Groupy申请成为爱豆，获得更多粉丝更多应援，实现自己的梦想吧！<br><br><a href="http://groupy.vip" target="_blank"> http://groupy.vip</a>
                            </p>
                            <h4 @click="tottleFloor(55)"><span></span>在Groupy发什么内容比较有趣受粉丝欢迎？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 55">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy首页的视频内容都是按照热度和粉丝的喜欢程度来排序的，越受欢迎的视频会优先展示给粉丝看到。要知道自己粉丝喜欢的内容可以通过几个方法实现：<br><br>1. 主动直接发起投票让粉丝选择想要看到的内容，吸引更多爱豆来应援自己，收货更多高级的铁杆粉丝。<br><br>2. 经过Groupy对粉丝的调研，发现粉丝会希望爱豆们定时更新自己的最新状态和行程以及能定时回复他们的留言，同步最近一些努力的成果，会让粉丝更加坚持地守护自己。<br><br>3.  首页上是根据发布时间，人气度，收获的礼物数量等经过编辑部筛选的精彩视频，可作参考<br><br>另外还可以经自己的更新内容分享至各大社交账号。只要内容被粉丝发现，就会被讨论，可以根据他们的意见来不断改进~希望爱豆可以早日发现有趣的内容，获得更多的应援，登上groupy的人气榜实现梦想！
                            </p>
                            <h4 @click="tottleFloor(66)"><span></span>加入Groupy以后我要如何获得粉丝?<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 66">
                                加入Groupy以后可以通过各种方法获得自己的粉丝：<br><br>1. 积极更新免费和付费内容，通过精彩的视频内容吸引Groupy的用户成为自己的粉丝，获得更多的人气，登顶人气榜（吸引更多新粉丝的非常非常有效的方法！）<br><br>2. 在自有的社交媒体Twitter和Facebook上宣传，让粉丝到Groupy关注和应援自己（最直接的方法！）<br><br>3. 在ameblo等博客网站发文吸引粉丝进驻（长期可积累更多忠实粉丝呢！）<br><br>4. Groupy会为每个进驻的爱豆在SNS上宣传以及在其他博客媒体告知粉丝的（Groupy会尽力为每位爱豆提高粉丝量的！）
                            </p>
                            <h4 @click="tottleFloor(77)"><span></span>如何通过Groupy迅速提高自己的知名度?<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 77">
                                您好，Groupy小助理很高兴能为您服务。<br><br>我们已经有很多爱豆在Groupy上经过自己的努力收获了大量粉丝，成为Groupy的明星爱豆，人气满满，希望你也能早日获得更高人气哦！现在为您分享一下如何通过Groupy迅速提高自己知名度的经验。<br><br>1. 一直一直一直强调也是最有效的方法就是：通过积极跟粉丝互动，了解他们的意愿，希望自己更新的内容种类和视频。积极发布能与粉丝互动性强的视频内容可以获得高价值的打赏和应援。不断收获粉丝的人气还可以竞争登上Groupy的每日人气榜，成为人气爱豆！<b>精彩视频还会通过Groupy官方编辑挑选发布到超过10亿用户的中国用户市场，包括宅男和粉丝最大的聚集地：微博，Bilibli，今日头条，微信公众号以及各大短视频相关的网站平台</b><br><br>2. 能够连续成为人气最高的爱豆，可以在极短的时间把Groupy的粉丝招揽成为自己的会员，支持和应援自己。<br><br>3. 每次在Groupy更新的免费内容都可以分享到社交媒体，借助Twitter，youtube和ameblo的社交力量，可以获得更多曝光，并且鼓励粉丝加入成为自己的会员可以迅速提高自己的知名度的！<br><br>以上是收集了明星爱豆的成长经验给大家分享，希望能够帮助爱豆们找到属于自己的舞台，达成自己的梦想！
                            </p>
                            <h4 @click="tottleFloor(88)"><span></span>我在Groupy上的钱怎么提现？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 88">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy是每月固定时间会按照合约条款的分成数目给个人爱豆结算打款。在爱豆加入的时候会提交自己的银行信息，Groupy的财务小组会及时给爱豆结算的。具体详情可以查看Groupy的爱豆专用App里面的结算详情。另外如果还有其他问题的话可以随时联系Groupy的工作人员哦<i>idol@groupy.vip</i>
                            </p>
                            <h4 @click="tottleFloor(99)"><span></span>我在Groupy获得了G币，怎么兑换成现金呢？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 99">
                                您好，Groupy小助理很高兴能为您解答。<br><br>Groupy给爱豆明确有一定的G币兑换规则， 受G币的汇率影响，每个月实时G币可兑换的实际日元可能会因为汇率波动而波动呢。具体细节可以在Groupy for idol的收入详情页查看相关说明！
                            </p>
                            <h4 @click="tottleFloor(100)"><span></span>我是个人偶像！如何加入Groupy？？<img :src="tottleImg" alt=""></h4>
                            <p v-show="isShow == 100">
                                您好，Groupy小助理很高兴能为您解答。<br><br>个人偶像可以通过自荐的方式加入Groupy的报名方式：<br>请将自我介绍、Twitter/SNS账号，30秒以内的短视频发送至groupyinc@gmail.com<br>详情还可以进入Groupy官网了解更多哦！期待您的加入，这里有众多粉丝在等你！<br><a href="http://groupy.vip" target="_blank">http://groupy.vip</a>
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
                height: 46px;
                line-height: 46px;
                border-bottom: 1px solid #e2e2e2;
                font-weight:500;
                img {
                    float: right;
                    margin-top: 17.5px;
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