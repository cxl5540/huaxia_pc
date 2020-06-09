// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import router from './router'
 import store from './store'
// import 'lib-flexible/flexible'
// import 'babel-polyfill'
Vue.config.productionTip = false
import Axios from 'axios'


Vue.prototype.$axios = Axios;

Vue.prototype.testUrl = "http://topmaxfx.com:8090/yhjf/"

Vue.prototype.Tomunber=function(num){
	
	num>0?num='+'+Number(num).toFixed(2)+'%':num=Number(num).toFixed(2)+'%';
	return num;
}
Vue.prototype.initnowday=function(){
    var date=new Date();
    //年
    var year=date.getFullYear();
    //月
    var month=date.getMonth()+1;
    //日
    var day=date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var ss=date.getSeconds();
    var rq=year+'-'+month+'-'+day
     var nowday='';
     return nowday=rq;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	 store,
  components: { App },
  template: '<App/>'
})
