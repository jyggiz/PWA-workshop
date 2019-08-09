var locationInput = document.querySelector('#location');
var locationBtn = document.querySelector('#location-btn');
var locationLoader = document.querySelector('#location-loader');
var fetchedLocation = {lat: 0, lng: 0};

locationBtn.addEventListener('click', function (event) {
  if (!('geolocation' in navigator)) {
    return;
  }
  var sawAlert = false;

  locationBtn.style.display = 'none';
  locationLoader.style.display = 'block';

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    locationBtn.style.display = 'inline';
    locationLoader.style.display = 'none';
    fetchedLocation = {lat: position.coords.latitude, lng: 0};
    fetch("https://api.opencagedata.com/geocode/v1/json?q=" + position.coords.latitude +
    "+" + position.coords.longitude + "&key=bf5fa3905adf4a8794a18c697fae7384")
    .then((res) => {
      console.log(res);
    });
    locationInput.value = 'In Netherlands';
    document.querySelector('#manual-location').classList.add('is-focused');
  }, function (err) {
    console.log(err);
    locationBtn.style.display = 'inline';
    locationLoader.style.display = 'none';
    if (!sawAlert) {
      alert('Couldn\'t fetch location, please enter manually!');
      sawAlert = true;
    }
    fetchedLocation = {lat: 0, lng: 0};
  }, {timeout: 7000});
});