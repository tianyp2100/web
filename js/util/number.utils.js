/**
 * 数字数据工具 Biz utils.
 * @author tony_tian
 * @time 2017-07-27
 */

/**
 * 是否是一个数字
 *  isN("222.02") = true;
 *  isN("2") = true;
 *  isN("  222.02  ") = true;
 *  isN("22a2") = false;
 *  isN("22  2.02") = false;
 * */
function isNumber(numValue) {
    if(isNoData(numValue)) return false;
    var number = Number(numValue);
    return !isNaN(number);
}
/**
 * 科学计数法转换
 * eg:1.25E5 -> 125000
 * */
function eNum2fNum(eNum) {
    return new Number(eNum);
}