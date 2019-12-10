import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.index'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true,
  dynamicDefaults: { clickToClose: false }
})
