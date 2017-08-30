<template>
    <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="基本设置" name="first">
            <el-form ref="form" :model="baseForm" label-width="100px" style="margin:20px;width:60%;min-width:600px;">
                <el-form-item label="网站名称">
                    <el-input v-model="baseForm.site_name"></el-input>
                </el-form-item>
                <el-form-item label="SEO标题">
                    <el-input v-model="baseForm.site_seo_title"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                    <el-input v-model="baseForm.site_domain"></el-input>
                </el-form-item>
                <el-form-item label="网站关键词">
                    <el-input v-model="baseForm.site_keys"></el-input>
                </el-form-item>
                <el-form-item label="网站描述">
                    <el-input type="textarea" v-model="baseForm.site_description"></el-input>
                </el-form-item>
                <el-form-item label="LOGO">
                    <el-upload
                            class="logo-uploader"
                            :action="uploadUrl()"
                            :show-file-list="false"
                            :on-success="handleLogoScucess"
                            :before-upload="beforeLogoUpload">
                        <img v-if="baseForm.site_logo" :src="baseForm.site_logo" class="logo">
                        <i v-else class="el-icon-plus logo-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="邮箱账号">
                    <el-input v-model="baseForm.site_send_email_account"></el-input>
                </el-form-item>
                <el-form-item label="邮箱密码">
                    <el-input v-model="baseForm.site_send_email_password"></el-input>
                </el-form-item>
                <el-form-item label="SMTP服务器">
                    <el-input v-model="baseForm.site_send_email_smtp"></el-input>
                </el-form-item>
                <el-form-item label="备案号">
                    <el-input v-model="baseForm.site_icp"></el-input>
                </el-form-item>
                <el-form-item label="版权说明">
                    <el-input v-model="baseForm.site_copyright"></el-input>
                </el-form-item>
                <el-form-item label="统计代码">
                    <el-input type="textarea" v-model="baseForm.site_tongji"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="baseUpdate" :loading="listLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="会员设置" name="second">
            <el-form ref="form" :model="memberForm" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
                <el-form-item label="会员登录">
                    <el-switch
                            v-model="memberForm.member_login_open"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="会员注册">
                    <el-switch
                            v-model="memberForm.member_register_open"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="邮箱验证">
                    <el-switch
                            v-model="memberForm.member_email_valid"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="memberUpdate" :loading="listLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="CMS设置" name="third">
            <el-form ref="form" :model="cmsForm" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
                <el-form-item label="文章投稿">
                    <el-switch
                            v-model="cmsForm.cms_post"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="投稿审核">
                    <el-switch
                            v-model="cmsForm.cms_post_review"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="cmsUpdate" :loading="listLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="微博设置" name="fourth">
            <el-form ref="form" :model="weiboForm" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
                <el-form-item label="微博别名">
                    <el-input v-model="weiboForm.weibo_alias"></el-input>
                </el-form-item>
                <el-form-item label="微博字数">
                    <el-input-number v-model="weiboForm.weibo_post_maxcontent" :min="1" :max="500"></el-input-number>
                </el-form-item>
                <el-form-item label="微博发布">
                    <el-switch
                            v-model="weiboForm.weibo_post"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click.native="weiboUpdate" :loading="listLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="群组设置" name="fifth">
            <el-form ref="form" :model="groupForm" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
                <el-form-item label="群组别名" required>
                    <el-input v-model="groupForm.group_alias"></el-input>
                </el-form-item>
                <el-form-item label="群组申请">
                    <el-switch
                            v-model="groupForm.group_apply"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="申请审核">
                    <el-switch
                            v-model="groupForm.group_apply_review"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="groupUpdate" :loading="listLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import util from '../../common/js/util'
    import { basePath, configInfo,configBaseUpdate,configMemberUpdate,configCmsUpdate,configGroupUpdate,configWeiboUpdate } from '../../api/api';
    export default {
        data() {
            return {
                baseForm: {
                    site_name: '',
                    site_seo_title: '',
                    site_domain: '',
                    site_keys: '',
                    site_description: '',
                    site_send_email_account: '',
                    site_send_email_password: '',
                    site_send_email_smtp: '',
                    site_icp: '',
                    site_copyright: '',
                    site_tongji: '',
                    site_logo: ''
                },
                memberForm: {
                    member_login_open: false,
                    member_register_open: false,
                    member_email_valid: false
                },
                cmsForm: {
                    cms_post: false,
                    cms_post_review: false
                },
                weiboForm: {
                    weibo_alias: '',
                    weibo_post_maxcontent: '',
                    weibo_post: false
                },
                groupForm: {
                    group_alias: '',
                    group_apply: false,
                    group_apply_review: false
                },
                logo:'',
                listLoading: true,
                activeName2: 'first'
            };
        },
        methods: {
            //获取信息
            configInfo() {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("token", sessionStorage.getItem("token"));
                configInfo(params).then((res) => {
                    this.baseForm = res;
                    this.memberForm.member_login_open = (res.member_login_open == 1);
                    this.memberForm.member_register_open = (res.member_register_open == 1);
                    this.memberForm.member_email_valid = (res.member_email_valid == 1);
                    this.cmsForm.cms_post = (res.cms_post == 1);
                    this.cmsForm.cms_post_review = (res.cms_post_review == 0);
                    this.weiboForm.weibo_alias = res.weibo_alias;
                    this.weiboForm.weibo_post_maxcontent = res.weibo_post_maxcontent;
                    this.weiboForm.weibo_post = (res.weibo_post == 1);
                    this.groupForm.group_alias = res.group_alias;
                    this.groupForm.group_apply = (res.group_apply == 1);
                    this.groupForm.group_apply_review = (res.group_apply_review == 0);
                    this.listLoading = false;
                });
            },
            baseUpdate() {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("site_name",this.baseForm.site_name);
                params.append("site_seo_title",this.baseForm.site_seo_title);
                params.append("site_domain",this.baseForm.site_domain);
                params.append("site_keys",this.baseForm.site_keys);
                params.append("site_description",this.baseForm.site_description);
                params.append("site_send_email_account",this.baseForm.site_send_email_account);
                params.append("site_send_email_password",this.baseForm.site_send_email_password);
                params.append("site_send_email_smtp",this.baseForm.site_send_email_smtp);
                params.append("site_icp",this.baseForm.site_icp);
                params.append("site_copyright",this.baseForm.site_copyright);
                params.append("site_tongji",this.baseForm.site_tongji);
                params.append("site_logo",this.baseForm.site_logo);
                params.append("token", sessionStorage.getItem("token"));
                configBaseUpdate(params).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                });
            },
            memberUpdate() {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("member_login_open",(this.memberForm.member_login_open == false ? 0 : 1));
                params.append("member_register_open",(this.memberForm.member_register_open == false ? 0 : 1));
                params.append("member_email_valid",(this.memberForm.member_email_valid == false ? 0 : 1));
                params.append("token", sessionStorage.getItem("token"));
                configMemberUpdate(params).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                });
            },
            cmsUpdate() {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("cms_post",(this.cmsForm.cms_post == false ? 0 : 1));
                params.append("cms_post_review",(this.cmsForm.cms_post_review == true ? 0 : 1));
                params.append("token", sessionStorage.getItem("token"));
                configCmsUpdate(params).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                });
            },
            weiboUpdate() {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("weibo_alias",this.weiboForm.weibo_alias);
                params.append("weibo_post_maxcontent",this.weiboForm.weibo_post_maxcontent);
                params.append("weibo_post",(this.weiboForm.weibo_post == false ? 0 : 1));
                params.append("token", sessionStorage.getItem("token"));
                configWeiboUpdate(params).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                });
            },
            groupUpdate() {
                this.listLoading = true;
                var params = new URLSearchParams();
                params.append("group_alias",this.groupForm.group_alias);
                params.append("group_apply",(this.groupForm.group_apply == false ? 0 : 1));
                params.append("group_apply_review",(this.groupForm.group_apply_review == true ? 0 : 1));
                params.append("token", sessionStorage.getItem("token"));
                configGroupUpdate(params).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                });
            },
            uploadUrl: function () {
                return basePath + "uploadImage";
            },
            handleLogoScucess(res, file) {
                if (res.code == -1){
                    this.$message.error(res.message);
                }else {
                    this.baseForm.site_logo = res.url;
                    this.logo = URL.createObjectURL(file.raw);
                }
            },
            beforeLogoUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('LOGO大小不能超过 2MB!');
                }
                return isLt2M;
            }
        },
        mounted() {
            this.configInfo();
        }
    };
</script>

<style>
    .logo-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .logo-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .logo-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .logo {
        width: 178px;
        height: 100px;
        display: block;
    }
</style>