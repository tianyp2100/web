/**
 * Ajax数据工具 Ajax utils.
 * @author tony_tian
 * @time 2017-07-27
 * 参照：http://www.w3school.com.cn/jquery/ajax_ajax.asp
 */

/**
 * exeFunc json请求封装方法
 * @param url 请求地址
 * @param type 请求类型 GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS,TRACE
 * @param async  请求发起类型 同步false,异步true(默认)
 * @param timeout  请求超时时间（毫秒），默认1分钟
 * @param dataType 预期服务器返回的数据类型 xml,html,script,json,sonp,text
 * @param reqData 服务器请求数据
 * @param succFunc 请求成功回调方法
 * @param errFunc 请求失败回调方法
 */
function exeFunc(url, type, async, timeout, dataType, reqData, succFunc, errFunc) {
    type = (isNoData(type)) ? "POST" : type;
    async = isNoData(async) ? true : async;
    dataType = isNoData(dataType) ? "json" : dataType;
    reqData = isNoData(reqData) ? {} : reqData;
    timeout = !isNumber() ? 60000 : timeout;
    $.ajax({
        type: type,
        url: url,
        async: async,
        timeout: timeout,
        data: reqData,
        dataType: dataType,
        success: function (data) {
            succFunc(data);
        },
        error: function (data) {
            errFunc(data);
        }
    });
}

/**
 * exeFuncJsonP jsonp请求封装方法  --JSONP本质发送数据，使用的"GET"方法
 * @param url 请求地址
 * @param type 请求类型 GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS,TRACE
 * @param async  请求发起类型 同步false,异步true(默认)
 * @param timeout  请求超时时间（毫秒），默认1分钟
 * @param reqData 服务器请求数据
 * @param succFunc 请求成功回调方法
 * @param errFunc 请求失败回调方法
 */
function exeFuncJsonP(url, type, async, timeout, reqData, succFunc, errFunc) {
    type = (isNoData(type)) ? "GET" : type;
    async = isNoData(async) ? true : async;
    reqData = isNoData(reqData) ? {} : reqData;
    timeout = !isNumber() ? 60000 : timeout;
    $.ajax({
        type: type,
        url: url,
        async: async,
        timeout: timeout,
        data: reqData,
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        success: function (data) {
            succFunc(data);
        },
        error: function (data) {
            errFunc(data);
        }
    });
}
/**
 * ajaxFunc json请求封装方法
 * @param url 请求地址
 * @param reqData 服务器请求数据
 * @param succFunc 请求成功回调方法
 */
function ajaxFunc(url, reqData, succFunc) {
    exeFunc(url, "POST", true, 30000, "json", reqData, succFunc, defErrFunc);
}
/**
 * ajaxFunc json请求封装方法
 * @param url 请求地址
 * @param reqData 服务器请求数据
 * @param succFunc 请求成功回调方法
 * @param errFunc 请求失败回调方法
 */
function ajaxFunc(url, reqData, succFunc, errFunc) {
    exeFunc(url, "POST", true, 30000, "json", reqData, succFunc, errFunc);
}

/**
 * ajaxFunc jsonp请求封装方法
 * @param url 请求地址
 * @param reqData 服务器请求数据
 * @param succFunc 请求成功回调方法
 */
function ajaxFuncJsonP(url, reqData, succFunc) {
    exeFuncJsonP(url, "GET", true, 30000, reqData, succFunc, defErrFunc);
}
/**
 * ajaxFunc jsonp请求封装方法
 * @param url 请求地址
 * @param reqData 服务器请求数据
 * @param succFunc 请求成功回调方法
 * @param errFunc 请求失败回调方法
 */
function ajaxFuncJsonP(url, data, succFunc, errFunc) {
    exeFuncJsonP(url, "GET", true, 30000, data, succFunc, errFunc);
}

function defErrFunc() {
    alert("请求超时或网络已断开");
}

var JRSC = {} //json result status code

function JRSCinit() {
    JRSC["success"] = 200;  //successful
    JRSC["error"] = 500;  //server error
    JRSC["valid_failed"] = 400;  //valid failed
    JRSC["warmtips "] = 800;  //business error tips
    JRSC["unlogin"] = 801;  //not login
    JRSC["unauthorized"] = 802; //permission denied
    JRSC["invalid_data"] = 803; //invalid data
    JRSC["non_data"] = 804; //non data
    JRSC["illlegal"] = 805; //illlegal
}

$(function () {
    JRSCinit();
});

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

function close_warmtips() {
    $("#warmtips").text("");
    $("#warmtips").css({"background": "#FFFFFF", "color": "#FFFFFF"});
}

/**
 * Ajax请求 默认请求方式=post，timeout=45s，相应数据类型=json
 * @param url 请求地址
 * @param requestData 请求参数
 * @param successFunc 成功回调方法
 * @param lockFlag Boolean类型 请求锁定标识, 默认必须是false
 */
function ajaxFunc(url, requestData, successFunc, lockFlag) {
    if (lockFlag) return;
    lockFlag = true;
    $.ajax({
        url: url,
        type: "POST",
        timeout: 45000,
        data: requestData,
        dataType: "json",
        beforeSend: function () {
            NProgress.start();
        },
        complete: function () {
            NProgress.done();
        },
        success: function (responseData) {
            lockFlag = false;
            parseResponseData(successFunc, responseData);
        },
        error: function (responseData) {
            lockFlag = false;
            parseResponseData(successFunc, responseData);
        }
    });
}
/**
 * 解析ajax请求的相应数据
 * @param successFunc 成功回调方法
 * @param responseData 相应数据
 * @returns {*}
 */
function parseResponseData(successFunc, responseData) {
    var serverErrorMessage = "网络中断或服务器请求超时或正在升级";
    var jsonResult = new Object();
    var serverError = {"code": JRSC["error"], "message": serverErrorMessage};
    try {
        outPrintln(json2string(responseData));
        if (isNoData(responseData)) {
            return serverError;
        }
        if (isNotNoData(responseData.code)) {
            var code = responseData.code;
            var message = responseData.message;
            if (code == JRSC["unlogin"]) {
                unlogin();
            } else if (code == JRSC["error"]) {
                warmtips("err", message);
            } else {
                successFunc(responseData);
            }
        } else if (isNotNoData(responseData.status)) {
            var status = responseData.status;
            if (JRSC["valid_failed"] == status) {
                if (isNoData(responseData.responseJSON.errors)) {
                    warmtips("err", responseData.responseJSON.message);
                } else {
                    var max = parseInt(responseData.responseJSON.errors.length) - 1;
                    warmtips("err", responseData.responseJSON.errors[max].defaultMessage);
                }
            } else if (JRSC["error"] == status) {
                warmtips("err", serverError);
            } else {
                warmtips("err", serverError);
            }
        } else {
            warmtips("err", serverError);
        }
    } catch (e) {
        warmtips("err", serverError);
    }
}
function unlogin() {
    window.location.href = "../?redirect_url=" + currentPageURL();
}
function waitnext() {
    warmtips("warn", "待开发完善");
}