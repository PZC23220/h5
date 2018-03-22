
// 组件只有import之后才能使用
import index from './components/index.vue'
// import all from './components/all.vue'

const routes =
    [
        {
            path: '/',
            component: index,
        },{
            path: '/index',
            component: index,
        },
    ];
export default routes;
