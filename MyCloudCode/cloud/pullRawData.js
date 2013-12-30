//background job to grab data from AngelList Every Day and then format it
Parse.Cloud.job("pullRawData", function(request, status) {
    // Set up to modify user data
    //Parse.Cloud.useMasterKey();
    //var counter = 0;
    // Query for all users
    var n = 10;
    var i = 0;
    Parse.Cloud.run('grabLastStartup', {}, {
        success: function(result) {
            for(var i = 0; i < n; i++) {
                var currentStartup = parseInt((parseInt(result)+i));
                Parse.Cloud.httpRequest({
                    url: ('https://api.angel.co/1/startups/' + currentStartup),
                    success: function(httpResponse) {
                        var TestObject = Parse.Object.extend("RawStartups");
                        var testObject = new TestObject();
                        testObject.save({ fullData: httpResponse.text, idNum: currentStartup }, {
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
                }).then(function() {
                    status.success("startup added successfully");
                }, function(error) {
                    status.error("something went wrong");
                });
            }
        },
        error: function(error) {
            console.log(error);
        }
    }).then(function() {
        status.success("startup added successfully");
    }, function(error) {
        status.error("something went wrong");
    });


/*
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
*/
});