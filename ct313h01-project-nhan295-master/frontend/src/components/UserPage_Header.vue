<template>
   <div class="main">
        <div class="header">
            <div class="header-nav">
                <div>
                    <ul class="nav">
                        <li><a href="#">Home</a></li>
                        <li><a href="#category">Category</a>
                                <ul class="sub_product">
                                    <li><a href="#romantic">Romantic</a></li>
                                    <li><a href="#adventure">Adventure</a></li>
                                    <li><a href="#economic">Economic</a></li>
                                </ul>
                        </li>
                        <li><a href="#cart">Cart</a></li>
                        <li><a href="#contact">About Us</a></li>                      
                    </ul>
                </div>
                
                <form @submit.prevent="emitSearchQuery">
                    <div class="topNav-search">
                        <i class="topNav-icon-search fa-solid fa-magnifying-glass"></i>
                        <input 
                            type="text" 
                            class="topNav-searchbar" 
                            placeholder="Find your book" 
                            v-model="searchQuery" 
                            @input="emitSearchQuery" />
                    </div>
                </form>

                <div>
                    <li  class="user" style="cursor: pointer;">
                        <a>
                            <img :src="userAvatar" alt="" class="user-img" />
                        </a>
                            
                        <ul class="subuser">
                            <li><a class="js-userInfor js-closeChangePass">
                                <router-link to="../UserInfo">User Information</router-link>
                            </a></li>
                            <li @click="logout()"><a href="#">Log Out</a></li>
                        </ul>
                    </li>
                </div>
                
            </div>
        </div>
    </div>

</template>  

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEmitter } from '../emits'; 

const userAvatar = ref("");
const router = useRouter();

const getUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/users/", {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      userAvatar.value = data.user.user_avatar;
    }
  } catch (error) {
    console.error('Failed to fetch user data', error);
  }
};

const logout = async () => {
  const response = await fetch("http://localhost:3000/api/v1/users/logout", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.ok) {
    router.push('/HomePage');
  }
};

// Call getUserData when component is mounted
onMounted(() => {
  getUserData();
});

const searchQuery = ref('');
const { emit } = useEmitter();

const emitSearchQuery = () => {
  emit('search-query-updated', searchQuery.value);
};
</script>

<style scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* common */
.text-white{
    color: #fff;
}

html {
    scroll-behavior: smooth;
    font-family: Arial, Helvetica, sans-serif;
}

.header{
    position: relative;
}

.header-nav{
    position: fixed;
    background-color: #000;
    height: 70px;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}

.nav > li {
    display: inline-block;
}

.nav li a {
    text-decoration: none;
    padding: 0 24px;
    line-height: 46px;
    display: block;
    color: #fff;
    font-size: 30px;
}

.sub_product li a {
    color: #000;
    line-height: 38px;
    text-align: right;
}


.nav li:hover > a {
    color: #000;
    background-color: #ccc;
}

.nav li:hover .sub_product{
    display: inline-block;
}



.user{
    float: right;
    padding-right: 20px;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;

}

.user a {
    text-decoration: none;
    padding: 0 24px;
    line-height: 46px;
    display: block;
    color: #fff;
    cursor: pointer;
    font-size: 30px;
}

.user a:hover {
    color: #000;
    background-color: #ccc;
}

.user img{
    float: inline-start;
    margin-top: 13px;
    margin-right: 8px;
}
.user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #fff;

}

.sub_product {
    display: none;
    min-width: 160px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: absolute;
    margin-right: 20px;
}

.sub_product li{
    color: #000;
    line-height: 38px;
    list-style-type: none;
    cursor: pointer;
}

.header-img img {
    width: 100%;
    height: auto;
    position: relative;
}

.content .content-section {
    width: 800px;
    max-width: 100%;
    padding: 64px 0;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
}

.section-heading{
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 4px;
}

.section-sub-heading{
    text-align: center;
    font-size: 15px;
    margin-top: 25px;
    padding-bottom: 16px;
    /* tạo kiểu cho chữ dùng font-style */
    font-style: italic; 
     /*opacity độ mờ  */
    opacity: 0.6;
}

.about-content{
    margin-top: 25px;
    font-size: 15px;
    /* text-align: justify; căn đều 2 bên */
    text-align: justify;
    line-height: 1.4;
}

.subuser li a {
    color: #000;
    line-height: 38px;
    text-align: right;
}

.subuser {
    display: none;
    min-width: 160px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: absolute;
    margin-right: 20px;
    right: 0;
}

.user:hover .subuser{
    display: inline-block;
}

.subuser li{
    color: #000;
    line-height: 38px;
    list-style-type: none;
    cursor: pointer;
}
/* Search Bar */
.topNav-search {
  background-color: #edeff4;
  height: 40px;
  border-radius: 2px;
  display: flex;
  align-items: center;
}

.topNav-search input {
  margin-right: 100%;
}

.topNav-icon-search {
  font-size: 18px;
  opacity: 0.52;
  font-weight: 700;
  display: flex;
  padding-left: 8px;
}

.topNav-searchbar {
  height: 100%;
  padding: 0 16px;
  outline: none;
  border: none;
  border-radius: 2px;
  font-size: 1.1rem;
  background-color: #edeff4;
}

</style>