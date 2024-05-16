<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      Book Detail
      <card-component
        v-if="book.volumeInfo"
        :title="book.volumeInfo.title"
        :description="truncateText(book.volumeInfo.description)"
        :imageUrl="book.volumeInfo.imageLinks.thumbnail"
        :cardDetail="true"
      />
    </div>
  </div>
</template>

<script>
import { getBookDetails } from "../services/api";
import CardComponent from "../components/CardComponent.vue";

export default {
  name: "BookDetail",
  components: { CardComponent: CardComponent },
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
    truncateText(text) {
      if (text.length <= this.maxTextLength) {
        return text + " ***";
      } else {
        return text.slice(0, this.maxTextLength) + "...";
      }
    },
  },
};
</script>
