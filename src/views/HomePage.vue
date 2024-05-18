<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <navbar-component title="Book Store" />
      <div class="book-list">
        <div
          v-for="(book, index) in books"
          :key="index"
          class="book-card"
          @click="goToBookDetail(book.id)"
        >
          <card-component
            :title="book.volumeInfo.title"
            :description="truncateText(book.volumeInfo.description)"
            :imageUrl="book.volumeInfo.imageLinks.thumbnail"
            :cardDetail="false"
            :id="book.id"
            :price="book.saleInfo.listPrice"
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
      maxTextLength: 100,
      loading: true,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const books = await getBooks("javascript");
        this.books = books;
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loading = false;
      }
    },
    truncateText(text) {
      if (text.length <= this.maxTextLength) {
        return text + " ***";
      } else {
        return text.slice(0, this.maxTextLength) + "...";
      }
    },
    async goToBookDetail(bookId) {
      this.$router.push({ name: "BookDetail", params: { id: bookId } });
    },
  },
};
</script>

<style>
.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.book-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: calc(25% - 20px);
  box-sizing: border-box;
}

.book-card img {
  /*width: 100%;*/
  border-radius: 5px 5px 0 0;
}

.book-card .card-body {
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .book-card {
    width: 100%;
  }
}
</style>
