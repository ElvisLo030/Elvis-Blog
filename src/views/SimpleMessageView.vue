<template>
  <div class="sm-container">
    <textarea 
      v-model="message" 
      class="sm-textarea" 
      placeholder=""
      spellcheck="false"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('(´▽｀)');
</script>

<style scoped>
.sm-container {
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.sm-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 15vmin;
  font-family: sans-serif;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
  display: block;
  padding-top: 35vh;
  transition: background-color 0.3s, color 0.3s;
}

.sm-textarea::-webkit-scrollbar {
  display: none;
}

@media (max-width: 768px) {
  .sm-textarea {
    padding-top: 30vh;
  }
}
</style>
