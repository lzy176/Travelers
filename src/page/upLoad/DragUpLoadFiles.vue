<template>
	<div
		class="dragContainer"
		ref="dragContainer"
	>
		<span>拖拽文件到此处上传</span>
	</div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
const emit = defineEmits(['getFilesList']);
const dragContainer = ref(null);
const getFile = async (entryItem) => {
	if (entryItem.isDirectory) {
		// 文件夹
		const reader = entryItem.createReader();
		const entries = await new Promise((resolve, reject) => {
			reader.readEntries(resolve, reject);
		});
		let files = [];
		for (const entry of entries) {
			const resultFiles = await getFile(entry);
			files = files.concat(resultFiles);
		}
		return files;
	} else {
		// 文件
		const file = await new Promise((resolve, reject) => {
			entryItem.file(resolve, reject);
		});
		return [file];
	}
};
/**
 * @description: 获取文件对象
 * @param {*} itemList 上传的文件列表
 * @return {*}
 */
const getFileObject = async (itemList) => {
	const result = [];
	for (const item of itemList) {
		const entry = item.webkitGetAsEntry();
		result.push(getFile(entry));
	}

	const file = await Promise.all(result);
	const allFiles = file.flat();
	emit('getFilesList', allFiles);
};
onMounted(() => {
	dragContainer.value.addEventListener('dragover', (e) => {
		e.preventDefault();
		dragContainer.value.style.opacity = '0.5';
	});
	dragContainer.value.addEventListener('dragleave', (e) => {
		e.preventDefault();
		dragContainer.value.style.opacity = '1';
	});
	dragContainer.value.addEventListener('drop', (e) => {
		e.preventDefault();
		dragContainer.value.style.opacity = '1';
		getFileObject(e.dataTransfer.items);
	});
});
</script>

<style scoped lang=less>
.dragContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	border: 1px solid var(--color-neutral-10);
	margin: 10px;
	span {
		color: var(--color-neutral-10);
	}
}
</style>
