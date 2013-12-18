//need to make this robust so that it works correctly for n = 0 and it being friday or saturday
//n=0 is the most recent thursday to now
exports.getStartingThursday = function(n) {
    var moment = require('moment');
    //the thursday before this week began
    var thursdayBeforeThisWeek = moment().day(-3);

    if (moment().day() < 5) {
        //account for how many weeks back we want to go
        thursdayBeforeThisWeek.subtract('days', 7*n);
        return thursdayBeforeThisWeek.endOf('day');
    }
    else {
        //make it the thursday this week
        thursdayBeforeThisWeek.add('days', 7);
        //account for how many weeks back we want to go
        thursdayBeforeThisWeek.subtract('days', 7*n);
        return thursdayBeforeThisWeek.endOf('day');
    }
}