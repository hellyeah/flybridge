exports.getTags = function(array) {
    var tags = [];
    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i]) {
                if(index == "name") {
                    tags.push(" " + array[i][index.toString()]);
                }
        }
    }
    if (tags == []) {
        return ["null"];
    }
    else {
        return tags;        
    }
}