<template>
  <div class="registered_page">
    <!-- <div class="pages_tips">ホーム&nbsp;&gt;&nbsp;<b>参加アイドルの情報登録</b></div> -->
    <div class="rules_desc" v-if="canEdit">
      <h3>参加アイドルの情報登録</h3>
      <p class="rules_tips">Groupyで稼いだコインは換金できますので、『Groupyにおける換金に関する同意書』をご確認の上、金融機関情報をご登録ください。</p>
      <el-form label-width="130px" :rules="rules" :model="forms" ref="forms">
        <!-- <p class="forms_tips">弊社から報酬を振り込むことができるように、ご本人名義の口座情報を正しく入力してください。</p> -->
        <el-form-item label="金融機関名" prop="bank">
          <el-input placeholder="三菱東京UFJ銀行" v-model="forms.bank"></el-input>
        </el-form-item>
        <el-form-item label="支店名" prop="branch">
          <el-input placeholder="上野支店" v-model="forms.branch"></el-input>
        </el-form-item>
        <el-form-item label="預金種目" prop="depositType">
          <el-select v-model="forms.depositType">
            <el-option
              key="ordinary"
              label="普通"
              value="ordinary">
            </el-option>
            <el-option
              key="current"
              label="当座"
              value="current">
            </el-option>
            <el-option
              key="savings"
              label="貯蓄"
              value="savings">
            </el-option>
            <el-option
              key="others"
              label="その他"
              value="others">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="口座番号" prop="accountNumber">
          <el-input placeholder="1234567" type="number" v-model="forms.accountNumber"></el-input>
        </el-form-item>
        <el-form-item label="口座名義" prop="accountName">
          <el-input placeholder="一郎フリガナ：イチロウ" v-model="forms.accountName"></el-input>
        </el-form-item>
        <el-form-item label="フリガナ" prop="accountNameHurigana">
          <el-input placeholder="" v-model="forms.accountNameHurigana"></el-input>
        </el-form-item>
        <el-form-item label="所属会社名">
          <el-input placeholder="ありましたら入力お願いします" v-model="forms.agentName"></el-input>
        </el-form-item>
        <el-form-item label="ユニット名">
          <el-input placeholder="ありましたら入力お願いします" v-model="forms.organization"></el-input>
        </el-form-item>
        <el-form-item label="電話番号" prop="telephone">
          <el-input placeholder="" v-model="forms.telephone"></el-input>
        </el-form-item>
        <el-form-item label="メールアドレス" prop="email">
          <el-input placeholder="" v-model="forms.email"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-input placeholder="" v-model="forms.city"></el-input>
        </el-form-item>
        <div class="privacy_rule">
          <h4>Groupyにおける換金に関する同意書</h4>
          <p style="padding-left: 0;text-indent: 12px;">株式会社NewsJet（下記「当社」という）が運営するアプリ「Groupy for idol」において、換金について下記通りに定めます。</p>
          <h5>第１条（定　義）</h5>
          <p>
            （1）「当社アプリ」とは当社が開発・運営するアプリGroupyの配信版「Groupy for idol」をいいます。<br>（2）「ユーザー」とは当社アプリに登録済み、動画、写真などのコンテンツの配信権力を持つユーザーをいいます。<br>（3）「コイン」とはGroupy視聴版にて、入会、ギフティングなどに使用されるアプリ内の仮想通貨をいいます。
          </p>
          <h5>第2条（換金レートと支払い）</h5>
          <p>
            （1）換金レートは100コイン＝35円です。<br>（2）当社は前項換金レートに基づく各ユーザーの当月の所得分を翌月の25日までにユーザーが指定する金融機関の口座に振り込み支払うとする。ただし、未払額が2000円未満の場合は翌月以降へ繰越す。振込手数料は当社が負担するものとする。
          </p>
          <h5>第3条（秘密保持）</h5>
          <p>
            （1）本同意書の内容の一部または全てを第三者に開示することを禁じます。<br>（2）当社はユーザーの金融口座や個人情報を換金以外に利用することは一切ございません。

          </p>
          <h5>第4条（解　約）</h5>
          <p>
            （1）解約及び情報の削除については、下記メールアドレスまでご連絡ください。<br><i>wanted@groupy.cn</i>
          </p>
          <h5>第5条（管轄裁判所）</h5>
          <p>
            （1）本サービスに関連してユーザーと当社との間で問題が生じる場合には、ユーザーと当社で誠意を持って協議するものとします。<br>（2）協議しても解決せず訴訟となった場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
          <h5>第6条（管轄裁判所）</h5>
          <p>（1）本同意書に関する準拠法は日本法とします。</p>
        </div>
        <!-- <p class="forms_tips">弊社は、ご登録いただいた口座情報などを秘密に保持し、契約書の範囲内で取り扱わせるものとします。</p> -->
        <div class="protocol_content">
          <div class="button_content" style="margin-bottom: 20px;"><img :src="protocol_img" @click="change_protocol()"><span :class="{error: !protocol}">『Groupyにおける換金に関する同意書』に同意する</span></div>
        </div>
        <div class="button_content">
          <el-button type="primary" size="large" class="submit" @click="submitForm('forms')">完&nbsp;&nbsp;&nbsp;&nbsp;了</el-button>
        </div>
      </el-form>
    </div>
    <div class="rules_desc" v-if="canEdit == false">
      <h3>登録した金融機関情報</h3>
      <el-form label-width="130px" :model="forms" ref="forms">
        <!-- <p class="forms_tips">弊社から報酬を振り込むことができるように、ご本人名義の口座情報を正しく入力してください。</p> -->
        <el-form-item label="金融機関名">
          <el-input placeholder="三菱東京UFJ銀行" v-model="forms.bank" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="支店名">
          <el-input placeholder="上野支店" v-model="forms.branch" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="預金種目">
          <el-select v-model="forms.depositType" :disabled="true">
            <el-option
              key="ordinary"
              label="普通"
              value="ordinary">
            </el-option>
            <el-option
              key="current"
              label="当座"
              value="current">
            </el-option>
            <el-option
              key="savings"
              label="貯蓄"
              value="savings">
            </el-option>
            <el-option
              key="others"
              label="その他"
              value="others">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="口座番号">
          <el-input placeholder="1234567" type="number" min="0" :disabled="true" v-model="forms.accountNumber"></el-input>
        </el-form-item>
        <el-form-item label="口座名義">
          <el-input placeholder="一郎フリガナ：イチロウ" :disabled="true" v-model="forms.accountName"></el-input>
        </el-form-item>
        <el-form-item label="フリガナ">
          <el-input placeholder="" :disabled="true" v-model="forms.accountNameHurigana"></el-input>
        </el-form-item>
        <el-form-item label="所属会社名">
          <el-input placeholder="ありましたら入力お願いします" :disabled="true" v-model="forms.agentName"></el-input>
        </el-form-item>
        <el-form-item label="ユニット名">
          <el-input placeholder="ありましたら入力お願いします" :disabled="true" v-model="forms.organization"></el-input>
        </el-form-item>
        <el-form-item label="電話番号">
          <el-input placeholder="" :disabled="true" v-model="forms.telephone"></el-input>
        </el-form-item>
        <el-form-item label="メールアドレス">
          <el-input placeholder="" :disabled="true" v-model="forms.email"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-input placeholder="" :disabled="true" v-model="forms.city"></el-input>
        </el-form-item>
        <div class="button_content">
          <el-button type="primary" size="large" class="submit" @click="canEdit = true">編&nbsp;&nbsp;&nbsp;&nbsp;集</el-button>
        </div>
      </el-form>
    </div>
    <div class="login_sns" v-if="Havedlogin">
      <div class="login_content">
        <div class="login_tips">ログイン</div>
        <div class="api_login" @click="twitterLogin()"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/login/icon_twitter.png"><span>Twitterでログイン</span></div>
        <div class="api_login facebook" @click="facebookLogin()"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/login/icon_facebook.png"><span>Facebookでログイン</span></div>
      </div>
      <div class="loading" v-if="loading">
        <i class="el-icon-loading"></i>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny">
      <span>{{successTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import http from '../../js/http.js'
  export default {
    data() {
      return {
        forms: {
          email: '',
          telephone: '',
          bank: '',
          branch: '',
          accountNumber: '',
          accountName: '',
          accountNameHurigana: '',
          depositType: 'ordinary',
          city: '',
          agentName: '',
          organization: '',
        },
        rules: {
          bank: [{ required: true, message: '金融機関名を入力してください', trigger: 'blur' }],
          branch: [{ required: true, message: '支店名を入力してください', trigger: 'blur' }],
          accountNumber: [{ required: true, message: '口座番号を入力してください' }],
          accountName: [{ required: true, message: '口座名義を入力してください', trigger: 'blur' }],
          accountNameHurigana: [{ required: true, message: 'フリガナを入力してください', trigger: 'blur' }],
          telephone: [{ required: true, message: '電話番号が正しく入力されていません', trigger: 'blur' }],
          depositType: [
            { required: true, message: '預金種目を選択してください', trigger: 'change' }
          ],
          email: [
            { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
            { type: 'email', message: 'メールアドレスが正しく入力されていません', trigger: 'blur,change' }
          ]
        },
        protocol_img: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/agree/agree.png',
        protocol: true,
        Havedlogin: true,
        dialogVisible: false,
        tokens: '',
        successTips: 'アイドル登録していないアカウントです',
        canEdit: true,
        loading: false
      }
    },
    methods: {
      change_protocol() {
          this.protocol = !this.protocol;
          if(this.protocol == true) {
              this.protocol_img= 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/agree/agree.png'
          }else {
              this.protocol_img= 'http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/agree/disagree.png'
          }
      },
      facebookLogin() {
        var self= this;
        self.loading = true;
        window.fbAsyncInit = function() {
            FB.init({
              appId            : '310622289379360',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v2.10'
            });
            // FB.AppEvents.logPageView();
            FB.getLoginStatus(function(response) {
              console.log(response)
            if (response.status === 'connected' || response.status === 'not_authorized') {
              console.log(response);
              FB.api('/me', {fields: 'name'}, function(response) {
                self.login(response.id,'fb');
              });
            } else {
              FB.login(function(response) {
                FB.api('/me', {fields: 'name'}, function(response) {
                    console.log(response);
                    // var obj = {
                    //     snsUid:response.id,
                    //     snsPlatform:'fb',
                    //     nickname:response.name,
                    //     avatar:'https://graph.facebook.com/'+ response.id +'/picture?type=large', 
                    //     sign:'',
                    //     introduce:''
                    // };
                    self.login(response.id,'fb');
                });
              }, {scope: 'public_profile'});
            }
          });
        };
        (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "http://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      },
      twitterLogin() {
        var self = this;
        self.loading = true;
        console.log(self.loading);
        window.twttr = (function(d, s, id) {
             var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
              if (d.getElementById(id)) return t;
              js = d.createElement(s);
              js.id = id;
              js.src = "https://platform.twitter.com/widgets.js";
              fjs.parentNode.insertBefore(js, fjs);

              t._e = [];
              t.ready = function(f) {
                  t._e.push(f);
              };
              return t;
        }(document, "script", "twitter-wjs"));
        var log = console.log;
        hello.init({'twitter': 'LE49JopVjaqLB3xtzOQdQtP3n'},{
          oauth_proxy: 'https://auth-server.herokuapp.com/proxy' 
        });
        function login_twitter(network){  //登录方法，并将twitter 作为参数传入
              // Twitter instance
              var twitter = hello(network);
              // Login
              twitter.login().then(function(r){
                  // Get Profile
                  return twitter.api('/me');
              },log).then(function(p){
                console.log(p)
                self.login(p.id,'tw');
              }, log );
        }
        login_twitter('twitter');
      },
      login(snsid,pf) {
        var self = this;
        http.post('/groupyuser/loginThirdpart?tokenize=true&snsid='+ snsid + '&snspf=' + pf).then(function(res){
            if(res.status == 200) {
                self.tokens = res.data.accessToken;
                self.getInfo();
                console.log(self.tokens);
            }
        }).catch(function(err){
            self.loading = false;
            self.$message.error(err.data.errorMsg);
            setTimeout(function(){
              location.href = location.href;
            },1000)
            
        });
      },
      submitForm(formName) {
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid && self.protocol) {
            http.defaults.headers.common['Authorization'] = 'Token '+ self.tokens;
            http.post('/groupyuser/applyIdolBanking',JSON.stringify(self.forms)).then(function(res){
              if(res.status == 200) {
                self.successTips = 'アイドル登録していないアカウントです';
                self.dialogVisible = true;
                self.canEdit = false;
              }else {
                // self.dialogVisible = true;
                // self.successTips = "录入信息失败！"
                self.$message.error('エラーが発生しましたしばらくしてからもう一度お試しください');
              }
              console.log(res);
            }).catch(function(err){
              console.log(err);
              self.$message.error('エラーが発生しましたしばらくしてからもう一度お試しください');
              // self.dialogVisible = true;
              // self.successTips = err.data.errorMsg;
            });
          } else {
            return false;
          }
        });
      },
      getInfo() {
        var self = this;
        http.defaults.headers.common['Authorization'] = 'Token '+ self.tokens;
          http.get('/groupyuser/idolBanking').then(function(res){
            console.log(res);
            self.loading = false;
            self.Havedlogin = false;
            if(res.status == 200) {
              if(res.data.id) {
                self.forms = res.data;
                self.canEdit = false;
              }
            }else {
              self.$message.error(res.errorMsg);
            }
          }).catch(function(err){
            self.loading = false;
            console.log(err);
            self.$message.error(err.data.errorMsg);
            // self.dialogVisible = true;
            // self.successTips = err.data.errorMsg;
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
  .el-input.is-disabled .el-input__inner {
    color: #666 !important;
  }
</style>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .registered_page {
    background: #f7f7f7;
    text-align: left;
    color: #666666;
    height: 100vh;
    overflow: auto;
  }
  .protocol_error {
    left: 70%;
    top: 4px;
  }
  .forms_tips {
    font-size: 10px;
    color: #ff4949;
    -webkit-transform: scale(0.8);

  }
  .el-select {
    width: 100% !important;
  }
  .button_content {
    text-align: center;
    img {
      width: 15px;
      margin-right: 5px;
      vertical-align: middle;
      cursor: pointer;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      cursor: pointer;
      color: #48576a;
    }
    span.error {
      color: #ff4949;
    }
    .submit {
      width: 250px;
      height: 50px;
      background: #FC4083;
      border-color: #FC4083;
      font-size: 18px;
    }
  }
  .rules_desc {
    padding: 30px 100px;
    max-width: 600px;
    margin: 40px auto;
    background: #fafafa;
    box-shadow: 0 2px 4px 2px rgba(208, 208, 208,0.5);
    border-radius: 6px;
    h3 {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }
    .rules_tips {
      font-size: 12px;
      margin-bottom: 20px;
    }
  }
  .protocol_content {
    position: relative;
  }
  .privacy_rule {
    max-height: 250px;
    overflow: auto;
    background: #fff;
    font-size: 12px;
    // box-shadow: 0 0 4px 4px rgba(208, 208, 208,0.5);
    border: 1px solid #bfcbd9;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 12px;
    h4 {
      text-align: center;
      font-weight: 600;
      font-size: 13px;
      padding-bottom: 5px;

    }
    h5 {
      font-weight: 600;
      padding: 3px 0;
    }
    p {
      padding-left: 12px;
    }
  }
  .login_sns {
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    background: rgba(0,0,0,0.8);
    .login_content {
      background: #fafafa;
      position: absolute;
      left: 50%;top: 50%;
      margin-top: -120px;
      margin-left: -201px;
      border-radius: 6px;
      border: 1px solid #eee;
      padding-top: 20px;
      padding-bottom: 40px;
      .login_tips {
        padding-bottom: 20px;
        padding-left: 20px;
        font-size: 18px;
      }
      .api_login {
        height: 30px;
        line-height: 30px;
        background: #009ef4;
        padding: 12px 0 13px;
        border-radius: 39px;
        margin: 0 50px;
        color: #fff;
        font-size: 18px;
        font-weight: 300;
        text-align: center;
        width: 300px;
        cursor: pointer;
        img {
          height: 35px;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .facebook {
          background: #33589d;
          margin-top: 20px;
      }
    }
    .loading {
      position: absolute;
      left: 50%;top: 50%;
      margin-top: -120px;
      margin-left: -201px;
      background: #fafafa;
      width: 402px;height: 239px;
      box-sizing: border-box;
      padding-top: 80px;
      padding-left: 176px;
      border-radius: 6px;
      i {
        font-size: 50px;
      }
    }
  }
</style>
