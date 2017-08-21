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
 * 空数据  -- 数据为null或undefined或""，则true
 * */
function isNoData(data) {
    return isNull(data) || isUndefined(data) || data === "";
}
function isNotNoData(data) {
    return !isNoData(data);
}
/**
 * 字符串转json对象
 * @param string  json字符串
 * @return json 对象
 */
function string2json(string) {
    return JSON.parse(string);
}
/**
 * json对象转字符串
 * @param json json对象
 * @return json字符串
 */
function json2string(json) {
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
/**
 * 判断两个对象是否相等
 * @param obj1 对象1
 * @param obj2 对象2
 * @return true 则相等
 */
function equals(obj1, obj2) {
    // If both x and y are null or undefined and exactly the same
    if (obj1 === obj2) {
        return true;
    }
    // If they are not strictly equal, they both need to be Objects
    if (!( obj1 instanceof Object ) || !( obj2 instanceof Object )) {
        return false;
    }
    //They must have the exact same prototype chain,the closest we can do is
    //test the constructor.
    if (obj1.constructor !== obj2.constructor) {
        return false;
    }
    for (var p in obj1) {
        //Inherited properties were tested using x.constructor === y.constructor
        if (obj1.hasOwnProperty(p)) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if (!obj2.hasOwnProperty(p)) {
                return false;
            }
            // If they have the same strict value or identity then they are equal
            if (obj1[p] === obj2[p]) {
                continue;
            }
            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (typeof( obj1[p] ) !== "object") {
                return false;
            }
            // Objects and Arrays must be tested recursively
            if (!Object.equals(obj1[p], obj2[p])) {
                return false;
            }
        }
    }
    // obj1 equals obj2
    return true;
}