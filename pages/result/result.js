// pages/result/result.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        numb: "",
        display:'none'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        console.log(options);
        wx.getStorage({
            key: 'openid',
            success(res) {
                console.log(res);
                that.setData({
                    openid: res.data,
                    numb: options.numb
                })
            }
        })
        wx.getSetting({
            success (res){
                console.log(res);
                
              if (res.authSetting['scope.userInfo']) {
                that.setData({
                    display:'none'
                  })
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function(res) {
                    console.log(res.userInfo)
                    that.setData({
                        nickName: res.userInfo.nickName
                    })
                    that.add();
                  }
                })
              }else{
                that.setData({
                    display:'block'
                })
              }
            }
          })
    },
    bindGetUserInfo:function(){
        this.onLoad();
    },
    add: function () {
        let open = this.data.openid
        let num = this.data.numb
        console.log(open);
        wx.request({
            url: 'https://test.linyiit.cn/score',
            data: {
                openid: open,
                appid: "wx55cd68f677876ec7",
                num: num
            },
            method: "POST",
            success: (result) => {
                console.log(result);
                this.setData({
                    msg: result.data.msg
                })
            },
        })
    },
    purchase: function () {
        wx.reLaunch({
            url: '../index/index',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})