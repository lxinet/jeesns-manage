<template>
	<section>
		<el-button class="filter-item" size="small" style="margin-left: 5px;" @click="articleAdd" type="primary" icon="edit">添加</el-button>
		<el-col :span="4">
			<el-menu default-active="0" @select="articleCateSelect">
				<el-menu-item index="0">全部</el-menu-item>
				<el-menu-item v-for="articleCate in articleCateList" v-bind:index="articleCate.id+''">
					{{articleCate.name}}
				</el-menu-item>
			</el-menu>
		</el-col>
		<el-col :span="20">
			<!--列表-->
			<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="id" width="80">ID</el-table-column>
				<el-table-column prop="title" label="标题" min-width="180"></el-table-column>
				<el-table-column prop="articleCate.name" label="栏目" width="100"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
				<el-table-column label="状态" width="80">
					<template scope="scope">
						<div v-if="scope.row.status == 0">
							<a href="javascript:void(0)" @click="articleAudit(scope.row.id)"><el-tag type="danger">未审核</el-tag></a>
						</div>
						<div v-else>
							<a href="javascript:void(0)" @click="articleAudit(scope.row.id)"><el-tag type="success" >已审核</el-tag></a>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140">
					<template scope="scope">
						<el-button size="small" @click="articleEdit(scope.row.id)">编辑</el-button>
						<el-popover
								ref="deletePopover"
								placement="top"
								width="160"
								trigger="click">
							<p>确定要删除文章吗？</p>
							<div style="text-align: right; margin: 0">
								<el-button type="primary" size="mini" @click="articleDelete(scope.row.id)">确定</el-button>
							</div>
						</el-popover>
						<el-button size="small" v-popover:deletePopover>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-show="!listLoading" class="pagination-container">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNo"
							   :page-sizes="[10,20,30,50,100]" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
			<el-dialog title="添加" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="栏目" prop="cateId">
						<el-select v-model="addForm.cateId" placeholder="请选择栏目">
							<el-option
									v-for="articleCate in articleCateList"
									:label="articleCate.name"
									:value="articleCate.id+''">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标题" prop="title">
						<el-input v-model="addForm.title" auto-complete="off" style="max-width: 800px"></el-input>
					</el-form-item>
					<el-form-item label="缩略图">
						<el-upload
								class="thumbnail-uploader"
								:action="uploadUrl()"
								:show-file-list="false"
								:on-success="handlethumbnailScucess"
								:before-upload="beforethumbnailUpload">
							<img v-if="thumbnail" :src="thumbnail" class="thumbnail">
							<i v-else class="el-icon-plus thumbnail-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="描述">
						<el-input type="textarea" :rows="3" v-model="addForm.description" auto-complete="off" style="max-width: 800px"></el-input>
					</el-form-item>
					<el-form-item label="内容" prop="content">
						<quill-editor ref="myTextEditor" class="editor-content"
									  v-model="addForm.content"
									  :options="editorOption">
						</quill-editor>
					</el-form-item>
					<el-form-item label="来源">
						<el-input v-model="addForm.source" auto-complete="off" style="width: 200px"></el-input>
					</el-form-item>
					<el-form-item label="作者">
						<el-input v-model="addForm.writer" auto-complete="off" style="width: 200px"></el-input>
					</el-form-item>
					<el-form-item label="浏览数">
						<el-input-number v-model="addForm.viewCount" :min="1" :max="50000"></el-input-number>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>
			<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" top="5%" size="large">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="栏目" prop="cateId">
						<el-select v-model="editForm.cateId" placeholder="请选择栏目">
							<el-option
									v-for="articleCate in articleCateList"
									:label="articleCate.name"
									:value="articleCate.id+''">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标题" prop="title">
						<el-input v-model="editForm.title" auto-complete="off" style="max-width: 800px"></el-input>
					</el-form-item>
					<el-form-item label="缩略图">
						<el-upload
								class="thumbnail-uploader"
								:action="uploadUrl()"
								:show-file-list="false"
								:on-success="handlethumbnailScucess"
								:before-upload="beforethumbnailUpload">
							<img v-if="thumbnail" :src="thumbnail" class="thumbnail">
							<i v-else class="el-icon-plus thumbnail-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="描述">
						<el-input type="textarea" :rows="3" v-model="editForm.description" auto-complete="off" style="max-width: 800px"></el-input>
					</el-form-item>
					<el-form-item label="内容" prop="content">
						<quill-editor ref="myTextEditor" class="editor-content"
									  v-model="editForm.content"
									  :options="editorOption">
						</quill-editor>
					</el-form-item>
					<el-form-item label="来源">
						<el-input v-model="editForm.source" auto-complete="off" style="width: 200px"></el-input>
					</el-form-item>
					<el-form-item label="作者">
						<el-input v-model="editForm.writer" auto-complete="off" style="width: 200px"></el-input>
					</el-form-item>
					<el-form-item label="浏览数">
						<el-input-number v-model="editForm.viewCount" :min="1" :max="50000"></el-input-number>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'

	import { basePath, articleCateList, articleList, articleInfo, articleSave, articleUpdate, articleDelete, articleAudit} from '../../api/api';

	export default {
		data() {
			return {
                articleCateList: [],
                list: [],
				total: 0,
                pageNo: 1,
                pageSize: 20,
				listLoading: false,
                addFormVisible: false,
                addLoading: false,
				editFormVisible: false,
				editLoading: false,
				isenableLoading: false,
                cateId: 0,
                addFormRules: {
                    cateId: [
                        { required: true, message: '请选择栏目', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ]
                },
                editFormRules: {
					cateId: [
						{ required: true, message: '请选择栏目', trigger: 'blur' }
					],
						title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					],
						content: [
						{ required: true, message: '请输入内容', trigger: 'blur' }
					]
				},
                addForm: {
                    title: '',
                    cateId: '',
                    description: '',
                    content: '',
                    thumbnail: '',
                    source: '',
                    writer: '',
                    viewCount: '50'
                },
                editForm: {
                    id: '',
                    title: '',
                    cateId: '',
                    description: '',
                    content: '',
                    thumbnail: '',
                    source: '',
                    writer: '',
                    viewCount: ''
                },
                editorOption: {},
                thumbnail: ''
			}
		},
		methods: {
            articleCateSelect(key) {
                this.cateId = key;
                this.articleList();
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
			handleCurrentChange(val) {
				this.page = val;
                this.getArticleCateList();
                this.articleList();
			},
			//获取列表
            getArticleCateList() {
                var params = new URLSearchParams();
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                articleCateList(params).then((res) => {
                    this.articleCateList = res;
                    this.listLoading = false;
                });
            },
            articleList() {
                var params = new URLSearchParams();
                params.append("pageNo", this.pageNo);
                params.append("pageSize", this.pageSize);
                params.append("cateId", this.cateId);
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                articleList(params).then((res) => {
                    this.list = res.data;
                    this.total = res.page.totalCount;
                    this.pageNo = res.page.pageNo;
                    this.pageSize = res.page.pageSize;
                    this.listLoading = false;
                });
            },
            articleAdd: function () {
                this.addFormVisible = true;
            },
            articleEdit: function (id) {
                this.articleInfo(id);
                this.editFormVisible = true;
            },
            articleInfo: function(id) {
                let params = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                articleInfo(params).then((res) => {
                    this.editForm = res;
                    this.editForm.cateId = res.cateId + '';
                    this.listLoading = false;
                });
            },
			articleDelete: function (id) {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("id", id);
                params.append("token", sessionStorage.getItem("token"));
                articleDelete(params).then((res) => {
                    this.listLoading = false;
                    this.articleList();
                });
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.addLoading = true;
                        var params = new URLSearchParams();
                        params.append("title", this.addForm.title);
                        params.append("cateId", this.addForm.cateId);
                        params.append("thumbnail", this.addForm.thumbnail);
                        params.append("description", this.addForm.description);
                        params.append("content", this.addForm.content);
                        params.append("source", this.addForm.source);
                        params.append("writer", this.addForm.writer);
                        params.append("viewCount", this.addForm.viewCount);
                        params.append("token", sessionStorage.getItem("token"));
                        articleSave(params).then(res => {
                            this.addLoading = false;
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.articleList();
                        });
                    }
                });
            },
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        var params = new URLSearchParams();
                        params.append("id", this.editForm.id);
                        params.append("title", this.editForm.title);
                        params.append("cateId", this.editForm.cateId);
                        params.append("thumbnail", this.editForm.thumbnail);
                        params.append("description", this.editForm.description);
                        params.append("content", this.editForm.content);
                        params.append("source", this.editForm.source);
                        params.append("writer", this.editForm.writer);
                        params.append("viewCount", this.editForm.viewCount);
                        params.append("token", sessionStorage.getItem("token"));
                        articleUpdate(params).then(res => {
                            this.editLoading = false;
                            if (res.code == -1){
                                this.$message({
                                    message: res.message,
                                    type: 'error'
                                });
                            }else {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.articleList();
                            }

                        });
                    }
                });
            },
            uploadUrl: function () {
                return basePath + "uploadImage";
            },
            handlethumbnailScucess(res, file) {
                if (res.code == -1){
                    this.$message.error(res.message);
                }else {
                    this.addForm.thumbnail = res.url;
                    this.editForm.thumbnail = res.url;
                    this.thumbnail = URL.createObjectURL(file.raw);
                }
            },
            beforethumbnailUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('缩略图大小不能超过 10MB!');
                }
                return isLt10M;
            },
            articleAudit: function(id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.isenableLoading = true;
                articleAudit(para).then((res) => {
                    if (res.code == -1){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }else {
                        this.isenableLoading = false;
                        this.articleList();
                    }
                });
            },
		},
		mounted() {
			this.getArticleCateList();
			this.articleList();
		}
	}

</script>
<style lang="scss">
	.ql-container .ql-editor {
		min-height: 20em;
		max-height: 25em;
	}
	.thumbnail-uploader .el-upload {
		 border: 1px dashed #d9d9d9;
		 border-radius: 6px;
		 cursor: pointer;
		 position: relative;
		 overflow: hidden;
	 }
	.thumbnail-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	.thumbnail-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	.thumbnail {
		width: 178px;
		height: 100px;
		display: block;
	}
</style>