export  default async  function getDailyWeaponInfo (dailyWeaponUuid:String){
    return new Promise((resolve,reject)=>{
      wx.request({
        method: 'POST',
        url: 'http://localhost:5000/shop/getWeaponInfo',
        data: {
          weaponLevel0Uuid: dailyWeaponUuid
        },
        header: {
          'content-type': 'application/json'
          // 'content-type': 'application/x-www-form-urlencoded'
        },
        success:(res: any)=>{
          resolve(res.data.weaponInfo);
        },
      });
    }) 
}