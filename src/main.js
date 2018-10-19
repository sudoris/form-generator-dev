import Vue from 'vue'
import App from './App'
import PersonalHistory from "./note_components/PersonalHistory"

Vue.use(PersonalHistory);


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')


