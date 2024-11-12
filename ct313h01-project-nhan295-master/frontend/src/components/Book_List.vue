<template>
  <div class="body">
    <h2>{{ category }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="list_container">
        <div v-for="(book, index) in books" :key="index" class="list-item">
          <img :src="book.book_image" alt="Book Cover" class="book-cover" />
          <span>{{ book.book_title }}</span>
          <span>{{ book.book_price }}</span>
          <span>{{ book.book_discount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  category: String,
});

const books = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchBooks = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/book/${props.category}`);
    if (!response.ok) {
      throw new Error('Failed to load books');
    }
    const data = await response.json();
    books.value = data.message;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBooks);
watch(() => props.category, fetchBooks);

</script>

<style scoped>
.body{
  
}
.list_container {
  display: flex;
  gap: 12px; /* Allows wrapping if there are too many items to fit in one line */
  justify-content: center; /* Adds space between each item */
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
