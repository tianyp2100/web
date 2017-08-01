/**
 * 分页工具类.<br/>
 * 纯实时分页.<br/>
 * 适用：总页数和分页数据列表的数据，为同一个后台的API接口提供.<br/>
 * @param container 存放页码的容器. document.getElementById("pagedivid").
 * @param countTotal 数据总条数.
 * @param pageTotal 总页数.
 * @param pageSize 页面大小.
 * @param pageIndex 当前页码，页码.
 * @param callbackFunc 为回调函数方法(为加载列表数据的方法)名称,传递页面参数pageIndex.
 * @param callbackFlag 此值初始化分页插件，不自动加载第一页数据，需要页面隐藏域支持(第三监控者)，第一次为空，之后不为空.
 *                     提供一个js全局标识位[需要自己的js中定义]: callbackFlag = false;
 *                     注：第一次加载页面或查询条件改变：callbackFlag = false,不再次回调加载列表;
 *                         之后条件不变时，如果callbackFlag = true;就去调回调方法.
 * @since 2016-03-07 18:55:28
 * @author Tony_Tian
 */
function page(container, countTotal, pageTotal, pageSize, pageIndex, callbackFunc, callbackFlag) {
    if (typeof(callbackFunc) == "function") {
        if (callbackFlag) {
            callbackFunc(pageIndex);
            //返回不重新加载分页
            return;
        } else {
            callbackFlag = true;
        }
    } else {
        hidePage(container);
        alert("您提供的回调方法不存在或非方法");
        return false;
    }

    //如果没有数据，不实现分页
    if (isNoData(pageIndex) || isNoData(pageSize) || isNoData(countTotal)) {
        hidePage(container);
        return false;
    }
    //保证数字
    countTotal = parseInt(countTotal);
    pageTotal = parseInt(pageTotal);
    pageSize = parseInt(pageSize);
    pageIndex = parseInt(pageIndex);
    //总页数为空，则计算
    if (isNoData(pageTotal)) {
        pageTotal = parseInt(pageSize == 0 ? 1 : (countTotal % pageSize > 0 ? countTotal / pageSize + 1 : countTotal / pageSize));
    }
    //特定数据处理
    if (countTotal == 0 || pageTotal < 2 || countTotal > 2147483647 || pageSize > 2147483647) {
        hidePage(container);
        return false;
    }

    //分页插件元素显示
    var a = [];
    //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
    if (pageIndex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev hide\">上一页</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">上一页</a>";
    }
    function setPageList() {
        if (pageIndex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }

    //总页数小于10
    if (pageTotal <= 10) {
        for (var i = 1; i <= pageTotal; i++) {
            setPageList();
        }
    }
    //总页数大于10页
    else {
        if (pageIndex <= 4) {
            for (var i = 1; i <= 5; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + pageTotal + "</a>";
        } else if (pageIndex >= pageTotal - 3) {
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageTotal - 4; i <= pageTotal; i++) {
                setPageList();
            }
        }
        else { //当前页在中间部分
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageIndex - 2; i <= pageIndex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + pageTotal + "</a>";
        }
    }
    if (pageIndex == pageTotal) {
        a[a.length] = "<a href=\"#\" class=\"next hide\">下一页</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">下一页</a>";
    }
    container.innerHTML = a.join("");
    //追加跳转页
    var totalpageshow = "&nbsp;&nbsp;共" + pageTotal + "页/" + countTotal + "条&nbsp;&nbsp;";
    var intxt = "<span class=\"gospan\">&nbsp; <input id=\"goid\" maxlength=\"6\" placeholder=\"页码\" onkeypress=\"return goNumber(event)\" type=\"text\" value=\"\"> </span>";
    var gobtn = "<a id=\"gobtn\" href=\"#\">跳转</a>";
    container.innerHTML = container.innerHTML + intxt + gobtn + totalpageshow;
    //事件点击
    var pageClick = function () {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageIndex; //初始的页码
        oAlink[0].onclick = function () { //点击上一页
            if (inx == 1) {
                return false;
            }
            inx--;
            page(container, countTotal, pageTotal, pageSize, inx, callbackFunc, callbackFlag);
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
            oAlink[i].onclick = function () {
                inx = parseInt(this.innerHTML);
                page(container, countTotal, pageTotal, pageSize, inx, callbackFunc, callbackFlag);
                return false;
            }
        }
        oAlink[oAlink.length - 2].onclick = function () { //点击下一页
            if (inx == pageTotal) {
                return false;
            }
            inx++;
            page(container, countTotal, pageTotal, pageSize, inx, callbackFunc, callbackFlag);
            return false;
        }
        oAlink[oAlink.length - 1].onclick = function () { //点击确定
            var gopageval = container.getElementsByTagName("input")[0].value;
            gopageval = parseInt(gopageval);
            //数据==保证在java的integer和数据库支持最大分页数据，并且为数字
            if (!isNaN(gopageval) && gopageval > 0 && gopageval <= pageTotal) {
                page(container, countTotal, pageTotal, pageSize, gopageval, callbackFunc, callbackFlag);
                return false;
            } else {
                container.getElementsByTagName("input")[0].focus();
                return false;
            }
        }
        var oInputTxt = container.getElementsByTagName("input");
        oInputTxt[0].onkeydown = function () {
            if (event.keyCode == 13) {
                var gopageval = container.getElementsByTagName("input")[0].value;
                gopageval = parseInt(gopageval);
                //数据==保证在java的integer和数据库支持最大分页数据，并且为数字
                if (!isNaN(gopageval) && gopageval > 0 && gopageval <= pageTotal) {
                    page(container, countTotal, pageTotal, pageSize, gopageval, callbackFunc, callbackFlag);
                    return false;
                } else {
                    return false;
                }
            }
        }
    }()
}

/**
 * 监听enter键按下
 */
function goNumber(e) {
    var keynum;
    var keychar;
    var numcheck;

    if (window.event) // IE
    {
        keynum = e.keyCode
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which
    }

    keychar = String.fromCharCode(keynum)
    numcheck = /\d/
    return keynum == 8 || numcheck.test(keychar)
}

/**
 * 隐藏分页插件
 */
function hidePage(container) {
    container.innerHTML = "";
}

/**
 * 判断数据是否为空
 */
function isNoData(data) {
    return data === null || data === "" || typeof(data) === "undefined" || isNaN(data);
}