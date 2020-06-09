<template>
  <div class="header">
		  <span> <img class="logo" src="../../assets/logo.png" alt="">{{$store.state.lg=='C'?'华夏金服':'HuaXia gold suit'}}</span>
		  <span>
        <img style="max-width: 15px;vertical-align: middle;margin-right: 10px;" src="../../assets/money.png" alt="">{{$store.state.lg=='C'?'总资产':'Total assets'}}:￥{{$store.state.info.totalMoney}}&nbsp;&nbsp;&nbsp;{{$store.state.lg=='C'?'冻结资产':'Freezing amount'}}:￥{{$store.state.info.frozenMoney}}&nbsp;&nbsp;&nbsp;{{$store.state.lg=='C'?'可用资产':'Available amount'}}:￥{{$store.state.info.availableMoney}}
      <button class="btn" style="background: crimson;margin-left: 100px;" @click="changemoney(1)">{{$store.state.lg=='C'?'充值':'Recharge'}}</button>
      <button  class="btn" style="background: green;margin-left: 30px;" @click="changemoney(2)">{{$store.state.lg=='C'?'提现':'Withdrawal'}}</button>
      </span>
      <span>
        <span  @click="changelg"><span :class="$store.state.lg=='C'?'blue':''">中文/</span><span :class="$store.state.lg=='E'?'blue':''">EN</span></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span  @click="gomine" v-if="!$store.state.info">{{$store.state.lg=='C'?'未登录':'Sign in'}}</span>
        <span @click="gomine" v-if="$store.state.info"> <img style="max-height: 20px;border-radius: 50%;vertical-align: middle;" class="head" v-if="!$store.state.info.headImg " src="../../assets/touxiang.png" alt=""><img style="max-height: 20px;border-radius: 50%;vertical-align: middle;" v-if="$store.state.info.headImg "  :src=$store.state.info.headImg alt="">&nbsp;&nbsp;{{$store.state.info.realName}}</span>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="showme()">{{$store.state.lg=='C'?'个人中心':'Me'}}</span>
        <!-- <span>设置</span> -->
      </span>
      <div class="model" v-show="moneymodel">
        <div class="title">
           <p>
             <span>{{$store.state.lg=='C'&&type==1?'充值':$store.state.lg=='C'&&type==2?'提现':$store.state.lg=='E'&&type==1?'Recharge':'Withdrawal'}}</span>
           </p>
           <img src="../../assets/close.png" alt=""  @click="closeme()">
        </div>
         <span class="tips"><img src="../../assets/b_zhushi_l.png"/>{{$store.state.lg=='C'?'投资有风险，入市需谨慎':'There are risks in investment,cautious when entering the market'}}</span>
        <div class="add">

          <p>{{$store.state.lg=='C'&&type==1?'充值金额':$store.state.lg=='C'&&type==2?'提现金额':$store.state.lg=='E'&&type==1?'Recharge amount':'Withdrawal amount'}}:</p>
          <p>￥<input type="number" v-model="money"  @blur="getbuymoney()"/></p>
          <p>{{$store.state.lg=='C'?'总资产':'Total assets'}}:￥{{$store.state.info.totalMoney}}</p>
          <div v-show="type==2">
            <template >
              <el-radio v-model="value" label="1">支付宝</el-radio>
              <el-radio v-model="value" label="3">银行卡</el-radio>
            </template>
          </div>

        </div>
        <button @click="sureadd">{{$store.state.lg=='C'&&type==1?'充值':$store.state.lg=='C'&&type==2?'提现':$store.state.lg=='E'&&type==1?'Recharge':'Withdrawal'}}</button>
      </div>
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
      moneymodel:false,
      money:'',
      type:'',
      value:'1',
    }
  },
  created(){
    // this.getinfo()
  },
  mounted(){
 this.$store.state.showmodel=false;
  },
  beforeDestroy() {

  },
  methods:{
    changemoney(type){  //充值提现
         this.type=type;
        if(!this.$store.state.info.realName){
           this.$router.push({path:'/login'})
        }else{
           this.$store.state.showmodel=true;
          this.moneymodel=true;
        }
     },
     closeme(){
       this.$store.state.showmodel=false;
        this.moneymodel=false;
     },
     getbuymoney(){
       this.money=Number(this.money).toFixed(2);
       if(this.money<100){
         this.$toast(this.$store.state.lg=='C'?'充值金额需大于100元':'The recharge amount should be more than 100 yuan');
          this.money='';
       }else{
         this.money=this.money.toString()
        }
       },
    sureadd() {
        this.$confirm(this.$store.state.lg=='C'?'是否确定?':'Are you sure', this.$store.state.lg=='C'?'提示':'Tips', {
          confirmButtonText:this.$store.state.lg=='C'?'确定':'Determine',
          cancelButtonText: this.$store.state.lg=='C'?'取消':'Cancel',
          type: 'warning'
        }).then(() => {
          this.submit()
        }).catch(() => {

        });
     },
     submit(){  //提交
       let _this=this;
       if(this.type==1){
       	$.ajax({
       	 	dataType:"json", 
       	 	type:"post",
       	 	url:this.testUrl+'mobile/recharge',
       	 	data:{
       	 		uid:localStorage.getItem('uid'),
       			money:this.money
       	 	},
       	 	success:function(res){
       	   		if(res.code==201){
                 _this.closeme()
       	   		   window.open(res.data.url,'_blank');
       	   		}else{
       			 _this.$message(res.msg);
       			}
       	     },
       	     error:function(res){
       	       _this.$message(_this.$store.state.emsg);
       	     },
       	 });
       }else{
       	$.ajax({
       	 	dataType:"json", 
       	 	type:"post",
       	 	url:this.testUrl+'mobile/cashWithdrawal',
       	 	data:{
       	 		uid:localStorage.getItem('uid'),
       			money:this.money,
       			way:this.value
       	 	},
       	 	success:function(res){
       	   		if(res.code==200){
       	   		  _this.$message.success(res.data);
                 _this.closeme()
       	   		}else{
       			  _this.$message(res.msg);
       			}
       	     },
       	     error:function(res){
       	       _this.$message(_this.$store.state.emsg);
       	     },
       	 });
       }
     },
    showme(){   //个人中心
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
.model{
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
.btn{
  padding: 6px 30px;
  color: #FFFFFF;
  border: none;
}
.add{
 text-align: left;
 margin-left: 20px;
 font-size: 18px;
}
.add>p{
  margin: 20px 0;
}
.add input{
  font-size: 18px;
}
.model>button{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #007AFF;
  color: #FFFFFF;
  font-size: 20px;
  border: none;
  padding: 6px 0;
}
.tips{
  color: #007AFF;
  display: inline-block;
  margin-top: 10px;
}
.tips>img{
  max-height: 15px;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
