export  default async  function getBonusWeaponInfo (BonusStore:Object){
  return new Promise((resolve,_reject)=>{
    wx.request({
      method: 'POST',
      url: 'http://localhost:5000/shop/getBonusStoreInfo',
      data: {
        BonusStore: BonusStore
      },
      header: {
        'content-type': 'application/json'
      },
      success:(res: any)=>{
        resolve(res.data.weaponInfo);
      }
    });
  }) 
}