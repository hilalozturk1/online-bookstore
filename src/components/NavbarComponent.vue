<template>
  <div class="">
    <nav class="navbar navbar-light bg-light p-4">
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              to="/"
              exact
              class="nav-link"
              active-class="active"
              exact-active-class="active"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/cart"
              class="nav-link"
              active-class="active"
              exact-active-class="active"
              >Shopping Cart</router-link
            >
          </li>
        </ul>
      </div>
      <form class="my-0">
        <div class="form-row d-flex justify-content-center">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-primary ms-2" type="submit">Search</button>
        </div>
      </form>
    </nav>
  </div>
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
.nav-link.active {
  color: #007bff;
}
</style>