let app = getApp();
let { userInfo } = require('/common/js/api.js')
//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
Page({
  data:{
    personInfo:{
      username:'',
      mobile:'',
      avatar:'/common/image/head.png',
      likeCount:0
    }
  },
  onLoad(){
    let _this = this
    userInfo().then((res)=>{
      console.log(res)
      if(res.data.code === 1){
        let { username, mobile, avatar, likeCount } = res.data.data
        // 处理一下头像
        if(!avatar){
          avatar = '/common/image/head.png'
        }
        _this.setData({
          personInfo:{
            username: username,
            mobile: mobile,
            avatar: avatar,
            likeCount: likeCount
          }
        }) 
      } else {
        dd.showToast({
          type: 'fail',
          content: '系统错误',
          duration: 3000
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  },
  changeRouter(ev) {
    dd.navigateTo({ url: ev.target.dataset.url })
  },
  goBack() {
    dd.navigateBack(1)
  }
})