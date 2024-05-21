<template>
  <div>
    <navbar-component title="Shopping Cart" />
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="cart.length === 0">Your cart is empty.</div>
        <ul v-else>
          <li v-for="(item, index) in cartDetails" :key="index" class="">
            <div class="h5 mt-4">
              {{ item.title }} -
              {{
                formatPrice(
                  item.price && item.price?.amount ? item.price.amount : 0,
                  item.price && item.price?.currencyCode ? item.price.currencyCode : "TRY"
                )
              }}
              x
              {{ item.quantity }}
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button @click="removeFromCart(item.id)" type="button" class="btn btn-danger">
                Remove
              </button>
              <button
                @click="_incrementQuantity(item)"
                type="button"
                class="btn btn-secondary ms-2"
              >
                +
              </button>
              <button
                @click="_decrementQuantity(item)"
                type="button"
                class="btn btn-secondary ms-2"
              >
                -
              </button>
            </div>
            <card-component
              :title="item.title"
              :imageUrl="item.imageUrl"
              :cardDetail="false"
              :shoppingCart="true"
              :id="item.id"
              :price="item.price"
              :description="item.description"
            />
          </li>
        </ul>
        <div v-if="cart.length > 0">
          <p>Total Price: {{ formatPrice(totalPrice, "TRY") }}</p>
          <button @click="checkout" type="button" class="btn btn-link">Checkout</button>
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
import { formatPrice } from "@/utils/common";

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
        const price = item.price && item.price?.amount ? item.price.amount : 0;
        return total + price * item.quantity;
      }, 0);
    },
  },
  methods: {
    ...mapMutations(["removeFromCart", "clearCart", "incrementQuantity", "decrementQuantity"]),
    formatPrice,
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
    _incrementQuantity(item) {
      this.incrementQuantity(item.id);
      this.$toast.open({
        message: `Increased quantity of ${item.title} to ${item.quantity + 1}`,
        type: "success",
      });
    },
    _decrementQuantity(item) {
      this.decrementQuantity(item.id);
      if (item.quantity > 1) {
        this.$toast.open({
          message: `Decreased quantity of ${item.title} to ${item.quantity - 1}`,
          type: "info",
        });
      } else {
        this.$toast.open({
          message: `Removed ${item.title} from your cart`,
          type: "info",
        });
      }
    },
    checkout() {
      alert(`Total Price: ${formatPrice(this.totalPrice, "TRY")}.!`);
      this.clearCart();
      this.cartDetails = [];
    },
  },
  watch: {
    cart: {
      handler() {
        this.fetchCartDetails();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
