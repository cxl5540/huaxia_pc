<template>
  <div class="left">
    <p class="title">{{$store.state.lg=='C'?'交易产品':'Transaction'}}</p>
     <div class="classfiy">
       <p  @click="show()" ><span>{{$store.state.lg=='C'?prolists[nameindex].productName:prolists[nameindex].eproductName}}</span><i  :class="showf==false?'fa fa-angle-down':'fa fa-angle-up'" ></i></p>
       <ul v-show="showf">
         <li v-for="item,index in prolists" :key='index' @click="deal(item.id,item.productName,item.eproductName)">{{$store.state.lg=='C'?item.productName:item.eproductName}}</li>
       </ul>
     </div>
     <div class="pros">
       <ul>
         <li>{{$store.state.lg=='C'?'名称/代码':'Symbol'}}</li>
         <li>{{$store.state.lg=='C'?'最新价':'Last'}}</li>
         <li>{{$store.state.lg=='C'?'涨幅':'Gain'}}</li>
       </ul>
       <ul  v-for="item,index in prolist" :key="index" @click="detail(item,index)" :class="index==active?'color':''">
         <li><span class="cricle" :style="{'background': (item.status==0? '#999':'greenyellow')}"></span><span>{{$store.state.lg=='C'?item.productName:item.englishName}}</span><br><span>{{item.productCode}}</span></li>
         <li class="flex-center">{{item.lastP}}</li>
         <li :class="Number(item.lastZf)>0?'up flex-center':'down flex-center'">{{Tomunber(item.lastZf)}}</li>
       </ul>
     </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      active:0,
      index:0,
      nameindex:0,
      showf:false,
      prolist:'',
      timer:'',
      timer1:'',
      id:'',
      calssname:this.$store.state.lg=='C'?'全部分类':'All categories',
      prolists:[
        {
          productName:'全部分类',
          eproductName:'All categories',
          productCode:'stock',
          id:0,
         },
         {
      		 productName:'股指期货',
           eproductName:'Equity Index',
      		productCode:'stock',
           id:1,
          },
         {
         productName:'商品期货',
         eproductName:'Commodity Futures',
      	 productCode:'product',
         id:2,
         },
         {
         productName:'汇率期货',
          eproductName:'Forex',
      		productCode:'exchange',
          id:3,
         },
         {
         productName:'数字货币',
          eproductName:'Digital Currency',
      		productCode:'digital',
          id:4,
         }
      ],
    }
  },
  created(){
    this.nameindex=0;
     this.get();
    this.timer1 = setInterval(() => {
          this.get();
        }, 5000)
  },
  watch:{

	},
  mounted(){
  },
  beforeDestroy(){
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
  methods:{
    show(){
      this.showf=!this.showf;
    },
    deal(id,name,ename){ //筛选分类
     clearInterval(this.timer1);
     clearInterval(this.timer);
    // this.nameindex=id;
      this.showf=false;
      id==0?this.id='':this.id=id;
      if(id!==''){
        this.nameindex=id;
      }
       this.get();
      this.timer = setInterval(() => {
              this.get();
          }, 5000)
    },
    get(){
      let _this=this;
      	$.ajax({
       	dataType:"json", 
       	type:"get",
       	url:this.testUrl+'product/products',
       	data:{
          typeId:this.id
        },
       	success:function(res){
           		if(res.code==200){
           		  _this.prolist=res.data;
                // _this.showf=false;

           		}
             },
             error:function(res){
              _this.$message.error(_this.$store.state.emsg);
             },
            complete:function(){

            }
       });
    },
    detail(item,index){
      this.active=index;
      if(item.status==0){
          this.$message.warning(this.$store.state.lg=='C'?'已休市':'Closed')
      }else{
        this.$router.push({path:'/index',query:{productCode:item.productCode,status:item.status}})
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left{
 		width: 300px;
 		height: 100%;
 		float: left;
 		background-color: #1b1b1b;
    border-right: 3px solid #000000;
    position: absolute;
    left: 0;
    top: 0;
	}
  .title{
    background:#252525 ;
    text-align: left;
    box-sizing: border-box;
    padding:10px;
  }
  .classfiy{
    width: 100%;
    position: relative;
  }
.classfiy>p{
  border:1px solid #5B5B5B;
  padding: 8px 0;
  border-radius: 3px;
  position: relative;
  font-size: 16px;
  margin: 0;
}
.classfiy>p>i{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
}
.classfiy>ul{
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  z-index: 999;
}
.classfiy>ul>li{
  padding: 10px 0;
  background: #252525;
  width: 100%;
}
.classfiy>ul>li:hover{
  background: #424242;
  cursor: pointer;
}
.color{
    background: #424242;
}
.pros{
  height: 80%;
  overflow-y: scroll;
  padding-bottom: 70px;
}
.pros>ul{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #252525;
}
.pros>ul:hover{
  background: #424242;
    cursor: pointer;
}
.pros>ul>li{
  text-align: center;
  width: 25%;
  margin: 10px 0;
}
.cricle{
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: greenyellow;
  position: relative;
  top: -3px;
  left: -5px;
}
</style>
