function AngelList($scope) {
	//Initalize Parse
	Parse.initialize("yMWD8vfQp9chO15d5dIYXUScK3zQdlHbmGNe8cD0", "frdAqsvZSZrUyzoTUN0pQXbiojdaPdNFwnSIn36q");

	//Initialize AngelList API


	//Pulls data from AngelList
	$scope.getData = function () {
		console.log('pressed get data');
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
	
	//Pulls one page of data from AngelList
	$scope.getDataFromIndex = function (index) {
		//index is where we should start pulling the data from until we can't pull anymore (1000 items?)
	}

	$scope.formatData = function (data) {
		//formats data so that it can be downloaded as an excel file and saves it somewhere (filepicker?)
	}

	$scope.downloadData = function () {
		//grabs most recent data pulled as an excel file
		console.log('download data');
	}


}