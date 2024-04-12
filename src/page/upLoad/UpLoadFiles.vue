<template>
	<div style='display:flex'>
		<label
			for="uploadFiles"
			class="uploadFiles"
		><span>上传文件</span></label>
		<label
			for="uploadFolder"
			class="uploadFolder"
		><span>上传文件夹</span></label>
	</div>
	<input
		type="file"
		id="uploadFiles"
		multiple
		@change="handleFileChange"
	>
	<input
		type="file"
		id="uploadFolder"
		webkitdirectory
		mozdirectory
		odirectory
		@change="handleFolderChange"
	>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['uploadFile']);
const handleFileChange = (e) => {
	const files = e.target.files;
	emit('uploadFile', files);
	// console.log(files, '上传文件');
};
const handleFolderChange = (e) => {
	const files = e.target.files;
	emit('uploadFile', files);
	// console.log(files, '上传文件夹');
};
</script>

<style scoped lang="less">
#uploadFiles,
#uploadFolder {
	display: none;
}
.uploadFiles,
.uploadFolder {
	display: block;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 120px;
	height: 30px;
	border-radius: 20px;
	background: @upLoadButtonBgColor;
	background-size: 400%;
	color: @upLoadButtonTextColor;
	border: none;
	line-height: 1.8;
	text-align: center;
	margin: 10px;
	transition: 0.3s;
}
.uploadFiles:hover::before,
.uploadFolder:hover::before {
	transform: scaleX(1);
}
.uploadFiles span,
.uploadFolder span {
	position: relative;
	z-index: 1;
}

.uploadFiles::before,
.uploadFolder::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	transform: scaleX(0);
	transform-origin: 0 50%;
	width: 100%;
	height: inherit;
	border-radius: inherit;
	background: linear-gradient(
		82.3deg,
		rgba(150, 93, 233, 1) 10.8%,
		rgba(99, 88, 238, 1) 94.3%
	);
	transition: all 0.475s;
}
</style>
