import { createApp } from 'vue'
import App from './App.vue'
import { injectConfig } from './framework/injectConfig'
import config from './shared/config'
import { registerGlobalComponent } from './utils/registerGlobalComp'
import * as antIcons from '@ant-design/icons-vue'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

injectConfig(config)

const app = createApp(App)

// 添加到全局
app.config.globalProperties.$antIcons = antIcons

registerGlobalComponent(app).mount('#app')
