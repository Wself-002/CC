import request from "./request";
const BASEAPI = process.env.VUE_APP_BASEAPI;

export default {
  login: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/login/pswd`,data);
  },
  // 列表 - 管理员
  listAdmin: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/leader/members`,data);
  },
  // 用户信息
  userInfo: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/admin/info`,data);
  },
  // 列表 - 推广员
  listStaff: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/member/users`,data);
  },
  // 统计 - 推广员
  statStaff: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/member/total`,data);
  },
  // 异常上报
  errorReport: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/error/report`,data);
  },
  // 统计 - 管理员
  statAdmin: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/leader/total`,data);
  },
  // 用户信息 - 修改昵称
  userSaveNickname: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/admin/nickname/update`,data);
  },
  // 待支付数据查询
  payListSearch: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/orders`,data);
  },
  // 查询
  userSearch: (data: any) => {
    return request.qspost(`${BASEAPI}/api/cps/outer/user/search`,data);
  },


};
