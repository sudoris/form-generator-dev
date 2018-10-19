import Vue from 'vue'
import App from './App'
import PersonalHistory from "./components/note_components/PersonalHistory"

Vue.use(PersonalHistory);


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')


