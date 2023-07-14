/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    // userInfo?: WechatMiniprogram.UserInfo,
    navBarHeight: number, // 导航栏高度
    menuRight: number, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: number, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: number, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    navBarTitle:Array<object>
  }
  // userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}