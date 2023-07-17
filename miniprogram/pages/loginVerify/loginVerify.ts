// pages/loginVerify/loginVerify.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    verifyCode:'',
    account:'',
    token:'',
    isFocus:false,
    isShowLoading:false,
    isShowMask:false
  },

  onFocus(){
    this.setData({isFocus:true});
  },
  setVerifyCode(e:any){
    const that = this;
    this.setData({verifyCode:e.detail.value});
    if(this.data.verifyCode.length === 6){
      this.setData({
        isShowLoading:true,
        isShowMask:true
      })
      wx.request({
        method:'POST',
        url: 'https://val.musnow.top/api/v2/tfa',
        data:{
          "account":decodeURI(this.data.account),
          "token":decodeURI(this.data.token),
          "vcode":decodeURI(this.data.verifyCode) 
        },
        success(res:any){
          if(res.data.code === 0){
            const users = wx.getStorageSync('users') || {}
            users[that.data.account] = res.data.user;
            wx.setStorageSync('users',users);
            wx.removeStorageSync('shopData')
            wx.redirectTo({
              url:'../../packageIndex/pages/index/index?account='+that.data.account+'&userInfo='+JSON.stringify(res.data.user)
            })
          }else{
            if(res.data.info === "未知错误"){
              wx.showToast({
                title:'请勿重复登录',
                icon:'error',
                mask:true
              })
              setTimeout(()=>{
                wx.redirectTo({
                  url:'../login/login'
                })
              },1000)
            }else{
              wx.showToast({
                title:'验证码错误',
                icon:'error',
                mask:true
              })
              that.setData({
                isShowLoading:false,
                isShowMask:false,
                verifyCode:'',
              })
            }
          }
        },
        fail(){
  
        },
        complete(){
          console.log('complete');
          console.log(wx.getStorageSync('users'));
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    this.setData({
      account:opt.account,
      token:opt.token
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})