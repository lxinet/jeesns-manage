import axios from 'axios';

let base = 'http://localhost:8080/jeesns/manage';

export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const actionList = params => { return axios.get(`${base}/sys/action/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };