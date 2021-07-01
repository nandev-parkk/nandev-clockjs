const API_KEY = "05944fc16330fd94c88d25a74ee248bc";
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
  // &units=metric을 써야 화씨가 아닌 섭씨를 쓴다.
  // then은 데이터가 넘어왔을 때 함수를 호출 한다.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // 자바스크립트에서는 객체의 key와 value가 같을 때 아래와 같이 생략 가능하다.
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geo location");
}

function askForCoords() {
  // 위치를 읽는 코드이다. 괄호 안에 두개의 함수가 들어가 있다.
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
