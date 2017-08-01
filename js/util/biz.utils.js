/**
 * 业务数据工具 Biz utils.
 * @author tony_tian
 * @time 2017-07-27
 */
/**
 * 密码难度级别 0-5
 * */
function passwordDifficultDegree(passwd) {
    var degree = 0;
    if (isRegularNoDate(passwd)) return degree;
    if (isUpperCase(passwd)) {
        degree++;
    }
    if (isLowerCase(passwd)) {
        degree++;
    }
    if (isDigit(passwd)) {
        degree++;
    }
    if (isSpecialCharacter(passwd)) {
        degree++;
    }
    if (passwd.length > 5) {
        degree++;
    }
    return degree;
}
var charsTable = ["0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"];
/**
 * 随机数
 * */
function random(len) {
    var key = "";
    for (var i = 0; i < len; ++i) {
        key += charsTable[parseInt(Math.random() * 62)].toString();
    }
    return key;
}
/**
 * UUID唯一码
 * */
function uuid(len) {
    var radix = 16;//16进制
    var uuid = [], i;
    radix = radix || charsTable.length;
    if (len) {
        for (i = 0; i < len; i++) {
            uuid[i] = charsTable[0 | Math.random() * radix];
        }
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = charsTable[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
/**
 * 数字转换汉字
 * */
function number2Chinese(number) {
    var fraction = ['', ''];
    var digit = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var unit = [['', '万', '亿'], ['', '十', '百', '千']];
    var head = number < 0 ? '' : '';
    number = Math.abs(number);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(number * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    number = Math.floor(number);
    for (var i = 0; i < unit[0].length && number > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && number > 0; j++) {
            p = digit[number % 10] + unit[1][j] + p;
            number = Math.floor(number / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零/, '').replace(/(零.)+/g, '').replace(/^整$/, '');
}