<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" width="80">ID</el-table-column>
			<el-table-column prop="name" label="名称" width="180"></el-table-column>
			<el-table-column prop="log" label="描述" min-width="180"></el-table-column>
			<el-table-column prop="createTime" label="添加时间" width="180"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
			<el-table-column label="状态" width="80">
				<template scope="scope">
					<div v-if="scope.row.status == 0">
						<a href="javascript:void(0)" @click="actionIsenable(scope.row.id)"><el-tag type="success">启用</el-tag></a>
					</div>
					<div v-else>
						<a href="javascript:void(0)" @click="actionIsenable(scope.row.id)"><el-tag type="danger" >禁用</el-tag></a>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button size="small" @click="actionEdit(scope.row.id)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-input v-model="editForm.id" auto-complete="off" type="hidden"></el-input>
				<el-form-item label="名称">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="log">
					<el-input type="textarea" v-model="editForm.log"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { actionList, actionInfo, actionUpdate, actionIsenable} from '../../api/api';

	export default {
		data() {
			return {
                list: [],
				total: 0,
				page: 1,
				listLoading: false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
                    log: [
						{ required: true, message: '请输入描述', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {},
				isenableLoading: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.actionList();
			},
			//获取列表
            actionList() {
                let para = {
					token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                actionList(para).then((res) => {
                    this.list = res;
                    this.listLoading = false;
                });
            },
			//禁用、启用
            actionIsenable: function(id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.isenableLoading = true;
                actionIsenable(para).then((res) => {
                    this.isenableLoading = false;
                    this.actionList();
                });
            },
			//获取详情
            actionInfo: function(id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                actionInfo(para).then((res) => {
                    this.editForm = res;
                    this.listLoading = false;
                });
            },
            //显示编辑界面
            actionEdit: function (id) {
                this.actionInfo(id);
                this.editFormVisible = true;
            },
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
                        this.editLoading = true;
                        var params = new URLSearchParams();
                        params.append("id", this.editForm.id);
                        params.append("log", this.editForm.log);
                        params.append("token", sessionStorage.getItem("token"));
                        actionUpdate(params).then(res => {
                            this.editLoading = false;
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.actionList();
                        });
					}
				});
			}
		},
		mounted() {
			this.actionList();
		}
	}

</script>

<style scoped>

</style>