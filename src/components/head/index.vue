<template>
	<div class="container">
		头部
		<SwitchTheme />
	</div>
</template>

<script setup>
import SwitchTheme from './SwitchTheme.vue';
</script>

<style scoped lang="less">
.container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
}
</style>
