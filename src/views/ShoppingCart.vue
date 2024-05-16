<template>
  <div>
    <navbar-component title="Shopping Cart" />
    <footer-component />
  </div>
</template>
<script>
import FooterComponent from "../components/FooterComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";

export default {
  name: "ShoppingCart",
  components: {
    NavbarComponent: NavbarComponent,
    FooterComponent: FooterComponent,
  },
};
</script>
