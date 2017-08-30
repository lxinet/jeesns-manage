<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" width="80">ID</el-table-column>
			<el-table-column prop="member.name" label="会员" width="180"></el-table-column>
			<el-table-column prop="action.log" label="操作" min-width="180"></el-table-column>
			<el-table-column prop="action.remark" label="描述" min-width="180"></el-table-column>
			<el-table-column prop="createTime" label="时间" width="180"></el-table-column>
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
	//import NProgress from 'nprogress'
	import { actionLogList} from '../../api/api';

	export default {
		data() {
			return {
                list: [],
				total: 0,
                pageNo: 1,
                pageSize: 20,
				listLoading: false
			}
		},
		methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
			handleCurrentChange(val) {
				this.page = val;
				this.actionLogList();
			},
			//获取列表
            actionLogList() {
                var params = new URLSearchParams();
                params.append("pageNo", this.pageNo);
                params.append("pageSize", this.pageSize);
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                actionLogList(params).then((res) => {
                    this.list = res.data;
                    this.total = res.page.totalCount;
                    this.pageNo = res.page.pageNo;
                    this.pageSize = res.page.pageSize;
                    this.listLoading = false;
                });
            }
		},
		mounted() {
			this.actionLogList();
		}
	}

</script>