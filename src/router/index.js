import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Detail from '../views/Detail.vue';
import MyPokemon from '../views/MyPokemon.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
    },
    {
        path: '/mypokemon',
        name: 'MyPokemon',
        component: MyPokemon,
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;