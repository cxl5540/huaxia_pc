<template>
  <div >
    <div class="model">
        <div class="content">
        <p class="head">
          <span>{{$store.state.lg=='C'?'登录':'Sign in'}}</span>
          <span><i class="fa fa-times"></i></span>
        </p>
         <div class="mid">
           <p>
           <span>{{$store.state.lg=='C'?'手机号':'phone number'}}:</span>
           <input type="text" v-model='tel' :placeholder="$store.state.lg=='C'?'请输入手机号':'phone number'">
           </p>
           <p>
           <span>{{$store.state.lg=='C'?'密码':'password'}}:</span>
           <input type="password" v-model='password' :placeholder="$store.state.lg=='C'?'请输入密码':'password'">
           </p>
        </div>
        <p class="register"><span @click="forgetpass">{{$store.state.lg=='C'?'忘记密码':'Forget password'}}?</span> <span @click="register">{{$store.state.lg=='C'?'立即注册':'Register'}}
        </span></p>
        <div class="footer">
         <button @click="login()">{{$store.state.lg=='C'?'登录':'Sign in'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  components:{

  },

  data () {
    return {
     tel:'',
     password:'',
    }
  },
  created(){
   $('.num_bottom,.footer,.leftbar,.header').hide();
  },
  mounted(){

  },
  methods:{
    forgetpass(){
      this.$router.push('/forgetpass')
    },
    register(){
      this.$router.push('/register')
    },
    login(){
    	let _this=this;
    		$.ajax({
    	 	dataType:"json", 
    	 	type:"post",
    	   url:this.testUrl+'mobile/login',
    	 	data:{
    	 		phone:this.tel,
    	 		password:this.password
    	 	},
    	 	success:function(res){
           		if(res.code==200){
               _this.$store.state.info=res.data;
                _this.$store.state.info.headImg=_this.testUrl+_this.$store.state.info.headImg;
               localStorage.setItem('uid',res.data.clientId)
               _this.$message.success('登录成功');
               _this.$router.push('/index')
           		}else{
                let msg='';
                 _this.$store.state.lg=='C'?msg='账号或密码错误':msg='Incorrect account or password.'
           			 _this.$message.error(msg);
           		}

             },
             error:function(res){
              _this.$message.error(this.$store.state.emsg);
             },
    	 });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: rgba(255,255,255,0.2);
  color: #000;
  font-size: 16px;
}
.content{
  width: 500px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -255px;
}
.head{
  background: #eee;
  display: flex;
  justify-content: space-between;
  box-sizing:border-box;
  padding: 8px 6px;

}
.mid{
  width: 70%;
  margin: 60px auto;
}
.mid>p{
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}
.mid>p input{
  height: 26px;
  padding: 2px 2px;
  width: 270px;
}
.footer{
  width: 70%;
  margin: auto;
  padding-bottom: 40px;
}
.footer button{
  width: 100%;
  color: #fff;
  background: #16191F;
  border: none;
  border-radius: 4px;
  padding:10px 0;
}
span{
    font-size: 0.22rem !important;
}
.register{
  display: flex;
  justify-content: space-around;
  position: relative;
  top: -30px;
  color: #007AFF;
  cursor: pointer;
}
</style>
