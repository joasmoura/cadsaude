import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import api from './configs/api'
import VueAxios from 'vue-axios'

createApp(App)
    .use(store)
    .use(Vuex)
    .use(VueAxios, api)
    .mount('#app')
import 'bootstrap/dist/js/bootstrap.js'
