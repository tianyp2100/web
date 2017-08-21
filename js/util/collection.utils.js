/**
 * 集合数据工具 Collection utils.
 * @author tony_tian
 * @time 2017-07-27
 * JavaScript Array 对象: http://www.w3school.com.cn/jsref/jsref_obj_array.asp
 */

/**
 * 数组不为空
 * */
Array.prototype.isNotEmpty = function () {
    return !this.isEmpty();
}
/**
 * 数组为空
 * */
Array.prototype.isEmpty = function () {
    if (isNoData(this)) return true;
    if (this.length > 0) {
        return false;
    }
    return true;
}
/**
 * 数组是否含有某个元素
 */
Array.prototype.contains = function (ele) {
    if (isNoData(this)) return false;
    var flag = false;
    $.each(this, function (index, item) {
        if (equals(ele, item)) {
            flag = true;
        }
    });
    return flag;
}
/**
 * 删除数组指定元素 .<br/>
 * 注：需求接受操作结果 .<br/>
 * 例:  memberIds = removeArray(memberIds, id);
 * */
Array.prototype.remove = function (ele) {
    if (isNoData(this)) return false;
    if (!this.contains(ele)) return false;
    var removeIndex = -1;
    $.each(this, function (index, item) {
        if (equals(ele, item)) {
            removeIndex = index;
        }
    });
    this.splice(removeIndex, 1);
}
/**
 * 数组元素去重加入
 * */
Array.prototype.pushUnique = function (ele) {
    if (isNoData(this)) return false;
    if (!this.contains(ele)) this.push(ele);
}
/**
 * 数组集合转字符串
 * @param array 数组
 * @param separator 分隔符，例:“,”
 * @return {*}
 */
Array.prototype.toString = function (separator) {
    if (isNoData(this)) return "";
    if (isNoData(separator)) separator = ",";
    if (this.isNotEmpty()) {
        return this.join(separator);
    }
    return "";
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
