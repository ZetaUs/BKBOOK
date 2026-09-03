/**
 * 数据埋点227
 */
var pepPoints = pepPoints || {};
pepPoints.loader = (function (w) {
  var pl = {};

  /**
   * 参数初始化
   */
  pl.params = {
    log_version: '2',
    start_time: '',
    end_time: null,
    region: null,
    product_id: '',
    hardware: '',
    os: null,
    soft: '',
    active_user: '',   // 改为：YWBD_COUNT_U
    // YWBD_COUNT_U: '',
    active_organization: null,
    active_type: null,
    passive_object: null,
    passive_type: null,
    from_product: null,
    from_pos: null,
    company: '',
    action_title: '',
    action_type: 11,
    request: '',
    request_param: '',
    group_type: null,
    group: "",
    result_flag: null,
    result: null,

    // action_title: '',
    // passive_object: '',
    // active_user: '',
    // request: '',
    // request_param: ''
  };

  /**
   * 参数拼接
   * @param {*} obj
   * @returns {string}
   */
  var stringify = function (obj) {
    var str = "";
    for (var x in obj) {
      str += "~" + (obj[x] || "");
    }
    return str;
  };

  /**
   * 当DOM加载完成后主动触发上报(执行此方法)
   */
  pl.dataReport = function (__args) {

    // console.log(__args)

    /*
    if(!__args.product_id){
        alert('请输入product_id')
        return;
    }
    if(!__args.company){
        alert('请输入company')
        return;
    }
    */

    this.log_version = '2',
        this.params.start_time = GetDate(),
        this.params.end_time = null,
        this.params.region = null,
        this.params.product_id = __args.product_id,
        this.params.hardware = __args.hardware||GetHardWare(),
        this.params.os = __args.os||'deviceId:' + GetActiveUser(),
        this.params.soft = GetWare(),
        this.params.active_user = __args.active_user || GetActiveUser(),
        this.params.active_organization = null,
        this.params.active_type = __args.active_type || null,
        this.params.passive_object = __args.passive_object || null,
        this.params.passive_type = __args.passive_type || null,
        this.params.from_product = __args.from_product || null,
        this.params.from_pos = GetFromPos() || null,
        this.params.company = __args.company,
        this.params.action_title = __args.action_title || 'sys_200001',
        this.params.action_type = __args.action_type || 11,
        this.params.request = __args.request || GetRequest(),
        this.params.request_param = __args.request_param || GetRequestParam(),
        this.params.group_type = __args.group_type || null,
        this.params.group = __args.group ||GetGroupSession(),
        this.params.result_flag = null,
        this.params.result = __args.result || null,

        createImage(stringify(this.params));

    // return this.stringify(this.params);
  };

  // 获取开始时间方法（以毫秒做单位）
  var GetDate = function () {
    // 获取当前时间以毫秒做单位
    var myDate = new Date(); //时间实例
    var H = myDate.getTime(); //获取从1970年1月1日至今的毫秒数
    return H;
  };

  // 获取屏幕尺寸
  var GetHardWare = function () {
    // var ow = window.screen.availWidth;
    // var oh = window.screen.availHeight;
    var ow = screen.width;
    var oh = screen.height;
    return 'dpi:' + ow + "*" + oh;
  };



  // 获取浏览器url主机部分
  var GetFromPos = function () {
    return window.location.host;
  };

  // 获取浏览器url地址
  var GetRequest = function () {
    // return window.location.href;
    var host = window.location.host;
    var pathname = window.location.pathname;
    return host + pathname;
  };

  // 获取url地址参数
  var GetRequestParam = function () {
    return window.location.search.replace("?", "");
  };
  
  function getTrackInfo() {
  	// 浏览器类型和版本检测
  	let userAgent = navigator.userAgent;
  	let browserType = 'Unknown';
  	let browserVersion = 'Unknown';
  	
  	// 检测浏览器类型和版本
  	if (/Edg\/\d+/.test(userAgent)) {
  		browserType = 'Edge';
  		browserVersion = userAgent.match(/Edg\/([\d.]+)/)[1];
  	} else if (/Chrome\/\d+/.test(userAgent) && !/Edg\/\d+/.test(userAgent)) {
  		browserType = 'Chrome';
  		browserVersion = userAgent.match(/Chrome\/([\d.]+)/)[1];
  	} else if (/Firefox\/\d+/.test(userAgent)) {
  		browserType = 'Firefox';
  		browserVersion = userAgent.match(/Firefox\/([\d.]+)/)[1];
  	} else if (/Safari\/\d+/.test(userAgent) && !/Chrome\/\d+/.test(userAgent)) {
  		browserType = 'Safari';
  		let versionMatch = userAgent.match(/Version\/([\d.]+)/);
  		browserVersion = versionMatch ? versionMatch[1] : userAgent.match(/Safari\/([\d.]+)/)[1];
  	} else if (/MSIE \d+/.test(userAgent) || /Trident\/\d+/.test(userAgent)) {
  		browserType = 'IE';
  		if (/MSIE ([\d.]+)/.test(userAgent)) {
  			browserVersion = userAgent.match(/MSIE ([\d.]+)/)[1];
  		} else if (/rv:([\d.]+)/.test(userAgent)) {
  			browserVersion = userAgent.match(/rv:([\d.]+)/)[1];
  		}
  	} else if (/MicroMessenger\/\d+/.test(userAgent)) {
  		browserType = 'WeChat';
  		browserVersion = userAgent.match(/MicroMessenger\/([\d.]+)/)[1];
  	}
  	
  	// 设备类型检测
  	let deviceType = 'PC';
  	if (/miniProgram/i.test(userAgent) || window.__wxjs_environment === 'miniprogram') {
  		deviceType = 'MiniProgram';
  	} else if (/Android/i.test(userAgent)) {
  		deviceType = 'Android';
  	} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
  		if (/iPhone/i.test(userAgent)) {
  			deviceType = 'iPhone';
  		} else if (/iPad/i.test(userAgent)) {
  			deviceType = 'iPad'; // 或可单独设为 iPad
  		}
  	} else if (/Windows/i.test(userAgent)) {
  		deviceType = 'PC';
  	} else if (/Macintosh/i.test(userAgent)) {
  		deviceType = 'PC';
  	}
  	
  	// 返回指定格式
  	return `m-type:${browserType},,,d-type:${deviceType}`;
  } 

  // 获取硬件/软件环境（获取浏览器）
  var GetWare = function () {
    return "b-type:" + navigator.userAgent +",,,"+ getTrackInfo();
    //return "b-type:" + window.jQBrowser.name + '_' + window.jQBrowser.version + '_' + window.jQBrowser.platform;
  };

  //获取地址及参数的方法 active_user (active_user改为YWBD_COUNT_U)
  var GetActiveUser = function () {
    // 设置失效时间(生命周期为24h*30)
    if (!getCookie("YWBD_COUNT_U")) {
      setUserCookie("YWBD_COUNT_U", Getuuid(), 5475);
    }
    // return uuid;
    return getCookie("YWBD_COUNT_U");
  };

  // 设置uuid(格式：年秒-uuid)
  var Getuuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";
    var uuid = secondCount() + '-' + s.join("");
    return uuid;
  };

  // 设置cookie
  var setUserCookie = function (key, value, expiresT) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + expiresT);
    document.cookie = key + "=" + value + "; expires=" + oDate.toGMTString() + "; domain=" + getDomain();
  };

  // 设置cookie,生命周期为一次会话，关闭浏览器失效
  var setGroupCookie = function (key, value) {
    document.cookie = key + "=" + value + "; domain=" + getDomain();
  };

  // 获取cookie
  var getCookie = function (key) {
    var arr1 = document.cookie.split("; ");
    for (var i = 0; i < arr1.length; i++) {
      var arr2 = arr1[i].split("=");
      if (arr2[0] == key) {
        return decodeURI(arr2[1]);
      }
    }
  };

  // 获取domain
  var getDomain = function() {
    // var str = 'https://www.pep.com.cn/jxzy/';
    var domain;
    var str = location.href;
    // console.log(str);

    var index = str.indexOf('//');
    var str2 = str.slice(index + 2);
    var index2 = str2.indexOf('/');
    var newStr = str2.slice(0, index2);
    // console.log(newStr);

    var arr = newStr.split('.');
    // console.log(arr);
    if(arr.length >= 4) {
      domain = arr[arr.length -3] + '.' + arr[arr.length -2] + '.' + arr[arr.length -1];
    }else if(arr.length < 4) {
      domain = arr.join('.');
    }
    // console.log(domain);
    return domain;
  }

  // 获取当前时间到年初1月1日的秒数
  var secondCount = function () {
    var time1 = new Date("2019/01/01 00:00:00");
    var time2 = new Date();

    var countDown = time2 - time1;
    var t = Math.floor(countDown / 1000);  //将毫秒换算成秒
    return t;
  };

  // group: 生成的cookie session标识 生命周期为一次会话
  var GetGroupSession = function () {
    //console.log('aaaa')
    /*
    var session = this.Getuuid();
    if(!sessionStorage.getItem("group")){
        sessionStorage.setItem("group", session);
    }
    // return session;
    return sessionStorage.getItem("group");
    */
    if (!getCookie("YWBD_COUNT_G")) {  // group改为YWBD_COUNT_G
      setGroupCookie("YWBD_COUNT_G", Getuuid());
    }
    return getCookie("YWBD_COUNT_G");
  };

  // 生成img并绑定其src
  var createImage = function (params) {
    var pointImg = document.querySelector('#pepPoitImg');
    if (pointImg == null) {
      var img = document.createElement("img");
      img.setAttribute("id", "pepPoitImg");
      img.setAttribute("src", "https://bd-st.mypep.cn/img/stat.gif?" + params.slice(1));
      img.style.display = "none";
      document.getElementsByTagName("body")[0].appendChild(img);
    } else {
      pointImg.setAttribute("src", "https://bd-st.mypep.cn/img/stat.gif?" + params.slice(1));
    }
  };

  // console.log(pl);

  return pl;
})(window);
