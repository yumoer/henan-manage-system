<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{dataArr.login_time}}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>北京</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:340px;">
                    <div slot="header" class="clearfix">
                        <span>消息管理</span>
                    </div>
                    <el-row :gutter="20" class="mgb20">
                        <el-col :span="24" style="margin-bottom: 30px">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-4">
                                    <i class="el-icon-lx-attentionforbid grid-con-icon"></i>
                                    <div class="grid-cont-right" style="cursor:pointer" @click="goto('/tabs')">
                                        <div class="grid-num">{{dataArr.unread_num}}</div>
                                        <div>未读消息</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="24">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-5">
                                    <i class="el-icon-lx-attention grid-con-icon"></i>
                                    <div class="grid-cont-right" style="cursor:pointer" @click="goto('/tabs')">
                                        <div class="grid-num">{{dataArr.read_num}}</div>
                                        <div>已读消息</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" style="height:200px;margin-bottom: 5px" v-for="(order,index) in dataArr.orders" :key="index">
                    <div slot="header" class="clearfix">
                        <span v-if="index===0">7日订单指标</span>
                        <span v-if="index===1">15日订单指标</span>
                        <span v-if="index===2">30日订单指标</span>
                    </div>
                    <el-row :gutter="20" class="mgb20">
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-1">
                                    <i class="el-icon-lx-calendar grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{order.orders}}</div>
                                        <div>新增订单数</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-2">
                                    <i class="el-icon-lx-roundcheck grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{order.rece_orders}}</div>
                                        <div>已支付数</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-lx-recharge grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{order.total_amount}}</div>
                                        <div>累计金额</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {reqTotalOrders} from '../../api/index'
export default {
    name: 'home',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            date:'',
            dataArr:{
              read_num: 0,
              unread_num: 0,
              orders: [
                {
                  orders: 0,
                  rece_orders: 0,
                  total_amount: 0
                },
                {
                  orders: 0,
                  rece_orders: 0,
                  total_amount: 0
                },
                {
                  orders: 0,
                  rece_orders: 0,
                  total_amount: 0
                }
              ]},
        };
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    mounted(){
      let date = new Date()
      const time = date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();
      console.log(time)
      this.date = time
      this.getDate()
    },
    methods: {
        getDate(){
          reqTotalOrders().then(res=>{
            console.log(res)
            if(res.success === true){
              this.dataArr = res.result
              this.$message({
                message:'数据请求成功',
                type:'success'
              })
            }else{
              this.$message({
                message:'数据请求失败',
                type:'error'
              })
            }
          }).catch(error=>{
            if(error === undefined){
              this.$message({
                message:'数据请求失败',
                type:'error'
              })
            }
          })
        },
        goto(path){
          this.$router.push(path);
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
    background: #E6A23C;
}

.grid-con-4 .grid-num {
    color: #E6A23C;
}

.grid-con-5 .grid-con-icon {
    background: #6DEFCD;
}

.grid-con-5 .grid-num {
    color: #6DEFCD;
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 50px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
