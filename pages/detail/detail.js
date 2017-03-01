//detail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    info: { //如果用wx.request()调用服务器接口获得json数据的话就不用手写数据了
      // id: 1,
      // title: 'aaaaaaa',
      // img: '../../images/1.png',
      // content: '本文档将带你一步步创建完成一个微信小程序，并可以在手机上体验该小程序的实际效果。这个小程序的首页将会显示欢迎语以及当前用户的微信头像，点击头像，可以在新开的页面中查看当前小程序的启动日志。',
      // cTime: "2017-01-10 16:55"
      
    }
  },
  
  onLoad: function (options) {
    console.log('onLoad')

    wx.setNavigationBarTitle({
      title: '文章详情'
    });

    var that = this
    
    console.log("see options:");
    console.log(options)
    //向服务器接口请求数据
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getDetail', 
      data: {id: options.id}, //传参
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log("see res.data:");
        console.log(res.data)
        that.setData({
          info: res.data
        })
      }
    });
  },

  closepage: function(){
    wx.navigateBack();
  }

})