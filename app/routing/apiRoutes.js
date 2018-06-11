var friends = require('../data/friends.js');

module.exports = function(app) {
  // define the get api/friends route
  app.get('/api/friends', function(req, res) {
      res.json(friends);
  });

  // define the post api/friends route
  app.post('/api/friends', function(req, res) {
    var newFriend = req.body
    var bestFriend = {
        name: "",
        photo: "",
        lowScore: 1000
    }
    
    var totalDifference = 0;
    for (i = 0; i < friends.length; i++) {
        var currentFriend = friends[i];
        for (j = 0; j < currentFriend.scores.length; j++) {
            var newFriendScore = newFriend.scores[j];
            var currentFriendScore = currentFriend.scores[j];
            totalDifference += Math.abs(parseInt(newFriendScore) - currentFriendScore)
        }
        if (totalDifference < bestFriend.lowScore) {
            bestFriend.name = currentFriend.name
            bestFriend.photo = currentFriend.photo
            bestFriend.lowScore = totalDifference
        }
    }


    friends.push(req.body);
    res.json(bestFriend)
    
  });
};



