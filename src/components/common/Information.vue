<template>
  <div style="background: #fff">
    <!--上半部分-->
    <div>
      <!--返回上一页-->
      <!--<el-button-group style="padding: 20px 0 0 20px;">-->
        <!--<el-button type="primary" icon="el-icon-arrow-left" @click="back">返回上一页</el-button>-->
      <!--</el-button-group>-->
      <!--图文信息-->
      <el-row>
        <el-col :span="20" style="height:120px;line-height: 120px"><div class="grid-content bg-purple">
          <div class="demo-image">
            <div class="block">
              <el-image
                style="width: 80px; height: 80px;padding: 20px;float: left;"
                :src="url"
                :preview-src-list="srcList"
              >
              </el-image>
              <div style="font-size: 12px;line-height: 26px;padding: 20px 0;">
                <div>型号名称：{{row.xhmc}}</div>
                <div>品目名称：{{row.pmmc}}</div>
                <div>品目编号：{{row.pmbh}}</div>
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="4" v-if="showRight" ><div class="grid-content bg-purple-light">
          <div style="margin-top: 50px">
            <el-button type="primary" @click="showQuotations" style="margin-right: 50px;float: right">商品报价</el-button>
          </div>
        </div>
        </el-col>
      </el-row>
    </div>

    <!--上半部分-->
    <div style="padding: 0 20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="参数信息" name="first">
          <div>
            <el-row style="font-size: 16px">
              <el-col :span="24">
                <!--<el-divider direction="vertical" style="color: #333"></el-divider>-->
                <div style="border-left: 3px solid #333;display:inline"></div>
                <span class="grid-content bg-purple-dark" style="margin:0 5px">基本信息</span>
                <i class="el-icon-lx-edit"></i>
              </el-col>
            </el-row>
            <el-row style="font-size: 13px;line-height: 40px;color: #666;margin-top: 20px">
              <el-col :span="12"><div class="grid-content bg-purple" style="padding-left: 80px">
                <div>品目名称：{{row.pmmc}}</div>
                <div>型号名称：{{row.xhmc}}</div>
                <div>品牌名称：{{row.ppmc}}</div>
                <div>类别名称：{{row.lbmc}}</div>
              </div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light" style="padding-left: 80px">
                <div>品目编号：{{row.pmbh}}</div>
                <div>型号编号：{{row.xhbh}}</div>
                <div>品牌编号：{{row.ppbh}}</div>
                <div>类别编号：{{row.lbbh}}</div>
              </div></el-col>
            </el-row>
          </div>
          <div v-if="id === 1 && row.parametersList.length > 0">
            <el-row style="font-size: 16px">
              <el-col :span="24">
                <div style="border-left: 3px solid #333;display:inline"></div>
                <div class="grid-content bg-purple-dark" style="display: inline;margin:0 5px">参数信息</div>
                <i class="el-icon-lx-edit"></i>
              </el-col>
            </el-row>
            <el-row style="font-size: 13px;line-height: 40px;color: #666;margin-top: 20px">
              <el-col :span="12" v-for="(parameter,index) in row.parametersList" :key="index" >
                <div class="grid-content bg-purple" style="padding-left: 80px" >
                  <div v-if="parameter.csz !== null">{{parameter.cssm}}：{{parameter.csz}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="id === 2 && parametersList.length > 0">
            <el-row style="font-size: 16px">
              <el-col :span="24">
                <div style="border-left: 3px solid #333;display:inline"></div>
                <div class="grid-content bg-purple-dark" style="display: inline;margin:0 5px">参数信息</div>
                <i class="el-icon-lx-edit"></i>
              </el-col>
            </el-row>
            <el-row style="font-size: 13px;line-height: 40px;color: #666;margin-top: 20px">
              <el-col :span="12" v-for="(parameter,index) in parametersList" :key="index">
                <div class="grid-content bg-purple" style="padding-left: 80px" >
                  <div v-if="parameter.CSZ !== null">{{parameter.CSSM}}：{{parameter.CSZ}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配件信息" name="second">
          <el-table
            :data="tableData1"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column prop="RN" label="序号" width="55" align="center"></el-table-column>
            <el-table-column label="品目名称" align="center">
              <template slot-scope="scope">{{row.pmmc}}</template>
            </el-table-column>
            <el-table-column prop="pmnh" label="品目编号" align="center">
              <template slot-scope="scope">{{row.pmbh}}</template>
            </el-table-column>
            <el-table-column prop="PJMC" label="配件名称" align="center"></el-table-column>
            <el-table-column prop="PJBH" label="配件编号" align="center"></el-table-column>
            <el-table-column prop="PJMS" label="配件描述" align="center"></el-table-column>
            <el-table-column prop="mxmc" label="明细名称" align="center"></el-table-column>
            <el-table-column prop="mxsl" label="明细数量" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-lx-attention"
                  @click="shopQuotations(scope.$index, scope.row, 1)"
                >报价</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal1"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="third">
          <el-table
            :data="tableData2"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column prop="RN" label="序号" width="55" align="center"></el-table-column>
            <el-table-column label="品目名称" align="center">
              <template slot-scope="scope">{{row.pmmc}}</template>
            </el-table-column>
            <el-table-column label="品目编号" align="center">
              <template slot-scope="scope">{{row.pmbh}}</template>
            </el-table-column>
            <el-table-column prop="FWMC" label="服务名称" align="center"></el-table-column>
            <el-table-column prop="FWMX" label="服务明细" align="center"></el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope" v-if="scope.row.ZT === '0'">禁用</template>
              <template slot-scope="scope" v-if="scope.row.ZT === '1'">启用</template>
            </el-table-column>

            <el-table-column prop="FWJG" label="服务价格" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-lx-attention"
                  @click="shopQuotations(scope.$index, scope.row,2)"
                >报价</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal2"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--商品报价-->
    <el-dialog title="商品报价" :visible.sync="quotedItems" width="30%">
      <el-form ref="shopPrice" :rules="rules" :model="shopPrice" label-width="80px">
        <el-form-item label="报价金额" prop="sjjg">
          <el-input v-model="shopPrice.sjjg" placeholder="请输入报价金额"></el-input>
        </el-form-item>
        <el-form-item label="商品地址" prop="productlink">
          <el-input v-model="shopPrice.productlink" placeholder="请输入商品在自有网站的的绝对地址"></el-input>
        </el-form-item>
        <el-form-item label="服务承诺" prop="fwcn">
          <el-input type="textarea" v-model="shopPrice.fwcn" :rows="3" placeholder="请输入服务承诺"></el-input>
        </el-form-item>
        <el-form-item label="价格上浮原因" prop="jgsfyy">
          <el-input type="textarea" v-model="shopPrice.jgsfyy" :rows="3" placeholder="请输入价格上浮原因"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <!--<el-button @click="quotedItems = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit('shopPrice')">提 交</el-button>
            </span>
    </el-dialog>

    <!--配件报价-->
    <el-dialog title="配件报价" :visible.sync="quotedItems1" width="30%">
      <el-form ref="shopPrice1" :rules="rules1" :model="shopPrice1" label-width="80px">
        <el-form-item label="配件报价" prop="pjjg">
          <el-input v-model="shopPrice1.pjjg" placeholder="请输入配件报价"></el-input>
        </el-form-item>
        <el-form-item label="修改报价原因" prop="bjyy">
          <el-input type="textarea" v-model="shopPrice1.bjyy" :rows="3" placeholder="请输入价格上浮原因"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <!--<el-button @click="quotedItems = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit1('shopPrice1')">提 交</el-button>
            </span>
    </el-dialog>

    <!--服务报价-->
    <el-dialog title="服务报价" :visible.sync="quotedItems2" width="30%">
      <el-form ref="shopPrice2" :rules="rules2" :model="shopPrice2" label-width="80px">
        <el-form-item label="服务报价" prop="fwjg">
          <el-input v-model="shopPrice2.fwjg" placeholder="请输入服务报价"></el-input>
        </el-form-item>
        <el-form-item label="修改报价原因" prop="bjyy">
          <el-input type="textarea" v-model="shopPrice2.bjyy" :rows="3" placeholder="请输入价格上浮原因"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <!--<el-button @click="quotedItems = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit2('shopPrice2')">提 交</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import {reqReportPrice,reqGoodsItems,reqGoodsService,reqReportPartPrice,reqReportServicePrice,reqGoodsInfo} from '../../api/index';
  export default {
    props:['row','id'],
    data() {
      return {
        activeName: 'first', // 默认打开第一个tab页
        showRight:true, // 商品报价按钮

        parametersList:[], // 单个参数信息配置

        /*对话框*/
        quotedItems:false, // 参数报价对话框
        quotedItems1:false, // 配件报价对话框
        quotedItems2:false, // 服务报价对话框

        /*图片数据*/
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', //参数商品图片
        srcList: [ // 查看大图片数组
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
        ],
        /*对话框参数*/
        shopPrice:{ // 参数对话框参数
          sjjg:null, // 实际价格
          fwcn:'',  // 服务承诺
          productlink:'', /*http://www.hfyt365.com/goods/194989.html*/ // 商品地址
          jgsfyy:'' // 价格上浮原因
        },
        shopPrice1:{ // 配件对话框参数
          pjbh:'', // 配件编号
          pjmc:'', // 配件名称
          pjbj:null, // 配件报价
          bjyy:'' // 报价原因
        },
        shopPrice2:{ // 服务对话框参数
          fwbh:'', // 服务编号
          fwmc:'', // 服务名称
          zt:'', // 状态
          fwbj:null, // 服务报价
          bjyy:'' // 报价原因
        },

        /*规则*/
        rules: { // 参数输入规则
          sjjg: [ // 报价金额
            { required: true, message: '请输入报价金额', trigger: 'blur' },
          ],
          productlink: [ // 商品地址
            { required: true, message: '请输入商品地址', trigger: 'blur' },
          ],
        },
        rules1: { // 配件输入规则
          pjjg: [ // 配件报价
            { required: true, message: '请输入配件报价', trigger: 'blur' },
          ],
        },
        rules2: { // 服务输入规则
          fwjg: [ // 服务报价
            { required: true, message: '请输入服务报价', trigger: 'blur' },
          ],
          /*zt:[
            { required: true, message: '请输入配件报价', trigger: 'blur' },
          ]*/
        },

        /*数据*/
        tableData1: [], // 配件对话框数据
        tableData2: [], // 服务对话框数据

        /*分页*/
        query: { // 分页
          pageIndex: 1,
          pageSize: 10,
        },
        pageTotal1:0, //配件数据条数
        pageTotal2:0, //配件数据条数
      }
    },
    mounted(){
      this.getGoodsItems()
      this.getGoodsService()
      if(this.id === 2){
        this.getGoodsInfo()
      }
    },
    methods: {
      /*返回上一页*/
      back(){
        this.$emit("handleChild",false);
      },
      getGoodsInfo(){
        var formData = new FormData();
        formData.append("xhbh", this.row.xhbh);
        reqGoodsInfo(formData)
          .then(res => {
            console.log(res);
            if(res.result.resultFlag === 'Y'){
              this.parametersList = res.result.parametersList
            }else{
              this.$message.error(res.result.resultMessage);
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
            }
        })
      },
      /*tab按钮*/
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.index !== '0'){
          if(tab.index === '1'){
            this.title = '配件信息'
            this.$emit("titleChanged",'配件信息');
          }else if(tab.index === '2'){
            this.title = '服务信息'
            this.$emit("titleChanged",'服务信息');
          }
          this.showRight = false
        }else{
          this.title = '参数信息'
          this.$emit("titleChanged",'参数信息');
          this.showRight = true
        }
      },

      // 配件数据
      getGoodsItems(){
        var formData = new FormData();
        formData.append("pmbh", this.row.pmbh);
        formData.append("num", this.query.pageIndex);
        formData.append("pagesize", this.query.pageSize);
        reqGoodsItems(formData)
          .then(res => {
            console.log(res);
            if(res.result.resultFlag === 'Y'){
              this.tableData1 = res.result.accessoryList
              this.pageTotal1 = res.result.count
              console.log(this.tableData1)
            }else{
              this.$message.error(res.result.resultMessage);
            }
          }).catch(error=>{
            console.log(error)
            if(error === undefined){
              this.$message.error('数据请求失败');
              // this.emptyText = '数据请求失败'
            }
          })
      },

      // 服务数据
      getGoodsService(){
        var formData = new FormData();
        formData.append("pmbh", this.row.pmbh);
        formData.append("num", this.query.pageIndex);
        formData.append("pagesize", this.query.pageSize);
        reqGoodsService(formData)
          .then(res => {
            console.log(res);
            if(res.result.resultFlag === 'Y'){
              this.tableData2 = res.result.serviceList
              this.pageTotal2 = res.result.count
              console.log(this.tableData2)
            }else{
              this.$message.error(res.result.resultMessage);
            }
          }).catch(error=>{
          console.log(error)
          if(error === undefined){
            this.$message.error('数据请求失败');
            // this.emptyText = '数据请求失败'
          }
        })
      },

      /*打开参数对话框*/
      showQuotations() {
        this.quotedItems = true
      },

      /*打开配件服务对话框*/
      shopQuotations(index, row, num){
        console.log(index, row, num)
        if(num === 1){ // 配件报价
          this.shopPrice1.pjbh = row.PJBH
          this.shopPrice1.pjmc = row.PJMC
          this.quotedItems1 = true
        }else if(num === 2){ // 服务报价
          this.shopPrice2.fwbh = row.FWBH
          this.shopPrice2.fwmc = row.FWMC
          this.shopPrice2.zt = row.ZT
          this.quotedItems2 = true;
        }
      },

      // 商品报价提交
      saveEdit(shopPrice) {
        console.log(this.shopPrice.sjjg,this.shopPrice.productlink)
        this.$refs[shopPrice].validate((valid) => {
          if (valid) {
            this.quotedItems = false;
            const formData = new FormData();
            formData.append("xhbh", this.row.xhbh);
            formData.append("xhmc", this.row.xhmc);
            formData.append("pmbh", this.row.pmbh);
            formData.append("pmmc", this.row.pmmc);
            formData.append("ppbh", this.row.ppbh);
            formData.append("ppmc", this.row.ppmc);
            formData.append("lbbh", this.row.lbbh);
            formData.append("lbmc", this.row.lbmc);
            formData.append("area", '00390019');
            formData.append("sjjg", this.shopPrice.sjjg);
            formData.append("fwcn", this.shopPrice.fwcn);
            formData.append("productlink",this.shopPrice.productlink);
            formData.append("jgsfyy", this.shopPrice.jgsfyy);
            reqReportPrice(formData).then(res => {
              console.log(res);
              if(res.result.resultFlag === 'Y'){
                this.$message({
                  message:res.result.resultMessage,
                  type:'success'
                });
              }else{
                this.$message.error(res.result);
              }
            }).catch(error=>{
              console.log(error)
              if(error === undefined){
                this.$message.error('数据请求失败');
                // this.emptyText = '数据请求失败'
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 配件报价提交
      saveEdit1(shopPrice1) {
        this.$refs[shopPrice1].validate((valid) => {
          if (valid) {
            this.quotedItems1 = false;
            const formData = new FormData();
            formData.append("pmbh", this.row.pmbh);
            formData.append("pmmc", this.row.pmmc);
            formData.append("xhbh", this.row.xhbh);
            formData.append("xhmc", this.row.xhmc);
            formData.append("pjbh", this.shopPrice1.pjbh);
            formData.append("pjmc", this.shopPrice1.pjmc);
            formData.append("pjjg", this.shopPrice1.pjjg);
            formData.append("bjyy", this.shopPrice1.bjyy);
            reqReportPartPrice(formData).then(res => {
              console.log(res);
              if(res.result.resultFlag === 'Y'){
                this.$message({
                  message:res.result.resultMessage,
                  type:'success'
                });
              }else {
                this.$message.error(res.result.resultMessage);
              }
            }).catch(error=>{
              console.log(error)
              if(error === undefined){
                this.$message.error('数据请求失败');
                // this.emptyText = '数据请求失败'
              }
            })
          } else {
            // this.$message.error('未填写配件报价');
            return false;
          }
        });
      },

      // 服务报价提交
      saveEdit2(shopPrice2) {
        this.$refs[shopPrice2].validate((valid) => {
          if (valid) {
            this.quotedItems2 = false;
            const formData = new FormData();
            formData.append("pmbh", this.row.pmbh);
            formData.append("pmmc", this.row.pmmc);
            formData.append("xhbh", this.row.xhbh);
            formData.append("xhmc", this.row.xhmc);
            formData.append("fwbh", this.shopPrice2.fwbh);
            formData.append("fwmc", this.shopPrice2.fwmc);
            formData.append("fwjg", this.shopPrice2.fwjg);
            formData.append("bjyy", this.shopPrice2.bjyy);
            formData.append("zt", this.shopPrice2.zt);
            reqReportServicePrice(formData).then(res => {
              console.log(res);
              if(res.result.resultFlag === 'Y'){
                this.$message({
                  message:res.result.resultMessage,
                  type:'success'
                });
              }else {
                this.$message.error(res.result.resultMessage);
              }
            }).catch(error=>{
              console.log(error)
              if(error === undefined){
                this.$message.error('数据请求失败');
                // this.emptyText = '数据请求失败'
              }
            })
          } else {
            // this.$message.error('未填写服务报价');
            return false;
          }
        });
      },

      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);

        this.getData();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
