Component({
  data:{
    hide:false,
    animationInfo:''
  },
  methods:{
    changeUrl(ev) {
      console.log('短按')
      if(this.data.hide == true){
        this.animation.translate(0, 0).opacity(1).step({ duration: 500 })
        this.animation.rotateY(0).step({ duration: 500 });
        // this.animation.backgroundColor('#ff0000').step({ duration: 500 })
        this.setData({
          animationInfo: this.animation.export(),
          hide: false
        });
      }
    },
    forFun(ev) {
      console.log('长按')
      if(this.data.hide == false){
        dd.confirm({
          title: '温馨提示',
          content: '是否想要隐藏小图标',
          confirmButtonText: '马上隐藏',
          cancelButtonText: '暂不需要',
          success: (result) => {
            console.log(result)
            if (result.confirm == true) {
              let animation = dd.createAnimation({
                duration: 800,
                timingFunction: 'ease-in-out',
              })
              this.animation = animation
              animation.rotateY(1080).step();
              animation.translate('78rpx', 0).opacity(0.7).step({ duration: 500 })
              this.setData({
                animationInfo: animation.export(),
                hide: true
              });
            }
          },
        })
      }
    } 
  }
})