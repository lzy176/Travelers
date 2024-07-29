
<template>
	<a-table
		:data="list"
		show-empty-tree
		style="margin-top: 20px;margin-bottom: 20px"
		:pagination="{pageSize: 10}"
	>
		<template #columns>
			<a-table-column
				title="序号"
				data-index="key"
			></a-table-column>
			<a-table-column
				title="文件名"
				:ellipsis="true"
				data-index="name"
			></a-table-column>
			<a-table-column
				title="文件大小"
				data-index="size"
			></a-table-column>
			<a-table-column
				title="文件类型"
				data-index="type"
			></a-table-column>
			<a-table-column title="上传进度">
				<template #cell="{record }">
					<a-progress
						type="circle"
						size="small"
						:percent="record.progress"
					/>
				</template>
			</a-table-column>
			<a-table-column title="操作设置">
				<template #cell="{record}">
					<a-button
						type="primary"
						status="warning"
						size="mini"
						@click="pause(record.key)"
					>暂停上传</a-button>
					<a-button
						type="primary"
						status="success"
						size="mini"
						@click="runOn(record.key)"
					>继续上传</a-button>
				</template>
			</a-table-column>
		</template>
	</a-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['pauseFileUpLoad', 'runOnFileUpLoad']);
const props = defineProps({
	list: {
		type: Array,
		default: () => [],
	},
});
const pause = (key) => {
	emit('pauseFileUpLoad', key);
};
const runOn = (key) => {
	emit('runOnFileUpLoad', key);
};
</script>
