const form = document.querySelector('#form1');
const searchInput = document.querySelector('.search input');
const degree = document.querySelector('.degree')
const cityname = document.querySelector('#cityname')
const submitButton = document.querySelector('.submit button');
const mainCard = document.querySelector('.maincard');
const windSpeedInfo = document.querySelector('.wind p.text-lg');
const pressureInfo = document.querySelector('.pressure p.text-lg');
const sunriseInfo = document.querySelector('.sunrise p.text-lg');
const humidityInfo = document.querySelector('.humidity .ptext-lg');
const visibilityInfo = document.querySelector('.visibility p.text-lg');
const sunsetInfo = document.querySelector('.sunset p.text-lg');
const cityoutput = document.querySelector('#weatherin');
const skytatus = document.querySelector('#skytatus');
const iconImage = document.querySelector('.iconPlace img');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getCityCord()

})
function getCityCord(){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&appid=8527a83dbfd979f78ab84ffe782b6071`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        lat = response[0].lat;
        lon = response[0].lon;
        Enname = response[0].local_names.en;
        Arname = response[0].local_names.ar;
        
        display(lat , lon ,Enname , Arname)
    })
}



function display(lat , lon ,Enname , Arname ){
    console.log(lat , lon ,Arname , Enname)
    // fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=00a56134e3bc26921cdcdbf3dc4f33fc`)

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8527a83dbfd979f78ab84ffe782b6071`)
    .then(response => response.json())
    .then(response => {console.log(response);
    icon = response.weather[0].icon
    temp = response.main.temp
    console.log(icon);
    cityoutput.innerHTML = `<h1 class="text-2xl " id="weatherin">Today Weather in "<span class="text-slate-500 capitalize">${searchInput.value}</span>"</h1>`;

    iconImage.src = `../img/animated/${icon}.svg`
    degree.textContent =  (temp - 273.15).toFixed(0)+'°C';
    cityname.innerHTML = `<p id="cityname">${response.name} <span class=" font-[Tajawal]">${Arname}</span></p>`;
    skytatus.textContent = response.weather[0].description ;
    windSpeedInfo.textContent = response.wind.speed+' m/s';
    pressureInfo.textContent = response.main.pressure+' hPa';
    const sunriseTimestamp = response.sys.sunrise; // Replace with your actual sunrise timestamp
    const sunsetTimestamp = response.sys.sunset; // Replace with your actual sunset timestamp

    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const formatTime = (date) => {
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    
    const sunriseTimeString = formatTime(sunriseDate);
    const sunsetTimeString = formatTime(sunsetDate);

    sunriseInfo.textContent =sunriseTimeString
    sunsetInfo.textContent =sunsetTimeString


    visibilityInfo.textContent =parseInt(response.visibility) /1000  + " Km"


    
}
    )
}