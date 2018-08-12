import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import About from '@/components/About/About';
import Settings from '@/components/Settings/Settings';
import Editor from '@/components/Editor/Editor';
import ArticleView from '@/components/ArticleView/ArticleView';
import Faucet from '@/components/Faucet/Faucet';
import Search from '@/components/Search/Search';
import Profile from '@/components/Profile/Profile';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/about',
            name: 'About',
            component: About,
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
        },
        {
            path: '/editor',
            name: 'Editor',
            component: Editor,
        },
        {
            path: '/view/:address',
            name: 'ArticleView',
            component: ArticleView,
        },
        {
            path: '/faucet',
            name: 'Faucet',
            component: Faucet,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
        },
    ],
});
