let tabNum = 0; // 当前选中第几个tab标题
Page({
  data: {
    // tab页state
    winHeight: "", // 窗口高度
    currentTab: 0, // 预设当前项的值
    scrollLeft: 0, // tab标题的滚动条位置
    tabName: [], // tab标题的名字
    choosedTabInformation: "", // 当前选中tab标题的信息

    // 免责声明state
    instructions: "阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知阅读须知",
    //可以通过hidden是否掩藏弹出框的属性
    hiddenmodalput: false,
    checked: false,
    // “继续”按钮的点击事件
    bindconfirm: "",

    // 轮播图
    swiperCurrent: 0, //当前所在页面的 index
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //滑动动画时长1s
    circular: true, //是否采用衔接滑动
    imgUrls: [ //图片路径(可以是本地路径，也可以是图片链接)
      // '../img/lbt/1.jpeg',
      // '../img/lbt/2.jpeg',
      // '../img/lbt/3.jpeg',
      // '../img/lbt/4.jpeg',
      'https://img95.699pic.com/photo/40100/6015.jpg_wh300.jpg',
      "https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg",
      "https://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg"
    ],

    links: [ //点击图片之后跳转的路径
      '../personal/personal',
      '../personal/personal',
      '../personal/personal',
      '../personal/personal',
      '../personal/personal',
    ],

    // 长列表数据
    dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    count: 0
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

  //点击选中事件，再次点击取消选中  事件
  checked: function (e) {
    var check = this.data.checked;
    var bindconfirm = this.data.bindconfirm;
    if (check) { // 当check=true时，即当前为选中，那么我们点击之后就是取消选中
      this.data.checked = false;
      // 取消选中之后，“继续”按钮无效
      this.data.bindconfirm = "";
      console.log("已取消选中");
    } else { // check=false时，即当前为没有选中，那么我们点击之后就是选中
      this.data.checked = true;
      // 选中之后，点击“继续”按钮执行confirm事件
      this.data.bindconfirm = "confirm";
      console.log("已选中");
    }
    this.setData({
      "checked": this.data.checked,
      "bindconfirm": this.data.bindconfirm,
    });
  },

  //取消按钮  跳转到指定页面
  cancel: function () {
    wx.switchTab({
      url: '../personal/personal',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  //确认  
  confirm: function () {
    this.setData({
      // 掩藏弹出框
      hiddenmodalput: true
    })
  },

  /****************    获取头部导航栏tab标题的名字    ****************/
  getTabName: function () {
    console.log("获取头部导航栏tab标题的名字");
    // 假数据
    this.setData({
      tabName: [{
        name: "人找车"
      }, {
        name: "车找人"
      }, {
        name: "车找货"
      }, {
        name: "货找车"
      }, {
        name: "找媳妇"
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

  },

  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  //点击指示点切换事件
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  //点击图片触发事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })
  },

  // 列表方法
  onPullDownRefresh() {
    var self = this;
    setTimeout(() => {
      // 模拟请求数据，并渲染
      var arr = self.data.dataList,
        max = Math.max(...arr);
      for (var i = max + 1; i <= max + 3; ++i) {
        arr.unshift(i);
      }
      self.setData({
        dataList: arr
      });
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom() {
    var arr = this.data.dataList,
      max = Math.max(...arr);
    if (this.data.count < 3) {
      for (var i = max + 1; i <= max + 5; ++i) {
        arr.push(i);
      }
      this.setData({
        dataList: arr,
        count: ++this.data.count
      });
    } else {
      wx.showToast({
        title: '没有更多数据了！',
        image: '../../src/images/noData.png',
      })
    }
  }
})