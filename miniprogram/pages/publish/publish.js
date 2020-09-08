let tabNum = 0; // 当前选中第几个tab标题
Page({
  data: {
    winHeight: "", // 窗口高度
    currentTab: 0, // 预设当前项的值
    scrollLeft: 0, // tab标题的滚动条位置
    tabName: [], // tab标题的名字
    choosedTabInformation: "" // 当前选中tab标题的信息
  },

  // 左右滚动tab标题，切换标签
  switchTab: function (e) {
    let current = e.detail.current;
    this.setData({
      currentTab: current
    });
    console.log("当前选中tab标题", current);
    this.getInformation(current); //  获取当前选中tab标题的信息
  },

  // 点击tab标题，切换当前页
  swichNav: function (e) {
    console.log("点击tab标题", e.target.dataset.current);
    let cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
    console.log("当前选中tab标题", cur);
    this.getInformation(cur); //  获取当前选中tab标题的信息
  },

  /****************    高度自适应（rpx）    ****************/
  getWindowHeight: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth; //比例
        console.log(clientHeight);
        console.log(clientWidth);
        let calc = clientHeight * rpxR; // 如有最底部导航栏空间，则 calc - 底部导航栏高度
        console.log(calc);
        that.setData({
          winHeight: calc
        });
      }
    });
  },

  onLoad: function (options) {
    this.getWindowHeight(); // 高度自适应（rpx）
    this.getTabName(); // 获取头部导航栏tab标题的名字
    this.getInformation(tabNum); //  获取当前选中tab标题的信息
  },

  /****************    获取头部导航栏tab标题的名字    ****************/
  getTabName: function () {
    console.log("获取头部导航栏tab标题的名字");
    // 假数据
    this.setData({
      tabName: [{
        name: "星巴克"
      }, {
        name: "肯德基"
      }, {
        name: "必胜客"
      }, {
        name: "优酷会员"
      }, {
        name: "哈根达斯"
      }],
    })
  },

  /****************    获取对应tab标题的信息    ****************/
  getInformation: function (tabNum) {
    // 假数据
    if (tabNum == 0) {
      console.log("当前选中第1个tab标题");
      this.setData({
        choosedTabInformation: "1",
      })
    } else if (tabNum == 1) {
      console.log("当前选中第2个tab标题");
      this.setData({
        choosedTabInformation: "2",
      })
    } else if (tabNum == 2) {
      console.log("当前选中第3个tab标题");
      this.setData({
        choosedTabInformation: "3",
      })
    } else if (tabNum == 3) {
      console.log("当前选中第4个tab标题");
      this.setData({
        choosedTabInformation: "4",
      })
    } else if (tabNum == 4) {
      console.log("当前选中第5个tab标题");
      this.setData({
        choosedTabInformation: "5",
      })
    } else if (tabNum == 5) {
      console.log("当前选中第6个tab标题");
      this.setData({
        choosedTabInformation: "6",
      })
    } else if (tabNum == 6) {
      console.log("当前选中第7个tab标题");
      this.setData({
        choosedTabInformation: "7",
      })
    } else if (tabNum == 7) {
      console.log("当前选中第8个tab标题");
      this.setData({
        choosedTabInformation: "8",
      })
    } else if (tabNum == 8) {
      console.log("当前选中第9个tab标题");
      this.setData({
        choosedTabInformation: "9",
      })
    } else if (tabNum == 9) {
      console.log("当前选中第10个tab标题");
      this.setData({
        choosedTabInformation: "10",
      })
    } else if (tabNum == 10) {
      console.log("当前选中第11个tab标题");
      this.setData({
        choosedTabInformation: "11",
      })
    } else if (tabNum == 11) {
      console.log("当前选中第12个tab标题");
      this.setData({
        choosedTabInformation: "12",
      })
    }
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