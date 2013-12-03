function AngelList($scope) {
    //Initalize Parse
    Parse.initialize("yMWD8vfQp9chO15d5dIYXUScK3zQdlHbmGNe8cD0", "frdAqsvZSZrUyzoTUN0pQXbiojdaPdNFwnSIn36q");

    //Initialize AngelList API

    //Initialize Data Array to test converter
    $scope.startupsArray = [];
    $scope.formattedStartupsArray = [];


    //Pulls data from AngelList
    $scope.grabData = function () {
        console.log('pressed grab data');
        var i = 0;
        for(var i = 0; i < 3; i++) {
            Parse.Cloud.run('grabAndSaveStartup', { currentStartup: i }, {
              success: function(result) {
                console.log(result);
              },
              error: function(error) {
                console.log(error);
              }
            });         
        }
    }

    $scope.saveFormattedStartup = function (startup) {
            Parse.Cloud.run('saveStartup', { currentStartup: startup }, {
              success: function(result) {
                console.log(result);
              },
              error: function(error) {
                console.log(error);
              }
            });  
    }

    $scope.grabTestData = function () {
        var GameScore = Parse.Object.extend("Startup");
        var query = new Parse.Query(GameScore);
        //**order the query by idNum?
        //query.equalTo("playerName", "Dan Stemkoski");
        query.find({
          success: function(results) {
            alert("Successfully retrieved " + results.length + " scores.");
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
        Parse.Cloud.run('grabSpecificStartup', { currentStartup: $scope.startupNumber }, {
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
        for (var i = 0; i < data.length; i++) {
            var startupJSON = JSON.parse(data[i]);
            //console.log(startupJSON);
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
            console.log($scope.formattedStartupsArray[i]);
            $scope.saveFormattedStartup(startupJSON);
        }
        //console.log($scope.formattedStartupsArray);
        
    }

    $scope.formatData = function () {
        $scope.formatAndSaveData($scope.startupsArray);
    }

    $scope.JSON2CSV = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        array = _.flatten(array);

        var str = '';
        var line = '';

        //first row of json becomes table labels
        var head = array[0];
        
        for (var index in $.parseJSON(array[0])) {
            //line += index + ',';
            var value = index + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }

        line = line.slice(0, -1);
        str += line + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            var jsonArray = $.parseJSON(array[i]);
            for (var index in jsonArray) {
                //line += jsonArray[index.toString()] + ',';
                var value = jsonArray[index.toString()] + "";
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

    $scope.download = function(jsonVal) {
        var json = $.parseJSON(JSON.stringify(jsonVal)); 
        //var json = jsonVal;
        //console.log(json);
        var csv = $scope.JSON2CSV(json);
        window.open("data:text/csv;charset=utf-8," + escape(csv))
    };

    $scope.downloadData = function () {
        //grabs most recent data pulled as an excel file
        console.log('download data');
        console.log($scope.startupsArray);
        console.log($scope.formattedStartupsArray);
        $scope.download($scope.startupsArray);
    }

}