import getDailyWeaponInfo from '../../utils/api/getWeaponInfo';
import getWeaponSkinComment from '../../utils/api/getWeaponSkinComment'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "我是默认标题",
    navBarTitle: app.globalData.navBarTitle,
    currentIndex: 0,
    account: '',
    token: '59a05fbc-9281-11ed-a2f5-525400c9274f',
    userInfo: {},
    skinLevelColor: {
      "12683d76-48d7-84a3-4e09-6985794f0445": '#7cb8f0',
      "0cebb8be-46d7-c12a-d306-e9907bfc5a25": '#04cca7',
      "60bca009-4182-7998-dee7-b8a2558dc369": '#e772a7',
      "e046854e-406c-37f4-6607-19a9ba8426fc": '#fcb78d',
      "411e4a55-4e59-7757-41f0-86a53f101bb5": '#f7e19c',
    },
    dailyWeaponCost: [] as any[],
    hasDailyWeaponInfo: false,
    dailyWeaponInfo: [] as any[],
    todayWeaponInfo: [] as any[],
    myWallet: {},
    chromasIndex: 0,
    weaponIndex: 0,
    weaponLevelVideoIndex: 0,
    commentInfo: {
      comment: ''
    },
    likeType: ['outline', 'outline', 'outline', 'outline']
  },
  addMylike() {
    const that = this;
    if (wx.getStorageSync('token')) {
      const weaponUuid = this.data.dailyWeaponInfo[this.data.weaponIndex].levels[0].uuid;
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
              ['likeType[' + that.data.weaponIndex + ']']: 'field'
            })
          } else if (res.data.code === '01') {
            wx.showToast({
              title: '已添加过',
              icon: 'success',
              mask: true
            })
            that.setData({
              ['likeType[' + that.data.weaponIndex + ']']: 'field'
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
  goToPage(e: any) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
    wx.redirectTo({
      url: app.globalData.navBarTitle[e.target.dataset.index].url
    })
  },
  changeWeaponLevelVideo(e: any) {
    this.setData({
      weaponLevelVideoIndex: e.currentTarget.dataset.id
    })
  },
  async changeWeapon(e: any) {
    const that = this;
    this.setData({
      chromasIndex: 0,
      weaponLevelVideoIndex: 0,
      weaponIndex: e.detail.current
    })
     await getWeaponSkinComment(this.data.dailyWeaponInfo[this.data.weaponIndex].levels[0].uuid).then((res)=>{
      if (res) {
        that.setData({
          commentInfo: res as any
        })
      } else {
        that.setData({
          ['commentInfo.account']: "----",
          ['commentInfo.comment']: "暂无评论,去'我的'来点锐评吧",
          ['commentInfo.score']: "暂无"
        })
      }
    });
  },
  changeChromas(e: any) {
    this.setData({
      chromasIndex: e.target.dataset.index
    })
  },
  async setShopData(myShopData: any) {
    const that = this;
    const shopData = myShopData;
    this.setData({
      dailyWeaponCost: this.getRightCost(shopData.storefront.SkinsPanelLayout.SingleItemStoreOffers),
      // dailyWeaponCost: this.getRightCost(this.data.uuid),
      myWallet: shopData.wallet,
    })
    let promiseAllArr = [];
    for (let i = 0; i < 4; i++) {
      promiseAllArr.push(getDailyWeaponInfo(shopData.storefront.SkinsPanelLayout.SingleItemOffers[i]))
    }
    const allPromise = Promise.all(promiseAllArr);
    const res = await allPromise as any[];
    res.forEach((element) => {
      this.data.todayWeaponInfo.push(element);
    })
    this.setData({
      dailyWeaponInfo: this.data.todayWeaponInfo,
      hasDailyWeaponInfo: true
    });
    await getWeaponSkinComment(this.data.dailyWeaponInfo[this.data.weaponIndex].levels[0].uuid).then((res)=>{
      if (res) {
        that.setData({
          commentInfo: res as any
        })
      } else {
        that.setData({
          ['commentInfo.account']: "----",
          ['commentInfo.comment']: "暂无评论,去'我的'来点锐评吧",
          ['commentInfo.score']: "暂无"
        })
      }
    });
    wx.setStorageSync('dailyWeaponInfo', this.data.dailyWeaponInfo)
  },
  getRightCost(dailyWeaponCost: Array<Object>) {
    let cost = [];
    for (let i = 0; i < 4; i++) {
      cost.push(Object.values(dailyWeaponCost[i].Cost)[0]);
    }
    return cost;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    if (opt.userInfo) {
      this.setData({
        account: wx.getStorageSync('account'),
        userInfo: JSON.parse(opt.userInfo!)
      })
    } else {
      const userInfo = wx.getStorageSync('users')[wx.getStorageSync('account')]
      this.setData({
        account: wx.getStorageSync('account'),
        userInfo: userInfo
      })
    }
    if (wx.getStorageSync('shopData')) {
      const shopData = wx.getStorageSync('shopData');
      this.setShopData(shopData)
    } else {
      const thisPage = this;
      wx.request({
        method: 'POST',
        url: 'https://val.musnow.top/api/v2/shop',
        data: {
          account: wx.getStorageSync('account'),
          token: this.data.token,
          raw: 1
        },
        success(res: any) {
          const shopData = res.data;
          if (shopData.code === 0) {
            wx.setStorageSync('shopData',res.data)
            thisPage.setShopData(shopData)
          } else if (shopData.code === 200) {
            console.log(res);
          }
        },
        fail() {
          console.log('fail');
        },
        complete() {

          console.log('complete');
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // wx.removeStorageSync('shopData');
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
    // if (wx.getStorageSync('shopData')) {
    //       wx.removeStorageSync('shopData')
    //     }
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