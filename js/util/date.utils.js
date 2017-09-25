/**
 * 日期数据工具 Date utils.
 * @author tony_tian
 * @time 2017-07-27
 */

var timeStyle1 = "yyyy-MM-dd";
var timeStyle2 = "yyyy-MM-dd hh:mm:ss";
var timeStyle3 = "yyyy年MM月dd日 hh:mm:ss";
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/**
 * 是否日期
 * */
function isDate(date) {
    return date instanceof Date;
}
/**
 * 日期转换字符串
 * @param date Date对象或时间戳  1448467200000或2015-11-26或2015-11-26 00:00:00
 * @param style 日期格式切换
 *               style = 2, 格式如"2017-07-27 13:37:12" ，默认
 *               style = 1, 格式如 "2017-07-27"
 *               style = 3, 格式如 "2017年07月27日 13:37:12"
 *               测试建议:
 *                        var kaka5 = 1501028795331;
 *                        alert(date2string(kaka5, 1))
 *                        若字符串则错误: JS的new Date()的值为Invalid Date、NaN-NaN的问题，可将所有的'-'转为'/'即可，字符串date.replace(new RegExp(/-/gm) ,"/");
 * @return {符合要求的日期字符串}
 */
function date2string(date, style) {
    var pattern = "";
    switch (style) {
        case 1: {
            pattern = timeStyle1;
            break;
        }
        case 2: {
            pattern = timeStyle2;
            break;
        }
        case 3: {
            pattern = timeStyle3;
            break;
        }
        default: {
            pattern = timeStyle2;
        }
    }
    return dateFormat(date, pattern);
}
/**
 * 按格式，日期转换字符串
 */
function dateFormat(date, pattern) {
    var tempDate = date;
    if (isNoDate(tempDate)) {
        tempDate = new Date();
    }
    if (!isNaN(tempDate)) tempDate = new Date(tempDate);
    if (pattern == undefined) {
        pattern = timeStyle2;
    }
    JSON.stringify(tempDate)
    return tempDate.format(pattern);
}
/**
 * 时间转换时间戳（just eg:） 2017-07-27 18:05:53 -> 1501149953000
 * */
function date2timestamp(date) {
    return Date.parse(date);
}
/**
 * 时间戳后缀
 * @return {number}
 */
function timestampsuffix() {
    return Date.parse(new Date().toDateString());
}
/**
 * 时间戳转换时间 （just eg:） 1501149953000 -> 2017-07-27 18:05:53
 * */
function timestamp2date(timestamp) {
    return new Date(timestamp);
}
/**
 * 日期字符串转换为date格式
 * eg:"2015-12-25" -> Mon Jan 25 2016 00:00:00 GMT+0800 (中国标准时间) {}
 * */
function string2date(datestr) {
    var temp = datestr.split('-');
    return new Date(temp[0], temp[1], temp[2]);
}
/**
 * 日期字符串加时间后缀，Date后台获取
 * eg:"2015-12-25" -> "2015-12-25 00:00:00"
 * */
function dataAddStartSuffix(string) {
    return string + " 00:00:00";
}
/**
 * 日期字符串加时间后缀，Date后台获取
 * eg:"2015-12-25" -> "2015-12-25 23:59:59"
 * */
function dataAddEndSuffix(string) {
    return string + " 23:59:59";
}
/**
 * 日期格式转换为格式化后: Mon Jan 25 2016 05:22:33 GMT+0800 (中国标准时间) ->
 * @param style 日期格式切换
 *               style = 1, 格式如"2015-01-25"
 *               style = 2, 格式如 "2015-01-25 05:22:33"，默认
 *               style = 3, 格式如 "2016年01月25日 05:22:33"
 * */
function timezone2date(timezone, style) {
    if (isNoDate(timezone)) {
        return null;
    } else {
        var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dateArray = timezone.split(" ");
        var year = dateArray[3];
        var day = dateArray[2];
        var time = dateArray[4];
        var month = parseInt($.inArray(dateArray[1], monthArray)) + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var date = null;
        switch (style) {
            case 1: {
                date = year + "-" + month + "-" + day;
                break;
            }
            case 2: {
                date = year + "-" + month + "-" + day + " " + time;
                break;
            }
            case 3: {
                date = year + "年" + month + "月" + day + "日 " + time;
                break;
            }
            default: {
                date = year + "-" + month + "-" + day;
            }
        }
        return date;
    }
}
/**
 * 两个时间(字符串)比较
 * @param time1 2019-07-27 18:20:40
 * @param time2 2017-07-27 18:20:40
 * @return 返回true 前者大于于后者
 */
function compare2time(time1, time2) {
    return (new Date(time1.replace(new RegExp(/-/gm), "/"))) > (new Date(time2.replace(new RegExp(/-/gm), "/")));
}
function compare2date(date1, date2) {
    return date1.getTime() > date2.getTime();
}
/**
 * 和当前时间比较字符串
 * @param time 时间字符串 2019-07-27 18:20:40
 * @return 返回true 大于当前时间
 */
function compare2now(time) {
    return (new Date()) < (new Date(time.replace("-", "/").replace("-", "/")));
}
function compare2date(date) {
    return new Date() < date.getTime();
}
/**
 * 非日期
 * */
function isNoDate(date) {
    return date == null || date == "" || typeof(date) == "undefined";
}