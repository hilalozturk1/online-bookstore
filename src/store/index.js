import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, book) {
      const existingItem = state.cart.find(item => item.id === book.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...book, quantity: 1 });
      }
    },
    removeFromCart(state, bookId) {
      state.cart = state.cart.filter(item => item.id !== bookId);
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {},
  modules: {}
});
