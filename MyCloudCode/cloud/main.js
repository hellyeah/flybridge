
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
    //var lastStartup = 302651;

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

Parse.Cloud.define("grabLastStartup", function(request, response) {
    //grab the last Raw Startup in our Parse Database
    var query = new Parse.Query("RawStartups");
    query.descending("idNum");
    query.limit(1);
    query.find({
        success: function(result) {
          response.success(result[0].attributes.idNum);
        },
        error: function() {
          response.error("last startup lookup failed");
        }
    });

});

Parse.Cloud.define("grabLastFormattedStartup", function(request, response) {
    //grab the last Raw Startup in our Parse Database
    var query = new Parse.Query("FormattedStartup");
    query.descending("idNum");
    query.limit(1);
    query.find({
        success: function(result) {
          response.success(result[0].attributes.idNum);
        },
        error: function() {
          response.error("last startup lookup failed");
        }
    });

});

Parse.Cloud.define("grabAndSaveStartup", function(request, response) {
    //grab this as the id of the last startup in our database -- set this on client-side to
    //var lastStartup = 302651;
    //> 1 week ago
    //var lastStartup = 298662;
    //var currentStartup = lastStartup + request.params.currentStartup;

    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + request.params.currentStartup),
        //params: {
        //  q : 'Sean Plott'
        //},
        success: function(httpResponse) {
            var TestObject = Parse.Object.extend("RawStartups");
            var testObject = new TestObject();
            testObject.save({ fullData: httpResponse.text, idNum: parseInt(request.params.currentStartup) }, {
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

Parse.Cloud.define("saveFormattedStartup", function(request, response) {
    //save this request.params.currentStartup
    var tags = require('cloud/getTags.js');

    var currentStartup = request.params.currentStartup;
    var startupJSON = currentStartup;
    //**should getTags return a string of comma separated values or an array?

    //response.success(startupJSON.id);
    if (startupJSON.hidden) {
        response.error('startup hidden');
    }
    else {
        var TestObject = Parse.Object.extend("FormattedStartup");
        var testObject = new TestObject();
        testObject.save({
                    community_profile: startupJSON.community_profile,
                    angellist_url: startupJSON.angellist_url,
                    //still needs work
                    company_type: tags.getTags(startupJSON.company_type),
                    company_url: startupJSON.company_url,
                    created_at: startupJSON.created_at,
                    crunchbase_url: startupJSON.crunchbase_url,
                    follower_count: startupJSON.follower_count,
                    //hidden: startupJSON.hidden,
                    high_concept: startupJSON.high_concept,
                    idNum: startupJSON.id,
                    //still needs work
                    locations: tags.getTags(startupJSON.locations),
                    logo_url: startupJSON.logo_url,
                    //**Still needs work
                    markets: tags.getTags(startupJSON.markets),
                    name: startupJSON.name,
                    product_desc: startupJSON.product_desc,
                    quality: startupJSON.quality,
                    //still needs work
                    screenshots: tags.getTags(startupJSON.screenshots),
                    status: startupJSON.status,
                    thumb_url: startupJSON.thumb_url,
                    twitter_url: startupJSON.twitter_url,
                    updated_at: startupJSON.updated_at,
                    video_url: startupJSON.video_url
                }, {
          success: function(object) {
            response.success("yay! it worked");
          },
          error: function(error) {
            response.error("didnt work");
          }
        });
    }
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

Parse.Cloud.define("grabSpecificStartupFromParse", function(request, response) {
    //grab startup from our database with id: request.params.startupId
    var query = new Parse.Query("FormattedStartup");
        query.equalTo("idNum", parseInt(request.params.startupId));
        //response.success(parseInt(request.params.startupId));
        query.first({
        success: function(object) {
          response.success(object);
        },
        error: function() {
          response.error("startup lookup failed");
        }
    });
});

Parse.Cloud.define("grabAllFormattedStartups", function(request, response) {
    //grabs all formatted startups from our database
    var query = new Parse.Query("FormattedStartup");
        //query.equalTo("idNum", parseInt(request.params.startupId));
        //response.success(parseInt(request.params.startupId));
    query.descending("idNum");
    query.find({
        success: function(results) {
          response.success(results);
        },
        error: function() {
          response.error("startup lookup failed");
        }
    });
});

Parse.Cloud.define("grabNumberOfFormattedStartups", function(request, response) {
    //grab request.params.numberOfStartups from our database starting with the most recent
    var query = new Parse.Query("FormattedStartup");
    query.descending("idNum");
    query.limit(parseInt(request.params.numberOfStartups));
    //response.success(parseInt(request.params.startupId));
    query.find({
        success: function(results) {
          response.success(results);
        },
        error: function() {
          response.error("startup lookup failed");
        }
    });
});

//doesnt work yet for under 1000 -- might just be that response.success isn't waiting for loop
Parse.Cloud.define("grabPaginatedNumberOfFormattedStartups", function(request, response) {
    //grab request.params.numberOfStartups from our database starting with the most recent
    var paginatedResults = [];
    for (var i = 0; i < parseInt(request.params.numberOfStartups); i+=1000) {
        var query = new Parse.Query("FormattedStartup");
        query.descending("idNum");
        query.limit(parseInt(request.params.numberOfStartups));
        query.skip(i);
        //response.success(parseInt(request.params.startupId));
        query.find({
            success: function(results) {
              paginatedResults.concat(results);
            },
            error: function() {
              response.error("startup lookup failed");
            }
        });        
    }
    response.success(paginatedResults);
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

