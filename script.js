function getnextPage(){
  window.open("./secondPage.html");
}

function displayMap(lat, long) {
  var map = L.map("map").setView([lat, long], 13);

  // Add a tile layer using OpenStreetMap data
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Add a marker for the given latitude and longitude
  var marker = L.marker([lat, long]).addTo(map);

  // Add a popup to the marker (optional)
  marker.bindPopup("Your Location").openPopup();
}

const apiKey = "22bda6379a33502e14f5a74bcf3dc9d7";
const url = `https://api.openweathermap.org/data/2.5/weather?q=India&appid=${apiKey}`;
function fetchData() {
  fetch(url)
    .then((requestObj) => {
      const data = requestObj.json();
      data.then((dataObj) => {
        rearrangedata(dataObj);
        displayMap(dataObj.coord.lat, dataObj.coord.lon);
        console.log(dataObj);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();

function rearrangedata(data) {
  let latitude = document.getElementById("lat");
  let longitude = document.getElementById("long");
  latitude.innerText = data.coord.lat;
  longitude.innerText = data.coord.lon;

  let loc = document.getElementById("location");
  loc.innerText = "Location : " + data.sys.country;

  let windS = document.getElementById("windSpeed");
  windS.innerText = "Wind Speed : " + data.wind.speed + "Kmph";

  let humi = document.getElementById("humidity");
  humi.innerText = "Humidity : " + data.main.humidity;

  let timeZ = document.getElementById("timeZone");
  let time = convertOffsetToTimeZone(data.timezone);
  timeZ.innerText = "time zone : " + time;

  let psr = document.getElementById("pressure");
  psr.innerText = "Pressure : " + data.main.pressure + " atm";

  let windD = document.getElementById("windDir");
  let dir = findDireaction(data.wind.deg);
  windD.innerText = "wind Direaction :" + dir;

  let uvIdx = document.getElementById("uvIndex");
  uvIdx.innerText = "uv index : " + data.weather[0].id;

  let feels = document.getElementById("feelsLike");
  feels.innerText = "feels_like : " + data.main.feels_like;
}
// let deg = findDireaction(10);
// console.log(deg);
function findDireaction(degrees) {
  // Define array of directions
  directions = [
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest",
  ];

  // Split into the 8 directions
  degrees = (degrees * 8) / 360;

  // round to nearest integer.
  degrees = Math.round(degrees, 0);

  // Ensure it's within 0-7
  degrees = (degrees + 8) % 8;
  return directions[[degrees]];
}

function convertOffsetToTimeZone(offsetInMinutes) {
  const hours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const minutes = Math.abs(offsetInMinutes) % 60;
  
  const sign = offsetInMinutes >= 0 ? '+' : '-';
  
  return `GMT${sign}${padWithZero(hours)}:${padWithZero(minutes)}`;
}

function padWithZero(number) {
  return number.toString().padStart(2, '0');
}

// Example usage
// const timeZoneOffset = -300; // For example, UTC-5:00
// const timeZoneString = convertOffsetToTimeZone(timeZoneOffset);

// console.log(timeZoneString);