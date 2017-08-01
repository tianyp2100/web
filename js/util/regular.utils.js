/**
 * 正则数据工具 Regular utils.
 * @author tony_tian
 * @time 2017-07-27
 */

// regular expression
var UPPER_LETTER = /[A-Z]/;
var LOWER_LETTER = /[a-z]/;
var NUMBER_DIGIT = /[\d]/;
var CHINESE = /^[\u4e00-\u9fa5]$/;
var SPECIAL_SYMBOL = /[`~!@#\$%\^&\*\(\)-\+_\{\}\[\]\|:;\",\.\/\<\>\\?\\]/;
var SPECIAL_SYMBOL_ALL = /^[`~!@#\$%\^&\*\(\)-\+_\{\}\[\]\|:;\",\.\/\<\>\\?\\~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]$/;
var CHINESE_NAME = /^([\u4e00-\u9fa5]{2,7})$/;
var NICK_NAME = /^[a-zA-Z\d\u4e00-\u9fa5]{2,15}$/;
var ACCOUNT_NAME = /^[a-zA-Z\d]{2,10}$/;
var PASSWORD = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{6,15}$/;
var MOBILE_PHONE = /^((13[0-9])|(17[0|6|7|8])|(147)|(15[^4,\D])|(18[0-9]))\d{8}$/;
var FIXED_PHONE = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
var EMAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var MONEY = /^(([1-9]\d{0,11})|0)(\.\d{1,2})?$/;
var V_CODE = /^\d{6}$/;
var URL = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
var CHINESE_IDENTITY_CARD = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

/**
 * 大写字母
 * */
function isUpperCase(data) {
    return UPPER_LETTER.test(data);
}
/**
 * 小写字母
 * */
function isLowerCase(data) {
    return LOWER_LETTER.test(data);
}
/**
 * 数字
 * */
function isDigit(data) {
    return NUMBER_DIGIT.test(data);
}
/**
 * 中文汉字
 */
function isChinese(data) {
    return CHINESE.test(data);
}
/**
 * 特殊字符
 * */
function isSpecialCharacter(data) {
    return SPECIAL_SYMBOL.test(data);
}
/**
 * 特殊字符（全）
 * */
function isSpecialAllCharacter(data) {
    return SPECIAL_SYMBOL_ALL.test(data);
}
/**
 * 中文姓名
 * */
function isChinesName(name) {
    return CHINESE_NAME.test(name);
}
/**
 * 昵称2-20位字母或汉字和数字组合
 */
function isNickName(name) {
    return NICK_NAME.test(name);
}
/**
 * 字母和数字组成
 * */
function isAccount(name) {
    return ACCOUNT_NAME.test(name);
}
/**
 * 安全密码：1.密码长度6~15位 2.大写字母，小写字母，数字，特殊符号必须四选三
 */
function isPassword(password) {
    return PASSWORD.test(password);
}
/**
 * 手机号
 */
function isMobilePhone(number) {
    return MOBILE_PHONE.test(number);
}
/**
 * 座机
 */
function isFixedPhone(number) {
    return FIXED_PHONE.test(number);
}
/**
 * 邮箱  --other: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
 */
function isEmail(email) {
    return EMAIL.test(email);
}
/**
 * 金额正则：①：非负整数输入，②：两位小数的非负浮点数输入，③：最大2位小数位和11位整数
 */
function isMoney(money) {
    return MONEY.test(money);
}
/**
 * 6位数字验证码
 * */
function is6BitVCode(code) {
    return V_CODE.test(code);
}
/**
 * 域名
 * */
function isURL(url) {
    return URL.test(url);
}
/**
 * 中国身份证有效性验证(非认证)
 * @param cardNo 身份证号码
 * @return boolean 校验结果,true为有效.
 */
function isChineseIdentityCard(cardNo) {
    if (isRegularNoDate(cardNo)) return false;
    if (CHINESE_IDENTITY_CARD.test(cardNo) && cardNo.length == 18) {
        //将前17位加权因子保存在数组里
        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
        //用来保存前17位各自乖以加权因子后的总和
        var idCardWiSum = 0;
        for (var i = 0; i < 17; i++) {
            idCardWiSum += parseInt(cardNo.substring(i, i + 1)) * idCardWi[i];
        }
        //计算出校验码所在数组的位置
        var idCardMod = idCardWiSum % 11;
        //得到最后一位身份证号码
        var idCardLast = cardNo.substring(17);
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
            if ("x" === (idCardLast.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (parseInt(idCardLast) == idCardY[idCardMod]) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}
/**
 * 非日期
 * */
function isRegularNoDate(date) {
    return date == null || date == "" || typeof(date) == "undefined";
}