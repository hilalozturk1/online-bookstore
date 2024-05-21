<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <navbar-component :title="book.volumeInfo.title" />
      <div class="container">
        <div class="row col-md-6 m-auto col-12">
          <card-component
            v-if="book.volumeInfo"
            :title="book.volumeInfo.title"
            :description="book.volumeInfo.description"
            :imageUrl="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''"
            :cardDetail="true"
            :shoppingCart="false"
            :id="book.id"
            :price="book.saleInfo.listPrice"
          />
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { getBookDetails } from "../services/api";
import CardComponent from "../components/CardComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "BookDetail",
  components: {
    CardComponent: CardComponent,
    NavbarComponent: NavbarComponent,
    FooterComponent: FooterComponent,
  },
  data() {
    return {
      book: {},
      loading: true,
      maxTextLength: 100,
    };
  },
  created() {
    const bookId = this.$route.params.id;
    this.fetchBookDetails(bookId);
  },
  methods: {
    async fetchBookDetails(bookId) {
      try {
        const bookInfo = await getBookDetails(bookId);
        this.book = bookInfo;
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
