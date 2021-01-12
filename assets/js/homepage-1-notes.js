

var getUserRepos = function () {
  // *** make an HTTP request to GitHub API using fetch() 
  //then return response from  endpoint /octocat/repos in JSON format (json()) 
  //json() method returns another Promise whose callbac  function captures the actual data. 

  fetch("https://api.github.com/users/octocat/repos").then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
}
console.log("outside");
getUserRepos();

// `fetch()` returns a promise object = promises act like advanced callback functions. 
  
//Promises have a method called `then()` which is called when the Promise has been fulfilled (i.e., when the server is done processing the request)

//Note that "outside" printed in console before console.log(data) - this is asynchronous behavior. Asynchronous communication is often referred to as AJAX, which stands for Asynchronous Javascript and XML (old-fashioned way of formatting data that's largely been replaced by JSON but XML name persists)
