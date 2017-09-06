<template>
  <div class="registered_page">
    <div class="pages_tips">ホーム&nbsp;&gt;&nbsp;<b>参加アイドルの情報登録</b></div>
    <div class="rules_desc">
      <h3>参加アイドルの情報登録</h3>
      <p class="rules_tips">Groupyは、アイドルがファンとより親密に交流して応援を貰えるアプリです。Groupy使用許諾契約書をご確認の上、口座情報などを登録しましょう。</p>
      <el-form label-width="130px" :rules="rules" :model="forms" ref="forms">
        <el-form-item label="金融機関名" prop="bank">
          <el-input placeholder="三菱東京UFJ銀行" v-model="forms.bank"></el-input>
        </el-form-item>
        <el-form-item label="支店名" prop="branch">
          <el-input placeholder="上野支店" v-model="forms.branch"></el-input>
        </el-form-item>
        <el-form-item label="預金種目" prop="type">
          <el-select v-model="forms.type">
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
        <el-form-item label="口座番号" prop="account">
          <el-input placeholder="1234567" type="number" v-model="forms.account"></el-input>
        </el-form-item>
        <el-form-item label="口座名義" prop="name">
          <el-input placeholder="一郎フリガナ：イチロウ" v-model="forms.name"></el-input>
        </el-form-item>
        <el-form-item label="フリガナ" prop="fullName">
          <el-input placeholder="" v-model="forms.fullName"></el-input>
        </el-form-item>
        <el-form-item label="所属会社名">
          <el-input placeholder="ありましたら入力お願いします" v-model="forms.Firm"></el-input>
        </el-form-item>
        <el-form-item label="ユニット名">
          <el-input placeholder="ありましたら入力お願いします" v-model="forms.group"></el-input>
        </el-form-item>
        <el-form-item label="電話番号" prop="phone">
          <el-input placeholder="" v-model="forms.phone"></el-input>
        </el-form-item>
        <el-form-item label="メールアドレス" prop="email">
          <el-input placeholder="" v-model="forms.email"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-input placeholder="" v-model="forms.address"></el-input>
        </el-form-item>
        <div class="privacy_rule">
          <h4>Groupyにおける換金に関する同意書</h4>
          <p>株式会社NewsJet（下記「当社」という）が運営するアプリ「Groupy for idol」において、換金について下記通りに定めます。</p>
          <h5>第１条（定　義）</h5>
          <p>
            （1）「当社アプリ」とは当社が開発・運営するアプリGroupyの配信版「Groupy for idol」をいいます。<br>
          　（2）「ユーザー」とは当社アプリに登録済み、動画、写真などのコンテンツの配信権力を持つユーザーをいいます。<br>
          　（3）「コイン」とはGroupy視聴版にて、入会、ギフティングなどに使用されるアプリ内の仮想通貨をいいます。
          </p>
          <h5>第2条（換金レートと支払い）</h5>
          <p>
            （1）換金レートは100コイン＝35円です。<br>
            （2）当社は前項換金レートに基づく各ユーザーの当月の所得分を翌月の25日までにユーザーが指定する金融機関の口座に振り込み支払うとする。ただし、未払額が2000円未満の場合は翌月以降へ繰越す。振込手数料は当社が負担するものとする。
          </p>
          <h5>第3条（秘密保持）</h5>
          <p>
            （1）本同意書の内容の一部または全てを第三者に開示することを禁じます。<br>
　          （2）当社はユーザーの金融口座や個人情報を換金以外に利用することは一切ございません。

          </p>
          <h5>第4条（解　約）</h5>
          <p>
            （1）解約及び情報の削除については、下記メールアドレスまでご連絡ください。<br>
　　　　      <i>wanted@groupy.cn</i>
          </p>
          <h5>第5条（管轄裁判所）</h5>
          <p>
            （1）本サービスに関連してユーザーと当社との間で問題が生じる場合には、ユーザーと当社で誠意を持って協議するものとします。<br>
　          （2）協議しても解決せず訴訟となった場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
          <h5>第6条（管轄裁判所）</h5>
          <p>（1）本同意書に関する準拠法は日本法とします。</p>
        </div>
        <div class="button_content" style="margin-bottom: 10px;"><img src="../../images/disagree.png"><span>Groupy使用許諾契約書に同意します。</span></div>
        <div class="button_content">
          <el-button type="primary">完  了</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        forms: {
          title: '',
          email: '',
          phone: '',
          bank: '',
          branch: '',
          account: '',
          name: '',
          fullName: '',
          type: 'ordinary',
          address: '',
          firm: '',
          group: ''
        },
        rules: {
          bank: [{ required: true, message: '金融機関名を入力してください', trigger: 'blur' }],
          branch: [{ required: true, message: '支店名を入力してください', trigger: 'blur' }],
          account: [{ required: true, message: '口座番号を入力してください', trigger: 'blur' }],
          name: [{ required: true, message: '口座名義を入力してください', trigger: 'blur' }],
          fullName: [{ required: true, message: 'フリガナを入力してください', trigger: 'blur' }],
          phone: [
            { required: true, message: '電話番号を入力してください', trigger: 'blur' },
            { type: 'number', message: '電話番号が正しく入力されていません', trigger: 'blur,change' }
          ],
          type: [
            { required: true, message: '預金種目を選択してください', trigger: 'change' }
          ],
          email: [
            { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
            { type: 'email', message: 'メールアドレスが正しく入力されていません', trigger: 'blur,change' }
          ]
        }
      }
    },
    created: function() {
      let self = this;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .registered_page {
    background: #f7f7f7;
    text-align: left;
    color: #666666;
    overflow: hidden;
  }
  .pages_tips {
    font-size: 16px;
    padding: 26px 30px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: left;
    border-bottom: 1px solid #D9D9D9;
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
      text-decoration: underline;
      font-size: 12px;
      cursor: pointer;
      color: #48576a;
    }
  }
  .rules_desc {
    padding: 30px;
    max-width: 500px;
    margin: 20px auto;
    background: #fafafa;
    box-shadow: 0 2px 4px 2px rgba(208, 208, 208,0.5);
    border-radius: 6px;
    h3 {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 5px;
    }
    .rules_tips {
      font-size: 12px;
      margin-bottom: 20px;
    }
  }
  .privacy_rule {
    max-height: 300px;
    overflow: auto;
    background: #fff;
    font-size: 12px;
    box-shadow: 0 0 4px 4px rgba(208, 208, 208,0.5);
    border-radius: 6px;
    margin-bottom: 10px;
    h4 {
      text-align: center;
      font-weight: 600;
    }
  }
</style>
