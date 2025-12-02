<template>
  <div class="sm-container">
    <textarea 
      v-model="message" 
      class="sm-textarea" 
      placeholder="在此輸入文字..."
      spellcheck="false"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('ʕ •ᴥ•ʔ');
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
  font-size: 3rem;
  font-family: sans-serif;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
  display: block;
  /* 讓文字垂直置中有些困難，使用 padding-top 簡單模擬，或者讓使用者自由輸入 */
  padding-top: 40vh;
  transition: background-color 0.3s, color 0.3s;
}

.sm-textarea::-webkit-scrollbar {
  display: none;
}

@media (max-width: 768px) {
  .sm-textarea {
    font-size: 2rem;
    padding-top: 30vh;
  }
}
</style>
