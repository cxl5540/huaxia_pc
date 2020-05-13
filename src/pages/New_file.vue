<template>
	<div class="mid">
    <div class="title">
      <div>
        <span v-for="item,index in type" :key='index'  :class="actve==item.num?'actve':'0'" @click="choose(item.num,index)">{{item.name}}</span>
      </div>
      <div>
        <span @click="book">+新增订单</span>
      </div>
    </div>
    <div class="kline"  id='maink'>
       <div v-show="actve=='a'">
          11133333
          <div id="echartContainermin" ref="echartContainermin"  style="width:100%; height:400px"></div>

       </div>
       <div  v-show="actve=='b'">
         222
          <div id="echartContainer15" ref="echartContainer15"  style="width:100%; height:400px"></div>
       </div>
       <div  v-show="actve=='c'">
         333
          <div id="echartContainer30" ref="echartContainer30"  style="width:100%; height:400px"></div>
       </div>
       <div  v-show="actve=='d'">
         444
         	<div id="echartContainer60" ref="echartContainer60"  style="width:100%; height:400px"></div>
       </div>
       <div  v-show="actve=='e'">
         77
         <div id="echartContainerday" ref="echartContainerday"  style="width:100%; height:400px"></div>
       </div>
    </div>
   <div class="book" v-show="bookshow">
      <div class="title">
         <p>
           <span>用户协议</span>
         </p>
<!--         <img src="../../assets/close.png" alt="" @click="closeyhxy"> -->
      </div>
     <div class="main" v-if="!viewshow">
     	<p>华夏金服</p>
      <p style="text-align: justify;">一、我们如何收集和使用您的个人信息 个人信息是指以电子或者其他方式记录的能够单独或者与 其他信息结合识别特定自然人身份或者反映特定自然人活 动情况的各种信息。本协议中涉及的个人信息包括:基本信息(包括个人姓名、生日、性别、住址、个人电话号码、电子邮箱) ;个人身份信息(包括身份证、军官证、护照、驾驶证等) ;网络身份标识信息(包括系统账号、IP地址、邮箱地址及与前述有关的密码、口令、口令保护答案) ;个人财产信息(交易和消费记录、以及余额、优惠券);通讯录;个人上网记录(包括网站浏览记录、软件使用记录、点击记录) ;个人常用设备信息(包括硬件型号、设备MAC地址、操作系统类型、软件列表唯一设备识别码(如MEl/android ID/IDFA/OPENUDID/GUID、SIM卡IMSI信息等在内的描述个人常用设备基本情况的信息) ;个人位置信息(包括行程信息、精准定位信息、住宿信息、经纬度等) ;个人敏感信息是指一-旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，本协议中涉及的个人敏感信息包括:您的财产信息(包括交易记录、优惠券) ;个人身份信息(包括身份证、军官证、护照、驾驶证、户口本) ;网络身份识别信息(包括账户名账户昵称) ;其他信息(包括通讯录、行程信息、网页浏览记录住宿信息、精准定位信息)。我们仅会出于以下目的，收集和使用您的个人信息: (一)您须授权我们收集和使用您个人信息的情形 我们的产品与/或服务包括一些核心功能，这些功能包含了 实现网_上购物所必须的功能、改进我们的产品与/或服务所 必须的功能及保障交易安全所必须的功能。我们可能会收 集、保存和使用下列与您有关的信息才能实现上述这些功能.</p>
     </div>
    <div class="main" v-show="viewshow">
    	<p>签署交易协议</p>
    	<p style="color: red;">现金交易高风险提示！</p>
    	<p>期货具有高风险，并非适于所有的投资人。交易亏损金额也许会大于您的初始投资。交易期货之前，请仔细阅读相关规定及风险条款;平台使用保证金进行交易，仅适用于可承受高风险的投资人交易之前请确保您具备风险承受能力。期货采用撮合制交易模式，投资者盈亏取决于其对期货市场多空行情判断和交易技术水平，平台仅作为交易工具提供方，投资过程中可能出现因行情波动剧烈而导致实际亏损金额大于缴纳保证金金额，平台与投资者亏并无相关。期市有风险，投资需谨慎，适可而止，风险自担。如有异议，请不要参与交易!</p>
    	<p @click="view" style="text-align: left;color: #007AFF;cursor: pointer;">《平台风险告知书》<span>查看</span></p>
    </div>
      <button @click="agree">已阅读并同意</button>
    </div>
    <div class="buy" v-show="showbuy">
      <div class="title">
         <p>
           <span>没黄金</span>
         </p>
      <!--   <img src="../../assets/close.png" alt="" @click="colsebuy()"> -->
      </div>
      <div class="money">
        <p>选择手数</p>
        <span v-for="item,index in ss" @click="choosess(item,index)" :class="actve1==index?'choose':''">{{item}}手</span>
         <span  :class="actve1=='f'?'choose':''"><input :class="actve1=='f'?'choose':''" type="num" v-model="shousu" @focus="shuru()" @blur="getshousu()"></span>
        <p style="border-bottom: 1px solid #666666;padding-bottom: 20px;">注:1手=11*22</p>
        <div class="buydel">
           <p><span>买入产品:</span><span>没黄金</span></p>
          <p><span>买入类型:</span><span>买涨</span></p>
          <p><span>买入合约价:</span><span>111111</span></p>
          <p><span>当前合约价值:</span><span>22222</span></p>
          <p><span>交易手续费:</span><span>33333</span></p>
          <p><span>交易保证金:</span><span>44444</span></p>
          <p>合计金额：100</p>
        </div>
        <div class="btn" @click="surebuy">
          <button style="background: firebrick;">买涨</button>
          <button style="background: green;">买跌</button>
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
       screenWidth: '',
      viewshow:true,
      bookshow:false,
      ss:['1','2','3','5','10'],
       actve:'a',
       actve1:0,
       shousunum:1,
       shousu:'',
       showbuy:false,
      type:[{ name:'分时', num:'a',},{name:'15分', num:'b',},{ name:'30分', num:'c',},{name:'1小时', num:'d',},{name:'日k',num:'e',}],
      a:5,
      b:30,
      option: null,
       mindata:'',
       myChart1:'',
       myChart2:'',
       myChart3:'',
       myChart4:'',
       myChart5:'',
       ftimeArr:'',
      ftimeArr60:'',
      timer:'',
      nowtime:this.$store.state.lg=='C'?'时间:':'  Time:',
      nowprice:this.$store.state.lg=='C'?'当前价:':'Last:',
      nownum:this.$store.state.lg=='C'?'交易量:':'Vol:',
      edate:this.$store.state.lg=='C'?'时间:':'Date:',
      eopen:this.$store.state.lg=='C'?'开盘:':'Open:',
      eclose:this.$store.state.lg=='C'?'收盘:':'Colse:',
      elow:this.$store.state.lg=='C'?'最低:':'Low:',
      ehigh:this.$store.state.lg=='C'?'最高:':'High:',
      productCode:this.$route.query.productCode?this.$route.query.productCode:'COMEXGC'
    }
  },
  watch: {
    actve: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
       if(val=='a'){  //5分钟
          this.a=5;
          this.time_arr();
        	this.getKLineMinute()
        }else if(val=='b'){  //15分钟
          this.a=15;
          this.time_arr();
          this.getKLineMinute();
        }else if(val=='d'){  //60分钟
          this.b=60;
          this.time_arr60()
          this.getKLineMinute60(val)
        }else if(val=='e'){  //一天
          this.getKLineHour();
        }else if(val=='c'){//30分钟
          this.b=30;
          this.time_arr60();
          this.getKLineMinute60(val)
        }
       },
      screenWidth(val){
         this.screenWidth=val;
       if(this.myChart1){
          this.myChart1.resize();
         }
         if(this.myChart2){
          this.myChart2.resize();
         }
         if(this.myChart3){
          this.myChart3.resize();
         }
         if(this.myChart4){
          this.myChart4.resize();
         }
         if(this.myChart5){
          this.myChart5.resize();
         }
       }
    },
  created(){
    this.time_arr();
    	this.getKLineMinute()
  },
  mounted(){
      const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.getElementById("maink").clientWidth
            that.screenWidth = window.screenWidth
        })()
    }
    this.screenWidth=document.getElementById("maink").clientWidth
  },
  beforeDestroy(){
  },
  methods:{
    choose(num,index){
      this.actve=num;
    },
    closeyhxy(){ //关闭用户协议
       this.bookshow=false;
       this.$store.state.showmodel=false;
    },
    book(){ //打开用户协议
      this.bookshow=true;
      this.$store.state.showmodel=true;
    },
    view(){
      this.viewshow=!this.viewshow;
    },
    agree(){
      // this.viewshow==true?this.bookshow=false:this.viewshow=true;
      if(this.viewshow==true){
        this.bookshow=false;
        this.showbuy=true;
        this.$store.state.showmodel=true;
      }else{
        this.viewshow=true
      }
    },
    choosess(item,index){ //选择手数
      this.actve1=index;
      this.shousunum=index+1;
      this.shousu='';
       // this.getmoney();
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
         // if(this.$store.state.lg=='C'){
         //     this.shousu=this.shousu+'手';
         // }else{
         //    this.shousu=this.shousu+'hans';
         // }

      }
     },
      shuru(){ //获取手数焦点
        this.shousu='';
        this.actve1=undefined;
      },
      surebuy() {
            this.$confirm('是否确定买入, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
         },
    addTimeStr(time,num){   //计算时间
		  var hour=time.split(':')[0];
		  var mins=Number(time.split(':')[1]);
		  var mins_un=parseInt((mins+num)/60);
		  var hour_un=parseInt((Number(hour)+mins_un)/24);
		  if(mins_un>0){
		    if(hour_un>0){
		      var tmpVal=((Number(hour)+mins_un)%24)+"";
		      hour=tmpVal.length>1? tmpVal:'0'+tmpVal;//判断是否是一位
		    }else{
		      var tmpVal=Number(hour)+mins_un+"";
		      hour=tmpVal.length>1? tmpVal:'0'+tmpVal;
		    }
		    var tmpMinsVal=((mins+num)%60)+"";
		    mins=tmpMinsVal.length>1? tmpMinsVal:0+tmpMinsVal;//分钟数为 取余60的数
		  }else{
		    var tmpMinsVal=mins+num+"";
		    mins=tmpMinsVal.length>1? tmpMinsVal:'0'+tmpMinsVal;//不大于整除60
		  }
		  return hour+":"+mins;
		},
		  getNextTime(startTime, endTIme, offset, resultArr) {//计算时间
		    var result = this.addTimeStr(startTime, offset);
		    resultArr.push(result);
		    if (result == endTIme) {
		      return resultArr;
		    } else {
		      return this.getNextTime(result, endTIme, offset, resultArr);
		    }
		  },
		  time_arr(){ //计算时间
		  	if(this.productCode){    //没黄金
		  		 var timeArr = new Array();
			      timeArr.push('07:00');
			      timeArr.concat(this.getNextTime('07:00', '23:45', this.a, timeArr));
			      timeArr.push('00:00');
			      timeArr.concat(this.getNextTime('00:00', '04:15',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else if(this.productCode=='NYMEXCL' || this.productCode=='NYMEXNG'
        || this.productCode=='COMEXSI'|| this.productCode=='COPPER'|| this.productCode=='CMENQ'
        || this.productCode=='SZ161125' || this.productCode=='USA30'|| this.productCode=='AUDCAD'
        || this.productCode=='GBPAUD' || this.productCode=='CMEEC'|| this.productCode=='SPX500'){

          //美原油,天然气，美白银，黄铜，纳斯达克指数，标普500，道琼斯指数，澳元，英镑，欧元
		  		 var timeArr = new Array();
			      timeArr.push('06:00');
			      timeArr.concat(this.getNextTime('06:00', '23:45',this.a, timeArr));
			      timeArr.push('00:00');
			      timeArr.concat(this.getNextTime('00:00', '05:00',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else if(this.productCode=='BTC'||this.productCode=='ETH'||this.productCode=='EOS'||this.productCode=='LTC'){
              var timeArr = new Array();
              timeArr.push('00:00');
              timeArr.concat(this.getNextTime('00:00', '23:45',this.a, timeArr));
              this.ftimeArr=timeArr;
        }else if(this.productCode=='CFFEXIF'){  //沪深
		  		 var timeArr = new Array();
		  		 timeArr.push('09:30');
			      timeArr.concat(this.getNextTime('09:30', '11:15',this.a, timeArr));
			      timeArr.push('13:00');
			      timeArr.concat(this.getNextTime('13:00', '15:15',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else if(this.productCode=='EUREXDAX'){  //德国DAX指数   FDAX
		  		 var timeArr = new Array();
		  		 timeArr.push('08:15');
			      timeArr.concat(this.getNextTime('08:15', '23:45',this.a, timeArr));
			      timeArr.push('00:00');
			      timeArr.concat(this.getNextTime('00:00', '04:15',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else{      //恒生
		  		 var timeArr = new Array();
		  		   timeArr.push('09:15');
			       timeArr.concat(this.getNextTime('09:15', '12:00',this.a, timeArr));
			       timeArr.push('13:00');
			       timeArr.concat(this.getNextTime('13:00', '16:30',this.a, timeArr));
			        timeArr.push('17:15');
			       timeArr.concat(this.getNextTime('17:15', '23:45',this.a, timeArr));
			        timeArr.push('00:00');
			       timeArr.concat(this.getNextTime('00:00', '03:00',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}
		  },
		  time_arr60(){ //计算时间
		  	if(this.productCode=='COMEXGC'){    //没黄金
		  		 var timeArr = new Array();
            timeArr.push('07:00');
            timeArr.concat(this.getNextTime('07:00', '23:00',this.b, timeArr));
            timeArr.push('00:00');
            timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
            this.ftimeArr60=timeArr;
		  	}else if(this.productCode=='NYMEXCL' || this.productCode=='NYMEXNG'|| this.productCode=='COMEXSI'
        || this.productCode=='COPPER'|| this.productCode=='CMENQ'
        || this.productCode=='SZ161125'|| this.productCode=='USA30'|| this.productCode=='AUDCAD'
        || this.productCode=='GBPAUD'|| this.productCode=='CMEEC'|| this.productCode=='SPX500'){
              //美原油，天然气，美白银，黄铜，纳斯达克指数，标普500，道琼斯指数，澳元，英镑，欧元
          var timeArr = new Array();
          timeArr.push('06:00');
          timeArr.concat(this.getNextTime('06:00', '23:00',this.b, timeArr));
          timeArr.push('00:00');
          timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
		  	}else if(this.productCode=='BTC'||this.productCode=='ETH'||this.productCode=='EOS'||this.productCode=='LTC'){
          var timeArr = new Array();
          timeArr.push('00:00');
          timeArr.concat(this.getNextTime('00:00', '23:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
        }else if(this.productCode=='CFFEXIF'){  //沪深
		  		 var timeArr = new Array();
		  		 timeArr.push('10:00');
          timeArr.concat(this.getNextTime('10:00', '11:00',this.b, timeArr));
          timeArr.push('13:00');
          timeArr.concat(this.getNextTime('13:00', '15:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
		  	}else if(this.productCode=='CFFEXIF'){  //德国DAX指数   FDAX
		  		var timeArr = new Array();
		  		timeArr.push('08:00');
          timeArr.concat(this.getNextTime('08:00', '24:00',this.b, timeArr));
          timeArr.push('00:00');
          timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
		  	}else{      //恒生
		  		 var timeArr = new Array();
           timeArr.push('10:00');
           timeArr.concat(this.getNextTime('10:00', '11:00',this.b, timeArr));
           timeArr.push('13:00');
           timeArr.concat(this.getNextTime('13:00', '16:00',this.b, timeArr));
           timeArr.push('18:00');
           timeArr.concat(this.getNextTime('18:00', '23:00',this.b, timeArr));
           timeArr.push('00:00');
           timeArr.concat(this.getNextTime('17:15', '01:00',this.b, timeArr));
           this.ftimeArr60=timeArr;
		  	}
		  },
  getKLineMinute(){  //获取5、15分时线
      let url='';
      if(this.a==5){
        url=this.testUrl+'product/getKLineMinute'
      }else if(this.a==15){
         url=this.testUrl+'product/getKLineFifteenMinute'
      }
      let data={
        productCode:this.$route.query.productCode?this.$route.query.productCode:'COMEXGC',
      }
      let _this=this;
       $.ajax({
         url:url,
          dataType:"json",   
          data:data,    //参数值
          type:"get",   //请求方式
          success:function(res){
            if(res.code==200){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let close_px=[];
             let avg_px=[];
             let volume=[];
              for(let p of res.data){
            	p.D=p.D.split(':')[0]+':'+p.D.split(':')[1];
            	p.D=p.D.split(' ')[1]
               categoryData.push(p.D)  //拆分' ' 去掉分时
               close_px.push({'value':Number(p.C).toFixed(2),'volume':p.V});
//                   volume.push(p.V);
               volume.push({'value':p.V,'close':p.C,'yclose':p.VC,})
             }
            var dataattr=[];
           _this.$store.state.lg=='C'?dataattr[0]='当前价':dataattr[0]='Last';
            var option = {
             color: ['#1E90FF'],
             backgroundColor: '#fff',
             tooltip: {
             trigger: "axis",
             axisPointer: {type: "cross"},
             formatter:function(res){
              if(res.length&&res[0].seriesType=='line'){
                return _this.nowtime+ res[0].axisValue+ '<br/>' +
                       _this.nowprice + res[0].data.value + '<br/>' +
                       _this.nownum + res[0].data.volume + '<br/>'
              }else{
                return  _this.nowtime+ res[0].axisValue+ '<br/>' +
                       _this.nowprice+ res[0].data.close + '<br/>' +
                        _this.nownum+ res[0].data.value + '<br/>'
                }
               }
          },
       dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100
        },
        {
          show: false,
          type: "slider",
//     y: "90%",
          start:0,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 0,
          end: 100
        },
      ],
        legend: {
        top: 10,
        data:dataattr,
        textStyle: {
         fontSize: 12,
         color: '#1E90FF'
        },
    },
      grid: [
        {
          left: "3%",
          top: "3%",
          height: "50%"
        },
        {
          left: "1%",
          right: "10%",
          top: "54%",
          height: "10%"
        }
      ],
      xAxis: [
        {
          data: _this.ftimeArr,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },
        splitNumber: 100
        },
        {
          gridIndex: 1,
          data:_this.ftimeArr,
          axisLabel: {
          show: false,
           }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },
          },
          position: "right",
        },
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
              widith:1
            }
          },
          position: "right"
        }
      ],
      series: [
        {
          name:dataattr[0],
          type: "line",
          data: close_px,
          smooth: false,
           showSymbol: false,
          lineStyle: {
            normal: {
					opacity: 0.8,
					color: '#39afe6',
					width: 1
				    }
          },
          areaStyle: {
            normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					  offset: 0,
						color: 'rgba(0, 136, 212, 0.7)'
						},{
						offset: 0.8,
						color: 'rgba(0, 136, 212, 0.02)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowBlur: 10
					 }
          }
        },
        {
          name: '成交量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volume,
          itemStyle: {
              normal: {
	            color: function(params) {
	                var colorList;
	               if (params.data.close-params.data.yclose >0) {
	                  colorList = "#FD1050";
	                } else {
	                  colorList = "#00da3c";
	                }
	                return colorList;
	              }
	            }
          },

        },
        ]
    }

    if(_this.a==5){
      _this.myChart1 = echarts.init(_this.$refs.echartContainermin);
       _this.myChart1.setOption(option);
        _this.myChart1.resize()
    }else if(_this.a==15){
      _this.myChart2 = echarts.init(_this.$refs.echartContainer15);
       _this.myChart2.setOption(option);
        _this.myChart2.resize()
    }
     }else if(res.code==402){
           _this.$message.error(res.msg);
       }else if(res.code==401){
           _this.$message.error(res.msg);
       }
     },
        error:function(){        
        }
      });
   },
   getKLineMinute60(val){  //获取30,60时线
   let url='';
   val=='c'?url=this.testUrl+'product/getKLineHourMinute':url=this.testUrl+'product/getKLine30Minute'
       // let url=this.testUrl+'product/getKLineHourMinute'
         let data={
           productCode:this.$route.query.productCode?this.$route.query.productCode:'COMEXGC',
         }
         let _this=this;
          $.ajax({
            url:url,
             dataType:"json",   
             data:data,    //参数值
             type:"get",   //请求方式
             success:function(res){
               if(res.code==200){
               _this.mindata=res.data;
                let categoryData = [];
                let values = [];
                let close_px=[];
                let avg_px=[];
                let volume=[];
                 for(let p of res.data){
               	p.D=p.D.split(':')[0]+':'+p.D.split(':')[1];
               	p.D=p.D.split(' ')[1]
                  categoryData.push(p.D)  //拆分' ' 去掉分时
                  close_px.push({'value':Number(p.C).toFixed(2),'volume':p.V});
//                   volume.push(p.V);
                  volume.push({'value':p.V,'close':p.C,'yclose':p.VC,})
                }
         var dataattr=[];
         _this.$store.state.lg=='C'?dataattr[0]='当前价':dataattr[0]='Last';
        var option = {
            color: ['#1E90FF'],
            backgroundColor: '#fff',
            tooltip: {
            trigger: "axis",
            axisPointer: {
             type: "cross"
            },
            formatter:function(res){
            	if(res.length&&res[0].seriesType=='line'){
            		return _this.nowtime+ res[0].axisValue+ '<br/>' +
                      _this.nowprice + res[0].data.value + '<br/>' +
                       _this.nownum + res[0].data.volume + '<br/>'
            	}else{
            		return _this.nowtime+ res[0].axisValue+ '<br/>' +
            					 _this.nowprice + res[0].data.close + '<br/>' +
            		       _this.nownum + res[0].data.value + '<br/>'
            	}
              }
         },
         dataZoom: [
           {
             type: "inside",
             start: 0,
             end: 100
           },
           {
             show: false,
             type: "slider",
   //     y: "90%",
             start:0,
             end: 100
           },
           {
             show: false,
             xAxisIndex: [0, 1],
             type: "slider",
             start: 0,
             end: 100
           },
         ],

           legend: {
           top: 10,
           data:dataattr,
           textStyle: {
             fontSize: 12,
             color: '#1E90FF'
           },
       },
         grid: [
           {
             left: "3%",
             top: "3%",
             height: "50%"
           },
           {
             left: "1%",
             right: "10%",
             top: "54%",
             height: "10%"
           }
         ],
         xAxis: [
           {
             data: _this.ftimeArr60,
             scale: true,
             boundaryGap: false,
             axisLine: { lineStyle: { color: '#8392A5' } },
             splitLine: {
               show: false
             },
           splitNumber: 100
           },
           {
             gridIndex: 1,
             data:_this.ftimeArr60,
             axisLabel: {
             show: false,
              }
           }
         ],

         yAxis: [
           {
             scale: true,
             splitArea: {
               show: false,
             },
              splitLine: {
               show: true
             },
             axisLine: {
               lineStyle: {
                 color: "#8392A5"
               },
             },
             position: "right",
           },

           {
             gridIndex: 1,
             splitNumber: 3,
             axisLine: { onZero: false },
             axisTick: { show: false },
             splitLine: { show: false },
             axisLabel: { show: true },
             axisLine: {
               lineStyle: {
                 color: "#8392A5",
                 widith:1
               }
             },
             position: "right"
           }
         ],
         series: [
           {
             name: dataattr[0],
             type: "line",
             data: close_px,
             smooth: false,
              showSymbol: false,
             lineStyle: {
               normal: {
              opacity: 0.8,
              color: '#39afe6',
              width: 1
   				     }
             },
             areaStyle: {
              normal: {
   						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
   							offset: 0,
   							color: 'rgba(0, 136, 212, 0.7)'
   						}, {
   							offset: 0.8,
   							color: 'rgba(0, 136, 212, 0.02)'
   						}], false),
   						shadowColor: 'rgba(0, 0, 0, 0.1)',
   						shadowBlur: 10
   					   }
             }
           },
           {
             name: '成交量',
             type: 'bar',
             xAxisIndex: 1,
             yAxisIndex: 1,
             data: volume,
             itemStyle: {
                 normal: {
   	            color: function(params) {
   	                var colorList;
   	               if (params.data.close-params.data.yclose >0) {
   	                  colorList = "#FD1050";
   	                } else {
   	                  colorList = "#00da3c";
   	                }
   	                return colorList;
   	              }
   	            }
             },
           },
           ]
       }
       if(val=='c'){
         _this.myChart3 = echarts.init(_this.$refs.echartContainer30);
          _this.myChart3.setOption(option);
       }else{
         _this.myChart5 = echarts.init(_this.$refs.echartContainer60);
          _this.myChart5.setOption(option);
       }
               }else if(res.code==402){
                  _this.$message.error(res.msg);
               }else if(res.code==401){
                  _this.$message.error(res.msg);
               }
             },
             error:function(){
             
             }
         });
      },
   getKLineHour(){  //获取日线
    let url=this.testUrl+'product/getKLineHour'
      let data={
        productCode:this.$route.query.productCode?this.$route.query.productCode:'COMEXGC',
      }
      let _this=this;
       $.ajax({
         url:url,
          dataType:"json",   
          data:data,    //参数值
          type:"get",   //请求方式
          success:function(res){
            if(res.code==200){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let close_px=[];
             let avg_px=[];
             let volume=[];
              for(let p of res.data){
              	p.D=p.D.split(' ')[0]
                     categoryData.push(p.D)  //拆分' ' 去掉分时
                     close_px.push(Number(p.C).toFixed(2));
                      values.push([p.O,p.C,p.L,p.H,p.V]);
                      volume.push({'value':p.V,'close':p.C,'yclose':p.VC})
                   }
        function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += values[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }
     var option = {
       color: ['#1E90FF','red','green','yellow'],
       backgroundColor: '#fff',
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
      },
        legend: {
        top: 10,
        data: ['日k','MA5', 'MA10','MA20'],
        textStyle: {
          fontSize: 12,
          color: ['#1E90FF','red','green','yellow'],
        },
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
         formatter:function(res){
                  if(res.length==1){
                    return _this.nownum+res[0].value;
                   } else{
                      return _this.edate+ res[0].axisValue + '<br/>' +
                    _this.eopen + res[0].data[1] + '<br/>' +
                    _this.eclose + res[0].data[2] + '<br/>' +
                     _this.elow + res[0].data[3] + '<br/>' +
                     _this.ehigh + res[0].data[4] + '<br/>' +
                     _this.nownum + res[0].data[5] + '<br/>' +
                    (res[1] && res[1].data!== '-'? res[1].seriesName + '：' + res[1].data.toFixed(2) + '<br/>' : '') +
                    (res[2] && res[2].data!== '-'? res[2].seriesName + '：' + res[2].data.toFixed(2) + '<br/>' : '') +
                    (res[3] && res[3].data!== '-'? res[3].seriesName + '：' + res[3].data.toFixed(2) + '<br/>' : '')
                   }
            }
      },
     dataZoom: [
        {
          type: "inside",
          start: 50,
          end: 100
        },
        {
          show: false,
          type: "slider",
       y: "90%",
          start:50,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 50,
          end: 100
        },
      ],
      grid: [
        {
          left: "3%",
          top: "3%",
          height: "50%"
        },
        {
          left: "1%",
          right: "10%",
          top: "54%",
          height: "10%"
        }
      ],
      xAxis: [
        {
          data: categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

        splitNumber: 100
        },
        {
          gridIndex: 1,
          data:categoryData,
          axisLabel: {
            show: false,
           }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",
        },
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],
      series: [
        {
          name: "日K",
          type: "candlestick",
          data:values,
          itemStyle: {
                normal: {
                     color: '#FD1050',
                    color0: '#00da3c',
                    borderColor: '#FD1050',
                    borderColor0: '#00da3c'
                }
            },
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            symbol: 'none',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,
        itemStyle: {
            normal: {
	            color: function(params) {
	                var colorList;
	               if (params.data.close-params.data.yclose >0) {
	                  colorList = "#FD1050";
	                } else {
	                  colorList = "#00da3c";
	                }
	                return colorList;
	              }
	            }
	        },
	     },
        ],
    }
    _this.myChart4 = echarts.init(_this.$refs.echartContainerday);
     _this.myChart4.setOption(option);
    _this.myChart4.resize();
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },
          error:function(){
          
          }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mid{
 		height: 100%;
 margin: 0 300px;
 background-color: saddlebrown;
 word-break: break-word;
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
    padding:10px;
    display: flex;
    justify-content: space-between;
  }
 .actve{
   background: #6699FF;
 }
 .title>div:nth-child(1)>span{
    display: inline-block;
    margin: 0 8px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;

 }
  .title>div:nth-child(2)>span{
      display: inline-block;
      width: 80px;
      height: 22px;
      background: #007AFF;
      color: #FFFFFF;
      text-align: center;
      line-height: 24px;
      cursor: pointer;
   }
.book,.buy{
    width: 600px;
    height:700px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -300px;
    z-index: 100;
    background: #2B2B2B;
    font-size: 14px;
    box-sizing: border-box;
  }
  .buy{
    height: 600px;
  }
  .title{
      background:#252525 ;
      text-align: left;
      box-sizing: border-box;
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
      margin-top: 40px;
    }
    .main>p{
      margin: 10px 0;
      line-height: 26px;
       box-sizing: border-box;
       padding: 0 10px;
    }
    .money{
      text-align: left;
      box-sizing: border-box;
      padding: 0 20px;
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
    .money>p{
      position: relative;
      left: 0.35rem;
      top: 0.2rem;
      font-weight: bold;
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
       display: flex;
       justify-content: space-between;
       width: 100%;
       position: absolute;
       bottom: 0;
       left: 0;
     }
     .btn>button{
       width: 50%;
       color: #FFFFFF;
       height:50px;
       border: none;
       font-size: 16px;
       font-weight: bold;
       outline: none;
     }
</style>
