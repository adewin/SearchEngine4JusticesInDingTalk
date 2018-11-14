let app = getApp();
let { mediateCase, recommendList, collection } = require('/common/js/api.js')
let urlFilter = {
  "mediateCase": "/page/detailCase/detailCase",
  "protocol": "/page/detailProtocol/detailProtocol",
  "judgement": "/page/detailDocument/detailDocument",
  "law": "/page/detailLaw/detailLaw"
}
Page({
  data:{
    mediateCase:{
      title:'',
      keyword:[]
    },
    protocol:{
      title: '',
      keyword: []
    },
    judgement:{
      title: '',
      keyword: []
    },
    lawArr:[],
    id: '',
    caseDetail:{
      smallClassId:'',
      smallClass:'',
      refereeDept:'',
      transactDate:'',
      collectFlag:0,
      likeFlag:0,
      keyword:[],
      refereed:'',
      title:'',
      mediateCircs:'',
      mediateComment:'',
      mediateCont:'',
      mediateExplain:''
    },
    mediateCircsFlag: false,
    mediateCommentFlag: false,
    mediateCont: false,
    mediateExplain: false
  },
  onLoad(urlQuery){
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
    mediateCase(id).then((res)=>{
      console.log(res)
      if(res.data.code===1){
        let mediateCircsFlag = false
        let mediateCommentFlag = false
        let mediateContFlag = false
        let mediateExplainFlag = false
        let { smallClass, smallClassId, refereeDept, transactDate, collectFlag, likeFlag, keyword, refereed, title, mediateCircs, mediateComment, mediateCont, mediateExplain } = res.data.data
        // 数据处理
        refereeDept = _this.changeNull(refereeDept)
        refereed = _this.changeNull(refereed)
        keyword = _this.changeLine(keyword)
        if (mediateCircs.length > 99) {
          mediateCircsFlag = true
        }
        if (mediateComment.length > 99) {
          mediateCommentFlag = true
        }
        if (mediateCont.length > 99) {
          mediateContFlag = true
        }
        if (mediateExplain.length > 99) {
          mediateExplainFlag = true
        }
        mediateCircs = _this.changeEnter(mediateCircs)
        mediateComment = _this.changeEnter(mediateComment)
        mediateCont = _this.changeEnter(mediateCont)
        mediateExplain = _this.changeEnter(mediateExplain)
        _this.setData({
          caseDetail:{
            smallClassId: smallClassId,
            smallClass: smallClass,
            refereeDept: refereeDept,
            transactDate: transactDate,
            collectFlag: collectFlag,
            likeFlag: likeFlag,
            keyword: keyword,
            refereed: refereed,
            title: title,
            mediateCircs: mediateCircs,
            mediateComment: mediateComment,
            mediateCont: mediateCont,
            mediateExplain: mediateExplain
          },
          mediateCircsFlag: mediateCircsFlag,
          mediateCommentFlag: mediateCommentFlag,
          mediateContFlag: mediateContFlag,
          mediateExplainFlag: mediateExplainFlag
        })
      }else{
        dd.showToast({
          type: 'fail',
          content: '系统错误',
          duration: 3000
        })
      }
      dd.hideLoading()
    }).catch((err)=>{
      console.log(err)
    })
  },
  getRecommendList(id){
    let _this = this
    recommendList({
      id:id,
      detailType:'mediateCase'
    }).then((res)=>{
      console.log(res)
      let data = res.data.data
      let law = res.data.data.law
      law.map((item)=>{
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
        lawArr:data.law
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
  showAll(ev){
    let tgt = ev.target.dataset.val
    if (tgt === 'mediateCircsFlag'){
      this.setData({
        mediateCircsFlag: false
      })
    } else if (tgt === 'mediateCommentFlag'){
      this.setData({
        mediateCommentFlag: false
      })
    } else if (tgt === 'mediateContFlag') {
      this.setData({
        mediateContFlag: false
      })
    } else if (tgt === 'mediateExplainFlag') {
      this.setData({
        mediateExplainFlag: false
      })
    }
  },
  // 法条展开收起
  showLaw(ev){
    let arr = this.data.lawArr
    let idArr = arr.map((item)=>{
      return {
        id:item.id
      }
    })
    let which = 0
    idArr.forEach((item,index)=>{
      if(item.id === ev.target.dataset.id){
        which = index
      }
    })
    arr[which].show = !arr[which].show
    this.setData({
      lawArr:arr
    })
  },
  // 跳转详情页
  goDetail(ev) {
    console.log(ev)
    dd.navigateTo({ url: `${urlFilter[ev.target.dataset.types]}?id=${ev.target.dataset.ids}` })
  },
  // 点赞收藏
  collect(ev){
    console.log(ev)
    let _this = this
    let caseDetail = _this.data.caseDetail
    let param = [{
      id:this.data.id,
      isuse:ev.target.dataset.val,
      subtype: this.data.caseDetail.smallClassId,
      title: this.data.caseDetail.title,
      detailType: 'mediateCase'
    }]
    console.log(param)
    collection(param).then((res)=>{
      console.log(res)
      if(res.data.code===1){
        if (ev.target.dataset.val === 'Y'){
          caseDetail.likeFlag = 1
          _this.setData({
            caseDetail:caseDetail
          })
        } else{
          caseDetail.collectFlag = 1
          _this.setData({
            caseDetail: caseDetail
          })
        }
      }else if(res.data.code===6){
        if (ev.target.dataset.val === 'Y') {
          caseDetail.likeFlag = 0
          _this.setData({
            caseDetail: caseDetail
          })
        } else {
          caseDetail.collectFlag = 0
          _this.setData({
            caseDetail: caseDetail
          })
        }
      }
    })
  }
})