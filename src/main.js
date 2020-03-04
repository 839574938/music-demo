import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./common/stylus/index.styl"
import attachFastClick from 'fastclick'

attachFastClick.attach(document.body);  //解决移动端300ms延迟
Vue.config.productionTip = false;  //阻止启动生产消息

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
