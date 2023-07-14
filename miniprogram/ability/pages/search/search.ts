// ability/pages/search/search.ts
import getSkinBundles from '../../api/getSkinBoundles'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnColor: '#fff',
    skinName: '',
    skinBoundlesInfo: [] as any[],
    skinLevelColor: {
      "12683d76-48d7-84a3-4e09-6985794f0445": ['#7cb8f0', 'https://media.valorant-api.com/contenttiers/12683d76-48d7-84a3-4e09-6985794f0445/displayicon.png'],
      "0cebb8be-46d7-c12a-d306-e9907bfc5a25": ['#04cca7', 'https://media.valorant-api.com/contenttiers/0cebb8be-46d7-c12a-d306-e9907bfc5a25/displayicon.png'],
      "60bca009-4182-7998-dee7-b8a2558dc369": ['#e772a7', 'https://media.valorant-api.com/contenttiers/60bca009-4182-7998-dee7-b8a2558dc369/displayicon.png'],
      "e046854e-406c-37f4-6607-19a9ba8426fc": ['#fcb78d', 'https://media.valorant-api.com/contenttiers/e046854e-406c-37f4-6607-19a9ba8426fc/displayicon.png'],
      "411e4a55-4e59-7757-41f0-86a53f101bb5": ['#f7e19c', 'https://media.valorant-api.com/contenttiers/411e4a55-4e59-7757-41f0-86a53f101bb5/displayicon.png'],
    },
    chromasIndex: 0,
    weaponIndex: 0
  },
  addMylike(e:any) {
    const that = this;
    if (wx.getStorageSync('token')) {
      const weaponUuid = this.data.skinBoundlesInfo[e.currentTarget.dataset.index].levels[0].uuid;
      wx.request({
        method: 'POST',
        url: 'http://localhost:5000/users/add2MyLike',
        data: {
          token: wx.getStorageSync('token'),
          weaponUuid: weaponUuid
        },
        success(res: any) {
          if (res.data.code === '0') {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              mask: true
            })
            that.setData({
              ['skinBoundlesInfo[' + e.currentTarget.dataset.index + '].displayIcon']: 'field'
            })
          } else if (res.data.code === '01') {
            wx.showToast({
              title: '已添加过',
              icon: 'success',
              mask: true
            })
            that.setData({
              ['skinBoundlesInfo[' + e.currentTarget.dataset.index + '].displayIcon']: 'field'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        mask: true
      })
    }
  },
  bellringMe(e: any) {
    const that = this;
    if (wx.getStorageSync('token')) {
      const weaponUuid = this.data.skinBoundlesInfo[e.currentTarget.dataset.index].levels[0].uuid;
      wx.request({
        method: 'POST',
        url: 'http://localhost:5000/users/add2MyBellring',
        data: {
          token: wx.getStorageSync('token'),
          weaponUuid: weaponUuid
        },
        success(res: any) {
          if (res.data.code === '0') {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              mask: true
            })
            that.setData({
              ['weaponInfo[' + e.currentTarget.dataset.index + '].displayIcon']: 'field'
            })
          } else if (res.data.code === '01') {
            wx.showToast({
              title: '已添加过',
              icon: 'success',
              mask: true
            })
            that.setData({
              ['weaponInfo[' + e.currentTarget.dataset.index + '].displayIcon']: 'field'
            })
          }
        }
      })
    }
  },
  setSkinName(e: any) {
    this.setData({
      skinName: e.detail.value
    })
  },
  async searchWeapons() {
    const that = this;
    this.setData({
      btnColor: '#000'
    }),
      setTimeout(() => {
        this.setData({
          btnColor: '#fff'
        })
      }, 1000);
      if(this.data.skinName.length === 0){
        wx.showToast({
          title:'查询条件为空',
          icon:'error',
          mask:true
        })
      }else{
        await getSkinBundles(wx.getStorageSync('token'), this.data.skinName)
        .then((res: any) => {
          if (res) {
            that.data.skinBoundlesInfo.length = 0;
            that.setData({
              skinBoundlesInfo: res
            })
          }
        })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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