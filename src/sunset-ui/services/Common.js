module.exports = {
    tableColTranscode(value, col, record) {
        if (col.enum) {
            return Sunset.Service.Dictionary.transcode(col.enum, value);
        } else if (col.format) {
            if (Sunset.isFunction(col.format)) {
                return col.format(value, record);
            } else {
                switch (col.format) {
                    case 'DATETIME':
                        return Sunset.Dates.format(new Date(value));
                        break;
                    case 'DATE':
                        return Sunset.Dates.format(new Date(value), 'yyyy-MM-dd');
                        break;
                    case 'MONEY':
                        return `<div style="text-align: right;">${Sunset.Numbers.fixed(value,2)}<div>`;
                        break;
                }
            }
        }
        return value;
    }
}