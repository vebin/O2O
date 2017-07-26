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
// 商家入驻
  joinShop (json) {
    return fetch({
      url: `${URLS}/shopin/shopin.aspx`,
      body: json,
      type: 'POST'
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

 // 获取微信配置
  getWechat (json) {
    return fetch({
      url: `${URLS}/cm/Wxconfig.aspx`,
      body: json,
      type: 'GET'
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
// 判断当前论坛登录用户是否为O2O平台入驻商户
  getUserInfo (json) {
    return fetch({
      url: `${URLS}/shopout/shopinfo_bbsid.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 线上商家详情接口已通过
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
// 待审核被驳回商户编辑
  failEdit (json) {
    return fetch({
      url: `${URLS}/shopin/waitermodify.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 线上商户编辑
  passEdit (json) {
    return fetch({
      url: `${URLS}/shopin/shopmodify.aspx`,
      body: json,
      type: 'POST'
    })
  }
// 商家营业执照信息
  licenseInfo (json) {
    return fetch({
      url: `${URLS}/shopout/shopcertificates.aspx`,
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
// 驾校添加/编辑报名信息
  getRegisterIn (json) {
    return fetch({
      url: `${URLS}/shopin/registerin.aspx`,
      body: json,
      type: 'GET'
    })
  }
// 驾校添加/编辑报名信息
  editInfo (json) {
    return fetch({
      url: `${URLS}/shopout/modifyinfo.aspx`,
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
  // 添加主营业务
  addMainBusiness (json) {
    return fetch({
      url: `${URLS}/shopin/businessin.aspx`,
      body: json,
      type: 'GET'
    })
  }
  // 删除主营业务
  deleteMainBusiness (json) {
    return fetch({
      url: `${URLS}/shopin/businessdel.aspx`,
      body: json,
      type: 'GET'
    })
  }
}
export default new XHR()
