App({
  onLaunch(options) {
    // E应用初始化，当E应用初始化完成时触发，全局只触发一次
    this.globalData.corpId = options.query.corpId;
    dd.setStorageSync({
      key: 'showImage',
      data: true
    })
  },
  onShow() {
    // E应用显示，当E应用启动，或从后台进入前台显示时触发
  },
  onHide() {
    // E应用隐藏，当E应用从前台进入后台时触发
  },
  onError(){
    // E应用报错，当E应用发生 js 错误时触发
  },
  globalData: {
    corpId:''
  }
});