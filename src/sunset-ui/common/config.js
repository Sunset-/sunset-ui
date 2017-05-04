const GLOBAL_CONFIG = {
    TABLE_TOOLBAR_SIZE: 'small',
    FORM_FIELD_LABEL_WIDTH: 80
};

module.exports = {
    globalConfig: GLOBAL_CONFIG,
    config: function (config) {
        Object.assign(GLOBAL_CONFIG, config || {});
    },
    getConfig(key, defaultValue) {
        return (GLOBAL_CONFIG[key] !== void 0) ? GLOBAL_CONFIG[key] : defaultValue;
    }
}