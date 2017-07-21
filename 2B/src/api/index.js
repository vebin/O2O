import fetch from './ajax'

export const DEBUG = true                  // 是否开发模式
const HTTP_DEV = 'https://didi.360che.com/nearby-api'      // 测试地址
const HTTPS = 'https://nearby-api.360che.com'              // 正式地址
const URLS = DEBUG ? HTTP_DEV : HTTPS

const LOCATION = {
  lng: '120.272064',
  lat: '31.648750'
}
class XHR {
  // LOCATION
  currentRegion () {
    return LOCATION
  }
  // 商家入驻
  joinShop (json) {
    return fetch({
      url: `${URLS}/shopin/shopin.aspx`,
      body: json,
      type: 'POST'
    })
  }
// 获取经销商列表
  getdealer (json) {
    return fetch({
      url: `https://dealer-api.360che.com/NearbyBusiness/DealerSubList.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 获取经销商店铺详情
  getdealerDetail (json) {
    return fetch({
      url: `https://dealer-api.360che.com/NearbyBusiness/DealerSubinfo.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 获取商户类型
  getShopTypes (json) {
    return fetch({
      url: `${URLS}/cm/GetShoptypes.aspx`,
      body: json,
      type: 'POST'
    })
  }
// 获取二级商户类型
  getShopExtend (json) {
    return fetch({
      url: `${URLS}/cm/GetServiceitems.aspx`,
      body: json,
      type: 'POST'
    })
  }
// 获取微信配置
  getWechat (json) {
    return fetch({
      url: `${URLS}/cm/Wxconfig.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 发送验证码
  toCode (json) {
    return fetch({
      url: `${URLS}/cm/SMSVerification.aspx`,
      body: json,
      type: 'POST'
    })
  }

// 获取城市列表
  getCity (json) {
    return fetch({
      url: `${URLS}/cm/citys.aspx`,
      body: json,
      type: 'POST'
    })
  }

// 获取驾照类型
  getDriveType (json) {
    return fetch({
      url: `${URLS}/cm/GetLicensetype.aspx`,
      body: json,
      type: 'POST'
    })
  }

// 获取服务站类型
  getBrand (json) {
    return fetch({
      url: `https://product.360che.com/index.php?r=api/brand&cross_domain=1`,
      body: json,
      type: 'GET'
    })
  }
// 驾校报名信息列表
  getDriveList (json) {
    return fetch({
      url: `${URLS}/shopout/registlist.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 驾校报名信息详情
  getDriveDetail (json) {
    return fetch({
      url: `${URLS}/shopout/registinfo.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 营业执照上传
  uploadLicenseInfo (json) {
    return fetch({
      url: `${URLS}/shopin/certificatemodify.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 附近商家列表(包含搜索)
  nearbyShopList (json) {
    return fetch({
      url: `${URLS}/shopout/shoplist.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 线上商家详情接口
  getShoperInfo (json) {
    return fetch({
      url: `${URLS}/shopout/shopinfo.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 未审核店家详情接口
  noAdoptInfo (json) {
    return fetch({
      url: `${URLS}/shopout/waiterinfo.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 我的上传接口
  myUploadShop (json) {
    return fetch({
      url: `${URLS}/shopout/recommendlist.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 首页快速入口广告
  homeadvert (json) {
    return fetch({
      url: `${URLS}/shopout/quickentry.aspx`,
      body: json,
      type: 'GET'
    })
  }

// app端获取用户昵称
  getUserNameApp (json) {
    return fetch({
      url: `http://bbs-api.360che.com/interface/app/index.php?type=user&action=UserInfo&method=simpleInfo`,
      body: json,
      type: 'GET'
    })
  }

// 提交评论
  submitComment (json) {
    return fetch({
      url: `${URLS}/shopin/commentin.aspx`,
      body: json,
      type: 'POST'
    })
  }
}
export default new XHR()
