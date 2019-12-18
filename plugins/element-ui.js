import Vue from 'vue'
import '@/assets/elementui-theme/index.css'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Element, { locale })
}
