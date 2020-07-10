<template>
  <div>
    <div v-if="!showChild">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i>
            <span @click="goto('/')" style="cursor:pointer "> 首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="el-icon-lx-goods"></i> 已报价商品
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <div class="handle-box">
          <el-row>
            <el-form :label-position="labelPosition" label-width="80px" :inline="true" :model="formInline">
            <span style="float: left">
              <el-form-item label="品目名称">
                <el-select v-model="formInline.pmmc" placeholder="请选择品目名称">
                  <el-option v-for="(pmmc,index) in pmmcArr" :key="index" :label="pmmc" :value="pmmc"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品状态">
                <el-select v-model="formInline.state" placeholder="请选择商品状态">
                  <el-option label="商品待审核" value="1"></el-option>
                  <el-option label="商品上线" value="2"></el-option>
                  <el-option label="商品下线" value="3"></el-option>
                  <el-option label="品牌下架" value="11"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查找</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleUpdate">重置</el-button>
            </span>
            </el-form>
          </el-row>
        </div>
        <el-table
          :data="tableData"
          :empty-text="emptyText"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="xhmc" label="型号名称" align="center"></el-table-column>
          <el-table-column prop="xhbh" label="型号编号" align="center"></el-table-column>
          <el-table-column prop="pmmc" label="品目名称" align="center"></el-table-column>
          <el-table-column prop="ppmc" label="品牌名称" align="center"></el-table-column>
          <el-table-column prop="lbmc" label="类别名称" align="center"></el-table-column>
          <el-table-column prop="sjjg" label="我的报价" align="center"></el-table-column>
          <el-table-column label="商品状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.state === 1">
                <span>商品待审核</span>
                <el-button
                  type="text"
                  @click="cancelPrice(scope.$index, scope.row)"
                >撤销报价</el-button>
              </div>
              <div v-if="scope.row.state === 2">
                <span>商品上线</span>
              </div>
              <div v-if="scope.row.state === 3">
                <span>商品下线</span>
              </div>
              <div v-if="scope.row.state === 11">
                <span>品牌下架</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-lx-attention"
                @click="handleLook(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                icon="el-icon-lx-top"
                class="red"
                v-if="scope.row.zt === 1"
                @click="handlePutDown(scope.$index, scope.row)"
              >下架</el-button>
              <el-button
                type="text"
                icon="el-icon-lx-down"
                class="red"
                v-if="scope.row.zt === 2"
                @click="handlePutDown(scope.$index, scope.row)"
              >上架</el-button>
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
      <!-- 下架弹出框 -->
      <el-dialog title="下架" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="shelf" label-width="70px">
          <el-form-item label="下架原因" prop="desc">
            <el-input type="textarea" v-model="shelf.xjyy" :rows="3" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">提 交</el-button>
            </span>
      </el-dialog>
    </div>
    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i>
            <span @click="goto('/')" style="cursor:pointer "> 首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="el-icon-lx-goods"></i><span @click="back" style="cursor:pointer "> 已报价商品</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            {{title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <Information @handleChild="handleChild" v-on:titleChanged="updateTitle" :row = "row" :id="2"/>
    </div>
  </div>
</template>

<script>
  import { reqQuoteGoods,reqGoodsShelf,reqCancelPrice,reqQuotePmmc} from '../../../api/index';
  import Information from '../../common/Information'
  export default {
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 10
        },
        emptyText:'正在加载中...',
        pmmcArr:[],
        stateArr:[],
        title:'参数信息',
        shelf:{
          xhbh:'',
          xjyy:'',
          zt:null,
        },
        showChild:false,
        labelPosition:'center',
        formInline: {
          pmmc: '',
          state:'',
        },
        row:{},
        tableData: [],
        editVisible: false,
        quotedItems:false,
        pageTotal: 0,
      };
    },
    components:{Information},
    created(){
      this.getData();
      this.getQuotePmmc()
    },
    activated() {
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        var formData = new FormData();
        formData.append("pmmc", this.formInline.pmmc);
        formData.append("state", this.formInline.state);
        reqQuoteGoods(formData).then(res => {
          console.log(res);
          if(res.result.length === 0){
            this.$message({
              message:'暂无商品',
              type:'warning'
            });
            this.emptyText = '暂无商品'
          }else{
            this.tableData = res.result;
            console.log(this.tableData)
            this.pageTotal = this.tableData.length;
          }
        }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
            this.emptyText = '数据请求失败'
          }
        })
      },
      goto(path){
        this.$router.push(path)
      },
      getQuotePmmc(){
        reqQuotePmmc().then(res => {
          console.log(res);
          this.pmmcArr = res.result
        });
      },
      updateTitle(title){
        this.title = title;
      },
      // 触发搜索按钮
      handleSearch() {
        this.getData()
      },
      handleUpdate(){
        this.formInline.pmmc = ''
        this.formInline.state = ''
        this.getData()
      },
      // 上下架操作
      handlePutDown(index, row){
        console.log(index, row)
        if(row.zt === 1){ //下架
          this.editVisible = true;
          this.shelf.xhbh = row.xhbh
          this.shelf.zt = 2
        }else if(row.zt === 2){ //上架
          this.shelf.xhbh = row.xhbh
          this.shelf.zt = 1
          this.saveEdit()
        }
      },
      // 撤销报价
      cancelPrice(index, row){
        var formData = new FormData();
        formData.append("xhbh", row.xhbh);
        reqCancelPrice(formData).then(res => {
          console.log(res);
          if(res.success === true){
            this.$message({
              message:res.result,
              type:'success'
            })
          }else{
            this.$message.error(res.result)
          }
        }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
          }
        });
      },
      // 上下架编辑
      saveEdit() {
        this.editVisible = false;
        var formData = new FormData();
        formData.append("xhbh", this.shelf.xhbh);
        formData.append("zt", this.shelf.zt);
        formData.append("xjyy", this.shelf.xjyy);
        reqGoodsShelf(formData).then(res => {
          console.log(res);
          if(res.success === true){
            this.$message({
              message:res.result,
              type:'success'
            })
            this.getData();
            this.shelf.xjyy = ''
          }else{
            this.$message.error(res.result)
          }
        }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
            this.emptyText = '数据请求失败'
          }
        });
      },
      // 查看操作
      handleLook(index, row) {
        this.row = row
        this.showChild = true
      },
      handleChild(){
        this.showChild = false
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      back(){
        this.showChild = false
      },
    }
  };
</script>

<style scoped>
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
