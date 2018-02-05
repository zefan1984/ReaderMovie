// pages/movies/more-movie/more-movie.js
var utils = require('../../../utils/utils.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigeteTitle: '',
    loadUrl: '',
    totalCount: 0,
    isEmpty: true,
    isEnd: false,
    pageCount: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = '';
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
      break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
      break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
      break;
    }

    this.setData({
      loadUrl: dataUrl
    })

    utils.http(dataUrl, this.processDoubanData);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  onReachBottom: function (event){
    var loadMoreUrl = this.data.loadUrl + "?start=" + this.data.totalCount +
      "&count=20";
    if( !this.data.isEnd ){
      utils.http(loadMoreUrl, this.processDoubanData);
      wx.showNavigationBarLoading();
    }

  },

  onPullDownRefresh: function(event){
    var refreshUrl = this.data.loadUrl + "?start=0&count=20";
    this.setData({
      isEmpty: true,
      movie: {},
      totalCount: 0,
      isEnd: false
    });
    utils.http(refreshUrl, this.processDoubanData);
  },

  processDoubanData: function (data) {
    var movie = [];

    for (var idx in data.subjects) {
      var subjects = data.subjects[idx];
      var title = subjects.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: utils.convertToStarsArray(subjects.rating.stars),
        title: title,
        average: subjects.rating.average,
        coverageUrl: subjects.images.large,
        movieId: subjects.id
      }
      movie.push(temp);
    }
    var totalMovie = {};

    if(!this.data.isEmpty){
      totalMovie = this.data.movie.concat(movie);
    }
    else{
      totalMovie = movie;
      this.setData({
        isEmpty: false
      })
    }

    this.setData({
      movie: totalMovie
    });

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

    if (data.count < this.data.pageCount) {
      this.setData({
        isEnd: true
      });
    }
    else{
      this.data.totalCount += this.data.pageCount;
    }
  }
})