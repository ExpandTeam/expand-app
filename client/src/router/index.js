import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import About from '@/components/About/About';
import Settings from '@/components/Settings/Settings';
import Editor from '@/components/Editor/Editor';
import ArticleView from '@/components/ArticleView/ArticleView';
import Search from '@/components/Search/Search';

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
            path: '/search',
            name: 'Search Articles',
            component: Search,
        },
    ],
});
