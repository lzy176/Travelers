<template>

	<Head />

	<UpLoad />
</template>


<script setup>
import UpLoad from './page/upLoad/index.vue';
import Head from './components/head/index.vue';
</script>



<style lang="less">
body {
	background-color: @backgroundColor;
	transition: 0.3s;
}
</style>
