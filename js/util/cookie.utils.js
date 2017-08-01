/**
 * Cookie数据工具 Cookie utils.
 * @author tony_tian
 * @time 2017-07-28
 */

/**
 * 浏览器是否支持cookie
 */
function isCookie() {
    setCookieTimely('cookie_support_test_key', 'cookie_support_test_value');
    return 'cookie_support_test_value' == getCookie('cookie_support_test_key');
}
/**
 * 浏览器设置cookie:{key:value}键值对
 * @param key 键
 * @param value 值
 * @param days 过期时间，单位天
 * @param domain 域名
 * */
function setCookie(key, value, days, domain) {
    if (isBlank(key) && isBlank(value)) {
        throw new Error("Cookie's key and value cannot be empty.");
        return;
    }
    var tempCookie = key + "=" + escape(value);
    if (isNumber(days)) {
        var nowDate = new Date();
        nowDate.setTime(nowDate.getTime() + days * 24 * 60 * 60 * 1000);
        tempCookie += ";expires=" + nowDate.toGMTString();
    }
    if (isURL(domain)) {
        tempCookie += ";path=/;domain=" + domain;
    } else {
        tempCookie += ";path=/";
    }
    document.cookie = tempCookie;
}
/**
 * 通过key获取cookie的value
 * @param key 键
 * */
function getCookie(key) {
    var arrStr = document.cookie.split("; ");
    var value;
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == key) {
            value = unescape(temp[1]);
        }
    }
    return isBlank(value) ? "" : value;
}
/**
 * 通过key删除cookie
 * @param key 键
 * */
function removeCookie(key) {
    setCookie(key, "", -1, null);
}
/**
 * 及时过期cookie  -- 浏览会话结束时失效
 * */
function setCookieTimely(key, value) {
    setCookie(key, value, null, null);
}
/**
 * 浏览器设置cookie:{key:value}键值对30天有效
 * @param key 键
 * @param value 值
 * */
function setCookie30days(key, value) {
    setCookie(key, value, 30, null);
}
/**
 * 浏览器设置cookie:{key:value}键值对
 * @param key 键
 * @param value 值
 * @param days 过期时间
 * */
function setCookieTimes(key, value, days) {
    if (!isNumber(days)) {
        throw new Error("Cookie's expire  must be number.");
        return;
    }
    setCookie(key, value, days, null);
}