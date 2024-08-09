<template>
	<a-list>
		<a-list-item
			v-for="(item) in listData"
			:key="item.id"
		>
			<a-list-item-meta>
				<template #avatar>
					<a-avatar shape="square">
						<img :src=item.thumbnail_path />
					</a-avatar>
				</template>
				<template #title>
					<div>{{item.name}}</div>
				</template>
				<template #description>
          主题选择：
					<a-tag
						v-for="(item2) of item.configInfo"
						:key="item2.id"
						:color="'orangered'"
						bordered
						style="margin-right: 10px;cursor: pointer;"
						@click="onClickTag(item,item2)"
					>{{ item2.name }}</a-tag>
				</template>
			</a-list-item-meta>
		</a-list-item>
	</a-list>
</template>
<script setup>
import { reactive } from 'vue';
import axios from 'axios';
const listData = reactive([]);
axios
	.get('https://courseware.saasz.vdyoo.com/api/FutureTemplate/futureTpList', {
		headers: {
			jytoken: `eyJhcHBJZCI6IjMiLCJ1c2VyVG9rZW4iOiI5NjgzZTljZGZiMmQyNDcxNzZhMzQyNzlkMDM0ZGFiNyJ9`,
		},
		params: {
			category: 271,
			curpage: 1,
			perpage: 20,
			type: 5,
		},
	})
	.then((response) => {
		listData.push(...response.data.data.list);
		listData.forEach((item) => {
			axios
				.get(
					'https://courseware.saasz.vdyoo.com/api/FutureTemplate/getFutureTp',
					{
						headers: {
							jytoken: `eyJhcHBJZCI6IjMiLCJ1c2VyVG9rZW4iOiI5NjgzZTljZGZiMmQyNDcxNzZhMzQyNzlkMDM0ZGFiNyJ9`,
						},
						params: {
							id: item.id,
							type: item.type,
						},
					}
				)
				.then((response2) => {
					item.configInfo = response2.data.data.configInfo;
				});
		});
		console.log(listData);
	})
	.catch((error) => {
		console.error('Error:', error);
	});

const onClickTag = (data, data2) => {
	console.log(data, '11111');
	window.location.href = `${data.path}/index.html?path=${data2.path}`;
};
</script>

<style scoped lang=less>
</style>
//https://mv.xesimg.com/courseware_pages/0f9c8b5e55ddff8383e0314e8791f097/html?path=https://mv.xesimg.com/courseware_pages/fa2a2b4956aa0c0ca51b6bd2d76380ee
//https://mv.xesimg.com/courseware_pages/0f9c8b5e55ddff8383e0314e8791f097/index.html?path=https://mv.xesimg.com/courseware_pages/fa2a2b4956aa0c0ca51b6bd2d76380ee