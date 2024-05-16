<template>
  <div><navbar-component /><footer-component /></div>
</template>

<script>
import FooterComponent from "../components/FooterComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";

export default {
  name: "HomePage",
  components: { NavbarComponent: NavbarComponent, FooterComponent: FooterComponent },
  data() {
    return {
      books: [],
    };
  },
};
</script>
