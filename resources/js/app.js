import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'


Vue.use(VueRouter);
Vue.use(Vuetify)


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import NotFound from "./components/NotFound";
import App from "./components/App";
import Home from "./components/Home"
import Login from "./components/Login";
import Test from "./components/Test"

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "defaultHome",
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/test",
            name: "test",
            component: Test
        },
        {
            path: "*",
            name: "NotFound",
            component: NotFound
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
     }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (localStorage.getItem("_token") == null) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // make sure to always call next()!
      }
  });

window.axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {

    location.href="/login"
   }

   return Promise.reject(error.response);
 });


const app = new Vue({
    el: '#app',
    components: { 
        App
     },
     router,
    vuetify: new Vuetify()
});
