let app = getApp();
let { list } = require('/common/js/api.js')
let urlFilter = {
  "mediateCase": "/page/detailCase/detailCase",
  "protocol": "/page/detailProtocol/detailProtocol",
  "judgement": "/page/detailDocument/detailDocument",
  "law": "/page/detailLaw/detailLaw"
}
Page({
  data:{
    query:'',
    queryType:'',
    pageSize:10,
    currentPage:1,
    sortFlag:'_score',
    searchList:[],
    count:0,
    requestLoading:false,
    requestLoadingComplete:false
  },
  onLoad(urlQuery) {
    console.log(urlQuery)
    let _this = this
    this.setData({
      query:urlQuery.query,
      queryType:urlQuery.queryType
    })
    this.getList()
  },
  getList(){
    let _this = this
    return new Promise((resolve,reject)=>{
      list({
        query: _this.data.query,
        queryType: _this.data.queryType,
        pageSize: _this.data.pageSize,
        currentPage: _this.data.currentPage,
        sortFlag: _this.data.sortFlag
      }).then((res) => {
        let newList = _this.data.searchList.concat(res.data.data.result)
        newList = newList.map((item)=>{
          item.content = item.content.split('\\n').join(' ')
          return item
        })
        if (res.data.code === 1) {
          _this.setData({
            searchList: newList,
            count:res.data.data.count
          })
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getMore(){
    console.log('已经到底了')
    this.setData({
      currentPage:(this.data.currentPage + 1),
      requestLoading:true
    })
    this.getList().then((res)=>{
      if (res.data.data.result.length !== 0){
        this.setData({
          requestLoading: false
        })
      } else{
        this.setData({
          requestLoading: false,
          requestLoadingComplete:true
        })
      }
    })
  },
  // 改类型
  changeTypes(ev){
    let type = ev.target.dataset.val
    if (type !== this.data.queryType){
      // 重置数据
      this.setData({
        queryType: type,
        pageSize: 10,
        currentPage: 1,
        sortFlag: '_score',
        searchList: [],
        requestLoading: false,
        requestLoadingComplete: false
      })
      this.getList()
    }
  },
  // 改输入内容
  goSearch(ev){
    this.setData({
      query:ev.detail.value,
      pageSize: 10,
      currentPage: 1,
      sortFlag: '_score',
      searchList: [],
      requestLoading: false,
      requestLoadingComplete: false
    })
    this.getList()
  },
  changeQuery(ev){
    this.setData({
      query: ev.detail.value,
    })
  },
  goSearch2(){
    this.setData({
      pageSize: 10,
      currentPage: 1,
      sortFlag: '_score',
      searchList: [],
      requestLoading: false,
      requestLoadingComplete: false
    })
    this.getList()
  },
  // 跳转详情页
  goDetail(ev){
    let _this = this
    dd.navigateTo({
      url: `${urlFilter[_this.data.queryType]}?id=${ev.target.dataset.ids}`
    })
  },
  // 排序
  changeSort(ev){
    if(this.data.sortFlag!==ev.target.dataset.val){
      this.setData({
        sortFlag:ev.target.dataset.val,
        requestLoading: false,
        requestLoadingComplete: false,
        searchList: []
      })
      this.getList()
    }
    
  }
})