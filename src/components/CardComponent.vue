<template>
  <div class="card p-3 mt-3">
    <img :src="imageUrl" alt="Card Image" class="img-thumbnail rounded" />
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <p>{{ truncatedDescription }}</p>
      <p>{{ formattedPrice }} {{ currencyCode }}</p>
      <button
        @click="addToCartFunc"
        v-if="!shoppingCart && cardDetail"
        type="button"
        class="btn btn-primary"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CardComponent",
  props: {
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    cardDetail: { type: Boolean, default: false },
    shoppingCart: { type: Boolean, default: false },
    price: { type: Object, default: () => {} },
  },
  data() {
    return {
      maxLengthBookDetail: 300,
      maxLength: 100,
    };
  },
  computed: {
    truncatedDescription() {
      const maxLength = this.cardDetail ? this.maxLengthBookDetail : this.maxLength;
      return this.description.length <= maxLength
        ? this.description
        : this.description.slice(0, maxLength) + "...";
    },
    formattedPrice() {
      return this.price && this.price.amount ? `${this.price.amount}` : "0";
    },
    currencyCode() {
      return this.price && this.price.currencyCode ? this.price.currencyCode : "";
    },
  },
  methods: {
    ...mapMutations(["addToCart"]),
    addToCartFunc() {
      const book = {
        id: this.id,
        title: this.title,
        price: this.price,
        description: this.description,
        imageUrl: this.imageUrl,
      };
      this.addToCart(book);
    },
  },
};
</script>
<style scoped>
img {
  max-width: 200px;
  height: auto;
}
</style>
