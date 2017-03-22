var ENUMS = {};
var ENUM_MAP = {};

module.exports = {
    install: function (dictionaryItems) {
        ENUMS = {};
        ENUM_MAP = {};
        if (dictionaryItems && dictionaryItems.length) {
            //按type分类
            dictionaryItems.forEach(item => {
                var enums = ENUMS[item.type] || (ENUMS[item.type] = []),
                    enumMap = ENUM_MAP[item.type] || (ENUM_MAP[item.type] = {});
                enums.push(item);
                enumMap[item.key] = item.value;
            });
        }
    },
    getEnums(type) {
        return ENUMS[type] || [];
    },
    transcode(type, key) {
        return ENUM_MAP[type] && ENUM_MAP[type][key] || key;
    },
    getEnumsMap() {
        return ENUM_MAP;
    },
    getAllEnums() {
        return ENUMS;
    }
}