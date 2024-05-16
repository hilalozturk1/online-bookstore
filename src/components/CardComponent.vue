<template>
  <div :class="{ card: true, fullscreen: cardDetail }">
    <img :src="imageUrl" alt="Card Image" />
    <div class="card-body">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: String,
    description: String,
    imageUrl: String,
    cardDetail: Boolean,
  },
  methods: {
    addToCart() {
      console.log("Add to Cart button clicked");
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
