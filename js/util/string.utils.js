/**
 * 字符串数据工具 String utils.
 * @author tony_tian
 * @time 2017-07-27
 */

/**
 * 是否是字符串
 * */
function isString(data) {
    return typeof(data) === "string";
}
/**
 * 空字符串
 *    var kaka1;
 *    var kaka2 = null;
 *    var kaka3 = "";
 *    var kaka4 = "   ";
 *    isEmpty(kaka1) == true;
 *    isEmpty(kaka2) == true;
 *    isEmpty(kaka3) == true;
 *    isEmpty(kaka4) == false;
 * */
function isEmpty(data) {
    return isNull(data) || isUndefined(data) || data.length == 0;
}
function isNotEmpty(data) {
    return !isEmpty(data);
}
/**
 * 空字符串
 *    var kaka1;
 *    var kaka2 = null;
 *    var kaka3 = "";
 *    var kaka4 = "   ";
 *    var kaka5 = "papa";
 *    var kaka6 = " papa  ";
 *    var kaka7 = false;
 *    var kaka8 = 123;
 *    isBlank(kaka1) == true;
 *    isBlank(kaka2) == true;
 *    isBlank(kaka3) == true;
 *    isBlank(kaka4) == true;
 *    isBlank(kaka5) == false;
 *    isBlank(kaka6) == false;
 *    isBlank(kaka7) == true;
 *    isBlank(kaka8) == true;
 * */
function isBlank(data) {
    if (isUndefined(data) || isNull(data)) return true;
    data = data.trim();
    return data.length == 0;
}
function isNotBlank(data) {
    return !isBlank(data);
}
/**
 * 如果数据为空，则返回默认值
 * @param data 待测数据
 * @param defaultVal 默认值
 */
function isBlank2defaultVal(data, defaultVal) {
    return isBlank(data) ? defaultVal : data;
}
/**
 * 字符串开头
 *      "iandulove".startWith("ia") = true
 */
String.prototype.startWith = function (s) {
    if (isBlank(this)) return false;
    if (s == null || s == "" || this.length == 0 || s.length > this.length) {
        return false;
    }
    if (this.substr(0, s.length) == s) {
        return true;
    }
    else {
        return false;
    }
    return true;
}
/**
 * 字符串结尾
 *      "iandulove".endWith("love") = true
 */
String.prototype.endWith = function (s) {
    if (isBlank(this)) return false;
    if (s == null || s == "" || this.length == 0 || s.length > this.length) {
        return false;
    }
    if (this.substring(this.length - s.length) == s) {
        return true;
    }
    else {
        return false;
    }
    return true;
}
/**
 * 消除字符串前后空格
 * */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
/**
 * 不区分大小写比较
 *    "AaXy".equalsIgnoreCase("AAXY") = true
 * */
String.prototype.equalsIgnoreCase = function (s) {
    if (isBlank(this)) return false;
    if (isBlank(s)) return false;
    return this.toLowerCase() == s.toLowerCase();
}
/**
 * 字符串是否为boolean
 *      "true".boolWith() = true
 */
String.prototype.boolWith = function () {
    return (/^true$/i).test(this);
}
/**
 * 字符串重复
 * @param n 重复个数
 * @returns s * 5 = sssss
 */
String.prototype.repeat = function (n) {
    return (new Array(n + 1)).join(this);
}
/**
 * 字符串过滤非数字
 *      'name123' --> '123'
 */
function filterNotDigit(preStr) {
    return preStr.replace(/[^0-9]/ig, "");
}
/**
 * 移除指定字符串
 * preStr="1,2,6,8" --> if assigndigit= 6 , return "1,2,8"
 */
function filterAssignDigit(preStr, assigndigit) {
    if (isBlank(preStr)) return "";
    var temp = preStr.replace(assigndigit, "");
    return filterBlank(temp);
}
/**
 * 过滤掉“,”逗号分隔的空字符和非数字
 *      '1,2,t,,6' --> '1,2,6'
 */
function filterBlank(preStr) {
    if (isBlank(preStr)) return "";
    var idsarray = preStr.split(",");
    var resid = "";
    for (var i = 0, len = idsarray.length; i < len; i++) {
        var item = idsarray[i];
        if (isBlank(item)) continue;
        if (isNaN(item)) continue;
        resid += item + ",";
    }
    resid = resid.substring(0, resid.length - 1);
    return resid;
}