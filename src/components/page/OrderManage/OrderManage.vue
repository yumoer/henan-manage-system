<template>
  <div>
    <div v-if="!showChild">
      <div class="crumbs">
        <el-breadcrumb separator="/" style="display: inline-block">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i>
            <span @click="goto('/')" style="cursor:pointer "> 首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 订单管理
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <div class="handle-box">
          <span class="block">
              <el-date-picker
                v-model="value"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="入库起始时间"
                end-placeholder="入库结束时间"
                align="right">
              </el-date-picker>
          </span>
          <el-select v-model="query.zt" style="margin-left: 10px;width: 150px" placeholder="订单状态" class="handle-select mr10">
            <el-option label="供应商待确认" value="2"></el-option>
            <el-option label="待验收" value="3"></el-option>
            <el-option label="订单已拒绝" value="4"></el-option>
            <el-option label="验收通过" value="5"></el-option>
            <el-option label="订单已取消" value="8"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-select v-model="query.sort" style="float: right" placeholder="默认排序" class="handle-select mr10">
            <el-option key="1" label="排序1" value="排序1"></el-option>
            <el-option key="2" label="排序2" value="排序2"></el-option>
          </el-select>
        </div>
        <el-table
          :data="tableData"
          :empty-text="emptyText"
          style="width: 100%;">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" class="demo-table-expand" style="line-height: 16px" v-for="product in scope.row.productList">
                <div class="block" v-for="fit in fits" :key="fit" style="width: 15%;height: 100%;display: inline-block;padding-top: 10px">
                  <span class="demonstration">{{ fit }}</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :fit="fit"></el-image>
                </div>
                <div style="width: 85%;height: 100%;display: inline-block;margin-top: -20px" >
                  <el-form-item label="商品名称" style="width: 100%" >
                    <span>{{ product.PPMC }}</span>
                  </el-form-item>
                  <el-form-item label="商品型号" style="width: 50%;display: inline-block" >
                    <span>{{ product.PPBH }}</span>
                  </el-form-item>
                  <el-form-item label="购买数量"  style="width: 50%;display: inline-block" >
                    <span>{{ product.SL }}</span>
                  </el-form-item>
                  <el-form-item label="实际价格" style="width: 50%;display: inline-block" >
                    <span>{{ product.SJJG }}</span>
                  </el-form-item>
                  <el-form-item label="小计价格" style="width: 50%;display: inline-block" >
                    <span>{{ product.XJJG }}</span>
                  </el-form-item>
                </div>
                <el-divider style="height: 100%"></el-divider>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单编号"
            align="center"
            prop="ddbh">
          </el-table-column>
          <el-table-column
            label="采购人姓名"
            align="center"
            prop="cgrmc">
          </el-table-column>
          <el-table-column
            label="需方联系人"
            align="center"
            prop="xflxrxm">
          </el-table-column>
          <el-table-column
            label="联系电话"
            align="center"
            prop="xfdh">
          </el-table-column>
          <el-table-column
            label="电商名称"
            align="center"
            prop="ghsmc">
          </el-table-column>
          <el-table-column
            label="订单总金额"
            align="center"
            prop="ddze">
          </el-table-column>
          <el-table-column
            label="订单提交时间"
            align="center">
            <template slot-scope="scope">{{formatDate1(scope.row.cjrq)}}</template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.zt === 2">供应商待确认</span>
              <span v-if="scope.row.zt === 3">待验收</span>
              <span v-if="scope.row.zt === 4">订单已拒绝</span>
              <span v-if="scope.row.zt === 5">验收通过</span>
              <span v-if="scope.row.zt === 8">订单已取消</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-lx-attention"
                @click="handleLook(scope.$index, scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/" style="display: inline-block">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i>
            <span @click="goto('/')" style="cursor:pointer "> 首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i>
            <span @click="handleChild" style="cursor:pointer "> 订单管理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            订单详情
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div style="float: right;margin-top: -10px">
          <el-button icon="el-icon-lx-punch" v-if="row.zt === 2" @click="verify">审核</el-button>
          <el-button icon="el-icon-lx-roundclose" v-if="row.zt === 3" @click="CanaelOrder">取消订单</el-button>
          <el-select v-model="query.sort" v-if="row.zt === 3" style="margin-left: 10px" class="handle-select" filterable  label-width="130px" @change="getOrderLogistics">
            <el-option key="1" label="推送物流信息" value="1"></el-option>
            <el-option key="2" label="推送签收信息" value="2"></el-option>
            <el-option key="3" label="推送发票开具" value="3"></el-option>
            <el-option key="4" label="发票收到时间" value="4"></el-option>
            <el-option key="5" label="获取订单合同" value="5"></el-option>
            <el-option key="6" label="推送订单收款" value="6"></el-option>
            <el-option key="7" label="获取验证时间" value="7"></el-option>
          </el-select>
        </div>
      </div>
      <InformationTwo @handleChild="handleChild" :row ='row'/>

      <!-- 审核弹出框 -->
      <el-dialog title="审核" :visible.sync="editVisible" width="35%">
        <el-form ref="form" :model="query" label-width="100px" :rules="rules">
          <el-form-item label="审核结果：" prop="qrzt">
            <el-radio-group v-model="query.qrzt">
              <el-radio label="通过" value="0"></el-radio>
              <el-radio label="不通过" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">提 交</el-button>
            </span>
      </el-dialog>

      <!--取消订单对话框-->
      <el-dialog title="取消订单" :visible.sync="cancelOrder" width="35%">
        <el-form :model="query" label-width="100px" :rules="rules">
          <el-form-item label="取消原因：" prop="qxyy"  style="position: relative">
            <el-input type="textarea" @input="descInput" :rows="4" v-model="query.qxyy"></el-input>
            <span class="text" style="float: right;color: #909399;margin-right: 20px;">{{remnant}}/300</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveCancel">提 交</el-button>
            </span>
      </el-dialog>

      <!-- 推送订单收款对话框 -->
      <el-dialog title="订单收款" :visible.sync="orderContac" width="35%">
        <el-form ref="form" :model="query" label-width="100px" :rules="rules">
          <el-form-item label="收款标志：" prop="skbz">
            <el-radio-group v-model="query.skbz">
              <el-radio label="正常收款" value="1"></el-radio>
              <el-radio label="未收款" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收款金额" prop="skje">
            <el-input v-model="query.skje"></el-input>
          </el-form-item>
          <el-form-item label="收款时间" prop="sksj">
            <div class="block">
              <el-date-picker
                v-model="query.sksj"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>

          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveContac">提 交</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { reqOrdersInfo,reqOrderCommit,reqOrderCancel,reqOrderLogistics,reqOrderSigning,reqOrderInvoice,reqInvoiceAccept,reqOrderContac,reqOrderReceipt,reqOrdereAccept} from '../../../api/index';
  import InformationTwo from '../../common/InformationTwo'
  export default {
    data() {
      return {
        query: {
          zt:'2',
          sort:'',
          qxyy:'',
          qrzt:'',
          sfcd:1,
          skbz:null,
          skje:null,
          pageIndex: 1,
          pageSize: 10
        },
        ztShow:false,
        verifyShow:false,
        CanaelOrderShow:false,
        orderContac:false,
        row:{},
        cancelOrder:false,
        value: [new Date(2017, 8, 13, 0, 0, 0), new Date()],
        remnant:0,//倒计数
        fits: ['fill'],
        /*最近时间选择*/
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        showChild:false,
        tableData: [],
        emptyText:'正在加载中...',
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        elForm:{
          state:''
        },
        rules: {
          qrzt: [
            { required: true, message: '请选择审核结果', trigger: 'change' }
          ],
          qxyy: [
            { required: true, message: '请输入取消原因', trigger: 'change' }
          ],
          skbz: [
            { required: true, message: '请选择收款标志', trigger: 'change' }
          ],
          skje: [
            { required: true, message: '请选择收款金额', trigger: 'change' }
          ],
          sksj: [
            { required: true, message: '请选择收款时间', trigger: 'change' }
          ]
        },
      };
    },
    components:{InformationTwo},
    created() {
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        var formData = new FormData();
        formData.append("kssj", this.formatDate(this.value[0]));
        formData.append("jssj", this.formatDate(this.value[1]));
        formData.append("zt", this.query.zt);
        formData.append("num", this.query.pageIndex);
        formData.append("pagesize", this.query.pageSize);
        reqOrdersInfo(formData).then(res => {
          console.log(res);
          if(res.result.resultFlag === 'Y'){
            this.tableData = res.result.orderList;
            this.pageTotal = res.result.count;
            if(this.query.zt === 2){
              this.query.zt = '供应商待确认'
            }else if(this.query.zt === 3){
              this.query.zt = '待验收'
            }else if(this.query.zt === 4){
              this.query.zt = '订单已拒绝'
            }else if(this.query.zt === 5){
              this.query.zt = '验收通过'
            }else if(this.query.zt === 8){
              this.query.zt = '订单已取消'
            }
          }else{
            this.$message.warning(res.result.resultMessage);
            if(res.result.resultMessage === '暂无订单'){
              this.emptyText = '暂无订单'
            }
          }
        }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
            this.emptyText = '数据请求失败'
          }
        });
      },
      goto(path){
        this.$router.push(path)
      },
      descInput() {
        let txtVal = this.query.qxyy.length;
        this.remnant = txtVal;
      },
      // 触发搜索按钮
      handleSearch() {
        this.tableData = []
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      /*转换时间格式*/
      formatDate(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var q = date.getMinutes()
        q = q < 10 ? ('0' + q) : q;
        var s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '' + m + '' + d + '' + h + '' + q + '' + s;
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
      // 审核
      verify(){
        this.editVisible = true;
      },
      // 取消订单
      CanaelOrder(){
        this.cancelOrder = true
      },
      // 查看操作
      handleLook(index, row) {
        this.row = row
        this.showChild = true
      },
      handleChild(){
        this.showChild = false
        this.getData();
      },
      // 审核
      saveEdit() {
        if(this.query.qrzt === '' || undefined){
          this.$message.error('请选择审核结果');
          return
        }
        this.editVisible = false;
        if(this.query.qrzt === '通过'){
          this.query.qrzt = 0
        }else{
          this.query.qrzt = 1
        }
        var formData = new FormData();
        formData.append("ddbh", sessionStorage.ddbh);
        formData.append("qrzt", this.query.qrzt);
        this.$confirm('提交后不可再修改, 您确定提交审核操作吗?', '', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          reqOrderCommit(formData).then(res => {
            console.log(res);
            if(res.success === true){
              this.$message({
                type: 'success',
                message: res.result
              })
              this.showChild = false
              this.tableData = []
              this.query.zt = '3'
              this.getData()
            }else{
              this.$message.error(res.result);
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          });
        });
      },
      // 取消订单
      saveCancel(){
        if(this.query.qxyy === '' || undefined){
          this.$message.error('请输入取消原因');
          return
        }
        this.cancelOrder = false
        var formData = new FormData();
        formData.append("ddbh", sessionStorage.ddbh);
        formData.append("qxyy", this.query.qxyy);
        reqOrderCancel(formData).then(res => {
          console.log(res)
          if(res.success === true){
            this.$message({
              type: 'success',
              message: res.result
            })
            this.showChild = false
            this.tableData = []
            this.query.zt = '8'
            this.getData()
          }else{
            this.$message.error(res.result);
          }
        }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
            this.emptyText = '数据请求失败'
          }
        })
      },
      // 推送物流信息
      getOrderLogistics(value){
        console.log(value)
        const formData = new FormData();
        if(value === '1'){
          formData.append("ddbh", sessionStorage.ddbh);
          formData.append("sfcd", this.query.sfcd);
          reqOrderLogistics(formData).then(res => {
            console.log(res)
            if(res.result.resultFlag === 'Y'){
              this.$message({
                message:res.result.resultMessage,
                type:'success'
              });
              console.log(this.query.sfcd)
              this.query.sfcd = 0
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          })
        }else if(value === '2'){
          formData.append("ddbh", sessionStorage.ddbh);
          formData.append("sfcd", this.query.sfcd);
          reqOrderSigning(formData).then(res=>{
            console.log(res)
            if(res.success === true){
              this.$message({
                message:res.result,
                type:'success'
              });
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          })
        }else if(value === '3'){
          formData.append("ddbh", sessionStorage.ddbh);
          formData.append("fpsdsj", this.query.sfcd);
          reqOrderInvoice(formData).then(res=>{
            console.log(res)
            if(res.success === true){
              this.$message({
                message:res.result,
                type:'success'
              });
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          })
        }else if(value === '4'){
          formData.append("ddbh", sessionStorage.ddbh);
          formData.append("fpsdsj", this.query.sfcd);
          reqInvoiceAccept(formData).then(res=>{
            console.log(res)
            if(res.success === true){
              this.$message({
                message:res.result,
                type:'success'
              });
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          })
        }else if(value === '5'){
          formData.append("ddbh", sessionStorage.ddbh);
          reqOrderContac(formData).then(res=>{
            console.log(res)
            if(res.success === true){
              this.$message({
                message:res.result,
                type:'success'
              });
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          })
        }else if(value === '6'){
          this.orderContac = true
        }else if(value === '7'){
          formData.append("ddbh", sessionStorage.ddbh);
          reqOrdereAccept(formData).then(res=>{
            console.log(res)
            if(res.success === true){
              this.$message({
                message:res.result,
                type:'success'
              });
            }else{
              this.$message.error(res.result);
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              this.emptyText = '数据请求失败'
            }
          })
        }

      },
      // 收款标志
      saveContac(){
        this.orderContac = false
        if(this.query.skbz === '' || undefined){
          this.$message.error('请选择收款标志');
          return
        }
        if(this.query.skje === '' || null){
          this.$message.error('请选择收款金额');
          return
        }
        if(this.query.sksj === '' || null){
          this.$message.error('请选择收款时间');
          return
        }
        if(this.query.skbz === '正常收款'){
          this.query.skbz = 1
        }else{
          this.query.skbz = 2
        }
        const formData = new FormData();
        formData.append("ddbh", sessionStorage.ddbh);
        formData.append("skbz", this.query.skbz); // 收款标志 1 正常收款 2 未收款
        formData.append("skje", this.query.skje); // 收款金额
        formData.append("sksj", this.formatDate(this.query.sksj)); // 收款时间
        reqOrderReceipt(formData).then(res=>{
          console.log(res)
          if(res.success === true){
            this.$message({
              message:res.result,
              type:'success'
            });
          }
        }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
            this.emptyText = '数据请求失败'
          }
        })
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.tableData = []
        this.getData();
      }
    }
  };
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
