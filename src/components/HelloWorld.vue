<template>
	<v-md-preview :text="markdown" ></v-md-preview>
</template>
<script setup>
import markdown from './test.md?raw';
// console.log(markdown);
</script>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
