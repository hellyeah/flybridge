function AngelList($scope) {
    //Initalize Parse
    Parse.initialize("yMWD8vfQp9chO15d5dIYXUScK3zQdlHbmGNe8cD0", "frdAqsvZSZrUyzoTUN0pQXbiojdaPdNFwnSIn36q");

    //Initialize AngelList API

    //Initialize Data Array to test converter
    $scope.startupsArray = [];
    $scope.formattedStartupsArray = [];
    //default
    $scope.lastStartupInParse = 302500;
    $scope.lastFormattedStartup = 302500;
    $scope.weeksBack = 1;

    $scope.getLastThursday = function () {
        var currentDay = new Date();
        console.log(currentDay.getDay());
        //thursday is 4
        var daysFromStartingThursday = (4 - currentDay.getDay()) - (7*parseInt($scope.weeksBack()));
        //subtract daysFromStartingThursday from the current date to get the date we should begin querying from
        //will need to pass $scope.getLastThursday into download function
    }

    $scope.numberOfStartups = function () {
        if ($scope.userNumberOfStartups == undefined) {
            return 3;
        }
        else {
            return $scope.userNumberOfStartups;
        }
    }

    $scope.numberOfAL = function () {
        if ($scope.userNumberOfAL == undefined) {
            return 3;
        }
        else {
            return $scope.userNumberOfAL;
        }
    }

<<<<<<< HEAD
    $scope.weeksBack = function () {
        if ($scope.userWeeksBack == undefined) {
            return 1;
        }
        else {
            return $scope.userWeeksBack;
        }
    }

=======
    $scope.numberOfWeeksBack = function () {
        if ($scope.userNumberOfWeeksBack == undefined) {
            return 1;
        }
        else {
            console.log('returned user number of weeks back');
            return $scope.userNumberOfWeeksBack;
        }
    }

    $scope.getStartingThursday = function () {
        Parse.Cloud.run('printStartingThursday', {blah: $scope.numberOfWeeksBack()}, {
          success: function(result) {
            console.log('starting thursday: '); 
            console.log(result);
          },
          error: function(error) {
            console.log(error);
          }
        });  
        Parse.Cloud.run('grabThousandFormattedStartupsThurs', {iteration: 0, weeksBack: 1}, {
          success: function(result) {
            console.log('starting thursday from formatted: '); 
            console.log(result);
          },
          error: function(error) {
            console.log(error);
          }
        });  
    }

    $scope.getStartingThursday();

>>>>>>> 2d8c18c1129704ad5e6275b82583a6db1160b9c4
    $scope.setLastStartups = function () {
        Parse.Cloud.run('grabLastStartup', {}, {
          success: function(result) {
            console.log('last startup: ' + result);
            $scope.lastStartupInParse = result;
          },
          error: function(error) {
            console.log(error);
          }
        });  

        Parse.Cloud.run('grabLastFormattedStartup', {}, {
          success: function(result) {
            console.log('last formatted startup: ' + result);
            $scope.lastFormattedStartup = result;
          },
          error: function(error) {
            console.log(error);
          }
        });    
    }

    $scope.setLastStartups();

<<<<<<< HEAD

    //Pulls data from AngelList -- n is how many items we want to pull -- 302500
    $scope.pullSomeAngelListData = function (n) {
        var i = 0;
        for(var i = 0; i < n; i++) {
            console.log(i + parseInt($scope.lastStartupInParse));
            Parse.Cloud.run('grabAndSaveStartup', { currentStartup: (i + parseInt($scope.lastStartupInParse)) }, {
              success: function(result) {
                console.log(result);
              },
              error: function(error) {
                console.log(error);
              }
            });         
        }
    }

    $scope.test = function () {
        Parse.Cloud.run('addFounderToStartup', {currentStartup: 6702}, {
          success: function(result) {
            //console.log(result);
            //console.log(result[0].attributes);
            console.log(result);
            //console.log(obj[0]);
          },
          error: function(error) {
            console.log(error);
          }
        });
    }

    $scope.pullAngelListData = function () {
        console.log('pressed grab data');
        $scope.pullSomeAngelListData($scope.numberOfAL())
    }

=======
>>>>>>> 2d8c18c1129704ad5e6275b82583a6db1160b9c4
    $scope.grabInitialFormattedStartupsFromParse = function () {
        console.log('grabbing formatted startups');
        Parse.Cloud.run('grabThousandFormattedStartups', {iteration: 0, weeksBack: $scope.numberOfWeeksBack()}, {
          success: function(result) {
            //console.log(result);
            //console.log(result[0].attributes);
            console.log(_.map(result, function(rawParseStartup) { return rawParseStartup.attributes; }));
            //$scope.lastStartupInParse = result[0].attributes.idNum;
            $scope.formattedStartupsArray = _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
            return _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
          },
          error: function(error) {
            console.log(error);
          }
        });
    }

    $scope.grabAllFormattedStartupsFromParse = function () {
        console.log('grabbing formatted startups for week');
        //resetting array from initial
        $scope.formattedStartupsArray = [];
        Parse.Cloud.run('grabThousandFormattedStartups', {iteration: 0, weeksBack: $scope.numberOfWeeksBack()}, {
          success: function(result) {
            //console.log(result);
            //console.log(result[0].attributes);
            console.log(_.map(result, function(rawParseStartup) { return rawParseStartup.attributes; }));
            //$scope.lastStartupInParse = result[0].attributes.idNum;
            $scope.formattedStartupsArray = _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
            return _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
          },
          error: function(error) {
            console.log(error);
          }
        });
    }

    $scope.grabAllFormattedStartups = function () {
        console.log('grabbing formatted startups');
        Parse.Cloud.run('grabAllFormattedStartups', {iteration: 0}, {
          success: function(result) {
            //console.log(result);
            //console.log(result[0].attributes);
            console.log(_.map(result, function(rawParseStartup) { return rawParseStartup.attributes; }));
            $scope.formattedStartupsArray = _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
          },
          error: function(error) {
            console.log(error);
          }
        });  
    }

    $scope.grabSomeFormattedStartupsFromParse = function (limit) {
        console.log('grabbing formatted startups');
        //will have to get paginated results working -- maybe move logic here and pass in skip on top of limit
        Parse.Cloud.run('grabNumberOfFormattedStartups', {numberOfStartups: limit}, {
          success: function(result) {
            //console.log(_.map(result, function(rawParseStartup) { return rawParseStartup.attributes; }));
            return _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
            //$scope.formattedStartupsArray = [];
            //$scope.formattedStartupsArray = _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
          },
          error: function(error) {
            console.log(error);
          }
        });  
    }

    $scope.grabSomeFormattedStartups = function () {
        console.log('grabbing formatted startups');
        //will have to get paginated results working -- maybe move logic here and pass in skip on top of limit
        Parse.Cloud.run('grabNumberOfFormattedStartups', {numberOfStartups: $scope.numberOfStartups()}, {
          success: function(result) {
            console.log(_.map(result, function(rawParseStartup) { return rawParseStartup.attributes; }));

            $scope.formattedStartupsArray = [];
            $scope.formattedStartupsArray = _.map(result, function(rawParseStartup) { return rawParseStartup.attributes; });
          },
          error: function(error) {
            console.log(error);
          }
        });  
    }

    $scope.grabInitialFormattedStartupsFromParse();

    $scope.saveFormattedStartup = function (startup) {
        Parse.Cloud.run('saveFormattedStartup', { currentStartup: startup }, {
          success: function(result) {
            console.log(result);
          },
          error: function(error) {
            console.log(error);
          }
        });  
    }

    $scope.grabFreshTestData = function () {
        var GameScore = Parse.Object.extend("RawStartups");
        var query = new Parse.Query(GameScore);
        //**order the query by idNum?
        //query.equalTo("playerName", "Dan Stemkoski");
        query.greaterThan("idNum", parseInt($scope.lastFormattedStartup));
        query.limit(1000);
        query.find({
          success: function(results) {
            alert("Successfully retrieved " + results.length + " startups.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) { 
                //console.log(results[i].get('fullData'));
                if (results[i].get('fullData')) {
                    $scope.startupsArray.push(results[i].get('fullData'));
                }
                //alert(object.id + ' - ' + object.get('playerName'));
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }

    //grabs startups for a given week -- default is 1
    //1 would be two thursdays ago to this most recent thursday
    //2 would be 
    $scope.grabStartupsForWeek = function (n) {
        var GameScore = Parse.Object.extend("RawStartups");
        var query = new Parse.Query(GameScore);
        //**order the query by idNum?
        //query.equalTo("playerName", "Dan Stemkoski");
        query.greaterThan("idNum", parseInt($scope.lastFormattedStartup));
        query.limit(1000);
        query.find({
          success: function(results) {
            alert("Successfully retrieved " + results.length + " startups.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) { 
                //console.log(results[i].get('fullData'));
                if (results[i].get('fullData')) {
                    $scope.startupsArray.push(results[i].get('fullData'));
                }
                //alert(object.id + ' - ' + object.get('playerName'));
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }

    $scope.grabSpecificStartup = function () {
        console.log('pressed grab data');
        Parse.Cloud.run('addFoundersToStartup', { currentStartup: $scope.startupNumber }, {
          success: function(result) {
            console.log(result);
          },
          error: function(error) {
            console.log(error);
          }
        });         
    }

    $scope.grabSpecificStartupFromParse = function () {
        console.log('pressed grab data');
        console.log($scope.formattedStartupNumber);
        Parse.Cloud.run('grabSpecificStartupFromParse', { startupId: $scope.formattedStartupNumber }, {
          success: function(result) {
            console.log(result);
          },
          error: function(error) {
            console.log(error);
          }
        });         
    }
    
    //Pulls one page of data from AngelList
    $scope.getDataFromIndex = function (index) {
        //index is where we should start pulling the data from until we can't pull anymore (1000 items?)
    }

    $scope.formatAndSaveData = function (data) {
        //formats data so that it can be downloaded as an excel file and saves it somewhere (filepicker?)
        //has full data
        //console.log(data[1]);
        //console.log(JSON.parse(data[1]));
        //console.log(JSON.parse(data[1]).community_profile);
        //$scope.saveFormattedStartup(JSON.parse(data[1]));
        for (var i = 0; i < data.length; i++) {
            var startupJSON = JSON.parse(data[i]);
            console.log(startupJSON);
            /*
            $scope.formattedStartupsArray[i] = 
            {
                community_profile: startupJSON.community_profile,
                angellist_url: startupJSON.angellist_url,
                //still needs work
                company_type: startupJSON.company_type,
                company_url: startupJSON.company_url,
                created_at: startupJSON.created_at,
                crunchbase_url: startupJSON.crunchbase_url,
                follower_count: startupJSON.follower_count,
                hidden: startupJSON.hidden,
                high_concept: startupJSON.high_concept,
                idNum: startupJSON.id,
                //still needs work
                locations: startupJSON.locations,
                logo_url: startupJSON.logo_url,
                //**Still needs work
                markets: startupJSON.markets,
                name: startupJSON.name,
                product_desc: startupJSON.product_desc,
                quality: startupJSON.quality,
                //still needs work
                screenshots: startupJSON.screenshots,
                status: startupJSON.status,
                thumb_url: startupJSON.thumb_url,
                twitter_url: startupJSON.twitter_url,
                updated_at: startupJSON.updated_at,
                video_url: startupJSON.video_url
            }
            */
            //console.log($scope.formattedStartupsArray[i]);
            $scope.saveFormattedStartup(startupJSON);
        }
        //console.log($scope.formattedStartupsArray);
        
    }

    $scope.formatData = function () {
        console.log('hit format data');
        //console.log($scope.startupsArray);
        $scope.formatAndSaveData($scope.startupsArray);
    }

    $scope.JSON2CSV = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '';
        var line = '';

        //first row of json becomes table labels
        var head = array[0];
        
        for (var index in array[0]) {
            var value = index + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }

        line = line.slice(0, -1);
        str += line + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                var value = array[i][index.toString()] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }
        return str;
    }

    $scope.convertFromJSONtoCSV = function(jsonVal) {
        var json = $.parseJSON(jsonVal);
        var csv = JSON2CSV(json);
    };

    $scope.downloadData = function(jsonVal) {
        var csv = $scope.JSON2CSV(jsonVal);
        window.open("data:text/csv;charset=utf-8," + escape(csv));
    };

    $scope.download = function () {
        //grabs most recent data pulled as an excel file
        console.log('hit download');
        console.log($scope.formattedStartupsArray);
        $scope.downloadData($scope.formattedStartupsArray);
    };

    $scope.pullAndDownloadData = function () {
        console.log('grab formatted startups');
        $scope.grabFormattedStartups();
        console.log('download data');
        $scope.downloadData();
    };

}