// 请在此对象写后端的请求接口列表
export default {
	// 此处写开发调试地址--自动生效
	dev: 'https://admin.homeyb.cn/',
	// dev:'http://ybcs.bajiaostar.com/',
	// dev:'http://60.180.141.112:8080/',
	// 此处写线上环境地址--自动生效
	pro: 'https://admin.homeyb.cn/',
	// pro:'http://ybcs.bajiaostar.com/',
	
	/**
	 * 微信公众号
	 */
	appid:'wx25f4ed12afeb860c',
	redirect_url:'http://h5.homeyb.cn/pages/login/authSuccess',
	redirectUrl:'http://h5.homeyb.cn/pages/transfePage/transfePage',
	
	/**
	 * 主页
	 */
	map:'api/home/map',//地图参数
	headlines:'api/home/headlines',//头条列表
	bookView:'api/home/bookView',//查看百科（头条）
	bookList:'api/home/bookList',//购房百科
	indexData:'api/home/index',//首页数据
	soldHouse:'api/home/soldHouse',//近期已售
	collectList:'api/homeToken/collectList',//查看我的收藏、记录（type 1-收藏、0-记录）
	aboutUs:'api/home/aboutAs',//关于我们
	loginOut:'api/homeToken/exit',//退出登录 0：操作成功 -1：操作失败
	clientAdd:'api/homeToken/clientAdd',//我要推荐
	ownerAdd:'api/home/ownerAdd',//我是业主
	recommend:'api/home/recommend',//为你推荐 type:1-租房，2-二手房 3-新房
	collect:'api/homeToken/collect',//加入收藏
	noCollect:'api/homeToken/noCollect',//取消收藏
	checkToken:'api/homeToken/checkUp',//检查token是否有效
	getOpenId:'api/home/getOpenId',//获取openid
	getQrcodePic:'api/home/getQrcodePic',//获取小程序码 
	getVideoList:'api/home/videoList',//获取视频列表
	favoriteList:'api/homeToken/favoriteList',//获取收藏夹列表
	addFavorite:'api/homeToken/addFavorite',//新增收藏夹
	removeFavorite:'api/homeToken/removeFavorite',//删除收藏夹
	editFavorite:'api/homeToken/editFavorite',//编辑收藏夹
	addH5Browse:'api/home/addH5Browse',//记录浏览记录
	getShareCollect:'api/home/collectList',//查看分享的收藏夹内容
	getSDKSign:'api/home/getSDKSign',//获取微信jsSDK配置
	
	/**
	 * 房源信息(旧房)
	 */
	jiufang:'api/oldHouse/xy',//地图找房 县级
	jiufangProvince:'api/oldHouse/xyProvince',//地图找房 区域
	jiufangHouse:'api/oldHouse/xyHouse',//地图找房 小区
	oldHouseCondition2:'api/oldHouse/oldHouseCondition2',//二手房条件筛选 （独家委托 Entrust1是2否）
	getChinaDict:'api/oldHouse/getChinaDict',//查询区域列表
	houseInfo:'api/oldHouse/houseInfo',//房源详情信息
	oldHouseCondition1:'api/oldHouse/oldHouseCondition1',//租房条件筛选
	xiaoqu:'api/oldHouse/areaList',//小区列表
	getOldHouseLog:'api/oldHouse/getOldHouseLog',//旧房跟进记录
	areaDetail:'api/oldHouse/areaInfo',//小区详情信息
	areaHouseList:'api/oldHouse/areaHouseList',//查询小区下的所有房源 houseType 1-租房 2-二手房
	
	/**
	 * 房源信息（新房）
	 */
	areaList:'api/newHouse/areaList',//新房列表
	areaCondition:'api/newHouse/areaCondition',//新房条件查询
	areaInfo:'api/newHouse/areaInfo',//新房详情
	apartment:'api/newHouse/houseInfo',//户型详情
	xinfang:'api/newHouse/xy',//地图找新房 县级
	xinfangProvince:'api/newHouse/xyProvince',//地图找新房 区域
	xinfangHouse:'api/newHouse/xyHouse',//地图找新房 楼盘
	
	
	/**
	 * 经纪人
	 */
	agentList:'api/user/userList',//所有经纪人列表
	getInfo:'api/user/getInfo',//获取个人信息(经纪人)
	rewardList:'api/client/rewardList',//佣金明细
	agentEditInfo:'api/user/editSave',//修改个人资料
	myClientList:'api/user/myClientList',//我的客户
	getAgentInfo:'api/user/getUserInfo',//经纪人详情
	login:'api/user/wxlogin',//经纪人登录
	myClientInfo:'api/user/myClientInfo',//跟进记录
	changeClientName:'api/user/changeClientName',//修改客户名称
	getClientOpenId:'api/user/getOpenId',//获取公众号openId
	saveOpenId:'api/user/saveGZHOpenId',//绑定公众号openId
	
	/**
	 * 客户
	 */
	myRecommendList:'api/client/myRecommendList',//我的推荐
	myManagerList:'api/client/myManagerList',//我的经纪人
	getMyInfo:'api/client/getInfo',//获取个人信息(用户)
	userEditInfo:'api/client/editSave',//修改个人信息（用户）
	wxLogin:'api/client/wxlogin',//客户登录
	sendCode:'api/client/ver',//发送验证码
	h5userLogin:'api/client/login',//H5登录
	getWechatInfo:'api/home/getGZHOpenId',//获取用户微信信息
}
