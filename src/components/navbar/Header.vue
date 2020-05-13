<template>
  <div class="header">
		  <span> <img class="logo" src="../../assets/logo.png" alt="">{{$store.state.lg=='C'?'华夏金服':'HuaXia gold suit'}}</span>
		  <span><img style="max-width: 15px;vertical-align: middle;margin-right: 10px;" src="../../assets/money.png" alt="">{{$store.state.lg=='C'?'总资产':'Total assets'}}:{{$store.state.info.totalMoney}}&nbsp;&nbsp;&nbsp;{{$store.state.lg=='C'?'冻结资产':'Freezing amount'}}:{{$store.state.info.frozenMoney}}&nbsp;&nbsp;&nbsp;{{$store.state.lg=='C'?'可用资产':'Available amount'}}:{{$store.state.info.availableMoney}}</span>
		  <span>
        <span  @click="changelg"><span :class="$store.state.lg=='C'?'blue':''">中文/</span><span :class="$store.state.lg=='E'?'blue':''">EN</span></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span  @click="gomine" v-if="!$store.state.info">{{$store.state.lg=='C'?'未登录':'Sign in'}}</span>
        <span @click="gomine" v-if="$store.state.info"> <img class="head" v-if="!$store.state.info.headImg " src="../../assets/touxiang.png" alt=""><img v-if="$store.state.info.headImg "  :src=$store.state.info.headImg alt="">{{$store.state.info.realName}}</span>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="showme()">{{$store.state.lg=='C'?'个人中心':'Me'}}</span>
        <!-- <span>设置</span> -->
      </span>
	</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      name:'',
      path:'',
      headImg:'',
    }
  },
  created(){
    // this.getinfo()
  },
  mounted(){

  },
  beforeDestroy() {

  },
  methods:{
    showme(){
      if(!this.$store.state.info.realName){
        this.$router.push({path:'/login'})
      }else{
       this.$store.state.showmodel=true;
        this.$store.state.showmeset=true;
      }

    },
    changelg(){ //切换语言
      if(this.$store.state.lg=='C'){
        this.$store.state.lg='E';
        this.$store.state.emsg='network error!'
      }else{
       this.$store.state.lg='C';
       this.$store.state.emsg='网络错误'
      }
    },
    gomine(){ // 登录
       if(!this.$store.state.info.realName){
         this.$router.push({path:'/login'})
       }else{
         this.$store.state.showmeset=true;
       }
    },
    getinfo(){  //获取基本信息
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
          			if(res.data){
                    _this.$store.state.info=res.data;
                    _this.$store.state.info.headImg=_this.testUrl+_this.$store.state.info.headImg;
          			}else{
          				// _this.$store.state.lg=='C'? _this.name='未登录': _this.name='Sign in';
                   _this.name='登录'
          			}

          		}
            },
            error:function(res){
              _this.$message.error(_this.$store.state.emsg);
            },
    			 });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  background: #16191F;
  color: #fff;
	height:5vh;
  border-bottom: 3px solid #000000;
  box-sizing:border-box;
  text-align: left;
  min-width: 1200px;
  text-align: center;
}
.header>span{
	display: inline-block;
  cursor: pointer;
	line-height: 5vh;
}
.header>span:nth-child(1){
	line-height: 5vh;
	font-size: 20px;
  float: left;
}
.header>span:nth-child(2){
	padding-left: 20px;
  color: #FFFF66;
}
.header>span:nth-child(3){
	float: right;
	font-size: 14px;
	margin-right: 20px;
}
.head{
  width:20px;
  height:20px;
  vertical-align: middle;
  margin-right: 10px;
  border-radius: 50%;
}
.logo{
  max-height: 30px;
  vertical-align: middle;
  margin: 0 20px;
}
.blue{
  color: #007AFF;
}
</style>
