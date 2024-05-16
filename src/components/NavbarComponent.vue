<template>
  <header>
    <header-title>{{ title }}</header-title>
    <nav>
      <router-link to="/" exact>Home</router-link>
      <router-link to="/cart">Shopping Cart</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  name: "NavbarComponent",
  components: {},
  props: {
    title: String,
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 10px;
  border-radius: 10px;
}

header-title {
  color: white;
  margin: 0;
  font-size: 24px;
}

nav {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 8px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 10px;
}

@media only screen and (max-width: 600px) {
  nav {
    flex-direction: column;
  }

  nav a {
    margin-left: 0;
    margin-top: 5px;
  }
}
.router-link-active {
  padding: 0 5px;
  border: 0.5px solid white;
  border-radius: 15px;
}
</style>
