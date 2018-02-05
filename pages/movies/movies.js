// pages/movies/movies.js
var utils = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanelShow: false,
    containerShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3",
      comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3",
      top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");

  },

  getMovieListData: function (url, settKey,categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settKey, categoryTitle);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  processDoubanData: function (res, settKey, categoryTitle) {

    var movie = [];
    console.log()
    for (var idx in res.subjects) {
      var subjects = res.subjects[idx];
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
    var readyData = {};

    readyData[settKey] = {
      categoryTitle: categoryTitle,
      movie: movie
    }

    this.setData(readyData);

  },

  onTapMore: function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },

  onFocusSearch: function (event){
    this.setData({
      searchPanelShow: true,
      containerShow: false
    })
  },

  onChangeSearch: function(event){
    this.setData({
      searchPanelShow: false,
      containerShow: true
    })
  }

})