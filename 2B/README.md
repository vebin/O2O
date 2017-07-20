# user-shoper

> 附近商家用户版2.0

# Change Log
 2.1 新增需求
  * 首页菜单 合并为8个模块 

  *  列表样式优化

 * 店铺详情页新加模块 1. 店铺介绍  2. 主营业务 3. 卡友评价  4.样式优化
  * 新加 评论页面


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 公共方法 
this.setApp() 
* return 'appNew' 
 > 代表 版本号大于等于6.14的app ios和Android可以调用app的上传图片方法
* return 'appOld' 
 > 代表 版本号小于6.14的app 需要调用input file上传图片
* return 'other' 
 > 代表 不是app版本的 走微信的方法

## 目录结构
### src 
 * api 封装了ajax的方法
 * common 公共的交互方法 和css reset
 * components 按照页面区分各个模块页面
 * page 所有页面
 * router 路由跳转 
 * store vuex状态管理和封装的sessionStorage 存储 删除 等功能