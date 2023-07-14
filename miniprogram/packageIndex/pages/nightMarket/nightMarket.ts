// packageIndex/pages/nightMarket/nightMarket.ts
import getBonusWeaponInfo from '../../utils/api/getBonusWeaponInfo'
const thisapp1 = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle: thisapp1.globalData.navBarTitle,
    currentIndex: 2,
    bonusWeaponInfo: [] as any[],
    cardIndex: -1,
    skinLevelColor: {
      "12683d76-48d7-84a3-4e09-6985794f0445": '#7cb8f0',
      "0cebb8be-46d7-c12a-d306-e9907bfc5a25": '#04cca7',
      "60bca009-4182-7998-dee7-b8a2558dc369": '#e772a7',
      "e046854e-406c-37f4-6607-19a9ba8426fc": '#fcb78d',
      "411e4a55-4e59-7757-41f0-86a53f101bb5": '#f7e19c',
    },
    showFlag: [
      ['transform: rotateY(360deg);', 'transform: rotateY(180deg);'],
       ['transform: rotateY(360deg);', 'transform: rotateY(180deg);'],
        ['transform: rotateY(360deg);', 'transform: rotateY(180deg);'], 
        ['transform: rotateY(360deg);', 'transform: rotateY(180deg);'],
         ['transform: rotateY(360deg);', 'transform: rotateY(180deg);'], 
         ['transform: rotateY(360deg);', 'transform: rotateY(180deg);']]
  },
  goToPage(e: any) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
    wx.redirectTo({
      url: thisapp1.globalData.navBarTitle[e.target.dataset.index].url
    })
  },
  showBonusWeapon(e: any) {
      this.setData({
        cardIndex: e.currentTarget.dataset.index,
        ['showFlag[' + e.currentTarget.dataset.index + ']']: 0
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    if (wx.getStorageSync('BonusStore'))
      this.setData({
        bonusWeaponInfo: await getBonusWeaponInfo(wx.getStorageSync('BonusStore')) as []
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