export default[
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        type: 0,
        meta: {title: "登录"},
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/404',
        name: '404',
        type: 0,
        meta: {title: "404"},
        component: () => import("@/views/404.vue"),
    },
    {
        path: '/500',
        name: '500',
        type: 0,
        meta: {title: "500"},
        component: () => import("@/views/500.vue"),
    },
]