import { Toast } from "vant";
import { realmName } from '../config/index'
import store from '../store/index'
export default {
  /**
   * 格式化时间
   * 调用 FormatDate(strDate, "yyyy-MM-dd HH:mm:ss")
   * @param strDate （中国标准时间）时间戳等都可以
   * @param strFormat 返回格式
   * @returns
   */
  formatDate(strDate: any, strFormat?: any) {
    if (!strDate) return;
    // if (!strFormat) strFormat = "yyyy-MM-dd";
    if (!strFormat) strFormat = "yyyy-MM-dd HH:mm:ss";
    switch (typeof strDate) {
      case "string":
        strDate = new Date(strDate.replace(/-/g, "/"));
        break;
      case "number":
        strDate = new Date(strDate);
        break;
    }
    if (strDate instanceof Date) {
      const dict: any = {
        yyyy: strDate.getFullYear(),
        M: strDate.getMonth() + 1,
        d: strDate.getDate(),
        H: strDate.getHours(),
        m: strDate.getMinutes(),
        s: strDate.getSeconds(),
        MM: ("" + (strDate.getMonth() + 101)).substr(1),
        dd: ("" + (strDate.getDate() + 100)).substr(1),
        HH: ("" + (strDate.getHours() + 100)).substr(1),
        mm: ("" + (strDate.getMinutes() + 100)).substr(1),
        ss: ("" + (strDate.getSeconds() + 100)).substr(1),
      };
      return strFormat.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function (m: any) {
        return dict[m];
      });
    }
  },
  /**
   *
   * @param timestamp 时间戳
   * @param day 要减去的日子 因为比较*当天*的话，是不需要减的，所以默认定义成0
   * @returns 比较后的值，比较成功，则返回`true`，失败则返回`false`
   */
  compareDate(timestamp: any, day: any = 0) {
    return (
      new Date(timestamp).getDate() == new Date().getDate() - day &&
      new Date(timestamp).getMonth() == new Date().getMonth() &&
      new Date(timestamp).getFullYear() == new Date().getFullYear()
    );
  },
  /**
   * 复制
   * @param value
   */
  handleCopy(value: string) {
    // const dummy = document.createElement("input"); // 不支持换行符
    const dummy = document.createElement("textarea"); // 支持换行符
    document.body.appendChild(dummy);
    dummy.value = value;
    dummy.select(); // 选择对象
    document.execCommand("copy"); // 执行浏览器复制命令
    document.body.removeChild(dummy);
    Toast.success("已复制至剪切板");
  },
  // 判断渠道
  judgmentChannel(){
    const url = window.location.origin
    new Promise(function(resolve){
      let count = 0
      let obj = {}
      realmName.forEach(ele => {
        if(ele.url == url){
          obj = ele
        }
        count += 1
      })
      if(count == realmName.length){
        resolve(obj)
      }
    }).then((res:any) => {
      if(res.channel){
        store.commit('saveChannel',res)
      }else{
        store.commit('saveChannel',realmName[4])
      }
    })
  },
  // 获取时间
  countDown () {
    const Y = new Date().getFullYear()
    const M = new Date().getMonth() + 1
    const D = new Date().getDate()
    const h = new Date().getHours()
    const m = new Date().getMinutes()
    const s = new Date().getSeconds()

    const date1 = this.addZero(Y);
    const date2 = this.addZero(M);
    const date3 = this.addZero(D);
    const date4 = this.addZero(h);
    const date5 = this.addZero(m);
    const date6 = this.addZero(s);

    return {Y:date1,M:date2,D:date3,h:date4,m:date5,s:date6}
  },
  addZero (i:any) {
    return i < 10 ? "0" + i : i + "";
  }
};
