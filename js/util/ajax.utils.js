/**
 * Ajax数据工具 Ajax utils.
 * @author tony_tian
 * @time 2017-07-27
 * 参照：http://www.w3school.com.cn/jquery/ajax_ajax.asp
 */
/**
 * exeFunc 请求封装方法
 * @param url 请求地址
 * @param type 请求类型 GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS,TRACE
 * @param async  请求发起类型 同步false,异步true(默认)
 * @param timeout  请求超时时间（毫秒），默认1分钟
 * @param dataType 预期服务器返回的数据类型 xml,html,script,json,sonp,text
 * @param data 服务器返回数据
 * @param succFunc 请求成功回调方法
 * @param errFunc 请求失败回调方法
 */
function exeFunc(url, type, async, timeout, dataType, data, succFunc, errFunc) {
    type = (isNoData(type)) ? "POST" : type;
    async = isNoData(async) ? true : async;
    dataType = isNoData(dataType) ? "json" : dataType;
    data = isNoData(data) ? {} : data;
    timeout = !isNumber() ? 60000 : timeout;
    $.ajax({
        type: type,
        url: url,
        async: async,
        timeout: timeout,
        data: data,
        dataType: dataType,
        success: function (data) {
            succFunc(data);
        },
        error: function (data) {
            errFunc(data);
        }
    });
}
function exeFuncJSONP(url, type, async, timeout, data, succFunc, errFunc) {
    type = (isNoData(type)) ? "POST" : type;
    async = isNoData(async) ? true : async;
    data = isNoData(data) ? {} : data;
    timeout = !isNumber() ? 60000 : timeout;
    $.ajax({
        type: type,
        url: url,
        async: async,
        timeout: timeout,
        data: data,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            succFunc(data);
        },
        error: function (data) {
            errFunc(data);
        }
    });
}
/**
 * ajaxFunc 请求封装方法
 * */
function ajaxFunc(url, data, succFunc) {
    exeFunc(url, "POST", true, 30000, "json", data, succFunc, defErrFunc);
}

/**
 * ajaxFunc 请求封装方法 jsonp
 * */
function ajaxFuncJSONP(url, data, succFunc) {
    exeFuncJSONP(url, "POST", true, 30000, data, succFunc, defErrFunc);
}

function defErrFunc() {
    alert("请求超时或网络已断开");
}