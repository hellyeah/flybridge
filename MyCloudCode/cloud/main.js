
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

//Call angellist api to grab one single startup -- will probably have to give index to grab from
/*
var getStartupAtIndex = function (index) {
    console.log('blah');
    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + index),
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            console.log(httpResponse.text);
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });    
}
*/


Parse.Cloud.define("grabStartup", function(request, response) {
    //grab this as the id of the last startup in our database
    //https://angel.co/startups/301662
    var lastStartup = 302651;

    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + (lastStartup + request.params.currentStartup)),
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            response.success(httpResponse.text);
        },
        error: function(httpResponse) {
            response.error('Request failed with response code ' + httpResponse.status);
        }
    });
    //response.success(startups);

});

Parse.Cloud.define("grabAndSaveStartup", function(request, response) {
    //grab this as the id of the last startup in our database -- set this on client-side to
    var lastStartup = 302651;
    //> 1 week ago
    //var lastStartup = 298662;
    var currentStartup = lastStartup + request.params.currentStartup;

    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + currentStartup),
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            var TestObject = Parse.Object.extend("Startup");
            var testObject = new TestObject();
            testObject.save({fullData: httpResponse.text, idNum: currentStartup}, {
              success: function(object) {
                response.success("yay! it worked");
              },
              error: function(error) {
                response.error("didnt work");
              }
            });
            //response.success(httpResponse.text);
        },
        error: function(httpResponse) {
            response.error('Request failed with response code ' + httpResponse.status);
        }
    });
    //response.success(startups);

});

Parse.Cloud.define("grabSpecificStartup", function(request, response) {
    //grab this as the id of the last startup in our database
    //https://angel.co/startups/301662
    //var lastStartup = 302651;

    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + request.params.currentStartup),
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            response.success(httpResponse.text);
        },
        error: function(httpResponse) {
            response.error('Request failed with response code ' + httpResponse.status);
        }
    });
    //response.success(startups);

});



//Just an example of passing in params as request.params.[parameter]
Parse.Cloud.define("averageStars", function(request, response) {
  var query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success(sum / results.length);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

//I can use this to filter out bad data that we don't want
Parse.Cloud.beforeSave("Review", function(request, response) {
  if (request.object.get("stars") < 1) {
    response.error("you cannot give less than one star");
  } else if (request.object.get("stars") > 5) {
    response.error("you cannot give more than five stars");
  } else {
    response.success();
  }
});

//can use this to format data on save
Parse.Cloud.beforeSave("Critic", function(request, response) {
  var comment = request.object.get("comment");
  if (comment.length > 140) {
    // Truncate and add a ...
    request.object.set("comment", comment.substring(0, 137) + "...");
  }
  response.success();  
});

