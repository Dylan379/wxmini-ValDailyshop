// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
Page({
  data: {
    userName: '',
    userPwd: '',
    isLoading: false,
    needVerify: false,
    hasUserInfo: false,
    inCache:true,
    token: '59a05fbc-9281-11ed-a2f5-525400c9274f'
  },

  bindInputUserName(e: any) {  //双向绑定用户名
    this.setData({
      userName: e.detail.value
    })
  },
  bindInputUserPwd(e: any) {  //双向绑定密码
    this.setData({
      userPwd: e.detail.value
    })
  },

  // 事件处理函数
  bindCacheLoginTap(){
    this.setData({
      isLoading: true
    });
    let thisPage = this;
    wx.request({
      method: 'POST',
      url: 'https://val.musnow.top/api/v2/shop',
      data: {
        token: this.data.token,
        account: this.data.userName,
        raw:1,
      },
      success(res:any){
        wx.setStorageSync('account',thisPage.data.userName)
        if(res.data.code === 0){
          wx.setStorageSync('shopData',res.data)
          wx.redirectTo({
            url:'../../packageIndex/pages/index/index?account='+thisPage.data.userName
          })
        }else if(res.data.code === 200){
          thisPage.setData({
            isLoading: false,
            inCache:false
          })
        }
      }
    })
  },
  bindLoginTap() {
    this.setData({
      isLoading: true
    })
    wx.setStorageSync('account',this.data.userName)
    let thisIndex = this;
    wx.request({
      method: 'POST',
      url: 'https://val.musnow.top/api/v2/login',
      data: {
        token: this.data.token,
        account: this.data.userName,
        passwd: this.data.userPwd
      },
      success(res:any) {
        if(res.data.code === 0){
          if(res.data.info === "2fa用户，请使用/tfa接口提供邮箱验证码"){
            wx.navigateTo({
              url:'/pages/loginVerify/loginVerify?account='+thisIndex.data.userName+'&token='+thisIndex.data.token
            })
          }else{
            //直接跳转至首页
          }
        }else if(res.data.code === 200){
            wx.showToast({
              title:'用户名或密码错误,请检查后重试',
              icon:'error',
              duration:2000
            })
        }else{
          wx.showToast({
            title:'请检查设备并联系管理员',
            icon:'error',
            duration:2000
          })
        }
      },
      fail() {
        console.log('fail')
        wx.showToast({
          title:'请检查设备并联系管理员',
          icon:'error',
          duration:2000
        })
      },
      complete() {
        console.log('complete')
        thisIndex.setData({
          isLoading: false
        })
      }
    })
  },
})
