import $ from 'jquery'
import { config } from './config'
const url = window.location.href
let apiUrl = process.env.NODE_ENV == 'development'? "https://web.test.heiheilove.com/api/cps/outer/error/report":"https://web.heiheilove.com/api/cps/outer/error/report"
let obj = config.find(element => element.id == getUrlDataFN(url).aid)
Object.assign(obj,{'phone':isiOS()})
window.onload = function(){
  let scriptElement = document.createElement('script');
  document.getElementsByTagName('head')[0].appendChild(scriptElement)
  scriptElement.src = obj.src
  if(process.env.NODE_ENV == 'development'){
    sendHttpRequest('测试环境下会发送此消息')
  }
  sendHttpRequest('页面加载完成拿到的参数:'+ window.location.search + ',系统类型:' + (isiOS()?'ios':'android') + ',后台api:' + apiUrl + ',加载信息:' + JSON.stringify(obj))
  setTimeout(() => {
    try{
      MobLink({
        el: '#share',
        path: '/cps/sharingtransfer.html',
        default: true,
        loadDataType:'1',//配置是否加loading，配置代表加入loading，不配置则没有loading动画
        params: {
          'inviteCode': getUrlDataFN(url).invitecode,
        }
      });
      setTimeout(() => {
        sendHttpRequest('调用MobLink成功,传递参数为:'+ getUrlDataFN(url).invitecode);
        $(function () {
          $('#share').bind("click", function () {
            console.log('3213')
          })
          $('#share').trigger("click");
        })
      },800);
    }catch (e){
      sendHttpRequest('调用MobLink出错信息:'+ e )
      setTimeout(() => {
        WebsiteFunction(obj.id)
      }, 200);
    }
  }, 1000);
}
function WebsiteFunction(id){
  if(id == 54 || id == 55){
    window.location.href = obj.phone? obj.website_ios : obj.website_android
  }else{
    window.location.href = obj.website
  }
}
function isiOS(){
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
function sendHttpRequest(data){
  $.ajax({
    url:apiUrl,
    type:"post",
    data:{"cid":2,"data":data},
    dataType:"json",
    success:function(res){
      console.log('请求成功',res)
    },
    error:function(){
      console.log("请求失败")
    }
  })
  }
function getUrlDataFN(urlStr) {
  const urlObj = {}
  if (urlStr.indexOf('?') === -1) return null
  const index = urlStr.indexOf('?') 
  const dataStr = urlStr.substr(index + 1)
  const dataArr = dataStr.split('&')
  dataArr.forEach(str => {
    if (str.indexOf('=') === -1) {
      urlObj[str] = undefined
    } else {
      const innerArrIndex = str.indexOf('=')
      const key = str.substring(0, innerArrIndex)
      const value = str.substr(innerArrIndex + 1)
      urlObj[key] = value
    }
  })
  return urlObj
}