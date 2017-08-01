/**
 * 缓存数据工具 Cache utils.
 * @author tony_tian
 * @time 2017-07-27
 */
/**
 * 浏览器是否支持localstorage
 */
function isStorage() {
    return typeof(Storage) !== "undefined";
}
/**
 * 通过键值对存储数据到本地缓存
 * @param key 键
 * @param value 值
 */
function setLocalStorage(key, value) {
    value = isObject(value) ? json2String(value) : value
    if (isStorage()) {
        localStorage.key = value;
    } else if (isCookie()) {
        setCookie30days(key, value);
    } else {
        throw new Error("Your browser does not support cach.");
    }
}
/**
 * 通过key获取存储到本地缓存的数据
 * @param key 键
 */
function getLocalStorage(key) {
    var value = null;
    if (isStorage()) {
        value = localStorage.key;
    } else if (isCookie()) {
        value = getCookie(key);
    } else {
        throw new Error("Your browser does not support cach.");
        return null;
    }
    return isString(value) ? value : json2String(value);
}