//lists.js
//获取应用实例
var app = getApp()
Page({
  data: {
    morehidden: 'none',
    isfirst: true,    
    toastHidden: true,
    // isOpen: true,
    lastid: 0,
    newsList: [ //如果用wx.request()调用服务器接口获得json数据的话就不用手写数据了
      // {
      //   id: 1,
      //   title: "aaaaaa",
      //   img: "../../images/1.png",
      //   cTime: "2017-01-11 09:50"
      // },
      // {
      //   id: 2,
      //   title: "bbbbbb",
      //   img: "../../images/2.png",
      //   cTime: "2017-01-11 09:50"
      // },
      // {
      //   id: 3,
      //   title: "cccccc",
      //   img: "../../images/3.png",
      //   cTime: "2017-01-11 09:50"
      // },
      // {
      //   id:4,
      //   title: "dddddd",
      //   img: "../../images/4.png",
      //   cTime: "2017-01-11 09:50"
      // }
    ]
    
  },
 
  toastChange: function(){
    var that = this;
    that.setData({
      toastHidden: true
    });
  },

  loadData: function(lastid){
    var that = this;

    //显示加载中的提示
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    });

    //向服务器接口请求数据
    var limit = 2;
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getList',
      data: {
        lastid: lastid,
        limit: limit
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {

        if(!res.data){
          that.setData({
            toastHidden:false            
          }); 
          that.setData({
            morehidden: 'none'            
          }); 
          return false;         
        }

        var len = res.data.length;
        var oldLastid = lastid;
        that.setData({
          lastid: res.data[len-1].id
        });

        var oldDataArr = that.data.newsList;
        var newDataArr = oldDataArr.concat(res.data);

        if(oldLastid==0){
          wx.setStorageSync('CmsList', newDataArr);
        }

        // console.log(res.data);
        that.setData({
          newsList: newDataArr          
        });
         that.setData({
          morehidden: ''            
        }); 
      },

      fail: function(res){
          if(lastid==0){
            var newData = wx.getStorageSync('CmsList')
            if(!newData){
              that.setData({ newsList:newData })
              that.setData({ moreHidden:'' })

                var len = newData.length
                that.setData({ lastid: newData[len-1].id})
            }
            console.log('data from cache');
        } else {
            that.setData({ toastHidden:false, moreHidden:'none', msg:'当前网格异常，请稍后再试' }) 
        }          
      },

      complete: function(){
        // console.log("complete~");
        wx.hideToast();

      }

    });
  },

  loadMore: function(event){
    var id = event.currentTarget.dataset.lastid;
    var isfirst = event.currentTarget.dataset.isfirst;
    // console.log(isfirst);
    var that = this;
    this.loadData(id);

    //显示加载中的提示
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    });

    wx.getNetworkType({

      success: function(res) {
        // console.log(res);
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
   
        if(networkType != 'wifi' && isfirst == true){          

          wx.showModal({
            title: '温馨提示',
            content: '您当前不处于wifi网络，继续会产生流量费用，确定要继续吗？',
            confirmText: '确定',
            cancelText: '取消',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定');

                that.setData({
                  isfirst: false
                });

              }else{
                return false;
              }
            }
          });
        }
      }
    });
  },

  onReady: function(){
    wx.setNavigationBarTitle({
      title: '文章列表'
    });
    wx.hideNavigationBarLoading();
  },

  onLoad: function () {
    console.log('onLoad')
    wx.showNavigationBarLoading();
    this.loadData(0);    
  }


})