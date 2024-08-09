<template>
	<div class="container">
		<span>{{route.meta.title}}</span>
		<SwitchTheme />
	</div>
</template>

<script setup>
import SwitchTheme from './SwitchTheme.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped lang="less">
.container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
	span {
		color: var(--color-neutral-10);
	}
}
</style>
