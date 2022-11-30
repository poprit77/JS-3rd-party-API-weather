
// fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=06bb58b25b45536bf564aaa75898fb91')
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//         });
//               } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });

console.log('this');
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username')

var Location1 = nameInputEl.value;


var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};
var getUserRepos2 = function (lat ,lon) {
  var apiUrl2 = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=06bb58b25b45536bf564aaa75898fb91';

  fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
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
            // console.log(data[i].lat);
            var lat = data[i].lat;
            var lon = data[i].lon;
            // console.log(data[i].lon);
            // displayRepos(data, user);

            console.log(lat);
            console.log(lon);
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
// console.log(lat);
// console.log(lon);
userFormEl.addEventListener('submit', formSubmitHandler);