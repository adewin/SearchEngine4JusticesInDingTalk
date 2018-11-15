let app = getApp();
let { protocol, recommendList, collection} = require('/common/js/api.js')
let urlFilter = {
  "mediateCase": "/page/detailCase/detailCase",
  "protocol": "/page/detailProtocol/detailProtocol",
  "judgement": "/page/detailDocument/detailDocument",
  "law": "/page/detailLaw/detailLaw"
}
Page({
  data:{
    mediateCase: {
      title: '',
      keyword: []
    },
    protocol: {
      title: '',
      keyword: []
    },
    judgement: {
      title: '',
      keyword: []
    },
    lawArr: [],
    id:'',
    proDetail:{
      title:'',
      smallClass:'',
      smallClassId:'',
      dateaccepted:'',
      refereeDept:'',
      refereeName:'',
      agreementAmount:0,
      keyword:[],
      collectFlag:0,
      likeFlag:0,
      dealAgreement:'',
      dealDispute:'',
      items:''
    },
    dealAgreementFlag:false,
    dealDisputeFlag:false,
    itemsFlag:false
  },
  onLoad(urlQuery) {
    dd.showLoading({
      content: '加载中'
    });
    this.setData({
      id: urlQuery.id
    })
    this.getDetail(urlQuery.id)
    this.getRecommendList(urlQuery.id)
  },
  getDetail(id){
    let _this = this
    protocol(id).then((res)=>{
      console.log(res)
      if (res.data.code === 1){
        let dealAgreementFlag = false  //协议内容
        let dealDisputeFlag = false //纠纷事实
        let itemsFlag = false //申请事项
        let { title, smallClass, smallClassId, dateaccepted, refereeDept, refereeName, agreementAmount, keyword, collectFlag, likeFlag, dealAgreement, dealDispute, items} = res.data.data
        // 数据处理
        refereeDept = _this.changeNull(refereeDept)
        refereeName = _this.changeNull(refereeName)
        keyword = _this.changeLine(keyword)
        dealAgreement = _this.changeNull(dealAgreement)
        dealDispute = _this.changeNull(dealDispute)
        items = _this.changeNull(items)
        if (dealAgreement.length > 99) {
          dealAgreementFlag = true
        }
        if (dealDispute.length > 99) {
          dealDisputeFlag = true
        }
        if (items.length > 99) {
          itemsFlag = true
        }
        dealAgreement = _this.changeEnter(dealAgreement)
        dealDispute = _this.changeEnter(dealDispute)
        items = _this.changeEnter(items)
        _this.setData({
          proDetail: {
            title: title,
            smallClass: smallClass,
            smallClassId:smallClassId,
            dateaccepted: dateaccepted,
            refereeDept: refereeDept,
            refereeName: refereeName,
            agreementAmount: agreementAmount,
            keyword: keyword,
            collectFlag: collectFlag,
            likeFlag: likeFlag,
            dealAgreement: dealAgreement,
            dealDispute: dealDispute,
            items: items
          },
          dealAgreementFlag: dealAgreementFlag,
          dealDisputeFlag: dealDisputeFlag,
          itemsFlag: itemsFlag
        })
      } else {
        dd.showToast({
          type: 'fail',
          content: '系统错误',
          duration: 3000
        })
      }
      dd.hideLoading()
    }).catch((err) => {
      console.log(err)
    })
  },
  getRecommendList(id) {
    let _this = this
    recommendList({
      id: id,
      detailType: 'protocol'
    }).then((res) => {
      console.log(res)
      let data = res.data.data
      let law = res.data.data.law
      law.map((item) => {
        item.content = _this.changeEnter(item.content)
        item.show = false
      })
      data.mediateCase[0].keyword = _this.changeLine(data.mediateCase[0].keyword)
      data.protocol[0].keyword = _this.changeLine(data.protocol[0].keyword)
      data.judgement[0].keyword = _this.changeLine(data.judgement[0].keyword)
      _this.setData({
        mediateCase: data.mediateCase[0],
        protocol: data.protocol[0],
        judgement: data.judgement[0],
        lawArr: data.law
      })
      console.log(_this.data.mediateCase)
    })
  },
  changeNull(val) {
    return !val ? '暂无信息' : val
  },
  // 解析\n
  changeEnter(val) {
    return val.split('\\n')
  },
  // 解析|
  changeLine(val) {
    return val.split('|')
  },
  // 展开
  showAll(ev) {
    let tgt = ev.target.dataset.val
    if (tgt === 'dealAgreementFlag') {
      this.setData({
        dealAgreementFlag: false
      })
    } else if (tgt === 'dealDisputeFlag') {
      this.setData({
        dealDisputeFlag: false
      })
    } else if (tgt === 'itemsFlag') {
      this.setData({
        itemsFlag: false
      })
    }
  },
  // 法条展开收起
  showLaw(ev) {
    let arr = this.data.lawArr
    let idArr = arr.map((item) => {
      return {
        id: item.id
      }
    })
    let which = 0
    idArr.forEach((item, index) => {
      if (item.id === ev.target.dataset.id) {
        which = index
      }
    })
    arr[which].show = !arr[which].show
    this.setData({
      lawArr: arr
    })
  },
  // 跳转详情页
  goDetail(ev) {
    console.log(ev)
    dd.navigateTo({ url: `${urlFilter[ev.target.dataset.types]}?id=${ev.target.dataset.ids}` })
  },
  // 点赞收藏
  collect(ev) {
    console.log(ev)
    let _this = this
    let proDetail = _this.data.proDetail
    let param = [{
      id: this.data.id,
      isuse: ev.target.dataset.val,
      subtype: this.data.proDetail.smallClassId,
      title: this.data.proDetail.title,
      detailType: 'protocol'
    }]
    collection(param).then((res) => {
      console.log(res)
      if (res.data.code === 1) {
        if (ev.target.dataset.val === 'Y') {
          proDetail.likeFlag = 1
          _this.setData({
            proDetail: proDetail
          })
        } else {
          proDetail.collectFlag = 1
          _this.setData({
            proDetail: proDetail
          })
        }
      } else if (res.data.code === 6) {
        if (ev.target.dataset.val === 'Y') {
          proDetail.likeFlag = 0
          _this.setData({
            proDetail: proDetail
          })
        } else {
          proDetail.collectFlag = 0
          _this.setData({
            proDetail: proDetail
          })
        }
      }
    })
  }
})