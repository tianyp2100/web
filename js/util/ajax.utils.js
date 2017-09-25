/**
 * Ajax数据工具 Ajax utils. Ajax Request Remote Server Data. <br/>
 * 优化: Ajax请求：再封装，简化，统一服务器端响应处理，未登录或通用code统一处理，和响应进度条，提示，重复按钮点击加锁等。<br/>
 * @author tony_tian
 * @time 2017-07-27
 * @see 参照：http://www.w3school.com.cn/jquery/ajax_ajax.asp
 * @test 见：html/ajax.html
 */

var remoteServerUrl = "https://loveshare.me/";
// var remoteServerUrl = "https://192.168.1.119:7688/";

var arsd = { //操作对象
    /**
     * 业务编码: Json Result Status Code Definition
     */
    code: function () {
        var JRSC = {};
        JRSC.success = 200;  //成功
        JRSC.error = 500;  //系统错误，请联系客服
        JRSC.warmtips = 800;  //业务温馨提示
        JRSC.not_login = 801;  //您还未登录
        JRSC.unauthorized = 802; //权限不足
        JRSC.invalid_data = 803; //数据为空或格式不合法
        JRSC.non_data = 804; //暂时无数据
        JRSC.illegal = 805; //非法操作
        return JRSC;
    },
    /**
     * post请求
     */
    post: function (url, data, func, lock) {
        sendFunc(remoteServerUrl + url, 'post', data, func, lock, true, 4500, "json");
    },
    /**
     * get请求
     */
    get: function (url, data, func, lock) {
        sendFunc(remoteServerUrl + url, 'get', data, func, lock, true, 4500, "json");
    },
    /**
     * post请求  --jsonp
     */
    postp: function (url, data, func, lock) {
        sendFunc(remoteServerUrl + url, 'post', data, func, lock, true, 4500, "jsonp");
    },
    /**
     * get请求  --jsonp
     */
    getp: function (url, data, func, lock) {
        sendFunc(remoteServerUrl + url, 'get', data, func, lock, true, 4500, "jsonp");
    },
}

/**
 * Ajax request send function ajax请求发送方法。<br/>
 * 注：此处可统一自定义设置通用的header值。<br/>
 *
 * @param url  远程服务器API请求地址  https://domain/context-path/request-mapping.json
 * @param method 请求类型 GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS,TRACE
 * @param data 服务器请求数据
 * @param func  请求成功回调方法
 * @param lock  请求重复锁, 初始默认值必须为false
 *
 * @param async  请求发起类型 同步false,异步true(默认)
 * @param timeout  请求超时时间（毫秒），默认1分钟
 * @param dataType 预期服务器返回的数据类型 xml,html,script,json,jsonp,text
 */

function sendFunc(url, method, data, func, lock, async, timeout, dataType) {
    //数据验证和默认处理
    if (isNoData(url)) throw new Error("EmptyError: Ajax's url is empty.");
    url = url + "?send-time=" + timestampsuffix();
    method = (isNoData(method)) ? "post" : method;
    data = isNoData(data) ? {} : data;
    async = isNoData(async) ? true : async;
    timeout = !isNumber() ? 45000 : timeout;
    dataType = isNoData(dataType) ? "json" : dataType;
    //重复点击锁定
    if (lock) return;
    lock = true;
    //Ajax向远程服务器发送请求
    if ("jsonp" != dataType) {  //json正常处理
        $.ajax({
            url: url,
            type: method,
            data: data,
            async: async,
            timeout: timeout,
            dataType: dataType,
            beforeSend: function () {
                NProgress.start();
            },
            complete: function () {
                NProgress.done();
            },
            success: function (res) {
                lock = false;
                parseResponseData(func, res);
            },
            error: function (res) {
                lock = false;
                parseResponseData(func, res);
            }
        })
    } else { //jsonp正常处理
        $.ajax({
            url: url,
            type: method,
            data: data,
            async: async,
            timeout: timeout,
            dataType: "jsonp", //返回JSONP格式的数据，此值固定
            jsonp: "callback", //回调函数的名字，此值固定  --默认success
            beforeSend: function () {
                NProgress.start();
            },
            complete: function () {
                NProgress.done();
            },
            success: function (res) {
                lock = false;
                parseResponseData(func, res);
            },
            error: function (res) {
                lock = false;
                parseResponseData(func, res);
            }
        })
    }
}

/**
 * 解析ajax请求的相应数据。<br/>
 * 注：此解析主要依赖，业务相应json数据的结构和服务器默认架构的相应json数据结构，自定义。<br/>
 * @param successFunc 成功回调方法
 * @param responseData 服务器相应数据
 */
function parseResponseData(successFunc, responseData) {
    var serverErrorMessage = "网络中断或服务器请求超时或失败或正在升级";
    var bizCode = arsd.code();
    var serverError = {"code": bizCode.error, "message": serverErrorMessage};
    try {
        //outPrintln(json2string(responseData)); //打印相应数据
        if (isNoData(responseData)) {
            return serverError;
        }
        if (isNotNoData(responseData.code)) {
            var code = responseData.code;
            var message = responseData.message;
            if (bizCode.not_login === code) {
                not_login();
            } else if (bizCode.error === code) {
                warmtips("err", message);
            } else {
                successFunc(responseData);
            }
        } else if (isNotNoData(responseData.status)) {
            var status = responseData.status;
            if (status >= 400 && status <= 499) {
                if (isNoData(responseData.responseJSON.errors)) {
                    warmtips("err", responseData.responseJSON.message);
                } else {
                    var max = parseInt(responseData.responseJSON.errors.length) - 1;
                    warmtips("err", responseData.responseJSON.errors[max].defaultMessage);
                }
            } else {
                warmtips("err", serverErrorMessage);
            }
        } else {
            warmtips("err", serverErrorMessage);
        }
    } catch (e) {
        warmtips("err", serverErrorMessage);
    }
}
/**
 * 通用温馨提示
 * @param flag 提示标识：err，warn，ok，loading
 * @param msg  提示信息
 */
function warmtips(flag, msg) {
    close_warmtips();
    if (flag === "err") {
        $("#warmtips").css({"background": "#FFD2D2", "color": "#FF0000"});
    }
    if (flag === "warn") {
        $("#warmtips").css({"background": "#FFFFB3", "color": "#FF8040"});
    }
    if (flag === "ok") {
        $("#warmtips").css({"background": "#D5FFD5", "color": "#008000"});
    }
    if (flag === "loading") {
        $("#warmtips").css({"background": "#C6FFFF", "color": "#8000FF"});

    }
    $("#warmtips").html(msg);
    setInterval("close_warmtips()", 8000);
}
/**
 * 快速关闭提示
 */
function close_warmtips() {
    $("#warmtips").text("");
    $("#warmtips").css({"background": "#FFFFFF", "color": "#FFFFFF"});
}
/**
 * 未登录跳转
 */
function not_login() {
    window.location.href = "../?redirect_url=" + currentPageURL();
}