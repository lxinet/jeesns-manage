<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" width="80">ID</el-table-column>
			<el-table-column prop="member.name" label="会员" width="180"></el-table-column>
			<el-table-column prop="content" label="内容" min-width="180"></el-table-column>
			<el-table-column prop="favor" label="点赞数" width="180"></el-table-column>
			<el-table-column prop="createTime" label="发布时间" min-width="180"></el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-popover
							ref="deletePopover"
							placement="top"
							width="160"
							trigger="click">
						<p>确定要删除微博吗？</p>
						<div style="text-align: right; margin: 0">
							<el-button type="primary" size="mini" @click="weiboDelete(scope.row.id)">确定</el-button>
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
	import { weiboList, weiboDelete} from '../../api/api';

	export default {
		data() {
			return {
                list: [],
                total: 0,
                pageNo: 1,
                pageSize: 20,
				listLoading: false,
			}
		},
		methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.weiboList();
            },
			//获取列表
            weiboList() {
                var params = new URLSearchParams();
                params.append("pageNo", this.pageNo);
                params.append("pageSize", this.pageSize);
                params.append("token", sessionStorage.getItem("token"));
                this.listLoading = true;
                weiboList(params).then((res) => {
                    this.list = res.data;
                    this.total = res.page.totalCount;
                    this.pageNo = res.page.pageNo;
                    this.pageSize = res.page.pageSize;
                    this.listLoading = false;
                });
            },
            weiboDelete: function(id) {
                let para = {
                    id: id,
					token: sessionStorage.getItem("token")
                };
                this.listLoading = true;
                weiboDelete(para).then((res) => {
                    if (res.code == -1){
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }else {
                        this.listLoading = false;
                        this.weiboList();
                    }
                });
            }
		},
		mounted() {
			this.weiboList();
		}
	}

</script>

<style scoped>

</style>