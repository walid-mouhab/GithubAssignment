/*
  Walid Mouhab  
  June 22, 2025  
  Description: Clock logic, background, temperature, and ticking sound  
  Adapted from Wes Bos' JavaScript30: https://github.com/wesbos/JavaScript30  
*/
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const tickSound = document.getElementById('tick-sound');

/*
  Updates the rotation of each clock hand every second.
  Adds a ticking sound for realism.
*/
function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) - 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) - 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) - 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
   // Play tick
  tickSound.currentTime = 0;
  tickSound.play();

}

/*
  Displays current date in a readable format.
  Help from: https://www.youtube.com/watch?v=Mn3ehaH0a8g
*/
function showCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("date").textContent = now.toLocaleDateString('en-US', options);
}

/*
  Updates the background based on the current hour.
  Help from: https://www.youtube.com/watch?v=Mn3ehaH0a8g
*/
function updateBackground(hour) {
  const body = document.body;
  if (hour >= 6 && hour < 12) {
    body.style.backgroundImage = "url('morning.jpg')";  // image from https://www.pexels.com/photo/photo-of-lake-552788/
  } else if (hour >= 12 && hour < 18) {
    body.style.backgroundImage = "url('afternoon.jpg')"; // image from  https://www.pexels.com/photo/winding-road-photography-1133505/ 
  } else {
    body.style.backgroundImage = "url('night.jpg')"; // image from  https://www.pexels.com/photo/photography-of-green-grass-field-955657/ 
  }
}

/*
  Fetches the current temperature and displays it in °F.
  Help from: https://www.shecodes.io/athena/40467-how-to-log-the-current-temperature-with-latitude-and-longitude-in-javascript
*/
async function updateTemperature() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?' +
      'latitude=38.97&longitude=-94.82&current_weather=true&timezone=auto'
    );
    const data = await res.json();
    const tempC = data.current_weather.temperature;
    // Convert to Fahrenheit
    const tempF = (tempC * 9/5) + 32;  // change C to F 
    document.getElementById("temp").textContent =
      `Temperature: ${tempF.toFixed(1)}°F`;
  } catch (err) {
    document.getElementById("temp").textContent = "Failed to load temperature";
  }
}


// Initialize everything 
setInterval(setDate, 1000);
setDate();
showCurrentDate();
updateTemperature();// for changing the background
const now = new Date();// for changing the background
updateBackground(now.getHours());


