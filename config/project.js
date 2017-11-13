"use strict"
// 在WebPack相关代码中使用ES6语法必须添加"use strict"前缀
// 扩展配置说明
// 获取项目版本号，用以生成目录
let fs = require("fs")
let name = 'groupy' // 项目名，提取出来以方便dev环境使用，否则会出现undefined = =
let vcs_type = '' // 设定版本控制工具，用于自动获取版本号，默认是0.0.1
let version = ''
if (vcs_type == 'git') {
    // git项目获取版本号
    version = fs.readdirSync('./.git/refs/tags').pop().trim()// 获取版本库最新tag值
} else {
    if (vcs_type == 'hg') {
        // hg项目获取版本号
        let tag_content = fs.readFileSync("./.hgtags", 'utf8') // 获取hgtags的内容
        version = tag_content.trim().split(' ').pop() // 直接trim后取最后一行，以空格分隔获取最新版本号
    } else {
        version = ''
    }
}
module.exports = {
    // 方便当出现多项目、多页面需求时的进一步扩展。不能与其他项目重名
    name: name, // 项目名：groupy。
    version: version, // 版本号，据此生成map.json与项目目录
    static_root: '',// 静态资源路径(线上的assets,html,js文件夹所在路径)
    project: {
        // 项目列表
        // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
        // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
        fans_idolRanking: './src/view/fans_idolRanking',
        fans_idolRanking_android: './src/view/fans_idolRanking_android',
        fans_videoComment: './src/view/fans_videoComment',
        fans_fansRanking: './src/view/fans_fansRanking',
        fans_medal: './src/view/fans_medal',
        fans_level: './src/view/fans_level',
        rules: './src/view/rules',
        idol_activity: './src/view/idol_activity',
        idol_attendance: './src/view/idol_attendance',
        idol_fansDetail: './src/view/idol_fansDetail',
        idol_incomeDetail: './src/view/idol_incomeDetail',
        idol_messageBoard: './src/view/idol_messageBoard',
        idol_noviceTask: './src/view/idol_noviceTask',
        idol_ranking: './src/view/idol_ranking',
        idol_videoDetail: './src/view/idol_videoDetail',
        shows_detail: './src/view/shows_detail',
        login: './src/view/login',
        feedback: './src/view/feedback',
        idol_videoDetail_2: './src/view/idol_videoDetail_2',
        activity_recharge: './src/view/activity_recharge',
        fans_activity: './src/view/fans_activity',
        fans_attention: './src/view/fans_attention',
        fans_protector: './src/view/fans_protector',
        idol_attention_fansDetail: './src/view/idol_attention_fansDetail',
    },
};
