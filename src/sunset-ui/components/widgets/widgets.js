const widgets = {
	'Input': ['Input', 'Password', 'Number'],
	'Searchinput': ['Searchinput'],
	'Inputgroup': 'Inputgroup',
	'Radio': 'Radio',
	'Checkbox': 'Checkbox',
	'Select': 'Select',
	'Switch': 'Switch',
	'Date': 'Date',
	'Time': 'Time',
	// 'Number': 'Number',
	'Cascader': 'Cascader',
	'Textarea': 'Textarea',
	'File': ['File', 'Image'],
	'Editor': 'Editor',
	'Tableselect': 'Tableselect',
	'Treeselect': 'Treeselect',
	'Table': 'Table',
	'Icon': 'Icon',
	'Button': 'Button',
	'Coder': 'Coder',
	'Widgetgroup': 'Widgetgroup'
}


const apis = {};

for (var key in widgets) {
	if (widgets.hasOwnProperty(key)) {
		var widget = require(`./${key}`);
		var alias = widgets[key];
		if (typeof alias == "string") {
			apis[`Widget${alias}`] = widget;
		} else {
			alias.forEach(a => {
				apis[`Widget${a}`] = widget;
			});
		}
	}
}

export default apis;