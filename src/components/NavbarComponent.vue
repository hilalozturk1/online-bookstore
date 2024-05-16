<template>
  <header>
    <h1>Online Bookstore</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/cart">Shopping Cart</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  name: "NavbarComponent",
  components: {},
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 10px;
  border-radius: 10px;
}

h1 {
  color: white;
  margin: 0;
}

nav {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
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
</style>