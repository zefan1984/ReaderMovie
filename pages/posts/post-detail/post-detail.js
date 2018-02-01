var posts = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },

  onLoad: function (option) {
    var globalData = app.globalData;
    var id = option.id;
  
    this.setData({
      id: id,
      currentData: posts.postList[id]
    });

    var cStorage = wx.getStorageSync('collected');

    

    if (cStorage) {
      var collectedCurrent = cStorage[id];
      if (typeof(collectedCurrent) == 'undefined' ){
        collectedCurrent = false;
        console.log(collectedCurrent);
      }
      cStorage[id] = collectedCurrent;
      wx.setStorageSync('collected', cStorage);
      this.setData({
        'collected': collectedCurrent
      });

    } else {
      var collected = {};
      collected[id] = false;
      wx.setStorageSync('collected', collected);
    }

    if (globalData.g_isPlayingMusic && globalData.g_currentMusicId === this.data.id){
      this.setData({
        isPlayingMusic :true
      })
      
    }

    this.setMusicMonitor();

  },

  setMusicMonitor: function(){

    var that = this;

    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicId = that.data.id;
    })

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicId = null;
    })
  },


  collectTap: function (ev) {

    var collected = wx.getStorageSync('collected');
    collected[this.data.id] = !collected[this.data.id];
    this.setData({
      collected: collected[this.data.id]
    });
    wx.setStorageSync('collected', collected);
    wx.showToast({
      title: collected[this.data.id]? '收藏成功': '取消成功',
    })

  },

  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentMusicData = posts.postList[this.data.id].music;

    if (isPlayingMusic ){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    }
    else
    {
      wx.playBackgroundAudio({
        dataUrl: currentMusicData.url,
        coverImgUrl: currentMusicData.coverImg,
        title: currentMusicData.title
      })

      this.setData({
        isPlayingMusic: true
      });
    }

  }


})