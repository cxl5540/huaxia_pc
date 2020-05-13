<template>
  <div >
    <div class="model">
        <div class="content">
        <p class="head">
          <span>{{$store.state.lg=='C'?'注册':'Sign Up'}}</span>
          <span><i class="fa fa-times"></i></span>
        </p>
         <div class="mid">
           <p>
           <span>{{$store.state.lg=='C'?'姓名':'name'}}:</span>
           <input type="text"  maxlength="5" v-model="name" :placeholder="$store.state.lg=='C'?'请输入姓名':'name'">
           </p>
           <p>
           <span>{{$store.state.lg=='C'?'手机号':'phone number'}}:</span>
           <input type="text" v-model="tel" :placeholder="$store.state.lg=='C'?'请输入手机号':'phone number'">
           </p>
           <p>
           <span>{{$store.state.lg=='C'?'密码':'password'}}:</span>
           <input type="text" v-model="password" :placeholder="$store.state.lg=='C'?'请输入密码':'password'">
           </p>
           <p>
           <span>{{$store.state.lg=='C'?'邀请码':'invitation code'}}:</span>
           <input type="text"  v-model="yqm" :placeholder="$store.state.lg=='C'?'请输入邀请码(选填)':'invitation code(Non essential)'">
           </p>
           <p class="yzm">
           <span>{{$store.state.lg=='C'?'验证码':'Verification Code'}}:</span>
           <input type="text" v-model="yzm"  :placeholder="$store.state.lg=='C'?'请输入验证码':'Verification Code'">
           <button  @click="getCode"  v-bind:class="{gray:wait_timer>0}">{{getMobileCodeText()}}</button>
           </p>
        </div>
        <p class="register"  @click="seebook">
          <span><img src="../assets/b_fuxuankuang2.png" alt="" v-show="agree==false">
          <img src="../assets/b_fuxuankuang.png" alt="" v-show="agree">{{$store.state.lg=='C'?'用户协议':'User agreement'}}</span>
           <span></span>
         </p>
        <div class="footer">
         <button @click="rigister()">{{$store.state.lg=='C'?'注册':'Sign Up'}}</button>
        </div>
      </div>
    </div>
    <div class="book" v-show="showbook">
      <div class="title">
         <p>
           <span>{{$store.state.lg=='C'?'用户协议':'User agreement'}}</span>
         </p>
         <img src="../assets/close.png" alt=""  @click="closebook()">
      </div>
     <div class="main">
     	<p>{{$store.state.lg=='C'?'华夏金服':'HuaXia gold suit'}}</p>
      <p style="text-align: justify;">一、我们如何收集和使用您的个人信息 个人信息是指以电子或者其他方式记录的能够单独或者与 其他信息结合识别特定自然人身份或者反映特定自然人活 动情况的各种信息。本协议中涉及的个人信息包括:基本信息(包括个人姓名、生日、性别、住址、个人电话号码、电子邮箱) ;个人身份信息(包括身份证、军官证、护照、驾驶证等) ;网络身份标识信息(包括系统账号、IP地址、邮箱地址及与前述有关的密码、口令、口令保护答案) ;个人财产信息(交易和消费记录、以及余额、优惠券);通讯录;个人上网记录(包括网站浏览记录、软件使用记录、点击记录) ;个人常用设备信息(包括硬件型号、设备MAC地址、操作系统类型、软件列表唯一设备识别码(如MEl/android ID/IDFA/OPENUDID/GUID、SIM卡IMSI信息等在内的描述个人常用设备基本情况的信息) ;个人位置信息(包括行程信息、精准定位信息、住宿信息、经纬度等) ;个人敏感信息是指一-旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，本协议中涉及的个人敏感信息包括:您的财产信息(包括交易记录、优惠券) ;个人身份信息(包括身份证、军官证、护照、驾驶证、户口本) ;网络身份识别信息(包括账户名账户昵称) ;其他信息(包括通讯录、行程信息、网页浏览记录住宿信息、精准定位信息)。我们仅会出于以下目的，收集和使用您的个人信息: (一)您须授权我们收集和使用您个人信息的情形 我们的产品与/或服务包括一些核心功能，这些功能包含了 实现网_上购物所必须的功能、改进我们的产品与/或服务所 必须的功能及保障交易安全所必须的功能。我们可能会收 集、保存和使用下列与您有关的信息才能实现上述这些功能.</p>
     </div>
      <button @click="submit">{{$store.state.lg=='C'?'已阅读并同意':'Read and agree'}}</button>
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
      check:false,
      name:'',
      tel:'',
      code:'',
      yzm:'',
      password:'',
      wait_timer:false,
      yqm:'',
      agree:false,
      showbook:false
    }
  },
  created(){
   $('.num_bottom,.footer,.leftbar,.header').hide();
  },
  mounted(){

  },
  methods:{
    closebook(){
      this.showbook=false;
    },
    submit(){
      this.showbook=false;
      this.agree=true;
    },
    seebook(){
       this.showbook=true;
    },
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
                  //在这里调取你获取验证码的ajax
                  that.getyazm()
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
                  return  this.$store.state.lg=='C'?'获取验证码':'Get code';
                }

            },
          getyazm(){
    			let _this=this;
    	  		$.ajax({
    			 	dataType:"json", 
    			 	type:"post",
    			 	url:this.testUrl+'mobile/getAuthCode',
    			 	data:{
    			 		phone:this.tel,
    			 	},
    			 	success:function(res){
    		       		if(res.code==200){
                      _this.$message.success(res.msg);
    		       		}else{
                    var msg='';
                     _this.$store.state.lg=='C'?msg=res.msg:msg='The mobile number is registered!'
                      _this.$message.error(msg);
                  }
    		         },
    		         error:function(res){
                      _this.$message.error(msg);
    		         },
    			   });
           },
        rigister(){          //注册
          if(this.checkreg())	{
      			let _this=this;
    	  		$.ajax({
    			 	dataType:"json", 
    			 	type:"post",
    			 	url:this.testUrl+'mobile/register',
    			 	data:{
    			 		phone:this.tel,
    			 		realName:this.name,
    			 		password:this.password,
    			 		authCode :this.yzm,
    					invitationCode:this.yqm,
    			 	},
    			 	success:function(res){
    		       		if(res.code==200){
    		       		    _this.$message.success(res.msg);
    		       		    _this.$router.push({path:'/login'});
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
          	var reg = /^[\u4E00-\u9FA5]{1,5}$/;  //姓名
          	var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;  //姓名
            var msg='',msg1='',msg2='';
          	if(!reg.test(this.name) || this.name==''){
          		 this.$message.error('姓名为1-5个中文字符');
          		return false;
          	}else  if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)){
               this.$store.state.lg=='C'?msg='手机格式有误！':msg='Wrong phone number format!';
          		  this.$message.error(msg);
          		return false;
          	}else if(!reg1.test(this.password) || this.password==''){
               this.$store.state.lg=='C'?msg1='密码为6-20位数字+字母！':msg1='Password is 6-20 digits + letters!';
          		 this.$message.error(msg1);
          		return false;
          	}else if(this.check==false){
                this.$store.state.lg=='C'?msg2='请先阅读并同意用户协议！':msg2='Please read and agree to the user agreement first!';
          		 this.$message.error(msg2);
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
  z-index: 9;
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
.register{
  display: flex;
  justify-content: space-around;
  position: relative;
  top: -30px;
  color: #007AFF;
  cursor: pointer;
}
.register img{
  max-width: 12px;
  vertical-align: middle;
  margin-right:5px;
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
.book{
    width: 600px;
    height:700px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -400px;
    background: #FFFFFF;
    z-index: 10;
    background: #2B2B2B;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 10px;

  }
  .title{
      background:#252525 ;
      text-align: left;
      box-sizing: border-box;
      padding:10px;
      display: flex;
      justify-content: space-between;
    }
    .title>img{
      max-height: 18px;
    }
    .title>p>span{
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
    }
    .book button{
      width:300px;
      border: none;
      background: #007AFF;
      color: #FFFFFF;
      padding: 10px 0;
      margin-top: 80px;
    }
    .main>p{
      margin: 10px 0;
      line-height: 26px;
    }
    .gray{
    	background: #C0C0C0 !important;
    }
</style>
