<template>
    <div class="user-profile">
      <div class="user-avatar" v-if="userAvatar">
        <img :src="userAvatar" alt="User Avatar" />
      </div>
      <div class="user-details">
        <h2>{{ userName }}</h2>
  
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input type="text" v-model="userEmail" />
        </div>
  
        <div class="input-group">
          <i class="fas fa-map-marker-alt"></i>
          <input type="text" v-model="userAddress" />
        </div>
  
        <div class="input-group">
          <i class="fas fa-calendar-alt"></i>
          <input type="text" v-model="userDate" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const userAvatar = ref(null);
  const userName = ref(null);
  const userEmail = ref(null);
  const userAddress = ref(null);
  const userDate = ref(null);
  
  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/", {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        userAvatar.value = data.user.user_avatar;
        userName.value = data.user.user_name;
        userEmail.value = data.user.user_email;
        userAddress.value = data.user.user_address;
        userDate.value = data.user.date_created;
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };
  
  onMounted(() => {
    getUserData();
  });
  </script>
  
  <style scoped>
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  
  .user-avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  
  .user-details h2 {
    margin: 10px 0;
    font-size: 1.5em;
    color: #333;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
  }
  
  .input-group i {
    color: #888;
    margin-right: 8px;
    font-size: 1.2em;
  }
  
  .input-group input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    background-color: #f9f9f9;
    color: #333;
  }
  </style>
  