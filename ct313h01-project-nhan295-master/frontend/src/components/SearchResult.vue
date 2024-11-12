<template>
    <div class="list_container">
      <div v-for="(book, index) in listBooks" :key="index" class="list-item">
        <img :src="book.book_image" alt="Book Cover" class="book-cover" />
        <span>{{ book.book_title }}</span>
        <span>{{ book.book_price }}</span>
        <span>{{ book.book_discount }}</span>
      </div>
    </div>
</template> 

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useEmitter } from '../emits';

const listBooks = ref([]);
const { on } = useEmitter();

const searchBooks = async (searchText) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/book/search/${searchText}`);
    if (response.data.books) {
      listBooks.value = response.data.books;
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};
//lắng nghe sự kiện phát ra từ HomPage_Header và User_Page
on('search-query-updated', (searchQuery) => {
  if (searchQuery) {
    searchBooks(searchQuery);
  } else {
    listBooks.value = [];
  }
});

</script>

<style scoped>
.list_container {
  display: flex;
  gap: 12px; /* Allows wrapping if there are too many items to fit in one line */
  justify-content: center; /* Adds space between each item */
  padding-top: 90px;
}

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content; /* Adjust width as needed */
  text-align: center;
  border: 1px solid #ddd; /* Optional: adds a border around each item */
  border-radius: 8px; /* Optional: rounded corners */
  background-color: #f9f9f9; /* Optional: background color */
}

.book-cover {
  width: 100%; /* Makes the image width fill the container */
  height: auto;
  max-height: 200px; /* Optional: limits the height of the image */
  object-fit: cover;
  margin-bottom: 10px;
}

span {
  margin-top: 5px;
}
</style>