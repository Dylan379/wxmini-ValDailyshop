// app.ts
App<IAppOption>({
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致,
    navBarTitle: [
      {
        text: '主页',
        url: '../index/index'
      },
      {
        text: '捆绑包',
        url: '../bundles/bundles'
      },
      {
        text: '夜市',
        url: '../nightMarket/nightMarket'
      },
      {
        text: '我的',
        url: '../maine/maine'
      }
    ],
},
  onLaunch() {
    const that = this;
        // 获取系统信息
        const systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        // 导航栏高度 = 状态栏高度 + 44
        that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
        that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
        that.globalData.menuTop=  menuButtonInfo.top;
        that.globalData.menuHeight = menuButtonInfo.height;
    },
    // 数据都是根据当前机型进行计算，这样的方式兼容大部分机器

    
})