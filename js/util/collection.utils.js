/**
 * 集合数据工具 Collection utils.
 * @author tony_tian
 * @time 2017-07-27
 * JavaScript Array 对象: http://www.w3school.com.cn/jsref/jsref_obj_array.asp
 */

/**
 * 数组不为空
 * */
function isNotEmptyArray(array) {
    if (isNotNoData(array)) {
        if (array.length > 0) {
            return true;
        }
        return false;
    }
    return false;
}
/**
 * 数组为空
 * */
function isEmptyArray(array) {
    return !isNotEmptyArray(array);
}
/**
 * 数组是否含有某个元素
 */
function containsArray(array, ele) {
    return $.inArray(ele, array) >= 0;
}
/**
 * 数组元素去重加入
 * */
function uniqPushArray(array, str) {
    if ($.inArray(str, array) != -1) {
        return false;
    }
    array.push(str);
}
/**
 * 数组集合转字符串
 * @param array 数组
 * @param separator 分隔符，例:“,”
 * @return {*}
 */
function trimArrayBracket(array, separator) {
    if (isNotEmptyArray(array)) {
        return array.join(",");
    }
    return null;
}
/**
 * 键值对map不为空
 * */
function isNotEmptyMap(map) {
    return !isEmptyMap(map);
}
/**
 * 键值对map为空
 * */
function isEmptyMap(map) {
    return mapLength(map) == 0;
}
/**
 * 键值对map的长度
 * */
function mapLength(map) {
    if (isNoData(map)) return 0;
    var count = 0;
    for (var key in map) {
        if (map.hasOwnProperty(key)) {
            count = count + 1;
        }
    }
    return count;
}

/**
 * 所有的参数都为空
 *  例如：调用方法参数：
 *          var args = [args1,args2,args3,args4];
 * */
function isAllArgsEmpty(args) {
    var arguments = new Array();
    arguments = args;
    if (arguments.length > 0) {
        var len = parseInt(arguments.length);
        for (var i = 0; i < len; i++) {
            var data = arguments[i];
            if (isNotNoData(data)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
/**
 * 切割数组获取子数组
 * @param array 待切割数组
 * @param fromIndex 开始的index，从0开始
 * @param toIndex 结束的index
 * @returns sub array
 */
function subArray(array, fromIndex, toIndex) {
    var resArray = null;
    if (isNotEmptyArray(array)) {
        resArray = new Array();
        var tempArray = new Array();
        tempArray = array;
        var len = array.length;
        var maxIndex = len - 1;
        if (isNaN(fromIndex) || isNaN(toIndex)) throw new Error("Array's fromIndex and toIndex must numbers.");
        if (fromIndex > maxIndex) fromIndex = maxIndex;
        if (toIndex > maxIndex) toIndex = maxIndex;
        resArray = tempArray.slice(fromIndex, toIndex);
    }
    return resArray;
}
