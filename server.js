/*
 * Name:  Adison Emerick and Sadie Thomas
 * Email: emericad@orgonstate.edu thomsadi@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser');

var allRecipes = require('./recipes.json')
var recipeData = JSON.parse(JSON.stringify(allRecipes))
var allTags = require('./tags.json')

var app = express();
var port = process.env.PORT || 3000;

//setting up for when sending and recieving data from client about the number of  photos seen and if they like or disliked it
//as numPhotosSeen increases so does the chance of a yesphoto being a match
//within a post if it so if the odds say match then render match index
var numPhotos = recipeData.length
var matches = []
var curIdx = Math.floor((Math.random() * numPhotos))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(bodyParser.json());

/*
*  stretch goals
* app.get('/matches', function (req, res)
* app.get('/profile', function (req, res)
*/


/*  This function grabs the recipe data from the json file to refill the array
	Should be called on get home, get /, or when new profile is created (select tags)
*/
function resetRecipes(){
  console.log("\m=====Reseting recipes=====")
  recipeData = JSON.parse(JSON.stringify(allRecipes))	//deep copy
  numPhotos = recipeData.length
  curIdx = Math.floor((Math.random() * numPhotos))
  matches = []	   //empty matches array
}


/* Helper function to make sure arrays have the proper values */
function printArr(arr){
	for(var i=0; i<arr.length; i++){
		console.log("\t", arr[i].name)
	}
	console.log()
}


/*  Removes food from recipeData array and adds to matches array if it matched
	Input object format = {
		"isMatch": 1		//0 or 1 depending on if user hit dislike or like button
	}
 	Returns isMatch = 1 or 0 to indicate if the food matched (if user selected match, there's
		a 80% probability the food also selects to match)
	Returns new curIdx for new page to be rendered
	Return object format = {
		"nextId": curIdx, 	//integer for next item to be displayed (if none left = -1)
		"match": 1, 		//0 or 1
		"msg": ""			//message that can be used for testing
	}
*/
app.post('/newURL', function (req, res, next){
  console.log("== req.body:", req.body)
  console.log("==curIdex:", curIdx)
  //if we are passed values and have at least one photo
  if(req.body && req.body.isMatch && numPhotos > 0){
    var isMatch = parseInt(req.body.isMatch)
    //verifying isMatch is 1 or 0
    if(isMatch !== 0 && isMatch !== 1){
      res.status(400).send("isMatch must be '0' or '1'")
      return
    }

    var msg = "Not a match"
    //if it is a match, add it to the matches array
    if(isMatch){
	  //80% chance that the food will match with you
	  if(Math.random() * 10 < 8){
      	var data = recipeData[curIdx]
      	matches.push(data)
      	msg = "It's a match!"
	  }
	  else{
		isMatch = 0
		msg = "Sorry, this food isn't really into you..."
	  }
    }

    //prevents indexing out of bounds, if already empty, skip this
    if(numPhotos > 0){
      //remove the recipe that we just showed
      console.log("--removing", recipeData[curIdx].name)
      recipeData.splice(curIdx, 1)
      numPhotos -= 1
    }

    var response = {}
    //if out of photos, send null to indicate user to lower their standards
    if(numPhotos === 0){
        curIdx = -1
        response = {
          "nextId": -1,
		  "match": isMatch,
          "msg": msg
        }
    }
    //otherwise, send a new random recipe
    else{
      curIdx = Math.floor((Math.random() * numPhotos))
      console.log("++sending", recipeData[curIdx].name)
      response = {
        "nextId": curIdx,
		"match": isMatch,
        "msg": msg
      }
    }

    var resBody = JSON.stringify(response)
    res.setHeader('Content-Type', 'application/json')
    res.write(resBody)
	console.log("\n\nrecipeData")
	printArr(recipeData)
	console.log("\nmatches")
	printArr(matches)
    res.status(200).send()
  }
  else {
    res.status(400).send("Request must have a body and isMatch variable")
  }
});


/*  This function should get called whenever a user fills out their preferences
	It removes all the recipes that do not have a matching tag to the preferences from the recipeData array
*/
//HAS NOT BEEN TESTED YET
app.post('/newProfile', function (req, res){
    console.log("== newprofile req.body:", req.body)
	//reset recipes so that all are avaliable again
	resetRecipes()

	//make sure parameters are specified
    if(req.body){
		//create an array of selected tags
        var tagsObj = req.body
		var selectedTags = []
		for(var i=0; i<allTags.length; i++){
			if(tagsObj[allTags[i]]){
				selectedTags.push(allTags[i])
			}
		}

		//add to newRecipes if at least one tag of a recipe matches a tag in the preference list
		var newRecipes = []
		for(var i=0; i<numPhotos; i++){
			var numTags = recipeData[i].tags.length
			for(var j=0; j<numTags; j++){
				if(selectedTags.includes(recipeData[i].tags[j])){
					newRecipes.push(recipeData[i])
					break
				}
			}
		}
		//set the recipeData to the new array
		recipeData = newRecipes
		numPhotos = recipeData.length
		if(numPhotos == 0){
			curIdx = -1
		}
		else{
  			curIdx = Math.floor((Math.random() * numPhotos))
		}
		var response = {
			"nextId": curIdx,
			"msg": "Updated recipes according to preferencees"
		}
		console.log("++recipeData after update:")
		printArr(recipeData)

		var resBody = JSON.stringify(response)
    	res.setHeader('Content-Type', 'application/json')
    	res.write(resBody)
    	res.status(200).send()
    }
	else{
		res.status(400).send("Request must have a body and a selectedTags variable")
	}
});


/* Getter for matches page. Displays recipes that user has matched with. */
app.get('/matches', function(req, res){
	//only display page if there is at least one match in array
	if(matches.length > 0){
    	var data = {
        	recipeData: matches
      	}
    	res.status(200).render('matchContainer', data)
  	}else{
    	res.status(200).render('errorPage', {
				"msg": "You currently have no matches. Click 'home' to match with some delicious foods!"
  		})
	}
});


/* Getter for home page (resets all recipes and preferences) */
app.get('/home', function(req, res){
    if(numPhotos == 0) {
      res.status(200).render('errorPage', {
    		"msg": "There are no more foods in your area. Try clicking on 'Tinder but for food...' to reset or creating a new profile to lower your standards"
    	})
    }else{
      console.log("++sending", recipeData[curIdx].name)
      res.status(200).render('index', recipeData[curIdx])
    }
});


/* Getter for a specific recipe (used to display next recipe) */
app.get('/:id', function (req, res, next) {
	var id = req.params.id
   	if(id >= 0 && id < numPhotos){
   		curIdx = id
   		res.status(200).render('index', recipeData[id])
  	}
	else{
  		next()
	}
});


/* Getter for home page (resets all recipes and preferences) */
app.get('/', function(req, res){
	resetRecipes()
	console.log("++sending", recipeData[curIdx].name)
  	res.status(200).render('index', recipeData[curIdx])
});


app.get('/-1', function (req, res){
	res.status(200).render('errorPage', {
		"msg": "There are no more foods in your area. Try clicking on 'Tinder but for food...' to reset or creating a new profile to lower your standards"
	})
})


/* 404 page */
app.get('*', function (req, res) {
  	res.status(200).render('404')
});


app.listen(port, function () {
  	console.log("== Server is listening on port", port);
});
