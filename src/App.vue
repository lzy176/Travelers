<template>

	<Head />

	<UpLoad />


</template>


<script setup>
import UpLoad from './page/upLoad/index.vue';
import Head from './components/head/index.vue';
</script>



<style lang="less">
#content {
	display: flex;
	width: 500px;
}
.box {
	flex-shrink: 1;
}
.box1 {
	flex-shrink: 4;
}
body {
	background-color: @backgroundColor;
	transition: 0.3s;
}
</style>
