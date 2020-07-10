<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i><span @click="goto('/')" style="cursor:pointer "> 首页</span></el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-message"></i> 消息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message"> <!--@tab-click="handleClick"-->
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <template v-if="message === 'first'">
                      <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                          <template slot-scope="scope">
                            <span class="message-title">【{{scope.row.operate}}】{{scope.row.info}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="time" width="180"></el-table-column>
                        <el-table-column width="120">
                          <template slot-scope="scope">
                            <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="handle-row">
                        <el-button type="primary" @click="handleReadAll">全部标为已读</el-button>
                      </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">【{{scope.row.operate}}】{{scope.row.info}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="time" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDelAll">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {reqExecutePost,reqExecutePut,reqExecuteDelete} from '../../api/index'
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                state:null,   // 0 未读  1 已读
                unread: [], // 未读消息
                read: [], // 已读消息
                tab:localStorage.tab
            }
        },

        mounted(){
          this.getDate1()
          this.getDate2()
        },
        methods: {
          getDate1(){
            const formData = new FormData()
            this.state = 0
            formData.append('state',this.state)
            reqExecutePost(formData).then(res=>{
              console.log(res)
              this.unread = res.result
              localStorage.message = this.unread.length
            }).catch(error=>{
              console.log(error)
            })
          },
          getDate2(){
            const formData = new FormData()
            this.state = 1
            formData.append('state',this.state)
            reqExecutePost(formData).then(res=>{
              console.log(res)
              this.read = res.result
            }).catch(error=>{
              console.log(error)
            })
          },
          goto(path){
            this.$router.push(path)
          },
          handleRead(index) {
            const formData = new FormData()
            formData.append('id',this.unread[index].id)
            reqExecutePut(formData).then(res=>{
              console.log(res)
              this.getDate1()
              this.getDate2()
            }).catch(error=>{

            })
          },
          handleReadAll(){
            reqExecutePut().then(res=>{
              console.log(res)
              this.getDate1()
              this.getDate2()
            }).catch(error=>{

            })
          },
          handleDel(index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const formData = new FormData()
              formData.append('id',this.read[index].id)
              reqExecuteDelete(formData).then(res=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getDate1()
                this.getDate2()
              }).catch(error=>{

              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          handleDelAll(){
            if(this.read.length === 0){
              return false
            }else{
              this.$confirm('此操作将永久删除全部文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                reqExecuteDelete().then(res=>{
                  this.read = []
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getDate1()
                  this.getDate2()
                }).catch(error=>{

                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          },
        },
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

