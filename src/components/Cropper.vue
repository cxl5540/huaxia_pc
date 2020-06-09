<template>
	<div>
		<div class="top">
			<img  @click="upload"   :onerror="defaultSrc" :src=$store.state.info.headImg alt="" />
		</div>
		<div class="v-simple-cropper">
			 <input class="file" ref="file" type="file" accept="image/*" mutiple="mutiple" capture="camera" @change="uploadChange">
			 <div class="v-cropper-layer" ref="layer">
				  <div class="layer-header">
				  <button class="cancel" @click="cancelHandle">{{$store.state.lg=='C'?'取消':'Cancel'}}</button>
				  <button class="confirm" @click="confirmHandle" style="color: #3168FA;">{{$store.state.lg=='C'?'确定':'Determine'}}</button>
				  </div>
				  <img ref="cropperImg">
			 </div>
		 </div>
	 </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  export default {
    name: 'v-simple-cropper',
	 data () {
	 return {
	 uploadParam: {
	  fileType: 'recruit', // 其他上传参数
	  scale: 1 // 相对手机屏幕放大的倍数: 4倍
	  },
	  info:'',
	  userImg:  require('../assets/touxiang.png'),
     defaultSrc:'this.src="' + require('../assets/touxiang.png')+ '"',
	  cropper: {},
	  filename: '' ,
	 }
 },
 created(){
 	// this.getinfo();
 },
 mounted () {
 this.init();
 },
 methods: {
 // 初始化裁剪插件
 init () {
  let cropperImg = this.$refs['cropperImg']
  this.cropper = new Cropper(cropperImg, {
  aspectRatio: 1 / 1,
  dragMode: 'move'
  })
 },
 // 点击上传按钮
 upload () {
 if(localStorage.getItem('uid')){
 	 this.$refs['file'].click()
 }else{
 	this.$router.push({path:'/login'})
 }

 },
 // 选择上传文件
 uploadChange (e) {
  let file = e.target.files[0]
  this.filename = file['name']
  let URL = window.URL || window.webkitURL
  this.$refs['layer'].style.display = 'block'
  this.cropper.replace(URL.createObjectURL(file))
 },
 // 取消上传
 cancelHandle () {
  this.cropper.reset()
  this.$refs['layer'].style.display = 'none'
  this.$refs['file'].value = ''
 },
 // 确定上传
 confirmHandle () {
  let cropBox = this.cropper.getCropBoxData()
  let scale = 1|| 1
  let cropCanvas = this.cropper.getCroppedCanvas({
  width: cropBox.width * scale,
  height: cropBox.height * scale
  })
  let imgData = cropCanvas.toDataURL('image/jpeg')
// this.userImg=imgData
   var myform = new FormData();
   this.uploadImage(imgData)
   this.$refs['layer'].style.display = 'none'
  },
   uploadImage(file){
   	$('#loading').show()
   	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'mobile/uploadImage',
		 	data:{
		 		file:file,
		 		uid:localStorage.getItem('uid')
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		 _this.$message({message: '修改成功',type: 'success'});
	       		  // _this.userImg=_this.testUrl+res.data.fileUrl;
                 _this.$store.state.info.headImg=_this.testUrl+res.data.fileUrl;
	       		}

	         },
	         error:function(res){
	          _this.$message({message: '网络错误',type: 'error'});
	         },
	        complete:function(){
	        	$('#loading').hide()
	        }
		 });
   },


 }
}
</script>
<style scoped>
 .file {
 display: none;
 }
 .v-cropper-layer {
 position: fixed;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 background: #fff;
 z-index: 99999;
 display: none;
 }
 .layer-header {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99999;
  background: #fff;
  width: 100%;
 /* height: .8rem; */
  padding: 14px;
  font-size: 16px;
  box-sizing: border-box;
 }
 .cancel, .confirm {
  line-height: .8rem;
  font-size: 0.37rem;
  background: inherit;
  border: 0;
  outline: 0;
  float: left;
 }
 .confirm {
  float: right;
 }
.top{
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 0.4rem;
	padding-top:0.4rem; ;
}
.top>img{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	overflow: hidden;
}
.top>div{
	margin-left: 0.4rem;
	text-align: left;
}
.top>div>p img{
	max-width: 0.42rem;
}
.top>div>p:nth-child(1){
	color: #333333;
	font-weight: bold;
	font-size: 0.48rem;
}
.top>div>p:nth-child(2){
	font-size: 0.34rem;
	color: #999999;
	margin-top: 0.13rem;
}
</style>
