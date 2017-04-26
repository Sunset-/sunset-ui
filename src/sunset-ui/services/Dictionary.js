var ENUMS = {};
var ENUM_MAP = {};
var ALIAS_MAP = {};

module.exports = {
    install: function (dictionaryItems) {
        ENUMS = {};
        ENUM_MAP = {};
        ALIAS_MAP = {};
        if (dictionaryItems && dictionaryItems.length) {
            //按type分类
            dictionaryItems.forEach(item => {
                var enums = ENUMS[item.type] || (ENUMS[item.type] = []),
                    enumMap = ENUM_MAP[item.type] || (ENUM_MAP[item.type] = {}),
                    aliasMap = ALIAS_MAP[item.type] || (ALIAS_MAP[item.type] = {});
                enums.push(item);
                enumMap[item.key] = item.value;
                if (item.alias !== void 0) {
                    aliasMap[item.alias] = item.key;
                }
            });
        }
    },
    getEnums(type) {
        return ENUMS[type] || [];
    },
    transcode(type, key) {
        return ENUM_MAP[type] && ENUM_MAP[type][key] || key;
    },
    alias(type, alias) {
        return ALIAS_MAP[type] && ALIAS_MAP[type][alias] || alias;
    },
    getEnumsMap() {
        return ENUM_MAP;
    },
    getAllEnums() {
        return ENUMS;
    }
}