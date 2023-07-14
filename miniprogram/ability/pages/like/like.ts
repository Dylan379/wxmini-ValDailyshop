import getWeaponInfo from "../../../packageIndex/utils/api/getWeaponInfo";

// ability/pages/like/like.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weaponInfo: [] as any[],
    weaponInfoArr: [] as any[],
    hasWeaponInfo: false,
    skinLevelColor: {
      "12683d76-48d7-84a3-4e09-6985794f0445": '#7cb8f0',
      "0cebb8be-46d7-c12a-d306-e9907bfc5a25": '#04cca7',
      "60bca009-4182-7998-dee7-b8a2558dc369": '#e772a7',
      "e046854e-406c-37f4-6607-19a9ba8426fc": '#fcb78d',
      "411e4a55-4e59-7757-41f0-86a53f101bb5": '#f7e19c',
    },
    chromasIndex: 0,
    weaponIndex: 0,
  },
  disLike(e: any) {
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '该皮肤将会从你的喜欢列表删除，你确定吗',
      success(res: any) {
        if (res.confirm) {
          wx.request({
            method: 'POST',
            url: 'http://localhost:5000/users/disLikeSkin',
            data: {
              token: wx.getStorageSync('token'),
              weaponUuid: that.data.weaponInfo[e.currentTarget.dataset.index].levels[0].uuid,
            },
            success(res: any) {
              if (res.data.code === '0') {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  mask: true
                }).then(() => {
                  that.data.weaponInfoArr.length = 0;
                  that.onLoad();
                })
              }
            }
          })
        }
      }
    })
  },
  bellringMe(e: any) {
    const that = this;
    if (wx.getStorageSync('token')) {
      const weaponUuid = this.data.weaponInfo[e.currentTarget.dataset.index].levels[0].uuid;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const that = this;
    wx.request({
      method: 'POST',
      url: 'http://localhost:5000/users/getMyLikes',
      data: {
        token: wx.getStorageSync('token')
      },
      async success(res: any) {
        let promiseAllArr = [];
        for (let i = 0; i < res.data.weaponUuids.length; i++) {
          promiseAllArr.push(getWeaponInfo(res.data.weaponUuids[i]))
        }
        const allPromise = Promise.all(promiseAllArr);
        const promiseRes = await allPromise as any[];
        promiseRes.forEach((element) => {
          that.data.weaponInfoArr.push(element);
        })
        that.setData({
          weaponInfo: that.data.weaponInfoArr,
          hasWeaponInfo: true
        });
      }
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