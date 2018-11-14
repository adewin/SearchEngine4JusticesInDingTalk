let app = getApp();
let { tipsCN, tipsEN, searchHotWord } = require('/common/js/api.js')
Page({
  data: {
    searchVal: '',
    keywordArr:[],
    tipsArr:[],
    showTip:true,
    searchType:'mediateCase',
    searchHistory:[]
  },
  onLoad(){
    // dd.showLoading({
    //   content: '加载中'
    // });
    this.init()
  },
  init(){
    let _this = this
    searchHotWord().then((res)=>{
      _this.setData({
        keywordArr:res.data.data
      })
    }).catch((err)=>{
      console.log(err)
    })
    // 获取历史记录
    dd.getStorage({
      key: 'search',
      success: function(res) {
        console.log(res)
        _this.setData({
          searchHistory:res.data?res.data:[]
        })
      },
      fail: function(err) {
        console.log(err)
      }
    });
  },
  goSearch(ev) {
    let hisArr = this.data.searchHistory
    if (ev.target.dataset.val && ev.target.dataset.val!==''){
      // 添加历史记录
      if (hisArr.indexOf(ev.target.dataset.val) === -1) {
        hisArr.push(ev.target.dataset.val)
        dd.setStorageSync({
          key: 'search',
          data: hisArr
        })
      }
      dd.navigateTo({
        url: `/page/searchList/searchList?query=${ev.target.dataset.val}&queryType=${this.data.searchType}`
      })
    }else{
      if (this.data.searchVal!==''){
        if (hisArr.indexOf(this.data.searchVal) === -1) {
          hisArr.push(this.data.searchVal)
          dd.setStorageSync({
            key: 'search',
            data: hisArr
          })
        }
        dd.navigateTo({
          url: `/page/searchList/searchList?query=${this.data.searchVal}&queryType=${this.data.searchType}`
        })
      }
    }
  },
  // 搜索提示
  querySearch(ev) {
    let _this = this
    let queryString = ev.detail.value
    let CN = this.ifCN(queryString)
    this.setData({
      searchVal: queryString
    })
    if (CN) {
      tipsCN(CN).then((res) => {
        if(res.data.code===1){
          _this.setData({
            tipsArr:res.data.data,
            showTip:true
          })
        }   
      })
    } else {
      tipsEN(queryString).then((res) => {
        if (res.data.code === 1) {
          _this.setData({
            tipsArr: res.data.data,
            showTip: true
          })
        }   
      })
    }
  },
  // 选择搜索提示
  getSearchType(ev){
    this.setData({
      searchType: ev.target.dataset.val
    })
  },
  // 隐藏搜索提示
  hide(){
    this.setData({
      showTip:false
    })
  },
  // 获取汉字
  ifCN(v) {
    if (v === '' || (/^\s*$/gi).test(v)) return ''
    let res = v.match(/[\u4e00-\u9fa5]*/g)
    if (res) {
      return res.join('')
    } else return false
  },
  // 清空搜索历史
  clearHistory(){
    let _this = this
    dd.removeStorage({
      key: 'search',
      success: function() {
        _this.setData({
          searchHistory:[]
        })
        dd.alert({ content: '删除成功' })
      }
    })
  },
  // 删除某条历史记录
  delete(ev){
    let str = ev.target.dataset.val
    let arr = this.data.searchHistory
    let index = arr.indexOf(str)
    arr.splice(index, 1)
    dd.setStorageSync({
      key: 'search',
      data: arr
    })
    this.setData({
      searchHistory: arr
    })
  }
})