// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var access_token= '';
var moment = require('moment');

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


/*
GET https://angel.co/api/oauth/authorize?
    client_id=...&
    response_type=code
*/

Parse.Cloud.define("userAngelAuth", function(request, response) {
    //grab access token: Access tokens never expire, unless they're revoked by the user.
    Parse.Cloud.httpRequest({
        url: 'https://angel.co/api/oauth/authorize',
        params: {
          client_id : 'df2da713aa63eb3c828a32528bfd968e',
          response_type : 'code'
        },
        success: function(httpResponse) {
            response.success(httpResponse.url);
                //httpResponse.text);
        },
        error: function(httpResponse) {
            response.error('Request failed with response code ' + httpResponse.status);
        }
    });
    //response.success(startups);

});

/*
POST https://angel.co/api/oauth/token?
     client_id=...&
     client_secret=...&
     code=...&
     grant_type=authorization_code
*/

Parse.Cloud.define("requestAngelAuth", function(request, response) {
    //grab access token: Access tokens never expire, unless they're revoked by the user.

    Parse.Cloud.httpRequest({
        url: ('https://angel.co/api/oauth/token?' + (lastStartup + request.params.currentStartup)),
        params: {
          client_id : 'df2da713aa63eb3c828a32528bfd968e',
          client_secret : '415d1bbd69a91f604c5eeea1d76754cb',
          code : '',
          grant_type : 'authorization_code'
        },
        success: function(httpResponse) {
            response.success(httpResponse.text);
        },
        error: function(httpResponse) {
            response.error('Request failed with response code ' + httpResponse.status);
        }
    });
    //response.success(startups);

});

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

//community, company name, angellist URL, high concept, description, signal/quality, markets, location ... everything else

Parse.Cloud.define("saveFormattedStartup", function(request, response) {
    //save this request.params.currentStartup
    var tags = require('cloud/getTags.js');

    var currentStartup = request.params.currentStartup;
    var startupJSON = currentStartup;
    //moment(startupJSON.created_at, "YYYY-MM-DD")
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
                    name: startupJSON.name,
                    angellist_url: startupJSON.angellist_url,
                    high_concept: startupJSON.high_concept,
                    product_desc: startupJSON.product_desc,
                    quality: startupJSON.quality,
                    markets: tags.getTags(startupJSON.markets),
                    locations: tags.getTags(startupJSON.locations),
                    //still needs work
                    founder_bio: '',
                    company_type: tags.getTags(startupJSON.company_type),
                    company_url: startupJSON.company_url,
                    created_at: moment(startupJSON.created_at, "YYYY-MM-DD"),
                    crunchbase_url: startupJSON.crunchbase_url,
                    follower_count: startupJSON.follower_count,
                    //hidden: startupJSON.hidden,
                    
                    idNum: startupJSON.id,
                    //still needs work
                    
                    logo_url: startupJSON.logo_url,
                    //**Still needs work
                    
                    
                    
                    
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
            response.error(startupJSON);
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
    //grab most previous thursday to thursday
    var thursday = require('cloud/startingThursday.js');
    //**the 0 can be replaced by the number of weeks back you want to go
    var startingThursday = thursday.getStartingThursday(0);

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


//background job to grab data from AngelList Every Day and then format it
Parse.Cloud.job("pullRawData", function(request, status) {
    // Set up to modify user data
    //Parse.Cloud.useMasterKey();
    //var counter = 0;
    // Query for all users
    var n = 1000;
//    var count = 0;
    Parse.Cloud.run('grabLastStartup', {}, {
        success: function(result) {
            var count = 1;
            //status.message("last startup: " + result);
            for(var i = 1; i < n; i++) {
                var currentStartup = parseInt((parseInt(result)+i));
                Parse.Cloud.run('grabAndSaveStartup', { currentStartup: currentStartup }, {
                  success: function(result) {
                    count++;
                    console.log(result);
                    //status.message(result);
                    if(count == n) {
                        status.success('loaded ' + count + ' startups');
                    }
                  },
                  error: function(error) {
                    count++;
                    console.log(error);
                    if(count == n) {
                        status.success('loaded ' + count + ' startups');
                    }
                  }
                });
            }
            //while(count < 5) {
            //    status.message("count: " + count);
            //}
            //status.success("Hell yeah");
        },
        error: function(error) {
            console.log(error);
            status.error("done fucked up");
        }
    });

});

Parse.Cloud.job("formatRawData", function(request, status) {
    Parse.Cloud.run('grabLastFormattedStartup', {}, {
        success: function(result) {
            var query = new Parse.Query("RawStartups");
            query.greaterThan("idNum", result);
            query.each(function(startup) {
                Parse.Cloud.run('saveFormattedStartup', { currentStartup: JSON.parse(startup.get('fullData')) }, {
                    success: function(result) {
                        console.log(result);
                        status.message(result);
                    },
                    error: function(error) {
                        console.log(error);
                        //status.error(error);
                    }
                });
            }).then(function() {
            // Set the job's success status
                status.success("Migration completed successfully.");
            }, function(error) {
            // Set the job's error status
                status.error("Uh oh, something went wrong.");
            });
          },
          error: function(error) {
            console.log(error);
          }
    });    
});

Parse.Cloud.define("addFundraisingToStartup", function(request, response) {
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

Parse.Cloud.define("addFounderToStartup", function(request, response) {
    Parse.Cloud.httpRequest({
        url: ('https://api.angel.co/1/startups/' + parseInt(request.params.currentStartup) + '/roles'),
        params: {
            client_id : 'df2da713aa63eb3c828a32528bfd968e',
            client_secret : '415d1bbd69a91f604c5eeea1d76754cb',
            code : 'd3b5d5ec5665680372b9795723fafbfc',
            grant_type : 'authorization_code'
        },
        success: function(httpResponse) {
            //startup.set("founder_bio", httpResponse.text);
            //startup.save();
            //response.success('hello world');
            var obj = $.parseJSON(httpResponse.text);
            response.success(obj);
            //response.success(_.filter(obj.startup_roles, function (employee) { return employee.role == "founder" }));
            //response.success(httpResponse.text.startup_roles[0].tagged.bio);
        },
        error: function(httpResponse) {
            response.error($.parseJSON(httpResponse.text));
        }
    });
});


Parse.Cloud.job("addFoundersToStartup", function(request, status) {
    // Query for all users
    var query = new Parse.Query("FormattedStartup");
    query.equalTo("founder_bios", []);
    query.each(function(startup) {
        //startup.numId
        // Update to plan value passed in
        Parse.Cloud.run('addFounderToStartup', { currentStartup: startup.numId }, {
            success: function(result) {
                console.log(result);
                //status.message(result);
                status.success();
            },
            error: function(error) {
                console.log(error);
                status.error(error);
            }
        });
    }).then(function() {
    // Set the job's success status
        //status.success("Migration completed successfully.");
    }, function(error) {
    // Set the job's error status
        status.error("Uh oh, something went wrong.");
    });

    //response.success(startups);

});

/*
Parse.Cloud.job("userMigration", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all users
  var query = new Parse.Query(Parse.User);
  query.each(function(user) {
      // Update to plan value passed in
      user.set("plan", request.params.plan);
      if (counter % 100 === 0) {
        // Set the  job's progress status
        status.message(counter + " users processed.");
      }
      counter += 1;
      return user.save();
  }).then(function() {
    // Set the job's success status
    status.success("Migration completed successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});
*/