const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const tickSound = document.getElementById('tick-sound');

// Clock function
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
  tickSound.currentTime = 0;
  tickSound.play();

}

// Show date ---- new 
function showCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("date").textContent = now.toLocaleDateString('en-US', options);
}

// Background based on time--- new 
function updateBackground(hour) {
  const body = document.body;
  if (hour >= 6 && hour < 12) {
    body.style.backgroundImage = "url('morning.jpg')";
  } else if (hour >= 12 && hour < 18) {
    body.style.backgroundImage = "url('afternoon.jpg')";
  } else {
    body.style.backgroundImage = "url('night.jpg')";
  }
}

// Temperature---- new 
// Temperature — display in °F
async function updateTemperature() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?' +
      'latitude=38.97&longitude=-94.82&current_weather=true&timezone=auto'
    );
    const data = await res.json();
    const tempC = data.current_weather.temperature;
    // Convert to Fahrenheit
    const tempF = (tempC * 9/5) + 32;
    document.getElementById("temp").textContent =
      `Temperature: ${tempF.toFixed(1)}°F`;
  } catch (err) {
    document.getElementById("temp").textContent = "Failed to load temperature";
  }
}



setInterval(setDate, 1000);
setDate();
showCurrentDate();
updateTemperature();// for changing the background
const now = new Date();// for changing the background
updateBackground(now.getHours());


