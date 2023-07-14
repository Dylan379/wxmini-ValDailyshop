export default async function getWeaponSkinComment(token:String,skinName: String) {
  return new Promise((resolve, _reject) => {
    wx.request({
      method: 'POST',
      url: 'http://localhost:5000/users/getSkinBundles',
      data: {
        token:token,
        skinName: skinName
      }, success(res: any) {
        if (res.data.code === '0') {
          resolve(res.data.weaponBundlesInfo);
          console.log(res)
        }else{
          resolve(0);
        }
      }
    })
  })
}