
    (function(){
        'use strict'
        document.addEventListener('DOMContentLoaded',function(){
            
        //VARIAVEIS E CABEÇALHO
        const weatherContainer=document.querySelector('#weather-data');
        const cityInput= document.querySelector("#city-input");
        const searchBtn= document.querySelector("#search");
        const cityElement= document.querySelector("#city");
        const tempElement=document.querySelector("#temperature span");
        const descElement=document.querySelector("#description");
        const weatherIconElement=document.querySelector("#weather-icon");
        const countryElement=document.querySelector("#country");
        const humidityElement=document.querySelector("#humidity span");
        const windElemement=document.querySelector("#wind span");

        //EVENTOS
        searchBtn.addEventListener('click', handleSearch);
        cityInput.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                handleSearch();
            }
        });

        //FUNÇOES
        async function handleSearch() {
            const city = cityInput.value;
            try {
                const responseWeather= await fetch(`/weather/${city}`);
                const responseImage= await fetch(`/image/${city}`);
                const dataWeather = await responseWeather.json();
                const dataImage = await responseImage.json();
                atribuitions(dataWeather, dataImage);
            }catch(error){
                console.error('error');
            }; 
        };
        
        const atribuitions= async(dataWeather, dataImage)=>{
            cityElement.innerText=dataWeather.name;
            tempElement.innerText=parseInt(dataWeather.main.temp);
            windElemement.innerText=`${dataWeather.wind.speed}km/h`;
            descElement.innerText=dataWeather.weather[0].description; 
            humidityElement.innerText=`${dataWeather.main.humidity}%`;
            weatherContainer.classList.remove("hide");
            countryElement.setAttribute("src", `https://flagsapi.com/${dataWeather.sys.country}/flat/64.png`);
            weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}.png`);
            document.body.style.backgroundImage = `url('${dataImage.urls.regular}')`;
        };
       
        });
    })();