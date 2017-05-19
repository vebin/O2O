import fetch from './ajax'

export const DEBUG = true                  // 是否开发模式
const HTTP_DEV = 'https://didi.360che.com/nearby-api'      // 测试地址
const HTTPS = 'https://nearby-api.360che.com'              // 正式地址
const URLS = DEBUG ? HTTP_DEV : HTTPS

export const LOCATION = {
  lng: '120.272064',
  lat: '31.648750'
}

class XHR {
// 获取商户类型
  getShopTypes (json) {
    return fetch({
      url: `${URLS}/cm/GetShoptypes.aspx`,
      body: json,
      type: 'POST'
    })
  }
// 获取商户类型
  getShopExtend (json) {
    return fetch({
      url: `${URLS}/cm/GetServiceitems.aspx`,
      body: json,
      type: 'POST'
    })
  }
}
export default new XHR()
