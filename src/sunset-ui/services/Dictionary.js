var Cache = {};
var Holder = null;

module.exports = {
    install: function (dictionaryFether) {
        Holder = Sunset.wait(function () {
            return Promise.resolve().then(() => {
                return dictionaryFether;
            }).then(dictionaryItems => {
                var ENUMS = {};
                var ENUM_MAP = {};
                if (dictionaryItems && dictionaryItems.length) {
                    //按type分类
                    dictionaryItems.forEach(item => {
                        var enums = ENUMS[item.type] || (ENUMS[item.type] = []),
                            enumMap = ENUM_MAP[item.type] || (ENUM_MAP[item.type] = {});
                        enums.push(item);
                        enumMap[item.key] = item.value;
                    });
                }
                return Cache.cache = {
                    ENUMS: ENUMS,
                    ENUM_MAP: ENUM_MAP
                }
            })
        }, Cache);
    },
    getEnums(type) {
        return Holder().then(cache => {
            return cache.ENUMS[type] || [];
        });
    },
    transcode(type, key) {
        return Cache.ENUM_MAP && Cache.ENUM_MAP[type] && ENUM_MAP[type][key] || key;
    }
}