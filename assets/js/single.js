//This creates a reference to the issues container in displayIssues()
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function (repo) {
  // ** use Fetch AP to create an HTTP request:
  //1. create a variable to hold query
  var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
  //2. Build HTTP request to hit this endpoint and fetch the information returned in the response.
  //remember: fetch is asynchronous so we have to use its Promise-based syntax to access data contained in the response/

  //to view this request, open network tab
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);
      });
    }
    else {
      alert("There was a problem with your request!");
    }
  });
};


//Now turn GitHub issue data into DOM elements
//1. create function that accepts a parameter called issues. You will call this function after a success http request by updating logic in getRepoIssues() to call displayIssues(data).
var displayIssues = function (issues) {
     
  //this if statement display a message in the container if there's no open issues for a given repo.
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (i = 0; i < issues.length; i++) {
    //create a link element to take users to the issue in github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    issueContainerEl.appendChild(issueEl); 
    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
    typeEl.textContent = "(Pull request)";
  } else {
    typeEl.textContent = "(Issue)";
  }
  // append to container
  issueEl.appendChild(typeEl);
  }
};

getRepoIssues('facebook/react');


//If you forget which properties each issue object has, you can check the Preview panel in DevTools Network tab, load the requested URL in another browser tab, or console.log() the response data.