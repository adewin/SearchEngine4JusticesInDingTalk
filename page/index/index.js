let app = getApp();
//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
let { login, recommend} = require('/common/js/api.js')
let typeFilter = {
  "mediateCase":"案例",
  "protocol":"协议",
  "judgement":"文书",
  "law":"法律"
}
let classFilter = {
  "mediateCase": "types blue",
  "protocol": "types orange",
  "judgement": "types red",
  "law": "types green"
}
let urlFilter = {
  "mediateCase": "/page/detailCase/detailCase",
  "protocol": "/page/detailProtocol/detailProtocol",
  "judgement": "/page/detailDocument/detailDocument",
  "law": "/page/detailLaw/detailLaw"
}
let typeFilter2 = {
  "案例": "mediateCase",
  "协议": "protocol",
  "文书": "judgement",
  "法律": "law"
}
Page({
  data:{
    corpId: '',
    hotList:[],
    newList:[],
    showWhich:'hot',
    showList:[],
    showImg:false
  },
  onLoad(){
    console.log(app)
    let _this = this;
    this.setData({
      corpId: app.globalData.corpId
    })
    if(dd.getStorageSync({ key: 'showImage' })) {
      this.setData({
        showImg:true
      })
      dd.setStorageSync({
        key: 'showImage',
        data: false
      })
      setTimeout(()=>{
        _this.setData({
          showImg: false
        })
      },3000)
    }
    this.init()
  },
  init() {
    let _this = this
    console.log(this.data.showImg)
    if(!this.data.showImg){
      dd.showLoading({
        content: '加载中'
      })
    }
    // 先拿登录凭证
    dd.getAuthCode({
      success: (res) => {
        // 调登录接口
        login(res.authCode).then((res) => {
          console.log(res)
          if(res.data.code === 1){
            recommend().then((res)=>{
              if(res.data.code===1){
                let data = res.data.data
                let hotList = data.hotList.map((item)=>{
                  let queryType = item.queryType
                  item.queryType = typeFilter[queryType]
                  item.class = classFilter[queryType]
                  item.content = item.content.split('\\n').join(' ')
                  item.title = item.title.split('\\n').join(' ')
                  return item
                })
                let newList = data.newList.map((item) => {
                  let queryType = item.queryType
                  item.queryType = typeFilter[queryType]
                  item.class = classFilter[queryType]
                  item.content = item.content.split('\\n').join(' ')
                  item.title = item.title.split('\\n').join(' ')
                  return item
                })
                _this.setData({
                  hotList: hotList,
                  newList: newList,
                  showList: hotList
                })
                console.log(hotList)
              }
              dd.hideLoading()
            }).catch((err)=>{
              console.log(err)
              dd.showToast({
                type: 'fail',
                content: '系统错误',
                duration: 3000
              })
            })
          }
        }).catch((err) => {
          console.log(err)
          dd.showToast({
            type: 'fail',
            content: '登录失败',
            duration: 3000
          })
        })
      },
      fail: (err) => {
        dd.alert({
          content: JSON.stringify(err)
        })
      }
    })
  },
  changeRouter(ev){
    dd.navigateTo({ url: ev.target.dataset.url})
  },
  goDetail(ev){
    console.log(ev)
    dd.navigateTo({ url: `${urlFilter[typeFilter2[ev.target.dataset.types]]}?id=${ev.target.dataset.ids}`})
  },
  changeShow(ev){
    if (ev.target.dataset.which === 'hot'){
      this.setData({
        showWhich: ev.target.dataset.which,
        showList: this.data.hotList
      })
    } else {
      this.setData({
        showWhich: ev.target.dataset.which,
        showList: this.data.newList
      })
    }
  }
})