//state
let currCity="London";
let units ="metric";

//selectors
let city = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_datetime");
let weather_forecast = document.querySelector('.weather_forecast');
let weather_temperature = document.querySelector(".weather_temperature");
let weather_icon = document.querySelector(".weather_icon");
let minmax = document.querySelector(".minmax");
let weather_realfeel = document.querySelector(".weather_realfeel");
let weather_humidity = document.querySelector(".weather_humidity");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure = document.querySelector(".weather_pressure");

//search
document.querySelector(".weather_search")
addEventListener('submit', e => {
    let search =document.querySelector(".weather_searchbar");
    //prevent the default actions
    e.preventDefault();
    // change current city
    currCity = search.value;
    //get weather forcast
    getWeather();
    //clear bar
    search.value=""

})

//units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units!== "metric"){
        //change to metric
        units ="metric"
        // get weather forcast
        getWeather()
    }
})

document.querySelector(".weather_unit_fahrenheit  ").addEventListener('click', () => {
    if(units!== "imperial"){
        //change to imperial
        units ="imperial"
        // get weather forcast
        getWeather()
    }
})


function convertTimeStamp(timestamp,timezone){
    const convertTimezone = timezone/3600;
    //convert seconds to hours

    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day:"numeric",
        month: "long",
        year:"numeric",
        hour:"numeric",
        minute:"numeric",
        timezone: `Etc/GMT${convertTimezone>= 0 ? "-":"+"}${Math.abs(convertTimezone)}`,
        hour12:true,
    }
    return date.toLocaleString("en-US", options)

}

// convert country code to name
function convertcountrycode(country){
    let regionNames = new Intl.DisplayNames(["en"],{type:"region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY =
    '0b17f30087d2309ee90b53cc2e28b01c'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data =>{
    console.log(data)
    city.innerHTML = `${data.name},${convertcountrycode(data.sys.country)}`
    datetime.innerHTML= convertTimeStamp(data.dt,data.timezone);
    weather_forecast.innerHTML = `<p>${data.weather[0].main}`
    weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather_icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`
    minmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}  &#176 <p>Max:${data.main.temp_max.toFixed()}  &#176`
    weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weather_humidity.innerHTML = `${data.main.humidity}%`
    weather_wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph":"m/s"}`
    weather_pressure.innerHTML = `${data.main.pressure} hPa`

} )
}

document.body.addEventListener('load',getWeather())