var fs = require('fs');

module.exports = function (path, replaceObj) {
    var data = fs.readFileSync(path, "utf-8");
    Object.keys(replaceObj).forEach(key => {
        data = data.replace(new RegExp(`${key}`, 'g'), replaceObj[key]);
    });
    fs.writeFile(path, data, "utf-8");
}