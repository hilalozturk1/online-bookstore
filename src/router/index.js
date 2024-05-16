import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import BookDetail from "../views/BookDetail.vue";
import ShoppingCart from "../views/ShoppingCart.vue";

const routes = [
  { path: "/", component: HomePage },
  {
    path: "/book/:id",
    name: "BookDetail",
    component: BookDetail,
    props: true,
  },
  { path: "/cart", component: ShoppingCart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
