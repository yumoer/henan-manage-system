<template>
  <div>
    <div v-if="!showChild">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i><span @click="goto('/')" style="cursor:pointer "> 首页</span></el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 商品管理
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
          <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="margin-left: 20px">搜索</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          :empty-text="emptyText"
          stripe
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pmmc" width="180" label="品目名称" align="center"></el-table-column>
          <el-table-column label="品目编号" width="240" align="center">
            <template slot-scope="scope">￥{{scope.row.pmbh}}</template>
          </el-table-column>
          <el-table-column label="型号名称" prop="xhmc" align="center"></el-table-column>
          <el-table-column label="品牌名称" prop="ppmc" align="center"></el-table-column>
          <el-table-column label="类别名称" prop="lbmc" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope" v-if="scope.row.zt === 2">上线</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-lx-attention"
                @click="handleLook(scope.$index, scope.row)"
              >查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="goods.pagenum"
            :page-size="goods.pagesize"
            :total="pagecount"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i><span @click="goto('/')" style="cursor:pointer "> 首页</span></el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i><span @click="handleChild" style="cursor:pointer "> 商品管理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            {{title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <Information @handleChild="handleChild" v-on:titleChanged="updateTitle" :row = "row" :id="1"></Information>
    </div>
  </div>

</template>

<script>
  import {reqGoodsParams} from '../../../api/index';
  import Information from '../../common/Information'

  export default {
    data() {
      return {
        /*分页参数*/
        query: {
          pageIndex: 1,
          pageSize: 10
        },
        /*总条数*/
        pagecount: 0,
        /*表格提示*/
        emptyText:'正在加载中...',
        /*开始结束时间*/
        value: [new Date(2016, 8, 13, 0, 0, 0), new Date()],
        /*请求参数*/
        goods:{
          kssj:'',
          jssj:'',
          pagenum:1,
          pagesize:10,
        },
        /*详情数据*/
        row:{},
        /*title传值*/
        title:'参数信息',
        /*进入子页面*/
        showChild: false,

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
        /*详情数据*/
        tableData: [],
      };
    },
    components: {Information},
    created() {
      this.getData();
    },
    methods: {
      // 获取表格数据
      getData() {
        var formData = new FormData();
        formData.append("kssj", this.formatDate(this.value[0]));
        formData.append("jssj", this.formatDate(this.value[1]));
        formData.append("pagenum", this.goods.pagenum);
        formData.append("pagesize", this.goods.pagesize);
        reqGoodsParams(formData)
          .then(res => {
            console.log(res);
            if(res.result.resultFlag === 'Y'){
              this.tableData = res.result.spList;
              this.pagecount = res.result.pagecount;
              if(this.pagecount === 0){
                this.emptyText = '暂无商品'
              }
            }else{
              this.$message.error(res.result.resultMessage);
            }
          })
          .catch(error=>{
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
      /*更换title*/
      updateTitle(title){
        this.title = title;
      },
      // 子组件 返回的值
      handleChild() {
        this.showChild = false
        this.getData()
      },
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.goods, 'pagenum', 1);
        this.tableData = []
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
      // 查看操作
      handleLook(index, row) {
        this.row = row
        this.showChild = true
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.goods, 'pagenum', val);
        this.tableData = []
        this.getData();
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
