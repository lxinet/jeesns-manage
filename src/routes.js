import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import configEdit from './views/config/edit.vue'
import actionLogList from './views/action/actionLogList.vue'
import memberActionLog from './views/action/memberActionLog.vue'
import actionList from './views/action/list.vue'
import scoreRuleList from './views/scoreRule/list.vue'
import cmsArticleCate from './views/cms/articleCate.vue'
import cmsArticle from './views/cms/article.vue'
import Member from './views/member/list.vue'
import MemberManager from './views/member/managerList.vue'
import Weibo from './views/weibo/list.vue'
import Group from './views/group/list.vue'



let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '主页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-cog',//图标样式class
        children: [
            { path: '/configEdit', component: configEdit, name: '系统设置' },
            { path: '/scoreRuleList', component: scoreRuleList, name: '积分规则' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '动态管理',
        iconCls: 'fa fa-compass',//图标样式class
        children: [
            { path: '/actionList', component: actionList, name: '动态类型' },
            { path: '/actionLogList', component: actionLogList, name: '会员日志' },
            { path: '/memberActionLog', component: memberActionLog, name: '会员动态' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '文章管理',
        iconCls: 'fa fa-book',
        children: [
            { path: '/cms/articleCate', component: cmsArticleCate, name: '栏目管理' },
            { path: '/cms/article', component: cmsArticle, name: '文章管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '会员管理',
        iconCls: 'fa fa-user-circle',
        children: [
            { path: '/member/list', component: Member, name: '会员管理' },
            { path: '/member/managers', component: MemberManager, name: '管理员' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '微博管理',
        iconCls: 'fa fa-weibo',
        children: [
            { path: '/weibo/list', component: Weibo, name: '微博管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '群组管理',
        iconCls: 'fa fa-group',
        children: [
            { path: '/group/list', component: Group, name: '群组管理' }
        ]
    }
];

export default routes;