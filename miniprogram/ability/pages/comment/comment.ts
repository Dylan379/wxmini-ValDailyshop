// ability/pages/comment/comment.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chromasIndex: 0,
    weaponLevelVideoIndex: 0,
    dailyWeaponInfo:'',
    skinLevelColor: {
      "12683d76-48d7-84a3-4e09-6985794f0445": '#7cb8f0',
      "0cebb8be-46d7-c12a-d306-e9907bfc5a25": '#04cca7',
      "60bca009-4182-7998-dee7-b8a2558dc369": '#e772a7',
      "e046854e-406c-37f4-6607-19a9ba8426fc": '#fcb78d',
      "411e4a55-4e59-7757-41f0-86a53f101bb5": '#f7e19c',
    },
   scores:[
      {
        pointDiscript:'不太好',
        isBright:true
      },
      {
        pointDiscript:'一般',
        isBright:false
      },
      {
        pointDiscript:'差强人意',
        isBright:false
      },
      {
        pointDiscript:'不错！',
        isBright:false
      },
      {
        pointDiscript:'值得入手！',
        isBright:false
      }
    ],
    starIndex:0,
    weaponIndex:0,
    myComment:'',
  },
  submitComment(){
    if(this.data.myComment.length > 5){
      wx.request({
        method:'POST',
        url: 'http://localhost:5000/users/addSkinComment',
        data:{
          token:wx.getStorageSync('token'),
          weaponUuid:this.data.dailyWeaponInfo[this.data.weaponIndex].levels[0].uuid,
          score:(this.data.starIndex+1)*20,
          comment:this.data.myComment
        },
        success(res:any){
          console.log(res);
          if(res.data.code < '10'){
            wx.showToast({
              title:res.data.msg,
              icon:'success',
              mask:true
            })
          }
        }
      })
    }else{
      wx.showToast({
        title:'评论过短',
        icon:'error',
        mask:true
      })
    }
    
  },
  inputComment(e:any){
    this.setData({
      myComment:e.detail.value
    })
  },
  ligtingStar(e:any){
    for(let i = 1;i<=e.currentTarget.dataset.index;i++){
      this.setData({
        ['scores['+i+'].isBright']:true
      })
    }
    for(let j = 4;j>e.currentTarget.dataset.index;j--){
      this.setData({
        ['scores['+j+'].isBright']:false
      })
    }
    this.setData({
      starIndex:e.currentTarget.dataset.index
    })
  },
  changeWeapon(e: any) {
    this.setData({
      chromasIndex: 0,
      weaponLevelVideoIndex: 0,
      weaponIndex: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      dailyWeaponInfo:wx.getStorageSync('dailyWeaponInfo')
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