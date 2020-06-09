<template>
  <div class="right">
    <p class="title">{{$store.state.lg=='C'?detaillist.productName:detaillist.englishName}}{{detaillist.productCode}}</p>
    <div class="mid">
      <div class="lt">
      	<p>{{$store.state.lg=='C'?'当前价格':'Last'}}</p>
      	<div>
      		<span>{{detaillist.lastP}}</span>
      		<div>
      			<p :class="detaillist.lastZf>0?'up':'down'">{{Tomunber(detaillist.lastZf)}}</p>
      			<p>{{detaillist.lastVf}}</p>
      		</div>
      	</div>
      </div>
      <div class="rt">
      	<p>{{$store.state.lg=='C'?'当前交易情况':'Current transactions'}}</p>
      	<div>
      		<p><span></span> <span>{{$store.state.lg=='C'?'买入':'Buy'}}<span>{{detaillist.lastBuyNum}}</span></span></p>
      		<p><span></span> <span>{{$store.state.lg=='C'?'卖出':'Sell'}}<span>{{detaillist.lastSellNum}}</span></span></p>
      	</div>
      </div>

    </div>
 <p class="title">资讯HHHH</p>
       <div>
       	<iframe id="cha" frameborder="0" width="100%" height="900" scrolling="yes" src="https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white"></iframe>
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
        productCode:this.$route.query.productCode?this.$route.query.productCode:'COMEXGC',
        detaillist:'',
        timer:'',
    }
  },
  watch:{

  	},
  created(){
   this.getdetail()
  },
  mounted(){
    this.timer = setInterval(() => {
                 this.getdetail();
            }, 5000)
  },
 beforeDestroy() {
       clearInterval(this.timer);
 },
  watch:{
    '$route'(){
     this.getdetail()
    },
  },

  methods:{
    getdetail(){   //获取详情
       let _this=this;
          $.ajax({
          dataType:"json", 
          type:"get",
          url:this.testUrl+'product/getProductData',
          data:{
            productCode:this.$route.query.productCode?this.$route.query.productCode:'COMEXGC'
          },
          success:function(res){
                if(res.code==200){
                  _this.detaillist=res.data;
                  _this.$store.state.detaillist=res.data;
                }
               },
               error:function(res){
                _this.$message('网络错误');
               },
              complete:function(){
                $('#loading').hide()
              }
         });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .right{
	width: 300px;
 		height: 100%;
	float: right;
	background-color: #1B1B1B;
  position: absolute;right: 0;
  top: 0;

	}
 .title{
    background:#252525 ;
    text-align: left;
    box-sizing: border-box;
    padding:10px;
  }
  .mid{
  	display: flex;
  	justify-content: space-between;
  	box-sizing: border-box;
  	text-align: left;
  	border-bottom: 1px solid #000;
   padding: 10px;
  }
  .lt>p:nth-child(1),.lt>p:nth-child(2){
  	color: #999999;
  	font-size:12px;
  }
  .lt>div{
  	display: flex;
  	justify-content: space-between;
  	margin:10px 0;
  }
  .lt>div>span{
  	font-size:20px;
  	font-weight: bold;
    display: inline-block;
    margin-right: 10px;
    margin-top: 3px;
  }
  .lt>div>div{
  	font-size: 14px;
  }
  .rt>div>p{
  	margin: 0.3rem 0;
  }
  .rt>div>p>span:nth-child(1){
  	display: inline-flex;
  	width: 20px;
  	height: 4px;
  	background: red;
  }
  .rt>div>p>span:nth-child(2){
  	color: #999999;
  	font-size:12px;
  	display: inline-block;
  	width: 60px;
  }
  .rt>div>p>span:nth-child(2)>span{
  	font-size: 12px;
  }
</style>
