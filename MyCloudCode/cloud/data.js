exports.getStartupAtIndex = function (data) {
    //console.log('blah');
    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + data),
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            return httpResponse.text;
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });    
}