<template>
  <div >
    <div class="model">
        <div class="content">
        <p class="head">
          <span>{{$store.state.lg=='C'?'找回密码':'Retrieve password'}}</span>
          <span><i class="fa fa-times"></i></span>
        </p>
         <div class="mid">
           <p>
           <span>{{$store.state.lg=='C'?'手机号':'phone number'}}:</span>
           <input type="password"  :placeholder="$store.state.lg=='C'?'请输入手机号':'phone number'" v-model="tel"/>
           </p>
           <p class="yzm">
           <span>{{$store.state.lg=='C'?'验证码':'Verification Code'}}:</span>
           <input type="password" :placeholder="$store.state.lg=='C'?'请输入验证码':'Verification Code'"  v-model="yzm"/>
           <button  @click="getCode"  v-bind:class="{gray:wait_timer>0}">{{getMobileCodeText()}}</button>
           </p>
           <p>
           <span>{{$store.state.lg=='C'?'新密码':'New password'}}:</span>
           <input type="password"  :placeholder="$store.state.lg=='C'?'请输入新密码':'New password'" v-model="password"/>
           </p>
        </div>
        <div class="footer">
         <button @click="submit()">{{$store.state.lg=='C'?'找回密码':'Retrieve password'}}</button>
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
     check:false,
     code:'',
     yzm:'',
     password:'',
     wait_timer:false,
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    getCode(){
     	if (this.wait_timer > 0) {
                 return false;
             }
     	if (!this.tel) {
              var msg='';
               this.$store.state.lg=='C'?msg='手机不能为空！':msg='Phone number cannot be empty!';
                this.$message.error(msg);
                 return false;
             }
             if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)){
               var msg1='';
                this.$store.state.lg=='C'?msg='手机格式有误！':msg='Wrong phone number format!';
                  this.$message.error(msg1);
                 return false;
            }
    		 this.wait_timer = 59;
             var that = this;
             var timer_interval = setInterval(function(){
                 if(that.wait_timer > 0){
                     that.wait_timer -- ;
                 }else{
                     clearInterval(timer_interval);
                 }
             },1000);
    		 	this.getForgetAuthCode()
               //在这里调取你获取验证码的ajax
    		},
    		getMobileCodeText(){
             if(this.wait_timer > 0){
               let timelater='';
                 this.$store.state.lg=='C'?timelater=this.wait_timer+'s后获取':timelater='Get after'+this.wait_timer+'seconds';
                 return timelater;
             }
             if(this.wait_timer === 0){
                return  this.$store.state.lg=='C'?'重新获取':'Regain';
             }
             if(this.wait_timer === false){
                return  this.$store.state.lg=='C'?'获取验证码':'Get verification code';
             }

         },
       getForgetAuthCode(){  //获取验证码
    			let _this=this;
     		$.ajax({
    			 	dataType:"json", 
    			 	type:"post",
    			 	url:this.testUrl+'mobile/getForgetAuthCode',
    			 	data:{
    			 		phone:this.tel,
    			 	},
    			 	success:function(res){
    		       		if(res.code==200){
                     _this.$message.success(res.msg);
    		       		}
    		         },
    		         error:function(res){
    		          _this.$message.error(res.msg);
    		         },
    			 });
        },
        submit(){   //设置密码
        	if(this.checkreg()){
    				let _this=this;
    		  		$.ajax({
    				 	dataType:"json", 
    				 	type:"post",
    				 	url:this.testUrl+'mobile/retrievePassword',
    				 	data:{
    				 		phone:this.tel,
    				 		password:this.password,
    				 		authCode:this.yzm
    				 	},
    				 	success:function(res){
    			       	if(res.code==200){
    			       	_this.$message.success(res.msg);
    						  _this.$router.push({path:'/login'})
    			       		}else{
                  _this.$message.error(res.msg);
                  }
    			         },
    			         error:function(res){
    			          _this.$message.error(res.msg);
    			         },
    			 });
    		 }
       },
      checkreg(){  //验证
         var msg1='';
        if(!reg1.test(this.password) || this.password==''){
       		this.$store.state.lg=='C'?msg1='密码为6-20位数字+字母！':msg1='Password is 6-20 digits + letters!';
       		this.$message.error(msg1);
       		return false;
       	}else{
       		return true;
       	}
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
  width: 540px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -270px;
  margin-top: -320px;
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
.yzm{
  position: relative;
  
}
.yzm>button{
  position: absolute;
  right: 0;
  top: 0;
   height: 34px;
   border: none;
   background: #007AFF;
   color: #FFFFFF;
}
.gray{
	background: #C0C0C0 !important;
}
</style>
