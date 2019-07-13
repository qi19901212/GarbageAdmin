import request from '@/utils/request'
import Qs from 'qs'

export function login(accessToken,functionName) {
  const params={
    "access_token":accessToken,
    "env":"laji-bopv4",
    "name":functionName,
  }
  return request({
    url: 'api/tcb/invokecloudfunction',
    method: 'POST',
    data:params
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// grant_type=client_credential&appid=APPID&secret=APPSECRET
export function getAccessToken() {
  const params = {
    "grant_type": "client_credential",
    "appid": "",
    "secret": ""
  } 
  return request({
    url: 'api/cgi-bin/token',
    method: 'get',
    params
  })
}

export  function invokecloudfunction(accessToken,functionName,params){
  return request({
    url: 'api/tcb/invokecloudfunction?access_token='+accessToken+"&env=laji-bopv4"+"&name="+functionName,
    method: 'POST',
    data:params
  })
}
//https://api.weixin.qq.com/tcb/databasequery?access_token=ACCESS_TOKEN
// 查询
export function query(token,query){
  const params={
    "env":"laji-bopv4",
    "query":query,
  }
  console.log("==params=="+JSON.stringify(params))
  var url='api/tcb/databasequery?access_token='+token;
  return request({
    url: url,
    method: 'POST',
    data:params
  })
}
