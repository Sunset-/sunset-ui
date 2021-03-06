const widgets = {
	'Input': ['Input', 'Password'],
	'Searchinput': ['Searchinput'],
	'Inputgroup': 'Inputgroup',
	'Radio': 'Radio',
	'Checkbox': 'Checkbox',
	'Select': 'Select',
	'Switch': 'Switch',
	'Date': 'Date',
	'Number': 'Number',
	'Cascader': 'Cascader',
	'Textarea': 'Textarea',
	'File': ['File', 'Image'],
	'Editor': 'Editor',
	'Tableselect': 'Tableselect',
	'Treeselect': 'Treeselect',
	'Icon': 'Icon',
	'Button': 'Button',
	'Coder': 'Coder',
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