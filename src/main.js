import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VMdPreview.use(vuepressTheme, {
  Prism,
  config: {
    toc: {
      includeLevel: [4],
    },
  },
  extend(md) {
    console.log(md);
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});
const app = createApp(App);

app.use(VMdPreview);
app.mount('#app');