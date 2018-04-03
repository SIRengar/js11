// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前页码
  },
  navbarTap: function(e){  //点击标签时触发
    var navbarTaps = e.currentTarget.dataset.idx; //获取当前点击标签
    var select = {};  //定义一个对象储存页面显示内容
    if (navbarTaps == 0 || undefined){
      select = this.data.oneobj
    } else if (navbarTaps == 1){
      select = this.data.twoobj
    } else {
      select = this.data.threeobj
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      difficult: select.difficult,
      threshold: select.threshold,
      cycle: select.cycle,
      company: select.company,
      basis: select.basis,
      salary: JSON.parse(select.salary)
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//options是获取上个页面传来的三个最推荐职业
    this.setData({
      options: options
    });
  },
  getdata: function () { //定义函数名称
    var that = this;  //这个地方很重要，重置data{}里数据的时候setData方法的this，如果下面success里直接写this就变成wx.request()的this了

    wx.request({
      url: 'https://www.jnshu.com/a/occupation/list',//请求地址
      data: { //发给后端的数据
        
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        var list = res.data.data.occupations, one = Number(that.data.options.one),
          two = Number(that.data.options.two), three = Number(that.data.options.three); 
        that.data.list = list;
        that.data.select = that.data.list[one];//定义当还没有点击标签时页面显示内容
        that.setData({
          oneobj: that.data.list[one],
          twoobj: that.data.list[two],
          threeobj: that.data.list[three],
          navbar: [that.data.list[one].name, that.data.list[two].name, that.data.list[three].name],
          difficult: that.data.list[one].difficult,
          threshold: that.data.list[one].threshold,
          cycle: that.data.list[one].cycle,
          company: that.data.list[one].company,
          basis: that.data.list[one].basis,
          salary: JSON.parse(that.data.list[one].salary), 
        })
      },
      fail: function (err) {
        console.log("error")
      },
      complete: function () {
        console.log("err")
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    this.getdata();
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