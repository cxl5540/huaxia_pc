<template>
  <div class="main">
   <Header></Header>
   <div  class="index" style="overflow: hidden;">

		<Kimg></Kimg>
  <!--  <New_file></New_file> -->
      <Kelineleft></Kelineleft>
	  <Kelineright></Kelineright>
   </div>
   <Kbottom></Kbottom>
   <Me v-show='$store.state.showmeset'></Me>
   <div class="showmodel" v-show="$store.state.showmodel==true"></div>
  </div>
</template>

<script>
import Header from '../components/navbar/Header'
import Kelineleft from '../components/kline/klineleft.vue'
import Kelineright from '../components/kline/klinesright.vue'
import Kimg from '../components/kline/kimg.vue'
// import New_file from './New_file.vue'
import Kbottom from '../components/kline/kbottom.vue'
import Me from '../components/Me.vue'

export default {
  name: 'index',
  components:{
   Header,
   Kelineleft,
   Kelineright,
    Kimg,
   //New_file,
   Kbottom,
   Me
  },

  data () {
    return {
      showme:false
    }
  },
  created(){
    console.log(localStorage.getItem('uid'))
    if(localStorage.getItem('uid')){
      this.getinfo()
    }

  },
  mounted(){

  },
  watch:{

  },
  methods:{
    getinfo(){
    	let _this=this;
    	$.ajax({
    	dataType:"json", 
    	type:"get",
    	url:this.testUrl+'mobile/getMyCenter',
    	data:{
    		uid:localStorage.getItem('uid')
    	},
    	success:function(res){
        		if(res.code==200){
        		 _this.$store.state.info=res.data;
             _this.$store.state.info.headImg=_this.testUrl+_this.$store.state.info.headImg;
        		}else{
          /*     _this.$message.error(res.msg); */
            }
          },
          error:function(res){
            _this.$message(_this.$store.state.emsg);
          },
         complete:function(){
         	$('#loading').hide()
         }
    });
    }

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
   min-width: 1200px;
}
.index{
  height: 70vh;
   min-width: 1200px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  position: relative;
}
.showmodel{
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 20;
}
</style>
