var coolNames = ['Ralph', 'Skippy', 'Chip', 'Ned', 'Scooter'];
exports.isACoolName = function(name) {
	//return 'blah';
  //return coolNames.indexOf(name) !== -1;
  //success: 
	  Parse.Cloud.httpRequest({
	    url: ('https://api.angel.co/1/startups/6702'),
	    //params: {
	    //  q : 'Sean Plott'
	    //},
	    success: function(httpResponse) {
	        //console.log(httpResponse.text);
	        return 'blah';
	    },
	    error: function(httpResponse) {
	        console.error('Request failed with response code ' + httpResponse.status);
	    }
	  });
}