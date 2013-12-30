var coolNames = ['Ralph', 'Skippy', 'Chip', 'Ned', 'Scooter'];
exports.isACoolName = function(array) {
	var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i]) {
        	if(index == "name") {
	            var value = array[i][index.toString()] + "";
	            line += '"' + value.replace(/"/g, '""') + '",';
        	}
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
	return str;
}