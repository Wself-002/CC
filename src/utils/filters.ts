export default {
  /**超出默认隐藏长度的文本显示省略号 */
  ellipsis(value: string) {
    if (!value) return "";
    if (value.length > 5) {
      return value.slice(0, 5) + "...";
    }
    return value;
  },
  formatDate(strDate: any, strFormat?: any) {
    if (!strDate) return 0;
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
};
