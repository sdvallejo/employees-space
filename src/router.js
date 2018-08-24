import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import store from './store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        if (store.state.user) {
          next();
        } else {
          store
            .dispatch('initUser')
            .then(next)
            .catch(() => {
              next('/login');
            });
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      beforeEnter(to, from, next) {
        if (store.state.user) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import(/* webpackChunkName: "about" */ './views/Post.vue'),
      beforeEnter(to, from, next) {
        if (store.state.user) {
          next();
        } else {
          store
            .dispatch('initUser')
            .then(next)
            .catch(() => {
              next('/login');
            });
        }
      },
    },
  ],
});
