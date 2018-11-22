let domain = "http://47.100.45.156:8686"
let url = {
  login:'/dingTalk/user/login',
  tipsCN:'/dingTalk/suggest/hanZi',
  tipsEN:'/dingTalk/suggest/pinYin',
  recommend:'/dingTalk/user/recommend',
  searchHotWord:'/dingTalk/mediate/searchHotWord',
  list:'/dingTalk/mediate/list',
  mediateCase:'/dingTalk/detail/mediateCase',
  judgement:'/dingTalk/detail/judgement',
  protocol: '/dingTalk/detail/protocol',
  law: '/dingTalk/detail/law',
  recommendList:'/dingTalk/mediate/recommendList',
  userInfo:'/dingTalk/user/userInfo',
  collection:'/dingTalk/user/collection',
  collectionList:'/dingTalk/user/collectionList'
}
// 登录
let login = (authCode) => {
  return new Promise((resolve,reject)=>{
    dd.httpRequest({
      url: domain + url.login,
      method: 'GET',
      data: {
        authCode: authCode
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {  
        reject(res)
        dd.hideLoading()
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 个人信息
let userInfo = () => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.userInfo,
      method: 'GET',
      data: {
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
        dd.hideLoading()
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 热门搜索
let recommend = () => {
  return new Promise((resolve,reject)=>{
    dd.httpRequest({
      url:domain+url.recommend,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
        dd.hideLoading()
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 搜索热词
let searchHotWord = () => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.searchHotWord,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
        dd.hideLoading()
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 搜索列表
let list = (params) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.list,
      method: 'POST',
      data: params,
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
        dd.hideLoading()
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 案件详情
let mediateCase = (id) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.mediateCase,
      method: 'GET',
      data: {
        id: id
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
        dd.hideLoading()
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 裁判文书详情
let judgement = (id) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.judgement,
      method: 'GET',
      data: {
        id: id
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 协议书详情
let protocol = (id) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.protocol,
      method: 'GET',
      data: {
        id: id
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 法律全文详情
let law = (id) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.law,
      method: 'GET',
      data: {
        id: id
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 详情推荐
let recommendList = (params) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.recommendList,
      method: 'GET',
      data: params,
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 中文提示
let tipsCN = (prefix) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.tipsCN,
      method: 'GET',
      data: {
        prefix: prefix
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 英文提示
let tipsEN = (prefix) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.tipsEN,
      method: 'GET',
      data: {
        prefix: prefix
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
// 收藏/推荐
let collection = (params) => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.collection,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(params),
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}
//收藏列表
let collectionList = () => {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: domain + url.collectionList,
      method: 'GET',
      data: {
      },
      dataType: 'json',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        dd.hideLoading()
        reject(res)
        dd.showToast({
          content: '加载失败',
          duration: 3000
        })
      }
    })
  })
}

export { login, userInfo, tipsCN, tipsEN, recommend, searchHotWord, list, mediateCase, judgement, protocol, law, recommendList, collection, collectionList }