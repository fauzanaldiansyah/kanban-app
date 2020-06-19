import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2';
import VueSwal from 'vue-swal';
 


const gauthOption = {
  clientId: '665480961231-sn8p9l9d9s1m0h62u6ka8naouaeclnvk.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
 
Vue.use(VueSwal)

new Vue({
  render: h => h(App),
}).$mount('#app');

