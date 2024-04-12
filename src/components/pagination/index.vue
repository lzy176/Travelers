<template>
	<div class="container">
		<ul>
			<span @click="onClickPagination('before')">
				< </span>
					<li
						v-for="(item,index) in list"
						:key="index"
						@click="onClickPagination(item)"
						class="li-item"
						:class="{ 
							'li-active': item.value=== currentPage, 
						}"
					>
						{{ item.value }}
					</li>
					<span @click="onClickPagination('next')"> > </span>
		</ul>

	</div>

</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, toRefs, ref } from 'vue';
const emit = defineEmits(['changePageIndex']);
const props = defineProps({
	currentPage: {
		type: Number,
		default: 1,
	},
	total: {
		type: Number,
		default: 1,
	},
});
const { total, currentPage } = toRefs(props);
let list = reactive([{ ellipsis: false, value: 1 }]);

const updatePages = (totalPages, pageIndex) => {
	const pages = [];

	if (totalPages >= 10) {
		if (pageIndex <= 3) {
			pages.push(
				{ ellipsis: false, value: 1 },
				{ ellipsis: false, value: 2 },
				{ ellipsis: false, value: 3 },
				{ ellipsis: false, value: 4 },
				{ ellipsis: false, value: 5 },
				{ ellipsis: true, value: '...', value2: 6 },
				{ ellipsis: false, value: totalPages }
			);
		} else if (pageIndex >= totalPages - 3) {
			pages.push(
				{ ellipsis: false, value: 1 },
				{ ellipsis: true, value: '...', value2: totalPages - 7 },
				{ ellipsis: false, value: totalPages - 4 },
				{ ellipsis: false, value: totalPages - 3 },
				{ ellipsis: false, value: totalPages - 2 },
				{ ellipsis: false, value: totalPages - 1 },
				{ ellipsis: false, value: totalPages }
			);
		} else {
			pages.push(
				{ ellipsis: false, value: 1 },
				{
					ellipsis: true,
					value: '...',
					value2: pageIndex - 5 < 1 ? 1 : pageIndex - 5,
				},
				{ ellipsis: false, value: pageIndex - 2 },
				{ ellipsis: false, value: pageIndex - 1 },
				{ ellipsis: false, value: pageIndex },
				{ ellipsis: false, value: pageIndex + 1 },
				{ ellipsis: false, value: pageIndex + 2 },
				{
					ellipsis: true,
					value: '...',
					value2:
						pageIndex + 5 > totalPages ? totalPages : pageIndex + 5,
				},
				{ ellipsis: false, value: totalPages }
			);
		}
	} else {
		for (let i = 1; i <= totalPages; i++) {
			pages.push({ ellipsis: false, value: i });
		}
	}
	return pages;
};

watch(total, (newValue) => {
	list = updatePages(newValue, currentPage.value);
});

const onClickPagination = (item) => {
	let index = 0;
	if (item === 'before') {
		index = currentPage.value === 1 ? 1 : currentPage.value - 1;
	} else if (item === 'next') {
		index =
			currentPage.value === total.value
				? total.value
				: currentPage.value + 1;
	} else if (item.ellipsis) {
		index = item.value2;
	} else {
		index = item.value;
	}
	list = updatePages(total.value, index);
	emit('changePageIndex', index);
};
</script>

<style scoped lang=less>
.container {
	text-align: center;
}
ul {
	list-style: none;
	display: inline-block;
	padding: 0;
	span {
		cursor: pointer;
	}
}
.li-item {
	display: inline-block;
	box-sizing: border-box;
	padding: 0 10px;
	cursor: pointer;
	color: rgb(78, 89, 105);
}
.li-item:hover {
	background-color: rgb(232, 243, 255);
}
.li-active {
	background-color: rgb(232, 243, 255);
	color: rgb(22, 93, 255);
}
.li-active:hover {
	background-color: rgb(232, 243, 255);
}
.li-hide {
	display: none;
}
</style>
