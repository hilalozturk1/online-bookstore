import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, book) {
      const existingItem = state.cart.find((item) => item.id === book.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...book, quantity: 1 });
      }
    },
    removeFromCart(state, bookId) {
      state.cart = state.cart.filter((item) => item.id !== bookId);
    },
    incrementQuantity(state, bookId) {
      const item = state.cart.find(i => i.id === bookId);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity(state, bookId) {
      const item = state.cart.find(i => i.id === bookId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter(i => i.id !== bookId);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  getters: {
    getCartItemQuantity: (state) => (id) => {
      const item = state.cart.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
  },
  actions: {},
  modules: {},
});
