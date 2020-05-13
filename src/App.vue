<template>
  <div id="app">
<!--  <Header></Header>
   <div ><Leftbar></Leftbar></div>
    <Numbottom ></Numbottom> -->
    <router-view/>
  </div>
</template>

<script>
/*import Header from './components/navbar/Header'
import Leftbar from './components/leftbar/Leftbar'
import Numbottom from './components/num/numbottom'*/
export default {
  name: 'App',
    components:{
/*  Header,
   Leftbar,
   Numbottom*/
  },
  data(){
    return {
       /*show:false,*/
    }
  },
  created(){
    /* $('.num_bottom,.footer,.leftbar,.header').hide()*/
  },
  watch:{
    $route(to,from){
   /*   console.log(this.$route.path);*/
      /*if(to.path=='/number'){
        console.log(to.path);
        this.show=true;
       $('.num_bottom,.footer,.leftbar,.header').show()
      }*/
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cccccc;
  margin: 0px;
  width: 100%;
     min-width: 1200px !important;
     height: 100vh;

}
body{
  margin: 0;
  padding: 0;
  height: 100vh;
  font-size: 14px !important;
  overflow-y: hidden;
/*  min-width:1200px; */
}
ul{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
p{
  margin: 0;
}
.up{
  color: red;
}
.down{
  color: green;
}
.flex-center{
  display: flex;
  align-items: center;
}
</style>
