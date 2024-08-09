<template>
	<div class="wrap">
		<a-card
			hoverable
			:style="{ width: '360px',margin:'5px',cursor: 'pointer' }"
			v-for="(item, index) in filterRouterOption"
			:key=item.path
			@click="onClick(item)"
		>
			<template #cover>
				<div :style="{
          height: '204px',
          overflow: 'hidden',
        }">
					<img
						:style="{ width: '100%', transform: 'translateY(-20px)' }"
						alt="dessert"
						:src="`https://picsum.photos/200/300?id=${Math.random()}`"
					/>
				</div>
			</template>
			<a-card-meta :title="item.meta.title" />
		</a-card>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const filterRouterOption = router.options.routes.filter(
	(item) => item.meta && item.path !== '/home'
);
const onClick = (data) => {
	router.replace(data.path);
};
</script>

<style scoped lang=less>
.wrap {
	display: flex;
}
</style>
