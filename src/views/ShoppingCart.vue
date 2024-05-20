<template>
  <div>
    <navbar-component title="Shopping Cart" />
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="cart.length === 0">Your cart is empty.</div>
        <ul v-else>
          <li v-for="(item, index) in cartDetails" :key="index">
            {{ item.title }} - ${{ item.price }} x {{ item.quantity }}
            <card-component
              :title="item.title"
              :imageUrl="itemthumbnail"
              :cardDetail="false"
              :shoppingCart="true"
              :id="item.id"
              :price="item.price"
              :description="item.description"
            />
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
        <div v-if="cart.length > 0">
          <p>Total Price: ${{ totalPrice }}</p>
          <button @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from "../components/FooterComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import CardComponent from "../components/CardComponent.vue";

import { getBookDetails } from "../services/api";
import { mapState, mapMutations } from "vuex";

export default {
  name: "ShoppingCart",
  components: {
    NavbarComponent,
    FooterComponent,
    CardComponent,
  },
  data() {
    return {
      loading: true,
      cartDetails: [],
    };
  },
  computed: {
    ...mapState(["cart"]),
    totalPrice() {
      return this.cartDetails.reduce((total, item) => {
        return total + item.price.amount * item.quantity;
      }, 0);
    },
  },
  methods: {
    ...mapMutations(["removeFromCart", "clearCart"]),
    async fetchCartDetails() {
      this.loading = true;
      try {
        const details = await Promise.all(
          this.cart.map(async (item) => {
            console.log("card", this.cart);
            const bookDetails = await getBookDetails(item.id);
            return { ...item, ...bookDetails };
          })
        );
        this.cartDetails = details;
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        this.loading = false;
      }
    },
    checkout() {
      alert(`Total Price: $${this.totalPrice}.!`);
      this.clearCart();
      this.cartDetails = [];
    },
  },
  watch: {
    cart: {
      handler() {
        this.fetchCartDetails();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #ff0000;
}
</style>
