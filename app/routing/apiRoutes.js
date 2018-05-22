var friends = require("../data/friends.js");
// console.log(friends);
module.exports = function (app){
  //route that views friends
  app.get("/api/friends", function(req,res){
    res.json(friends);
  });
  
  app.post("/api/friends", function(req,res){
    // determine best match
    var bestMatch = {
      name: "",
      photo: "",
      friendDiff: 1000 //tracks the diff btw answers
    };

    // get all the user input from the survey
    var userInput = req.body;
    var userScore = userInput.score;

    // calculating totalDifference btw user and [friends]
    var totalDifference = 0;
    // loop through [friends]
    for (var i = 0; i < friends.length; i++) {
      // console.log(friends[i]);
      totalDifference = 0;
      // loop through scores while looping through [friends]
      for (var j = 0; j < friends[i].score[j]; j++) {
        // difference between current user's scores against those from other users,
        totalDifference += Math.abs(parseInt(userScore[j]) - parseInt(friends[i].score[j])); 

        if (totalDifference <= bestMatch.friendDiff) {
          //conditional determines best match and sets the info to display
          bestMatch.name =friends[i].name;
          bestMatch.photo =friends[i].photo;
          bestMatch.friendDiff =totalDifference;
        };
      };
    };
    // saves userInput
    friends.push(userInput);
    // json of the best match
    res.json(bestMatch);
  });
}