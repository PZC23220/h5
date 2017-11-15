/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import PrivacyPolicy_chinese from './components/PrivacyPolicy_chinese.vue'
import purchaseInstructions_chinese from './components/purchaseInstructions_chinese.vue'
import purchaseInstructions from './components/purchaseInstructions.vue'
import copyright_chinese from './components/copyright_chinese.vue'
import copyright from './components/copyright.vue'
import ExchangeAndWithdrawals_chinese from './components/ExchangeAndWithdrawals_chinese.vue'
import ExchangeAndWithdrawals from './components/ExchangeAndWithdrawals.vue'
import idolApply_chinese from './components/idolApply_chinese.vue'
import idolApply from './components/idolApply.vue'
import rule_chinese from './components/rule_chinese.vue'
import rule from './components/rule.vue'
import fans_rule from './components/fans_rule.vue'
import fans_rule_chinese from './components/fans_rule_chinese.vue'

let Terminal = {
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
let indexLanguage = {};

// 还可以通过language，区分开多国语言版

if(Terminal.language == 'zh-cn') {
    indexLanguage.copyright = '/copyright_chinese';
    indexLanguage.ExchangeAndWithdrawals = '/ExchangeAndWithdrawals_chinese';
    indexLanguage.idolApply = '/idolApply_chinese';
    indexLanguage.rule = '/rule_chinese';
    indexLanguage.purchaseInstructions = '/purchaseInstructions_chinese';
    indexLanguage.fans_rule = '/fans_rule_chinese';
    indexLanguage.PrivacyPolicy = '/PrivacyPolicy_chinese';
} else {
    indexLanguage.copyright = '/copyright_japanese';
    indexLanguage.ExchangeAndWithdrawals = '/ExchangeAndWithdrawals_japanese';
    indexLanguage.idolApply = '/idolApply_japanese';
    indexLanguage.rule = '/rule_japanese';
    indexLanguage.purchaseInstructions = '/purchaseInstructions_japanese';
    indexLanguage.fans_rule = '/fans_rule';
    indexLanguage.PrivacyPolicy = '/PrivacyPolicy';
}

const routes =
    [
        {
            path: '/',
            redirect: indexLanguage.PrivacyPolicy,
        },{
            path: '/PrivacyPolicy',
            redirect: indexLanguage.PrivacyPolicy,
        },{
            path: '/PrivacyPolicy',
            component: PrivacyPolicy,
        },{
            path: '/PrivacyPolicy_chinese',
            component: PrivacyPolicy_chinese,
        },{
            path: '/purchaseInstructions',
            redirect: indexLanguage.purchaseInstructions   
        },{
            path: '/purchaseInstructions_japanese',
            component: purchaseInstructions   
        },{
            path: '/purchaseInstructions_chinese',
            component: purchaseInstructions_chinese   
        },{
            path: '/copyright',
            redirect: indexLanguage.copyright
        },{
            path: '/copyright_chinese',
            component: copyright_chinese
        },{
            path: '/copyright_japanese',
            component: copyright
        },{
            path: '/ExchangeAndWithdrawals',
            redirect: indexLanguage.ExchangeAndWithdrawals
        },{
            path: '/ExchangeAndWithdrawals_japanese',
            component: ExchangeAndWithdrawals
        },{
            path: '/ExchangeAndWithdrawals_chinese',
            component: ExchangeAndWithdrawals_chinese
        },{
            path: '/idolApply',
            redirect: indexLanguage.idolApply
        },{
            path: '/idolApply_japanese',
            component: idolApply
        },{
            path: '/idolApply_chinese',
            component: idolApply_chinese
        },{
            path: '/rule',
            redirect: indexLanguage.rule
        },{
            path: '/rule_japanese',
            component: rule
        },{
            path: '/rule_chinese',
            component: rule_chinese
        },{
            path: '/fans_rule',
            redirect: indexLanguage.fans_rule
        },{
            path: '/fans_rule',
            component: fans_rule
        },{
            path: '/fans_rule_chinese',
            component: fans_rule_chinese
        }
    ];
export default routes;
