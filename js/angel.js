function AngelList($scope) {
	//Initalize Parse
	Parse.initialize("yMWD8vfQp9chO15d5dIYXUScK3zQdlHbmGNe8cD0", "frdAqsvZSZrUyzoTUN0pQXbiojdaPdNFwnSIn36q");
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}, {
	  success: function(object) {
	    alert("yay! it worked");
	  }
	});

	//Initialize AngelList API


	//Pulls data from AngelList
	$scope.getData = function () {
		console.log('pressed get data');
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