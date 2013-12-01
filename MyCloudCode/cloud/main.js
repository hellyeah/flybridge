
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

//Call angellist api to grab one single startup -- will probably have to give index to grab from
Parse.Cloud.define("grabStartup", function(request, response) {
    //response.success("Grabbed Startup!");

    Parse.Cloud.httpRequest({
        url: 'https://api.angel.co/1/startups/6702',
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            response.success(httpResponse.text);
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });

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
Parse.Cloud.beforeSave("Startup", function(request, response) {
  var comment = request.object.get("comment");
  if (comment.length > 140) {
    // Truncate and add a ...
    request.object.set("comment", comment.substring(0, 137) + "...");
  }
  response.success();  
});

