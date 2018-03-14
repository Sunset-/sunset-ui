const rules = {};

function addRule(name, config) {
    rules[name] = config;
}

addRule("required", {
    message: "不能为空",
    check: function(val) {
        if (val === void 0 || val === null) {
            return false;
        }
        if (Sunset.isString(val) && val.trim() == "") {
            return false;
        }
        return true;
    }
});

//邮箱
addRule("email", {
    message: "邮箱格式不合法",
    check: function(val) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
        );
    }
});

//手机号
addRule("phone", {
    message: "手机号码格式不合法",
    check: function(val) {
        return (
            val.trim() == "" ||
            /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
                val
            )
        );
    }
});

//密码
addRule("password", {
    message: "密码为6-24位字母数字组合",
    check: function(val) {
        return /^\w{6,24}$/.test(val);
    }
});

//整数
addRule("integer", {
    message: "请输入整数",
    check: function(val) {
        return /^-?\d+$/.test(val);
    }
});

//最大长度
addRule("maxlength", {
    message: function(a, b, c) {
        return `最大长度${b.rule}`;
    },
    check: function(val, rule, b) {
        if (val && (val + "").length > rule) {
            return false;
        }
        return true;
    }
});

//正则表达式
addRule("regexp", {
    message: "请输入整数",
    check: function(val, config) {
        return config.rule.test(val);
    }
});

//正则表达式
addRule("func", {
    message: "请输入整数",
    check: function(val, config) {
        return config.rule(val);
    }
});

module.exports = {
    rules: rules,
    addRule: addRule
};
