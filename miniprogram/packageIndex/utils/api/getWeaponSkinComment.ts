export default async function getWeaponSkinComment(weaponUuid: String) {
  return new Promise((resolve, _reject) => {
    wx.request({
      method: 'POST',
      url: 'http://localhost:5000/users/getSkinComment',
      data: {
        weaponUuid: weaponUuid
      }, success(res: any) {
        if (res.data.code === '0') {
          resolve(res.data.commentInfo);
          // }else if(res.data.code === '10'){
          //   that.setData({
          //     ['commentInfo.account']:"----",
          //     ['commentInfo.comment']:"暂无评论,去'我的'来点锐评吧",
          //     ['commentInfo.score']:"暂无"
          //   })
          // }
          console.log(res)
        }else{
          resolve(0);
        }
      }
    })
  })
}