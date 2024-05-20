<template>
  <div :class="{ card: true, fullscreen: cardDetail }">
    <img :src="imageUrl" alt="Card Image" />
    <div class="card-body">
      <h2>{{ title }}</h2>
      <p>{{ truncatedDescription }}</p>
      <p>{{ formattedPrice }} {{ currencyCode }}</p>
      <button @click="addToCartFunc" v-if="!shoppingCart">Add to Cart</button>
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
      maxLengthBookDetail: 400,
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
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}

.fullscreen {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  @media only screen and (max-width: 450px) {
    width: 100%;
  }
}

.card img {
  /*width: 100%;*/
  border-radius: 5px 5px 0 0;
}

.card-body {
  text-align: center;
}
</style>
