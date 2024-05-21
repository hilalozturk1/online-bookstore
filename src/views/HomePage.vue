<template>
  <div>
    <navbar-component title="Book Store" @search-books="fetchBooks" />
    <div v-if="loading">Loading...</div>
    <div class="container-fluid" v-else>
      <div class="row">
        <div
          v-for="(book, index) in books"
          :key="index"
          @click="goToBookDetail(book.id)"
          class="col-lg-3 col-12 col-sm-6 col-md-4 col-xxl-2 justify-content-center d-flex"
        >
          <card-component
            :title="book.volumeInfo.title"
            :description="book.volumeInfo.description"
            :imageUrl="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''"
            :cardDetail="false"
            :shoppingCart="false"
            :id="book.id"
            :price="book.saleInfo.listPrice"
            style="cursor: pointer"
          />
        </div>
      </div>
      <footer-component />
    </div>
  </div>
</template>

<script>
import FooterComponent from "../components/FooterComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import CardComponent from "../components/CardComponent.vue";

import { getBooks } from "../services/api";

export default {
  name: "HomePage",
  components: {
    NavbarComponent: NavbarComponent,
    FooterComponent: FooterComponent,
    CardComponent: CardComponent,
  },
  data() {
    return {
      books: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks(query = "javascript") {
      this.loading = true;
      this.books = [];
      try {
        const books = await getBooks(query);
        this.books = books;
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loading = false;
      }
    },
    async goToBookDetail(bookId) {
      this.$router.push({ name: "BookDetail", params: { id: bookId } });
    },
  },
};
</script>
