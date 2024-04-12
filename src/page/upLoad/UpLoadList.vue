<template>
	<div class="list-container">
		<table class="list-table">
			<thead>
				<tr>
					<th class="table-th">
						<span class="thead-span">
							<span>文件名</span>
						</span>
					</th>
					<th class="table-th">
						<span class="thead-span">
							<span>类型</span>
						</span>
					</th>
					<th class="table-th">
						<span class="thead-span">
							<span>大小</span>
						</span>
					</th>
					<th class="table-th">
						<span class="thead-span">
							<span>进度</span>
						</span>
					</th>
					<th class="table-th">
						<span class="thead-span">
							<span>操作</span>
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in list"
					:key="index"
				>
					<td class="table-td">
						<span class="tbody-span">
							<span>{{ item.name }}</span>
						</span>
					</td>
					<td class="table-td">
						<span class="tbody-span">
							<span>{{ item.type }}</span>
						</span>
					</td>
					<td class="table-td">
						<span class="tbody-span">
							<span>{{ item.size }}</span>
						</span>
					</td>
					<td class="table-td">
						<span class="tbody-span">
							<span>---100%</span>
						</span>
					</td>
					<td class="table-td">
						<span class="tbody-span">
							<span>取消按钮</span>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div
			v-if="list.length === 0"
			class="list-empty"
		>
			<div>暂无上传文件</div>
			<div>请先选择文件</div>
			<div>或者点击上传按钮</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	list: {
		type: Array,
		default: () => [],
	},
});
</script>

<style scoped lang=less>
.list-table {
	width: 100%;
	.table-th {
		.thead-span {
			display: flex;
			justify-content: center;
			text-align: left;
			span {
				display: block;
				width: 4rem;
				color: @themeColor;
			}
		}
	}
	.table-td {
		.tbody-span {
			display: flex;
			justify-content: center;
			span {
				display: block;
				width: 4rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: @themeColor;
			}
		}
	}
}
.list-empty {
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>
