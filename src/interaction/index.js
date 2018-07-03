import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './index.css'

import mapCom from './index.vue'

const install = function (Vue) {
  if (install.installed) return

  Vue.use(ElementUI)
  Vue.component(mapCom.name, mapCom)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  mapCom
}