<template>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {login} from '../api/api';
    export default {
        data() {
            return {
                logining: false,
                loginForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleSubmit(ev) {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var params = new URLSearchParams();
                        params.append("name", this.loginForm.account);
                        params.append("password", this.loginForm.password);
                        login(params).then(res => {
                            this.logining = false;
                            let {message, code, data} = res;
                            if (code == -1) {
                                this.$message({
                                    message: message,
                                    type: 'error'
                                });
                            } else {
                                sessionStorage.setItem('manager', JSON.stringify(data.user));
                                sessionStorage.setItem('token', data.token);
                                this.$router.push({path: '/main'});
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>