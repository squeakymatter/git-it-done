//create two variables to reference DOM elements in the right column that will hold the search term and response

var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var getUserRepos = function (user) {
 
  // format the github api url
  var apiUrl = 'https://api.github.com/users/' + user + '/repos';

  // make a get request to url and handle 404s - use fetch() method's ok property... 
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function(error) {
    //notice this `catch()` getting chained onto the end of the `.then() method
    alert("Unable to connect to GitHub");
  })
  
};

// Create two new variables to store a reference to the <form> element with an id of user-form and to the <input> element with an id of username:

var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');

// Now that we have variables for the two form elements, let's create a function called formSubmitHandler to be executed upon a form submission browser event.
var formSubmitHandler = function (event) {
  // preventDefault() stops the browser from performing the default action the event wants it to do. In the case of submitting a form, it prevents the browser from sending the form's input data to a URL, as we'll handle what happens with the form input data ourselves in JavaScript.

  event.preventDefault();

  // Let's update the formSubmitHandler() function to get the value of the form <input> element and send it over to getUserRepos().

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

// add the submit event listener to the userFormEl.

userFormEl.addEventListener('submit', formSubmitHandler);

//create function to display repos that will accept both the array of repository data and the term we searched for as parameters.

var displayRepos = function (repos, searchTerm) {
   // check if api returned any repos. if not, display text saying so
   if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repoContainerEl.textContent = '';
  repoSearchTerm.textContent = searchTerm;
  console.log(repos);
  console.log(searchTerm);
  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name - take each repository (repos[i]) and write some of its data to the page.
    //1. format appearance of the name and repo name
    //2. create and style div element
    //3. create a span to hold the formatted repo name
    //4. Add span to the div and add the entire div to the container created earlier.

    var repoName = repos[i].owner.login + '/' + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    // **append to container
    // repoEl.appendChild(statusEl);

    // append to container
    repoEl.appendChild(titleEl);

    //create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        ' issue(s)';
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
