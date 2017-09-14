此文件夹下为jQuery使用的工具类笔记
===================================



|文件|说明
|----|----
|ajax.utils.js|Ajax请求工具
|biz.utils.js|业务工具
|cache.utils.js|缓存工具
|collection.utils.js|集合工具
|cookie.utils.js|Cookie工具
|date.utils.js|日期工具
|map.utils.js|键值对map工具
|number.utils.js|数字工具
|object.utils.js|对象工具
|regular.utils.js|正则工具
|string.utils.js|字符串工具
|web.utils.js|网络工具

### 在js的操作中简化的判断作:
|数据：data| 函数判断：if(data)
|----|----
|undefined|false
|null|false
|0|false
|1|true
|5|true
|[]|true
|"abc"|true
|123e-5 ,即"0.00123"|true
|123e5 ,即"12300000"|true
|function，即函数|true
|true|true
|false|false

### JavaScript 数据类型：字符串、数字、布尔、数组、对象、Null、Undefined

#### var a;                // a 为 undefined类型，定义未使用或初始化赋值
#### var b = null;         // b 为 undefined类型

###### GMT create: 2017-07-27 19:37:05
