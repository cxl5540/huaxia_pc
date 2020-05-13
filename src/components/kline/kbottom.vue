<template>
	<div class="bootm">
    <div class="title">
      <div>
        <span v-for="item,index in type" :key='index'  :class="actve==index?'actve':''" @click="choose(index)">{{$store.state.lg=='C'?item.name:item.ename}}</span>
      </div>
    </div>
    <div  class="main" v-show="actve==0"  @scroll="listScroll0($event)">
      <ul>
          <li>{{$store.state.lg=='C'?'买入产品':'Buy products'}}</li>
           <li>{{$store.state.lg=='C'?'买入类型':'Type'}}</li>
          <li>{{$store.state.lg=='C'?'买入数量':'Buying quantity'}}</li>
          <li>{{$store.state.lg=='C'?'买入合约价':'Purchase contract value'}}</li>
          <li>{{$store.state.lg=='C'?'当前合约价值':'Last contract value'}}</li>
          <li>{{$store.state.lg=='C'?'浮动盈亏':'Floating P/L'}}</li>
          <li>{{$store.state.lg=='C'?'买入时间':'Date'}}</li>
          <li>{{$store.state.lg=='C'?'订单号':'Order number'}}</li>
          <li>平仓</li>
      </ul>
      <ul  v-for="item,index in list1">
          <li>{{$store.state.lg=='C'?item.productName:item.englishName}}</li>
          <li v-show="$store.state.lg=='C'">买入类型:{{item.buy_type_id==17?'买跌':'买涨'}}</li>
           <li v-show="$store.state.lg=='E'">Type:{{item.buy_type_id==17?'buy put':'buy up'}}</li>
          <li>{{item.buy_count}}</li>
          <li>{{item.buy_index}}</li>
          <li>{{item.currValue}}</li>
          <li :class="item.profitLossStatus==1?'up':'down'">￥{{item.profitLossStatus==1?'+':'-'}}{{item.closePositionProfitLoss}}</li>
          <li>{{item.create_time}}</li>
          <li>{{item.order_number}}</li>
          <li class="pc" @click="sell(item)">{{$store.state.lg=='C'?'立即平仓':'Close'}}</li>
      </ul>
    </div>
    <div class="main" v-show="actve==1"  @scroll="listScroll1($event)">
      <ul >
          <li>{{$store.state.lg=='C'?'交易产品':'Trading products'}}</li>
          <li>{{$store.state.lg=='C'?'交易类型':'Transaction type'}}</li>
          <li>{{$store.state.lg=='C'?'平仓数量':'Buying quantity'}}</li>
          <li>{{$store.state.lg=='C'?'平仓合约价值':'Purchase contract value'}}</li>
          <li>{{$store.state.lg=='C'?'交易手续费':'Transaction fee'}}</li>
          <li>{{$store.state.lg=='C'?'交易保证金':'Bond'}}</li>
          <li>{{$store.state.lg=='C'?'平仓盈亏':'Bond'}}</li>
          <li>{{$store.state.lg=='C'?'平仓时间':'Date'}}</li>
          <li>{{$store.state.lg=='C'?'订单号':'Order number'}}</li>
      </ul>
      <ul v-for="item,index in list2">
          <li>{{$store.state.lg=='C'?item.productName:item.englishName}}</li>
          <li>{{item.positionTypeName}}</li>
          <li>{{item.sellCount}}</li>
          <li>{{item.sellMoney}}</li>
          <li>￥{{item.serviceCharge}}</li>
          <li>￥{{item.returnBond}}</li>
          <li :class="item.profitLossStatus==1?'up':'down'">￥{{item.profitLossStatus==1?'+':'-'}}{{item.closePositionProfitLoss}}</li>
          <li>{{item.sellCreateTime}}</li>
          <li>{{item.sellNumber}}</li>
      </ul>
    </div>
    <div class="main"  v-show="actve==2"  @scroll="listScroll2($event)">
      <ul>
          <li>{{$store.state.lg=='C'?'入金类型':'Gold type'}}</li>
          <li>{{$store.state.lg=='C'?'入金方式':'Gold Way'}}</li>
          <li>{{$store.state.lg=='C'?'入金金额':'Amount'}}</li>
          <li>{{$store.state.lg=='C'?'订单号':'Order number'}}</li>
          <li>{{$store.state.lg=='C'?'入金时间':'Date'}}</li>
      </ul>
      <ul  v-for="item,index in list3">
          <li>{{item.type_id==9?'充值':item.type_id==10?'卖出':item.type_id==11?'提现':item.type_id==12?'买入恒指':item.type_id==13?'买入沪深300':item.type_id==14?'买入美原油':'买入黄金'}}</li>
          <li>{{item.remark}}</li>
          <li class="up">￥{{item.money}}</li>
          <li>{{item.order_num}}</li>
          <li>{{item.create_time}}</li>
      </ul>
    </div>
    <div class="main" v-show="actve==3"  @scroll="listScroll3($event)">
      <ul>
          <li>{{$store.state.lg=='C'?'出金类型':'Gold type'}}</li>
          <li>{{$store.state.lg=='C'?'出金方式':'TGold Way'}}</li>
          <li >{{$store.state.lg=='C'?'出金金额':'Amount'}}</li>
          <li>{{$store.state.lg=='C'?'订单号':'Order number'}}</li>
          <li>{{$store.state.lg=='C'?'出金时间':'Date'}}</li>
      </ul>
      <ul   v-for="item,index in list4">
         <li>{{item.type_id==9?'充值':item.type_id==10?'卖出':item.type_id==11?'提现':item.type_id==12?'买入恒指':item.type_id==13?'买入沪深300':item.type_id==14?'买入美原油':'买入黄金'}}</li>
         <li>{{item.remark}}</li>
         <li class="down">￥{{item.money}}</li>
         <li>{{item.order_num}}</li>
         <li>{{item.create_time}}</li>
      </ul>
    </div>
    <div class="buy" v-show="showbuy">
      <div class="title">
         <p>
           <span>{{detaildata.productName}}</span>
         </p>
         <img src="../../assets/close.png" alt="" @click="colsebuy()">
      </div>
      <div class="money">
        <p>{{$store.state.lg=='C'?'选择手数':'Select number of hands'}}</p>
        <span v-for="item,index in ss" @click="choosess(item,index)" :class="actve1==index?'choose':''">{{item}}手</span>
         <span  :class="actve1=='f'?'choose':''"><input :class="actve1=='f'?'choose':''" type="num" v-model="shousu" @focus="shuru()" @blur="getshousu()"></span>
        <div class="buydel">
           <p><span>{{$store.state.lg=='C'?'交易产品':'Trading products'}}:</span><span>{{detaildata.productName}}</span></p>
          <p  :class="detaildata.buyTypeId=='1'?'up':'down'" v-if="$store.state.lg=='C'"><span>买入类型:</span>{{detaildata.buyTypeId==16?'买涨':'买跌'}}</p>
          <p  :class="detaildata.profitLossStatus=='1'?'up':'down'" v-if="$store.state.lg=='E'" ><span>Type:</span>{{detaildata.buyTypeId==16?'Buy up':'Buy put'}}</p>
           <p><span>{{$store.state.lg=='C'?'买入数量':'Buying quantity'}}:</span><span>{{detaildata.buyCount}}</span></p>
          <p><span>{{$store.state.lg=='C'?'买入合约价':'Purchase contract value'}}:</span><span>{{detaildata.buyIndex}}</span></p>
          <p><span>{{$store.state.lg=='C'?'当前合约价值':'Last contract value'}}:</span><span>{{detaildata.currValue}}</span></p>
          <p><span>{{$store.state.lg=='C'?'买入时间':'Date'}}:</span><span>{{detaildata.createTime}}</span></p>
          <p><span>{{$store.state.lg=='C'?'交易手续费':'Transaction fee'}}:</span><span>￥{{detaildata.transactionFee}}</span></p>
          <p><span>{{$store.state.lg=='C'?'平仓盈亏':'Bond'}}:</span><span>￥{{detaildata.closePositionProfitLoss}}</span></p>
        <!--  <p>合计金额：100</p> -->
        </div>
        <div class="btn" @click="surebuy">
          <button style="background: #007AFF;">{{$store.state.lg=='C'?'确认卖出':'Confirm sell'}}</button>
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
       page1:1,page2:1,page3:1,page4:1,
       last_page1:'',last_page2:'',last_page3:'',last_page4:'',
       list1:'',list2:'',list3:'',list4:'',
      actve:0,
       actve1:0,
      showbuy:false,
       ss:['1','2','3','5','10'],
       shousunum:1,
       shousu:'',
       orderNumber:'',
       detaildata:'',
	    type:[{ name:'持仓',ename:'Position'},{name:'交易明细',ename:'Transaction record'},{name:'入金明细',ename:'Deposit Detailed'},{name:'出金明细',ename:'Expend Detailed'}],
	    }
	  },
	  created(){
      this.getchicang()
	  },
	  mounted(){
 // this.getChartInfo()

	  },
	  watch:{
      shousunum(val){
        console.log(val)
        if(val){
          this.getmoney(val)
        }
      }
	  },
	  beforeDestroy(){
	  },
	  methods:{
      choose(index){ //头部切换
        this.actve=index;
        if(this.actve==0){  //持仓
          this.getchicang(this.page1)
        }else if(this.actve==1){ //结算
          this.getjiesuan(this.page2)
        }else if(this.actve==2){ //入金
          this.getGoldenDetail(this.page3)
        }else{  //出金
          this.getWithdrawDetail(this.page4)
        }
      },
      sell(item){
        this.$store.state.showmodel=true;
        this.showbuy=true;
        this.orderNumber=item.order_number;
        this.getmoney(1)
      },
      colsebuy(){
        this.$store.state.showmodel=false;
        this.showbuy=false;
      },
      choosess(item,index){ //选择手数
        this.actve1=index;
        this.shousunum=index+1;
        this.shousu='';
      },
      colsebuy(){
        this.$store.state.showmodel=false;
        this.showbuy=false;
      },
        getshousu(){ //输入手数
        if(this.shousu=='1'||this.shousu=='2'||this.shousu=='3'||this.shousu=='5'||this.shousu=='10'||this.shousu=='0'){
          var msg='';
          msg='请输入其他手数值'
          this.$message.error(msg);
           this.shousu='';
        }else{
           this.actve1='f';
          this.shousunum=this.shousu;
           this.shousu=this.shousu+'手';
           if(this.$store.state.lg=='C'){
               this.shousu=this.shousu+'手';
           }else{
              this.shousu=this.shousu+'hans';
           }
        }
       },
        shuru(){ //获取手数焦点
          this.shousu='';
          this.actve1=undefined;
        },
      getmoney(val){  //计算合约价值和保证金等
        let _this=this;
          		$.ajax({
        		 	dataType:"json", 
        		 	type:"get",
        		 	url:this.testUrl+'product/getOrderdetail',
        		 	data:{
        		 		uid:localStorage.getItem('uid'),
                orderNumber :this.orderNumber,
                sellCount :val,
                // buyMoney:Number(val)*Number(this.lastP)*Number(this.lowestPrice),
        		 	},
        		 	success:function(res){
              		if(res.code==200){
                   _this.detaildata=res.data;
              		}else if(res.code==400){
                   var msg='';
                   _this.$store.state.lg=='C'?msg=res.msg:msg='The sold quantity cannot be greater than the purchased quantity'
                    _this.$message(msg);
                 }

                },
                error:function(res){
                  _this.$message(_this.$store.state.emsg);
                },
        		 });
      },
      surebuy(){
        this.$confirm('是否确定平仓, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submit(){
       if(this.shousunum>this.detaildata.buyCount){
         var msg='';
         this.$store.state.lg=='C'?msg='卖出数量不能大于买入数量':msg='The sold quantity cannot be greater than the purchased quantity'
         this.$message(msg);
         return false;
       }
      	let _this=this;
        		$.ajax({
      		 	dataType:"json", 
      		 	type:"post",
      		 	url:this.testUrl+'product/sellOrder',
      		 	data:{
      		 		uid:localStorage.getItem('uid'),
              sellNumber: this.detaildata.sellNumber,
      		 	},
      		 	success:function(res){
            		if(res.code==200){
                  _this.colsebuy();
            		  _this.$message.success('已平仓')
            		}
              },
              error:function(res){
              _this.$message(_this.$store.state.emsg);
              },
      		 });
       },
      getchicang(page1){  //获取持仓数据
        let _this=this;
        	$.ajax({
         	dataType:"json", 
         	type:"get",
         	url:this.testUrl+'product/getAccountPosition',
         	data:{
         		uid:localStorage.getItem('uid'),
         		num:this.page1,
         		size:10
         	},
         	success:function(res){
             		if(res.code==200){
             			_this.last_page1=res.data.pages;
             			 if(_this.page1==1){
             			   _this.list1=res.data.records;
             			 }else{
             			 	for(var i=0;i<res.data.records.length;i++){
             			 		 _this.list1.push(res.data.records[i])
             			 	}
             			 }
             		}else if(res.code==400){
             		    _this.$message.error(res.msg);
             		}
               },
               error:function(res){
                 _this.$message.error(_this.$store.state.emsg);
               },
         });
      },
      getjiesuan(page2){
      	let _this=this;
      		$.ajax({
      	 	dataType:"json", 
      	 	type:"get",
      	 	url:this.testUrl+'product/getSellList',
      	 	data:{
      	 		uid:localStorage.getItem('uid'),
      	 		num:this.page2,
      	 		size:10,
      	 	},
      	 	success:function(res){
             		if(res.code==200){
             			$('#loading').hide()
             			_this.last_page2=res.data.pages;
             			if(_this.page2==1){
             			    _this.list2=res.data.records;
             			 }else{
             			 	for(var i=0;i<res.data.records.length;i++){
             			 		 _this.list2.push(res.data.records[i])
             			 	}
             			 }
             		}else if(res.code==400){
             		  _this.$message.error(res.msg);
             		}
               },
               error:function(res){
               _this.$message.error(_this.$store.state.emsg);
               },
      	 });
      },
      getGoldenDetail(page3){   //入金
      	let _this=this;
      		$.ajax({
      	 	dataType:"json", 
      	 	type:"get",
      	 	url:this.testUrl+'mobile/getGoldenDetail',
      	 	data:{
      	 		uid:localStorage.getItem('uid'),
      	 		num:this.page3,
      	 		size:10
      	 	},
      	 	success:function(res){
             		if(res.code==200){
             			_this.last_page3=res.data.pages;
      				if(_this.page3==1){
             			   _this.list3=res.data.records;
             			 }else{
             			 	for(var i=0;i<res.data.records.length;i++){
             			 		 _this.list3.push(res.data.records[i])
             			 	}
             		  }
                  console.log( _this.list3)
             		}
               },
               error:function(res){
               _this.$message.error(_this.$store.state.emsg);
               },
      	 });
      },
      getWithdrawDetail(page4){   //出金
      	let _this=this;
      		$.ajax({
      	 	dataType:"json", 
      	 	type:"get",
      	 	url:this.testUrl+'mobile/getWithdrawDetail',
      	 	data:{
      	 		uid:localStorage.getItem('uid'),
      	 		num:this.page4,
      	 		size:10
      	 	},
      	 	success:function(res){
             		if(res.code==200){
             			_this.last_page4=res.data.pages;
      				if(_this.page4==1){
             			   _this.list4=res.data.records;
             			 }else{
             			 	for(var i=0;i<res.data.records.length;i++){
             			 		 _this.list4.push(res.data.records[i])
             			 	}
             		    }
             		}

               },
               error:function(res){
               _this.$message.error(_this.$store.state.emsg);
               },

      	 });
      },
      listScroll0($event) {  //下拉加载  持仓
            var _this = this
            if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
              this.page1++
              if(this.page1<=this.last_page1){
                this.getchicang();
                console.log("到底")
              }
            }
        },
      listScroll1($event) {  //下拉加载 结算
            var _this = this
            if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
              this.page2++
              if(this.page2<=this.last_page2){
                this.getjiesuan();
                console.log("到底")
              }
            }
        },
        listScroll2($event) {  //下拉加载 入金
              var _this = this
              if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
                this.page3++
                if(this.page3<=this.last_page3){
                  this.getGoldenDetail();
                  console.log("到底")
                }
              }
          },
          listScroll3($event) {  //下拉加载 出金
                var _this = this
                if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
                  this.page4++
                  if(this.page4<=this.last_page4){
                    this.getWithdrawDetail();
                    console.log("到底")
                  }
                }
            },
	    },
	 }
</script>

<style scoped>
.bootm{
		height: 26vh;

		background: #1B1B1B;
    border-top: 3px solid #000000;
		width: 100%;
		min-width: 1200px;
    position: absolute;
    bottom: 0;
    left: 0;
    /* s */
}
.main{
  	height:16vh;
    overflow-y: scroll;
    padding-bottom: 70px;
    padding-top: 70px;
}
.main>ul:nth-child(1){
  width: 100%;
  position: absolute;
  left: 0;
  top:40px;
  background: #000;
}
.choose{
  background:#6699FF;
  color: #fff !important;
  border:1px solid #6699FF !important;
}
.title{
      background:#252525 ;
      text-align: left;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    }
   .title>img{
      max-height: 18px;
    }
 .title span{
   margin: 0 30px;
   cursor: pointer;
   font-size: 16px;
 }
 .actve{
   color: #6699FF;
 }
 ul{
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #252525;
 }
ul>li{
   text-align: center;
   width: 25%;
   margin: 4px 0;
   font-size: 12px;
 }
 .pc{
   color: #6699FF;
   cursor: pointer;
 }
 .buy{
     width: 600px;
     height:600px;
     position: absolute;
     top: 50%;
     left: 50%;
     margin-left: -300px;
     margin-top: -700px;
     z-index: 100 !important;
     background: #2B2B2B;
     font-size: 14px;
     box-sizing: border-box;
   }
   .buydel>p{
    margin: 20px 10px;
   }
   .buydel>p>span{
     display: inline-block;

   }
    .buydel>p>span:nth-child(1){
       width: 120px;
    }
    .buydel>p>span:nth-child(2){
       width: 220px;
    }
    .btn{
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .btn>button{
      width: 100%;
      color: #FFFFFF;
      height:50px;
      border: none;
      font-size: 16px;
      font-weight: bold;
      outline: none;
    }
   .money{
     text-align: left;
     box-sizing: border-box;
     padding: 60px 20px 0;
   }
   .money>span{
     display: inline-block;
     border: 1px solid #CCCCCC;
     color: #CCCCCC;
     width:80px;
     margin: 10px 20px 10px 10px;
     height: 24px;
     font-size:14px;
     text-align: center;
     line-height:24px;
     border-radius: 6px;
     cursor: pointer;
   }
   .money>span>input{
     display: inline-block;
     width:80px;
      height: 24px;
     color: #6699FF;
     text-align: center;
     font-size: 14px;
      border-radius: 6px;
     border: none;
     outline: none;
   }
</style>
