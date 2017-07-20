# user-shoper

> 附近商家商家版2.1

# Change Log
 2.1 新增需求
  *  编辑店铺页面 上传图片改为多图上传 
  *  编辑店铺页面 新加主营业务    （选择驾照的时候隐藏此模块）
  *  编辑店铺页面 新加店铺业务
  *  新加选择主营业务页面
  *  新加多图上传页面（asdasd）
  *  驾校店铺的驾照类型模块移出到店铺详情页面 并修改样式


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