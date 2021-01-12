//note the added parameter `user` inside of getUserRepos() function and how it is inserted into the GitHub API URL. We then use the newly formatted URl in the subsequent fetch() request.


var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url

    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };

console.log("outside");
getUserRepos();

//now you can use this function to pass in a user, like "microsoft", e.g., getUserRepos("microsoft");