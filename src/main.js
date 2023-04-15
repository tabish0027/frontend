import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import 'vue-material-design-icons/styles.css';

// import VueRouter from 'vue-router'
import LoginPage from './Views/LoginPage.vue'
import DashBoard from './Views/DashboardView.vue'

import 'vuetify/dist/vuetify.min.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import { VDataTableServer } from 'vuetify/labs/VDataTableServer'


import { createRouter, createWebHistory } from 'vue-router'
import {VDataTableServer} from "vuetify/lib/labs/VDataTable";

const routes=[
{ path:'/adminonboard/', component: LoginPage },
{ path:'/adminonboard/dashboard', component: DashBoard }
]

const router = createRouter({
   history: createWebHistory(),
   routes
})



// import router from './router/router.js'


const app = createApp(App)
app.use(router)
app.component('menu-icon', MenuIcon);
app.config.globalProperties.baseurl = 'https://appcore.dlivrd.io/';
// app.config.globalProperties.baseurl = 'http://127.0.0.1:8000/';
const vuetify = createVuetify({
   components: { ...components, VDataTableServer },
   directives,
})

app.use(vuetify)


// app.use(router)
app.mount('#app')
// createApp(App).mount('#app')
