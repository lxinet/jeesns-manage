<template>
	<section>
		<el-button class="filter-item" size="small" style="margin-bottom: 10px;" @click="articleCateAdd" type="primary" icon="edit">添加</el-button>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" width="80">ID</el-table-column>
			<el-table-column prop="name" label="栏目名称" min-width="180"></el-table-column>
			<el-table-column prop="sort" label="序号" width="180"></el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="articleCateEdit(scope.row.id)">编辑</el-button>
					<el-popover
							ref="deletePopover"
							placement="top"
							width="160"
							trigger="click">
						<p>确定要删除栏目吗？</p>
						<div style="text-align: right; margin: 0">
							<el-button type="primary" size="mini" @click="articleCateDelete(scope.row.id)">确定</el-button>
						</div>
					</el-popover>
					<el-button size="small" v-popover:deletePopover>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--编辑界面-->
		<el-dialog title="添加" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="栏目名字" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="序号">
					<el-input-number v-model="addForm.sort" :min="1" :max="50000"></el-input-number>
					越大越靠前
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-input v-model="editForm.id" auto-complete="off" type="hidden"></el-input>
				<el-form-item label="名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="序号">
					<el-input-number v-model="editForm.sort" :min="1" :max="50000"></el-input-number>
					越大越靠前
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
	import { articleCateList, articleCateInfo, articleCateSave, articleCateUpdate, articleCateDelete} from '../../api/api';

	export default {
		data() {
			return {
                list: [],
				total: 0,
				page: 1,
				listLoading: false,
                addFormVisible: false,
                addLoading: false,
				editFormVisible: false,
				editLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' }
                    ]
                },
				editFormRules: {
                    name: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' }
                    ]
				},
				addForm: {
                    name: '',
					sort: '50'
				},
				editForm: {},
				isenableLoading: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.articleCateList();
			},
			//获取列表
            articleCateList() {
                var params = new URLSearchParams();
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                articleCateList(params).then((res) => {
                    this.list = res;
                    this.listLoading = false;
                });
            },
			//获取详情
            info: function(id) {
                let params = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                articleCateInfo(params).then((res) => {
                    this.editForm = res;
                    this.listLoading = false;
                });
            },
            articleCateAdd: function () {
                this.addFormVisible = true;
            },
            articleCateEdit: function (id) {
                this.info(id);
                this.editFormVisible = true;
            },
            articleCateDelete: function (id) {
                this.listLoading = true;
                let params = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                articleCateDelete(params).then((res) => {
                    this.listLoading = false;
                    if (res.code == -1){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }else {
                        this.articleCateList();
                    }
                });
            },
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
                        this.addLoading = true;
                        var params = new URLSearchParams();
                        params.append("name", this.addForm.name);
                        params.append("sort", this.addForm.sort);
                        params.append("token", sessionStorage.getItem("token"));
                        articleCateSave(params).then(res => {
                            this.addLoading = false;
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addForm.name = '';
                            this.addForm.sort = '50';
                            this.addFormVisible = false;
                            this.articleCateList();
                        });
					}
				});
			},
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        var params = new URLSearchParams();
                        params.append("id", this.editForm.id);
                        params.append("name", this.editForm.name);
                        params.append("sort", this.editForm.sort);
                        params.append("token", sessionStorage.getItem("token"));
                        articleCateUpdate(params).then(res => {
                            this.editLoading = false;
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.articleCateList();
                        });
                    }
                });
            }
		},
		mounted() {
			this.articleCateList();
		}
	}

</script>

<style scoped>

</style>