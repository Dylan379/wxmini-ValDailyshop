export  default async  function getBundleInfo (bundle:Object){
  return new Promise((resolve,reject)=>{
    wx.request({
      method: 'POST',
      url: 'http://localhost:5000/shop/getBundleInfo',
      data: {
        bundle: bundle
      },
      header: {
        'content-type': 'application/json'
      },
      success:(res: any)=>{
        resolve(res.data.bundleInfo);
      }
    });
  }) 
}