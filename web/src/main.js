import Vue from "vue";
import App from "./App.vue";

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  // set observer to true
  observer: true,
  dispatchEvent: true,
  lazyComponent: true,
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
