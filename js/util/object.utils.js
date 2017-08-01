/**
 * 对象数据工具 String utils.
 * @author tony_tian
 * @time 2017-07-27
 */

/**
 * 是否是一个对象
 * */
function isObject(data) {
    return typeof(data) === "object";
}
/**
 * null对象
 *    var kaka = null;
 *    isNull(kaka) == true;
 */
function isNull(data) {
    return data === null;
}
function isNotNull(data) {
    return !isNull(data);
}
/**
 * 未定义对象
 *    var kaka;
 *    isUndefined(kaka) == true;
 */
function isUndefined(data) {
    return data === undefined || typeof(data) === "undefined";
}
function isNotUndefined(data) {
    return !isUndefined(data);
}
/**
 * 空数据
 * */
function isNoData(data) {
    return isNull(data) || isUndefined(data) || data == "";
}
function isNotNoData(data) {
    return !isNoData(data);
}
/**
 * 字符串转json对象
 * @param string  json字符串
 * @return json 对象
 */
function string2Json(string) {
    return JSON.parse(string);
}
/**
 * json对象转字符串
 * @param json json对象
 * @return json字符串
 */
function json2String(json) {
    return JSON.stringify(json);
}
/**
 * 控制台打印数据
 * */
function outPrint(data) {
    var out = isObject(data) ? json2String(data) : data;
    console.log(out);
}
/**
 * 控制台打印数据   --换行
 * */
function outPrintln(data) {
    var out = isObject(data) ? json2String(data) : data;
    console.log(out + "\n");
}
/**
 * 睡眠几秒再执行方法
 * @param n 时间单位，s
 * @param callbackFunc
 */
function sleep(n, callbackFunc) {
    var start = new Date().getTime();
    n = n * 1000;
    while (true)  if (new Date().getTime() - start > n) break;
    callbackFunc();
}