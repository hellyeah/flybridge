function AngelList($scope) {
	//Initalize Parse
	Parse.initialize("yMWD8vfQp9chO15d5dIYXUScK3zQdlHbmGNe8cD0", "frdAqsvZSZrUyzoTUN0pQXbiojdaPdNFwnSIn36q");

	//Initialize AngelList API

	//Initialize Data Array to test converter
	$scope.startupsArray = [];


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
	
	//Pulls one page of data from AngelList
	$scope.getDataFromIndex = function (index) {
		//index is where we should start pulling the data from until we can't pull anymore (1000 items?)
	}

	$scope.formatData = function (data) {
		//formats data so that it can be downloaded as an excel file and saves it somewhere (filepicker?)
	}

	$scope.JSON2CSV = function (objArray) {
	    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	    console.log(array);
	    //var array = objArray;

	    var str = '';
	    var line = '';

	    //**first row of json becomes table labels
	    var head = array[0];
	    console.log('head:');
	    console.log(head);
	    
	    /*
	    //Wrap values in double quotes -- not sure if needed
	    for (var index in array[0]) {
	        var value = index + "";
	        line += '"' + value.replace(/"/g, '""') + '",';
	    }
	    */
        for (var index in $.parseJSON(array[0])) {
            line += index + ',';
            //console.log(line);
        }

        line = line.slice(0, -1);
        str += line + '\r\n';


	    for (var i = 0; i < array.length; i++) {
	        var line = '';

	        /*
	    	//Wrap values in double quotes -- not sure if needed
	        for (var index in array[i]) {
	            var value = array[i][index] + "";
	            line += '"' + value.replace(/"/g, '""') + '",';
	        }
	        */
	        for (var index in array[i]) {
                line += array[i][index] + ',';
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
	    console.log(json);
	    var csv = $scope.JSON2CSV(json);
	    window.open("data:text/csv;charset=utf-8," + escape(csv))
	};

	$scope.downloadData = function () {
		//grabs most recent data pulled as an excel file
		console.log('download data');
		$scope.download($scope.startupsArray);
	}

}