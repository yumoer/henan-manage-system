import request from '../utils/request';
var formData = new FormData();

// 获取商品详细参数
export const reqGoodsParams = query => {
  return request({
    url: '/hngov/goods/params',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 获取品目配件信息
export const reqGoodsItems = query => {
  return request({
    url: 'hngov/goods/items',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 获取品目增值服务信息
export const reqGoodsService = query => {
  return request({
    url: '/hngov/goods/service',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 商品报价
export const reqReportPrice = query => {
  return request({
    url: '/hngov/report/price',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 配件报价
export const reqReportPartPrice = query => {
  return request({
    url: '/hngov/report/partPrice',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 配件报价
export const reqReportServicePrice = query => {
  return request({
    url: '/hngov/report/servicePrice',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 获取已报价商品
export const reqQuoteGoods = query => {
  return request({
    url: '/hngov/quote/goods',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 获取获取商品的所有信息
export const reqGoodsInfo = query => {
  return request({
    url: '/hngov/goods/info',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 推送商品上下架功能
export const reqGoodsShelf = query => {
  return request({
    url: '/hngov/goods/shelf',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 撤销报价
export const reqCancelPrice = query => {
  return request({
    url: '/hngov/cancel/price',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 可报价品牌名称商品
export const reqQuotePmmc = query => {
  return request({
    url: '/hngov/quote/pmmc',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 获取订单信息
export const reqOrdersInfo = query => {
  return request({
    url: '/hngov/orders/info',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 确认订单-审核
export const reqOrderCommit = query => {
  return request({
    url: '/hngov/order/commit',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 取消订单
export const reqOrderCancel = query => {
  return request({
    url: '/hngov/order/cancel',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 推送物流消息
export const reqOrderLogistics = query => {
  return request({
    url: '/hngov/order/logistics',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 推送签收信息
export const reqOrderSigning = query => {
  return request({
    url: '/hngov/order/signing',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 推送订单发票开具信息
export const reqOrderInvoice = query => {
  return request({
    url: '/hngov/order/invoice',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 发票收到时间
export const reqInvoiceAccept = query => {
  return request({
    url: '/hngov/invoice/accept',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};
// 获取订单合同
export const reqOrderContac = query => {
  return request({
    url: '/hngov/order/contract',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 推送订单收款
export const reqOrderReceipt = query => {
  return request({
    url: '/hngov/order/receipt',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};
// 获取验证时间
export const reqOrdereAccept = query => {
  return request({
    url: '/hngov/order/accept',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 上传图片
export const reqGoodsCode = query => {
  return request({
    url: '/hngov/goods/code',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};


// 上传图片
/*export const reqCodeAudited = query => {
  return request({
    url: '/hngov/order/audited',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};*/

export const reqGetOrder = query => {
  return request({
    url: '/hngov/get/order',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

export const reqAuthorLogin = query => {
  return request({
    url: '/hngov/author/login',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 未读消息
export const reqExecutePost = query => {
  return request({
    url: '/execute/',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 单独标记
export const reqExecutePut = query => {
  return request({
    url: '/execute/',
    method: 'put',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 删除
export const reqExecuteDelete = query => {
  return request({
    url: '/execute/',
    method: 'delete',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};

// 首页
export const reqTotalOrders = query => {
  return request({
    url: '/hngov/total/orders',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: formData,
    data: query
  });
};
