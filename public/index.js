// global var to store nextId page
var nextId;
var numMatches = 0;

/* event listener for dislike button */
var dislikeButton = document.getElementById('trash')
if(dislikeButton){
dislikeButton.addEventListener('click', function() {
  console.log("dislike button")
  //Create new POST request
  var req = new XMLHttpRequest()
  req.open('POST', "/newURL")
  /* create body object
  * isMatch = "0" to indicate dislike clicked
  */
  var liked = {
      "isMatch": "0",
  }
  /* convert body to JSON */
  var reqBody = JSON.stringify(liked)
  req.setRequestHeader('Content-Type', 'application/json')
  /* create event listener for request */
  req.addEventListener('load', function(event) {
      if(event.target.status === 200) {
          //need to add in check if recipe is null (signifies out of recipes)
	  	  console.log("Received 200 status")
		  console.log("==event.target.response:", event.target.response)

      	  /* get body of response */
		  var res = JSON.parse(event.target.response)
		  /* set global var (used in close modal) */
          nextId = res.nextId;
          /* create next url and redirect */
          var nextURL = window.location.href;
          nextURL = nextURL.substring(0, nextURL.lastIndexOf('/'));
      	  nextURL = nextURL + '/' + String(res.nextId);
          window.location.href = nextURL;
    }
  	else {
  		console.log("==status:", event.target.status)
  	}
  });
  /* send */
  req.send(reqBody)
});
}

/* event listener for like button */
var likeButton = document.getElementById('utensils')
if(likeButton){
likeButton.addEventListener('click', function() {
  	console.log('like button');

 	/* create POST request */
  	var req = new XMLHttpRequest()
  	req.open('POST', "/newURL")
  	/* POST req body
  	* isMatch = "1" to indicate like button clicked
  	*/
  	var liked = {
      	"isMatch": "1",
  	}
  	/* convert body to JSON */
  	var reqBody = JSON.stringify(liked)
   	req.setRequestHeader('Content-Type', 'application/json')
  	/* event listener for POST req */
  	req.addEventListener('load', function(event) {
  	if(event.target.status === 200){
  		console.log("Received 200 status")
  		console.log("==event.target.response:", event.target.response)

    	/* parse body of JSON , set nextId for close modal */
  		var res = JSON.parse(event.target.response)
    	nextId = res.nextId;
    	/* if server indicates match show recipe modal */
    	if (res.match == 1) {
      		showRecipeModal()
          numMatches = numMatches + 1;
   		}
    	else {
      		showNotMatchModal();
    	}
  	}
  	else{
  		console.log("==status:", event.target.status)
  	}
  });
  /* send POST req */
  req.send(reqBody)
});
}

/* event listener for recipe modal */
var closeRecipeModalButton = document.getElementById('close-recipe-modal');
if(closeRecipeModalButton){
closeRecipeModalButton.addEventListener('click', function() {
  hideRecipeModal();
  var nextURL = window.location.href;
  nextURL = nextURL.substring(0, nextURL.lastIndexOf('/'));
  nextURL = nextURL + '/' + String(nextId);
  window.location.href = nextURL;
})
}

/* event listener for not match modal */
var closeNotMatchModalButton = document.getElementById("close-not-match-modal");
if(closeNotMatchModalButton){
  closeNotMatchModalButton.addEventListener('click', function() {
  hideNotMatchModal();
  var nextURL = window.location.href;
  nextURL = nextURL.substring(0, nextURL.lastIndexOf('/'));
  nextURL = nextURL + '/' + String(nextId);
  window.location.href = nextURL;
})
}

/* event listener to open create profile modal */
var createProfileModalButton = document.querySelector(".profile");
createProfileModalButton.addEventListener('click', function() {
  showCreateProfileModal();
})

/* event listener to open create profile modal */
var closeCreateProfileModalButton = document.querySelector("#create-profile-modal .modal-close-button");
closeCreateProfileModalButton.addEventListener('click', function() {
  console.log("==closeCreateProfileModalButton")
  hideCreateProfileModal();
})

/* event listener to open create profile modal */
var createProfileCancelButton = document.querySelector("#create-profile-modal #cancel");
createProfileCancelButton.addEventListener('click', function() {
  console.log("==reateProfileCancelButton")
  hideCreateProfileModal();
})

var createProfileSubmitButton = document.querySelector("#create-profile-modal #submit");
createProfileSubmitButton.addEventListener('click', function() {
  /* get all tag checkboxes */
  var tagBoxes = document.querySelectorAll("[type=checkbox]");

  //Create new POST request
  var req = new XMLHttpRequest()
  req.open('POST', "/newProfile")
  /* create body object
  * body is each tag value (true or false)
  */
  var profile = {
      lunch: tagBoxes[0].checked,
      dinner: tagBoxes[1].checked,
      chinese: tagBoxes[2].checked,
      japanese: tagBoxes[3].checked,
      italian: tagBoxes[4].checked,
      thai: tagBoxes[5].checked,
      savory: tagBoxes[6].checked,
      sweet: tagBoxes[7].checked,
      crispy: tagBoxes[8].checked,
      spicy: tagBoxes[9].checked,
      creamy: tagBoxes[10].checked,
      beef: tagBoxes[11].checked,
      chicken: tagBoxes[12].checked,
      pork: tagBoxes[13].checked,
      vegetable: tagBoxes[14].checked,
      fruit: tagBoxes[15].checked,
      cheese: tagBoxes[16].checked,
      chocolate: tagBoxes[17].checked,
      easy: tagBoxes[18].checked,
      side: tagBoxes[19].checked,
      dessert: tagBoxes[20].checked
  }
  console.log(profile);
  /* convert body to JSON */
  var reqBody = JSON.stringify(profile)
  req.setRequestHeader('Content-Type', 'application/json')
  /* create event listener for request */
  req.addEventListener('load', function(event) {
  	if(event.target.status === 200) {
  		alert("Profile Created")
		//load the next page
  		var res = JSON.parse(event.target.response)
    		nextId = res.nextId;
          	var nextURL = window.location.href;
          	nextURL = nextURL.substring(0, nextURL.lastIndexOf('/'));
      	  	nextURL = nextURL + '/' + String(res.nextId);
         	window.location.href = nextURL;
    }
  	else {
  		console.log("==status:", event.target.status)
  	}
  });
  /* send */
  req.send(reqBody)
  /* close modal */
  hideCreateProfileModal();
})

// Shows recipe modal when like button is clicked
function showRecipeModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var recipeModal = document.getElementById('recipe-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  recipeModal.classList.remove('hidden');
}

// hides recipe model when user clicks close (x) button
function hideRecipeModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var recipeModal = document.getElementById('recipe-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  recipeModal.classList.add('hidden');
}

// Shows not match modal when server indicates no match
function showNotMatchModal() {
  var modalBackdrop = document.getElementById('not-match-modal-backdrop');
  var notMatchModal = document.getElementById('not-match-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  notMatchModal.classList.remove('hidden');
}

// hides not match model when user clicks close (x) button
function hideNotMatchModal() {
  var modalBackdrop = document.getElementById('not-match-modal-backdrop');
  var notMatchModal = document.getElementById('not-match-modal');

  // hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  notMatchModal.classList.add('hidden');
}

// Shows not match modal when server indicates no match
function showCreateProfileModal() {
  console.log("Showing profile modal!")
  var modalBackdrop = document.getElementById('create-profile-modal-backdrop');
  var createProfileModal = document.getElementById('create-profile-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createProfileModal.classList.remove('hidden');
}

// hides create profile model when user clicks close (x) button
function hideCreateProfileModal() {
  var modalBackdrop = document.getElementById('create-profile-modal-backdrop');
  var createProfileModal = document.getElementById('create-profile-modal');

  // hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createProfileModal.classList.add('hidden');
}

var currUrl = window.location.href.split("/").pop();
if (currUrl == 'matches') {
  var recipeShowButtons = document.getElementsByClassName("see-more");
  for (var i = 0; i < recipeShowButtons.length; i++) {
      recipeShowButtons[i].addEventListener("click", showRecipeClick);
  }

  var recipeCloseButtons = document.getElementsByClassName("modal-close-button");
  for (var i = 0; i < recipeCloseButtons.length; i++) {
      recipeCloseButtons[i].addEventListener("click", hideRecipeClick);
  }

  function showRecipeClick(event) {
    var foodItem = event.target.parentNode.parentNode
    console.log("foodItem", foodItem)
    var modals = foodItem.getElementsByClassName('match-modal')
    console.log("==modals", modals)
    modals[0].classList.remove('hidden')
    modals[1].classList.remove('hidden')
    
    /*
    //var recipeModal = foodItem.getElementById('recipe-modal')
    console.log("event.target", event.target)
    var section = event.target.parentElement;
    section = section.parentElement;
    var children = section.childNodes;

    var modalBackdrop = children[7];
    var recipeModal = children[9];

    console.log("==modalBackdrop", modalBackdrop)
    console.log("==recipeModal", recipeModal)
    // Show the modal and its backdrop.
    modalBackdrop.classList.remove('hidden');
    recipeModal.classList.remove('hidden');
    */
  }

  function hideRecipeClick(event) {
    var foodItem = event.target.parentNode.parentNode.parentNode.parentNode
    console.log("foodItem", foodItem)
    var modals = foodItem.getElementsByClassName('match-modal')
    modals[0].classList.add('hidden')
    modals[1].classList.add('hidden')
    
    /*
    var section = event.target.parentElement;
    console.log("==section", section)
    section = section.parentElement;
    section = section.parentElement;
    section = section.parentElement;
    var children = section.childNodes;

    var modalBackdrop = children[7];
    var recipeModal = children[9];
    console.log("==children", children)
    console.log("==modalBackdrop", modalBackdrop)
    console.log("==recipeModal", recipeModal)

    // Show the modal and its backdrop.
    modalBackdrop.classList.add('hidden');
    recipeModal.classList.add('hidden');
    */
  }
}
