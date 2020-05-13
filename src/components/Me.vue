<template>
  <div class="me">
    <div class="title">
       <p>
         <span v-for="item,index in type" :key='index'  :class="actve==index?'actve':'0'" @click="choose(index)">{{$store.state.lg=='C'?item.name:item.ename}}</span>
       </p>
       <img src="../assets/close.png" alt=""  @click="closeme()">
    </div>
     <div v-if="actve==0" class="user">
        <Cropper></Cropper>
        <p><span>{{$store.state.lg=='C'?'用户':'user name'}}:</span><span>{{$store.state.info.realName}}</span><span @click="changename()">{{$store.state.lg=='C'?'修改':'Modify'}}</span></p>
        <p><span>{{$store.state.lg=='C'?'用户':'user'}}ID:</span><span>{{$store.state.info.clientId}}</span><span></span></p>
        <p><span>{{$store.state.lg=='C'?'手机号':'phone number'}}:</span><span>{{$store.state.info.phone}}</span><span @click="changetel()">{{$store.state.lg=='C'?'修改':'Modify'}}</span></p>
        <p><span>{{$store.state.lg=='C'?'密码':'password'}}:</span><span>******</span><span @click="changepass()">{{$store.state.lg=='C'?'修改':'Modify'}}</span></p>
        <div class="change" v-if="showchange">
            <div class="title">
              <span>{{chgtel==true?'修改手机号':'修改密码'}}</span>
               <img src="../assets/close.png" alt="" @click="closechange()">
            </div>
            <div class='user changephone' v-show="chgtel">
              <p><span>{{$store.state.lg=='C'?'手机号':'phone number'}}:</span><span><input type="text" v-model="newtel"></span></p>
              <p><span>{{$store.state.lg=='C'?'验证码':'Verification Code'}}:</span><span><input type="text"></span><span  @click="getCode" >{{getMobileCodeText()}}</span></p>
            </div>
            <div class='user changepass' v-show="chgpass">
              <p><span>{{$store.state.lg=='C'?'旧密码':'old password'}}:</span><span><input type="text" v-model="oldpassword"></span></p>
              <p><span>{{$store.state.lg=='C'?'新密码':'new password'}}:</span><span><input type="text" v-model="newpassword"></span></p>
              <p><span>{{$store.state.lg=='C'?'再次输入新密码':'new password again'}}:</span><span><input type="text" v-model="newagpassword"></span></p>
            </div>
            <button @click=submitchange()()>{{$store.state.lg=='C'?'保存':'Save'}}</button>
        </div>
     </div>
     <div v-if="actve==1" class="setbank">
       <div class='user'>
         <p style="color: #007AFF;font-size: 12px;text-align: center;">{{$store.state.lg=='C'?'此为提现到账的银行卡，请务必妥善完善您的信息':'please make sure to improve your information'}}</p>
        <p style="color: #007AFF;font-size: 12px;text-align: center;"><span v-show="$store.state.lg=='C'">{{status==0?'审核未通过':status==1?'审核中':'审核通过'}}</span>
          <span v-show="$store.state.lg=='E'">{{status==0?'Audit failed':status==1?'In audit':'Approved'}}</span></p>
         <p><span>{{$store.state.lg=='C'?'银行':'bank'}}:</span> <span v-if="creadtedcar==1">{{info.bankName}}</span>  <span v-if="creadtedcar==0"><input type="text"  v-model="band"></span></p>
         <p><span>{{$store.state.lg=='C'?'卡号':'card'}}:</span> <span v-if="creadtedcar==1">{{info.bankCard}}</span> <span v-if="creadtedcar==0"><input type="text"  v-model="cardnumer" ></span></p>
         <p><span>{{$store.state.lg=='C'?'持卡人':'name'}}:</span> <span v-if="creadtedcar==1">{{info.accountName}}</span> <span v-if="creadtedcar==0"><input type="text"   v-model="name" maxlength="5"></span></p>
         <p><span>{{$store.state.lg=='C'?'手机号':'phone number'}}:</span v-if="creadtedcar==1"> <span>{{info.tel}}</span> <span v-if="creadtedcar==0"><input type="text"  v-model="tel"></span></p>
          <p><span>{{$store.state.lg=='C'?'开卡行详细地址':'Address'}}:</span v-if="creadtedcar==1"> <span>{{info.address}}</span> <span v-if="creadtedcar==0"><input type="text"  v-model="adress"></span></p>
       </div>
       <button @click="savebank" v-if="creadtedcar==0">{{$store.state.lg=='C'?'保存':'Save'}}</button>
        <button @click="chengebank" v-if="creadtedcar==1">{{$store.state.lg=='C'?'换绑银行卡':'Save'}}</button>
     </div>
  </div>
</template>

<script>
  import Cropper from "./Cropper.vue"
  export default {
    name: 'HelloWorld',
    components:{
     Cropper
    },
    data () {
      return {
        type:[{
          name:'基本资料',ename:'Basic information'
        },
        {
          name:'银行卡管理',ename:'Bank card settings'
        },],
        actve:0,
        showchange:false,
        chgtel:false,
        chgpass:false,
        newtel:'',
        code:'',
        wait_timer:false,
        oldpassword:'',
        newpassword:'',
        newagpassword:'',
        cardnumer:'',
        band:'',
        name:'',
        tel:'',
        adress:'',
        creadtedcar:'',
        status:'',
        info:''
      }
    },
    created(){
      this.getBindBank()
    },
    watch:{
  	},
    mounted(){
    },
    beforeDestroy(){
    },
    methods:{
      getBindBank(){  //银行信息
      	let _this=this;
        		$.ajax({
      	dataType:"json", 
      	type:"get",
      	url:this.testUrl+'mobile/getBindBank',
      	data:{
      		uid:localStorage.getItem('uid'),
      	},
      	success:function(res){
          		if(res.code==200){
      					_this.creadtedcar=res.data.created;
                if(_this.creadtedcar==1){
                  _this.getBank();
                }
          		}
            },
       });
      },
      chengebank(){
        this.creadtedcar=0;
       },
      getBank(){  //获取银行详情
      	let _this=this;
      		$.ajax({
      	 	dataType:"json", 
      	 	type:"get",
      	 	url:this.testUrl+'mobile/getBank',
      	 	data:{
      	 		uid:localStorage.getItem('uid'),
      	 	},
      	 	success:function(res){
             		if(res.code==200){
      				 _this.status=res.data.status;
      				 _this.info=res.data;
      				console.log(_this.status)
             		}
               },

      	 });
      },
       choose(index){
         this.actve=index;
       },
        changename(){  //姓名弹窗
             this.$prompt('请输入用户名', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               inputPattern:/^[\u4E00-\u9FA5]{1,5}$/,
               inputErrorMessage: '姓名为1-5个中文字符'
             }).then(({ value }) => {
               this.submitname(value)
               this.$message({
                 type: 'success',
                 message: '你的用户名: ' + value
               });
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '取消输入'
               });
             });
         },
         submitname(name){  //修改姓名
         	let _this=this;
         	$.ajax({
         	dataType:"json", 
         	type:"post",
         	url:this.testUrl+'mobile/changeNickName',
         	data:{
         		newPassword:name,  //修改姓名
         		uid:localStorage.getItem('uid')
         	},
         	success:function(res){
             		if(res.code==200){
                  _this.$store.state.info.realName=name;
             		}
               },
               error:function(res){
                 _this.$message.error('网络错误');
               },
              complete:function(){
              	$('#loading').hide()
              }
         });
         },
        changetel(){  //修改手机
          this.showchange=true;
          this.chgtel=true;
          this.chgpass=false;
        },
        submitchange(){
          if(this.chgtel==true){ //修改手机号
             this.submitchengtel()
          }else{
            this.changepasssubmit()
          }
        },
        changepass(){  //修改密码
          this.showchange=true;
          this.chgtel=false;
          this.chgpass=true;
        },
        closechange(){ //关闭修改
          this.showchange=false;
        },
        closeme(){
          this.$store.state.showmeset=false;
           this.$store.state.showmodel=false;
        },
        getCode(){
        if (this.wait_timer > 0) { return false;}
        if (!this.newtel) {
              var msg='';
              this.$store.state.lg=='C'?msg='手机不能为空！':msg='Phone number cannot be empty!';
              this.$message.error(msg);
                return false;
            }
            if(!/^1[3|4|5|7|8]\d{9}$/.test(this.newtel)){
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
              that.getForgetAuthCode();
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
          getForgetAuthCode(){  //获取验证码
           let _this=this;
             $.ajax({
             dataType:"json",
             type:"post",
             url:this.testUrl+'mobile/getAuthCode',
             data:{
               phone:this.newtel,
             },
          	success:function(res){
              		if(res.code==200){
              		}else{
              		 _this.$message(res.msg);
              		}

                },
                error:function(res){
                 _this.$message(emsg);
                },
            });
          },
          submitchengtel(){  //提交修改电话号码
              let _this=this;
              $.ajax({
              dataType:"json", 
              type:"post",
              url:this.testUrl+'mobile/getAuthCodeChangePhone',
              data:{
                uid:localStorage.getItem('uid'),
                newPhone:this.newtel,
                authCode:this.code
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
          changepasssubmit(){  //提交修改密码
          	var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;  //姓名
            if(this.newagpassword!==this.newpassword){
                this.$message.error('再次输入密码有误！');
                return false;
            }else if(!reg1.test(this.newpassword) || this.newpassword==''){
                this.$message.error('密码为6-20位数字+字母！');
                return false;
            }
          	let _this=this;
          	$.ajax({
          	 	dataType:"json", 
          	 	type:"post",
          	 	url:this.testUrl+'mobile/changePassword',
          	 	data:{
          	 		uid:localStorage.getItem('uid'),
          	 		oldPassword:this.oldpassword,
          	 		newPassword:this.newpassword,
          	 	},
          	 	success:function(res){
                 		if(res.code==200){
                      var msg='';
                        _this.$store.state.lg=='C'?msg='修改成功！':msg='Update success';
                 		  _this.$message.success(msg);
                 		   _this.$router.push({path:'/login'})
                 		}else{
                 			 _this.$message(res.msg);
                 		}

                   },
                   error:function(res){
                    _this.$message.error(emsg);
                   },
          	 });
          },
          savebank(){
            if(this.check()){
            let _this=this;
            	$.ajax({
             	dataType:"json", 
             	type:"post",
             	url:this.testUrl+'mobile/bindingBank',
             	data:{
             		uid:localStorage.getItem('uid'),
             		bankName:this.band,
             		bankCard:this.cardnumer,
             		accountName:this.name,
             		phone:this.tel,
             		address:this.adress,
             	},
             	success:function(res){
                 		if(res.code==200){
                 			_this.$message.success('绑定成功，提交审核');
                 		}
                   },
                   error:function(res){
                    _this.$message.error('网络错误');
                   },
             });

            }
          },
          check(){
          	if(this.band==''||this.cardnumer==''||this.cardnumer==''||this.adress==''||this.name==''){
          			 this.$message.error('请完善信息！');
          			return false;
          	}else if(!/^[\u4E00-\u9FA5]{1,5}$/.test(this.name)){
                         this.$message.error('姓名式有误！');
                        return false;
                }else if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)){
                         this.$message.error('手机格式有误！');
                        return false;
                }else if(!/^\d{16}|\d{19}$/.test(this.cardnumer)){
                	 this.$message.error('银行卡格式有误！');
                        return false;
                }else{
                		return true;
                }
          }
    }
  }
</script>

<style scoped="scoped">
  .me{
    width:800px;
    height: 600px;
    background: #2b2b2b;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -300px;
    z-index: 100;

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
    .actve{
      color: #007AFF;
      }
    .user>p{
      text-align: left;
      font-size: 14px;
      padding: 10px;
      border-bottom: 1px solid #000;
    }
    .user>p>span{
      display: inline-block;
      width: 30%;
    }
    .user>p>span:nth-child(2){
     position: relative;
         left: -104px;
    }
    .user>p>span:nth-child(3){
      color: #007AFF;
      cursor: pointer;
      }
    .user{
      text-align: left;
    }
    .user>img{
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-left:10px;
    }
    .change{
      margin-top: 20px;
    }
    .me>div:nth-child(2){
      position: relative;
    }
     button{
       width: 200px;
       background: #007AFF;
       color: #FFFFFF;
       border: none;
       padding: 10px 0;
       position: absolute;
       left: 50%;
       margin-left: -100px;
        bottom: -150px;
    }
</style>
