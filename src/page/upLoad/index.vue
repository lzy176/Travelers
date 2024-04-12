<template>
	<DragUpLoadFiles @uploadFile="uploadFile"/>
	<UpLoadFiles @uploadFile="uploadFile" />
	<UpLoadList :list="list[currentPageIndex-1]" />
	<Pagination
		:currentPage="currentPageIndex"
		:total="total"
		@changePageIndex="changePageIndex"
	></Pagination>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { fillArray } from '@/tool.js';
import DragUpLoadFiles from './DragUpLoadFiles.vue';
import UpLoadFiles from './UpLoadFiles.vue';
import UpLoadList from './UpLoadList.vue';
import Pagination from '@/components/pagination/index.vue';
const list = reactive([]);
const currentPageIndex = ref(1);
const total = ref(1);

// 上传文件
const uploadFile = (fileList) => {
	const filterFileList = Array.from(fileList).filter(
		(f) => f.name !== '.DS_Store'
	);
	fillArray(filterFileList, list);
	total.value = list.length;
};
// 切换页码
const changePageIndex = (index) => {
	currentPageIndex.value = index;
};
</script>

<style scoped lang="less">
</style>
