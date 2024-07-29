<template>
  诗词页
</template>

<script setup>
import axios from 'axios';
axios.get('https://unpkg.com/chinese-poetry@1.4.1/chinese-poetry/caocaoshiji/caocao.json').then((res)=>{
  console.log(res);
})
</script>

<style scoped lang=less>
  
</style>
