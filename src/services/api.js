const axios = require('axios');

async function getBooks(query) {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

module.exports = {
  getBooks
};
