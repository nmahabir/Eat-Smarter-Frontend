//MAIN FUNCTIONS ON PAGE
//------------------------------
//Select multiple allergies
$(document).ready(function() {
  $("select").formSelect();
  //Tabs
  $(".tabs").tabs();
});

//ENTER DISH
//------------------------------
// Store input value
//SELECT RECIPES
//------------------------------
//Store selected value
$("#submit").on("click", function() {
  var mealInput = $("#meal").val();
  console.log(mealInput);
  $("#recipeList").html("");
  searchRecipes();
});

//DISPLAY RECIPES FROM YUMMILY
//------------------------------
//Console.log result
function searchRecipes() {
  var allergyInput = $("#allergy").val();
  var mealInput = $("#meal").val();
  var mealSearch = "&q=" + mealInput;
  var tempKey = config.MY_KEY;
  var appID = config.SECRET_KEY;
  var searchAllergy = "&allowedAllergy[]=" + allergyInput;
  //var url = 'https://young-island-66909.herokuapp.com/api/getRecipes'
  var url = "http://localhost:3000/api/getRecipes";

  $.get(url, { q: mealInput }, function(response) {
    console.log(response);
    //saving data in array
    var matches = response["matches"];
    for (var i = 0; i < matches.length; i++) {
      var recipeResult = matches[i];
      console.log(recipeResult);

      //recipe details
      var recipeName = recipeResult["sourceDisplayName"];
      var recipeID = recipeResult["id"];
      var recipeImage = recipeResult["smallImageUrls"];
      var recipeIngredients = recipeResult["ingredients"];
      //testing results
      console.log(
        "Name:" +
          recipeName +
          " || " +
          "ID: " +
          recipeID +
          " || " +
          "Image: " +
          recipeImage +
          " || " +
          "Ingredients: " +
          recipeIngredients
      );

      //Appending to HTML
      var recipeDiv = $("<div>");
      recipeDiv.addClass("card horizontal");
      recipeDiv.html(`
            <div class="card-stacked" >
            <div class="card" id=${recipeID} draggable="true" ondragstart="drag(event)">
            <div class="card-image waves-effect waves-block waves-light recipe-info">
            <img class="activator" id=${recipeID} src=${recipeImage}
            height="100%">
                 </div>
                 <span class="card-title activator grey-text text-darken-4 center">${recipeName}<i class="btn-floating btn-medium waves-effect waves-light red lighten-3 material-icons right">add</i></span>
              </div>
            </div>`);

      $("#recipeList").append(recipeDiv);
    }
  });
}

//#####################
//IN PROGRESS BELOW
//#####################

//SAVE THE WEEK
//-----------------------------
//on "Save"
$("#save-week").on("click", function() {
  var tabs = $("#tabs-swipe-demo li");
  //iterate through the tabs
  for (var i = 0; i < tabs.length; i++) {
    console.log("Day:" + tabs[i].id);
    if (tabs[i].id == "monday") {
      var main = $(".monday").val();
      console.log("Monday Meal: " + main);
    }
  }
});
