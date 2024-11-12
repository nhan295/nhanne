<template>
     
    <UserPage_Header />
    
    <SearchResult />
 
    <div id="romantic">
       
       <Book_List category="Romantic " />
    </div>
 
      <div id="adventure" style="padding-top: 30px;">
         
       <Book_List category="Adventure" />
      </div>
 
      <div id="economic" style="padding-top: 30px;">
         
       <Book_List category="Economic" />
      </div>
     
 </template>

<script setup>
import UserPage_Header from '@/components/UserPage_Header.vue';
import Book_List from '@/components/Book_List.vue';
import SearchResult from '@/components/SearchResult.vue';   
</script>

<style>
</style>