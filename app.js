//app.js
App({
    onLaunch: function () {
        // 登录
        var that = this;
        wx.login({
            success: res => {
                wx: wx.request({
                    url: 'https://test.linyiit.cn/wechatuser',
                    data: {
                        code: res.code,
                        appid: 'wx55cd68f677876ec7',
                        secret: 'c52c09dfdf6bdb70d8e92fff6498daf4'
                    },
                    method: 'POST',
                    success: (result) => {
                        console.log(result);
                        wx.setStorageSync('openid', result.data.openid);
                    }
                })
            }
        })
    },
    globalData: {
        userInfo: null
    }
})