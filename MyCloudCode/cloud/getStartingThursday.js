exports.getStartingThursday = function(n) {
    var moment = require('moment');
    var d = new Date();
    if (d.getDay() < 4) {
        return moment().startOf('week').subtract('days', 10).subtract('weeks', n);
    } else {
        return moment().startOf('week').subtract('days', 3).subtract('weeks', n);
    }
}