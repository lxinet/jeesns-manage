<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" width="80">ID</el-table-column>
			<el-table-column prop="name" label="名称" width="120"></el-table-column>
			<el-table-column prop="remark" label="描述"></el-table-column>
			<el-table-column prop="score" label="变动积分" width="100"></el-table-column>
			<el-table-column label="周期" width="100">
				<template scope="scope">
					<div v-if="scope.row.type == 'day'">
						一天一次
					</div>
					<div v-else-if="scope.row.type == 'week'">
						一周一次
					</div>
					<div v-else-if="scope.row.type == 'month'">
						一月一次
					</div>
					<div v-else-if="scope.row.type == 'year'">
						一年一次
					</div>
					<div v-else-if="scope.row.type == 'one'">
						一次
					</div>
					<div v-else-if="scope.row.type == 'unlimite'">
						不限
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="添加时间" width="180"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
			<el-table-column label="状态" width="80">
				<template scope="scope">
					<div v-if="scope.row.status == 1">
						<a href="javascript:void(0)" @click="scoreRuleEnable(scope.row.id)"><el-tag type="success">启用</el-tag></a>
					</div>
					<div v-else>
						<a href="javascript:void(0)" @click="scoreRuleEnable(scope.row.id)"><el-tag type="danger" >禁用</el-tag></a>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button size="small" @click="scoreRuleEdit(scope.row.id)">编辑</el-button>
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
				<el-form-item label="描述">
					<el-input type="textarea" v-model="editForm.remark" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="周期">
					<el-input v-model="editForm.typeName" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="变动积分" prop="score">
					<el-input v-model="editForm.score" number></el-input>
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
	import { scoreRuleList, scoreRuleInfo, scoreRuleUpdate, scoreRuleEnable} from '../../api/api';

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
                    score:[{validator:(rule,value,callback) => {
                        if (value == ''){
                            callback(new Error("请输入变动积分"));
						} else if (/^\d+$/.test(value) == false){
                            callback(new Error("变动积分只能输入数字"));
                        } else {
                            callback();
                        }
                    }, trigger:'blur'}]

				},
				//编辑界面数据
				editForm: {},
				isenableLoading: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.scoreRuleList();
			},
			//获取列表
            scoreRuleList() {
                let para = {
                    token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                scoreRuleList(para).then((res) => {
                    this.list = res;
                    this.listLoading = false;
                });
            },
			//禁用、启用
            scoreRuleEnable: function(id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.isenableLoading = true;
                scoreRuleEnable(para).then((res) => {
                    if (res.code == -1){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }else {
                        this.isenableLoading = false;
                        this.scoreRuleList();
                    }
                });
            },
			//获取详情
            scoreRuleInfo: function(id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                scoreRuleInfo(para).then((res) => {
                    this.editForm = res;
                    if(res.type == 'day'){
                        this.editForm.typeName = "一天一次";
					}else if(res.type == 'week'){
                        this.editForm.typeName = "一周一次";
                    }else if(res.type == 'month'){
                        this.editForm.typeName = "一月一次";
                    }else if(res.type == 'year'){
                        this.editForm.typeName = "一年一次";
                    }else if(res.type == 'one'){
                        this.editForm.typeName = "一次";
                    }else if(res.type == 'unlimite'){
                        this.editForm.typeName = "不限";
                    }
                    this.listLoading = false;
                });
            },
            //显示编辑界面
            scoreRuleEdit: function (id) {
                this.scoreRuleInfo(id);
                this.editFormVisible = true;
            },
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
                        this.editLoading = true;
                        var params = new URLSearchParams();
                        params.append("id", this.editForm.id);
                        params.append("score", this.editForm.score);
                        params.append("token", sessionStorage.getItem("token"));
                        scoreRuleUpdate(params).then(res => {
                            this.editLoading = false;
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.scoreRuleList();
                        });
					}
				});
			}
		},
		mounted() {
			this.scoreRuleList();
		}
	}

</script>

<style scoped>

</style>