

let btn = document.getElementById("btn");
let temp = document.getElementById("temp");
let desc = document.getElementById("desc");
let loading = document.getElementById("loading");

btn.addEventListener("click", async () => {
  try {

    let input = document.getElementById("city").value.toLowerCase().trim();


    if (input === "") {
      loading.textContent = "Please enter a city name";
      loading.style.color = "red";
      temp.textContent = "";
      desc.textContent = "";
      return;
    }


    loading.textContent = "Loading...";
    loading.style.color = "green";


    let data = await getData(input);
    console.log(data);


    if (!data || data.cod === "404") {
      loading.textContent = "Error: Unable to fetch weather. Check your connection or city name.";
      loading.style.color = "red";
      temp.textContent = "";
      desc.textContent = "";
      return;
    }


    let temperature = data.main.temp;
    temp.textContent = `${temperature.toFixed(1)} C`;


    let description = data.weather[0].description;
    let weatherEmoji = getWeatherEmoji(description);
    desc.textContent = `${weatherEmoji} ${description}`;


    loading.textContent = "";

  } catch (error) {

    loading.textContent = "Error: Unable to fetch weather. Check your connection or city name.";
    loading.style.color = "red";
    temp.textContent = "";
    desc.textContent = "";
    console.error(error);
  }
});

async function getData(input) {
  try {

    let key = "8e3b6909a1575a5d22cc566c325f7c4d";


    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}&units=metric`);


    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }


    return res.json();

  } catch (error) {

    console.error("getData error:", error);
    throw error;
  }
}


function getWeatherEmoji(description) {

  description = description.toLowerCase();


  if (description.includes("sunny") || description.includes("clear")) return "☀️";
  if (description.includes("cloud")) return "☁️";
  if (description.includes("rain")) return "🌧️";
  if (description.includes("snow")) return "❄️";
  if (description.includes("thunder") || description.includes("storm")) return "⛈️";
  if (description.includes("wind")) return "💨";
  if (description.includes("fog") || description.includes("mist")) return "🌫️";
  if (description.includes("drizzle")) return "🌦️";


  return "🌤️";
}


