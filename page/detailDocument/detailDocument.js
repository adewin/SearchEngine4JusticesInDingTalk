let app = getApp();
let { judgement, recommendList, collection } = require('/common/js/api.js')
let urlFilter = {
  "mediateCase": "/page/detailCase/detailCase",
  "protocol": "/page/detailProtocol/detailProtocol",
  "judgement": "/page/detailDocument/detailDocument",
  "law": "/page/detailLaw/detailLaw"
}
Page({
  data: {
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
    docDetail: {
      smallClass: '',
      title: '',
      trialDate: '',
      caseId: '',
      courtName: '',
      keyword: [],
      collectFlag: 0,
      likeFlag: 0,
      caseContent: '',
      trialReason: '',
      trialResult: ''
    },
    caseContentFlag: false,
    trialReasonFlag: false,
    trialResultFlag: false
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
  getDetail(id) {
    let _this = this
    judgement(id).then((res) => {
      console.log(res)
      if (res.data.code === 1) {
        let caseContentFlag = false  //案件详情
        let trialReasonFlag = false //判决理由
        let trialResultFlag = false //判决结果
        let { title, smallClass, smallClassId,collectFlag, likeFlag, trialDate, caseId, keyword, courtName, caseContent, trialReason,trialResult } = res.data.data
        // 数据处理
        courtName = _this.changeNull(courtName)
        keyword = _this.changeLine(keyword)
        caseContent = _this.changeNull(caseContent)
        trialReason = _this.changeNull(trialReason)
        trialResult = _this.changeNull(trialResult)
        if (caseContent.length > 99) {
          caseContentFlag = true
        }
        if (trialReason.length > 99) {
          trialReasonFlag = true
        }
        if (trialResult.length > 99) {
          trialResultFlag = true
        }
        caseContent = _this.changeEnter(caseContent)
        trialReason = _this.changeEnter(trialReason)
        trialResult = _this.changeEnter(trialResult)
        _this.setData({
          docDetail: {
            smallClassId: smallClassId,
            smallClass: smallClass,
            title: title,
            trialDate: trialDate,
            caseId: caseId,
            courtName: courtName,
            keyword: keyword,
            collectFlag: collectFlag,
            likeFlag: likeFlag,
            caseContent: caseContent,
            trialReason: trialReason,
            trialResult: trialResult
          },
          caseContentFlag: caseContentFlag,
          trialReasonFlag: trialReasonFlag,
          trialResultFlag: trialResultFlag
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
      detailType: 'judgement'
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
    if (tgt === 'caseContentFlag') {
      this.setData({
        caseContentFlag: false
      })
    } else if (tgt === 'trialReasonFlag') {
      this.setData({
        trialReasonFlag: false
      })
    } else if (tgt === 'trialResultFlag') {
      this.setData({
        trialResultFlag: false
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
    let docDetail = _this.data.docDetail
    let param = [{
      id: this.data.id,
      isuse: ev.target.dataset.val,
      subtype: this.data.docDetail.smallClassId,
      title: this.data.docDetail.title,
      detailType: 'judgement'
    }]
    collection(param).then((res) => {
      console.log(res)
      if (res.data.code === 1) {
        if (ev.target.dataset.val === 'Y') {
          docDetail.likeFlag = 1
          _this.setData({
            docDetail: docDetail
          })
        } else {
          docDetail.collectFlag = 1
          _this.setData({
            docDetail: docDetail
          })
        }
      } else if (res.data.code === 6) {
        if (ev.target.dataset.val === 'Y') {
          docDetail.likeFlag = 0
          _this.setData({
            docDetail: docDetail
          })
        } else {
          docDetail.collectFlag = 0
          _this.setData({
            docDetail: docDetail
          })
        }
      }
    })
  }
})