const axios = require("axios");

async function getBooks(query) {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getBookDetails(bookId) {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

module.exports = {
  getBooks,
  getBookDetails,
};
