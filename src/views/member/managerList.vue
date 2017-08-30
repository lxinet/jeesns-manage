<template>
    <section>
        <el-button class="filter-item" size="small" style="margin-left: 5px;" @click="managerAdd" type="primary"
                   icon="edit">添加
        </el-button>
        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="id" width="80">ID</el-table-column>
            <el-table-column prop="name" label="用户名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="180"></el-table-column>
            <el-table-column prop="loginCount" label="登录次数" min-width="180"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="180"></el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-popover
                            ref="deletePopover"
                            placement="top"
                            width="160"
                            trigger="click">
                        <p>确定要取消管理员吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button type="primary" size="mini" @click="memberManagerCancel(scope.row.id)">确定
                            </el-button>
                        </div>
                    </el-popover>
                    <el-button size="small" v-popover:deletePopover>取消管理员</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="pageNo"
                           :page-sizes="[10,20,30,50,100]" :page-size="pageSize" layout="total, prev, pager, next"
                           :total="total">
            </el-pagination>
        </div>
        <el-dialog title="授权管理员" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-input v-model="addForm.id" auto-complete="off" type="hidden"></el-input>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="memberManagerSave" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {memberManagerList, memberManagerSave, memberManagerCancel} from '../../api/api';

    export default {
        data() {
            return {
                list: [],
                total: 0,
                pageNo: 1,
                pageSize: 20,
                listLoading: false,
                isenableLoading: false,
                addFormVisible: false,
                addLoading: false,
                addForm: {
                    name: ''
                },
                addFormRules: {
                    name: [
                        {required: true, message: '请输入会员用户名', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.memberManagerList();
            },
            //获取列表
            memberManagerList() {
                var params = new URLSearchParams();
                params.append("pageNo", this.pageNo);
                params.append("pageSize", this.pageSize);
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                memberManagerList(params).then((res) => {
                    this.list = res.data;
                    this.total = res.page.totalCount;
                    this.pageNo = res.page.pageNo;
                    this.pageSize = res.page.pageSize;
                    this.listLoading = false;
                });
            },
            memberManagerCancel: function (id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.isenableLoading = true;
                memberManagerCancel(para).then((res) => {
                    if (res.code == -1) {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    } else {
                        this.isenableLoading = false;
                        this.memberManagerList();
                    }
                });
            },
            managerAdd: function () {
                this.addFormVisible = true;
            },
            memberManagerSave: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.addLoading = true;
                        var params = new URLSearchParams();
                        params.append("name", this.addForm.name);
                        params.append("token", sessionStorage.getItem("token"));
                        memberManagerSave(params).then(res => {
                            this.editLoading = false;
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.memberManagerList();
                        });
                    }
                });
            }
        },
        mounted() {
            this.memberManagerList();
        }
    }

</script>