<template>
  <div style="background: #fff">
    <div>
      <!--<el-button-group style="padding: 20px 0 0 20px;">
        <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回上一页</el-button>
      </el-button-group>-->
      <el-row>
        <el-col :span="8" style=""><div class="grid-content bg-purple">
          <div class="demo-image">
            <div class="block">
              <div style="float: left;font-size: 12px;line-height: 26px;padding: 20px;">
                <div><i class="el-icon-lx-calendar"></i> 订单号：{{row.ddbh}}</div>
                <div><i class="el-icon-lx-people"></i> 采购人：{{row.cgrmc}}</div>
                <div><i class="el-icon-lx-profile"></i> 需方联系人：{{row.xflxrxm}}</div>
                <div><i class="el-icon-lx-vipcard"></i> 发票抬头：{{row.fptt}}</div>
                <div><i class="el-icon-lx-time"></i> 收货时间：
                  <span v-if="row.shsj === 0">工作日/周末/假期均可送货</span>
                  <span v-if="row.shsj === 1">工作日送货</span>
                  <span v-if="row.shsj === 2">周末送货</span>
                </div>
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="8" v-if="showRight" ><div class="grid-content bg-purple-light">
          <div class="demo-image">
            <div class="block">
              <div style="float: left;font-size: 12px;line-height: 26px;padding: 20px;">
                <div><i class="el-icon-lx-info"></i> 订单状态：
                  <span v-if="row.zt === 2">供应商待确认</span>
                  <span v-if="row.zt === 3">待验收</span>
                  <span v-if="row.zt === 4">订单已拒绝</span>
                  <span v-if="row.zt === 5">验收通过</span>
                  <span v-if="row.zt === 8">订单已取消</span>
                </div>
                <div><i class="el-icon-lx-recharge"></i> 总金额：{{row.ddze}}</div>
                <div><i class="el-icon-lx-mobile"></i> 需方电话：{{row.xfdh}}</div>
                <div><i class="el-icon-lx-news"></i> 纳税人识别号：{{row.nsrsbh}}</div>
                <div><i class="el-icon-lx-rank"></i> 收货期限：
                  <span v-if="row.shqx === 0">不限</span>
                  <span v-if="row.shqx === 1">一天内</span>
                  <span v-if="row.shqx === 2">两天内</span>
                  <span v-if="row.shqx === 3">三天内</span>
                  <span v-if="row.shqx === 5">五天内</span>
                  <span v-if="row.shqx === 7">七天内</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </el-col>
        <el-col :span="8" style=""><div class="grid-content bg-purple">
          <div class="demo-image">
            <div class="block">
              <div style="float: left;font-size: 12px;line-height: 26px;padding: 20px;">
                <div><i class="el-icon-lx-remind"></i> 提交时间：{{formatDate1(row.cjrq)}}</div>
                <div><i class="el-icon-lx-shop"></i> 电商名称：{{row.ghsmc}}</div>
                <div><i class="el-icon-lx-qrcode"></i> 支付方式：
                  <span v-if="row.zffs === '70080001'">现金</span>
                  <span v-if="row.zffs === '70080002'">公务卡结算</span>
                  <span v-if="row.zffs === '70080003'">银行转账</span>
                  <span v-if="row.zffs === '70080004'">银行支票</span>
                </div>
                <div><i class="el-icon-lx-text"></i> 发票内容：
                  <span v-if="row.fpnr === '70100001'">商品明细</span>
                  <span v-if="row.fpnr === '70100002'">办公耗材</span>
                  <span v-if="row.fpnr === '70100003'">办公用品</span>
                </div>
                <div><i class="el-icon-lx-service"></i> 安装服务：
                  <span v-if="row.sfxyazfw === 0">需要安装服务</span>
                  <span v-if="row.sfxyazfw === 1">不需要安装服务</span>
                </div>
              </div>
            </div>
          </div>
        </div></el-col>
      </el-row>
    </div>
    <el-divider>订单商品</el-divider>
    <el-table
      :data="tableData"
      :empty-text="emptyText"
      style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand" style="line-height: 16px">
            <el-divider>商品配件</el-divider>
            <el-table
              :data="scope.row.accessoryList"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
            >
              <el-table-column prop="PJMC" label="配件名称" align="center"></el-table-column>
              <el-table-column prop="PJBH" label="配件编号" align="center"></el-table-column>
              <el-table-column prop="SL" label="配件数量" align="center"></el-table-column>
              <el-table-column prop="PJJG" label="配件价格" align="center"></el-table-column>
            </el-table>
            <el-divider>商品服务</el-divider>
            <el-table
              :data="scope.row.serviceList"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
            >
              <el-table-column prop="FWMC" label="服务名称" align="center"></el-table-column>
              <el-table-column prop="FWBH" label="服务编号" align="center"></el-table-column>
              <el-table-column prop="SL" label="服务数量" align="center"></el-table-column>
              <el-table-column prop="FWJG" label="服务价格" align="center"></el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="XHMC" label="商品型号" align="center"></el-table-column>
      <el-table-column label="商品图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.IMAGE"
            ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="XHBH" label="型号编号" align="center"></el-table-column>
      <el-table-column prop="PPMC" label="品牌名称" align="center"></el-table-column>
      <el-table-column prop="PPBH" label="品牌编号" align="center"></el-table-column>
      <el-table-column prop="SJJG" label="实际价格" align="center"></el-table-column>
      <el-table-column prop="SL" label="购买数量" align="center"></el-table-column>
      <el-table-column prop="XJJG" label="小计价格" align="center"></el-table-column>
      <el-table-column v-if="row.zt === 5" label="上传文件" align="center">
        <template slot-scope="scope">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.1.154:8000/hngov/goods/code"
            :show-file-list="false"
            :data="data"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="scope.row.PIC === 'http://192.168.1.154:8888/'?'':scope.row.PIC" @click="uploadImage(scope.$index,scope.row)" :src="scope.row.PIC" class="avatar">
            <i v-else @click="uploadImage(scope.$index,scope.row)" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {reqGoodsCode,reqGetOrder} from '../../api/index'
  export default {
    props:['row'],
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 10,
        },
        data:{
          ddbh:this.row.ddbh,
          xhbh:''
        },
        image:'',
        good_info:[],
        imageUrl: '',
        pageTotal:0,
        showImage:true,
        showRight:true,
        emptyText:'正在加载中...',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
        ],
        activeName: 'first',
        tableData: [],
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res, file)
        if(res.success === true){
          this.$message({
            message:res.result,
            type:'success'
          })
          console.log(res.image)
          this.getData()
        }else{
          this.$message.error(res.result)
        }
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },
      back(){
        this.$emit("handleChild",false);
      },
      formatDate1(date){
        date = date+''
        var y = date.substring(0, 4);
        var m = date.substring(4, 6);
        var d = date.substring(6, 8);
        var h = date.substring(8, 10);
        var q = date.substring(10, 12);
        var s = date.substring(12, 14);
        return y + '/' + m + '/' + d +' '+ h + ':' + q + ':' + s;
      },
      // 获取数据
      getData() {
        var formDate = new FormData()
        formDate.append('ddbh',this.row.ddbh)
        sessionStorage.ddbh = this.row.ddbh
        reqGetOrder(formDate).then(res=>{
          console.log(res)
          if(res.success === true){
            this.$message({
              message:res.result,
              type:'success'
            })
            this.tableData = res.order_list[0].productList
            if(this.tableData.length === 0){
              this.emptyText= '暂无数据'
            }
          }
        }).catch(error=>{

        })
      },
      // 上传图片
      uploadImage(index,row){
        console.log(index,row)
        this.data.xhbh = row.XHBH
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      }
    }
  }
</script>
<style type="text/css">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
