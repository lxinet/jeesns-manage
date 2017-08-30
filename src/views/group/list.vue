<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" width="80">ID</el-table-column>
			<el-table-column prop="name" label="群组名字" min-width="180"></el-table-column>
			<el-table-column prop="creatorMember.name" label="创建人" min-width="180"></el-table-column>
			<el-table-column prop="tags" label="标签" min-width="180"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
			<el-table-column label="状态" width="80">
				<template scope="scope">
					<div v-if="scope.row.status == 0">
						<a href="javascript:void(0)" @click="groupChangeStatus(scope.row.id)"><el-tag type="danger">未审核</el-tag></a>
					</div>
					<div v-else>
						<a href="javascript:void(0)" @click="groupChangeStatus(scope.row.id)"><el-tag type="success" >已审核</el-tag></a>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-popover
							ref="deletePopover"
							placement="top"
							width="160"
							trigger="click">
						<p>确定要删除群组吗？</p>
						<div style="text-align: right; margin: 0">
							<el-button type="primary" size="mini" @click="groupDelete(scope.row.id)">确定</el-button>
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
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { groupList, groupDelete, groupChangeStatus} from '../../api/api';

	export default {
		data() {
			return {
                list: [],
                total: 0,
                pageNo: 1,
                pageSize: 20,
				listLoading: false,
				isenableLoading: false
			}
		},
		methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.groupList();
            },
			//获取列表
            groupList() {
                var params = new URLSearchParams();
                params.append("pageNo", this.pageNo);
                params.append("pageSize", this.pageSize);
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                groupList(params).then((res) => {
                    this.list = res.data;
                    this.total = res.page.totalCount;
                    this.pageNo = res.page.pageNo;
                    this.pageSize = res.page.pageSize;
                    this.listLoading = false;
                });
            },
            groupDelete: function(id) {
                let para = {
                    id: id,
                    token: sessionStorage.getItem("token")
                };
                this.isenableLoading = true;
                groupDelete(para).then((res) => {
                    if (res.code == -1){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
					}else {
                        this.isenableLoading = false;
                        this.groupList();
                    }
                });
            },
			//禁用、启用
            groupChangeStatus: function(id) {
                let para = {
                    id: id,
					token: sessionStorage.getItem("token")
                };
                this.isenableLoading = true;
                groupChangeStatus(para).then((res) => {
                    this.isenableLoading = false;
                    this.groupList();
                });
            }
		},
		mounted() {
			this.groupList();
		}
	}

</script>

<style scoped>

</style>