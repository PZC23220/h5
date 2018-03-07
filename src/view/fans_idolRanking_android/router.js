/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import index from './components/index.vue'
import all from './components/all.vue'

const routes =
    [
        {
            path: '/',
            component: all,
        },{
            path: '/all',
            component: all,
        },{
            path: '/index',
            component: index,
        },
    ];
export default routes;
