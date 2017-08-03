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