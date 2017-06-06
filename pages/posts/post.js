Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: "Sep 10 2017"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var post_content = [
      {
        date: "Sep 18 2016",
        title: "正是虾肥蟹壮时",
        post_img: "/images/post/crab.png",
        author_img: "/images/avatar/1.png",
        view_num: "112",
        collect_num: "96",
        content: "到青岛游玩，尤其是秋季，倘若只是淌淌海水看看建筑，那小编不得不说一句：您真是low爆啦！不下海，不和当地的渔民们一起捕一次鱼，网一次虾，您怎么好意思说来过青岛！眼下正是青岛海产品上市的热门季节，尝尝自己亲手捕起来的鱼肯定别有滋味儿！体验一次渔民的生活吧，到青岛就该这么玩！"
      },
      {
        date: "Nov 25 2016",
        title: "比利·林恩的中场故事",
        post_img: "/images/post/bl.png",
        author_img: "/images/avatar/2.png",
        content: "伊拉克战争时期，来自美国德州的19岁技术兵比利·林恩（乔·阿尔文 Joe Alwyn 饰）因为一段偶然拍摄的视频而家喻户晓。那是一次规模不大却激烈非常的遭遇战，战斗中林恩所在的B班班长（范·迪塞尔 Vin Diesel 饰）遭到当地武装分子的伏击和劫持，而林恩为了营救班长不惜铤而走险冲锋陷阵。",
        view_num: "112",
        collect_num: "96"
      }
    ]

    this.setData({
      postkey: post_content
    })
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