Page({

    /**
     * 页面的初始数据
     */

    data: {
        timer: '', //定时器名字
        countDownNum: '10', //倒计时初始值
        tips: '请稍后',
        key: {},
        mode: '',
        share: 3,
        title: '',
        show: true,
        animated: true,
        main: {},
        mains: {},
        answers: [],
        error: '',
        correct: 0,
        errors: 0,
        type: 'error',
        number: 0,
        num: 1,
        only: '',
        disables: true,
        consequence: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var that = this;
        that.data.consequence.length = 0;
        wx.request({
            url: 'https://test.linyiit.cn/subjectlist/10',
            method: "GET",
            success: (res) => {
                // console.log(res)
                that.setData({
                    mains: res.data,
                    number: 0
                })
                res.data.forEach(element => {
                    var json = JSON.parse(element.options);
                    that.data.consequence.push(json);
                });
                that.resolve();
                // console.log(that.data.mode);
            },
        })

    },
    resolve: function () {
        var that = this;
        let main = that.data.mains;
        let consequence = that.data.consequence;
        // console.log(that.data.mains);
        var data = main[that.data.number];
        var optionss = consequence[that.data.number];
        let numbs = that.data.number;
        // console.log(numbs);
        this.setData({
            disables: false
        })
        if (that.data.errors < that.data.share) {
            if (numbs > 9) {
                that.onLoad();
            } else {
                that.setData({
                    main: data,
                    countDownNum: 10,
                    option: optionss,
                    verdict: data.answer.length,
                    answers: [],
                    number: that.data.number + 1,
                })
                if (data.answer.length == 1) {
                    that.setData({
                        mode: false,
                        title: '选择(单选)',
                    })
                } else {
                    that.setData({
                        mode: true,
                        title: '选择(多选)',
                    })
                }
                // console.log(that.data.option);
                var solution = that.data.option
                var arr = []
                for (let i in solution) {
                    var createArr = {}
                    createArr.names = solution[i];
                    createArr.value = i;
                    createArr.checked = false;
                    arr.push(createArr);
                }
                that.setData({
                    arrr: arr,
                    show: !that.data.show
                })
                that.countDown();
            }
        } else {
            that.skip();
        }

    },
    countDown: function () {
        let that = this;
        var numb = that.data.number;
        let countDownNum = that.data.countDownNum; //获取倒计时初始值
        //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
        that.setData({
            timer: setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
                //每隔一秒countDownNum就减一，实现同步
                countDownNum--;
                //然后把countDownNum存进data，好让用户知道时间在倒计着
                that.setData({
                    countDownNum: countDownNum
                })
                //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
                if (countDownNum == 0) {
                    //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
                    //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
                    clearInterval(that.data.timer);
                    that.setData({
                        disables: true
                    })
                    that.setData({
                        error: '超时',
                        errors: that.data.errors + 1,
                        type: 'info'
                    })
                    that.data.countDownNum = 10;
                    setTimeout(function () {
                        that.setData({
                            num: that.data.num + 1,
                        })
                        that.resolve();
                        // console.log(that.data.mode);

                    }, 1000)
                    //关闭定时器之后，可作其他处理codes go here
                }
            }, 1000)
        });
    },
    checkboxChange: function (e) {
        if (this.data.mode == false) {
            // console.log(e);
            this.data.only = e.currentTarget.dataset.index
        } else {
            if (e.detail.checked == true) {
                this.data.answers.push(e.currentTarget.dataset.index);
                // console.log(e);
                // console.log(this.data.answers);
            } else {
                // console.log(this.data.answers);
                for (var i = 0; i < this.data.answers.length; i++) {
                    if (this.data.answers[i] == e.currentTarget.dataset.index) {
                        this.data.answers.splice(i, 1);
                        break;
                    }
                };
                // console.log(this.data.answers);
            }
        }
    },
    purchase: function () {
        var string = this.data.main.answer.split('');
        var str = string.sort();
        var numb = this.data.number;
        var only = this.data.only;
        var answer = this.data.answers.sort();
        // console.log(only);
        
        this.setData({
            disables: true
        })
        if(this.data.mode == false){
            if(str.toString() == only){
                this.setData({
                    error: '正确',
                    correct: this.data.correct + 1,
                    type: 'success'
                })
                let that = this;
                setTimeout(function () {
                    clearInterval(that.data.timer);
                    that.data.countDownNum = 10;
                    setTimeout(function () {
                        that.setData({
                            num: that.data.num + 1,
                        })
                        that.resolve();
                        // console.log(that.data.mode);
    
                    }, 1000)
                }, 1000)
            } else {
                this.setData({
                    error: '错误',
                    errors: this.data.errors + 1,
                    type: 'error'
                })
                let that = this;
                setTimeout(function () {
                    clearInterval(that.data.timer);
                    that.data.countDownNum = 10;
                    setTimeout(function () {
                        that.setData({
                            num: that.data.num + 1,
                        })
                        that.resolve();
                        // console.log(that.data.mode);
    
                    }, 1000)
                }, 1000)
            }
        }else{
            if (str.toString() == answer.toString()) {
                this.setData({
                    error: '正确',
                    correct: this.data.correct + 1,
                    type: 'success'
                })
                let that = this;
                setTimeout(function () {
                    clearInterval(that.data.timer);
                    that.data.countDownNum = 10;
                    setTimeout(function () {
                        that.setData({
                            num: that.data.num + 1,
                        })
                        that.resolve();
                        // console.log(that.data.mode);
    
                    }, 1000)
                }, 1000)
            } else {
                this.setData({
                    error: '错误',
                    errors: this.data.errors + 1,
                    type: 'error'
                })
                let that = this;
                setTimeout(function () {
                    clearInterval(that.data.timer);
                    that.data.countDownNum = 10;
                    setTimeout(function () {
                        that.setData({
                            num: that.data.num + 1,
                        })
                        that.resolve();
                        // console.log(that.data.mode);
    
                    }, 1000)
                }, 1000)
            }
    
        }
        // console.log(numb);
        // console.log(string.toString());
        // console.log(answer.toString());
    },
    skip: function () {
        let numbers = this.data.correct
        wx.reLaunch({
            url: '../result/result?numb=' + numbers,
        })
    },
    failure: function () {
        wx.reLaunch({
            url: '../failure/failure',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this
        wx.getStorage({
            key: 'share',
            success(res) {
                // console.log(res);
                that.setData({
                    share: res.data,
                })
            }
        })
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
        clearInterval(this.data.timer);
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