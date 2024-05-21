import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/index.css";

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import BootstrapVue3 from "bootstrap-vue-3";

createApp(App).use(router).use(store).use(BootstrapVue3).use(VueToast).mount("#app");
