// // var icon = data[i].weather[0].icon;
// var getUserRepos3 = function (icon) {
//   console.log(icon);
// var apiUrl3 = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png'
// // fetch(apiUrl3)
// //   .then(function (response) 
// //     if (response.ok) {
// //       console.log(response);
// //       response.json().then(function (data) {
// //         console.log(data);
// //       });
// //     // } else {
// //     //   alert("Error: " + response.statusText);
// //     // }
// //   }
// //   .catch(function (error) {
// //     alert("Unable to connect to API");
// //   }))
//   };

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var cityname = document.querySelector("#repo-search-term");
var cardBody = document.querySelector("#searches");
var Location1 = nameInputEl.value;
// var today = dayjs().format('MMMM  dddd ');
// console.log(today);
//declare global storage
var storage1 = [];
//handles user input and pushes to 1st API
var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    storage1.push(username);
  } else {
    alert("Please enter a city");
  }
  savethis();
  renderLastGrade();
};
//uses lon and lat to find weather data oon city
var getUserRepos2 = function (lat, lon) {
  var apiUrl2 =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=06bb58b25b45536bf564aaa75898fb91";

  fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);

          displayRepos(data.list);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
};
//uses city name to return lat and lon from API
var getUserRepos = function (user) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q={" +
    user +
    "}&appid=06bb58b25b45536bf564aaa75898fb91";
  repoContainerEl.textContent = "";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          // console.log(data);
          for (var i = 0; i < data.length; i++) {
            var lat = data[i].lat;
            var lon = data[i].lon;
            getUserRepos2(lat, lon);
          }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
};
//displays weather data in index format from API #2
var displayRepos = function (data) {
  if (data.list === 0) {
    repoContainerEl.textContent = "No cities found.";

    return;
  }

  cityname.textContent = username.value;
  console.log(username.value);
  for (var i = 0; i < 5; i++) {
    data[i].main.temp = parseFloat(
      Math.round((data[i].main.temp - 273.15) * 1.8) + 32
    );
    console.log(data[i].weather[0].icon);
    var icon = fetch('https://openweathermap.org/img/wn/10n@2x.png');
console.log(icon);
    var speed = data[i].wind.speed;
    var humidity = data[i].main.humidity;
    var temp = data[i].main.temp;
    var my_list = [speed, humidity, temp, icon];

    var repoEl = document.createElement("div");
    repoEl.classList =
      "list-item flex-row justify-space-between align-center col";

    var titleEl = document.createElement("card");
    titleEl.textContent =
      "speed " +
      my_list[0] +
      " MPH" +
      " humidity " +
      my_list[1] +
      " %" +
      " temperature " +
      my_list[2] +
      " ???" +
      my_list[3];

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement("card");
    statusEl.classList = "flex-row align-center col";

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
    // getUserRepos3 ();
  }
};
//saves user input to local storage
function savethis() {
  localStorage.setItem("storage1", JSON.stringify(storage1));
}
//retrieves text from localStorage
function renderLastGrade() {
  var storage1 = JSON.parse(localStorage.getItem("storage1"));
  if (storage1 !== null) {
    cardBody.textContent = storage1.cityname;
    // console.log(storage1);
    for (var i = 0; i < storage1.length; i++) {
      var todo = storage1[i];
      //creates boxes with button to search former searches again
      var btn = document.createElement("button");
      btn.textContent = todo;
      btn.setAttribute("data-index", storage1[i]);
      // var button = document.createElement("button");
      // button.getAttribute()
      // button.textContent = "Search again";
      // btn.appendChild(button);
      cardBody.appendChild(btn);
    }
  }
}
// incomplete
cardBody.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  // console.log(element.getAttribute("data-index"));
  if (element.matches("button") === true) {
    var username = element.getAttribute("data-index");
    if (username) {
      getUserRepos(username);
    }
  }
});
userFormEl.addEventListener("submit", formSubmitHandler);
renderLastGrade();
