let app = getApp();
let { collectionList, collection } = require('/common/js/api.js')
let urlFilter = {
  "caseList": "/page/detailCase/detailCase",
  "protocolList": "/page/detailProtocol/detailProtocol",
  "judgementList": "/page/detailDocument/detailDocument",
  "lawList": "/page/detailLaw/detailLaw"
}
Page({
  data: {
    flag:true,
    collectionJson:{
      caseList:[],
      judgementList:[],
      lawList:[],
      protocolList:[]
    },
    collectionArr:[],
    types:'caseList',
    checkallFlag:false
  },
  onLoad(){
    let _this = this
    dd.showLoading({
      content:'加载中...'
    })
    collectionList().then((res)=>{
      console.log(res)
      if(res.data.code===1){
        let data = res.data.data
        // 增加是否选中的条件
        data.caseList.map((item)=>{
          item.check = false
          item.content = item.content.split('\\n').join(' ')
          item.title = item.title.split('\\n').join(' ')
          return item
        })
        data.judgementList.map((item) => {
          item.check = false
          item.content = item.content.split('\\n').join(' ')
          item.title = item.title.split('\\n').join(' ')
          return item
        })
        data.lawList.map((item) => {
          item.check = false
          item.content = item.content.split('\\n').join(' ')
          item.title = item.title.split('\\n').join(' ')
          return item
        })
        data.protocolList.map((item) => {
          item.check = false
          item.content = item.content.split('\\n').join(' ')
          item.title = item.title.split('\\n').join(' ')
          return item
        })
        _this.setData({
          collectionJson:{
            caseList: data.caseList,
            judgementList: data.judgementList,
            lawList: data.lawList,
            protocolList: data.protocolList
          },
          collectionArr: data.caseList
        })
      }else{
        dd.showToast({
          type: 'fail',
          content: '获取收藏列表失败',
          duration: 3000
        })
      }
      dd.hideLoading()    
    })
  },
  changeTypes(ev){
    let type = ev.target.dataset.val
    console.log(this.data.collectionJson)
    this.setData({
      types:type,
      collectionArr:this.data.collectionJson[type],
      checkallFlag:false
    })
  },
  // 单选
  check(ev){
    let data = ev.target.dataset
    let list = this.data.collectionArr
    let index = this.checkId(list,'ajid',data.id)
    list[index].check = !list[index].check
    this.setData({
      collectionArr:list,
      checkallFlag:false
    })
  },
  // 全选
  checkAll(){
    let list = this.data.collectionArr
    if(this.data.checkallFlag===false){
      list = list.map((item) => {
        item.check = true
        return item
      })
      this.setData({
        collectionArr: list,
        checkallFlag: true
      })
    }else{
      list = list.map((item)=>{
        item.check=false
        return item
      })
      this.setData({
        collectionArr: list,
        checkallFlag: false
      })
    }
  },
  // 查询json数组中是否包含某个值
  checkId(jsonArr,key,value){
    let index = -1
    jsonArr.forEach((item,i)=>{
      if(item[key] === value){
        index = i
        return index
      }
    })
    return index
  },
  // 添加动画
  showOpration(){
    if(this.data.flag){
      let animation = dd.createAnimation({
        duration: 400,
        timingFunction: 'ease-in-out'
      })
      animation.translate(0, 0).step();
      this.setData({
        animationInfo: animation.export(),
        flag:false
      })
    }else{
      let animation = dd.createAnimation({
        duration: 400,
        timingFunction: 'ease-in-out'
      })
      animation.translate('-68rpx', 0).step();
      this.setData({
        animationInfo: animation.export(),
        flag: true
      })
    }
  },
  // 取消收藏
  deleteColct(){
    console.log(this.data.collectionJson)
    let list = this.data.collectionJson
    let arr = []
    list.caseList.forEach((item)=>{
      if(item.check){
        arr.push({
          id:item.ajid,
          isuse:'N',
          subtype: item.subtype,
          title:item.title,
          detailType:'mediateCase'
        })
      }
    })
    list.protocolList.forEach((item) => {
      if (item.check) {
        arr.push({
          id: item.ajid,
          isuse: 'N',
          subtype: item.subtype,
          title: item.title,
          detailType: 'protocol'
        })
      }
    })
    list.judgementList.forEach((item) => {
      if (item.check) {
        arr.push({
          id: item.ajid,
          isuse: 'N',
          subtype: item.subtype,
          title: item.title,
          detailType: 'judgement'
        })
      }
    })
    list.lawList.forEach((item) => {
      if (item.check) {
        arr.push({
          id: item.ajid,
          isuse: 'N',
          subtype: item.subtype,
          title: item.title,
          detailType: 'law'
        })
      }
    })
    if(arr.length===0){
      dd.showToast({
        content:"你还没有选择，请点击完成返回"
      })
    }else{
      collection(arr).then((res)=>{
        dd.redirectTo({ url: '/page/collection/collection' });
      })
    }
  },
  // 跳转链接
  goDetail(ev) {
    let _this = this
    if(this.data.flag){
      dd.navigateTo({
        url: `${urlFilter[_this.data.types]}?id=${ev.target.dataset.ids}`
      })
    }
  },
})