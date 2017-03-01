Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    area: 0,
    date: '2016-09-01',
    time: '12:01',
    score: 0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      area: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      time: e.detail.value
    })
  },
  bindSliderchange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      score: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var formData = e.detail.value;
    formData.area = this.data.area;
    formData.score = this.data.score;
    console.log('form发生了submit事件，赋值后formData为：', formData);

    var that = this;
    //向服务器接口发送数据
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Feedback/Feedback/addFeedback',
      data: formData,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
      },

      complete: function(){
        
      }

    });


  }

})