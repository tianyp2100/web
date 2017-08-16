/**
 * 网络数据工具 Web utils.
 * @author tony_tian
 * @time 2017-07-27
 */

/**
 * 获取url中的值
 */
function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}
/**
 * 获取浏览器名称和版本.<br>
 * return eg：ie9.0、ie11.0、firefox34.0、chrome37.0
 * */
function getBrowserNV() {
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    var browserNV = "";
    //IE
    if (agent.indexOf("msie") > 0) {
        browserNV = agent.match(regStr_ie);
    }
    //firefox
    if (agent.indexOf("firefox") > 0) {
        browserNV = agent.match(regStr_ff);
    }
    //Chrome
    if (agent.indexOf("chrome") > 0) {
        browserNV = agent.match(regStr_chrome);
    }
    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        browserNV = agent.match(regStr_saf);
    }
    browserNV = browserNV.toString();
    //other
    if ("" == browserNV) {
        browserNV = "Is not a standard browser";
    }
    //Here does not display "/"
    if (browserNV.indexOf('firefox') != -1 || browserNV.indexOf('chrome') != -1) {
        browserNV = browserNV.replace("/", "");
    }
    //Here does not display space
    if (browserNV.indexOf('msie') != -1) {
        //msie replace IE & trim space
        browserNV = browserNV.replace("msie", "ie").replace(/\s/g, "");
    }
    if (browserNV == "Is not a standard browser") {
        if (isIE()) {
            browserNV = "ie11.0";
        }
    }
    //return eg:ie9.0 firefox34.0 chrome37.0
    return browserNV;
}
//IE11革新
function isIE() { //IE
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
/**
 * 移动终端浏览器版本信息
 * */
function mobileBrowserVersions() {
    var u = navigator.userAgent;
    var app = navigator.appVersion;
    return {         //
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
}
function mobileBrowserLanguage() {
    return (navigator.browserLanguage || navigator.language).toLowerCase();
}
/**
 * 获取请求的，协议+域名+端口
 */
function domainURL() {
    var curUrl = window.location.href;
    var i1 = curUrl.indexOf("://");
    var tempUrl = curUrl.substring(i1 + 3);
    return curUrl.substring(0, i1 + 3 + tempUrl.indexOf("/"));
}
/**
 * 获取真实URL地址  --域名之后的数据
 */
function getRelativePath() {
    var strUrl = document.location.toString();
    var arrObj = strUrl.split("//");
    return arrObj[1].substring(arrObj[1].indexOf("/"));
}
/**
 * 请求参数编码
 * */
function paramEncode(string) {
    if (isNotBlank(string)) {
        return encodeURIComponent(string);
    }
    return "";
}
/**
 * html转换文本字符串，过滤标签
 */
//"<p>kakaka</p><span>我是卡卡</span>"  --> kakaka我是卡卡
function html2string(html) {
    if (isBlank(html)) return false;
    var taglen = 0;
    if (html.indexOf("<") != -1) {
        taglen = html.match(/</g).length;
    } else {
        return html;
    }
    var temphtml = html;
    var tempres = "";
    for (var i = 0; i < taglen; i++) {
        var startid = temphtml.indexOf("<");
        var prehtml = temphtml.substring(0, startid);
        if (isNotBlank(prehtml)) {
            prehtml = isBlank2defaultVal(prehtml, "");
            tempres += prehtml;
        }
        var endid = temphtml.indexOf(">");
        var afterhtml = temphtml.substring(parseInt(endid) + 1);
        temphtml = afterhtml;
    }
    return tempres;
}
/**
 * html标签转换转义字符
 *      <p> --> &lt;p&gt;
 */
function html2tag(str) {
    var RexStr = /\<|\>|\"|\'|\&/g
    str = str.replace(RexStr, function (MatchStr) {
        switch (MatchStr) {
            case "<":
                return "&lt;";
                break;
            case ">":
                return "&gt;";
                break;
            case "\"":
                return "&quot;";
                break;
            case "'":
                return "&#39;";
                break;
            case "&":
                return "&amp;";
                break;
            default:
                break;
        }
    });
    return str;
}