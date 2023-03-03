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
  statAdmin: (url: string) => {
    return request.get(`${BASEAPI}/api/promote/stat/admin?${url}`);
  },
  // 提现 - 申请
  withdrawApply: (url: string) => {
    return request.get(`${BASEAPI}/api/promote/withdraw/apply?${url}`);
  },
  // 提现 - 列表
  withdrawList: (url: string) => {
    return request.get(`${BASEAPI}/api/promote/withdraw/list?${url}`);
  },
  // 用户信息 - 修改昵称
  userSaveNickname: (url: string) => {
    return request.get(`${BASEAPI}/api/promote/user/save/nickname?${url}`);
  },
  // 提现 - 导出
  withdrawExcel: (url: string) => {
    return request.get(`${BASEAPI}/api/promote/withdraw/excel?${url}`);
  },
};
