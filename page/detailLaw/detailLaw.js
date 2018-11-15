let app = getApp();
let { law, collection} = require('/common/js/api.js')
Page({
  data: {
    id:'',
    toView: '',
    lawList:[],
    title:'',
    timeLiness:'',
    publisher:'',
    enforceDate:'',
    collectFlag:0,
    likeFlag:0,
    levelEffective:''
  },
  onLoad(ev){
    let id = ev.id
    let _this = this
    dd.showLoading({
      content:'加载中'
    })
    law(id).then((res)=>{
      console.log(res)
      if(res.data.code === 1){
        let data = res.data.data
        let lawList = data.lawContent.map((item)=>{
          item.value = item.value.map((item2)=>{
            item2.content = item2.content.split('\\n')
            return item2
          })
          return item
        })
        console.log(lawList)
        _this.setData({
          id:id,
          title: _this.changeNull(data.lawName),
          timeLiness: _this.changeNull(data.timeLiness),
          publisher: _this.changeNull(data.publisher),
          enforceDate: _this.changeNull(data.enforceDate),
          toView: id,
          lawList: lawList,
          collectFlag: data.collectFlag,
          likeFlag: data.likeFlag,
          levelEffective: data.levelEffective
        })
        dd.hideLoading()
      }
    }).catch((err)=>{
      console.log(err)
    })
  },
  // 点赞收藏
  collect(ev) {
    console.log(ev)
    let _this = this
    let param = [{
      id: this.data.id,
      isuse: ev.target.dataset.val,
      subtype: this.data.levelEffective,
      title: this.data.title,
      detailType: 'law'
    }]
    collection(param).then((res) => {
      console.log(res)
      if (res.data.code === 1) {
        if (ev.target.dataset.val === 'Y') {
          _this.setData({
            likeFlag: 1
          })
        } else {
          _this.setData({
            collectFlag: 1
          })
        }
      } else if (res.data.code === 6) {
        if (ev.target.dataset.val === 'Y') {
          _this.setData({
            likeFlag: 0
          })
        } else {
          _this.setData({
            collectFlag: 0
          })
        }
      }
    })
  },
  changeNull(val) {
    return !val ? '暂无信息' : val
  },
})