import axios from 'axios';

// let base = 'http://localhost:8090/jeesns/manage/';
let base = '';
export const basePath = base;

export const login = params => { return axios.post(`${base}login`, params).then(res => res.data); };
export const currVersion = params => { return axios.get(`${base}version`, { params: params }).then(res => res.data); };

export const actionList = params => { return axios.get(`${base}sys/action/list`, { params: params }).then(res => res.data); };
export const actionLogList = params => { return axios.get(`${base}sys/action/actionLogList`, { params: params }).then(res => res.data); };
export const memberActionLog = params => { return axios.get(`${base}sys/action/memberActionLog`, { params: params }).then(res => res.data); };
export const actionInfo = params => { return axios.get(`${base}sys/action/info`, { params: params }).then(res => res.data); };
export const actionUpdate = params => { return axios.post(`${base}sys/action/update`, params).then(res => res.data); };
export const actionIsenable = params => { return axios.get(`${base}sys/action/isenable`, { params: params }).then(res => res.data); };

export const scoreRuleList = params => { return axios.get(`${base}sys/scoreRule/list`, { params: params }).then(res => res.data); };
export const scoreRuleEnable = params => { return axios.get(`${base}sys/scoreRule/enabled`, { params: params }).then(res => res.data); };
export const scoreRuleInfo = params => { return axios.get(`${base}sys/scoreRule/info`, { params: params }).then(res => res.data); };
export const scoreRuleUpdate = params => { return axios.post(`${base}sys/scoreRule/update`, params).then(res => res.data); };
export const configInfo = params => { return axios.post(`${base}sys/config/info`, params).then(res => res.data); };
export const configBaseUpdate = params => { return axios.post(`${base}sys/config/baseUpdate`, params).then(res => res.data); };
export const configMemberUpdate = params => { return axios.post(`${base}sys/config/memberUpdate`, params).then(res => res.data); };
export const configCmsUpdate = params => { return axios.post(`${base}sys/config/cmsUpdate`, params).then(res => res.data); };
export const configGroupUpdate = params => { return axios.post(`${base}sys/config/groupUpdate`, params).then(res => res.data); };
export const configWeiboUpdate = params => { return axios.post(`${base}sys/config/weiboUpdate`, params).then(res => res.data); };

export const articleCateList = params => { return axios.get(`${base}cms/articleCate/list`, { params: params }).then(res => res.data); };
export const articleCateInfo = params => { return axios.get(`${base}cms/articleCate/info`, { params: params }).then(res => res.data); };
export const articleCateSave = params => { return axios.post(`${base}cms/articleCate/save`, params).then(res => res.data); };
export const articleCateUpdate = params => { return axios.post(`${base}cms/articleCate/update`, params).then(res => res.data); };
export const articleCateDelete = params => { return axios.get(`${base}cms/articleCate/delete`, { params: params }).then(res => res.data); };

export const articleList = params => { return axios.get(`${base}cms/article/list`, { params: params }).then(res => res.data); };
export const articleInfo = params => { return axios.get(`${base}cms/article/info`, { params: params }).then(res => res.data); };
export const articleSave = params => { return axios.post(`${base}cms/article/save`, params).then(res => res.data); };
export const articleUpdate = params => { return axios.post(`${base}cms/article/update`, params).then(res => res.data); };
export const articleDelete = params => { return axios.get(`${base}cms/article/delete`, { params: params }).then(res => res.data); };
export const articleAudit = params => { return axios.get(`${base}cms/article/audit`, { params: params }).then(res => res.data); };

export const memberList = params => { return axios.get(`${base}member/list`, { params: params }).then(res => res.data); };
export const memberDelete = params => { return axios.get(`${base}member/delete`, { params: params }).then(res => res.data); };
export const memberIsenable = params => { return axios.get(`${base}member/isenable`, { params: params }).then(res => res.data); };

export const memberManagerList = params => { return axios.get(`${base}member/manager/list`, { params: params }).then(res => res.data); };
export const memberManagerSave = params => { return axios.post(`${base}member/manager/save`, params ).then(res => res.data); };
export const memberManagerCancel = params => { return axios.get(`${base}member/manager/cancel`, { params: params }).then(res => res.data); };

export const weiboList = params => { return axios.get(`${base}weibo/list`, { params: params }).then(res => res.data); };
export const weiboDelete = params => { return axios.get(`${base}weibo/delete`, { params: params }).then(res => res.data); };

export const groupList = params => { return axios.get(`${base}group/list`, { params: params }).then(res => res.data); };
export const groupDelete = params => { return axios.get(`${base}group/delete`, { params: params }).then(res => res.data); };
export const groupChangeStatus = params => { return axios.get(`${base}group/changeStatus`, { params: params }).then(res => res.data); };

