<template>
	<DragUpLoadFiles @getFilesList="getFilesList" />
	<UpLoadFiles @getFilesList="getFilesList" />
	<UpLoadList
		:list="list"
		@pauseFileUpLoad="pauseFileUpLoad"
		@runOnFileUpLoad="runOnFileUpLoad"
	/>
	<a-button
		type="primary"
		status="success"
		@click="uploadFileAll"
	>开始上传</a-button>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { formatBytes } from '@/tool.js';
import DragUpLoadFiles from './DragUpLoadFiles.vue';
import UpLoadFiles from './UpLoadFiles.vue';
import UpLoadList from './UpLoadList.vue';
import { onUpload, mergeFileChunk } from '@/api/index.js';
const list = reactive([]);
const chunkList = reactive({});
// 获取文件列表
const getFilesList = (fileList) => {
	const filterFileList = Array.from(fileList).filter(
		(f) => f.name !== '.DS_Store'
	);
	const controller = new AbortController();
	filterFileList.forEach((item) => {
		const chunk = fileChunk(item);
		chunkList[list.length] = chunk;
		const fillData = item.name.split('.');
		list.push({
			key: list.length,
			name: fillData[0],
			type: fillData[fillData.length - 1],
			size: formatBytes(item.size),
			progress: 0,
			file: item,
			controller: controller,
			signal: controller.signal,
		});
	});
};

// 文件切片
const fileChunk = (file, size = 1 * 1024 * 1024) => {
	const chunkList = [];
	let cur = 0;
	let index = 0;
	while (cur < file.size) {
		chunkList.push({
			file: file.slice(cur, cur + size),
			chunkName: `${file.name}-${index}`,
			fileName: file.name,
		});
		cur += size;
		index++;
	}
	return chunkList;
};
// 上传文件
const uploadFileAll = () => {
	for (const key in chunkList) {
		const formDataFiles = changeFileData(chunkList[key]);
		formDataFiles.forEach((formData, index) => {
			onUpload(
				formData,
				list[key].signal,
				createProgress(
					chunkList[key][index],
					key,
					chunkList[key].length
				)
			);
		});
	}
};
// 文件对象转换二进制数据流
const changeFileData = (files) => {
	return files.map(({ file, fileName, chunkName }) => {
		// 对象需要转成二进制数据流进行传输
		const formData = new FormData(); // 创建表单格式的数据流
		// 将切片转换成了表单的数据流
		formData.append('file', file);
		formData.append('fileName', fileName);
		formData.append('chunkName', chunkName);
		return formData;
	});
};
// 文件上传进度
const createProgress = (item, key, len) => {
	return (e) => {
		const pro = e.loaded / e.total;
		const pro2 = 1 / len;
		item.progress = Number(pro.toFixed(2));
		if (item.progress === 1) {
			let p = list[key].progress + pro2;
			list[key].progress = Number(p.toFixed(2));
			if (!chunkList[key].find((l) => l.progress !== 1)) {
				list[key].progress = 1;
				mergeFileChunk({
					fileName: list[key].file.name,
					size: 1 * 1024 * 1024,
				});
			}
		}
	};
};
// 暂停文件上传
const pauseFileUpLoad = (index) => {
	const target = list[index];
	target.controller.abort();
};
// 继续文件上传
const runOnFileUpLoad = (index) => {};
</script>

<style scoped lang="less">
</style>
