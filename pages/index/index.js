Page({

    /**
     * 页面的初始数据
     */

    data: {
        array:[
            {id:"1",name: "haha",numb:"10"},
            {id:"2",name: "haa",numb:"9"},
            {id:"3",name: "aha",numb:"8"},
            {id:"4",name: "hha",numb:"7"},
            {id:"5",name: "hah",numb:"6"},
            {id:"6",name: "ha",numb:"5"},
            {id:"7",name: "ha",numb:"5"},
            {id:"8",name: "ha",numb:"5"},
            {id:"9",name: "ha",numb:"5"},
            {id:"10",name: "ha",numb:"5"},
            {id:"11",name: "ha",numb:"5"},
            {id:"12",name: "ha",numb:"5"},
            {id:"13",name: "ha",numb:"5"},
            {id:"14",name: "ha",numb:"5"},
        ]
    },
    purchase:function(){
        wx.navigateTo({
            url: '../main/main',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: 'https://test.linyiit.cn/anorder/wx55cd68f677876ec7/10',
          method: "GET",
          success: (result) => {
              console.log(result);
          },
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