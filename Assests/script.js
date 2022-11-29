console.log('this');


fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=06bb58b25b45536bf564aaa75898fb91", {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.

})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
