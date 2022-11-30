
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var cityname = document.querySelector('#repo-search-term');
var Location1 = nameInputEl.value;

var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);

  } else {
    alert('Please enter a GitHub username');
  }
};
var getUserRepos2 = function (lat, lon) {
  var apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=06bb58b25b45536bf564aaa75898fb91';

  fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data.list);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

var getUserRepos = function (user) {
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q={' + user + '}&appid=06bb58b25b45536bf564aaa75898fb91';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            var lat = data[i].lat;
            var lon = data[i].lon;
            getUserRepos2(lat, lon);
          }
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};
var displayRepos = function (data) {
  if (data.list === 0) {
    repoContainerEl.textContent = 'No repositories found.';

    return;
  }

  cityname.textContent = username.value;
console.log(username.value)
  for (var i = 0; i < 5; i++) {

    var speed = data[i].wind.speed;
    var humidity = data[i].main.humidity;
    var temp = data[i].main.temp;
    var my_list = [speed, humidity, temp];

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = 'speed ' + my_list[0] + ' humidity ' + my_list[1] + ' temperature ' + my_list[2];

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};
userFormEl.addEventListener('submit', formSubmitHandler);