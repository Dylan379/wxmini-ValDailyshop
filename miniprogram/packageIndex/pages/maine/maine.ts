// packageIndex/pages/maine/maine.ts
const thisapp1 = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:false,
    hasLogin:false,
    avatarUrl:'',
    account:'',
    navBarTitle: thisapp1.globalData.navBarTitle,
    currentIndex: 3,
    ability:[
      {
        name:'查询武器或捆绑包',
        icon:'search',
        url:'../../../ability/pages/search/search'
      },
      {
        name:'锐评每日商店',
        icon:'comment',
        url:'../../../ability/pages/comment/comment'
      },
      {
        name:'我的喜欢',
        icon:'like',
        url:'../../../ability/pages/like/like'
      },
      {
        name:'想要推送',
        icon:'bellring-on',
        url:'../../../ability/pages/belling/belling'
      }
    ]
  },
  // getUserName(e:any){
  //   this.setData({
  //     userName:e.detail.value
  //   })
  // },
  getAvatar(res:any){
    this.setData({
      avatarUrl:res.detail.avatarUrl
    })
  },
  login(){
    const that = this;
    if(this.data.avatarUrl){
      wx.login({
        success(res:any){
          wx.request({
            method: 'POST',
            url: 'http://localhost:5000/users/login',
            data: {
              code:res.code,
              avatarurl:that.data.avatarUrl,
              nikename:wx.getStorageSync('account')
            },
            success(res:any){
              if(res.data.code === '0'){
                wx.setStorageSync('token',res.data.token)
                that.setData({
                  hasLogin:true
                })
              }
            }
          })
        },
      })
    }else{
      wx.showToast({
        title:'选择用户信息',
        icon:'error',
        mask:true
      })
    }
    


  },
  /**
   * 生命周期函数--监听页面加载
   */
  goToPage(e: any) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
    wx.redirectTo({
      url: thisapp1.globalData.navBarTitle[e.target.dataset.index].url
    })
  },
  goToAbilityPage(e:any){
    wx.navigateTo({
      url: this.data.ability[e.currentTarget.dataset.index].url
    })
  },

  
  onLoad() {
    const that = this;
    this.setData({
      account:wx.getStorageSync('account')
    });
    if(wx.getStorageSync('token')){
        wx.request({
          method:'POST',
          url: 'http://localhost:5000/users/getUserinfo',
          data:{
            token:wx.getStorageSync('token')
          },
          success(res:any){
            if(res.data.code === '0'){
              that.setData({
                hasUserInfo:true,
                hasLogin:true,
                avatarUrl:res.data.userInfo.avatarurl
              })
            }
          },
        })
    }
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