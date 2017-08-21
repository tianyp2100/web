/**
 * Map键值对工具 Map utils.
 * 注：其实对象也是键值对形式存在.
 * @author tony_tian
 * @time 2017-07-30
 */

/**
 * 定义map 例： var imap = new Map();
 */
function Map() {
    this.KVpairs = {};
}

/**
 * 将key-value键值对放入map中
 * @param key 键
 * @param value 值
 * 例： imap.put("kaka", "lala");
 */
Map.prototype.put = function (key, value) {
    if (!isNoData(key)) this.KVpairs[key] = value;
};

/**
 * 通过key从map中取出对应的value
 * @param key 键
 * 例： var l = imap.get("kaka");
 */
Map.prototype.get = function (key) {
    return this.KVpairs[key];
};

/**
 * 判断map中是否包含指定的key
 * @param key 键
 * @returns boolean true 则包含
 */
Map.prototype.containsKey = function (key) {
    for (var p in this.KVpairs) {
        if (this.p == key) return true;
    }
    return false;
}

/**
 * 判断map中是否包含指定的value
 * @param value 值
 * @returns boolean true 则包含
 */
Map.prototype.containsValue = function (value) {
    for (var p in this.KVpairs) {
        if (this.KVpairs[p] === value) return true;
    }
    return false;
};
/**
 * 删除map中指定的key
 * @param key 键
 */
Map.prototype.remove = function (key) {
    delete this.KVpairs[key];
};

/**
 * 清空map整个map集合
 */
Map.prototype.clear = function () {
    delete this.KVpairs;
    this.KVpairs = {};
};
/**
 * 判断map是否为空
 * @returns true 则为空
 */
Map.prototype.isEmpty = function () {
    if (isNoData(this)) return false;
    return this.size() == 0;
};

/**
 * 判断map是否不为空
 * @returns true 则为空
 */
Map.prototype.isNotEmpty = function () {
    if (isNoData(this)) return false;
    return !this.isEmpty();
};

/**
 * 获取map的大小
 * @returns map的大小，number
 */
Map.prototype.size = function () {
    if (isNoData(this)) return 0;
    return this.keys().length;
}

/**
 * 返回map中所有的key值
 * @return 数组格式返回所有的key
 */
Map.prototype.keys = function () {
    var keys = new Array();
    if (isNoData(this)) return keys;
    for (var p in this.KVpairs) {
        keys.push(p);
    }
    return keys;
}

/**
 * 返回map中所有的value值
 * @return 数组格式返回所有的value
 */
Map.prototype.values = function () {
    var values = new Array();
    if (isNoData(this)) return values;
    var keys = this.keys();
    for (var i = 0; i < keys.length; i++) {
        values.push(this.KVpairs[keys[i]]);
    }
    return values;
}