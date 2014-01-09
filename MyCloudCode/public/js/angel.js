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

    $scope.pullAngelListData = function () {
        console.log('pressed grab data');
        $scope.pullSomeAngelListData($scope.numberOfAL())
    }

    $scope.grabInitialFormattedStartupsFromParse = function () {
        console.log('grabbing formatted startups');
        Parse.Cloud.run('grabAllFormattedStartups', {}, {

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

    $scope.printStartups = function () {
        console.log($scope.formattedStartupsArray);
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